/**
 * Shared anti-abuse pipeline for the public form endpoints.
 * See docs/SECURITY_PLAN.md finding 3.
 *
 * Layer order is deliberate — cheapest and most certain first, so a bot never
 * reaches the database or the SMTP send:
 *
 *   1. Origin / Referer allow-list   (free, header-only)
 *   2. Per-IP rate limit             (one Redis round-trip at most)
 *   3. Turnstile                     (one Cloudflare round-trip, if configured)
 *   4. Honeypot + time-trap + content heuristics (pure CPU)
 *
 * The first three produce `reject` — nothing is stored, and the caller returns
 * a **fake success** so bots cannot tune against real error messages. The
 * fourth produces `flag`: the row is stored with `is_spam = true` for the audit
 * trail, but no notification email is sent.
 */

import { checkOrigin, clientIp } from "./origin";
import { checkRateLimit } from "./rate-limit";
import { verifyTurnstile } from "./turnstile";
import { evaluateSubmission, SPAM_SCORE_THRESHOLD, type SpamCheckInput } from "./spam";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

export type GuardDecision =
    | { action: "reject"; reason: string }
    | { action: "flag"; reason: string }
    | { action: "accept" };

export type GuardInput = SpamCheckInput & {
    /** Namespaces the rate-limit counters, e.g. "contact" / "partner". */
    scope: string;
    turnstileToken?: unknown;
};

export async function guardFormSubmission(
    request: Request,
    input: GuardInput
): Promise<GuardDecision> {
    const ip = clientIp(request);

    // 1. Origin / Referer -----------------------------------------------------
    const origin = checkOrigin(request);
    if (origin.status === "blocked") {
        console.warn(`[form-guard] ${input.scope}: rejected — ${origin.reason} (ip ${ip})`);
        return { action: "reject", reason: origin.reason };
    }

    // 2. Rate limit -----------------------------------------------------------
    const rate = await checkRateLimit(input.scope, ip);
    if (!rate.allowed) {
        console.warn(`[form-guard] ${input.scope}: rejected — ${rate.reason} (ip ${ip})`);
        return { action: "reject", reason: rate.reason ?? "rate limited" };
    }

    // 3. Turnstile ------------------------------------------------------------
    const turnstile = await verifyTurnstile(input.turnstileToken, ip);
    if (!turnstile.ok) {
        console.warn(`[form-guard] ${input.scope}: rejected — ${turnstile.reason} (ip ${ip})`);
        return { action: "reject", reason: turnstile.reason ?? "turnstile failed" };
    }

    // 4. Heuristics -----------------------------------------------------------
    const verdict = evaluateSubmission(input);

    // A missing Origin *and* a missing Referer isn't damning on its own, but
    // paired with content that already looks generated it tips the balance.
    if (origin.status === "unknown" && verdict.score > 0) {
        verdict.reasons.push(origin.reason);
        verdict.score += 2;
        verdict.isSpam = verdict.score >= SPAM_SCORE_THRESHOLD;
    }

    if (verdict.isSpam) {
        const reason = `score ${verdict.score}: ${verdict.reasons.join("; ")}`;
        console.warn(`[form-guard] ${input.scope}: flagged — ${reason} (ip ${ip})`);
        return { action: "flag", reason };
    }

    return { action: "accept" };
}

/**
 * Inserts a submission with its spam flags, degrading gracefully if the
 * `is_spam` / `spam_reason` columns don't exist yet.
 *
 * `supabase/migrations/0003_spam_flags.sql` adds them, but that file has to be
 * run by hand in the Supabase SQL editor. Until someone does, PostgREST answers
 * an unknown column with PGRST204 — we detect that and retry without the flags
 * so the forms keep working either side of the migration.
 */
type ContactInsert = Database["public"]["Tables"]["contact_submissions"]["Insert"];
type PartnerInsert = Database["public"]["Tables"]["partner_enquiries"]["Insert"];
type SubmissionInsert = ContactInsert | PartnerInsert;

export async function insertWithSpamFlags(
    table: "contact_submissions" | "partner_enquiries",
    row: SubmissionInsert,
    spam: { isSpam: boolean; reason?: string }
): Promise<{ error: unknown | null }> {
    // Supabase's generated Insert types are per-table, so the query builder is
    // only concretely typed inside a narrowed branch. Narrowing here lets both
    // inserts be checked against their real column types while still sharing
    // the retry logic below.
    const insert = (values: SubmissionInsert) =>
        table === "contact_submissions"
            ? supabaseAdmin.from("contact_submissions").insert([values as ContactInsert])
            : supabaseAdmin.from("partner_enquiries").insert([values as PartnerInsert]);

    const { error } = await insert({
        ...row,
        is_spam: spam.isSpam,
        // Cap the reason so a pathological input can't bloat the row.
        spam_reason: spam.reason ? spam.reason.slice(0, 500) : null,
    });
    if (!error) return { error: null };

    const code = (error as { code?: string })?.code;
    const message = (error as { message?: string })?.message ?? "";
    const columnMissing = code === "PGRST204" || /is_spam|spam_reason/.test(message);

    if (!columnMissing) return { error };

    console.warn(
        `[form-guard] ${table}: spam columns absent — run supabase/migrations/0003_spam_flags.sql. Storing without flags.`
    );
    const retry = await insert(row);
    return { error: retry.error };
}
