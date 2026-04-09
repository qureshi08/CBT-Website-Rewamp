import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    BarChart3,
    Database,
    LineChart,
    BrainCircuit,
    Settings2,
    BookOpen,
    FileText,
} from "lucide-react";
import { CustomersIllustration } from "@/components/shared/Illustrations";
import { IndustryLeadersStrip } from "@/components/home/ClientLogoStrip";
import { createClient } from "@/lib/supabase/server";
import ClientReveal from "@/components/shared/ClientReveal";

export const metadata: Metadata = {
    title: "Our Customers | CBT — Convergent Business Technologies",
    description:
        "See who trusts CBT for data analytics, business intelligence, and technology consulting. Clients include Pepsi, Microsoft, Coca-Cola, KPMG, and more.",
};

const services = [
    {
        icon: BarChart3,
        title: "Analytical Maturity Assessment",
        description:
            "We evaluate your organisation's analytics capabilities and create a clear roadmap to maturity — from ad-hoc reporting to predictive and prescriptive analytics.",
    },
    {
        icon: Database,
        title: "Enterprise DWH Implementation",
        description:
            "Design, build, and deploy scalable enterprise data warehouses using modern cloud and on-premise technologies. From schema design to ETL pipelines.",
    },
    {
        icon: LineChart,
        title: "Business Analytics",
        description:
            "Interactive dashboards, self-service BI, and automated reporting that turn your data into clear, actionable insights for every level of the organisation.",
    },
    {
        icon: BrainCircuit,
        title: "Decision Sciences",
        description:
            "Advanced statistical modelling, machine learning, and AI solutions applied to real business problems — pricing, demand forecasting, customer segmentation.",
    },
    {
        icon: Settings2,
        title: "AnalyticOps",
        description:
            "Operationalise your analytics with governance frameworks, automated pipelines, monitoring, and sustainable delivery models.",
    },
    {
        icon: BookOpen,
        title: "Training & Development",
        description:
            "Hands-on training programs for data engineering, analytics, BI tools, and consulting skills — tailored to your team's needs.",
    },
];

const fallbackCaseStudies = [
    {
        title: "Enterprise Data Warehouse for Leading FMCG Company",
        tags: ["Enterprise DWH", "FMCG"],
        summary:
            "Designed and implemented a scalable enterprise data warehouse serving 500+ daily users across 12 markets, reducing report generation time by 80%.",
    },
    {
        title: "Advanced Analytics for Retail Chain",
        tags: ["Decision Sciences", "Retail"],
        summary:
            "Developed demand forecasting models that improved inventory accuracy by 35% and reduced stockouts across 200+ stores.",
    },
    {
        title: "BI Transformation for Financial Services Firm",
        tags: ["Business Analytics", "Finance"],
        summary:
            "Migrated legacy reporting to a modern Power BI platform with real-time dashboards, serving C-suite to operational teams.",
    },
];

