import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();
    const { data } = await supabase
        .from("case_studies")
        .select("title, summary")
        .eq("slug", slug)
        .eq("published", true)
        .single();

    if (!data) {
        return { title: "Case Study | Convergent Business Technologies" };
    }
    return {
        title: `${data.title} | Case Study | Convergent Business Technologies`,
        description: data.summary || undefined,
    };
}

type CaseStudyFull = {
    title: string;
    slug: string;
    summary: string | null;
    content: string | null;
    tags: string[];
    service_area: string | null;
    created_at: string;
    clients: { name: string; industry: string | null } | null;
};

export default async function CaseStudyDetailPage({ params }: Props) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data } = await supabase
        .from("case_studies")
        .select(
            "title, slug, summary, content, tags, service_area, created_at, clients(name, industry)"
        )
        .eq("slug", slug)
        .eq("published", true)
        .single();

    const study = data as unknown as CaseStudyFull | null;

    if (!study) notFound();

    const related = await supabase
        .from("case_studies")
        .select("slug, title, summary, tags")
        .eq("published", true)
        .neq("slug", slug)
        .limit(3);

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
                        className="case-study-breadcrumb"
                        aria-label="Breadcrumb"
                    >
                        <Link href="/case-studies" className="case-study-breadcrumb-link">
                            ← Case studies
                        </Link>
                        {study.clients?.industry && (
                            <>
                                <span className="case-study-breadcrumb-sep">/</span>
                                <span className="case-study-breadcrumb-current">
                                    {study.clients.industry}
                                </span>
                            </>
                        )}
                    </nav>

                    {study.tags && study.tags.length > 0 && (
                        <div className="case-study-tag-row">
                            {study.tags.map((t) => (
                                <span key={t} className="case-study-tag">
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1
                        className="v2-h1"
                        style={{
                            fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                            maxWidth: 920,
                            marginBottom: 20,
                        }}
                    >
                        {study.title}
                    </h1>

                    {study.summary && (
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 19,
                                fontWeight: 350,
                                color: "#4B5563",
                                lineHeight: 1.7,
                                maxWidth: 720,
                            }}
                        >
                            {study.summary}
                        </p>
                    )}

                    <div className="case-study-meta">
                        {study.clients?.name && (
                            <div className="case-study-meta-item">
                                <span className="case-study-meta-label">Client</span>
                                <span className="case-study-meta-value">{study.clients.name}</span>
                            </div>
                        )}
                        {study.clients?.industry && (
                            <div className="case-study-meta-item">
                                <span className="case-study-meta-label">Industry</span>
                                <span className="case-study-meta-value">
                                    {study.clients.industry}
                                </span>
                            </div>
                        )}
                        {study.service_area && (
                            <div className="case-study-meta-item">
                                <span className="case-study-meta-label">Service</span>
                                <span className="case-study-meta-value">{study.service_area}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── BODY ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="case-study-body v2-reveal">
                        {study.content ? (
                            <div className="case-study-prose">
                                {study.content.split(/\n{2,}/).map((block, i) => (
                                    <p key={i}>{block.trim()}</p>
                                ))}
                            </div>
                        ) : (
                            <div className="case-study-prose">
                                <p>
                                    Full case content is coming soon. In the meantime, the
                                    summary above captures the outcome; reach out for a deeper
                                    walkthrough.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="case-study-side v2-reveal">
                        <div className="case-study-side-card">
                            <span className="services-section-tag" style={{ marginBottom: 12 }}>
                                Want this for your team?
                            </span>
                            <h3
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "1.4rem",
                                    fontWeight: 700,
                                    color: "var(--color-text-heading)",
                                    lineHeight: 1.3,
                                    marginBottom: 10,
                                }}
                            >
                                Same outcome, your
                                <em style={{ color: "var(--color-primary)" }}> data.</em>
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 14.5,
                                    color: "var(--color-text-body)",
                                    lineHeight: 1.7,
                                    marginBottom: 16,
                                }}
                            >
                                Thirty minutes with a senior consultant. We&rsquo;ll pressure-test whether the approach that worked here maps to your problem.
                            </p>
                            <Link
                                href="/contact?intent=discovery"
                                className="hero-btn-primary"
                                style={{ fontSize: 13 }}
                            >
                                Book a Discovery Call <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── RELATED ─── */}
            {related.data && related.data.length > 0 && (
                <section className="services-section">
                    <div className="v2-wrap">
                        <div className="services-section-head v2-reveal">
                            <span className="services-section-tag">more outcomes</span>
                            <h2 className="services-section-title">
                                Keep{" "}
                                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                    reading.
                                </em>
                            </h2>
                        </div>

                        <div className="case-study-grid">
                            {(related.data as any[]).map((r) => (
                                <Link
                                    key={r.slug}
                                    href={`/case-studies/${r.slug}`}
                                    className="case-study-card"
                                >
                                    <h3 className="case-study-card-title">{r.title}</h3>
                                    {r.summary && (
                                        <p className="case-study-card-summary">{r.summary}</p>
                                    )}
                                    <div className="case-study-card-foot">
                                        <div className="case-study-card-tags">
                                            {r.tags?.slice(0, 3).map((t: string) => (
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
            )}

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
                            Thirty minutes with a senior consultant. No pitch deck.
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
