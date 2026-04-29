import { Metadata } from "next";
import {
    CheckCircle2,
    Quote,
    BookOpen,
    MessagesSquare,
    Award,
    Users,
    GraduationCap,
} from "lucide-react";
import { IndustryLeadersStrip } from "@/components/home/ClientLogoStrip";
import ClientReveal from "@/components/shared/ClientReveal";
import CgapHeroStats from "@/components/cgap/CgapHeroStats";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "CGAP — Convergent Graduate Academy Program | Learning, grooming, career.",
    description:
        "The Convergent Graduate Academy Program (CGAP) is CBT's 9-month learning-and-grooming pathway that turns top graduates into industry-ready data & AI consultants. Real projects from month two. Permanent career on the other side.",
};

const JOURNEY = [
    {
        months: "M1–M2",
        title: "Fundamentals",
        body: "CBT-designed bootcamp. SQL, data modelling, Power BI, Python, consulting basics — built and delivered by the same senior consultants who ship for our enterprise clients.",
    },
    {
        months: "M3–M5",
        title: "Specialise",
        body: "Pick a track — data engineering, BI, analytics, or applied AI. Deepen the stack, ship practice projects, sit certifications (we pay).",
    },
    {
        months: "M6–M7",
        title: "Live project",
        body: "Embedded on a real CBT client engagement under a senior lead. Not a sandbox — production code, real data, real stakeholders.",
    },
    {
        months: "M8–M9",
        title: "Placement",
        body: "Permanent placement on a CBT delivery team, or partner track with a sponsoring client. Either way, the program ends with a career, not a certificate.",
    },
];

const GROOMING = [
    {
        icon: BookOpen,
        title: "Structured learning",
        body: "A month-by-month curriculum designed by senior CBT consultants — grounded in real delivery methodology, not abstract coursework. You learn how we actually ship.",
    },
    {
        icon: MessagesSquare,
        title: "Consulting craft",
        body: "Stakeholder management, discovery, scoping, pushback. The soft skills that separate a junior analyst from a trusted consultant — taught as hard skills, practised in real rooms.",
    },
    {
        icon: Award,
        title: "Certification budget",
        body: "We pay for Microsoft Fabric, Databricks, Snowflake, Azure, Power BI — whatever the track needs. Training is a line item, not a stretch goal.",
    },
    {
        icon: Users,
        title: "Mentorship + stipend",
        body: "Paired with senior mentors from day one. Paid stipend from day one. Residential or hybrid — we flex around commute and circumstance, not the other way around.",
    },
];



const ELIGIBILITY = [
    "Bachelor's degree in CS, Stats, Math, Engineering, or Economics",
    "Fresh graduates or up to 2 years of experience",
    "Strong analytical thinking and problem-solving skills",
    "Willing to commit to the full 9-month program",
];

