"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function uploadFile(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        const bucket = formData.get("bucket") as string || "uploads";

        if (!file) throw new Error("No file provided");

        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            // If bucket doesn't exist, try creating it
            if (error.message.toLowerCase().includes("not found") || error.message.toLowerCase().includes("does not exist")) {
                const { error: createError } = await supabaseAdmin.storage.createBucket(bucket, { public: true });
                if (createError) throw createError;

                // Retry upload
                const { data: retryData, error: retryError } = await supabaseAdmin.storage.from(bucket).upload(filePath, file);
                if (retryError) throw retryError;

                const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);
                return { success: true, url: publicUrl };
            }
            throw error;
        }

        const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);
        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error("Upload Error:", error);
        return { success: false, error: error.message };
    }
}
