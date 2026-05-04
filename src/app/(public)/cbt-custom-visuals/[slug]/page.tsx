import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ClientReveal from "@/components/shared/ClientReveal";
import { VISUALS, getVisualBySlug } from "@/content/cbt-custom-visuals";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return VISUALS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const visual = getVisualBySlug(slug);
    if (!visual) {
        return { title: "Custom Visual | Convergent Business Technologies" };
    }
    return {
        title: `${visual.name} | Custom Visuals | CBT — Power BI Custom Visuals`,
        description: visual.pitch,
    };
}

export default async function CustomVisualDetailPage({ params }: Props) {
    const { slug } = await params;
    const visual = getVisualBySlug(slug);
    if (!visual) notFound();

    const hasAppSourceUrl = visual.appSourceUrl !== "#";
    const hasTutorialUrl = visual.tutorialUrl !== null;
    const siblings = VISUALS.filter((v) => v.slug !== visual.slug);

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
                        <Link href="/cbt-custom-visuals" className="case-study-breadcrumb-link">
                            ← Custom Visuals
                        </Link>
                        <span className="case-study-breadcrumb-sep">/</span>
                        <span className="case-study-breadcrumb-current">{visual.name}</span>
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
                            fontSize: "clamp(2.4rem, 4.6vw, 3.6rem)",
                            marginBottom: 22,
                            maxWidth: 960,
                        }}
                    >
                        {visual.name}
                    </h1>

                    <p
                        className="a-fadeUp-3"
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 20,
                            fontWeight: 350,
                            color: "#4B5563",
                            lineHeight: 1.7,
                            maxWidth: 720,
                        }}
                    >
                        {visual.pitch}
                    </p>

                    <div
                        className="a-fadeUp-4"
                        style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}
                    >
                        {hasAppSourceUrl ? (
                            <a
                                href={visual.appSourceUrl}
                                className="hero-btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Download ${visual.name} from Microsoft AppSource`}
                            >
                                Download from AppSource <span>→</span>
                            </a>
                        ) : (
                            <span
                                className="hero-btn-primary"
                                aria-disabled="true"
                                style={{
                                    opacity: 0.55,
                                    cursor: "not-allowed",
                                    pointerEvents: "none",
                                }}
                            >
                                Coming soon
                            </span>
                        )}
                        {hasTutorialUrl ? (
                            <a
                                href={visual.tutorialUrl!}
                                className="hero-btn-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Watch tutorial for ${visual.name} on YouTube`}
                            >
                                Watch tutorial <span className="hero-btn-arrow">→</span>
                            </a>
                        ) : (
                            <span
                                className="hero-btn-secondary"
                                aria-disabled="true"
                                style={{
                                    opacity: 0.55,
                                    cursor: "not-allowed",
                                    pointerEvents: "none",
                                }}
                            >
                                Tutorial coming soon
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── PREVIEW SLOT ─── */}
            <section className="services-section" style={{ paddingTop: 0 }}>
                <div className="v2-wrap">
                    {/* Preview slot — renders Image when previewSrc set, placeholder otherwise */}
                    <div
                        className="v2-reveal"
                        style={{
                            maxWidth: 960,
                            margin: "0 auto",
                            aspectRatio: "16 / 9",
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            borderRadius: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        {visual.previewSrc ? (
                            <Image
                                src={visual.previewSrc}
                                alt={`Preview of ${visual.name}`}
                                fill
                                sizes="(max-width: 960px) 100vw, 960px"
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        ) : (
                            <span
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 11,
                                    letterSpacing: ".12em",
                                    textTransform: "uppercase",
                                    color: "var(--color-text-muted)",
                                }}
                            >
                                Screenshot coming soon
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── OVERVIEW ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="v2-reveal">
                        <span className="services-section-tag">overview</span>
                        <h2 className="services-section-title">
                            What it{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                does.
                            </em>
                        </h2>
                        {visual.description.map((para, i) => (
                            <p
                                key={i}
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 18,
                                    fontWeight: 350,
                                    lineHeight: 1.75,
                                    color: "var(--color-text-body)",
                                    marginBottom: i === visual.description.length - 1 ? 0 : 16,
                                }}
                            >
                                {para}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CAPABILITIES + ROADMAP (merged) ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">the visual</span>
                        <h2 className="services-section-title">
                            What ships today, what&rsquo;s{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                next.
                            </em>
                        </h2>
                    </div>

                    {/* Capabilities — full-width grid */}
                    <div
                        className="v2-reveal"
                        style={{ marginBottom: visual.upcoming.length > 0 ? 56 : 0 }}
                    >
                        <h3
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 15,
                                fontWeight: 600,
                                color: "var(--color-text-heading)",
                                margin: "0 0 20px",
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <span
                                aria-hidden="true"
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    background: "var(--color-primary)",
                                }}
                            />
                            Available now
                            <span
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 11,
                                    fontWeight: 500,
                                    letterSpacing: ".06em",
                                    color: "var(--color-text-muted)",
                                    textTransform: "uppercase",
                                }}
                            >
                                {visual.featuresFull.length} capabilities
                            </span>
                        </h3>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: 12,
                            }}
                        >
                            {visual.featuresFull.map((f) => (
                                <li
                                    key={f}
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: 15,
                                        color: "var(--color-text-body)",
                                        lineHeight: 1.55,
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 12,
                                        background: "#fff",
                                        border: "1px solid var(--color-border)",
                                        borderRadius: 12,
                                        padding: "14px 16px",
                                    }}
                                >
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            flexShrink: 0,
                                            width: 18,
                                            height: 18,
                                            borderRadius: "50%",
                                            background: "var(--color-primary-muted)",
                                            color: "var(--color-primary)",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            marginTop: 1,
                                        }}
                                    >
                                        ✓
                                    </span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Roadmap — horizontal pills below */}
                    {visual.upcoming.length > 0 && (
                        <div className="v2-reveal">
                            <h3
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: "var(--color-text-heading)",
                                    margin: "0 0 20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        background: "transparent",
                                        border: "1.5px solid var(--color-primary)",
                                    }}
                                />
                                On the roadmap
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 11,
                                        fontWeight: 500,
                                        letterSpacing: ".06em",
                                        color: "var(--color-text-muted)",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {visual.upcoming.length} planned
                                </span>
                            </h3>

                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 10,
                                }}
                            >
                                {visual.upcoming.map((item) => (
                                    <li
                                        key={item}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 10,
                                            background: "#fff",
                                            border: "1px dashed var(--color-primary)",
                                            borderRadius: 999,
                                            padding: "9px 16px",
                                            fontFamily: "var(--font-body)",
                                            fontSize: 14,
                                            color: "var(--color-text-body)",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                flexShrink: 0,
                                                width: 5,
                                                height: 5,
                                                borderRadius: "50%",
                                                background: "var(--color-primary)",
                                            }}
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* ─── OTHER VISUALS ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">more in the toolkit</span>
                        <h2 className="services-section-title">
                            Other custom{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                visuals.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            {siblings.length} more visuals in the catalogue. All free to download.
                        </p>
                    </div>

                    <div className="services-grid services-grid-3">
                        {siblings.map((s) => (
                            <Link
                                key={s.slug}
                                href={`/cbt-custom-visuals/${s.slug}`}
                                className="services-tile"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div className="services-tile-head">
                                    <span className="services-tile-num">{s.num}</span>
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
                                    <h3 className="services-tile-title" style={{ fontSize: "1.2rem" }}>
                                        {s.name}
                                    </h3>
                                </div>
                                <p className="services-tile-desc">{s.pitch}</p>
                                <span
                                    style={{
                                        marginTop: "auto",
                                        fontFamily: "var(--font-body)",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: "var(--color-primary)",
                                    }}
                                >
                                    Learn more →
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="v2-reveal" style={{ marginTop: 40, textAlign: "center" }}>
                        <Link href="/cbt-custom-visuals" className="hero-btn-primary">
                            <span aria-hidden="true">←</span> Back to catalogue
                        </Link>
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
