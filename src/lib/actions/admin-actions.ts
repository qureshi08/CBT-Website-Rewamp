"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

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
            revalidatePath("/admin");
        }

        return { success: true, data: result?.data };
    } catch (error) {
        console.error(`Admin CRUD Error (${table} - ${action}):`, error);
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}
