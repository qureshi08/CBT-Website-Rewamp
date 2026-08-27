/**
 * Per-IP rate limiting for the public form endpoints.
 * See docs/SECURITY_PLAN.md finding 3.
 *
 * Two backends, chosen at call time:
 *
 * - **Upstash Redis** when `UPSTASH_REDIS_REST_URL` and
 *   `UPSTASH_REDIS_REST_TOKEN` are set. Uses the plain REST API over `fetch`,
 *   so no SDK dependency is needed. This is the only backend that holds on
 *   Vercel, where each serverless instance has its own memory.
 * - **In-memory** otherwise. Correct in dev and on a single long-lived server;
 *   on serverless it only limits repeat hits that happen to land on the same
 *   instance. Partial cover, but strictly better than none, and it means the
 *   feature works with no accounts provisioned.
 *
 * Fails **open**: if Upstash is unreachable the submission is allowed through.
 * A dropped real lead is worse than a leaked spam message, and the honeypot,
 * heuristics and Turnstile layers still apply.
 */

export type RateLimitWindow = {
    label: string;
    limit: number;
    windowSeconds: number;
};

/** Plan defaults: ~3/hour and ~10/day per IP. */
export const FORM_WINDOWS: RateLimitWindow[] = [
    { label: "hourly", limit: 3, windowSeconds: 60 * 60 },
    { label: "daily", limit: 10, windowSeconds: 60 * 60 * 24 },
];

export type RateLimitResult = {
    allowed: boolean;
    reason?: string;
    backend: "upstash" | "memory";
};

function upstashConfig(): { url: string; token: string } | null {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) return null;
    return { url: url.replace(/\/$/, ""), token };
}

export function rateLimitBackend(): "upstash" | "memory" {
    return upstashConfig() ? "upstash" : "memory";
}

// ---------------------------------------------------------------------------
// In-memory backend
// ---------------------------------------------------------------------------

type Counter = { count: number; resetAt: number };

const memoryStore = new Map<string, Counter>();

function pruneMemoryStore(now: number) {
    // Cheap opportunistic cleanup; the store only grows to the number of
    // distinct IPs seen inside the longest window.
    if (memoryStore.size < 5_000) return;
    for (const [key, counter] of memoryStore) {
        if (counter.resetAt <= now) memoryStore.delete(key);
    }
}

function incrementMemory(key: string, windowSeconds: number): number {
    const now = Date.now();
    pruneMemoryStore(now);

    const existing = memoryStore.get(key);
    if (!existing || existing.resetAt <= now) {
        memoryStore.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
        return 1;
    }
    existing.count += 1;
    return existing.count;
}

// ---------------------------------------------------------------------------
// Upstash REST backend
// ---------------------------------------------------------------------------

/**
 * INCR the key and set its TTL only if it doesn't already have one, so the
 * window starts at the first request rather than sliding forward on every hit.
 * Returns null when the call fails, which the caller treats as "allow".
 */
async function incrementUpstash(
    config: { url: string; token: string },
    key: string,
    windowSeconds: number
): Promise<number | null> {
    try {
        const response = await fetch(`${config.url}/pipeline`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${config.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify([
                ["INCR", key],
                ["EXPIRE", key, String(windowSeconds), "NX"],
            ]),
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("[rate-limit] Upstash responded", response.status);
            return null;
        }

        const payload = (await response.json()) as Array<{ result?: unknown; error?: string }>;
        const incr = payload?.[0];
        if (!incr || incr.error) {
            console.error("[rate-limit] Upstash INCR error:", incr?.error);
            return null;
        }
        const count = Number(incr.result);
        return Number.isFinite(count) ? count : null;
    } catch (error) {
        console.error("[rate-limit] Upstash unreachable:", error);
        return null;
    }
}

// ---------------------------------------------------------------------------

/**
 * Checks every window and returns on the first one exceeded.
 *
 * `scope` namespaces the counters so the contact and partner forms get their
 * own budgets rather than sharing one.
 */
export async function checkRateLimit(
    scope: string,
    identifier: string,
    windows: RateLimitWindow[] = FORM_WINDOWS
): Promise<RateLimitResult> {
    const config = upstashConfig();
    const backend: "upstash" | "memory" = config ? "upstash" : "memory";

    for (const window of windows) {
        const key = `ratelimit:${scope}:${window.label}:${identifier}`;

        const count = config
            ? await incrementUpstash(config, key, window.windowSeconds)
            : incrementMemory(key, window.windowSeconds);

        // null means the backend failed — fail open.
        if (count === null) continue;

        if (count > window.limit) {
            return {
                allowed: false,
                reason: `${window.label} limit exceeded (${count}/${window.limit})`,
                backend,
            };
        }
    }

    return { allowed: true, backend };
}
