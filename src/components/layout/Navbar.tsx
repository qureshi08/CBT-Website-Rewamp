"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-border shadow-sm`}
        >
            <div className="container-main">
                <div className="flex items-center justify-between h-[60px]">
                    {/* Logo - Left */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                        <div className="w-[30px] h-[30px] bg-text-heading rounded-md flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-105">
                            <span className="text-white font-mono text-[9px] font-normal tracking-[0.03em] z-10 relative mt-[2px]">CBT</span>
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                        </div>
                        <span className="hidden sm:block font-body text-[13px] font-semibold text-text-heading tracking-[-0.01em]">
                            Convergent Business Technologies
                        </span>
                    </Link>

                    {/* Links - Right */}
                    <div className="hidden lg:flex items-center gap-7">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-[13px] font-medium transition-colors duration-200 relative group ${isActive ? "text-primary" : "text-text-muted hover:text-text-heading"}`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-[1px]" />
                                    )}
                                    {!isActive && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                                    )}
                                </Link>
                            );
                        })}
                        <Link href="/contact" className="ml-1 bg-text-heading text-white font-body text-[12px] font-semibold py-2 px-4 rounded transition-colors duration-200 hover:bg-primary hover:text-white">
                            Get in Touch
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="lg:hidden p-2 flex flex-col justify-center items-center gap-[4.5px] w-9 h-9 hover:bg-surface rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-[20px] h-[2px] bg-text-heading rounded-[2px] transition-all duration-300 ${isMobileOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
                        <span className={`block w-[20px] h-[2px] bg-text-heading rounded-[2px] transition-all duration-200 ${isMobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-[20px] h-[2px] bg-text-heading rounded-[2px] transition-all duration-300 ${isMobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-xl transition-all duration-300 ease-in-out ${isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                <div className="container-main py-4 pb-8">
                    <div className="flex flex-col gap-0 border-t border-border mt-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="block text-[17px] font-medium text-text-heading py-3.5 border-b border-border hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileOpen(false)}
                            className="block bg-text-heading text-white font-body text-[14px] font-semibold py-3 px-6 rounded-md text-center mt-6 transition-colors hover:bg-primary"
                        >
                            Get in Touch →
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
