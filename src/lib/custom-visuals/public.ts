import { cache } from "react";
import { createClient } from "@/lib/supabase/public";

// Public-facing shape for a custom visual. Mirrors the camelCase keys the
// catalogue + detail JSX already consume, so swapping the static array for a
// DB fetch is a drop-in. `num` is derived from catalogue position, not stored.
export type Visual = {
    slug: string;
    num: string;
    name: string;
    pitch: string;
    featuresShort: string[];
    description: string[];
    featuresFull: string[];
    upcoming: string[];
    appSourceUrl: string;
    tutorialUrl: string | null;
    previewSrc: string | null;
};

function mapRow(row: any, index: number): Visual {
    return {
        slug: row.slug,
        num: String(index + 1).padStart(2, "0"),
        name: row.name,
        pitch: row.pitch ?? "",
        featuresShort: row.features_short ?? [],
        description: row.description ?? [],
        featuresFull: row.features_full ?? [],
        upcoming: row.upcoming ?? [],
        appSourceUrl: row.app_source_url ?? "#",
        tutorialUrl: row.tutorial_url ?? null,
        previewSrc: row.preview_src ?? null,
    };
}

// All published visuals, ordered for the catalogue. `num` reflects position.
// Cached per-request so the catalogue and detail pages share one round-trip.
export const getPublishedVisuals = cache(async (): Promise<Visual[]> => {
    const supabase = createClient();
    const { data } = await supabase
        .from("custom_visuals")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });

    return ((data as any[]) || []).map(mapRow);
});

export async function getVisualBySlug(slug: string): Promise<Visual | undefined> {
    const visuals = await getPublishedVisuals();
    return visuals.find((v) => v.slug === slug);
}
