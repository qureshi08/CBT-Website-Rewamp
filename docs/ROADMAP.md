# CBT Website — Feature Roadmap

> Tracks planned features, improvements, and priorities. Update this as work progresses.

---

## Legend
- `[ ]` Not started
- `[~]` In progress
- `[x]` Done

---

## Phase 1 — Foundation (COMPLETE)
Core structure, design system, and basic pages.

- [x] Next.js 16 App Router project setup
- [x] Tailwind CSS 4 + CSS custom properties design system
- [x] Google Fonts (Playfair Display, DM Sans, JetBrains Mono)
- [x] Navbar (responsive, mobile hamburger menu)
- [x] Footer with CTA band
- [x] Home page (Hero, ServicesGrid, StatsBar, Testimonials, ClientLogoStrip, CGAPTeaser)
- [x] Customers / Case Studies page
- [x] Partners enquiry page + form
- [x] Products catalogue page with filter
- [x] CGAP graduate program page
- [x] Contact page + form
- [x] Supabase integration (clients, stats, testimonials fetched server-side)
- [x] Admin portal (dashboard + CRUD for all tables)
- [x] Contact form → Resend email notification
- [x] Partner enquiry → Resend email notification
- [x] TypeScript database types

---

## Phase 2 — Content & UX Polish

### High Priority
- [ ] **Case Studies** — Full detail pages (`/customers/[slug]`) with rich content layout
- [ ] **Testimonials section** — Wire up to Supabase `testimonials` table (currently static?)
- [ ] **Client Logo Strip** — Wire up to Supabase `clients` table (confirm dynamic)
- [ ] **CGAP page** — Wire up cohort data from `cgap_cohorts` + alumni from `cgap_alumni`
- [ ] **Products page** — Wire up full product cards from `products` table
- [ ] **SEO metadata** — Per-page `generateMetadata()` for all public routes
- [ ] **Scroll animations** — Implement `IntersectionObserver` fade-up on section entry
- [ ] **Mobile QA** — Full responsive audit across all pages

### Medium Priority
- [ ] **Partners page** — Show partner logos grid from `partners` table
- [ ] **404 page** — Custom not-found page matching brand
- [ ] **Loading states** — Skeleton loaders for dynamic content
- [ ] **Form success/error states** — Visual feedback after form submission
- [ ] **Open Graph images** — Social sharing preview images per page

---

## Phase 3 — Advanced Features

- [ ] **Blog / Insights section** — `/insights` with markdown or Supabase-backed posts
- [ ] **Case study filtering** — Filter by service area, industry, client type
- [ ] **Product detail pages** — `/products/[slug]` with full feature breakdown
- [ ] **CGAP application flow** — Multi-step application form for graduates
- [ ] **Search** — Global site search (at minimum products + case studies)
- [ ] **Cookie consent banner** — GDPR compliance
- [ ] **Analytics** — Vercel Analytics or Plausible integration
- [ ] **Sitemap + robots.txt** — Auto-generated from Next.js

---

## Phase 4 — Performance & Quality

- [ ] **Core Web Vitals audit** — Target LCP < 2.5s, CLS < 0.1, FID < 100ms
- [ ] **Image optimisation** — All images through Next.js `<Image>` with proper sizes
- [ ] **Font subsetting** — Reduce font payload
- [x] **Admin auth** — Supabase Auth gate on `/admin/**` routes (`src/proxy.ts`, + `@convergentbt.com` domain restriction)
- [~] **Form anti-abuse** — honeypot, time-trap, content heuristics, email-alias detection, origin check and per-IP rate limiting on `/api/contact` and `/api/partner` (`src/lib/security/`). Live since 2026-08-27; validated at 52% spam across existing traffic. Turnstile and Upstash wired but awaiting accounts.
- [x] **Submissions inbox** — `/admin/submissions`: contact and partner enquiries, clean/flagged tabs, search, pagination, manual spam override. No delete path for lead data.
- [ ] **Admin password reset** — no forgot-password flow exists; the login page only signs in. Needs `resetPasswordForEmail()` plus an `/admin/reset-password` page, otherwise Supabase's recovery email has nowhere to land.
- [ ] **Admin MFA** — no admin account has a second factor.
- [~] **Motion pass** — full audit done (11 findings + 3 opportunities); plans in
  `plans/`. Done: duplicate-keyframe override removed, scroll-reveal observer
  lifecycle fixed, press feedback added. Remaining: `003` hero orbit → CSS
  (up to 27 main-thread tweens today), `004` real `prefers-reduced-motion`
  coverage (JS motion currently ignores it). 003 before 004.
- [ ] **Hover gating for touch** — 66 `:hover` rules, none behind
  `@media (hover: hover)`; taps leave hover states stuck on mobile
- [ ] **Motion token consolidation** — `--ease` and `--ease-v2` are identical,
  plus 7 hand-typed copies of the same curve; two parallel scroll-reveal systems
- [ ] **`next.config.ts` cleanup** — `eslint` key is unrecognised in Next 16 and
  silently ignored
- [ ] **Error boundary** — Graceful error states for failed Supabase fetches
- [ ] **E2E tests** — Playwright smoke tests for key user journeys (contact form, nav)
- [ ] **Accessibility audit** — Full WCAG AA pass

---

## Backlog / Ideas
- Dark mode toggle
- Multilingual support
- PDF brochure download from products page
- Live chat widget integration
- Calendly / booking integration on contact page

---

> Security remediation is tracked separately in `docs/SECURITY_PLAN.md` (kept out of
> version control, since this repo is public). Check it before starting work — its
> open items take priority over this roadmap.

*Last updated: 2026-08-27*
