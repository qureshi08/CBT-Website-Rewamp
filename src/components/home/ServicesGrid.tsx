"use client";
import { useScrollReveal } from "@/components/home/Hero";
import Ic from "@/components/shared/Icons";
import Link from "next/link";

const services = [
    {
        num: "01",
        icon: "search" as const,
        title: "Data Strategy & Engineering",
        desc: "From raw data to reliable insight. We design, build and govern data infrastructure that scales with your organisation — pipelines, warehouses, and governance frameworks included.",
    },
    {
        num: "02",
        icon: "database" as const,
        title: "Cloud Migration & Architecture",
        desc: "We plan and execute cloud migrations that minimise disruption and maximise performance — whether you're moving to AWS, Azure, or GCP, or optimising what's already there.",
    },
    {
        num: "03",
        icon: "brain" as const,
        title: "AI Adoption & Integration",
        desc: "Practical AI — not hype. We help businesses identify where AI creates real value, then build and integrate the solutions that deliver it, from LLM tooling to predictive analytics.",
    },
];

export default function ServicesGrid() {
    useScrollReveal();
    return (
        <section style={{ padding: "100px 32px", background: "var(--color-white)" }}>
            <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
                {/* Section header with border-bottom separator */}
                <div className="section-header-bar v2-reveal" style={{ borderBottom: "none", paddingBottom: 0 }}>
                    <div>
                        <span style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--color-primary)",
                            marginBottom: "14px",
                            display: "block",
                        }}>What we do</span>
                        <h2 style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                            fontWeight: 700,
                            color: "var(--color-text-heading)",
                            lineHeight: 1.2,
                            letterSpacing: "-0.02em",
                            marginBottom: "16px",
                        }}>End-to-end expertise,<br />from pipeline to product</h2>
                        <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "16px",
                            fontWeight: 300,
                            lineHeight: 1.7,
                            color: "var(--color-text-body)",
                            maxWidth: "520px",
                        }}>Three core practice areas — each one designed to move your business forward with clarity and confidence.</p>
                    </div>
                    <Link href="/contact" style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--color-text-body)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "13px 4px",
                        borderBottom: "1px solid var(--color-border)",
                        transition: "color 0.2s, border-color 0.2s",
                        textDecoration: "none",
                        flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-primary)";
                        e.currentTarget.style.borderColor = "var(--color-primary)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-text-body)";
                        e.currentTarget.style.borderColor = "var(--color-border)";
                    }}
                    >All services <span style={{ fontSize: "16px", transition: "transform 0.2s" }}>→</span></Link>
                </div>

                {/* Bordered grid */}
                <div className="services-grid-bordered v2-reveal">
                    {services.map((s) => (
                        <div key={s.title} className="service-card">
                            <span className="service-num">{s.num}</span>
                            <div className="service-icon-wrap">
                                <Ic name={s.icon} size={20} stroke="var(--color-primary)" />
                            </div>
                            <div className="service-title">{s.title}</div>
                            <p className="service-desc">{s.desc}</p>
                            <span className="service-link">Learn more <span>→</span></span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
