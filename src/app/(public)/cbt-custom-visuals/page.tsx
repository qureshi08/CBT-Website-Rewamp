import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ClientReveal from "@/components/shared/ClientReveal";
import { VISUALS } from "@/content/cbt-custom-visuals";

export const metadata: Metadata = {
    title: "Custom Visuals | CBT — Power BI Custom Visuals on Microsoft AppSource",
    description:
        "Eight free Power BI custom visuals built by CBT — dual-axis charts, hierarchical KPI trees, RTL/Arabic visuals, dumbbell charts and more. Available on Microsoft AppSource.",
};

const SHARED_FEATURES = [
    {
        title: "Native formatting pane",
        body: "Configured the same way as Microsoft's stock visuals — no separate config UI for your report authors to learn.",
    },
    {
        title: "Cross-filtering & drill-down",
        body: "Click a bar, slice the page. Drill into a hierarchy without losing the rest of the report's filter state.",
    },
    {
        title: "Tooltip support",
        body: "Standard Power BI tooltip pages, Q&A tooltips and field-level tooltips all wired in.",
    },
    {
        title: "Customisable styling",
        body: "Colours, fonts, gridlines, padding, label positions — every visual exposes the knobs you'd expect.",
    },
    {
        title: "Small multiples",
        body: "Where it makes sense, split a single visual into a grid of small multiples driven by a category field.",
    },
    {
        title: "DAX integration",
        body: "Conditional formatting, status colours and dynamic labels driven by your existing DAX measures.",
    },
];

const TRUST_CHIPS = [
    "Microsoft AppSource publisher",
    "Free, with CBT watermark",
    "Built on real client engagements",
    "Actively maintained",
];

