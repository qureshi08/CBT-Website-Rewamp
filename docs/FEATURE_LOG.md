# CBT Website — Feature Log

> Chronological record of what has been built, changed, and the decisions behind it.

---

## 2026-08-27 — Session: Anti-spam shipped, tuned, and given an inbox

The 2026-08-21 work was complete but had never been committed. Shipped it, then
tuned it against real submissions and built the admin surface it needed.

**Shipped** (`a1ec666`) — the `src/lib/security/` stack from the previous session,
unchanged: honeypot, time-trap, content heuristics, origin check and per-IP rate
limiting on both public form endpoints.

**Tuned** (`05e8591`) — three changes, each from evidence rather than reasoning:
- **The submitter's email was never scored.** Added a dot-padded Gmail alias
  signal. Gmail ignores dots, so `s.or.u.to.p.a.c06@` and `sorutopac06@` are one
  mailbox — the padding exists only to manufacture distinct-looking senders.
  Narrow by design: Gmail only, `+tags` stripped, needs 4+ dots and a high dot
  ratio, so `firstname.lastname` stays clean.
- **Link-farm threshold 4 → 6.** A partner enquiry carrying site, case study,
  LinkedIn and deck scored exactly 4 and flagged on its own. Confirmed by running
  it through the scorer, not theorised.
- **`*.translate.goog` allowed.** Google Translate proxies the page, so anyone
  reading the site in translation was submitting with an unmatched `Origin` and
  being silently rejected.

**Abuse log** (`ac818b5`) — rejections previously left no trace beyond a console
line. `form_abuse_log` (migration `0004`) now records scope, decision, reason,
score, email and a salted IP hash. Metadata only; no message bodies. Rate-limit
rejections are the exception — the first 5 per IP per day are stored as flagged
submissions instead, because that layer is the one that catches real people
(colleagues behind one office IP trip the hourly limit between them).

**Submissions inbox** (`4046970`) — `/admin/submissions`. There was previously no
way to read form submissions in the portal at all; the dashboard showed the
latest three and nothing else. Contact and partner enquiries, clean and flagged
tabs, paginated, searchable, rows expand to the message and the reason it was
flagged. The manual spam toggle is the point of the page: the heuristics will
eventually be wrong about someone, and this makes that recoverable.

**Validated against real traffic.** Migrations `0003` and `0004` were applied and
the 44 existing contact submissions scored retroactively: **23 were spam — 52% of
all traffic.** The separation was perfect. Every legitimate submission scored
exactly 0, every spam scored 6 or more, nothing landed in between. The corpus
also showed one sustained campaign since May that changed technique in late July,
moving from gibberish messages to bare phone numbers with plausible `"Xxxxxxx
LLC"` company names — which is what made scoring the email address necessary
rather than merely nice.

**Decisions:**
- **No delete path for lead data.** The inbox exposes read and the flag toggle
  only, backed by purpose-built actions rather than `adminCrud` — the submission
  tables stay out of `ALLOWED_TABLES`.
- **Spam overrides append to `spam_reason`**, never overwrite. A submission the
  heuristics called spam and a human overruled is the most informative row in the
  table for future tuning.
- **Address history is advisory, not scored.** Feeding "seen before" back into
  the heuristics would make one false positive self-reinforcing.

**Known gaps:** Turnstile and Upstash still unprovisioned; `ABUSE_LOG_SALT` unset,
so IPs are not recorded at all (deliberate — an unsalted hash of an IPv4 address
is trivially reversible). No forgot-password flow exists for the admin portal, and
no admin account has MFA.

---

## 2026-08-21 — Session: Anti-spam stack (SECURITY_PLAN finding 3)

> A separate, higher-priority issue was found during this session and is recorded in
> `docs/SECURITY_PLAN.md` (kept out of version control — this file is public).

**What was built** — new `src/lib/security/` module:
- `spam.ts` — honeypot, time-trap, and content heuristics (vowel ratio, consonant
  runs, capitalisation entropy, link count, embedded markup)
