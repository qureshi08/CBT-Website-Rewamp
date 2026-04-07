"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const links = [
        { href: "/", label: "Home" },
        { href: "/customers", label: "Customers" },
        { href: "/partners", label: "Partners" },
        { href: "/products", label: "Products" },
        { href: "/cgap", label: "CGAP" },
    ];

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <>
            <nav className={`v2-nav${scrolled ? " v2-scrolled" : ""}`}>
                <div className="v2-nav-inner">
                    {/* Logo */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                        <img
                            src="/cbt logos/CBT Logo - Light BG.svg"
                            alt="Convergent Business Technologies"
                            style={{ height: "40px", width: "auto" }}
                        />
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="v2-nav-links">
                        {links.map(l => (
                            <Link key={l.href} href={l.href} className={`v2-nl${isActive(l.href) ? " v2-on" : ""}`} style={{ textDecoration: "none" }}>
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <Link href="/contact" className="v2-nav-cta v2-nav-cta-desktop" style={{ textDecoration: "none" }}>Contact Us</Link>

                    {/* Hamburger button — mobile only */}
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

            {/* Mobile Menu Drawer */}
            <div className={`v2-mobile-menu${menuOpen ? " v2-mobile-open" : ""}`} aria-hidden={!menuOpen}>
                <nav className="v2-mobile-nav">
                    {links.map(l => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`v2-mobile-link${isActive(l.href) ? " v2-on" : ""}`}
                            style={{ textDecoration: "none" }}
                            onClick={() => setMenuOpen(false)}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="v2-nav-cta"
                        style={{ textDecoration: "none", marginTop: "8px", textAlign: "center" }}
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact Us
                    </Link>
                </nav>
            </div>

            {/* Backdrop */}
            {menuOpen && (
                <div className="v2-mobile-backdrop" onClick={() => setMenuOpen(false)} aria-hidden />
            )}
        </>
    );
}
