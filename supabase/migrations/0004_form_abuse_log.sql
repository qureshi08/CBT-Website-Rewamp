-- ============================================================================
-- Abuse log for the public form endpoints
-- docs/SECURITY_PLAN.md — finding 3
--
-- 0003 covers submissions that were *flagged*: those are stored in full, with
-- is_spam and a reason. This file covers the other half — submissions that were
-- *rejected* by the origin, rate-limit or Turnstile layers, which until now
-- left no trace beyond a log line that ages out of Vercel's retention.
--
-- Metadata only. The message body of a rejected submission is deliberately not
-- stored: those requests are almost never human, and keeping their payloads
-- means holding attacker-controlled content for no operational benefit.
--
-- Rate-limit rejections are the exception and do NOT come here — they are the
-- one rejection likely to be a real person (several colleagues behind one
-- office IP), so the code converts the first few into stored submissions
-- instead. See RATE_LIMIT_STORE_BUDGET in src/lib/security/form-guard.ts.
--
-- Safe to re-run. Run this whole file once in the Supabase SQL editor.
-- Requires 0003_spam_flags.sql to have been run first.
-- ============================================================================

create table if not exists public.form_abuse_log (
    id         uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),

    -- "contact" | "partner"
    scope      text not null,
    -- "reject" | "flag"
    decision   text not null,
    -- Which layer fired, plus its detail, e.g. "origin evil.example not allowed".
    reason     text,
    -- Heuristic score where one was calculated; null for the earlier layers.
    score      integer,

    -- Present only when the payload carried something email-shaped. Rejections
    -- happen before validation, so this may be junk — it is for correlation,
    -- not for contacting anyone.
    email      text,

    -- Salted SHA-256 of the client IP, never the address itself. An IP is
    -- personal data under UK GDPR; a hash still lets repeat offenders be
    -- correlated without holding the identifier. Null when ABUSE_LOG_SALT is
    -- unset — the code refuses to hash with a guessable salt.
    ip_hash    text
);

comment on table public.form_abuse_log is
    'Metadata for submissions rejected by the anti-abuse layers. No message bodies. See docs/SECURITY_PLAN.md finding 3.';
comment on column public.form_abuse_log.ip_hash is
    'Salted SHA-256 of the client IP. Never store the raw address.';

-- "Has this address been seen before?" is the query this table exists to
-- answer, so index it. Same for the repeat-IP lookup.
create index if not exists form_abuse_log_email_idx
    on public.form_abuse_log (email) where email is not null;
create index if not exists form_abuse_log_ip_hash_idx
    on public.form_abuse_log (ip_hash) where ip_hash is not null;
create index if not exists form_abuse_log_created_at_idx
    on public.form_abuse_log (created_at desc);

-- The same lookup against submissions that were flagged rather than rejected.
-- 0003 indexed (is_spam, created_at) for the dashboard; this is for history.
create index if not exists contact_submissions_email_idx
    on public.contact_submissions (email);
create index if not exists partner_enquiries_email_idx
    on public.partner_enquiries (email);

-- ----------------------------------------------------------------------------
-- RLS: writes come from the service-role client in the API routes, which
-- bypasses RLS. Enabling it with no policy therefore denies the anon role
-- everything while leaving the application unaffected. Do not add an anon
-- policy here — see finding 2.
-- ----------------------------------------------------------------------------
alter table public.form_abuse_log enable row level security;

-- ----------------------------------------------------------------------------
-- Retention. This is abuse telemetry, not a business record, and it contains
-- IP-derived data — so it should not accumulate indefinitely.
--
-- Run periodically. If pg_cron is enabled on the project:
--
--   select cron.schedule('prune-form-abuse-log', '0 3 * * *',
--                        $$select public.prune_form_abuse_log()$$);
--
-- Otherwise call it by hand every few months, or from a scheduled function.
-- ----------------------------------------------------------------------------
create or replace function public.prune_form_abuse_log(retain_days integer default 90)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
    removed integer;
begin
    delete from public.form_abuse_log
    where created_at < now() - make_interval(days => retain_days);
    get diagnostics removed = row_count;
    return removed;
end;
$$;

comment on function public.prune_form_abuse_log is
    'Deletes abuse-log rows older than retain_days (default 90). See docs/SECURITY_PLAN.md finding 3.';
