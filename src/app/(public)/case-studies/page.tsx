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

type CaseStudyCard = {
    slug: string;
    title: string;
    summary: string | null;
    outcome_value: string | null;
    outcome_label: string | null;
    tags: string[] | null;
    industry_label: string | null;
};

export default async function CaseStudiesPage() {
    const supabase = await createClient();

    const [{ data: clientsData }, { data: studiesData }, { data: industriesData }] =
        await Promise.all([
            supabase
                .from("clients")
                .select("name, logo_url, logo_full_url")
                .order("display_order", { ascending: true }),
            supabase
                .from("case_studies")
                .select("slug, title, summary, outcome_value, outcome_label, tags, industry_slug, display_order")
                .eq("published", true)
                .order("display_order", { ascending: true }),
            supabase.from("industries").select("slug, label"),
        ]);

    const clients = clientsData?.map((c: any) => ({
        name: c.name,
        logoUrl: c.logo_full_url || c.logo_url || null,
    }));

    // Build industry slug→label map so cards can show a human label instead of the slug.
    const industryLabel = new Map<string, string>(
        ((industriesData as any[]) || []).map((i) => [i.slug, i.label]),
    );

    const studies: CaseStudyCard[] = ((studiesData as any[]) || []).map((s) => ({
        slug: s.slug,
        title: s.title,
        summary: s.summary,
        outcome_value: s.outcome_value,
        outcome_label: s.outcome_label,
        tags: s.tags,
        industry_label: s.industry_slug ? industryLabel.get(s.industry_slug) ?? null : null,
    }));

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
            <IndustryLeadersStrip clients={clients} />

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

                    {studies.length > 0 ? (
                        <div className="case-study-grid">
                            {studies.map((s) => {
                                const hasMetric = !!(s.outcome_value && s.outcome_label);
                                return (
                                    <Link
                                        key={s.slug}
                                        href={`/case-studies/${s.slug}`}
                                        className="cs-card"
                                    >
                                        <div className="cs-card-inner">
                                            {s.industry_label && (
                                                <span className="cs-card-industry">
                                                    <span
                                                        className="cs-card-industry-dot"
                                                        aria-hidden
                                                    />
                                                    {s.industry_label}
                                                </span>
                                            )}

                                            <h3 className="cs-card-title">{s.title}</h3>

                                            {s.summary && (
                                                <p className="cs-card-summary">{s.summary}</p>
                                            )}

                                            {hasMetric && (
                                                <div className="cs-card-metric">
                                                    <span className="cs-card-metric-value">
                                                        {s.outcome_value}
                                                    </span>
                                                    <span className="cs-card-metric-label">
                                                        {s.outcome_label}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="cs-card-foot">
                                                {s.tags && s.tags.length > 0 && (
                                                    <div className="cs-card-tags">
                                                        {s.tags.slice(0, 3).map((t) => (
                                                            <span key={t} className="cs-card-tag">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <span className="cs-card-cta">
                                                    Read the case <span aria-hidden>→</span>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="cs-empty v2-reveal">
                            <p className="cs-empty-title">Case studies coming soon.</p>
                            <p className="cs-empty-sub">
                                Want to see outcomes for your industry? Book a call — we&rsquo;ll talk through what&rsquo;s shipped adjacent to your problem.
                            </p>
                            <Link
                                href="/contact?intent=discovery"
                                className="hero-btn-primary"
                            >
                                Book a Discovery Call <span>→</span>
                            </Link>
                        </div>
                    )}
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