- `origin.ts` — Origin/Referer allow-list + client IP extraction
- `rate-limit.ts` — per-IP limits, Upstash REST backend with in-memory fallback
- `turnstile.ts` — Cloudflare siteverify, dormant without a secret key
- `form-guard.ts` — orchestrates the four layers; `insertWithSpamFlags()` helper
- `components/shared/TurnstileWidget.tsx` — renders nothing without a site key
- `supabase/migrations/0003_spam_flags.sql` — `is_spam` + `spam_reason` columns

**Wired into**: `api/contact/route.ts`, `api/partner/route.ts`, `ContactForm.tsx`,
`PartnerForm.tsx`, `admin/page.tsx` (filters flagged rows), `types/database.ts`.

**Decisions:**
- **No new npm packages and no accounts required.** Turnstile and Upstash are both
  reachable over plain `fetch`, and both layers stay inert until their env vars
  exist. The user's call — they didn't want external dependencies yet.
- **Flag, don't drop.** Suspicious submissions are stored with a reason and skip the
  email, preserving the audit trail so thresholds can be tuned against real traffic.
- **Fake HTTP 200 on rejection** so bots can't tune against real error messages.
- **Fail open everywhere.** If Upstash or Cloudflare is unreachable the submission
  goes through — a dropped real lead costs more than a leaked spam message.
- **Two signals must agree** before flagging (threshold 4, signals worth 2–4).

**Testing:** 21-case suite (real spam sample, 6 bot behaviours, 14 legitimate
submissions). Spam sample scores 16; every legitimate case scores 0. The suite
caught three false positives that reasoning alone had missed — all-caps acronym
companies, accented names, and ordinary two-word names — each traced to measuring
letters across word boundaries or dropping non-ASCII characters. Origin rejection
and rate limiting verified live against the dev server.

The suite is committed at `scripts/spam-heuristics.test.js` and runs via
**`npm run test:spam`** — the project's first automated test. It has no runner
behind it (a plain node script against transpiled output) because `next.config.ts`
still disables type checking; fold it into a real runner when finding 8 lands.

**Known gaps:** the in-memory rate limiter is per-instance, so it is only partial
cover on Vercel until Upstash is provisioned.

---

## 2026-04-01 — Session: Environment Setup & Planning

**What was done:**
- Created `CLAUDE.md` — project context file for all future Claude Code sessions
- Created `design-guidelines.md` — full design system reference (colors, typography, spacing, components)
- Created `style-guide.jsx` — interactive React component to preview the design system
- Created `docs/ROADMAP.md` — prioritised feature roadmap across 4 phases
- Created `docs/FEATURE_LOG.md` — this file
- Audited full codebase structure and documented it in CLAUDE.md

**Current state of the codebase:**
- Next.js 16 App Router with all 6 public pages scaffolded
- Admin portal with CRUD for: clients, case-studies, products, partners, batches, stats
- Supabase integration: clients, stats fetched server-side on home page
- Contact + partner forms wired to Resend email
- Responsive Navbar with mobile hamburger menu
- ServicesGrid, StatsBar, Hero all updated and redesigned
- Modified but uncommitted: layout.tsx, ServicesGrid.tsx, StatsBar.tsx, Navbar.tsx, storage-actions.ts, supabase_migration.sql

**Known issues / gaps:**
- Testimonials, CGAP, Products pages may have static placeholder content (not fully wired to Supabase)
- No per-page SEO metadata
- No individual case study detail pages
- Admin portal has no auth gate (open at /admin)
- No 404 page

---

## Previous Sessions (from git history)

### b87674c — Redesign hero page to match wireframe + fix footer visibility
- Hero component redesigned to match wireframe layout
- Footer visibility issue resolved

### ee83956 — Fix database schema issues, add dynamic stats management, refine admin portal
- Database schema fixes applied
- Dynamic stats table created (`stats` table in Supabase)
- Admin portal stats management page added
- StatsBar component updated to read from Supabase

### a727091 — Refine website design: Persona-specific styling, updated forms, restructured pages
- Persona-based styling introduced (PersonaBridge component)
- ContactForm updated with Region and Industry fields
- Product, Partner, CGAP pages restructured

### 63b1f68 — Add comprehensive hand-off document for Phase 2 & 3
- `HANDOFF_SUPABASE_PHASE_2_3.md` added to document Supabase integration details

---

*Last updated: 2026-08-27*
