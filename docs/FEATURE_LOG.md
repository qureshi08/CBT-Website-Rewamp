# CBT Website — Feature Log

> Chronological record of what has been built, changed, and the decisions behind it.

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

*Last updated: 2026-04-01*
