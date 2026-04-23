import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Quote } from "lucide-react";
import { IndustryLeadersStrip } from "@/components/home/ClientLogoStrip";
import ClientReveal from "@/components/shared/ClientReveal";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "CGAP — Convergent Graduate Academy Programme | A career, not a job",
    description:
        "A 9-month paid programme bridging academia and industry. Georgia Tech sponsored. Real client work from month two. Launch your career in data, cloud, and AI.",
};

const JOURNEY = [
    {
        months: "M1–M2",
        title: "Fundamentals",
        body: "Cohort bootcamp. SQL, data modelling, Power BI, Python, consulting basics. Georgia Tech-aligned curriculum, delivered by senior CBT consultants.",
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
        body: "Permanent placement on a CBT delivery team, or partner track with a sponsoring client. Either way, the programme ends with a career, not a certificate.",
    },
];

const CULTURE = [
    {
        icon: "graduation" as const,
        title: "Georgia Tech partnership",
        body: "Content, curriculum, and credentialing are shaped in partnership with Georgia Tech — so the academic grounding is defensible and the certification is recognisable.",
    },
    {
        icon: "award" as const,
        title: "Certification budget",
        body: "We pay for your certifications. Microsoft Fabric, Power BI, Databricks, Snowflake, cloud — whatever the track needs. Training is a line item, not a perk.",
    },
    {
        icon: "users" as const,
        title: "Senior mentors, not peer pods",
        body: "Every cohort is paired with senior CBT consultants — the same people who ship for P&G, KPMG, and ADNOC. Mentorship is programme-mandated, not optional.",
    },
    {
        icon: "handshake" as const,
        title: "Paid, stipended, residential-optional",
        body: "A stipend from day one. Residential or hybrid — we flex around commute and circumstance, not the other way around.",
    },
];

const fallbackAlumni = [
    {
        name: "Sarah Ahmed",
        cohort: "Batch 10",
        role: "BI Consultant",
        company: "CBT",
        quote:
            "CGAP gave me the practical skills and confidence that university alone couldn't.",
    },
    {
        name: "Ali Hassan",
        cohort: "Batch 11",
        role: "Data Engineer",
        company: "CBT",
        quote:
            "The hands-on approach is what sets CGAP apart. You're working with real data from month two.",
    },
    {
        name: "Fatima Malik",
        cohort: "Batch 9",
        role: "Analytics Consultant",
        company: "Tech Solutions Ltd",
        quote: "The mentors at CGAP are genuinely invested in your growth.",
    },
];

