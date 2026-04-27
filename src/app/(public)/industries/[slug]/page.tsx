import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Props = { params: Promise<{ slug: string }> };

type HelpItem = { num: string; title: string; body: string };
type OutcomeItem = { number: string; label: string; note: string };

type IndustryRow = {
    slug: string;
    label: string;
    tagline: string | null;
    hero_headline: string;
    hero_italic: string | null;
    hero_sub: string | null;
    context_title: string | null;
    context_italic: string | null;
    context_body: string | null;
    where_we_help: HelpItem[] | null;
    outcome_highlights: OutcomeItem[] | null;
};

export async function generateStaticParams() {
    // Only pre-render industry pages that have at least one published case study —
    // empty industries redirect to /case-studies on the detail page anyway.
    const [{ data: industries }, { data: cases }] = await Promise.all([
        supabaseAdmin.from("industries").select("slug").eq("is_active", true),
        supabaseAdmin.from("case_studies").select("industry_slug").eq("published", true),
    ]);
    const slugsWithCases = new Set(
        ((cases as { industry_slug: string | null }[] | null) || [])
            .map((c) => c.industry_slug)
            .filter(Boolean) as string[],
    );
    return ((industries as { slug: string }[] | null) || [])
        .filter((r) => slugsWithCases.has(r.slug))
        .map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();
    const { data } = await supabase
        .from("industries")
        .select("label, hero_sub")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();
    if (!data) return { title: "Industry | Convergent Business Technologies" };
    return {
        title: `${data.label} | Industries | Convergent Business Technologies`,
        description: data.hero_sub || undefined,
    };
}

export default async function IndustryPage({ params }: Props) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: indData } = await supabase
        .from("industries")
        .select("slug, label, tagline, hero_headline, hero_italic, hero_sub, context_title, context_italic, context_body, where_we_help, outcome_highlights")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

    const industry = indData as IndustryRow | null;
    if (!industry) notFound();

    const { data: caseData } = await supabase
        .from("case_studies")
        .select("slug, title, summary, tags")
        .eq("industry_slug", slug)
        .eq("published", true)
        .order("created_at", { ascending: false });

    const caseStudies = (caseData || []) as Array<{
        slug: string;
        title: string;
        summary: string | null;
        tags: string[] | null;
    }>;

    // Industries without published case studies shouldn't surface publicly —
    // they're either skeleton rows from admin combobox auto-create or an
    // industry whose studies have all been unpublished. Send visitors to the
    // case-studies index instead of showing an empty landing.
    if (caseStudies.length === 0) {
        redirect("/case-studies");
    }

    const helpItems = industry.where_we_help || [];
    const outcomeItems = industry.outcome_highlights || [];
    const labelLower = industry.label.toLowerCase();

    return (
        <main>
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
                    <nav className="case-study-breadcrumb" aria-label="Breadcrumb">
                        <Link href="/case-studies" className="case-study-breadcrumb-link">
                            ← All case studies
                        </Link>
                    </nav>

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
                            {industry.label}
                            {industry.tagline && <> &middot; {industry.tagline}</>}
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
                        {industry.hero_headline}
                        {industry.hero_italic && (
                            <>
                                {" "}
                                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                    {industry.hero_italic}
                                </em>
                            </>
                        )}
                    </h1>

                    {industry.hero_sub && (
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
                            {industry.hero_sub}
                        </p>
                    )}

                    <div
                        className="a-fadeUp-4"
                        style={{
                            display: "flex",
                            gap: 16,
                            marginTop: 32,
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        <Link href="/contact?intent=discovery" className="hero-btn-primary">
                            Book a Discovery Call <span>→</span>
                        </Link>
                        <Link href="#cases" className="hero-btn-secondary">
                            See {labelLower} cases{" "}
                            <span className="hero-btn-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── OUTCOME HIGHLIGHTS ─── */}
            {outcomeItems.length > 0 && (
                <section className="industry-highlights">
                    <div className="v2-wrap">
                        <div className="industry-highlights-row">
                            {outcomeItems.map((o) => (
                                <div key={o.label} className="industry-highlight">
                                    <div className="industry-highlight-number">{o.number}</div>
                                    <div className="industry-highlight-label">{o.label}</div>
                                    <div className="industry-highlight-note">{o.note}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── CONTEXT NARRATIVE ─── */}
            {industry.context_body && (
                <section className="services-section services-section-alt">
                    <div className="v2-wrap">
                        <div className="industry-context v2-reveal">
                            <span className="services-section-tag">the context</span>
                            {(industry.context_title || industry.context_italic) && (
                                <h2 className="services-section-title" style={{ maxWidth: 760 }}>
                                    {industry.context_title}
                                    {industry.context_italic && (
                                        <>
                                            {" "}
                                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                                {industry.context_italic}
                                            </em>
                                        </>
                                    )}
                                </h2>
                            )}
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 18,
                                    fontWeight: 350,
                                    lineHeight: 1.75,
                                    color: "var(--color-text-body)",
                                    maxWidth: 760,
                                }}
                            >
                                {industry.context_body}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* ─── WHERE WE HELP ─── */}
            {helpItems.length > 0 && (
                <section className="services-section">
                    <div className="v2-wrap">
                        <div className="services-section-head v2-reveal">
                            <span className="services-section-tag">where we help</span>
                            <h2 className="services-section-title">
                                Three places we move the{" "}
                                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                    number.
                                </em>
                            </h2>
                            <p className="services-section-sub">
                                Not a capability menu &mdash; the concrete work we ship most often in {labelLower}.
                            </p>
                        </div>

                        <div className="services-grid services-grid-3">
                            {helpItems.map((w) => (
                                <article key={w.num} className="services-tile">
                                    <div className="services-tile-head">
                                        <span className="services-tile-num">{w.num}</span>
                                    </div>
                                    <div className="services-tile-title-row">
                                        <h3 className="services-tile-title">{w.title}</h3>
                                    </div>
                                    <p className="services-tile-desc">{w.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── CASE STUDIES (auto-pulled by industry_slug) ─── */}
            <section
                id="cases"
                className="services-section services-section-alt"
            >
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">{labelLower} cases</span>
                        <h2 className="services-section-title">
                            What we&rsquo;ve shipped in{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                {labelLower}.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Outcomes first; the full walkthrough is on the case page.
                        </p>
                    </div>

                    <div className="case-study-grid">
                        {caseStudies.map((c) => (
                            <Link
                                key={c.slug}
                                href={`/case-studies/${c.slug}`}
                                className="case-study-card"
                            >
                                <h3 className="case-study-card-title">{c.title}</h3>
                                {c.summary && (
                                    <p className="case-study-card-summary">{c.summary}</p>
                                )}
                                <div className="case-study-card-foot">
                                    <div className="case-study-card-tags">
                                        {c.tags?.slice(0, 3).map((t) => (
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
                            Same playbook, your{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                {labelLower}.
                            </em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Thirty minutes with a senior consultant. We&rsquo;ll pressure-test whether what we&rsquo;ve shipped elsewhere maps to your problem.
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
