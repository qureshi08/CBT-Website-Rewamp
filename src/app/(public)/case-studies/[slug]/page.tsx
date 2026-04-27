import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import ClientReveal from "@/components/shared/ClientReveal";
import { createClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ slug: string }> };

type SecondaryMetric = { value: string; label: string };

type CaseStudyView = {
    slug: string;
    title: string;
    summary: string | null;

    client_descriptor: string | null;
    industry_slug: string | null;
    industry_label: string | null;
    service_area: string | null;
    timeline: string | null;

    challenge: string | null;
    approach: string | null;
    impact: string | null;
    deliverables: string[] | null;

    outcome_value: string | null;
    outcome_label: string | null;
    secondary_metrics: SecondaryMetric[] | null;

    stack: string[] | null;
    tags: string[] | null;

    featured_image_url: string | null;
    architecture_diagram_url: string | null;
    architecture_caption: string | null;

    quote_text: string | null;
    quote_author: string | null;
    quote_role: string | null;
};

// De-dupe loadStudy across generateMetadata + default export within a single request.
const loadStudy = cache(
    async (
        slug: string,
    ): Promise<{ study: CaseStudyView | null; related: CaseStudyView[] }> => {
        const supabase = await createClient();

        const [{ data: studyRow }, { data: industriesRows }, { data: allStudies }] =
            await Promise.all([
                supabase
                    .from("case_studies")
                    .select("*")
                    .eq("slug", slug)
                    .eq("published", true)
                    .maybeSingle(),
                supabase.from("industries").select("slug, label"),
                supabase
                    .from("case_studies")
                    .select(
                        "slug, title, summary, outcome_value, outcome_label, tags, industry_slug, display_order",
                    )
                    .eq("published", true)
                    .order("display_order", { ascending: true }),
            ]);

        if (!studyRow) return { study: null, related: [] };

        const industryLabel = new Map<string, string>(
            ((industriesRows as any[]) || []).map((i) => [i.slug, i.label]),
        );

        const toView = (row: any): CaseStudyView => ({
            slug: row.slug,
            title: row.title,
            summary: row.summary ?? null,

            client_descriptor: row.client_descriptor ?? null,
            industry_slug: row.industry_slug ?? null,
            industry_label: row.industry_slug
                ? industryLabel.get(row.industry_slug) ?? null
                : null,
            service_area: row.service_area ?? null,
            timeline: row.timeline ?? null,

            challenge: row.challenge ?? null,
            approach: row.approach ?? null,
            impact: row.impact ?? null,
            deliverables:
                Array.isArray(row.deliverables) && row.deliverables.length
                    ? row.deliverables
                    : null,

            outcome_value: row.outcome_value ?? null,
            outcome_label: row.outcome_label ?? null,
            secondary_metrics:
                Array.isArray(row.secondary_metrics) && row.secondary_metrics.length
                    ? (row.secondary_metrics as SecondaryMetric[])
                    : null,

            stack: Array.isArray(row.stack) && row.stack.length ? row.stack : null,
            tags: Array.isArray(row.tags) && row.tags.length ? row.tags : null,

            featured_image_url: row.featured_image_url ?? null,
            architecture_diagram_url: row.architecture_diagram_url ?? null,
            architecture_caption: row.architecture_caption ?? null,

            quote_text: row.quote_text ?? null,
            quote_author: row.quote_author ?? null,
            quote_role: row.quote_role ?? null,
        });

        const study = toView(studyRow);
        const related = ((allStudies as any[]) || [])
            .filter((r) => r.slug !== slug)
            .slice(0, 3)
            .map(toView);

        return { study, related };
    },
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { study } = await loadStudy(slug);
    if (!study) return { title: "Case Study | Convergent Business Technologies" };
    return {
        title: `${study.title} | Case Study | Convergent Business Technologies`,
        description: study.summary || undefined,
    };
}

function paragraphs(text: string) {
    return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
}

