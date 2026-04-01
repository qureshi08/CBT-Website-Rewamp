"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/customers", label: "Customers" },
    { href: "/partners", label: "Partners" },
    { href: "/products", label: "Products" },
    { href: "/cgap", label: "CGAP" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 8);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    return (
        <nav
            aria-label="Main navigation"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-border ${
                isScrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.07)]" : "shadow-none"
            }`}
        >
            <div className="container-main">
                <div className="flex items-center justify-between h-[60px]">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="CBT — Home">
                        <div className="w-[34px] h-[34px] bg-text-heading rounded-[8px] flex items-center justify-center relative overflow-hidden">
                            <span className="text-white font-mono text-[11px] relative z-10 font-bold">CBT</span>
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
                        </div>
                        <span className="font-body text-[13px] font-semibold text-text-heading tracking-[-0.01em] hidden sm:block">
                            Convergent Business Technologies
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-7" role="list">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    role="listitem"
                                    aria-current={isActive ? "page" : undefined}
                                    className={`text-[13px] font-medium transition-colors duration-200 relative group ${
                                        isActive
                                            ? "text-primary"
                                            : "text-text-muted hover:text-text-heading"
                                    }`}
                                >
                                    {link.label}
                                    <span
                                        className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-[1px] transition-transform duration-200 ${
                                            isActive
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    />
                                </Link>
                            );
                        })}
                        <Link
                            href="/contact"
                            aria-current={pathname === "/contact" ? "page" : undefined}
                            className="ml-1 bg-text-heading text-white font-body text-[12px] font-semibold py-2 px-4 rounded transition-colors duration-200 hover:bg-primary"
                        >
                            Get in Touch
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileOpen}
                        aria-controls="mobile-menu"
                        className="lg:hidden p-2 flex flex-col justify-center items-center gap-[4.5px] w-9 h-9 hover:bg-surface rounded-lg transition-colors"
                    >
                        <span className={`block w-[20px] h-[2px] bg-text-heading rounded-[2px] transition-all duration-300 ${isMobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
                        <span className={`block w-[20px] h-[2px] bg-text-heading rounded-[2px] transition-all duration-200 ${isMobileOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-[20px] h-[2px] bg-text-heading rounded-[2px] transition-all duration-300 ${isMobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-label="Navigation menu"
                className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-xl transition-all duration-300 ease-in-out ${
                    isMobileOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
                <div className="container-main py-4 pb-8">
                    <nav aria-label="Mobile navigation">
                        <div className="flex flex-col gap-0 border-t border-border mt-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`block text-[17px] font-medium py-3.5 border-b border-border transition-colors ${
                                            isActive
                                                ? "text-primary"
                                                : "text-text-heading hover:text-primary"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <Link
                                href="/contact"
                                className="block bg-text-heading text-white font-body text-[14px] font-semibold py-3 px-6 rounded-md text-center mt-6 transition-colors hover:bg-primary"
                            >
                                Get in Touch →
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>
    );
}
