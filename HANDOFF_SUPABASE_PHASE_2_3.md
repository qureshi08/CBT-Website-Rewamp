# CBT Website Revamp — Phase 2 & 3 Hand-off Document

## 📌 Project Overview
The CBT (Convergent Business Technologies) Website Revamp has transitioned from a static prototype to a dynamic, database-driven application. This document serves as the "memory" for any future agent or developer to resume work on the project.

## 🛠 Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Vanilla CSS (shared styles)
- **Icons**: Lucide React
- **Backend / Database**: Supabase (PostgreSQL)
- **Client Management**: `@supabase/ssr` (Cookie-based auth/session handling)
- **Forms**: React Hook Form
- **Email**: Resend (API-based notification)

## 🗄 Database Schema (Supabase)
The following tables have been implemented in the `public` schema. All tables have RLS (Row Level Security) enabled with **Public Read** access.

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `clients` | Logo strip & portfolio | `name`, `logo_url`, `is_featured`, `display_order` |
| `case_studies` | Published work | `title`, `slug`, `summary`, `tags`, `published` |
| `products` | Tools catalogue | `name`, `slug`, `short_description`, `features`, `appsource_url` |
| `contact_submissions` | Lead capture | `name`, `email`, `company`, `subject`, `message` |
| `partner_enquiries` | Partnership leads | `company`, `contact_name`, `email`, `partnership_type` |
| `cgap_cohorts` | Gradient Academy stats | `cohort_number`, `status` (open/closed), `application_url` |
| `cgap_alumni` | Testimonials | `name`, `role`, `company`, `cohort`, `quote` |

## 🔑 Environment Variables (`.env.local`)
The following variables are **critical** for the app to function:
- `NEXT_PUBLIC_SUPABASE_URL`: Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public key for client-side fetching
- `SUPABASE_SERVICE_ROLE_KEY`: Admin key (ONLY used in `/api` routes)
- `RESEND_API_KEY`: API key for email notifications
- `EMAIL_FROM`: `onboarding@resend.dev` (or verified domain)
- `EMAIL_TO`: `muhammadanasq@gmail.com` (Target for lead notifications)

## 📡 API Routes
1.  **`/api/contact`**: Handles general enquiries. Saves to Supabase and triggers a Resend email notification.
2.  **`/api/partner`**: Handles partnership registrations. Saves to Supabase and triggers a Resend email notification.

## 🏗 Implementation Details
- **Dynamic Fetching**: Pages (`/`, `/customers`, `/products`, `/cgap`, `/partners`) are implemented as **Async React Server Components (RSC)**. They fetch data directly from Supabase on the server.
- **Form Handling**: Forms have been extracted into separate Client Components (`ContactForm.tsx`, `PartnerForm.tsx`) to allow for interactivity while keeping the parent pages as server-rendered for SEO.
- **Fallback Logic**: Every dynamic page includes a `fallback` data constant. If the Supabase database is empty or connection fails, the site gracefully degrades to show placeholder content instead of breaking.

## 🚀 Execution Commands
- `npm run dev`: Start local development
- `npm run build`: Verify production build (verified working as of Mar 4, 2026)
- `git push origin master`: Sync changes to GitHub

## ⏩ Next Steps (Phase 4: Content Depth)
1.  **Product Detail Pages**: Implement `src/app/products/[slug]/page.tsx` to show full product documentation.
2.  **Case Study Detail Pages**: Implement `src/app/customers/[slug]/page.tsx`.
3.  **Authentication**: If an "Admin Dashboard" is needed, set up Supabase Auth to allow the team to edit data directly on the site.
4.  **Analytics**: Integrate Google Tag Manager or Vercel Analytics.

---
**Document Created by Antigravity AI — March 4, 2026**
