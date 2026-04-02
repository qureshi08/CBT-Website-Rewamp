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
import { useScrollReveal } from "@/components/home/Hero";
import { CustomersIllustration } from "@/components/shared/Illustrations";
import { IndustryLeadersStrip } from "@/components/home/ClientLogoStrip";
import PersonaBridge from "@/components/shared/PersonaBridge";
import { createClient } from "@/lib/supabase/server";

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
    useScrollReveal();

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
            {/* Hero */}
            <section style={{ paddingTop: "120px", paddingBottom: "72px", padding: "120px 24px 72px", background: "linear-gradient(158deg,#fff 58%,#e6f5ed 100%)" }}>
                <div className="v2-wrap" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "56px", alignItems: "center" }}>
                    <div>
                        <div className="v2-lbl v2-reveal">Success Stories</div>
                        <h1 className="v2-h1 v2-reveal" style={{ fontSize: "clamp(34px, 4.5vw, 50px)", marginBottom: "18px" }}>
                            Enterprise Solutions <br />
                            <em style={{ fontStyle: "italic", color: "var(--green)" }}>Delivered with Precision</em>
                        </h1>
                        <p className="v2-sub v2-reveal" style={{ maxWidth: "520px" }}>
                            From global banking to retail giants, we help organisations turn their data into competitive advantage through delivery excellence.
                        </p>
                        <div className="v2-reveal" style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                            <Link href="/contact" className="v2-btn v2-btn-p">
                                Start a Conversation <ArrowRight size={16} stroke="white" />
                            </Link>
                            <a href="#works" className="v2-btn v2-btn-s">
                                View Case Studies
                            </a>
                        </div>
                    </div>
                    <div className="v2-reveal a-scaleIn">
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
                        <h2 className="v2-h2 v2-reveal">Services We Deliver</h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", alignItems: "stretch" }}>
                        {services.map((service, i) => {
                            const Icon = service.icon;
                            return (
                                <div key={service.title} className={`v2-stile v2-reveal v2-d${(i % 3) + 1}`}>
                                    <div className="v2-stile-icon"><Icon size={20} /></div>
                                    <h3 className="v2-h3" style={{ fontSize: "16px", marginBottom: "8px" }}>{service.title}</h3>
                                    <p style={{ fontFamily: "var(--f-body)", fontSize: "13.5px", color: "var(--muted)", lineHeight: "1.6" }}>
                                        {service.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="bg-surface py-16 relative overflow-hidden" id="works">
                <div className="v2-wrap">
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px" }}>
                        <div>
                            <span className="v2-lbl v2-reveal">Impact</span>
                            <h2 className="v2-h2 v2-reveal">Our Work in Action</h2>
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
            <section style={{ padding: "64px 24px" }}>
                <div className="v2-wrap" style={{ background: "var(--heading-c)", borderRadius: "24px", padding: "64px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "rgba(0,153,77,0.05)", transform: "skewX(-20deg) translateX(50%)" }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <h2 className="v2-h2" style={{ color: "white", fontSize: "32px", marginBottom: "18px" }}>
                            Ready to Transform Your <br /> <em style={{ fontStyle: "italic", color: "var(--green)" }}>Data Capability?</em>
                        </h2>
                        <p style={{ fontFamily: "var(--f-body)", color: "rgba(255,255,255,0.6)", maxWidth: "560px", margin: "0 auto 32px" }}>
                            Tell us about your challenge. We&apos;ll show you how data can solve it.
                        </p>
                        <Link href="/contact" className="v2-btn v2-btn-p">
                            Start a Conversation <ArrowRight size={16} stroke="white" />
                        </Link>
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="customers" />
        </main>
    );
}
