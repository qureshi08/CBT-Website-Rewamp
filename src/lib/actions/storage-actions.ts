"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/require-admin";

// The bucket name arrives from the caller, so it is constrained to the buckets the
// admin portal actually uploads into (the `bucket=` props across src/app/admin/**).
// This list matches the buckets that exist in Supabase — the components' "uploads"
// default is intentionally NOT here, because no such bucket exists and every real
// call site passes an explicit bucket. A missing prop should fail loudly.
const ALLOWED_BUCKETS = new Set([
    "clients",
    "case-studies",
    "products",
    "partners",
    "testimonials",
    "alumni",
    "custom-visuals",
]);

export async function uploadFile(formData: FormData) {
    try {
        await requireAdmin();

        const file = formData.get("file") as File;
        const bucket = (formData.get("bucket") as string) || "uploads";

        if (!file) throw new Error("No file provided");

        if (!ALLOWED_BUCKETS.has(bucket)) {
            throw new Error(`Bucket "${bucket}" is not an upload target`);
        }

        // Derive the extension from the filename but never trust it verbatim — it ends
        // up in a public URL. Anything unexpected falls back to "bin".
        const rawExt = file.name.split(".").pop()?.toLowerCase() ?? "";
        const fileExt = /^[a-z0-9]{1,5}$/.test(rawExt) ? rawExt : "bin";

        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });

        // Previously a missing bucket was auto-created with { public: true } and the
        // upload retried. That turned a typo into a world-readable bucket, so buckets
        // are now provisioned deliberately in Supabase and a miss is a hard error.
        if (error) throw error;

        const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);
        return { success: true, url: publicUrl };
    } catch (error) {
        console.error("Upload Error:", error);
        let message = "An unknown error occurred";
        if (error instanceof Error) {
            message = error.message;
        } else if (error && typeof error === "object") {
            const e = error as { message?: string; error?: string; statusCode?: string | number };
            message = e.message || e.error || (e.statusCode ? `Storage error ${e.statusCode}` : JSON.stringify(error));
        }
        return { success: false, error: message };
    }
}
