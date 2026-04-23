import { Metadata } from "next";
import Link from "next/link";
import { Star, BarChart3 } from "lucide-react";
import ClientReveal from "@/components/shared/ClientReveal";
import { ProductIllustration } from "@/components/shared/Illustrations";
import ProductFilter from "@/components/products/ProductFilter";

export const metadata: Metadata = {
    title: "Products | CBT — Power BI Custom Visuals & Analytics Tools",
    description:
        "Discover CBT's Power BI custom visuals and analytics tools built by data professionals for data professionals.",
};

export default function ProductsPage() {
    return (
        <main className="font-body">
            <ClientReveal />
            {/* Hero */}
            <section className="hero-grid-texture" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 80px", background: "#fff", position: "relative", overflow: "hidden" }}>
                <div className="v2-wrap home-hero-grid" style={{ position: "relative", zIndex: 1, width: "100%" }}>
                    <div>
                        <div className="a-fadeUp-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--color-primary-muted)", borderRadius: "20px", padding: "5px 13px", marginBottom: "22px" }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-primary)", display: "inline-block", animation: "pulse 2s infinite" }} />
                            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-primary)" }}>Enterprise Tools &amp; Visuals</span>
                        </div>
                        <h1 className="v2-h1 a-fadeUp-2" style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)", marginBottom: "18px" }}>
                            Power Up Your <br /> <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>Analytics Stack.</em>
                        </h1>
                        <p className="a-fadeUp-3" style={{ fontFamily: "var(--font-body)", fontSize: "20px", fontWeight: 350, color: "#4B5563", lineHeight: 1.7, maxWidth: "460px", marginTop: "13px" }}>
                            Industry-grade Power BI custom visuals and automation tools. Built for <span className="font-medium text-text-heading">Banking</span>, <span className="font-medium text-text-heading">Retail</span>, and <span className="font-medium text-text-heading">Custom Visuals</span> sectors.
                        </p>
                        <div className="a-fadeUp-4" style={{ display: "flex", gap: "16px", marginTop: "28px", flexWrap: "wrap", alignItems: "center" }}>
                            <a href="#products" className="hero-btn-primary">
                                Browse Products <span>→</span>
                            </a>
                            <Link href="/contact" className="hero-btn-secondary">
                                Custom Request <span className="hero-btn-arrow">→</span>
                            </Link>
                        </div>
                    </div>
                    <div className="a-scaleIn home-hero-illustration" style={{ flexShrink: 0 }}>
                        <ProductIllustration />
                    </div>
                </div>
            </section>

            {/* ─── PRODUCT PORTFOLIO ─── */}
            <section id="products" className="services-section">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">marketplace</span>
                        <h2 className="services-section-title">
                            Our product{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                portfolio.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Power BI custom visuals, regulatory calculators, and data tools — productised from the work we ship for enterprise clients every day.
                        </p>
                    </div>

                    <ProductFilter />
                </div>
            </section>

            {/* ─── THE EDGE ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="products-edge-grid v2-reveal">
                        <div>
                            <span className="services-section-tag">built for scale</span>
                            <h2 className="services-section-title" style={{ maxWidth: 520 }}>
                                The CBT product{" "}
                                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                    edge.
                                </em>
                            </h2>
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 17,
                                    fontWeight: 350,
                                    lineHeight: 1.75,
                                    color: "var(--color-text-body)",
                                    maxWidth: 520,
                                    marginBottom: 32,
                                }}
                            >
                                Our products aren&rsquo;t just code &mdash; they&rsquo;re the distilled expertise of a consulting team that solves enterprise data problems every day.
                            </p>

                            <div className="products-edge-points">
                                <div className="products-edge-point">
                                    <div className="products-edge-icon">
                                        <BarChart3 size={20} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="products-edge-point-title">User centric</h3>
                                        <p className="products-edge-point-body">
                                            Designed for high-frequency use in corporate environments.
                                        </p>
                                    </div>
                                </div>
                                <div className="products-edge-point">
                                    <div className="products-edge-icon">
                                        <Star size={20} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="products-edge-point-title">Certified quality</h3>
                                        <p className="products-edge-point-body">
                                            Rigorously tested against enterprise security and performance standards.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="products-edge-stat-card">
                            <div className="products-edge-stat-number">2.5M+</div>
                            <div className="products-edge-stat-label">Data points rendered daily</div>
                            <div className="products-edge-stat-bars" aria-hidden>
                                {[0.4, 0.7, 0.9, 0.55, 0.3, 0.85, 0.6].map((h, i) => (
                                    <div
                                        key={i}
                                        className="products-edge-stat-bar"
                                        style={{ height: `${h * 100}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA BAND ─── */}
            <section className="cta-band">
                <div className="v2-wrap cta-inner-grid">
                    <div>
                        <h2 className="cta-heading">
                            Need something we haven&rsquo;t{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                shipped yet?
                            </em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Thirty minutes with a senior consultant. We&rsquo;ll scope the custom build, pressure-test the approach, and tell you whether we&rsquo;re the right team for it.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                        <Link href="/contact?intent=discovery" className="btn-cta-white" style={{ fontFamily: "var(--font-body)" }}>
                            Book a Discovery Call →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
