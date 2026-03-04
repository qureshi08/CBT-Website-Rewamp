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

## 🎨 Brand

| Token | Value | Usage |
|-------|-------|-------|
| Primary Green | `#2D7D46` | CTAs, highlights, active states |
| Green Light | `#4CAF72` | Hover states, secondary accents |
| Charcoal | `#2E2E2E` | Headings, primary text |
| Dark Section | `#1C1C1C` | Client logos section, footer |
| Light Grey | `#F2F2F2` | Alternating section backgrounds |
| Tag Background | `#E8F5EC` | Tags, persona bridge section |

## 📦 Phased Delivery

### ✅ Phase 1 — Foundation (Current)
- Multi-persona homepage with 4 entry points
- All persona landing pages with content
- Contact + Partner forms (client-side validation + API routes)
- Cross-persona bridge sections on every page
- Mobile responsive design
- Deployed on Vercel

### 🔜 Phase 2 — Dynamic Content
- Supabase-backed CMS for clients, products, case studies
- CGAP cohort data from database
- Content updates without code changes

### 🔜 Phase 3 — Lead Generation
- Resend email integration for form confirmations
- CRM integration
- Analytics dashboard

### 🔜 Phase 4 — Content Depth
- Full case study pages
- Product documentation
- Alumni profiles
- Blog

## 📄 Documentation

- `01_BRD.md` — Business Requirements Document
- `02_PRD.md` — Product Requirements Document
- `03_UX_UI_Design.md` — UX/UI Design Specification
- `04_C4_Architecture.md` — C4 Architecture Document
- `05_Antigravity_Agent_Prompt.md` — Agent Build Instructions
- `06_DYK_Presenter_Guide.md` — DYK Session Presenter Guide

## 📝 License

© 2026 Convergent Business Technologies. All rights reserved.
