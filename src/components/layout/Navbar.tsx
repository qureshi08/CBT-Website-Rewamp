"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

type NavChild = { href: string; label: string; note?: string; image?: string };
type NavLink = {
    href: string;
    label: string;
    children?: NavChild[];
};

const LINKS: NavLink[] = [
    { href: "/", label: "Home" },
    {
        href: "/services",
        label: "Services",
        children: [
            { href: "/services#strategy", label: "Data Strategy & Maturity" },
            { href: "/services#foundations", label: "Data Engineering & Platforms" },
            { href: "/services#foundations", label: "Data Governance & Quality" },
            { href: "/services#foundations", label: "Data Analytics & BI" },
            { href: "/services#intelligence", label: "AI & Generative AI" },
            { href: "/services#intelligence", label: "Agentic AI", note: "Emerging" },
        ],
    },
    {
        href: "/case-studies",
        label: "Case Studies",
        children: [
            { href: "/industries/retail",     label: "Retail" },
            { href: "/industries/telecom",    label: "Telecom" },
            { href: "/industries/banking",    label: "Banking" },
            { href: "/industries/government", label: "Government" },
        ],
    },
    {
        href: "/products",
        label: "Products",
        children: [
            { href: "/products", label: "All Products" },
            { href: "/products/ecl-calculator", label: "ECL Calculator", note: "Hero SKU" },
            { href: "/products#products", label: "Power BI Visuals" },
        ],
    },
    { href: "/partners", label: "Partners" },
    {
        href: "/cgap",
        label: "Careers",
        children: [
            { href: "/cgap", label: "CGAP", image: "/cgap logos/CGAP - Logo Light BG.svg" },
        ],
    },
    { href: "/about", label: "About" },
];

const CTA_HREF = "/contact?intent=discovery";
const CTA_LABEL = "Book a Call";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
    const pathname = usePathname();
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

    const openMenu = (label: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpenDropdown(label);
    };
    const scheduleClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
    };

    return (
        <>
            <nav className={`v2-nav${scrolled ? " v2-scrolled" : ""}`}>
                <div className="v2-nav-inner">
                    <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                        <img
                            src="/cbt logos/CBT Logo - Light BG.svg"
                            alt="Convergent Business Technologies"
                            style={{ height: "40px", width: "auto" }}
                        />
                    </Link>

                    <div className="v2-nav-links">
                        {LINKS.map(l => {
                            const hasChildren = !!l.children?.length;
                            const active = isActive(l.href);
                            if (hasChildren) {
                                const open = openDropdown === l.label;
                                return (
                                    <div
                                        key={l.label}
                                        className="v2-nl-wrap"
                                        onMouseEnter={() => openMenu(l.label)}
                                        onMouseLeave={scheduleClose}
                                    >
                                        <Link
                                            href={l.href}
                                            className={`v2-nl v2-nl-dd${active ? " v2-on" : ""}`}
                                            style={{ textDecoration: "none" }}
                                            aria-haspopup="menu"
                                            aria-expanded={open}
                                        >
                                            {l.label}
                                            <ChevronDown size={14} strokeWidth={1.75} style={{ marginLeft: 3, marginTop: 1, transition: "transform .18s", transform: open ? "rotate(180deg)" : "none" }} />
                                        </Link>
                                        {open && (
                                            <div
                                                className="v2-dd"
                                                role="menu"
                                                onMouseEnter={() => openMenu(l.label)}
                                                onMouseLeave={scheduleClose}
                                            >
                                                {l.children!.map(c => (
                                                    <Link
                                                        key={c.label}
                                                        href={c.href}
                                                        className="v2-dd-item"
                                                        role="menuitem"
                                                    >
                                                        {c.image
                                                            ? <img src={c.image} alt={c.label} style={{ height: "20px", width: "auto" }} />
                                                            : <span>{c.label}</span>
                                                        }
                                                        {c.note && <span className="v2-dd-note">{c.note}</span>}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return (
                                <Link
                                    key={l.href + l.label}
                                    href={l.href}
                                    className={`v2-nl${active ? " v2-on" : ""}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    {l.label}
                                </Link>
                            );
                        })}
                    </div>

                    <Link
                        href={CTA_HREF}
                        className="v2-nav-cta v2-nav-cta-desktop"
                        style={{ textDecoration: "none" }}
                    >
                        {CTA_LABEL} <span aria-hidden>→</span>
                    </Link>

                    <button
                        className="v2-hamburger"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                    </button>
                </div>
            </nav>

            <div className={`v2-mobile-menu${menuOpen ? " v2-mobile-open" : ""}`} aria-hidden={!menuOpen}>
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
                                        <ChevronDown size={18} strokeWidth={1.5} style={{ transition: "transform .2s", transform: sectionOpen ? "rotate(180deg)" : "none" }} />
                                    </button>
                                    {sectionOpen && (
                                        <div className="v2-mobile-sublist">
                                            {l.children!.map(c => (
                                                <Link
                                                    key={c.label}
                                                    href={c.href}
                                                    className="v2-mobile-sublink"
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
                                    )}
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
