"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type NavChild = { href: string; label: string; note?: string; image?: string; description?: string };
type NavLink = {
    href: string;
    label: string;
    children?: NavChild[];
    featured?: { eyebrow: string; title: string; description: string; href: string; image?: string };
    layout?: "two-col" | "list";
};

const CTA_HREF = "/contact?intent=discovery";
const CTA_LABEL = "Book a Call";

const LINKS: NavLink[] = [
    { href: "/", label: "Home" },
    {
        href: "/services",
        label: "Services",
        layout: "two-col",
        featured: {
            eyebrow: "Capabilities",
            title: "Data, Cloud & AI — end to end",
            description:
                "Strategy, engineering, governance, BI, and AI — delivered by a team that owns the outcome.",
            href: "/services",
        },
        children: [
            { href: "/services#strategy",     label: "Data Strategy & Maturity",  description: "Roadmaps, operating models, ROI." },
            { href: "/services#foundations",  label: "Data Engineering & Platforms", description: "Pipelines, warehouses, lakehouse." },
            { href: "/services#foundations",  label: "Data Governance & Quality", description: "Lineage, catalogue, policy." },
            { href: "/services#foundations",  label: "Data Analytics & BI",       description: "Power BI, dashboards, self-serve." },
            { href: "/services#intelligence", label: "AI & Generative AI",        description: "LLMs, RAG, forecasting, vision." },
            { href: "/services#intelligence", label: "Agentic AI", note: "Emerging", description: "Autonomous workflows in production." },
        ],
    },
    { href: "/case-studies", label: "Case Studies" },
    {
        href: "/products",
        label: "Products",
        layout: "two-col",
        featured: {
            eyebrow: "Hero SKU",
            title: "ECL Calculator",
            description:
                "IFRS 9 impairment modelling, out of the box. Available on Microsoft AppSource.",
            href: "/products/ecl-calculator",
        },
        children: [
            { href: "/products",                label: "All Products",      description: "Browse the full catalogue." },
            { href: "/products/ecl-calculator", label: "ECL Calculator",    note: "Hero SKU", description: "IFRS 9 impairment, productised." },
            { href: "/cbt-custom-visuals",      label: "Custom Visuals",    description: "Seven Power BI visuals on Microsoft AppSource." },
        ],
    },
    { href: "/partners", label: "Partners" },
    {
        href: "/cgap",
        label: "Careers",
        layout: "two-col",
        featured: {
            eyebrow: "Graduate Program",
            title: "CGAP",
            image: "/cgap logos/CGAP - Logo Light BG.svg",
            description:
                "Convergent Graduate Academy Program — CBT's 9-month learning-and-grooming pathway that turns top graduates into industry-ready consultants.",
            href: "/cgap",
        },
        children: [
            { href: "/cgap", label: "CGAP Program", note: "Flagship", description: "A career, not a job — our graduate pipeline." },
        ],
    },
    { href: "/about", label: "About" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
    const pathname = usePathname();
    const mobileNavRef = useRef<HTMLDivElement | null>(null);
    const hamburgerRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    // Mobile drawer: focus trap + Escape to close
    useEffect(() => {
        if (!menuOpen) {
            hamburgerRef.current?.focus();
            return;
        }
        const drawer = mobileNavRef.current;
        if (!drawer) return;

        const getFocusables = () =>
            Array.from(
                drawer.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled])'
                )
            ).filter(el => !el.hasAttribute("aria-hidden"));

        const focusables = getFocusables();
        focusables[0]?.focus();

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                setMenuOpen(false);
                return;
            }
            if (e.key !== "Tab") return;
            const current = getFocusables();
            if (current.length === 0) return;
            const first = current[0];
            const last = current[current.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [menuOpen]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

    return (
        <>
            <header className={`v2-nav${scrolled ? " v2-scrolled" : ""}`}>
                <div className="v2-nav-inner">
                    <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                        <img
                            src="/cbt logos/CBT Logo - Light BG.svg"
                            alt="Convergent Business Technologies"
                            style={{ height: "40px", width: "auto" }}
                        />
                    </Link>

                    <NavigationMenu className="v2-nav-links" delayDuration={80} skipDelayDuration={200}>
                        <NavigationMenuList>
                            {LINKS.map(l => {
                                const hasChildren = !!l.children?.length;
                                const active = isActive(l.href);

                                if (!hasChildren) {
                                    return (
                                        <NavigationMenuItem key={l.href + l.label}>
                                            <NavigationMenuLink asChild active={active}>
                                                <Link href={l.href}>{l.label}</Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    );
                                }

                                return (
                                    <NavigationMenuItem key={l.label}>
                                        <NavigationMenuTrigger
                                            className={navigationMenuTriggerStyle()}
                                            data-active={active ? "true" : undefined}
                                        >
                                            {l.label}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            {l.layout === "two-col" && l.featured ? (
                                                <div className="v2-nm-panel">
                                                    <div className="v2-nm-panel-grid is-2col">
                                                        <Link
                                                            href={l.featured.href}
                                                            className="v2-nm-featured"
                                                        >
                                                            <span className="v2-nm-featured-eyebrow">{l.featured.eyebrow}</span>
                                                            {l.featured.image ? (
                                                                <img
                                                                    src={l.featured.image}
                                                                    alt={l.featured.title}
                                                                    className="v2-nm-featured-logo"
                                                                />
                                                            ) : (
                                                                <span className="v2-nm-featured-title">{l.featured.title}</span>
                                                            )}
                                                            <p className="v2-nm-featured-desc">{l.featured.description}</p>
                                                        </Link>
                                                        <div className="v2-nm-links-col">
                                                            {l.children!.map(c => (
                                                                <NavigationMenuLink asChild key={c.label + c.href}>
                                                                    <Link href={c.href} className="v2-nm-row">
                                                                        <span>
                                                                            <span className="v2-nm-row-title">
                                                                                {c.label}
                                                                                {c.note && <span className="v2-nm-note">{c.note}</span>}
                                                                            </span>
                                                                            {c.description && (
                                                                                <span className="v2-nm-row-desc">{c.description}</span>
                                                                            )}
                                                                        </span>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="v2-nm-panel">
                                                    <div className="v2-nm-panel-grid is-list">
                                                        <div className="v2-nm-links-col">
                                                            {l.children!.map(c => (
                                                                <NavigationMenuLink asChild key={c.label + c.href}>
                                                                    <Link href={c.href} className="v2-nm-row">
                                                                        <span className="v2-nm-row-title">
                                                                            {c.image
                                                                                ? <img src={c.image} alt={c.label} style={{ height: 20, width: "auto" }} />
                                                                                : c.label}
                                                                        </span>
                                                                        {c.note && <span className="v2-nm-note">{c.note}</span>}
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <Link
                        href={CTA_HREF}
                        className="v2-nav-cta v2-nav-cta-desktop"
                        style={{ textDecoration: "none" }}
                    >
                        {CTA_LABEL} <span aria-hidden>→</span>
                    </Link>

                    <button
                        ref={hamburgerRef}
                        className="v2-hamburger"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                    </button>
                </div>
            </header>

            <div
                ref={mobileNavRef}
                className={`v2-mobile-menu${menuOpen ? " v2-mobile-open" : ""}`}
                aria-hidden={!menuOpen}
                role="dialog"
                aria-modal={menuOpen || undefined}
                aria-label="Main navigation"
            >
                <nav className="v2-mobile-nav">
                    {LINKS.map(l => {
                        const active = isActive(l.href);
                        const hasChildren = !!l.children?.length;
                        const sectionOpen = openMobileSection === l.label;
                        if (hasChildren) {
                            return (
                                <div key={l.label}>
                                    <button
                                        type="button"
                                        className={`v2-mobile-link v2-mobile-link-btn${active ? " v2-on" : ""}`}
                                        onClick={() => setOpenMobileSection(sectionOpen ? null : l.label)}
                                        aria-expanded={sectionOpen}
                                    >
                                        <span>{l.label}</span>
                                        <ChevronDown
                                            size={18}
                                            strokeWidth={1.5}
                                            style={{
                                                transition: "transform .2s",
                                                transform: sectionOpen ? "rotate(180deg)" : "none",
                                            }}
                                        />
                                    </button>
                                    <div
                                        className="v2-mobile-sublist"
                                        data-open={sectionOpen ? "true" : "false"}
                                        aria-hidden={!sectionOpen}
                                    >
                                        {l.featured && (
                                            <Link
                                                href={l.featured.href}
                                                className="v2-mobile-featured"
                                                tabIndex={sectionOpen ? 0 : -1}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <span className="v2-mobile-featured-eyebrow">{l.featured.eyebrow}</span>
                                                {l.featured.image ? (
                                                    <img
                                                        src={l.featured.image}
                                                        alt={l.featured.title}
                                                        className="v2-mobile-featured-logo"
                                                    />
                                                ) : (
                                                    <span className="v2-mobile-featured-title">{l.featured.title}</span>
                                                )}
                                                <p className="v2-mobile-featured-desc">{l.featured.description}</p>
                                            </Link>
                                        )}
                                        <div className="v2-mobile-sublist-inner">
                                            {l.children!.map(c => (
                                                <Link
                                                    key={c.label}
                                                    href={c.href}
                                                    className="v2-mobile-sublink"
                                                    tabIndex={sectionOpen ? 0 : -1}
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    {c.image
                                                        ? <img src={c.image} alt={c.label} style={{ height: "18px", width: "auto" }} />
                                                        : c.label
                                                    }
                                                    {c.note && <span className="v2-mobile-subnote">{c.note}</span>}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <Link
                                key={l.href + l.label}
                                href={l.href}
                                className={`v2-mobile-link${active ? " v2-on" : ""}`}
                                style={{ textDecoration: "none" }}
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        );
                    })}
                    <Link
                        href={CTA_HREF}
                        className="v2-nav-cta"
                        style={{ textDecoration: "none", marginTop: "12px", textAlign: "center", justifyContent: "center" }}
                        onClick={() => setMenuOpen(false)}
                    >
                        {CTA_LABEL} <span aria-hidden>→</span>
                    </Link>
                </nav>
            </div>

            {menuOpen && (
                <div className="v2-mobile-backdrop" onClick={() => setMenuOpen(false)} aria-hidden />
            )}
        </>
    );
}
