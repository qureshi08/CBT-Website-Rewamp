# CBT Website — Feature Log

> Chronological record of what has been built, changed, and the decisions behind it.

---

## 2026-08-28 — Session: Repository cleanup

Removed 15 files that nothing referenced, and corrected the docs that described
the repo as it was rather than as it is.

**Deleted:**
- **Scratch** — `mcp-input.json` (36 bytes, a leftover title string), `tmp/`
  (two near-duplicate Supabase debug scripts; the `.mjs` contained TypeScript
  syntax and could never have run), and `.add_git_to_path.ps1`, which hardcoded
  a local disk path and published it to a public repo.
- **Dead components** — `StatsBar`, `AboutTheFirm`, `CGAPTeaser` and
  `SectionHeader` (~19 KB). Verified unimported two ways: by import-path
  matching and by searching the export names directly.
- **Design source material** — the wireframe HTML, the sample homepage, and the
  three animation reference files (~150 KB). All recoverable from git history.
- **`style-guide.jsx`** — a React viewer for `design-guidelines.md`, untouched
  since April and unrunnable (root-level `.jsx`, nothing imports it, no route
  renders it). It had drifted badly: a `/training` route that never existed, 6
  of 14 pages, a fabricated testimonial, and a third hand-maintained copy of
  tokens that already live in `globals.css`. It had no motion section at all,
  and used `transition: all` twice — which `design-guidelines.md` §8 calls
  "always a defect".
- **`HANDOFF_SUPABASE_PHASE_2_3.md`** — from March, superseded by `CLAUDE.md`.

**Kept, against first appearances:** `supabase_migration.sql` looked like an
obvious deletion — 21 KB at root, untouched since April, apparently superseded
by `supabase/migrations/`. It is not. That directory only creates
`custom_visuals` and `form_abuse_log`; the base schema for `industries`,
`partners`, `services`, `stats` and `testimonials` exists **only** in the root
file. Also kept `src/lib/industries/public.ts` — unused, but a purposeful
fetcher that reads as planned work rather than debris.

**`README.md` rewritten.** It linked six documentation files that do not exist
(`HANDOFF_GUIDE.md`, `01_BRD.md`, `02_PRD.md`, `03_UX_UI_Design.md`,
`04_C4_Architecture.md`, `11-03-2026/01_Wireframes_V2.md`), described a
`/customers` route that is now `/case-studies`, claimed Next.js 14 (it is 16),
listed Supabase and Resend as "Phase 2" pending when both have shipped, and
documented a five-colour persona design system that no longer exists —
`#2D7D46` and `#8B5CF6` have zero occurrences in `globals.css`. Rewritten
against the actual codebase, with the dev-server-vs-build hazard noted.

**Known gap surfaced, not fixed:** seven tables — `clients`, `case_studies`,
`products`, `cgap_cohorts`, `cgap_alumni`, `contact_submissions` and
`partner_enquiries` — have no `CREATE TABLE` statement anywhere in the repo.
The schema record is incomplete regardless of this cleanup.

Verified after deletion: `tsc` holds at the pre-existing 18 errors, build clean
at 50/50 static pages, `test:spam` 31/31.

---

## 2026-08-28 — Session: Reduced motion actually honoured (plan 004) — motion pass complete

The site's entire reduced-motion policy was a ten-line blanket reset that
crushed every animation and transition to `0.01ms`. It looked like a policy and
functioned as almost none.

It failed three ways. It could not reach JavaScript-driven motion at all, so the
rotating hero headline, the logo strip, 72 animated background paths on `/cgap`
and the product illustrations all ignored the preference outright. `0.01ms` on
an *infinite* animation does not stop it — it runs it as fast as the browser
allows. And flattening every transition also stripped the colour and border
feedback that helps a user understand what just happened.

Replaced with a targeted block: decorative loops stop outright, entrance
animations resolve instantly, scroll reveals keep the fade and lose the travel,
hover lifts flatten while colour and shadow survive. The four JS components are
now gated with Framer Motion's `useReducedMotion()`.