export default async function CGAPPage() {
    const supabase = await createClient();

    const [
        { data: clientsData },
        { data: dbAlumni },
        { data: openBatches },
        { data: batchStat },
    ] = await Promise.all([
        supabase
            .from("clients")
            .select("name, logo_url, logo_full_url")
            .eq("is_featured", true)
            .order("display_order", { ascending: true }),
        supabase.from("cgap_alumni").select("*").order("display_order", { ascending: true }),
        supabase
            .from("cgap_cohorts")
            .select("*")
            .eq("status", "open")
            .order("cohort_number", { ascending: false })
            .limit(1),
        supabase.from("stats" as any).select("value").eq("label", "CGAP Batches").single() as any,
    ]);

    const clients = ((clientsData as any[]) || []).map((c) => ({
        name: c.name,
        logoUrl: c.logo_full_url || c.logo_url || null,
    }));
    const displayAlumni =
        (dbAlumni as any[])?.length ? (dbAlumni as any[]) : [];
    const activeBatch = (openBatches as any[])?.[0];
    const applicationUrl =
        activeBatch?.application_url || "https://cbt-recruitment-portal.vercel.app/";
    const nextBatchNumber = activeBatch?.cohort_number
        ? activeBatch.cohort_number
        : ((batchStat as any)?.value || 12) + 1;

    return (
        <main>
            <ClientReveal />

            {/* ─── HERO ─── */}
            <section
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    padding: "120px 0 80px",
                    background: "#fff",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <BackgroundPaths />
                <div
                    className="v2-wrap"
                    style={{ position: "relative", zIndex: 1, width: "100%" }}
                >
                    <div
                        className="a-fadeUp-1"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "var(--color-primary-muted)",
                            borderRadius: 20,
                            padding: "5px 13px",
                            marginBottom: 18,
                        }}
                    >
                        <span
                            style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: "var(--color-primary)",
                                animation: "pulse 2s infinite",
                            }}
                        />
                        <span
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "var(--text-xs)",
                                fontWeight: 500,
                                color: "var(--color-primary)",
                            }}
                        >
                            Batch {nextBatchNumber} &middot; applications open
                        </span>
                    </div>

                    <img
                        src="/cgap logos/CGAP - Logo Light BG.svg"
                        alt="Convergent Graduate Academy Program"
                        className="cgap-hero-logo a-fadeUp-2"
                    />

                    <h1
                        className="v2-h1 a-fadeUp-3"
                        style={{
                            fontSize: "clamp(2.1rem, 3.8vw, 3rem)",
                            marginBottom: 18,
                            maxWidth: 820,
                            lineHeight: 1.15,
                            color: "#4a4a4a",
                        }}
                    >
                        Graduates today. Consultants,{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                            shipping.
                        </em>
                    </h1>

                    <p
                        className="a-fadeUp-4"
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 19,
                            fontWeight: 350,
                            color: "#4B5563",
                            lineHeight: 1.7,
                            maxWidth: 720,
                        }}
                    >
                        The <b>Convergent Graduate Academy Program (CGAP)</b> is CBT&rsquo;s 9-month learning-and-grooming pathway &mdash; turning top graduates into industry-ready data &amp; AI professionals, with real client projects from month two and a permanent career on the other side.
                    </p>

                    <div
                        className="a-fadeUp-4"
                        style={{ display: "flex", gap: 16, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}
                    >
                        <a href={applicationUrl} target="_blank" rel="noreferrer" className="hero-btn-primary">
                            Apply to CGAP <span>↗</span>
                        </a>
                    </div>

                    <CgapHeroStats
                        stats={[
                            { value: 9, label: "months" },
                            { value: 4, label: "phases" },
                            { prefix: "M", value: 2, label: "real projects" },
                            { prefix: "B", value: nextBatchNumber, label: "next batch" },
                        ]}
                    />
                </div>
            </section>

            {/* ─── JOURNEY ─── */}
            <section id="journey" className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">the 9-month journey</span>
                        <h2 className="services-section-title">
                            Starts as a graduate. Ends as a{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                consultant.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Month-by-month, with real stakes. No bootcamp graveyard; no disconnected theory. By month two you&rsquo;re on a real engagement under a senior lead.
                        </p>
                    </div>

                    <div className="cgap-journey-grid">
                        {JOURNEY.map((j, i) => (
                            <article key={j.title} className="cgap-journey-card">
                                <span className="cgap-journey-months">{j.months}</span>
                                <div className="cgap-journey-index">
                                    Phase {String(i + 1).padStart(2, "0")}
                                </div>
                                <h3 className="cgap-journey-title">{j.title}</h3>
                                <p className="cgap-journey-body">{j.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── LEARNING & GROOMING ─── */}
            <section className="services-section cgap-section-tinted">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">learning + grooming</span>
                        <h2 className="services-section-title">
                            Not a bootcamp. Not a bench. A{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                craft.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Universities give you theory. Job boards give you a job. CGAP gives you a craft &mdash; structured learning, consulting skills, and senior mentorship, stitched into every month of the program.
                        </p>
                    </div>

                    <div className="services-grid services-grid-2">
                        {GROOMING.map((g, i) => {
                            const Icon = g.icon;
                            return (
                                <article key={g.title} className="services-tile">
                                    <div className="services-tile-head">
                                        <div className="services-tile-icon">
                                            <Icon size={22} strokeWidth={1.5} stroke="var(--color-primary)" />
                                        </div>
                                        <span className="services-tile-num">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <div className="services-tile-title-row">
                                        <h3 className="services-tile-title">{g.title}</h3>
                                    </div>
                                    <p className="services-tile-desc">{g.body}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── GEORGIA TECH — AFTER PLACEMENT ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="cgap-after-panel v2-reveal">
                        <div className="cgap-after-grid">
                            <div>
                                <span className="services-section-tag cgap-after-tag">
                                    post-placement career track
                                </span>
                                <h2
                                    className="services-section-title"
                                    style={{ color: "#fff", maxWidth: 540 }}
                                >
                                    When you&rsquo;re in, we keep{" "}
                                    <em style={{ fontStyle: "italic", color: "var(--color-primary-light)" }}>
                                        investing.
                                    </em>
                                </h2>
                                <p className="cgap-after-copy">
                                    Placement isn&rsquo;t the finish line. Once you&rsquo;ve joined CBT and proven you can deliver, we sponsor a <b>Georgia Tech academic credential</b> as part of your long-term career development &mdash; compounding the program into a career, not capping it at a certificate.
                                </p>
                                <p className="cgap-after-copy">
                                    To be clear: Georgia Tech isn&rsquo;t a CGAP partner. It&rsquo;s a <b>post-placement benefit</b> CBT funds for consultants who&rsquo;ve earned it.
                                </p>
                            </div>
                            <div className="cgap-after-visual">
                                <div className="cgap-after-visual-head">
                                    <GraduationCap size={22} strokeWidth={1.5} stroke="var(--color-primary-light)" />
                                    <span>how the career track compounds</span>
                                </div>
                                <div className="cgap-after-row">
                                    <span className="cgap-after-row-label">month 9</span>
                                    <span className="cgap-after-row-value">
                                        Placed as a CBT consultant
                                    </span>
                                </div>
                                <div className="cgap-after-divider" />
                                <div className="cgap-after-row">
                                    <span className="cgap-after-row-label">post-placement</span>
                                    <span className="cgap-after-row-value">
                                        Live engagements, senior mentorship
                                    </span>
                                </div>
                                <div className="cgap-after-divider" />
                                <div className="cgap-after-row">
                                    <span className="cgap-after-row-label">career benefit</span>
                                    <span className="cgap-after-row-value">
                                        CBT-sponsored Georgia Tech credential
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ELIGIBILITY + ALUMNI ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="cgap-two-col">
                        <div>
                            <span className="services-section-tag">the ideal candidate</span>
                            <h2 className="services-section-title" style={{ fontSize: "2rem" }}>
                                Who{" "}
                                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                    CGAP is for.
                                </em>
                            </h2>
                            <div className="cgap-eligibility">
                                {ELIGIBILITY.map((item) => (
                                    <div key={item} className="cgap-eligibility-row">
                                        <div className="cgap-eligibility-check">
                                            <CheckCircle2
                                                size={14}
                                                style={{ color: "var(--color-primary)" }}
                                            />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {displayAlumni.length > 0 && (
                            <div>
                                <span className="services-section-tag">alumni outcomes</span>
                                <h2 className="services-section-title" style={{ fontSize: "2rem" }}>
                                    Where they{" "}
                                    <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                        ended up.
                                    </em>
                                </h2>
                                <div className="cgap-alumni-list">
                                    {displayAlumni.slice(0, 3).map((alum: any) => (
                                        <div key={alum.name} className="cgap-alumni-card">
                                            <Quote
                                                size={18}
                                                style={{ color: "var(--color-primary)", opacity: 0.25 }}
                                            />
                                            <p className="cgap-alumni-quote">&ldquo;{alum.quote}&rdquo;</p>
                                            <div className="cgap-alumni-meta">
                                                <div className="cgap-alumni-avatar">
                                                    {alum.avatar_url ? (
                                                        <img
                                                            src={alum.avatar_url}
                                                            alt=""
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                        />
                                                    ) : (
                                                        alum.name?.[0]
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="cgap-alumni-name">{alum.name}</div>
                                                    <div className="cgap-alumni-role">
                                                        {alum.role}{alum.company ? ` · ${alum.company}` : ""} &middot; {alum.cohort}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <IndustryLeadersStrip clients={clients} />

            {/* ─── CTA BAND ─── */}
            <section className="cta-band">
                <div className="v2-wrap cta-inner-grid">
                    <div>
                        <h2 className="cta-heading">
                            Ready for CGAP batch{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                {nextBatchNumber}?
                            </em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Applications for the next cohort are open. Nine months of structured learning, senior mentorship, and real stakes from month two.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                        <a
                            href={applicationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-cta-white"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Apply to CGAP ↗
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
