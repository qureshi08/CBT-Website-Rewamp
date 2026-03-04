import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

const footerLinks = {
    company: [
        { href: "/", label: "Home" },
        { href: "/customers", label: "Customers" },
        { href: "/partners", label: "Partners" },
        { href: "/contact", label: "Contact" },
    ],
    offerings: [
        { href: "/products", label: "Products" },
        { href: "/cgap", label: "CGAP" },
        { href: "/customers", label: "Case Studies" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-charcoal text-white/80">
            <div className="container-main section-padding">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-9 h-9 bg-green-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-base">C</span>
                            </div>
                            <span className="font-bold text-white text-lg tracking-tight">
                                CBT
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-white/60 max-w-xs">
                            Convergent Business Technologies — a data and technology
                            consultancy helping organisations unlock the power of their data.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-green-light transition-colors duration-150"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Offerings Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                            Offerings
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.offerings.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-green-light transition-colors duration-150"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                            Get in Touch
                        </h4>
                        <a
                            href="mailto:admin@convergentbt.com"
                            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-green-light transition-colors duration-150 mb-4"
                        >
                            <Mail size={16} />
                            admin@convergentbt.com
                        </a>
                        <div className="mt-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 text-sm font-medium text-green-light hover:text-white transition-colors duration-150"
                            >
                                Start a Conversation
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} Convergent Business Technologies. All
                        rights reserved.
                    </p>
                    <p className="text-xs text-white/40">
                        Islamabad, Pakistan
                    </p>
                </div>
            </div>
        </footer>
    );
}