**The reconciliation caught a defect that would have made this worse than doing
nothing.** The plan's hand-written hover list named 13 selectors; the codebase
has **27** `:hover` rules that set a transform. That gap is not cosmetic, because
of how the two mechanisms interact: the blanket reset freezes *everything*, while
a targeted list freezes only what it names. Deleting the blanket and shipping 13
selectors would have un-frozen the other 14 and let them animate at full
duration — reduced-motion users would have ended up with **more** visible
movement than before, on the case-studies grid, the products grid, the nav and
the services page. An accessibility commit that regressed accessibility.

All 27 were enumerated mechanically and the audit re-run to zero gaps.

**Decisions:**
- **Enumerate rather than catch-all.** `*:hover { transform: none }` has
  specificity 0-1-0 and loses to every `.class:hover` at 0-2-0; winning needs
  `!important`, which then fights every future override. The enumerated list
  rots as the codebase grows, so it carries a comment saying so and the plan
  carries a re-runnable audit snippet.
- **Two `::before { scaleX(1) }` underline reveals deliberately left alone.**
  They are state indicators, not decoration — setting them to `none` deletes the
  hover affordance rather than calming it, which is worse for everyone.
- **Both `scale(1.04)` image zooms included.** A photo growing under the cursor
  is exactly the movement the preference asks us to stop.
- **`background-paths.tsx` needed scalars, not `duration: 0`.** Its animation
  target holds keyframe *arrays* (`opacity: [0.25, 0.5, 0.25]`), which are
  sequences rather than endpoints and have no defined resting value at zero
  duration. Also worth noting the file uses `Number.POSITIVE_INFINITY`, so a
  grep for `repeat: Infinity` misses 72 infinite tweens entirely.
- **`flip-words.tsx` renders plain text when reduced**, not a frozen
  `motion.div`. Stopping the 3s cycle alone was not enough — the per-letter
  spans animate blur and travel on mount, so the first word would still have
  assembled itself letter by letter.

This completes the five-plan motion pass. `design-guidelines.md` §8 gained a
"Migrating off the blanket reset" subsection so the trap above does not have to
be rediscovered on the next CBT product.

**Known gaps:** the enumerated hover list is exhaustive today and will drift.
66 `:hover` rules are still ungated for touch (`@media (hover: hover)`), which
is tracked separately. `next.config.ts` still has its unrecognised `eslint` key.

---

## 2026-08-28 — Session: Hero orbit moved off the main thread (plan 003)

The homepage hero's three logo rings were animated by Framer Motion tweens that
never stopped — 3 ring rotations plus up to 24 chip counter-rotations, **up to 27
concurrent infinite JS-driven animations**, running for as long as the homepage
was open. Framer Motion writes the transform from JavaScript each frame, so all
of it competed with hydration, scroll reveals and the logo-mosaic timer on the
site's most-visited page, and the tab never went quiet.

Replaced with two CSS keyframes (`orbitSpin` / `orbitSpinReverse`) applied by
class, with each element's speed passed down as a `--orbit-duration` custom
property read from the existing `RING_CONFIG`. The compositor now owns the
rotation. `framer-motion` is no longer imported by this component; five others
still use it, so the dependency stays.

**Visually identical by design** — same radii, durations, phases and directions.
This changed the driver, not the design. The one intended difference: the orbit
now honours `prefers-reduced-motion` and stops dead. It previously ignored the
setting entirely, because the stylesheet's blanket reset only ever reached CSS
animations, and the single largest moving element on the site was not one.

**The check that mattered** was counting `data-direction="-1"` in the served
HTML: **9**. That is only correct if exactly one ring is reversed (the 280px
eight-slot middle ring) and its eight chips inherit it. Any other number means
chips counter-rotate against the wrong parent — which manifests as logos slowly
tilting over ~90 seconds, not as anything visible on load.

**Decisions:**
- **`will-change` on the 3 rings, not the 24 chips**, departing from the plan.
  Browsers already promote an infinite transform animation to its own layer, so
  on the chips the declaration buys nothing while forcing up to 24 extra
  compositor layers — GPU memory, and softer logo rasterisation on some hardware.
