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
| Email | Resend API |
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
- `.btn-primary` / `.btn-secondary` — CTA buttons
- `.card` — Standard card with hover shadow
- `.section-heading` / `.section-sub` / `.section-tag` — Section typography
- `.container-main` — `max-width: 1200px`, centered
- `.cta-band` — Full-width green CTA strip
- `.fade-up` — Scroll-reveal animation class

Full reference: `design-guidelines.md` | Interactive preview: `style-guide.jsx`

---

## Project Structure

```
src/
  app/
    (public)/           ← Public-facing pages (Navbar + Footer layout)
      page.tsx          ← Home
      customers/        ← Case studies / client showcase
      partners/         ← Partnership enquiry
      products/         ← Product catalogue
      cgap/             ← CGAP graduate program
      contact/          ← Contact form
      layout.tsx        ← Wraps all public pages with Navbar + Footer
    admin/              ← Admin portal (authenticated)
      page.tsx          ← Dashboard
      clients/          ← Manage clients
      case-studies/     ← Manage case studies
      products/         ← Manage products
      partners/         ← Manage partner logos
      batches/          ← Manage CGAP cohorts
      stats/            ← Manage homepage stats
      layout.tsx
    api/
      contact/route.ts  ← Contact form submissions → Resend email
      partner/route.ts  ← Partner enquiries → Resend email
    layout.tsx          ← Root layout (Google Fonts, metadata)
    globals.css         ← ALL CSS tokens + utility classes

  components/
    home/               ← Hero, ServicesGrid, StatsBar, Testimonials, ClientLogoStrip, CGAPTeaser
    layout/             ← Navbar, Footer
    contact/            ← ContactForm
    partners/           ← PartnerForm
    products/           ← ProductFilter
    shared/             ← SectionHeader, PersonaBridge
    ui/                 ← Modal, ImageUpload (reusable primitives)

  lib/
    actions/
      admin-actions.ts  ← Generic CRUD server actions for admin portal
      storage-actions.ts← Supabase Storage file upload
    supabase/
      client.ts         ← Browser Supabase client
      server.ts         ← Server Supabase client (with cookies)
      admin.ts          ← Service-role admin client
    resend.ts           ← Resend email client

  types/
    database.ts         ← Full TypeScript types for all Supabase tables
```

---

## Database Tables

| Table | Purpose |
|---|---|
| `clients` | Client logos + info for logo strip / case studies |
| `case_studies` | Case study content |
| `testimonials` | Homepage/page testimonials |
| `products` | Product catalogue |
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
| `/customers` | Customers / Case Studies | SME + Enterprise |
| `/partners` | Partner Enquiry | Potential partners |
| `/products` | Product Catalogue | All clients |
| `/cgap` | CGAP Graduate Program | Graduates |
| `/contact` | Contact | All |
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
RESEND_API_KEY=
RESEND_TO_EMAIL=
```

---

## Code Conventions

- **RSC-first**: Pages are Server Components by default. Add `'use client'` only when needed (event handlers, hooks, animations).
- **No hardcoded colors/spacing**: Always use CSS variables from `globals.css`.
- **Component naming**: PascalCase files, kebab-case CSS classes.
- **Mobile-first CSS**: Base styles for mobile, `min-width` media queries to scale up.
- **Tailwind + CSS Variables together**: Tailwind for layout/flex/grid/margin, CSS vars for brand tokens.
- **Icons**: Lucide React only. `size={20}` or `size={24}`, `strokeWidth={1.5}`.
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

*Last updated: 2026-04-01*