export default function CbtCustomVisualsPage() {
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
                    <nav
                        className="case-study-breadcrumb a-fadeUp-1"
                        aria-label="Breadcrumb"
                        style={{ marginBottom: 18 }}
                    >
                        <Link href="/products" className="case-study-breadcrumb-link">
                            ← Products
                        </Link>
                        <span className="case-study-breadcrumb-sep">/</span>
                        <span className="case-study-breadcrumb-current">Custom Visuals</span>
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
                            Power BI · Microsoft AppSource
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
                        Power BI visuals, the way reporting{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                            actually works.
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
                        Eight free custom visuals built by our BI practice for the gaps Microsoft&rsquo;s stock library leaves behind &mdash; dual-axis combos, deep KPI hierarchies, dumbbell charts and a full RTL/Arabic suite. All published on Microsoft AppSource.
                    </p>

                    <div
                        className="a-fadeUp-4"
                        style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}
                    >
                        <Link href="#visuals" className="hero-btn-primary">
                            Browse the catalogue <span>→</span>
                        </Link>
                        <Link href="/contact?intent=custom-visual" className="hero-btn-secondary">
                            Talk to our BI team <span className="hero-btn-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── WHY WE BUILT THESE ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="v2-reveal">
                        <span className="services-section-tag">the why</span>
                        <h2 className="services-section-title">
                            Stock visuals get you 80% of the way{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                there.
                            </em>
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 18,
                                fontWeight: 350,
                                lineHeight: 1.75,
                                color: "var(--color-text-body)",
                                marginBottom: 16,
                            }}
                        >
                            We build a lot of Power BI dashboards. Often enough, the same gaps trip the same reports: dual-axis combos that need real independent scales, KPI cards that should walk down two hierarchies at once, decomposition trees that want more than one measure per node, and Arabic dashboards that fight the engine every time you touch the layout.
                        </p>
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 18,
                                fontWeight: 350,
                                lineHeight: 1.75,
                                color: "var(--color-text-body)",
                                margin: 0,
                            }}
                        >
                            Rather than work around them on every engagement, we built proper visuals to close them &mdash; published them on Microsoft AppSource, and made them free to download. Use them in your reports the same way you&rsquo;d use any stock visual.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── THE CATALOGUE ─── */}
            <section id="visuals" className="services-section">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">the catalogue</span>
                        <h2 className="services-section-title">
                            Eight visuals. One Power BI{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                toolkit.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Each visual is free to download from Microsoft AppSource. Use them in any Power BI report &mdash; desktop or service.
                        </p>
                    </div>

                    <div className="services-grid services-grid-3">
                        {VISUALS.map((v) => (
                            <article key={v.num} className="services-tile">
                                {/* Preview slot — renders Image when previewSrc set, placeholder otherwise */}
                                <div
                                    style={{
                                        margin: "-28px -26px 0",
                                        aspectRatio: "16 / 9",
                                        background: "var(--color-surface)",
                                        borderBottom: "1px solid var(--color-border)",
                                        borderTopLeftRadius: 14,
                                        borderTopRightRadius: 14,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                        position: "relative",
                                    }}
                                >
                                    {v.previewSrc ? (
                                        <Image
                                            src={v.previewSrc}
                                            alt={`Preview of ${v.name}`}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                                            style={{ objectFit: "cover" }}
                                        />
                                    ) : (
                                        <span
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: 10,
                                                letterSpacing: ".12em",
                                                textTransform: "uppercase",
                                                color: "var(--color-text-muted)",
                                            }}
                                        >
                                            Screenshot coming soon
                                        </span>
                                    )}
                                </div>

                                <div className="services-tile-head">
                                    <span className="services-tile-num">{v.num}</span>
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
                                        Free · AppSource
                                    </span>
                                </div>

                                <div className="services-tile-title-row">
                                    <h3 className="services-tile-title">{v.name}</h3>
                                </div>

                                <p className="services-tile-desc">{v.pitch}</p>

                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                    }}
                                >
                                    {v.featuresShort.map((f) => (
                                        <li
                                            key={f}
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
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <div
                                    style={{
                                        marginTop: "auto",
                                        display: "flex",
                                        gap: 12,
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        paddingTop: 4,
                                    }}
                                >
                                    {/* TODO: AppSource URL — replace href="#" once available */}
                                    <a
                                        href={v.appSourceUrl}
                                        className="hero-btn-primary"
                                        target={v.appSourceUrl === "#" ? undefined : "_blank"}
                                        rel={v.appSourceUrl === "#" ? undefined : "noopener noreferrer"}
                                        aria-label={`Download ${v.name} from Microsoft AppSource`}
                                    >
                                        Download <span>→</span>
                                    </a>
                                    <Link
                                        href={`/cbt-custom-visuals/${v.slug}`}
                                        style={{
                                            fontFamily: "var(--font-body)",
                                            fontSize: 14,
                                            fontWeight: 500,
                                            color: "var(--color-primary)",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Learn more →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SHARED CAPABILITIES ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">shared capabilities</span>
                        <h2 className="services-section-title">
                            Built like the stock visuals &mdash; minus the{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                gaps.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Everything you&rsquo;d expect from a first-party Power BI visual, on every visual we ship.
                        </p>
                    </div>

                    <div className="services-grid services-grid-3">
                        {SHARED_FEATURES.map((f) => (
                            <article key={f.title} className="services-tile">
                                <div className="services-tile-title-row">
                                    <h3 className="services-tile-title" style={{ fontSize: "1.15rem" }}>
                                        {f.title}
                                    </h3>
                                </div>
                                <p className="services-tile-desc">{f.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── BUILT BY A BI CONSULTANCY ─── */}
            <section className="services-section">
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
                                Who built these
                            </span>
                        </div>
                        <h2
                            className="services-section-title"
                            style={{ maxWidth: 880, margin: "0 auto" }}
                        >
                            From the same team that ships your{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                dashboards.
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
                            CBT&rsquo;s BI practice builds, governs and operates Power BI estates for banks, telcos and retailers. These visuals fell out of that work &mdash; and the same team is a phone call away if you need a custom visual built around your reporting model.
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
                            {TRUST_CHIPS.map((chip) => (
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
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 13,
                                color: "var(--color-text-muted)",
                                margin: "20px 0 0",
                            }}
                        >
                            <Link
                                href="/privacy-policy-pbicv"
                                style={{
                                    color: "var(--color-text-muted)",
                                    textDecoration: "underline",
                                    textUnderlineOffset: 3,
                                    textDecorationColor: "rgba(107,114,128,0.35)",
                                }}
                            >
                                Privacy policy for Power BI custom visuals
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── CTA BAND ─── */}
            <section className="cta-band">
                <div className="v2-wrap cta-inner-grid">
                    <div>
                        <h2 className="cta-heading">
                            Need a custom Power BI visual built for your{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                reporting?
                            </em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Thirty minutes with a senior BI consultant. We&rsquo;ll walk your report, scope the visual, and tell you whether a build makes sense.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                        <Link
                            href="/contact?intent=custom-visual"
                            className="btn-cta-white"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Talk to our BI team →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
