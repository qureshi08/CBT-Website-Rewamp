/**
 * Cloudflare Turnstile verification (server side).
 * See docs/SECURITY_PLAN.md finding 3.
 *
 * Dormant until `TURNSTILE_SECRET_KEY` is set: with no key configured
 * `verifyTurnstile` returns `{ ok: true, skipped: true }` so the forms keep
 * working with no Cloudflare account. Once the key lands, a missing or invalid
 * token is rejected.
 *
 * Verification is a single POST to Cloudflare's siteverify endpoint, so no SDK
 * dependency is required.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult = {
    ok: boolean;
    skipped: boolean;
    reason?: string;
};

export function isTurnstileEnabled(): boolean {
    return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(
    token: unknown,
    remoteIp?: string
): Promise<TurnstileResult> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
        return { ok: true, skipped: true };
    }

    if (typeof token !== "string" || token.trim().length === 0) {
        return { ok: false, skipped: false, reason: "missing turnstile token" };
    }

    try {
        const form = new URLSearchParams({ secret, response: token });
        // Cloudflare rejects "unknown" as a remoteip value, so only send real ones.
        if (remoteIp && remoteIp !== "unknown") form.set("remoteip", remoteIp);

        const response = await fetch(VERIFY_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: form,
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("[turnstile] siteverify responded", response.status);
            // Cloudflare being down must not take the contact form down with it.
            return { ok: true, skipped: true, reason: "siteverify unavailable" };
        }

        const payload = (await response.json()) as {
            success?: boolean;
            "error-codes"?: string[];
        };

        if (payload.success) return { ok: true, skipped: false };

        return {
            ok: false,
            skipped: false,
            reason: `turnstile rejected: ${(payload["error-codes"] ?? []).join(", ") || "unknown"}`,
        };
    } catch (error) {
        console.error("[turnstile] verification failed:", error);
        return { ok: true, skipped: true, reason: "siteverify unreachable" };
    }
}
