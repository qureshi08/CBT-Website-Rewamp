# CBT Website — Feature Log

> Chronological record of what has been built, changed, and the decisions behind it.

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

*Last updated: 2026-08-21*
