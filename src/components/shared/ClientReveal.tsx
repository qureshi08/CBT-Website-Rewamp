"use client";
import { useScrollReveal } from "@/components/home/Hero";

/**
 * A small client-side component to initialize the scroll reveal IntersectionObserver.
 * Since this hook requires the 'window' and 'document' objects, it can only run on the client.
 * Using this allows the parent page to remain a Server Component for SEO and data fetching.
 */
export default function ClientReveal() {
    useScrollReveal();
    return null;
}
