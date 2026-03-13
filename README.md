# Convergent Business Technologies — Website

The official website for **Convergent Business Technologies (CBT)** — a data and technology consultancy with clients including Pepsi, Microsoft, Coca-Cola, KPMG, Dabur, and UNICEF.

## 🚀 Live Site

**Coming Soon** — `convergentbt.com`

## 📋 Overview

A multi-persona website serving 4 distinct audiences:

| Persona | Page | Purpose |
|---------|------|---------|
| **Customers** | `/customers` | Build confidence for prospective clients |
| **Partners** | `/partners` | Attract co-delivery and technology partners |
| **Products** | `/products` | Showcase Power BI Custom Visuals & tools |
| **CGAP** | `/cgap` | Attract graduate applicants to the training program |

Plus: Homepage (`/`), Contact (`/contact`), and API routes for form submissions.

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + Auth + Storage) — Phase 2
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend — Phase 2
- **Deployment:** Vercel
- **Icons:** Lucide React

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout (nav, footer, SEO)
│   ├── page.tsx                 # Homepage
│   ├── customers/page.tsx       # Customers page
│   ├── partners/page.tsx        # Partners page + registration form
│   ├── products/page.tsx        # Products catalogue
│   ├── cgap/page.tsx            # CGAP graduate program
│   ├── contact/page.tsx         # Contact form
│   └── api/
│       ├── contact/route.ts     # Contact form handler
│       └── partner/route.ts     # Partner registration handler
├── components/
│   ├── layout/                  # Navbar, Footer
│   ├── home/                    # Hero, PersonaCards, ServicesGrid, etc.
│   └── shared/                  # PersonaBridge, SectionHeader, CTAButton
├── lib/supabase/                # Supabase client stubs (Phase 2)
├── types/                       # TypeScript types
└── styles/                      # Global CSS with brand tokens
```

## 🎨 Persona-Specific Design System

The site uses a dynamic color-coding system to differentiate user journeys:
- **Customers (Green):** `#2D7D46` — Traditional consultancy.
- **Partners (Purple):** `#8B5CF6` — Modern ecosystem.
- **Products (Orange):** `#F59E0B` — Vibrant software/tools.
- **CGAP (Red):** `#EF4444` — Academic/careers.
- **Banking (Blue):** `#3B82F6` — Specialized industry focus.

## 📦 Phased Delivery

### ✅ Phase 1 — Foundation
- Multi-persona homepage with 4 entry points.
- All persona landing pages with static content.

### ✅ Phase 2 — Refinement & Dynamic Content (Completed March 2026)
- **Supabase Integration:** Products, Clients, and CGAP Cohorts pulled dynamically.
- **Email Integration:** Resend API for Partner & Contact form notifications with persona branding.
- **Form Enhancements:** Added `Region` and `Industry` fields to all leads.
- **Design Overhaul:** Implemented premium multi-persona styling across all pages.
- **Privacy:** Public email addresses removed; all contacts routed through secure forms.

## 📄 Documentation

- [HANDOFF_GUIDE.md](HANDOFF_GUIDE.md) — **Read this for a technical overview of recent design revamp.**
- `01_BRD.md` — Business Requirements Document
- `02_PRD.md` — Product Requirements Document
- `03_UX_UI_Design.md` — UX/UI Design Specification
- `04_C4_Architecture.md` — C4 Architecture Document
- `11-03-2026/01_Wireframes_V2.md` — Updated Design Guidance.

## 📝 License

© 2026 Convergent Business Technologies. All rights reserved.
