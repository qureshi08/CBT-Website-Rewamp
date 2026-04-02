"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Ic from "@/components/shared/Icons";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

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
        <nav className={`v2-nav${scrolled ? " v2-scrolled" : ""}`}>
            <div className="v2-nav-inner">
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "8px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src="/logo.png" alt="CBT Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <span style={{ fontFamily: "var(--f-head)", fontSize: "17px", fontWeight: 700, color: "var(--heading-c)", letterSpacing: "-.3px" }}>Convergent</span>
                </Link>

                {/* Nav Links */}
                <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    {links.map(l => (
                        <Link key={l.href} href={l.href} className={`v2-nl${isActive(l.href) ? " v2-on" : ""}`} style={{ textDecoration: "none" }}>
                            {l.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <Link href="/contact" className="v2-nav-cta" style={{ textDecoration: "none" }}>Contact Us</Link>
            </div>
        </nav>
    );
}
