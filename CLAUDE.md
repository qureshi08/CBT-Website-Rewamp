# CLAUDE.md — CBT Website Project Context

> Read this file at the start of every session. It is the single source of truth for how to work on this project.

---

## Project Overview

**Client**: Convergent Business Technologies (CBT)
**Sector**: Data, Cloud & AI Consultancy
**Stack**: Next.js 16 (App Router) + Tailwind CSS 4 + Supabase + TypeScript
**Goal**: Marketing + lead-gen website with admin portal for managing dynamic content

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, RSC-first) |
| Styling | Tailwind CSS 4 + CSS Custom Properties (see `globals.css`) |
| Database | Supabase (PostgreSQL + Row Level Security) |
| Auth | Supabase Auth (admin portal) |
| Email | Nodemailer (SMTP) — Resend client also present in `lib/` |
| Forms | React Hook Form + Zod |
| Icons | Lucide React (stroke 1.5px, 20–24px) |
| Fonts | Playfair Display (headings), DM Sans (body), JetBrains Mono (code) |
| Deployment | Vercel (expected) |

---

## Design System — Quick Reference

All design tokens are in `src/app/globals.css`. **Never hardcode colors or spacing.**

### Key Color Tokens
```css
--color-primary:       #00994D  /* CBT Green — CTAs, accents */
--color-primary-light: #00C060  /* Hover states */
--color-primary-dark:  #007A3D  /* Active states */
--color-primary-muted: #E6F5ED  /* Tinted backgrounds */
--color-text-heading:  #111827
--color-text-body:     #374151
--color-text-muted:    #6B7280
--color-border:        #E2E8E4
--color-surface:       #F7F8F7
```

### Key Font Tokens
```css
--font-heading: 'Playfair Display', serif   /* H1–H3, weight 700 */
--font-body:    'DM Sans', sans-serif       /* UI, nav, body */
--font-mono:    'JetBrains Mono', monospace /* Code */
```

### Utility Classes (pre-built in globals.css)
- `.btn-primary` / `.btn-secondary` / `.btn-ghost` / `.btn-outline` — CTA buttons
- `.hero-btn-primary` / `.hero-btn-secondary` — hero-weight CTAs
- `.btn-cta-white` / `.btn-cta-ghost` — buttons used inside `.cta-band` (green strip)
- `.card` — Standard card with hover shadow (only use on clickable cards — non-clickable cards must not hover)
- `.section-heading` / `.section-sub` / `.section-tag` — Section typography
- `.section-padding` / `.section-padding-lg` — Vertical rhythm tokens (80px / 96px)
- `.container-main` / `.v2-wrap` — `max-width: 1200px`, centered (use `.v2-wrap` inside new sections; both are interchangeable)
- `.cta-band` — Full-width green CTA strip
- `.v2-reveal` — Scroll-reveal animation class. Starts at `opacity: 0`; requires a client-side observer. Drop `<ClientReveal />` (from `components/shared/ClientReveal.tsx`) into any Server Component page that uses it, otherwise elements stay invisible.

Full reference: `design-guidelines.md` | Interactive preview: `style-guide.jsx`

---

## Project Structure

```
src/
  app/
    (public)/                    ← Public-facing pages (Navbar + Footer layout)
      page.tsx                   ← Home
      services/                  ← Capabilities (strategy / foundations / intelligence)
      case-studies/              ← Index + [slug] detail pages
      industries/[slug]/         ← Per-industry landing pages (retail, banking, telecom, …)
      products/                  ← Product catalogue
      products/ecl-calculator/   ← Hero SKU detail page (IFRS 9 ECL)
      cbt-custom-visuals/        ← Custom data visuals gallery
      cbt-custom-visuals/[slug]/ ← Visual detail page
      partners/                  ← Partnership enquiry
      about/                     ← About CBT
      cgap/                      ← CGAP graduate program
      contact/                   ← Contact form
      privacy-policy/            ← Privacy policy
      layout.tsx                 ← Wraps all public pages with Navbar + Footer
    admin/                       ← Admin portal (authenticated)
      page.tsx                   ← Dashboard
      clients/                   ← Manage clients
      case-studies/              ← Manage case studies
      industries/                ← Manage industry landing pages
      services/                  ← Manage /services capabilities
      products/                  ← Manage products
      partners/                  ← Manage partner logos
      testimonials/              ← Manage testimonials
      batches/                   ← Manage CGAP cohorts
      alumni/                    ← Manage CGAP alumni
      stats/                     ← Manage homepage stats
      layout.tsx
    api/
      contact/route.ts           ← Contact form submissions → Resend email
      partner/route.ts           ← Partner enquiries → Resend email
    layout.tsx                   ← Root layout (Google Fonts, metadata)
    globals.css                  ← ALL CSS tokens + utility classes

  components/
    home/                        ← Hero, ServicesGrid, CaseStudiesFeatured, Differentiators,
                                   CredentialsBar, Testimonials, ClientLogoStrip, OrbitLogos,
                                   StatsBar, CGAPTeaser, CtaBand
    services/                    ← CapabilityTile, ToolsStrip, EngagementCard,
                                   PrinciplesStrip, ServicesFAQ (used by /services)
    layout/                      ← Navbar, Footer
    contact/                     ← ContactForm
    partners/                    ← PartnerForm
    products/                    ← ProductFilter
    shared/                      ← SectionHeader, PersonaBridge, Icons, Illustrations,
                                   ClientReveal, ScrollRevealInit
    ui/                          ← Modal, ImageUpload, FlipWords, InfiniteSlider,
                                   BackgroundPaths, NavigationMenu, ProgressiveBlur

  lib/
    actions/
      admin-actions.ts           ← Generic CRUD server actions for admin portal
      storage-actions.ts         ← Supabase Storage file upload
    supabase/
      client.ts                  ← Browser Supabase client
      server.ts                  ← Server Supabase client (with cookies)
      admin.ts                   ← Service-role admin client
    industries/
      public.ts                  ← Public industries data fetcher
    resend.ts                    ← Resend email client (legacy)
    utils.ts                     ← Shared utilities

  types/
    database.ts                  ← Full TypeScript types for all Supabase tables
```

