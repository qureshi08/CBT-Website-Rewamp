"use client";
import Link from "next/link";
import { useScrollReveal } from "@/components/home/Hero";

const cases = [
    {
        slug: "loyalty-margin-uplift",
        industry: "Retail",
        outcome: "+32% margin",
        client: "Loyalty model, P&G",
        desc: "Rebuilt the loyalty decisioning stack on Fabric — redemption uplift drove a 32% margin improvement in the pilot category.",
    },
    {
        slug: "ecl-48-hours",
        industry: "Banking",
        outcome: "ECL in 48h",
        client: "KPMG collaboration",
        desc: "IFRS 9 expected credit loss modelling, bank-ready and audit-traceable. From raw data to regulator-shaped output in 48 hours.",
    },
    {
        slug: "realtime-bi-40x",
        industry: "Telecom",
        outcome: "40× faster",
        client: "Real-time BI",
        desc: "Replaced a batch reporting estate with a Snowflake + Power BI architecture. Time-to-insight dropped from six hours to nine minutes.",
    },
];

export default function CaseStudiesFeatured() {
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
                        href="/customers"
                        className="hero-btn-secondary"
                        style={{ flexShrink: 0, whiteSpace: "nowrap" }}
                    >
                        All case studies <span className="hero-btn-arrow">→</span>
                    </Link>
                </div>

                <div className="services-grid-bordered v2-reveal">
                    {cases.map((c) => (
                        <Link
                            key={c.slug}
                            href={`/case-studies/${c.slug}`}
                            className="service-card"
                            style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
                        >
                            <span className="service-num">{c.industry}</span>
                            <div style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "1.75rem",
                                fontWeight: 700,
                                color: "var(--color-primary)",
                                letterSpacing: "-0.02em",
                                marginBottom: "6px",
                                marginTop: "4px",
                            }}>{c.outcome}</div>
                            <div style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "12px",
                                fontWeight: 600,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                color: "var(--color-text-muted)",
                                marginBottom: "14px",
                            }}>{c.client}</div>
                            <p className="service-desc">{c.desc}</p>
                            <span className="service-link">Read more <span>→</span></span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
