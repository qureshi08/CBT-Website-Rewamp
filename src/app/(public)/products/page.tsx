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

            {/* Products with Filter Tabs */}
            <section className="bg-white py-16" id="products">
                <div className="v2-reveal p-5 sm:p-8 md:p-12 v2-wrap" style={{ background: "white", borderRadius: "24px", border: "1px solid var(--border)", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span className="v2-lbl">Marketplace</span>
                        <h2 className="v2-h2" style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)" }}>Our Product <span className="italic-accent text-primary">Portfolio</span></h2>
                    </div>
                    <ProductFilter />
                </div>
            </section>

            {/* Edge */}
            <section className="bg-white py-20 overflow-hidden">
                <div className="v2-wrap">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
                        <div>
                            <span className="v2-lbl v2-reveal">Built for Scale</span>
                            <h2 className="v2-h2 v2-reveal" style={{ fontSize: "32px", marginBottom: "20px" }}>The CBT Product Edge</h2>
                            <p className="v2-sub v2-reveal" style={{ marginBottom: "32px" }}>Our products aren&apos;t just code; they are the distilled expertise of our consulting team who solve enterprise data problems every day.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="v2-reveal">
                                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--green-muted)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><BarChart3 size={20} /></div>
                                    <h3 className="v2-h3" style={{ fontSize: "16px", marginBottom: "8px" }}>User Centric</h3>
                                    <p style={{ fontFamily: "var(--f-body)", fontSize: "12.5px", color: "var(--muted)", lineHeight: "1.6" }}>Designed for high-frequency use in corporate environments.</p>
                                </div>
                                <div className="v2-reveal">
                                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--green-muted)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><Star size={20} /></div>
                                    <h3 className="v2-h3" style={{ fontSize: "16px", marginBottom: "8px" }}>Certified Quality</h3>
                                    <p style={{ fontFamily: "var(--f-body)", fontSize: "12.5px", color: "var(--muted)", lineHeight: "1.6" }}>Rigorously tested to meet enterprise security and performance standards.</p>
                                </div>
                            </div>
                        </div>
                        <div className="v2-reveal">
                            <div className="v2-card v2-card-static" style={{ padding: "48px", textAlign: "center" }}>
                                <div style={{ color: "var(--green)", fontSize: "42px", fontWeight: 700, marginBottom: "8px" }}>2.5M+</div>
                                <div className="v2-lbl" style={{ marginBottom: "40px" }}>Data Points Rendered Daily</div>
                                <div style={{ height: "120px", display: "flex", alignItems: "flex-end", gap: "8px", justifyContent: "center", padding: "0 20px" }}>
                                    {[0.4, 0.7, 0.9, 0.55, 0.3, 0.85, 0.6].map((h, i) => (
                                        <div key={i} style={{ flexGrow: 1, background: `linear-gradient(to top, var(--green) ${h * 100}%, var(--green-muted) 0%)`, borderRadius: "4px 4px 0 0", height: "100%", opacity: 0.1 + (i * 0.1) }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Banner */}
            <section className="cta-band">
                <div className="v2-wrap cta-inner-grid">
                    <div>
                        <h2 className="cta-heading">
                            Need a <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>Custom Solution?</em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Our product team can build custom visuals and automated tools tailored to your unique enterprise requirements.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                        <Link href="/contact?subject=Custom Visual Request" className="btn-cta-white" style={{ fontFamily: "var(--font-body)" }}>
                            Request a Demo →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