const ELIGIBILITY = [
    "Bachelor's degree in CS, Stats, Math, Engineering, or Economics",
    "Fresh graduates or up to 2 years of experience",
    "Strong analytical thinking and problem-solving skills",
    "Willing to commit to the full 9-month programme",
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
            .select("name")
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

    const clientNames = (clientsData as any[])?.map((c) => c.name) || [];
    const displayAlumni =
        (dbAlumni as any[])?.length ? (dbAlumni as any[]) : fallbackAlumni;
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
                className="hero-grid-texture"
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
                            marginBottom: 22,
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
                            The CGAP &middot; Convergent Graduate Academy Programme
                        </span>
                    </div>

                    <h1
                        className="v2-h1 a-fadeUp-2"
                        style={{
                            fontSize: "clamp(2.6rem, 5vw, 4rem)",
                            marginBottom: 22,
                            maxWidth: 920,
                        }}
                    >
                        Bridging Academia &amp;{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                            Industry.
                        </em>
                    </h1>

                    <p
                        className="a-fadeUp-3"
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 20,
                            fontWeight: 350,
                            color: "#4B5563",
                            lineHeight: 1.7,
                            maxWidth: 680,
                        }}
                    >
                        A <b>9-month paid programme</b> &mdash; Georgia Tech sponsored &mdash; that turns top graduates into shipping consultants. Real project work from month two. A career on the other side, not just a certificate.
                    </p>

                    <div
                        className="a-fadeUp-4"
                        style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}
                    >
                        <a href={applicationUrl} target="_blank" rel="noreferrer" className="hero-btn-primary">
                            Apply to CGAP <span>↗</span>
                        </a>
                        <Link href="#journey" className="hero-btn-secondary">
                            See the 9-month journey <span className="hero-btn-arrow">→</span>
                        </Link>
                    </div>

                    <div className="cgap-hero-facts">
                        <div className="cgap-hero-fact">
                            <span className="cgap-hero-fact-num">9</span>
                            <span className="cgap-hero-fact-label">months</span>
                        </div>
                        <div className="cgap-hero-fact">
                            <span className="cgap-hero-fact-num">GT</span>
                            <span className="cgap-hero-fact-label">sponsored</span>
                        </div>
                        <div className="cgap-hero-fact">
                            <span className="cgap-hero-fact-num">M2</span>
                            <span className="cgap-hero-fact-label">real projects</span>
                        </div>
                        <div className="cgap-hero-fact">
                            <span className="cgap-hero-fact-num">B{nextBatchNumber}</span>
                            <span className="cgap-hero-fact-label">next batch</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── JOURNEY ─── */}
            <section id="journey" className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">the 9-month journey</span>
                        <h2 className="services-section-title">
                            Fundamentals &rarr; Specialise &rarr; Ship &rarr;{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                Placed.
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

            {/* ─── GEORGIA TECH & PARTNER TRACK ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="cgap-gt-panel v2-reveal">
                        <div>
                            <span className="services-section-tag">Georgia Tech &amp; partner track</span>
                            <h2 className="services-section-title" style={{ maxWidth: 640 }}>
                                A curriculum you can{" "}
                                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                    defend.
                                </em>
                            </h2>
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 17.5,
                                    fontWeight: 350,
                                    lineHeight: 1.75,
                                    color: "var(--color-text-body)",
                                    maxWidth: 620,
                                    marginBottom: 16,
                                }}
                            >
                                CGAP is shaped in partnership with <b>Georgia Tech</b> &mdash; content, assessment, and certification aligned with a recognised academic programme, not home-brewed in a training room.
                            </p>
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 17.5,
                                    fontWeight: 350,
                                    lineHeight: 1.75,
                                    color: "var(--color-text-body)",
                                    maxWidth: 620,
                                }}
                            >
                                The <b>partner track</b> runs in parallel: sponsoring clients host a cohort member from month six and can convert the placement to a permanent hire. Same programme, different end destination.
                            </p>
                        </div>
                        <div className="cgap-gt-stats">
                            <div className="about-cgap-fact">
                                <span className="about-cgap-fact-num">GT</span>
                                <span className="about-cgap-fact-label">academic partner</span>
                                <span className="about-cgap-fact-note">
                                    content &amp; credentialing
                                </span>
                            </div>
                            <div className="about-cgap-fact">
                                <span className="about-cgap-fact-num">CBT</span>
                                <span className="about-cgap-fact-label">delivery track</span>
                                <span className="about-cgap-fact-note">
                                    permanent CBT placement
                                </span>
                            </div>
                            <div className="about-cgap-fact">
                                <span className="about-cgap-fact-num">◆</span>
                                <span className="about-cgap-fact-label">partner track</span>
                                <span className="about-cgap-fact-note">
                                    client-hosted placement &amp; hire
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CULTURE & CERT ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">culture &amp; investment</span>
                        <h2 className="services-section-title">
                            A career isn&rsquo;t a{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                perks list.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Training, mentorship, and certifications are line items on the cohort budget &mdash; not stretch goals.
                        </p>
                    </div>

                    <div className="services-grid services-grid-2">
                        {CULTURE.map((c, i) => (
                            <article key={c.title} className="services-tile">
                                <div className="services-tile-head">
                                    <div className="services-tile-icon">
                                        {/* inline SVG icon via the shared Icons component would require client; keep simple here */}
                                        <svg
                                            width={22}
                                            height={22}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="var(--color-primary)"
                                            strokeWidth={1.5}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            {c.icon === "graduation" && (
                                                <>
                                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                                </>
                                            )}
                                            {c.icon === "award" && (
                                                <>
                                                    <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
                                                    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                                                </>
                                            )}
                                            {c.icon === "users" && (
                                                <>
                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                    <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                </>
                                            )}
                                            {c.icon === "handshake" && (
                                                <>
                                                    <path d="M6 9H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" />
                                                    <path d="M18 9h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
                                                    <path d="M6 13l2.5 2.5 7-7" />
                                                    <path d="M10 9V7a2 2 0 0 1 4 0v2" />
                                                </>
                                            )}
                                        </svg>
                                    </div>
                                    <span className="services-tile-num">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <div className="services-tile-title-row">
                                    <h3 className="services-tile-title">{c.title}</h3>
                                </div>
                                <p className="services-tile-desc">{c.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── ELIGIBILITY + ALUMNI ─── */}
            <section className="services-section">
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
                    </div>
                </div>
            </section>

            <IndustryLeadersStrip clientNames={clientNames} />

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
                            Applications for the next cohort are open. Nine months. Georgia Tech sponsored. Real stakes from month two.
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
