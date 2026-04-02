import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
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
import PersonaBridge from "@/components/shared/PersonaBridge";
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

    const clientNames = clientsData?.map(c => c.name);
    const displayAlumni = dbAlumni?.length ? dbAlumni : fallbackAlumni;
    const activeBatch = openBatches?.[0];
    const applicationUrl = activeBatch?.application_url || "https://cbt-recruitment-portal.vercel.app/";
    const displayBatchCount = batchStat?.value || 12;

    return (
        <main>
            <ClientReveal />

            {/* Hero */}
            <section style={{ paddingTop: "120px", paddingBottom: "72px", padding: "120px 24px 72px", background: "linear-gradient(158deg,#fff 58%,#e6f5ed 100%)" }}>
                <div className="v2-wrap" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "56px", alignItems: "center" }}>
                    <div>
                        <div className="v2-lbl v2-reveal">Graduate Program</div>
                        <h1 className="v2-h1 v2-reveal" style={{ fontSize: "clamp(34px, 4.5vw, 54px)", marginBottom: "18px" }}>
                            Bridging Academia <br /> & <span className="italic-accent text-primary">Industry.</span>
                        </h1>
                        <p className="v2-sub v2-reveal" style={{ maxWidth: "560px" }}>
                            CGAP is a 6-month intensive training program designed to turn top graduate talent into world-class data consultants.
                        </p>
                        <div className="v2-reveal" style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                            <a href={applicationUrl} target="_blank" className="v2-btn v2-btn-p">Apply Now <ExternalLink size={16} stroke="white" /></a>
                            <a href="#curriculum" className="v2-btn v2-btn-s">View Curriculum</a>
                        </div>
                    </div>
                    <div className="v2-reveal a-scaleIn">
                        <CGAPIllustration />
                    </div>
                </div>
            </section>

            {/* Curriculum */}
            <section className="bg-white py-16" id="curriculum">
                <div className="v2-wrap">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="v2-lbl v2-reveal">Roadmap</span>
                        <h2 className="v2-h2 v2-reveal">A Comprehensive Data Stack Curriculum</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px", alignItems: "stretch" }}>
                        {curriculum.map((item, i) => (
                            <div key={item.title} className={`v2-stile v2-reveal v2-d${i + 1}`} style={{ padding: "24px" }}>
                                <div className="v2-lbl" style={{ fontSize: "9px", marginBottom: "12px", opacity: 0.6 }}>{item.month}</div>
                                <div className="v2-stile-icon" style={{ width: "36px", height: "36px" }}><item.icon size={18} /></div>
                                <h3 className="v2-h3" style={{ fontSize: "15px", marginBottom: "8px" }}>{item.title}</h3>
                                <p style={{ fontFamily: "var(--f-body)", fontSize: "12.5px", color: "var(--muted)", lineHeight: "1.5" }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ideal Candidate & Alumni */}
            <section className="bg-surface py-20">
                <div className="v2-wrap">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px" }}>
                        <div>
                            <h2 className="v2-h2 v2-reveal" style={{ fontSize: "32px", marginBottom: "24px" }}>The Ideal <span className="italic-accent text-primary">Candidate</span></h2>
                            <div style={{ display: "grid", gap: "12px" }}>
                                {eligibility.map(item => (
                                    <div key={item} className="v2-reveal v2-card" style={{ padding: "16px 20px", display: "flex", gap: "12px", alignItems: "center" }}>
                                        <CheckCircle2 size={16} style={{ color: "var(--green)", flexShrink: 0 }} />
                                        <span style={{ fontFamily: "var(--f-body)", fontSize: "14px", fontWeight: 500 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="v2-h2 v2-reveal" style={{ fontSize: "32px", marginBottom: "24px" }}>What Our <span className="italic-accent text-primary">Alumni</span> Say</h2>
                            <div style={{ display: "grid", gap: "16px" }}>
                                {displayAlumni.map((alum: any, i) => (
                                    <div key={alum.name} className={`v2-card v2-reveal v2-d${i + 1}`} style={{ padding: "24px" }}>
                                        <Quote size={20} style={{ color: "var(--green)", opacity: 0.2, marginBottom: "12px" }} />
                                        <p style={{ fontFamily: "var(--f-body)", fontStyle: "italic", fontSize: "13.5px", color: "var(--heading-c)", lineHeight: "1.6", marginBottom: "16px" }}>&ldquo;{alum.quote}&rdquo;</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--green-muted)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "9px" }}>{alum.name[0]}</div>
                                            <div>
                                                <div style={{ fontFamily: "var(--f-head)", fontWeight: 700, fontSize: "11px" }}>{alum.name}</div>
                                                <div style={{ fontFamily: "var(--f-body)", fontSize: "9px", color: "var(--muted)" }}>{alum.role} • {alum.cohort}</div>
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
            <section style={{ padding: "64px 24px" }}>
                <div className="v2-wrap" style={{ background: "var(--heading-c)", borderRadius: "24px", padding: "64px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "rgba(0,153,77,0.05)", transform: "skewX(-20deg) translateX(50%)" }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <GraduationCap size={40} style={{ color: "var(--green)", opacity: 0.2, margin: "0 auto 20px" }} />
                        <h2 className="v2-h2" style={{ color: "white", fontSize: "32px", marginBottom: "18px" }}>
                            Ready to Launch Your <br /> <em style={{ fontStyle: "italic", color: "var(--green)" }}>Data Career?</em>
                        </h2>
                        <p style={{ fontFamily: "var(--f-body)", color: "rgba(255,255,255,0.6)", maxWidth: "560px", margin: "0 auto 32px" }}>
                            Applications for the next batch are now open. Start your journey into data consulting.
                        </p>
                        <a href={applicationUrl} target="_blank" className="v2-btn v2-btn-p">
                            Submit Application <ArrowRight size={16} stroke="white" />
                        </a>
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="cgap" />
        </main>
    );
}
