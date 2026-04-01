-- CBT WEBSITE — DATABASE MIGRATION SCRIPT
-- RUN THIS IN THE SUPABASE SQL EDITOR TO FIX ERRORS AND ENABLE DYNAMIC STATS

-- 1. FIX CGAP_COHORTS TABLE
ALTER TABLE IF EXISTS public.cgap_cohorts 
ADD COLUMN IF NOT EXISTS applications_open BOOLEAN DEFAULT true;

-- 2. FIX PRODUCTS TABLE
ALTER TABLE IF EXISTS public.products 
ADD COLUMN IF NOT EXISTS industry TEXT;

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
