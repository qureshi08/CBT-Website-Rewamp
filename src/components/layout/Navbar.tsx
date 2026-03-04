"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/customers", label: "Customers" },
    { href: "/partners", label: "Partners" },
    { href: "/products", label: "Products" },
    { href: "/cgap", label: "CGAP" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                    : "bg-white"
                }`}
        >
            <div className="container-main">
                <div className="flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-green-primary rounded-lg flex items-center justify-center transition-transform duration-150 group-hover:scale-105">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[17px] leading-tight text-charcoal tracking-tight">
                                CBT
                            </span>
                            <span className="text-[10px] text-mid-grey leading-tight tracking-wider uppercase">
                                Convergent Business Technologies
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-[15px] font-medium text-mid-grey hover:text-green-primary transition-colors duration-150 rounded-md hover:bg-tag-bg/50"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/contact" className="btn-outline ml-3 py-2.5 px-5 text-sm">
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="lg:hidden p-2 rounded-md hover:bg-light-grey transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileOpen ? (
                            <X size={24} className="text-charcoal" />
                        ) : (
                            <Menu size={24} className="text-charcoal" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="container-main pb-6 pt-2 border-t border-border">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="px-4 py-3 text-[15px] font-medium text-mid-grey hover:text-green-primary hover:bg-tag-bg/50 rounded-md transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileOpen(false)}
                            className="btn-primary mt-3 text-sm"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
