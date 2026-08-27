/**
 * Origin / Referer allow-list for the public form endpoints.
 * See docs/SECURITY_PLAN.md finding 3.
 *
 * Modern browsers send `Origin` on every cross-document POST, including
 * same-origin ones, so a mismatched value is a strong signal the request did
 * not come from our own pages. A *missing* value is treated as suspicious
 * rather than fatal — some privacy proxies and older clients strip both
 * headers, and blocking those would cost real leads.
 */

export type OriginVerdict =
    | { status: "allowed" }
    | { status: "blocked"; reason: string }
    | { status: "unknown"; reason: string };

function allowedHosts(): Set<string> {
    const hosts = new Set<string>();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl) {
        try {
            hosts.add(new URL(siteUrl).host);
        } catch {
            // Malformed env value — ignore rather than blocking every request.
        }
    }

    // Vercel injects these for preview and production deployments.
    if (process.env.VERCEL_URL) hosts.add(process.env.VERCEL_URL);
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        hosts.add(process.env.VERCEL_PROJECT_PRODUCTION_URL);
    }

    if (process.env.NODE_ENV !== "production") {
        hosts.add("localhost:3000");
        hosts.add("127.0.0.1:3000");
    }

    return hosts;
}

function hostOf(value: string | null): string | null {
    if (!value) return null;
    try {
        return new URL(value).host;
    } catch {
        return null;
    }
}

export function checkOrigin(request: Request): OriginVerdict {
    const allowed = allowedHosts();

    // Nothing configured to compare against — fail open rather than break the
    // forms in an environment where NEXT_PUBLIC_SITE_URL was never set.
    if (allowed.size === 0) {
        return { status: "unknown", reason: "no allow-list configured" };
    }

    // The request's own host is always legitimate: it is the domain the page
    // was served from, whatever the deployment URL happens to be.
    const selfHost = request.headers.get("host");
    if (selfHost) allowed.add(selfHost);

    const originHost = hostOf(request.headers.get("origin"));
    if (originHost) {
        return allowed.has(originHost)
            ? { status: "allowed" }
            : { status: "blocked", reason: `origin ${originHost} not allowed` };
    }

    const refererHost = hostOf(request.headers.get("referer"));
    if (refererHost) {
        return allowed.has(refererHost)
            ? { status: "allowed" }
            : { status: "blocked", reason: `referer ${refererHost} not allowed` };
    }

    return { status: "unknown", reason: "no origin or referer header" };
}

/** Best-effort client IP, used as the rate-limit key. */
export function clientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        const first = forwarded.split(",")[0]?.trim();
        if (first) return first;
    }
    return request.headers.get("x-real-ip") ?? "unknown";
}
