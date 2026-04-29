"use client";

import { Quote } from "lucide-react";

interface TestimonialItem {
    quote: string;
    author: string;
    company: string;
    role: string;
    avatar_url?: string;
}

interface TestimonialsProps {
    testimonials?: TestimonialItem[];
}

export default function Testimonials({ testimonials = [] }: TestimonialsProps) {
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    const list = testimonials;

    return (
        <section className="section-padding" style={{ background: "var(--color-white)" }}>
            <div className="v2-wrap">
                <div className="section-header-bar" style={{ borderBottom: "none", marginBottom: "46px", paddingBottom: "0" }}>
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
                        }}>Client stories</span>
                        <h2 style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                            fontWeight: 700,
                            color: "var(--color-text-heading)",
                            lineHeight: 1.2,
                            letterSpacing: "-0.02em",
                        }}>
                            Don&apos;t take our word for it
                        </h2>
                    </div>
                </div>

                <div className="testimonials-grid">
                    {list.map((t, i) => (
                        <div key={i} className="v2-card v2-card-static" style={{ display: "flex", flexDirection: "column" }}>
                            <Quote size={20} style={{ color: "var(--color-primary)", opacity: 0.2, marginBottom: "16px" }} />
                            <p style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "1rem",
                                lineHeight: 1.65,
                                color: "var(--color-text-body)",
                                marginBottom: "20px",
                            }}>
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
                                <div style={{
                                    width: "38px",
                                    height: "38px",
                                    borderRadius: "50%",
                                    background: "var(--color-primary-muted)",
                                    color: "var(--color-primary)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    fontSize: "11px",
                                    fontFamily: "var(--font-body)",
                                    flexShrink: 0,
                                    overflow: "hidden",
                                }}>
                                    {t.avatar_url ? (
                                        <img src={t.avatar_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                                    ) : (
                                        t.author[0]
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 1000, fontSize: "16px", color: "var(--color-text-heading)" }}>{t.author}</div>
                                    <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--color-text-muted)", textTransform: "uppercase" }}>{t.role}, {t.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
