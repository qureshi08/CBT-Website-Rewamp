# Convergent Business Technologies — Website

The official website for **Convergent Business Technologies (CBT)** — a data, cloud and AI consultancy with clients including Pepsi, Microsoft, Coca-Cola, KPMG, Dabur, and UNICEF.

## 🚀 Live Site

**Coming Soon** — `convergentbt.com`

## 📋 Overview

A marketing and lead-generation site with an authenticated admin portal for managing dynamic content. It serves four distinct audiences:

| Audience | Primary pages | Purpose |
|---|---|---|
| **Enterprise & SME clients** | `/services`, `/industries/[slug]`, `/case-studies` | Build confidence for prospective clients |
| **Potential partners** | `/partners` | Attract co-delivery and technology partners |
| **All clients** | `/products`, `/cbt-custom-visuals` | Showcase Power BI custom visuals & tools |
| **Graduate talent** | `/cgap` | Attract applicants to the CGAP graduate program |

Plus: Homepage (`/`), About (`/about`), Contact (`/contact`), Privacy Policy, the admin portal at `/admin`, and API routes for form submissions.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router, RSC-first) with TypeScript
- **Styling:** Tailwind CSS 4 + CSS custom properties — most styling is vanilla CSS in `src/app/globals.css`
- **Database:** Supabase (PostgreSQL + Row Level Security)
- **Auth:** Supabase Auth, gating `/admin/**`
- **Email:** Nodemailer over SMTP (a Resend client remains in `lib/` as legacy)
- **Forms:** React Hook Form + Zod validation
- **Animation:** Framer Motion, plus CSS keyframes for predetermined motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables, then fill in .env.local
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint

# Run the spam-heuristics test suite
npm run test:spam
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

> **Note:** `next build` and `next dev` share the `.next` directory. Stop the dev server before building, or the running server's render worker will crash.

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/                 # Public pages (Navbar + Footer layout)
│   │   ├── page.tsx              # Homepage
│   │   ├── services/             # Capabilities
│   │   ├── case-studies/         # Index + [slug] detail
│   │   ├── industries/[slug]/    # Per-industry landing pages
│   │   ├── products/             # Catalogue + ecl-calculator detail
│   │   ├── cbt-custom-visuals/   # Gallery + [slug] detail
│   │   ├── partners/             # Partner enquiry
│   │   ├── about/                # About CBT
│   │   ├── cgap/                 # CGAP graduate program
│   │   ├── contact/              # Contact form
│   │   └── privacy-policy/
│   ├── admin/                    # Authenticated portal (CRUD + submissions inbox)
│   ├── api/
│   │   ├── contact/route.ts      # Contact form handler
│   │   └── partner/route.ts      # Partner enquiry handler
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   └── globals.css               # ALL CSS tokens + utility classes
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── home/                     # Hero, ServicesGrid, OrbitLogos, Testimonials, …
│   ├── services/ contact/ partners/ products/
│   ├── shared/                   # PersonaBridge, Icons, Illustrations, ClientReveal
│   └── ui/                       # Modal, ImageUpload, FlipWords, InfiniteSlider, …
├── lib/
│   ├── actions/                  # Server actions (admin CRUD, storage)
│   ├── supabase/                 # Browser, server and service-role clients
│   └── security/                 # Form anti-abuse: honeypot, heuristics, rate limiting
└── types/database.ts             # TypeScript types for all Supabase tables
```

## 🎨 Design System

CBT green (`#00994D`) with a neutral grey scale; Playfair Display for headings, DM Sans for body, JetBrains Mono for code. All tokens are CSS custom properties in `src/app/globals.css` — never hardcode colours or spacing.

See **[design-guidelines.md](design-guidelines.md)** for the full system. It is the single source of truth for visual and UX decisions across every CBT product, not just this site.

## 📦 Delivery Status

### ✅ Phase 1 — Foundation
Multi-page site, design system, all public pages, admin portal with CRUD.

### ✅ Phase 2 — Dynamic Content
Supabase-backed products, clients, case studies, industries, testimonials, stats and CGAP cohorts. Email notifications for both lead forms. Per-page metadata.

### ✅ Phase 3 — Hardening
Supabase Auth on `/admin/**` with domain restriction; form anti-abuse across both public endpoints (honeypot, time-trap, content heuristics, origin check, per-IP rate limiting); an admin submissions inbox; and a full motion pass covering performance and `prefers-reduced-motion`.

## 📄 Documentation

- **[CLAUDE.md](CLAUDE.md)** — project context, conventions and structure. Read this first.
- **[design-guidelines.md](design-guidelines.md)** — the design system, including motion rules.
- **[docs/ROADMAP.md](docs/ROADMAP.md)** — planned features and priorities.
- **[docs/FEATURE_LOG.md](docs/FEATURE_LOG.md)** — what has been built, and why.
- **[plans/](plans/)** — executable improvement plans from the motion audit.

## 📝 License

© 2026 Convergent Business Technologies. All rights reserved.
