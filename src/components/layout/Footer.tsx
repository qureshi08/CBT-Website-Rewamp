"use client";
import Link from "next/link";

const NAVIGATION = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/products", label: "Products" },
    { href: "/partners", label: "Partners" },
    { href: "/cgap", label: "CGAP" },
    { href: "/about", label: "About" },
];

const CAPABILITIES = [
    { href: "/services#strategy", label: "Data Strategy & Maturity" },
    { href: "/services#foundations", label: "Data Engineering & Platforms" },
    { href: "/services#foundations", label: "Data Governance & Quality" },
    { href: "/services#foundations", label: "Data Analytics & BI" },
    { href: "/services#intelligence", label: "AI & Generative AI" },
    { href: "/services#intelligence", label: "Agentic AI" },
];

const PRODUCTS = [
    { href: "/products", label: "All Products" },
    { href: "/products/ecl-calculator", label: "ECL Calculator" },
    { href: "/cbt-custom-visuals", label: "Custom Visuals" },
];

export default function Footer() {
    return (
        <footer className="v2-footer">
            <div className="v2-wrap">
                <div className="footer-grid">
                    {/* Brand */}
                    <div>
                        <div style={{ marginBottom: "16px" }}>
                            <img
                                src="/cbt logos/CBT Logo - Dark BG.svg"
                                alt="Convergent Business Technologies"
                                style={{ height: "40px", width: "auto", opacity: 0.7 }}
                            />
                        </div>
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "13.5px",
                                color: "rgba(255,255,255,.45)",
                                lineHeight: "1.7",
                                maxWidth: "300px",
                            }}
                        >
                            Data, Cloud &amp; AI consultancy. Senior consultants, outcome-owned delivery &mdash; trusted by P&amp;G, Coca-Cola, PepsiCo, UNICEF, and ADNOC.
                        </p>
                    </div>

                    {/* Spacer — reserves column 2 so Navigation/Services/Products sit on the right. */}
                    <div aria-hidden />

                    {/* Navigation */}
                    <div>
                        <p className="footer-col-label">Navigation</p>
                        {NAVIGATION.map((l) => (
                            <div key={l.label} className="footer-col-row">
                                <Link href={l.href} className="v2-footer-link">
                                    {l.label}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Services */}
                    <div>
                        <p className="footer-col-label">Services</p>
                        {CAPABILITIES.map((c) => (
                            <div key={c.label} className="footer-col-row">
                                <Link href={c.href} className="v2-footer-link">
                                    {c.label}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Products */}
                    <div>
                        <p className="footer-col-label">Products</p>
                        {PRODUCTS.map((p) => (
                            <div key={p.label} className="footer-col-row">
                                <Link href={p.href} className="v2-footer-link">
                                    {p.label}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <hr
                    style={{
                        border: "none",
                        borderTop: "1px solid rgba(255,255,255,.08)",
                        margin: "36px 0 24px",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "12.5px",
                            color: "rgba(255,255,255,.28)",
                        }}
                    >
                        © {new Date().getFullYear()} Convergent Business Technologies. All rights reserved.
                    </span>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Link href="/contact" className="v2-footer-link" style={{ fontSize: "12.5px" }}>
                            Contact
                        </Link>
                        <Link href="/privacy-policy" className="v2-footer-link" style={{ fontSize: "12.5px" }}>
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
