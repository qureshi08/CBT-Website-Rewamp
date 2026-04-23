-- CBT WEBSITE — DATABASE MIGRATION SCRIPT
-- RUN THIS IN THE SUPABASE SQL EDITOR TO FIX ERRORS AND ENABLE DYNAMIC STATS

-- 1. FIX CGAP_COHORTS TABLE
ALTER TABLE IF EXISTS public.cgap_cohorts 
ADD COLUMN IF NOT EXISTS applications_open BOOLEAN DEFAULT true;

-- 2. FIX PRODUCTS TABLE
ALTER TABLE IF EXISTS public.products
ADD COLUMN IF NOT EXISTS industry TEXT;

-- 2a. PRODUCTS — Phase 3 additions (ECL hero SKU + partner attribution + internal detail routing)
ALTER TABLE IF EXISTS public.products
ADD COLUMN IF NOT EXISTS badge_text TEXT;

ALTER TABLE IF EXISTS public.products
ADD COLUMN IF NOT EXISTS detail_path TEXT;

ALTER TABLE IF EXISTS public.products
ADD COLUMN IF NOT EXISTS partner_note TEXT;

-- 2b. PRODUCTS — ensure unique slug (needed for idempotent upserts)
CREATE UNIQUE INDEX IF NOT EXISTS products_slug_key
    ON public.products (slug);

-- 2c. PRODUCTS — seed ECL Calculator (hero SKU). Re-runnable: updates fields on conflict.
INSERT INTO public.products (
    name,
    slug,
    category,
    industry,
    short_description,
    full_description,
    is_featured,
    display_order,
    badge_text,
    detail_path,
    partner_note
) VALUES (
    'ECL Calculator',
    'ecl-calculator',
    'ECL Calculator',
    'Banking',
    'IFRS 9 expected credit loss, calculated in 48 hours. Bank-ready. Built with KPMG.',
    'A production-grade IFRS 9 ECL engine for banks and lenders. PD, LGD and EAD modelling with scenario overlays, full audit trail, and Big-4 reviewed methodology — delivered as a 4-week pilot or annual enterprise licence.',
    true,
    1,
    'HERO SKU',
    '/products/ecl-calculator',
    'Built with KPMG'
)
ON CONFLICT (slug) DO UPDATE SET
    name            = EXCLUDED.name,
    category        = EXCLUDED.category,
    industry        = EXCLUDED.industry,
    short_description = EXCLUDED.short_description,
    full_description  = EXCLUDED.full_description,
    is_featured     = EXCLUDED.is_featured,
    display_order   = EXCLUDED.display_order,
    badge_text      = EXCLUDED.badge_text,
    detail_path     = EXCLUDED.detail_path,
    partner_note    = EXCLUDED.partner_note;

-- 2d. PRODUCTS — Phase 4a: controlled category list.
-- Allowed values: 'Power BI Custom Visuals', 'ECL Calculator', 'Data Tool'.
-- Backfill any non-matching rows to 'Data Tool' (the catch-all), then enforce via CHECK.
UPDATE public.products
SET category = 'Data Tool'
WHERE category IS NULL
   OR category NOT IN ('Power BI Custom Visuals', 'ECL Calculator', 'Data Tool');

DO $cat$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'products_category_check'
          AND conrelid = 'public.products'::regclass
    ) THEN
        ALTER TABLE public.products
        ADD CONSTRAINT products_category_check
        CHECK (category IN ('Power BI Custom Visuals', 'ECL Calculator', 'Data Tool'));
    END IF;
END $cat$;

-- 3. CREATE PARTNERS TABLE
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    logo_url TEXT,
    partner_type TEXT DEFAULT 'Technology', -- 'Technology', 'Delivery', 'Referral'
    display_order INTEGER DEFAULT 0,
    website_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for partners
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.partners;
CREATE POLICY "Public Read Access" ON public.partners FOR SELECT USING (true);

-- 4. CREATE DYNAMIC STATS TABLE
CREATE TABLE IF NOT EXISTS public.stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL UNIQUE,
    value NUMERIC NOT NULL,
    suffix TEXT DEFAULT '',
    display_order INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for stats
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.stats;
CREATE POLICY "Public Read Access" ON public.stats FOR SELECT USING (true);

