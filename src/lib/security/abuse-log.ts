/**
 * Durable record of submissions the anti-abuse layers turned away.
 * See docs/SECURITY_PLAN.md finding 3 and supabase/migrations/0004_form_abuse_log.sql.
 *
 * Flagged submissions are already stored in full by `insertWithSpamFlags()`.
 * This covers the other half — rejections, which previously left nothing behind
 * but a console line. Metadata only: no message bodies, and the IP is hashed
 * rather than stored.
 *
 * Three properties matter here, all of them about not making things worse:
 *
 * - **Capped.** Rejections are unbounded by definition; a bot that keeps
 *   hammering after hitting the rate limit would otherwise write a row per
 *   attempt, turning this table into the resource-exhaustion problem the rate
 *   limiter exists to prevent. Logging is itself rate limited, per IP.
 * - **Never throws.** Called from the request path, so a logging failure must
 *   never cost a submission. Every error is swallowed after a console line.
 * - **Degrades.** If 0004 hasn't been run the table is absent; that is detected
 *   and logging goes quiet rather than erroring on every request, exactly as
 *   `insertWithSpamFlags()` handles the 0003 columns.
 */

import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { checkRateLimit, type RateLimitWindow } from "./rate-limit";

/**
 * How many rejections from one IP get written before logging goes quiet for
 * that address. Enough to establish a pattern; far short of letting a bot
 * choose how many rows we write.
 */
const LOG_BUDGET: RateLimitWindow[] = [
    { label: "abuselog-hourly", limit: 5, windowSeconds: 60 * 60 },
    { label: "abuselog-daily", limit: 20, windowSeconds: 60 * 60 * 24 },
];

/**
 * Salt for the IP hash. Without it we do not hash at all: the IPv4 space is
 * small enough to brute-force an unsalted SHA-256 rainbow table in seconds, so
 * an unsalted "hash" would be a raw IP wearing a disguise — worse than storing
 * nothing, because it invites treating it as anonymous when it isn't.
 */
function ipSalt(): string | null {
    const salt = process.env.ABUSE_LOG_SALT;
    return salt && salt.length >= 16 ? salt : null;
}

export function hashIp(ip: string): string | null {
    const salt = ipSalt();
    if (!salt || !ip || ip === "unknown") return null;
    return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

/** Set once the table is known to be missing, so we stop retrying every request. */
let tableMissing = false;

function isMissingTable(error: unknown): boolean {
    const code = (error as { code?: string })?.code;
    const message = (error as { message?: string })?.message ?? "";
    // PGRST205: PostgREST cannot find the table in its schema cache.
    // 42P01: Postgres "undefined table", if the call reaches the database.
    return code === "PGRST205" || code === "42P01" || /form_abuse_log/.test(message);
}

export type AbuseLogEntry = {
    scope: string;
    decision: "reject" | "flag";
    reason?: string;
    score?: number;
    email?: unknown;
    ip: string;
};

export async function logAbuse(entry: AbuseLogEntry): Promise<void> {
    if (tableMissing) return;

    try {
        // Budget check first — this is the whole point of the cap, so it has to
        // happen before the write, not after.
        const budget = await checkRateLimit("abuselog", entry.ip, LOG_BUDGET);
        if (!budget.allowed) return;

        const email =
            typeof entry.email === "string" && entry.email.trim().length > 0
                ? entry.email.trim().slice(0, 320) // RFC 5321 maximum
                : null;

        const { error } = await supabaseAdmin.from("form_abuse_log").insert([
            {
                scope: entry.scope,
                decision: entry.decision,
                reason: entry.reason ? entry.reason.slice(0, 500) : null,
                score: typeof entry.score === "number" ? entry.score : null,
                email,
                ip_hash: hashIp(entry.ip),
            },
        ]);

        if (error) {
            if (isMissingTable(error)) {
                tableMissing = true;
                console.warn(
                    "[abuse-log] table absent — run supabase/migrations/0004_form_abuse_log.sql. Logging disabled."
                );
                return;
            }
            console.error("[abuse-log] insert failed:", error);
        }
    } catch (error) {
        // Never let telemetry break a submission.
        console.error("[abuse-log] unexpected failure:", error);
    }
}

/**
 * Prior abuse records for an address, newest first. Intended as advisory
 * context in the admin dashboard — "this address was turned away twice before".
 *
 * Deliberately **not** wired into scoring. Feeding this back into the heuristics
 * would make a single false positive self-reinforcing: flag a real lead once and
 * every later attempt inherits the penalty, with no way for them to tell. If it
 * ever does become a signal it should be worth 2 at most, so it can corroborate
 * but never flag on its own.
 */
export async function priorAbuseFor(email: string): Promise<number> {
    if (tableMissing || !email) return 0;
    try {
        const { count, error } = await supabaseAdmin
            .from("form_abuse_log")
            .select("id", { count: "exact", head: true })
            .eq("email", email.trim());
        if (error) {
            if (isMissingTable(error)) tableMissing = true;
            return 0;
        }
        return count ?? 0;
    } catch {
        return 0;
    }
}
