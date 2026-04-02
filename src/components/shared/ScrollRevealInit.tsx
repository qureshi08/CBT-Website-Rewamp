"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Initialises IntersectionObserver on mount and on every route change.
 * Any element with className "reveal" will have "visible" added when it
 * enters the viewport — pairing with the .reveal / .reveal.visible CSS rules
 * in globals.css for smooth fade-up entrance animations.
 */
export default function ScrollRevealInit() {
    const pathname = usePathname();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        // Observe every .reveal element that hasn't already animated
        document
            .querySelectorAll<HTMLElement>(".reveal:not(.visible)")
            .forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [pathname]);

    return null;
}
