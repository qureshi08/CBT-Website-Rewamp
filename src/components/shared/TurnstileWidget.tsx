"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget.
 * See docs/SECURITY_PLAN.md finding 3.
 *
 * Renders nothing unless `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set, so the forms
 * work unchanged until a Cloudflare account is provisioned. The script is
 * loaded on demand from the CDN — no npm dependency.
 *
 * Note for finding 6 (CSP): enforcing a Content-Security-Policy will need
 * `challenges.cloudflare.com` allow-listed in `script-src` and `frame-src`.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Lets a form decide whether to block submit on a missing token. */
export const turnstileEnabled = Boolean(SITE_KEY);

type TurnstileApi = {
    render: (el: HTMLElement, options: Record<string, unknown>) => string;
    remove: (widgetId: string) => void;
};

declare global {
    interface Window {
        turnstile?: TurnstileApi;
    }
}

const SCRIPT_SRC =
    "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
    if (typeof window === "undefined") return Promise.resolve();
    if (window.turnstile) return Promise.resolve();
    if (scriptPromise) return scriptPromise;

    scriptPromise = new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(
            `script[src="${SCRIPT_SRC}"]`
        );
        if (existing) {
            existing.addEventListener("load", () => resolve());
            existing.addEventListener("error", () => reject(new Error("turnstile script failed")));
            return;
        }

        const script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => {
            // Allow a later mount to retry rather than caching the failure.
            scriptPromise = null;
            reject(new Error("turnstile script failed"));
        };
        document.head.appendChild(script);
    });

    return scriptPromise;
}

type TurnstileWidgetProps = {
    /** Called with the token on success, and with null when it expires or errors. */
    onToken: (token: string | null) => void;
    theme?: "light" | "dark" | "auto";
};

export default function TurnstileWidget({ onToken, theme = "light" }: TurnstileWidgetProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    // Held in a ref so a re-rendered parent never re-creates the widget.
    const onTokenRef = useRef(onToken);
    onTokenRef.current = onToken;

    useEffect(() => {
        if (!SITE_KEY) return;

        let widgetId: string | null = null;
        let cancelled = false;

        loadTurnstileScript()
            .then(() => {
                if (cancelled || !containerRef.current || !window.turnstile) return;
                widgetId = window.turnstile.render(containerRef.current, {
                    sitekey: SITE_KEY,
                    theme,
                    callback: (token: string) => onTokenRef.current(token),
                    "expired-callback": () => onTokenRef.current(null),
                    "error-callback": () => onTokenRef.current(null),
                });
            })
            .catch((error) => {
                console.error("[turnstile]", error);
                // Server-side verification fails open when Cloudflare is
                // unreachable, so a blocked script must not block the form.
                onTokenRef.current(null);
            });

        return () => {
            cancelled = true;
            if (widgetId && window.turnstile) {
                try {
                    window.turnstile.remove(widgetId);
                } catch {
                    // Already torn down — nothing to do.
                }
            }
        };
    }, [theme]);

    if (!SITE_KEY) return null;

    return <div ref={containerRef} className="mt-2" />;
}
