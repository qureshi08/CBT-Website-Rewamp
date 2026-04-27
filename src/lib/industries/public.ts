import { createClient } from "@/lib/supabase/server";

export type PublicIndustry = { slug: string; label: string };

// Returns active industries that have at least one PUBLISHED case study.
// Skeleton rows auto-created by the admin combobox stay hidden until an admin
// publishes a case study linked to them.
export async function getPublicIndustries(): Promise<PublicIndustry[]> {
    const supabase = await createClient();
    const [industriesRes, casesRes] = await Promise.all([
        supabase
            .from("industries")
            .select("slug, label, display_order")
            .eq("is_active", true)
            .order("display_order", { ascending: true }),
        supabase.from("case_studies").select("industry_slug").eq("published", true),
    ]);

    const industries =
        (industriesRes.data as
            | { slug: string; label: string; display_order: number }[]
            | null) || [];
    const cases =
        (casesRes.data as { industry_slug: string | null }[] | null) || [];

    const slugsWithCases = new Set(
        cases.map((c) => c.industry_slug).filter(Boolean) as string[],
    );

    return industries
        .filter((i) => slugsWithCases.has(i.slug))
        .map(({ slug, label }) => ({ slug, label }));
}