-- Populate initial stats
INSERT INTO public.stats (label, value, suffix, display_order)
VALUES 
    ('Consultants', 30, '+', 1),
    ('CGAP Batches', 12, '+', 2),
    ('Clients Served', 120, '+', 3)
ON CONFLICT (label) DO UPDATE SET
    value = EXCLUDED.value,
    suffix = EXCLUDED.suffix,
    display_order = EXCLUDED.display_order;

-- 5. CREATE TESTIMONIALS TABLE (used in Partners/CGAP pages)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    company TEXT,
    page TEXT DEFAULT 'General', -- 'Partners', 'CGAP', 'General'
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.testimonials;
CREATE POLICY "Public Read Access" ON public.testimonials FOR SELECT USING (true);

-- 6. ENSURE STORAGE BUCKETS EXIST
-- Run these one by one if using the SQL editor to create buckets (Note: Supabase API is safer)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('partners', 'partners', true) ON CONFLICT (id) DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true) ON CONFLICT (id) DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('clients', 'clients', true) ON CONFLICT (id) DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true) ON CONFLICT (id) DO NOTHING;

-- ==============================================================
-- 7. SERVICES TABLE (Phase 4b M1) — capabilities rendered on /services
-- ==============================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    section TEXT NOT NULL CHECK (section IN ('strategy', 'foundations', 'intelligence')),
    num TEXT NOT NULL,
    description TEXT,
    tools TEXT[] DEFAULT '{}',
    icon TEXT,
    emerging BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.services;
CREATE POLICY "Public Read Access" ON public.services FOR SELECT USING (is_active = true);

-- Seed: six capabilities matching the current hardcoded /services page.
INSERT INTO public.services (slug, name, section, num, description, tools, icon, emerging, display_order) VALUES
    ('data-strategy-and-maturity',
     'Data Strategy & Maturity',
     'strategy', '01',
     'Operating model, data roadmap, maturity assessment, business case — aligning data investment with P&L outcomes.',
     ARRAY['Maturity assessment', 'Roadmaps', 'Operating model'],
     'target', false, 1),

    ('data-engineering-and-platforms',
     'Data Engineering & Platforms',
     'foundations', '02',
     'Pipelines, warehousing, lakehouse, cloud modernisation — the plumbing and foundation.',
     ARRAY['Fabric', 'Synapse', 'Databricks', 'Snowflake', 'Data Lake', 'AWS', 'GCP'],
     'server', false, 2),

    ('data-governance-and-quality',
     'Data Governance & Quality',
     'foundations', '03',
     'Catalogues, lineage, MDM, profiling, observability — so dashboards and models aren''t lying to you.',
     ARRAY['Purview', 'Data Factory', 'Lineage', 'MDM'],
     'shield', false, 3),

    ('data-analytics-and-bi',
     'Data Analytics & BI',
     'foundations', '04',
     'Dashboards, self-serve, custom visuals, analytical workflow apps — the answer at a glance.',
     ARRAY['Power BI', 'Tableau', 'Looker', 'Power Apps', 'Power Automate'],
     'pieChart', false, 4),

    ('ai-and-generative-ai',
     'AI & Generative AI',
     'intelligence', '05',
     'Predictive models, NLP, computer vision, RAG, copilots, enterprise chat — trained on your data.',
     ARRAY['Purview ML', 'BigQuery ML', 'OpenAI', 'Azure OpenAI', 'RAG'],
     'brain', false, 5),

    ('agentic-ai',
     'Agentic AI',
     'intelligence', '06',
     'Early experiments and prototypes. Not yet a core production offering — surfaces on enquiry when a project is a good fit.',
     ARRAY[]::TEXT[],
     'cpu', true, 6)
ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    section       = EXCLUDED.section,
    num           = EXCLUDED.num,
    description   = EXCLUDED.description,
    tools         = EXCLUDED.tools,
    icon          = EXCLUDED.icon,
    emerging      = EXCLUDED.emerging,
    display_order = EXCLUDED.display_order;

-- ==============================================================
-- 8. INDUSTRIES TABLE (Phase 4b M2) — per-industry content for /industries/[slug]
-- ==============================================================
CREATE TABLE IF NOT EXISTS public.industries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    tagline TEXT,
    hero_headline TEXT NOT NULL,
    hero_italic TEXT,
    hero_sub TEXT,
    context_title TEXT,
    context_italic TEXT,
    context_body TEXT,
    where_we_help JSONB DEFAULT '[]'::jsonb,
    outcome_highlights JSONB DEFAULT '[]'::jsonb,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.industries;
