-- ============================================================================
-- Custom Visuals — add docs_url
-- Stores the public URL of an uploaded documentation PDF for a visual.
-- Null when no documentation has been uploaded. The detail page shows a
-- "View documentation" link only when this is set.
-- Run this whole file once in the Supabase SQL editor.
-- ============================================================================

alter table public.custom_visuals
    add column if not exists docs_url text;
