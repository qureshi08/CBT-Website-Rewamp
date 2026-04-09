import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    GraduationCap,
    BookOpen,
    Users,
    Database,
    BarChart3,
    BrainCircuit,
    Briefcase,
    CheckCircle2,
    Quote,
    ExternalLink,
} from "lucide-react";
import { IndustryLeadersStrip } from "@/components/home/ClientLogoStrip";
import ClientReveal from "@/components/shared/ClientReveal";
import { CGAPIllustration } from "@/components/shared/Illustrations";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "CGAP — Convergent Graduate Academy Program | Launch Your Data Career",
    description: "Join CGAP, a 6-month paid training program bridging academia and industry in Data Analytics. Mentored by seasoned consultants.",
};

const curriculum = [
    { icon: Database, title: "Data Engineering", desc: "SQL, ETL pipelines, data warehouse design, data modelling", month: "Month 1-2" },
    { icon: BarChart3, title: "Business Intelligence", desc: "Power BI, DAX, dashboard design, report automation", month: "Month 2-3" },
    { icon: BrainCircuit, title: "Analytics & Data Science", desc: "Statistics, Python, ML fundamentals, forecasting", month: "Month 3-4" },
    { icon: Briefcase, title: "Consulting Skills", desc: "Client communication, project delivery, documentation", month: "Month 4-5" },
    { icon: Users, title: "Client Engagement", desc: "Live project work with real CBT clients supervised by seniors", month: "Month 5-6" },
];

const fallbackAlumni = [
    { name: "Sarah Ahmed", cohort: "Batch 10", role: "BI Consultant", company: "CBT", quote: "CGAP gave me the practical skills and confidence that university alone couldn't." },
    { name: "Ali Hassan", cohort: "Batch 11", role: "Data Engineer", company: "CBT", quote: "The hands-on approach is what sets CGAP apart. You're working with real data." },
    { name: "Fatima Malik", cohort: "Batch 9", role: "Analytics Consultant", company: "Tech Solutions Ltd", quote: "The mentors at CGAP are genuinely invested in your growth." },
];

const eligibility = [
    "Bachelor's degree in CS, Stats, Math, Engineering, or Economics",
    "Fresh graduates or up to 2 years of experience",
    "Strong analytical thinking and problem-solving skills",
    "Based in Pakistan (Islamabad/Rawalpindi preferred)",
];

