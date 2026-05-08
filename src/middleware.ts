import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ALLOWED_EMAIL_DOMAIN = "@convergentbt.com";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Login page is exempt — gating it would cause a redirect loop for signed-out users.
    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value);
                    });
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        const loginUrl = new URL("/admin/login", request.url);
        if (pathname !== "/admin") {
            loginUrl.searchParams.set("next", pathname);
        }
        loginUrl.searchParams.set("error", "session");
        return NextResponse.redirect(loginUrl);
    }

    if (!user.email?.toLowerCase().endsWith(ALLOWED_EMAIL_DOMAIN)) {
        await supabase.auth.signOut();
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("error", "domain");
        return NextResponse.redirect(loginUrl);
    }

    return response;
}

export const config = {
    matcher: ["/admin/:path*"],
};