---

## Database Tables

| Table | Purpose |
|---|---|
| `clients` | Client logos + info for logo strip / case studies |
| `case_studies` | Case study content (linked to `industries` via `industry_slug`) |
| `industries` | Industry landing pages (`/industries/[slug]`) — retail, banking, telecom, … |
| `services` | Capabilities shown on `/services` (strategy / foundations / intelligence) |
| `testimonials` | Homepage/page testimonials (scoped by `page` column) |
| `products` | Product catalogue (categories incl. ECL Calculator hero SKU) |
| `partners` | Partner logos |
| `stats` | Dynamic homepage stat counters |
| `cgap_cohorts` | CGAP program batch info |
| `cgap_alumni` | CGAP alumni for social proof |
| `contact_submissions` | Form submissions from /contact |
| `partner_enquiries` | Form submissions from /partners |

---

## Page Inventory

| Route | Page | Audience |
|---|---|---|
| `/` | Home | All |
| `/services` | Capabilities (Data, Cloud & AI — end to end) | Enterprise + SME |
| `/case-studies` | Case studies index | SME + Enterprise |
| `/case-studies/[slug]` | Case study detail | SME + Enterprise |
| `/industries/[slug]` | Industry landing (retail, banking, telecom, …) | Enterprise + SME |
| `/products` | Product catalogue | All clients |
| `/products/ecl-calculator` | ECL Calculator detail (hero SKU) | Banks / lenders |
| `/cbt-custom-visuals` | Custom data visuals gallery | All |
| `/cbt-custom-visuals/[slug]` | Visual detail | All |
| `/partners` | Partner enquiry | Potential partners |
| `/about` | About CBT | All |
| `/cgap` | CGAP Graduate Program | Graduates |
| `/contact` | Contact | All |
| `/privacy-policy` | Privacy policy | All |
| `/admin` | Admin Dashboard | Internal |

---

## Development Commands

```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
npm run lint    # ESLint check
```

## Environment Variables (required in `.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SMTP_USER=                # Gmail address used by Nodemailer
SMTP_PASS=                # Gmail App Password
RESEND_API_KEY=           # legacy — Resend client kept in lib/
RESEND_TO_EMAIL=          # legacy
```

---

## Code Conventions

- **RSC-first**: Pages are Server Components by default. Add `'use client'` only when needed (event handlers, hooks, animations).
- **Scroll reveal on Server Component pages**: Any page that uses `.v2-reveal` must mount `<ClientReveal />` once (see `components/shared/ClientReveal.tsx`). Without it, revealed elements stay at `opacity: 0`.
- **No hardcoded colors/spacing**: Always use CSS variables from `globals.css`.
- **Component naming**: PascalCase files, kebab-case CSS classes.
- **Mobile-first CSS**: Base styles for mobile, `min-width` media queries to scale up.
- **Styling approach**: Mostly vanilla CSS in `globals.css` using CSS variables, plus inline React styles for one-off layout. Tailwind is available but used sparingly — prefer the utility classes already in `globals.css` before adding Tailwind.
- **Hover effects**: Only apply hover to interactive elements (links, buttons, cards wrapped in `<Link>`, form inputs). Content cards that aren't clickable must not have hover states — it misleads the user. If a card looks clickable, either wrap it in a `<Link>` or strip the hover.
- **Section headers**: Big capability-page sections use the homepage heading scale — `clamp(2.4rem, 4vw, 3.4rem)`, `line-height: 1.1`, `letter-spacing: -0.02em`, `margin-bottom: 20px`. Sub copy uses `17.5px / fw 300 / lh 1.7`. Sections have `padding: 120px 0` desktop, `80px 0` at ≤640px. The `.services-section-*` family already encodes this.
- **Icons**: Lucide React or the custom `Icons.tsx` set (`components/shared/Icons.tsx`). `size={20}` or `size={24}`, `strokeWidth={1.5}`.
- **Accessibility**: Semantic HTML, WCAG AA contrast, keyboard nav, descriptive alt text.
- **Form pattern**: React Hook Form + Zod schema + server action or API route.

---

## Target Audiences (affects tone and design choices)

1. **Enterprise & SME** — Business owners seeking data transformation, cloud, AI
2. **Startup partners** — Early-stage companies adopting AI for first time
3. **Potential partners** — Other consultancies exploring collaboration
4. **Graduate talent** — Uni graduates seeking the CGAP program (warmer, encouraging tone)

---

## Roadmap & Feature Tracking

See `docs/ROADMAP.md` for planned features and priorities.
See `docs/FEATURE_LOG.md` for what has been built and current status.

---

*Last updated: 2026-05-04*
