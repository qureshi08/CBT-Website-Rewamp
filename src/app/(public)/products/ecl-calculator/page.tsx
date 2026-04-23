import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Ic from "@/components/shared/Icons";

export async function generateMetadata(): Promise<Metadata> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("products")
        .select("name, short_description")
        .eq("slug", "ecl-calculator")
        .single();

    if (!data) {
        return { title: "ECL Calculator | Convergent Business Technologies" };
    }
    return {
        title: `${data.name} | Convergent Business Technologies`,
        description:
            data.short_description ||
            "IFRS 9 expected credit loss, calculated in 48 hours. Bank-ready. Built with KPMG.",
    };
}

type EclProduct = {
    name: string;
    slug: string;
    short_description: string | null;
    full_description: string | null;
    partner_note: string | null;
    badge_text: string | null;
    industry: string | null;
};

const SOLUTION_TILES = [
    {
        num: "01",
        icon: "layersData" as const,
        title: "PD · LGD · EAD modelling",
        body: "Production-grade probability of default, loss given default and exposure at default models. Built on your segmentation, calibrated against your portfolio, tuned against Basel and IFRS 9 expectations.",
    },
    {
        num: "02",
        icon: "chart" as const,
        title: "Scenario overlays",
        body: "Baseline, adverse and severely adverse scenarios wired in by default. Macro variables plug into the same pipeline — rerun the book against updated forecasts in hours, not weeks.",
    },
    {
        num: "03",
        icon: "shield" as const,
        title: "Full audit trail",
        body: "Every run leaves a lineage record: inputs, model version, scenario, reviewer, sign-off. Exportable straight into your regulator-facing pack and the Big-4 audit walkthrough.",
    },
];

const PRICING_TIERS = [
    {
        num: "01",
        name: "Pilot",
        price: "Fixed fee · 4-week PoC",
        body: "We take a single portfolio segment, stand up the calculator against your data, and deliver a first ECL run with a methodology pack your auditor can walk through. Outcome-gated — if the pilot doesn't land, you don't scale.",
        items: [
            "Single-segment deployment",
            "PD / LGD / EAD walkthrough",
            "Baseline + 2 scenarios",
            "Audit-ready methodology pack",
        ],
        cta: "Scope a pilot",
        highlight: false,
    },
    {
        num: "02",
        name: "Enterprise",
        price: "Annual licence · tier-dependent",
        body: "Full-book deployment across retail, commercial and corporate portfolios. Scenario scheduler, quarterly model review, and named senior consultant. Pricing scales with portfolio size — we'll quote after scoping.",
        items: [
            "All portfolios · unlimited segments",
            "Quarterly model review",
            "Named senior consultant",
            "SLA-backed regulator support",
        ],
        cta: "Request enterprise terms",
        highlight: true,
    },
];