CREATE POLICY "Public Read Access" ON public.industries FOR SELECT USING (is_active = true);

-- 9. case_studies.industry_slug — soft FK to industries.slug (Phase 4b M2)
ALTER TABLE IF EXISTS public.case_studies
ADD COLUMN IF NOT EXISTS industry_slug TEXT;

CREATE INDEX IF NOT EXISTS case_studies_industry_slug_idx
    ON public.case_studies (industry_slug);

-- Backfill industry_slug for known case studies (safe: UPDATE where slug matches; no-op otherwise)
UPDATE public.case_studies SET industry_slug = 'retail'   WHERE slug = 'loyalty-margin-uplift' AND industry_slug IS NULL;
UPDATE public.case_studies SET industry_slug = 'telecom'  WHERE slug = 'realtime-bi-40x'       AND industry_slug IS NULL;
UPDATE public.case_studies SET industry_slug = 'banking'  WHERE slug = 'ecl-48-hours'          AND industry_slug IS NULL;

-- Seed four industries. JSONB built via jsonb_build_array/jsonb_build_object
-- so the JSON parser is never invoked — avoids CRLF issues from copy-paste.
INSERT INTO public.industries (slug, label, tagline, hero_headline, hero_italic, hero_sub, context_title, context_italic, context_body, where_we_help, outcome_highlights, display_order) VALUES
    ('retail', 'Retail', 'Margin, mix, and the moment of purchase.', 'Data where the transaction', 'happens.',
     'Loyalty, demand forecasting, store performance, assortment. We rebuild the decisioning stack retail teams actually use to defend margin and grow basket size.',
     'The shelf is the', 'feedback loop.',
     'Retailers swim in transaction data and drown in it. Reports are stale by the time they land, loyalty economics are guesses, and assortment decisions get made by instinct. We rebuild the plumbing — warehousing, governance, dashboards — so store teams, category managers, and CMOs see the same numbers at the same time.',
     jsonb_build_array(
        jsonb_build_object('num','01','title','Loyalty & personalisation','body','Decisioning stack on modern data platforms. Redemption uplift that actually protects margin, not erodes it.'),
        jsonb_build_object('num','02','title','Demand forecasting','body','Store- and SKU-level forecasts that reduce stockouts and markdown waste — trained on your data, not a generic model.'),
        jsonb_build_object('num','03','title','Category & assortment','body','Self-serve BI for category managers. Test, read, and roll out ranges without waiting a week for a report.')
     ),
     jsonb_build_array(
        jsonb_build_object('number','+32%','label','margin','note','pilot category uplift'),
        jsonb_build_object('number','−18%','label','stockouts','note','across 200+ stores'),
        jsonb_build_object('number','9 min','label','to insight','note','down from 6 hours')
     ),
     1),
    ('telecom', 'Telecom', 'Real-time network, real-time decisions.', 'Answers at the speed of the', 'network.',
     'Subscriber analytics, churn, network operations, billing assurance. We replace batch reporting estates with architectures that keep up with the business.',
     'The data arrives', 'fast.',
     'Telecoms have no shortage of data — the problem is stitching it together fast enough to matter. We modernise the warehouse, consolidate the reporting estate, and land copilots and predictive models on top of a foundation that won''t collapse under load.',
     jsonb_build_array(
        jsonb_build_object('num','01','title','Subscriber & churn analytics','body','Predictive churn, next-best-action, LTV modelling — grounded in your CRM and usage data, not a vendor demo.'),
        jsonb_build_object('num','02','title','Network & operations BI','body','Real-time dashboards for NOC and operations teams. Time-to-insight dropped from hours to minutes in production.'),
        jsonb_build_object('num','03','title','Billing & revenue assurance','body','Reconciliation and leakage detection across the revenue stack. Quiet wins that compound.')
     ),
     jsonb_build_array(
        jsonb_build_object('number','40×','label','faster BI','note','6h → 9min'),
        jsonb_build_object('number','−12%','label','churn','note','in target segments'),
        jsonb_build_object('number','7-day','label','migration','note','batch → real-time')
     ),
     2),
    ('banking', 'Banking', 'Regulator-ready. Audit-traceable.', 'Risk, calculated. Output,', 'defensible.',
     'IFRS 9 ECL, credit risk, fraud, regulatory reporting. We build models and pipelines that stand up to the regulator and the internal audit team — in that order.',
     'Audit is the', 'first user.',
     'Banks don''t need another dashboard; they need outputs that survive a regulatory review. Our work in banking is delivered in collaboration with KPMG — credit risk, ECL, fraud, capital — with full lineage and model governance built in from day one, not bolted on.',
     jsonb_build_array(
        jsonb_build_object('num','01','title','IFRS 9 & credit risk','body','ECL modelling, PD/LGD/EAD, scenario analysis — bank-ready and audit-traceable. Delivered with KPMG.'),
        jsonb_build_object('num','02','title','Fraud & compliance','body','Transaction monitoring, AML signals, and investigator tooling — so the first line actually gets used.'),
        jsonb_build_object('num','03','title','Regulatory & capital reporting','body','Pipelines that survive audit. Lineage, reconciliation, and documented governance as a default.')
     ),
     jsonb_build_array(
        jsonb_build_object('number','48 h','label','ECL turnaround','note','raw data → regulator'),
        jsonb_build_object('number','100%','label','audit pass','note','first submission'),
        jsonb_build_object('number','KPMG','label','delivery partner','note','joint engagement')
     ),
     3),
    ('government', 'Government', 'Public data. Public value.', 'Citizen outcomes, measured', 'transparently.',
     'Programme measurement, service analytics, and operational visibility across ministries and agencies. Delivered by a team that respects procurement, governance, and the long road to impact.',
     'The accountability is', 'public.',
     'Public-sector data work is slower and more scrutinised — rightly so. We design for auditability, procurement cycles, and programme owners who need to show impact to stakeholders and the public. Dashboards that answer real questions, not demo questions.',
     jsonb_build_array(
        jsonb_build_object('num','01','title','Programme measurement','body','Outcome frameworks, instrumentation, and reporting on grant- and KPI-tied programmes — without a year-long discovery.'),
        jsonb_build_object('num','02','title','Service & operational analytics','body','Case volume, SLA performance, and citizen-service insight surfaced to operations teams and ministers alike.'),
        jsonb_build_object('num','03','title','Data foundations for public agencies','body','Warehousing, governance, and quality built to withstand audit, FOI, and change of administration.')
     ),
     jsonb_build_array(
        jsonb_build_object('number','1','label','source of truth','note','across 4 agencies'),
        jsonb_build_object('number','30+','label','KPIs','note','instrumented end-to-end'),
        jsonb_build_object('number','Audit','label','pass','note','no findings on data layer')
     ),
     4)