- **Durations stayed inline rather than moving into CSS.** They belong to
  `RING_CONFIG` alongside the radii and slot maths that position the chips;
  splitting them across two files would let the ring and its chips desync, and
  desync is exactly the failure mode this component cannot tolerate.

**Known gaps:** plan 004 remains — the blanket `prefers-reduced-motion` reset
still fails to reach four mounted JS components, including the rotating hero
headline. 003 was its blocker, so it is now unblocked.

A cold `npm run build` failed once with 60s static-generation timeouts on `/`,
`/partners` and `/products/ecl-calculator`, then passed twice. Transient
Supabase latency during data collection, not a regression — confirmed by
building the stashed baseline and the change separately. Two of the three
failing routes do not render the changed component at all, which is the quickest
way to recognise this.

---

## 2026-08-27 — Session: Motion audit, and three of five fixes shipped

Installed Emil Kowalski's `animate`, `apple-design`, `review-animations` and
`improve-animations` skills (from `emilkowalski/skills`, user-level so they stay
out of this public repo), then ran a full motion audit of the site.

**Audit result**: 11 findings + 3 missed opportunities. Notably clean on the
basics — no `ease-in` anywhere, no `scale(0)` in CSS, no animated layout
properties on hover, stagger classes already present. The problems were
consolidation and accessibility, not taste.

The top five by leverage were written up as self-contained plans in `plans/`
(exact line references, verbatim current code, exact target values, and a feel
check each), so any agent can execute them. Three landed:

**`0dd0730` — nine `@keyframes` were defined twice.** CSS has no keyframe
scoping, so the second block won site-wide and the authored definitions were
dead. The overriding block had no consumers of its own — it was written for an
illustration component since rewritten in Framer Motion. Deleting it restored
the intended values: `fadeUp` travels 28px not 15px, `scaleIn` starts at 0.93
not 0.9, and the 13 status dots stopped scaling. 95 deletions, zero insertions.

**`e9f8cb5` — `useScrollReveal` had no dependency array and never unobserved.**
It rebuilt a page-wide `IntersectionObserver` on every render and kept firing
callbacks on already-revealed elements. Fixed with `[]`, `unobserve()`, and a
`:not(.v2-in)` guard. The trade-off is now documented: the hook scans once per
mount, so a `.v2-reveal` element rendered after hydration would never appear.
Verified nothing does that today — no `Suspense`, `next/dynamic`, `React.lazy`
or `loading.tsx` anywhere, and no reveal element sits behind a conditional.

**`54bb4dd` — press feedback.** There were zero `:active` rules in 6,300 lines,
yet eight button selectors already declared `transform 0.15s` for feedback
nobody had written. Ten selectors now depress on press, composed with the hover
lift as `translateY(0) scale(0.97)` so they push down and in rather than
dropping to baseline first.

**Parked at plan 002.** Remaining: **003** (move the hero orbit from up to 27
concurrent main-thread Framer Motion tweens to CSS) and **004** (replace the
blanket `prefers-reduced-motion` reset, which only reaches CSS — four mounted JS
components, including the rotating hero headline, currently ignore the
preference entirely). 003 must run before 004.

**`design-guidelines.md` section 8 rewritten** from what the audit actually
found, and the document rescoped as the standard for all CBT products rather
than this website alone. It had been recommending the blanket reduced-motion
reset that plan 004 exists to remove.

**Decisions:**
- **Plans over direct fixes.** Writing the audit down as executable plans means
  the reasoning survives the session and the remaining two can be picked up cold.
- **Skills installed user-level, not project-level.** They work across every
  project and stay out of this public repo.
- **`pulse` restored to opacity-only** rather than keeping the accidental
  scale — the scale was an artefact of the override, and opacity-only is both
  what the author wrote and the more restrained reading.

**Known gaps:** plans 003 and 004 unexecuted. `next.config.ts` has an `eslint`
key that Next 16 no longer recognises and silently ignores.

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

*Last updated: 2026-08-28*
