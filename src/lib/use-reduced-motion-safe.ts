"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// useLayoutEffect warns during SSR; on the client it runs before paint, which
// is what we want here so the swap below is not visible.
const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Hydration-safe wrapper around Framer Motion's `useReducedMotion()`.
 *
 * The raw hook cannot be used to branch rendered output. Framer reads the
 * preference from a module-level ref that is `null` during SSR and is populated
 * *synchronously during the first client render*. So a component that renders
 * `reduced ? A : B` emits B on the server and A on the client's hydration pass
 * whenever the user prefers reduced motion — a guaranteed hydration mismatch,
 * and React does not patch it up.
 *
 * This returns `false` on the server AND on the first client render, so the two
 * agree, then flips to the real value in a layout effect. Reduced-motion users
 * get one committed-but-unpainted frame of the default tree instead of a
 * console error and an unhydrated subtree.
 *
 * Use this — not `useReducedMotion()` — anywhere the preference changes what is
 * rendered. Note that Framer's hook captures its value once and does not
 * subscribe to changes, so toggling the OS setting (or DevTools emulation)
 * needs a reload either way.
 */
export function useReducedMotionSafe(): boolean {
    const preference = useReducedMotion();
    const [reduced, setReduced] = useState(false);

    useIsomorphicLayoutEffect(() => {
        if (preference) setReduced(true);
    }, [preference]);

    return reduced;
}