ON CONFLICT (slug) DO UPDATE SET
    label              = EXCLUDED.label,
    tagline            = EXCLUDED.tagline,
    hero_headline      = EXCLUDED.hero_headline,
    hero_italic        = EXCLUDED.hero_italic,
    hero_sub           = EXCLUDED.hero_sub,
    context_title      = EXCLUDED.context_title,
    context_italic     = EXCLUDED.context_italic,
    context_body       = EXCLUDED.context_body,
    where_we_help      = EXCLUDED.where_we_help,
    outcome_highlights = EXCLUDED.outcome_highlights,
    display_order      = EXCLUDED.display_order;

-- STORAGE POLICIES (Allow public access to read and authenticated/public to upload for demo)
-- Replace 'authenticated' with 'public' if you want anyone to upload without login (careful!)
DO $$
BEGIN
    -- Public Read access for all buckets
    INSERT INTO storage.policies (name, bucket_id, definition, operation)
    VALUES ('Public Read', 'partners', '(true)', 'SELECT'),
           ('Public Read', 'products', '(true)', 'SELECT'),
           ('Public Read', 'clients', '(true)', 'SELECT'),
           ('Public Read', 'uploads', '(true)', 'SELECT')
    ON CONFLICT DO NOTHING;

    -- Public Insert access (for demo purposes)
    INSERT INTO storage.policies (name, bucket_id, definition, operation)
    VALUES ('Public Insert', 'partners', '(true)', 'INSERT'),
           ('Public Insert', 'products', '(true)', 'INSERT'),
           ('Public Insert', 'clients', '(true)', 'INSERT'),
           ('Public Insert', 'uploads', '(true)', 'INSERT')
    ON CONFLICT DO NOTHING;
END $$;
