import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// No-cookie anon client for public read-only data fetches in Server Components.
// Using this instead of the SSR client keeps pages statically renderable —
// reading cookies via @supabase/ssr forces dynamic rendering.
export function createClient() {
    return createSupabaseClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}