export default async function CaseStudyDetailPage({ params }: Props) {
    const { slug } = await params;
    const { study, related } = await loadStudy(slug);
    if (!study) notFound();

    const hasAside = !!(study.outcome_value || study.featured_image_url);
    const hasMeta = !!(
        study.client_descriptor ||
        study.industry_label ||
        study.service_area ||
        study.timeline
    );

    const hasArchitecture = !!study.architecture_diagram_url;

    // Chapter numbers — render only those sections that exist, numbered in order.
    const chapters: { key: string; show: boolean }[] = [
        { key: "challenge", show: !!study.challenge },
        { key: "approach", show: !!study.approach },
        { key: "architecture", show: hasArchitecture },
        {
            key: "deliverables",
            show: !!(study.deliverables && study.deliverables.length > 0),
        },
        {
            key: "impact",
            show: !!(
                study.impact ||
                (study.secondary_metrics && study.secondary_metrics.length > 0)
            ),
        },
    ];
    const visibleChapters = chapters.filter((c) => c.show);
    const chapterNumber = (key: string) => {
        const idx = visibleChapters.findIndex((c) => c.key === key);
        return idx === -1 ? "" : String(idx + 1).padStart(2, "0");
    };
    // Alternate section backgrounds: first visible chapter = alt, then white, then alt …
    // Keeps grey/white rhythm intact regardless of which sections the admin fills.
    const isAltChapter = (key: string) => {
        const idx = visibleChapters.findIndex((c) => c.key === key);
        return idx !== -1 && idx % 2 === 0;
    };
    const altClass = (key: string) => (isAltChapter(key) ? " cs-section-alt" : "");

    return (
        <main>
            <ClientReveal />

            {/* ─── HERO ─── */}
            <section className="cs-detail-hero">
                <div className="v2-wrap">
                    <div
                        className={
                            "cs-hero-grid " + (hasAside ? "cs-hero-grid-split" : "")
                        }
                    >
                        <div className="cs-hero-body">
                            <Link href="/case-studies" className="cs-hero-eyebrow">
                                Case study · {study.industry_label}
                            </Link>

                            <h1 className="cs-hero-title">{study.title}</h1>

                            {study.summary && (
                                <p className="cs-hero-summary">{study.summary}</p>
                            )}

                            {/* Mobile-only: outcome card slides above the meta row */}
                            {study.outcome_value && (
                                <div className="cs-outcome-card cs-outcome-inline">
                                    <span className="cs-outcome-tag">The outcome</span>
                                    <div className="cs-outcome-value">
                                        {study.outcome_value}
                                    </div>
                                    {study.outcome_label && (
                                        <div className="cs-outcome-label">
                                            {study.outcome_label}
                                        </div>
                                    )}
                                </div>
                            )}

                            {hasMeta && (
                                <div className="cs-hero-brief">
                                    <span className="cs-hero-brief-title">
                                        The brief
                                    </span>
                                    <dl className="cs-hero-brief-list">
                                        {study.client_descriptor && (
                                            <div className="cs-hero-brief-row">
                                                <dt>Client</dt>
                                                <dd>{study.client_descriptor}</dd>
                                            </div>
                                        )}
                                        {study.industry_label && (
                                            <div className="cs-hero-brief-row">
                                                <dt>Industry</dt>
                                                <dd>{study.industry_label}</dd>
                                            </div>
                                        )}
                                        {study.service_area && (
                                            <div className="cs-hero-brief-row">
                                                <dt>Service</dt>
                                                <dd>{study.service_area}</dd>
                                            </div>
                                        )}
                                        {study.timeline && (
                                            <div className="cs-hero-brief-row">
                                                <dt>Engagement</dt>
                                                <dd>{study.timeline}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            )}
                        </div>

                        {hasAside && (
                            <aside
                                className="cs-hero-aside"
                                data-media={study.featured_image_url ? "true" : "false"}
                            >
                                {study.outcome_value && (
                                    <div className="cs-outcome-card cs-outcome-card-desktop">
                                        <span className="cs-outcome-tag">
                                            The outcome
                                        </span>
                                        <div className="cs-outcome-value">
                                            {study.outcome_value}
                                        </div>
                                        {study.outcome_label && (
                                            <div className="cs-outcome-label">
                                                {study.outcome_label}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {study.featured_image_url && (
                                    <div className="cs-hero-media">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={study.featured_image_url}
                                            alt={study.title}
                                        />
                                    </div>
                                )}
                            </aside>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── CHALLENGE ─── */}
            {study.challenge && (
                <section className={"cs-section" + altClass("challenge")}>
                    <div className="v2-wrap">
                        <div className="cs-section-head v2-reveal">
                            <div className="cs-section-number" aria-hidden>
                                {chapterNumber("challenge")}
                            </div>
                            <div className="cs-section-head-text">
                                <span className="cs-section-tag">the challenge</span>
                                <h2 className="cs-section-title">
                                    What wasn&rsquo;t{" "}
                                    <em
                                        style={{
                                            fontStyle: "italic",
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        working.
                                    </em>
                                </h2>
                            </div>
                        </div>
                        <div className="cs-section-body cs-prose v2-reveal">
                            {paragraphs(study.challenge).map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── APPROACH ─── */}
            {study.approach && (
                <section className={"cs-section" + altClass("approach")}>
                    <div className="v2-wrap">
                        <div className="cs-section-head v2-reveal">
                            <div className="cs-section-number" aria-hidden>
                                {chapterNumber("approach")}
                            </div>
                            <div className="cs-section-head-text">
                                <span className="cs-section-tag">the approach</span>
                                <h2 className="cs-section-title">
                                    How we{" "}
                                    <em
                                        style={{
                                            fontStyle: "italic",
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        shipped it.
                                    </em>
                                </h2>
                            </div>
                        </div>
                        <div className="cs-section-body cs-prose v2-reveal">
                            {paragraphs(study.approach).map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── ARCHITECTURE ─── */}
            {hasArchitecture && (
                <section className={"cs-section" + altClass("architecture")}>
                    <div className="v2-wrap">
                        <div className="cs-section-head v2-reveal">
                            <div className="cs-section-number" aria-hidden>
                                {chapterNumber("architecture")}
                            </div>
                            <div className="cs-section-head-text">
                                <span className="cs-section-tag">the architecture</span>
                                <h2 className="cs-section-title">
                                    How the pieces{" "}
                                    <em
                                        style={{
                                            fontStyle: "italic",
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        fit together.
                                    </em>
                                </h2>
                            </div>
                        </div>

                        <div className="cs-arch v2-reveal">
                            <div className="cs-arch-image">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={study.architecture_diagram_url!}
                                    alt={
                                        study.architecture_caption ||
                                        "Architecture diagram"
                                    }
                                />
                            </div>

                            {study.architecture_caption && (
                                <p className="cs-arch-caption">
                                    {study.architecture_caption}
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── DELIVERABLES ─── */}
            {study.deliverables && study.deliverables.length > 0 && (
                <section className={"cs-section" + altClass("deliverables")}>
                    <div className="v2-wrap">
                        <div className="cs-section-head v2-reveal">
                            <div className="cs-section-number" aria-hidden>
                                {chapterNumber("deliverables")}
                            </div>
                            <div className="cs-section-head-text">
                                <span className="cs-section-tag">what we shipped</span>
                                <h2 className="cs-section-title">
                                    In the box at{" "}
                                    <em
                                        style={{
                                            fontStyle: "italic",
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        go-live.
                                    </em>
                                </h2>
                            </div>
                        </div>
                        <ul className="cs-deliverables v2-reveal">
                            {study.deliverables.map((d, i) => (
                                <li key={i} className="cs-deliverables-item">
                                    <span className="cs-deliverables-bullet" aria-hidden>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="cs-deliverables-text">{d}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* ─── IMPACT ─── */}
            {(study.impact ||
                (study.secondary_metrics && study.secondary_metrics.length > 0)) && (
                <section className={"cs-section" + altClass("impact")}>
                    <div className="v2-wrap">
                        <div className="cs-section-head v2-reveal">
                            <div className="cs-section-number" aria-hidden>
                                {chapterNumber("impact")}
                            </div>
                            <div className="cs-section-head-text">
                                <span className="cs-section-tag">what it moved</span>
                                <h2 className="cs-section-title">
                                    The{" "}
                                    <em
                                        style={{
                                            fontStyle: "italic",
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        number.
                                    </em>
                                </h2>
                            </div>
                        </div>

                        {study.secondary_metrics &&
                            study.secondary_metrics.length > 0 && (
                                <div className="cs-stat-row v2-reveal">
                                    {study.secondary_metrics.slice(0, 3).map((m, i) => (
                                        <div className="cs-stat" key={i}>
                                            <div className="cs-stat-value">{m.value}</div>
                                            <div className="cs-stat-label">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        {study.impact && (
                            <div className="cs-section-body cs-prose v2-reveal">
                                {paragraphs(study.impact).map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ─── QUOTE ─── */}
            {study.quote_text && (
                <section className="cs-quote-band">
                    <div className="v2-wrap">
                        <blockquote className="cs-quote v2-reveal">
                            <span className="cs-quote-mark" aria-hidden>
                                “
                            </span>
                            <p className="cs-quote-text">{study.quote_text}</p>
                            {(study.quote_author || study.quote_role) && (
                                <footer className="cs-quote-attr">
                                    {study.quote_author && (
                                        <span className="cs-quote-author">
                                            {study.quote_author}
                                        </span>
                                    )}
                                    {study.quote_role && (
                                        <span className="cs-quote-role">
                                            {study.quote_role}
                                        </span>
                                    )}
                                </footer>
                            )}
                        </blockquote>
                    </div>
                </section>
            )}

            {/* ─── STACK ─── */}
            {study.stack && study.stack.length > 0 && (
                <section className="cs-stack-strip">
                    <div className="v2-wrap">
                        <span className="cs-stack-label">Technology stack</span>
                        <div className="cs-stack-chips">
                            {study.stack.map((s) => (
                                <span key={s} className="cs-stack-chip">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── RELATED ─── */}
            {related.length > 0 && (
                <section className="cs-section cs-section-alt">
                    <div className="v2-wrap">
                        <div className="cs-section-head v2-reveal">
                            <div className="cs-section-head-text">
                                <span className="cs-section-tag">more outcomes</span>
                                <h2 className="cs-section-title">
                                    Keep{" "}
                                    <em
                                        style={{
                                            fontStyle: "italic",
                                            color: "var(--color-primary)",
                                        }}
                                    >
                                        reading.
                                    </em>
                                </h2>
                            </div>
                        </div>

                        <div className="case-study-grid">
                            {related.map((r) => (
                                <CaseStudyCard key={r.slug} study={r} />
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
                        <p
                            className="cta-sub"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Thirty minutes with a senior consultant. No pitch deck.
                        </p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                            alignItems: "center",
                        }}
                    >
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

function CaseStudyCard({ study }: { study: CaseStudyView }) {
    const hasMetric = !!(study.outcome_value && study.outcome_label);
    return (
        <Link href={`/case-studies/${study.slug}`} className="cs-card">
            <div className="cs-card-inner">
                {study.industry_label && (
                    <span className="cs-card-industry">
                        <span className="cs-card-industry-dot" aria-hidden />
                        {study.industry_label}
                    </span>
                )}

                <h3 className="cs-card-title">{study.title}</h3>

                {study.summary && (
                    <p className="cs-card-summary">{study.summary}</p>
                )}

                {hasMetric && (
                    <div className="cs-card-metric">
                        <span className="cs-card-metric-value">
                            {study.outcome_value}
                        </span>
                        <span className="cs-card-metric-label">
                            {study.outcome_label}
                        </span>
                    </div>
                )}

                <div className="cs-card-foot">
                    {study.tags && study.tags.length > 0 && (
                        <div className="cs-card-tags">
                            {study.tags.slice(0, 3).map((t) => (
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
}
