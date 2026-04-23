import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ClientReveal from "@/components/shared/ClientReveal";
import { IndustryLeadersStrip } from "@/components/home/ClientLogoStrip";

export const metadata: Metadata = {
    title: "Case Studies | Convergent Business Technologies",
    description:
        "Outcomes we've shipped. Measurable results in data, cloud, and AI — across retail, banking, telecom, and government.",
};

// Outcome-led fallback — title *is* the outcome, client/industry is supporting context.
const fallbackCaseStudies: CaseStudy[] = [
    {
        slug: "loyalty-margin-uplift",
        title: "+32% margin on pilot category",
        summary:
            "Rebuilt the loyalty decisioning stack on Microsoft Fabric. Redemption uplift drove a 32% margin improvement in the pilot category within one quarter.",
        tags: ["Retail", "Fabric", "Data Engineering"],
        outcome: "+32%",
        industry: "Retail",
    },
    {
        slug: "ecl-48-hours",
        title: "ECL calculated in 48 hours",
        summary:
            "IFRS 9 expected credit loss modelling, bank-ready and audit-traceable. From raw data to regulator-shaped output in 48 hours, built in collaboration with KPMG.",
        tags: ["Banking", "KPMG", "Regulatory"],
        outcome: "48h",
        industry: "Banking",
    },
    {
        slug: "realtime-bi-40x",
        title: "40× faster time-to-insight",
        summary:
            "Replaced a batch reporting estate with a Snowflake + Power BI architecture. Time-to-insight dropped from six hours to nine minutes across the operations estate.",
        tags: ["Telecom", "Snowflake", "Power BI"],
        outcome: "40×",
        industry: "Telecom",
    },
];

type CaseStudy = {
    slug: string;
    title: string;
    summary: string | null;
    tags: string[];
    outcome?: string;
    industry?: string;
};

export default async function CaseStudiesPage() {
    const supabase = await createClient();

    const [{ data: clientsData }, { data: dbCaseStudies }] = await Promise.all([
        supabase.from("clients").select("name").order("display_order", { ascending: true }),
        supabase
            .from("case_studies")
            .select("slug, title, summary, tags")
            .eq("published", true)
            .order("created_at", { ascending: false }),
    ]);

    const clientNames = clientsData?.map((c) => c.name);

    const studies: CaseStudy[] =
        dbCaseStudies && dbCaseStudies.length > 0
            ? (dbCaseStudies as any[]).map((s) => ({
                slug: s.slug,
                title: s.title,
                summary: s.summary,
                tags: s.tags || [],
            }))
            : fallbackCaseStudies;

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
                <div className="v2-wrap" style={{ position: "relative", zIndex: 1, width: "100%" }}>
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
                            Outcomes, not activity
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
                        Case studies that moved the{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                            number.
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
                            maxWidth: 640,
                        }}
                    >
                        Every engagement ships with a measurable outcome. No activity reports, no vanity metrics — here&rsquo;s the shortlist of numbers we&rsquo;ve moved for clients across retail, banking, telecom, and government.
                    </p>

                    <div
                        className="a-fadeUp-4"
                        style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}
                    >
                        <Link href="/contact?intent=discovery" className="hero-btn-primary">
                            Book a Discovery Call <span>→</span>
                        </Link>
                        <Link href="#studies" className="hero-btn-secondary">
                            Browse case studies <span className="hero-btn-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── TRUST BAR ─── */}
            <IndustryLeadersStrip clientNames={clientNames} />

            {/* ─── STUDIES GRID ─── */}
            <section id="studies" className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">the shortlist</span>
                        <h2 className="services-section-title">
                            Shipped outcomes,{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                not slide decks.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Pick any case; each opens the detail — challenge, approach, what we shipped, and what it moved.
                        </p>
                    </div>

                    <div className="case-study-grid">
                        {studies.map((s) => (
                            <Link
                                key={s.slug}
                                href={`/case-studies/${s.slug}`}
                                className="case-study-card"
                            >
                                {(s.outcome || s.industry) && (
                                    <div className="case-study-card-head">
                                        {s.industry && (
                                            <span className="case-study-card-industry">{s.industry}</span>
                                        )}
                                        {s.outcome && (
                                            <span className="case-study-card-outcome">{s.outcome}</span>
                                        )}
                                    </div>
                                )}
                                <h3 className="case-study-card-title">{s.title}</h3>
                                {s.summary && (
                                    <p className="case-study-card-summary">{s.summary}</p>
                                )}
                                <div className="case-study-card-foot">
                                    <div className="case-study-card-tags">
                                        {s.tags?.slice(0, 3).map((t) => (
                                            <span key={t} className="services-tile-tool">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="case-study-card-cta">
                                        Read the case <span aria-hidden>→</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA BAND ─── */}
            <section className="cta-band">
                <div className="v2-wrap cta-inner-grid">
                    <div>
                        <h2 className="cta-heading">
                            What&rsquo;s the number you want to{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                move?
                            </em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Tell us the outcome you&rsquo;re chasing — we&rsquo;ll tell you whether we&rsquo;re the right team to help ship it.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                        <Link
                            href="/contact?intent=discovery"
                            className="btn-cta-white"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Book a Discovery Call →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