export default async function CGAPPage() {
    const supabase = await createClient();

    const [
        { data: clientsData },
        { data: dbAlumni },
        { data: openBatches },
        { data: batchStat }
    ] = await Promise.all([
        supabase.from("clients").select("name").eq("is_featured", true).order("display_order", { ascending: true }),
        supabase.from("cgap_alumni").select("*").order("display_order", { ascending: true }),
        supabase.from("cgap_cohorts").select("*").eq("status", "open").order("cohort_number", { ascending: false }).limit(1),
        (supabase.from("stats" as any).select("value").eq("label", "CGAP Batches").single() as any)
    ]);

    const clientNames = (clientsData as any[])?.map(c => c.name) || [];
    const displayAlumni = (dbAlumni as any[])?.length ? (dbAlumni as any[]) : fallbackAlumni;
    const activeBatch = (openBatches as any[])?.[0];
    const applicationUrl = activeBatch?.application_url || "https://cbt-recruitment-portal.vercel.app/";
    const displayBatchCount = (batchStat as any)?.value || 12;

    return (
        <main>
            <ClientReveal />

            {/* Hero */}
            <section className="hero-grid-texture" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 80px", background: "#fff", position: "relative", overflow: "hidden" }}>
                <div className="v2-wrap home-hero-grid" style={{ position: "relative", zIndex: 1, width: "100%" }}>
                    <div>
                        <div className="a-fadeUp-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--color-primary-muted)", borderRadius: "20px", padding: "5px 13px", marginBottom: "22px" }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-primary)", display: "inline-block", animation: "pulse 2s infinite" }} />
                            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-primary)" }}>Graduate Program</span>
                        </div>
                        <h1 className="v2-h1 a-fadeUp-2" style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)", marginBottom: "18px" }}>
                            Bridging Academia <br /> &amp; <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>Industry.</em>
                        </h1>
                        <p className="a-fadeUp-3" style={{ fontFamily: "var(--font-body)", fontSize: "20px", fontWeight: 350, color: "#4B5563", lineHeight: 1.7, maxWidth: "460px", marginTop: "13px" }}>
                            CGAP is a 6-month intensive training program designed to turn top graduate talent into world-class data consultants.
                        </p>
                        <div className="a-fadeUp-4" style={{ display: "flex", gap: "16px", marginTop: "28px", flexWrap: "wrap", alignItems: "center" }}>
                            <a href={applicationUrl} target="_blank" className="hero-btn-primary">
                                Apply Now <span>→</span>
                            </a>
                            <a href="#curriculum" className="hero-btn-secondary">
                                View Curriculum <span className="hero-btn-arrow">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="a-scaleIn home-hero-illustration" style={{ flexShrink: 0 }}>
                        <CGAPIllustration />
                    </div>
                </div>
            </section>

            {/* Curriculum */}
            <section className="bg-white py-16" id="curriculum">
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
                            }}>Roadmap</span>
                            <h2 style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                                fontWeight: 700,
                                color: "var(--color-text-heading)",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                            }}>A Comprehensive Data Stack Curriculum</h2>
                        </div>
                    </div>
                    <div className="services-grid-bordered services-grid-bordered--5col v2-reveal">
                        {curriculum.map((item, i) => (
                            <div key={item.title} className="service-card">
                                <span className="service-num">{item.month}</span>
                                <div className="service-icon-wrap">
                                    <item.icon size={20} stroke="var(--color-primary)" strokeWidth={1.5} />
                                </div>
                                <div className="service-title">{item.title}</div>
                                <p className="service-desc">{item.desc}</p>
                            </div>
                        ))}
                        <div />
                    </div>
                </div>
            </section>

            {/* Ideal Candidate & Alumni */}
            <section className="bg-surface py-20">
                <div className="v2-wrap">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
                        <div>
                            <h2 className="v2-h2 v2-reveal" style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", marginBottom: "24px" }}>The Ideal <span className="italic-accent text-primary">Candidate</span></h2>
                            <div style={{ borderTop: "1px solid var(--color-border)" }}>
                                {eligibility.map((item, i) => (
                                    <div key={item} className="v2-reveal" style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "16px 0", borderBottom: "1px solid var(--color-border)" }}>
                                        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--color-primary-muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                                            <CheckCircle2 size={14} style={{ color: "var(--color-primary)" }} />
                                        </div>
                                        <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 500, color: "var(--color-text-body)", lineHeight: 1.6, paddingTop: "4px" }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="v2-h2 v2-reveal" style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", marginBottom: "24px" }}>What Our <span className="italic-accent text-primary">Alumni</span> Say</h2>
                            <div style={{ display: "grid", gap: "16px" }}>
                                {displayAlumni.map((alum: any, i) => (
                                    <div key={alum.name} className={`v2-card v2-card-static v2-reveal v2-d${i + 1}`} style={{ display: "flex", flexDirection: "column" }}>
                                        <Quote size={20} style={{ color: "var(--color-primary)", opacity: 0.2, marginBottom: "16px" }} />
                                        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.65, color: "var(--color-text-body)", marginBottom: "20px" }}>&ldquo;{alum.quote}&rdquo;</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
                                            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--color-primary-muted)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", fontWeight: 700, fontSize: "11px", fontFamily: "var(--font-body)", flexShrink: 0 }}>
                                                {alum.avatar_url ? (
                                                    <img src={alum.avatar_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                                                ) : (
                                                    alum.name[0]
                                                )}
                                            </div>
                                            <div>
                                                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "14px", color: "var(--color-text-heading)" }}>{alum.name}</div>
                                                <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase" }}>{alum.role} • {alum.cohort}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <IndustryLeadersStrip clientNames={clientNames} />

            {/* Final CTA */}
            <section className="v2-section">
                <div className="v2-wrap" style={{ background: "var(--heading-c)", borderRadius: "24px", padding: "clamp(40px, 8vw, 64px) clamp(20px, 5vw, 32px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "rgba(0,153,77,0.05)", transform: "skewX(-20deg) translateX(50%)" }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <GraduationCap size={40} style={{ color: "var(--green)", opacity: 0.2, margin: "0 auto 20px" }} />
                        <h2 className="v2-h2" style={{ color: "white", fontSize: "clamp(1.4rem, 5vw, 2rem)", marginBottom: "18px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                            <span>Ready to Launch your</span>
                            <span style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                <span><em style={{ color: "var(--green)", fontStyle: "italic" }}>Data Career </em> with</span>
                                <Image
                                    src="/cgap logos/CGAP - Logo Dark BG.svg"
                                    alt="CGAP"
                                    width={88}
                                    height={24}
                                    style={{ objectFit: "contain", flexShrink: 0 }}
                                />
                                <span>?</span>
                            </span>
                        </h2>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.875rem, 2.5vw, 1rem)", color: "rgba(255,255,255,0.6)", maxWidth: "560px", margin: "0 auto 32px" }}>
                            Applications for the next batch are now open. Start your journey into data consulting.
                        </p>
                        <a href={applicationUrl} target="_blank" className="btn-cta-white" style={{ fontFamily: "var(--font-body)" }}>
                            Submit Application →
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
