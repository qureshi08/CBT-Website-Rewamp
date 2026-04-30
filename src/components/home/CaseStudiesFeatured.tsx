"use client";
import Link from "next/link";
import { useScrollReveal } from "@/components/home/Hero";

export type FeaturedCaseStudy = {
    slug: string;
    title: string;
    summary: string | null;
    outcome_value: string | null;
    outcome_label: string | null;
    client_descriptor: string | null;
    industry_label: string | null;
};

export default function CaseStudiesFeatured({ cases }: { cases: FeaturedCaseStudy[] }) {
    useScrollReveal();

    return (
        <section style={{ padding: "100px 32px", background: "var(--color-white)" }}>
            <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
                <div className="section-header-bar v2-reveal" style={{ borderBottom: "none", paddingBottom: 0 }}>
                    <div>
                        <span className="section-tag">Outcomes, not activity</span>
                        <h2 style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                            fontWeight: 700,
                            color: "var(--color-text-heading)",
                            lineHeight: 1.2,
                            letterSpacing: "-0.02em",
                            marginBottom: "16px",
                        }}>
                            Case studies that<br />
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>moved the number.</em>
                        </h2>
                        <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "16px",
                            fontWeight: 300,
                            lineHeight: 1.7,
                            color: "var(--color-text-body)",
                            maxWidth: "520px",
                        }}>Every engagement ships with a measurable outcome. Here are three.</p>
                    </div>
                    <Link
                        href="/case-studies"
                        className="hero-btn-secondary"
                        style={{ flexShrink: 0, whiteSpace: "nowrap" }}
                    >
                        All case studies <span className="hero-btn-arrow">→</span>
                    </Link>
                </div>

                <div className="services-grid-bordered v2-reveal">
                    {cases.map((c) => {
                        const hasMetric = !!(c.outcome_value && c.outcome_label);
                        const headline = hasMetric
                            ? `${c.outcome_value} ${c.outcome_label}`
                            : c.outcome_value || c.outcome_label || c.title;
                        return (
                            <Link
                                key={c.slug}
                                href={`/case-studies/${c.slug}`}
                                className="service-card"
                                style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
                            >
                                {c.industry_label && (
                                    <span className="service-num">{c.industry_label}</span>
                                )}
                                <div style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "1.75rem",
                                    fontWeight: 700,
                                    color: "var(--color-primary)",
                                    letterSpacing: "-0.02em",
                                    marginBottom: "6px",
                                    marginTop: "4px",
                                }}>{headline}</div>
                                {c.client_descriptor && (
                                    <div style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                        color: "var(--color-text-muted)",
                                        marginBottom: "14px",
                                    }}>{c.client_descriptor}</div>
                                )}
                                {c.summary && (
                                    <p className="service-desc">{c.summary}</p>
                                )}
                                <span className="service-link">Read more <span>→</span></span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