export default async function EclCalculatorPage() {
    const supabase = await createClient();

    const { data } = await supabase
        .from("products")
        .select(
            "name, slug, short_description, full_description, partner_note, badge_text, industry"
        )
        .eq("slug", "ecl-calculator")
        .single();

    const product = data as EclProduct | null;

    if (!product) notFound();

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
                    <nav
                        className="case-study-breadcrumb a-fadeUp-1"
                        aria-label="Breadcrumb"
                        style={{ marginBottom: 18 }}
                    >
                        <Link href="/products" className="case-study-breadcrumb-link">
                            ← Products
                        </Link>
                        <span className="case-study-breadcrumb-sep">/</span>
                        <span className="case-study-breadcrumb-current">
                            {product.industry || "Banking"}
                        </span>
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
                            {product.badge_text || "Hero SKU"} · IFRS 9
                        </span>
                    </div>

                    <h1
                        className="v2-h1 a-fadeUp-2"
                        style={{
                            fontSize: "clamp(2.6rem, 5vw, 4rem)",
                            marginBottom: 22,
                            maxWidth: 960,
                        }}
                    >
                        IFRS 9 ECL, calculated in{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                            48 hours.
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
                        {product.short_description ||
                            "A production-grade IFRS 9 expected credit loss engine for banks and lenders — PD, LGD and EAD modelling with scenario overlays, full audit trail, and a methodology pack your regulator has already seen."}
                    </p>

                    {product.partner_note && (
                        <p
                            className="a-fadeUp-3"
                            style={{
                                marginTop: 18,
                                fontFamily: "var(--font-mono)",
                                fontSize: 12,
                                letterSpacing: ".08em",
                                textTransform: "uppercase",
                                color: "var(--color-primary)",
                            }}
                        >
                            {product.partner_note}
                        </p>
                    )}

                    <div
                        className="a-fadeUp-4"
                        style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}
                    >
                        <Link href="/contact?intent=ecl-demo" className="hero-btn-primary">
                            Request a Demo <span>→</span>
                        </Link>
                        <Link href="#pricing" className="hero-btn-secondary">
                            View pricing <span className="hero-btn-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── PROBLEM / REGULATORY CONTEXT ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="industry-context v2-reveal">
                        <span className="services-section-tag">the problem</span>
                        <h2 className="services-section-title" style={{ maxWidth: 820 }}>
                            IFRS 9 didn&rsquo;t make provisioning{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                simpler.
                            </em>
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 18,
                                fontWeight: 350,
                                lineHeight: 1.75,
                                color: "var(--color-text-body)",
                                maxWidth: 820,
                                marginBottom: 16,
                            }}
                        >
                            Expected credit loss is a moving target. Every quarter the book shifts, every reforecast changes the macro overlays, and every regulator visit wants lineage from raw data to the final provision number. Most banks still stitch that together across spreadsheets, standalone models and a handful of SMEs who know where the bodies are buried.
                        </p>
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 18,
                                fontWeight: 350,
                                lineHeight: 1.75,
                                color: "var(--color-text-body)",
                                maxWidth: 820,
                            }}
                        >
                            We built the ECL Calculator so a quarterly run is a pipeline, not a fire drill. PD, LGD, EAD, scenario overlays and audit trail sit in one engine &mdash; reviewed by KPMG&rsquo;s banking practice, deployed against real books, and tuned for the regulators you actually answer to.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── SOLUTION TILES ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">what&rsquo;s inside</span>
                        <h2 className="services-section-title">
                            Three components, one audit{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                trail.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Modelling, scenario overlays and lineage in a single engine &mdash; so provisioning reruns in hours, not weeks.
                        </p>
                    </div>

                    <div className="services-grid services-grid-3">
                        {SOLUTION_TILES.map((t) => (
                            <article key={t.num} className="services-tile">
                                <div className="services-tile-head">
                                    <div className="services-tile-icon">
                                        <Ic name={t.icon} size={22} stroke="var(--color-primary)" />
                                    </div>
                                    <span className="services-tile-num">{t.num}</span>
                                </div>
                                <div className="services-tile-title-row">
                                    <h3 className="services-tile-title">{t.title}</h3>
                                </div>
                                <p className="services-tile-desc">{t.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── KPMG CREDIBILITY STRIP ─── */}
            <section
                className="services-section"
                style={{ background: "var(--color-primary-muted)" }}
            >
                <div className="v2-wrap">
                    <div
                        className="v2-reveal"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 28,
                            maxWidth: 1080,
                            margin: "0 auto",
                            textAlign: "center",
                        }}
                    >
                        <div>
                            <span className="services-section-tag" style={{ marginBottom: 0 }}>
                                Built with KPMG
                            </span>
                        </div>
                        <h2
                            className="services-section-title"
                            style={{ maxWidth: 880, margin: "0 auto" }}
                        >
                            Methodology co-developed with KPMG&rsquo;s{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                banking practice.
                            </em>
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 17,
                                fontWeight: 350,
                                lineHeight: 1.75,
                                color: "var(--color-text-body)",
                                maxWidth: 760,
                                margin: "0 auto",
                            }}
                        >
                            Models and audit scaffolding reviewed against Big-4 expectations. When your auditor asks how you arrived at a provision number, the walkthrough is already built &mdash; and it&rsquo;s one KPMG has seen before.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 12,
                                justifyContent: "center",
                                marginTop: 8,
                            }}
                        >
                            {[
                                "Big-4 audit reviewed",
                                "Regulator-facing documentation",
                                "IFRS 9 stage allocation logic",
                                "Basel-consistent risk parameters",
                            ].map((chip) => (
                                <span
                                    key={chip}
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 11,
                                        letterSpacing: ".06em",
                                        textTransform: "uppercase",
                                        color: "var(--color-text-heading)",
                                        background: "#fff",
                                        border: "1px solid var(--color-border)",
                                        borderRadius: 999,
                                        padding: "7px 14px",
                                    }}
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FIRST-CLIENT PROOF ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div
                        className="v2-reveal"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 28,
                            maxWidth: 880,
                            margin: "0 auto",
                        }}
                    >
                        <span className="services-section-tag">first deployment</span>
                        <h2 className="services-section-title" style={{ maxWidth: 820 }}>
                            A tier-1 South Asian bank went from{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                six weeks to 48 hours.
                            </em>
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 17,
                                fontWeight: 350,
                                lineHeight: 1.75,
                                color: "var(--color-text-body)",
                                maxWidth: 760,
                            }}
                        >
                            Before CBT, the quarterly ECL run took six weeks across three teams and ended with a spreadsheet no one wanted to own. Post-deployment, the full retail book reruns in under 48 hours &mdash; scenario overlays included &mdash; and the audit pack generates on the same pipeline. That&rsquo;s the deployment that shaped the product.
                        </p>
                        <div className="industry-highlights-row" style={{ marginTop: 8 }}>
                            {[
                                { n: "48h", l: "full-book rerun", note: "retail portfolio, baseline + scenarios" },
                                { n: "6→1", l: "teams involved", note: "risk, finance, tech on one pipeline" },
                                { n: "4", l: "scenarios per cycle", note: "baseline · adverse · severe · bespoke" },
                            ].map((s) => (
                                <div key={s.l} className="industry-highlight">
                                    <div className="industry-highlight-number">{s.n}</div>
                                    <div className="industry-highlight-label">{s.l}</div>
                                    <div className="industry-highlight-note">{s.note}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PRICING ─── */}
            <section id="pricing" className="services-section">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">pricing</span>
                        <h2 className="services-section-title">
                            Pilot the outcome before you scale the{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                licence.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Two engagement shapes. Both outcome-owned. Both backed by a named senior consultant.
                        </p>
                    </div>

                    <div className="services-grid services-grid-2">
                        {PRICING_TIERS.map((t) => (
                            <article
                                key={t.num}
                                className="services-tile"
                                style={
                                    t.highlight
                                        ? { borderColor: "var(--color-primary)", boxShadow: "0 10px 40px rgba(0,153,77,0.08)" }
                                        : undefined
                                }
                            >
                                <div className="services-tile-head">
                                    <span
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 11,
                                            letterSpacing: ".08em",
                                            textTransform: "uppercase",
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        {t.num} · {t.name}
                                    </span>
                                    {t.highlight && (
                                        <span
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: 10,
                                                letterSpacing: ".08em",
                                                textTransform: "uppercase",
                                                color: "var(--color-primary)",
                                                background: "var(--color-primary-muted)",
                                                padding: "3px 10px",
                                                borderRadius: 999,
                                            }}
                                        >
                                            Most common
                                        </span>
                                    )}
                                </div>
                                <div className="services-tile-title-row" style={{ marginTop: 10 }}>
                                    <h3 className="services-tile-title">{t.price}</h3>
                                </div>
                                <p className="services-tile-desc" style={{ marginBottom: 16 }}>
                                    {t.body}
                                </p>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: "0 0 20px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                    }}
                                >
                                    {t.items.map((item) => (
                                        <li
                                            key={item}
                                            style={{
                                                fontFamily: "var(--font-body)",
                                                fontSize: 14,
                                                color: "var(--color-text-body)",
                                                lineHeight: 1.6,
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: 10,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    flexShrink: 0,
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: "50%",
                                                    background: "var(--color-primary-muted)",
                                                    color: "var(--color-primary)",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    marginTop: 2,
                                                }}
                                            >
                                                ✓
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/contact?intent=ecl-demo"
                                    className={t.highlight ? "hero-btn-primary" : "hero-btn-secondary"}
                                    style={{ alignSelf: "flex-start" }}
                                >
                                    {t.cta} <span className="hero-btn-arrow">→</span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA BAND ─── */}
            <section className="cta-band">
                <div className="v2-wrap cta-inner-grid">
                    <div>
                        <h2 className="cta-heading">
                            Run the ECL Calculator against your own{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                book.
                            </em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Thirty minutes with a senior consultant and a KPMG collaborator. We&rsquo;ll walk the methodology, map it to your portfolio, and tell you whether a pilot fits.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                        <Link
                            href="/contact?intent=ecl-demo"
                            className="btn-cta-white"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Request a Demo →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
