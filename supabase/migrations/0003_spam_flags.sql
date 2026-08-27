-- ============================================================================
-- Spam flagging for public form submissions
-- docs/SECURITY_PLAN.md — finding 3, "flag, don't drop"
--
-- Suspicious submissions are STORED rather than dropped, so the audit trail
-- survives and the heuristic thresholds can be tuned against real traffic.
-- The API routes set these columns; the admin dashboard filters flagged rows
-- out of "Recent Enquiries".
--
-- Safe to re-run. Run this whole file once in the Supabase SQL editor.
-- ============================================================================

alter table public.contact_submissions
    add column if not exists is_spam     boolean not null default false,
    add column if not exists spam_reason text;

alter table public.partner_enquiries
    add column if not exists is_spam     boolean not null default false,
    add column if not exists spam_reason text;

-- The dashboard's "Recent Enquiries" query is ordered by created_at and
-- filtered to non-spam, so index the pair rather than is_spam alone.
create index if not exists contact_submissions_not_spam_idx
    on public.contact_submissions (is_spam, created_at desc);

create index if not exists partner_enquiries_not_spam_idx
    on public.partner_enquiries (is_spam, created_at desc);

comment on column public.contact_submissions.is_spam is
    'Set by the anti-spam heuristics in src/lib/security/. Flagged rows are stored but skip the notification email.';
comment on column public.contact_submissions.spam_reason is
    'Score and the signals that fired, for tuning the thresholds.';
comment on column public.partner_enquiries.is_spam is
    'Set by the anti-spam heuristics in src/lib/security/. Flagged rows are stored but skip the notification email.';
comment on column public.partner_enquiries.spam_reason is
    'Score and the signals that fired, for tuning the thresholds.';
