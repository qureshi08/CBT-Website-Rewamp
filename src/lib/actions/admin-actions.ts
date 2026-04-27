"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// Invalidate the public Next.js route cache when admin writes change content
// that's rendered on public pages. /admin is always revalidated; the rest are
// table-specific so unrelated pages don't pay the cache-rebuild cost.
function revalidatePublicPaths(table: string) {
    revalidatePath("/admin");

    switch (table) {
        case "case_studies":
            revalidatePath("/case-studies");
            revalidatePath("/case-studies/[slug]", "page");
            revalidatePath("/industries/[slug]", "page");
            revalidatePath("/"); // homepage shows a "featured" case-studies strip
            break;
        case "industries":
            revalidatePath("/industries/[slug]", "page");
            revalidatePath("/case-studies"); // cards show the industry label
            revalidatePath("/case-studies/[slug]", "page");
            break;
    }
}

// Case-study admin types a free-text industry; this resolves it to a slug,
// auto-creating a skeleton row in `industries` if no match exists.
// Matching is case-insensitive against either slug or label.
export async function ensureIndustry(
    rawLabel: string,
): Promise<{ success: true; slug: string } | { success: false; error: string }> {
    try {
        const label = rawLabel.trim();
        if (!label) return { success: false, error: "Industry label is required" };

        const candidateSlug = slugify(label);

        // Idempotence: if a row already exists with this slug, reuse it.
        // Client-side already handles label matches against the loaded list; the
        // server only guards against concurrent inserts of the same slug.
        const { data: existing, error: lookupErr } = await supabaseAdmin
            .from("industries")
            .select("slug")
            .eq("slug", candidateSlug)
            .maybeSingle();
        if (lookupErr) throw lookupErr;
        if (existing) {
            return { success: true, slug: existing.slug };
        }

        // No match — create a minimal skeleton. hero_headline is NOT NULL, so use label as fallback.
        const { data: created, error: insertErr } = await supabaseAdmin
            .from("industries")
            .insert([
                {
                    slug: candidateSlug,
                    label,
                    hero_headline: label,
                    is_active: true,
                },
            ])
            .select("slug")
            .single();
        if (insertErr) throw insertErr;

        revalidatePublicPaths("industries");
        return { success: true, slug: created.slug };
    } catch (error) {
        console.error("ensureIndustry error:", error);
        const message =
            error instanceof Error
                ? error.message
                : typeof error === "object" && error
                ? JSON.stringify(error)
                : "Unknown error";
        return { success: false, error: message };
    }
}

export async function adminCrud(
    table: string,
    action: "insert" | "update" | "delete" | "read",
    data?: Record<string, unknown>,
    id?: string,
    options?: {
        orderBy?: { column: string; ascending?: boolean },
        filter?: { column: string; value: unknown }
    }
) {
    try {
        let result;
        // @ts-expect-error Supabase expects string literal for Table type
        const dbTable = supabaseAdmin.from(table);

        if (action === "insert") {
            result = await dbTable.insert([data]).select();
        } else if (action === "update") {
            result = await dbTable.update(data).eq("id", id!).select();
        } else if (action === "delete") {
            result = await dbTable.delete().eq("id", id!).select();
        } else if (action === "read") {
            let query = dbTable.select("*");
            if (options?.filter) {
                query = query.eq(options.filter.column, options.filter.value);
            }
            if (options?.orderBy) {
                query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? true });
            }
            result = await query;
        }

        if (result?.error) throw result.error;

        if (action !== "read") {
            revalidatePublicPaths(table);
        }

        return { success: true, data: result?.data };
    } catch (error) {
        console.error(`Admin CRUD Error (${table} - ${action}):`, error);
        let message = "An unknown error occurred";
        if (error instanceof Error) {
            message = error.message;
        } else if (error && typeof error === "object") {
            const e = error as { message?: string; details?: string; hint?: string; code?: string };
            message = e.message || e.details || e.hint || (e.code ? `Database error ${e.code}` : JSON.stringify(error));
        }
        return { success: false, error: message };
    }
}
