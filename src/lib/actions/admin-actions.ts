"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function adminCrud(
    table: string,
    action: "insert" | "update" | "delete" | "read",
    data?: any,
    id?: string,
    options?: {
        orderBy?: { column: string; ascending?: boolean },
        filter?: { column: string; value: any }
    }
) {
    try {
        let result;
        const dbTable = supabaseAdmin.from(table as any);

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
            revalidatePath("/admin");
        }

        return { success: true, data: result?.data };
    } catch (error: any) {
        console.error(`Admin CRUD Error (${table} - ${action}):`, error);
        return { success: false, error: error.message };
    }
}
