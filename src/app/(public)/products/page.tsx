import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, BarChart3 } from "lucide-react";
import PersonaBridge from "@/components/shared/PersonaBridge";
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
            <section style={{ paddingTop: "120px", paddingBottom: "72px", padding: "120px 24px 72px", background: "var(--surface)" }}>
                <div className="v2-wrap" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "56px", alignItems: "center" }}>
                    <div>
                        <div className="v2-lbl v2-reveal">Enterprise Tools & Visuals</div>
                        <h1 className="v2-h1 v2-reveal" style={{ fontSize: "clamp(34px, 4.5vw, 50px)", marginBottom: "18px" }}>
                            Power Up Your <br /> <span className="italic-accent text-primary">Analytics Stack.</span>
                        </h1>
                        <p className="v2-sub v2-reveal" style={{ maxWidth: "560px" }}>
                            Industry-grade Power BI custom visuals and automation tools. Built for <span className="font-medium text-text-heading">Banking</span>, <span className="font-medium text-text-heading">Retail</span>, and <span className="font-medium text-text-heading">Custom Visuals</span> sectors.
                        </p>
                        <div className="v2-reveal" style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                            <a href="#products" className="v2-btn v2-btn-p">Browse Products <ArrowRight size={16} stroke="white" /></a>
                            <Link href="/contact" className="v2-btn v2-btn-s">Custom Request</Link>
                        </div>
                    </div>
                    <div className="v2-reveal a-scaleIn">
                        <ProductIllustration />
                    </div>
                </div>
            </section>

            {/* Products with Filter Tabs */}
            <section className="bg-white py-16" id="products">
                <div className="v2-wrap v2-reveal" style={{ background: "white", borderRadius: "24px", padding: "48px 32px", border: "1px solid var(--border)", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span className="v2-lbl">Marketplace</span>
                        <h2 className="v2-h2">Our Product <span className="italic-accent text-primary">Portfolio</span></h2>
                    </div>
                    <ProductFilter />
                </div>
            </section>

            {/* Edge */}
            <section className="bg-surface py-20 overflow-hidden">
                <div className="v2-wrap">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
                        <div>
                            <span className="v2-lbl v2-reveal">Built for Scale</span>
                            <h2 className="v2-h2 v2-reveal" style={{ fontSize: "32px", marginBottom: "20px" }}>The CBT Product Edge</h2>
                            <p className="v2-sub v2-reveal" style={{ marginBottom: "32px" }}>Our products aren&apos;t just code; they are the distilled expertise of our consulting team who solve enterprise data problems every day.</p>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
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
                            <div className="v2-card" style={{ padding: "48px", textAlign: "center" }}>
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
            <section style={{ padding: "64px 24px" }}>
                <div className="v2-wrap" style={{ background: "white", border: "1px solid var(--border)", borderRadius: "24px", padding: "64px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "100%", background: "var(--green-muted)", opacity: 0.2, pointerEvents: "none" }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <h2 className="v2-h2">Need a <span className="italic-accent text-primary">Custom Solution?</span></h2>
                        <p className="v2-sub" style={{ maxWidth: "560px", margin: "10px auto 32px" }}>Our product team can build custom visuals and automated tools tailored to your unique enterprise requirements.</p>
                        <Link href="/contact?subject=Custom Visual Request" className="v2-btn v2-btn-p">Request a Demo <ArrowRight size={16} stroke="white" /></Link>
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="products" />
        </main>
    );
}
