import { createClient } from "@/lib/supabase/server";

// Keep in sync with ALLOWED_EMAIL_DOMAIN in src/proxy.ts — both layers must agree
// on what counts as an admin.
const ALLOWED_EMAIL_DOMAIN = "@convergentbt.com";

export class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "UnauthorizedError";
    }
}

/**
 * Asserts the caller is a signed-in CBT admin. Throws UnauthorizedError otherwise.
 *
 * Every server action that touches `supabaseAdmin` (the service-role client, which
 * bypasses Row Level Security) MUST call this first.
 *
 * `src/proxy.ts` gates page navigation under /admin/:path*, but that is not enough
 * on its own: Server Actions are dispatched by action ID rather than by URL, and
 * those IDs ship inside client bundles under /_next/static/** — a path the proxy
 * matcher does not cover. The auth check therefore has to live inside the action.
 *
 * Callers keep their existing try/catch: the throw is converted into the standard
 * { success: false, error } response, so the guard cannot be silently ignored.
 */
export async function requireAdmin(): Promise<{ id: string; email: string }> {
    const supabase = await createClient();

    // getUser() revalidates the token with Supabase Auth. getSession() only reads the
    // cookie, which a client can forge — never swap this for getSession().
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        throw new UnauthorizedError("Not signed in");
    }

    const email = user.email?.toLowerCase() ?? "";
    if (!email.endsWith(ALLOWED_EMAIL_DOMAIN)) {
        throw new UnauthorizedError("Account is not permitted to administer this site");
    }

    return { id: user.id, email };
}