export default async function CustomersPage() {
    const supabase = await createClient();

    // Fetch clients
    const { data: clientsData } = await supabase
        .from("clients")
        .select("name")
        .order("display_order", { ascending: true });

    const clientNames = clientsData?.map((c) => c.name);

    // Fetch case studies
    const { data: dbCaseStudies } = await supabase
        .from("case_studies")
        .select("title, summary, tags")
        .eq("published", true)
        .order("created_at", { ascending: false });

    const displayCaseStudies = dbCaseStudies?.length
        ? dbCaseStudies
        : fallbackCaseStudies;

    return (
        <main>
            <ClientReveal />
            {/* Hero */}
            <section className="hero-grid-texture" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 80px", background: "#fff", position: "relative", overflow: "hidden" }}>
                <div className="v2-wrap home-hero-grid" style={{ position: "relative", zIndex: 1, width: "100%" }}>
                    <div>
                        <div className="a-fadeUp-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--color-primary-muted)", borderRadius: "20px", padding: "5px 13px", marginBottom: "22px" }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-primary)", display: "inline-block", animation: "pulse 2s infinite" }} />
                            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-primary)" }}>Success Stories</span>
                        </div>
                        <h1 className="v2-h1 a-fadeUp-2" style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)", marginBottom: "18px" }}>
                            Enterprise Solutions <br />
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>Delivered with Precision</em>
                        </h1>
                        <p className="a-fadeUp-3" style={{ fontFamily: "var(--font-body)", fontSize: "20px", fontWeight: 350, color: "#4B5563", lineHeight: 1.7, maxWidth: "460px", marginTop: "13px" }}>
                            From global banking to retail giants, we help organisations turn their data into competitive advantage through delivery excellence.
                        </p>
                        <div className="a-fadeUp-4" style={{ display: "flex", gap: "16px", marginTop: "28px", flexWrap: "wrap", alignItems: "center" }}>
                            <Link href="/contact" className="hero-btn-primary">
                                Start a Conversation <span>→</span>
                            </Link>
                            <a href="#works" className="hero-btn-secondary">
                                View Case Studies <span className="hero-btn-arrow">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="a-scaleIn home-hero-illustration" style={{ flexShrink: 0 }}>
                        <CustomersIllustration />
                    </div>
                </div>
            </section>

            {/* Client Logos — scrolling marquee */}
            <IndustryLeadersStrip clientNames={clientNames} />

            {/* Services */}
            <section className="bg-white py-16">
                <div className="v2-wrap">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="v2-lbl v2-reveal">Expertise</span>
                        <h2 className="v2-h2 v2-reveal" style={{ fontSize: "clamp(2rem, 3vw, 2.6rem)" }}>Services We Deliver</h2>
                    </div>

                    <div className="services-grid-bordered v2-reveal">
                        {services.map((service, i) => {
                            const Icon = service.icon;
                            const num = String(i + 1).padStart(2, "0");
                            return (
                                <div key={service.title} className="service-card">
                                    <span className="service-num">{num}</span>
                                    <div className="service-icon-wrap">
                                        <Icon size={20} strokeWidth={1.5} stroke="var(--color-primary)" />
                                    </div>
                                    <div className="service-title">{service.title}</div>
                                    <p className="service-desc">{service.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="bg-surface py-16 relative overflow-hidden" id="works">
                <div className="v2-wrap">
                    <div className="section-header-bar v2-reveal" style={{ borderBottom: "none", paddingBottom: 0, marginBottom: "48px" }}>
                        <div>
                            <span style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "11px",
                                fontWeight: 600,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "var(--color-primary)",
                                marginBottom: "14px",
                                display: "block",
                            }}>Impact</span>
                            <h2 style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                                fontWeight: 700,
                                color: "var(--color-text-heading)",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                            }}>Our Work in Action</h2>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", alignItems: "stretch" }}>
                        {displayCaseStudies.map((study: any, i) => (
                            <div key={study.title} className={`v2-card v2-reveal v2-d${(i % 3) + 1}`} style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                                    {study.tags?.map((tag: string) => (
                                        <span key={tag} className="v2-tag" style={{ background: "var(--green-muted)", color: "var(--green)" }}>{tag}</span>
                                    ))}
                                </div>
                                <h3 className="v2-h3" style={{ fontSize: "17px", marginBottom: "12px" }}>{study.title}</h3>
                                <p style={{ fontFamily: "var(--f-body)", fontSize: "13.5px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "20px", flexGrow: 1 }}>
                                    {study.summary}
                                </p>
                                <Link href="/contact" style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--f-body)", fontSize: "12px", fontWeight: 700, color: "var(--green)", textDecoration: "none" }}>
                                    LEARN MORE <ArrowRight size={12} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="cta-band">
                <div className="v2-wrap cta-inner-grid">
                    <div>
                        <h2 className="cta-heading">
                            Ready to Transform Your <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>Data Capability?</em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Tell us about your challenge. We&apos;ll show you how data can solve it.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                        <Link href="/contact" className="btn-cta-white" style={{ fontFamily: "var(--font-body)" }}>
                            Start a conversation →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
