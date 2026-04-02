"use client";

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

const defaultTestimonials: TestimonialItem[] = [
    {
        quote: "CBT helped us build a data infrastructure we should have had five years ago. Within three months, our ops team was making decisions from live dashboards rather than week-old spreadsheets.",
        author: "Sarah Okonkwo",
        role: "CTO",
        company: "NovaTech Solutions",
    },
    {
        quote: "The team made our AWS migration feel effortless. Complex architecture decisions were explained clearly, timelines were kept, and the end result exceeded what we thought was possible.",
        author: "Marcus Kwame",
        role: "Head of Engineering",
        company: "PulseHR",
    },
    {
        quote: "As a startup, we weren't sure where to start with AI. CBT helped us identify the right use cases, build quickly, and avoid the expensive mistakes we'd have made alone.",
        author: "Jamie Adeyemi",
        role: "CEO",
        company: "Rootly AI",
    }
];

export default function Testimonials({ testimonials = [] }: TestimonialsProps) {
    const list = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

    return (
        <section className="section-padding" style={{ background: "var(--color-white)" }} id="case-studies">
            <div className="v2-wrap">
                {/* Section header with border-bottom separator */}
                <div className="section-header-bar">
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
                    {list.map((t, i) => {
                        const isFeatured = i === 1;
                        return (
                            <div key={i} style={{
                                background: isFeatured ? "var(--color-text-heading)" : "var(--color-surface)",
                                border: isFeatured ? "none" : "1px solid var(--color-border)",
                                borderRadius: "16px",
                                padding: "36px",
                                position: "relative",
                                transition: "box-shadow 0.25s, transform 0.25s",
                                cursor: "default",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,153,77,0.09)";
                                e.currentTarget.style.transform = "translateY(-3px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "none";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                            >
                                {/* Quote mark */}
                                <div style={{
                                    fontSize: "48px",
                                    lineHeight: 1,
                                    fontFamily: "var(--font-heading)",
                                    color: "var(--color-primary)",
                                    opacity: isFeatured ? 1 : 0.25,
                                    position: "absolute",
                                    top: "24px",
                                    right: "28px",
                                }}>&ldquo;</div>

                                {/* Quote text */}
                                <p style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "1rem",
                                    lineHeight: 1.65,
                                    color: isFeatured ? "var(--color-white)" : "var(--color-text-body)",
                                    marginBottom: "28px",
                                    paddingRight: "var(--space-8)",
                                }}>
                                    {t.quote}
                                </p>

                                {/* Author */}
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <div style={{
                                        width: "38px",
                                        height: "38px",
                                        borderRadius: "50%",
                                        background: isFeatured ? "rgba(0,153,77,0.25)" : "var(--color-primary-muted)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        fontFamily: "var(--font-body)",
                                        color: "var(--color-primary)",
                                        flexShrink: 0,
                                        overflow: "hidden",
                                    }}>
                                        {t.avatar_url ? (
                                            <img src={t.avatar_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                                        ) : (
                                            t.author.split(' ').map(n => n[0]).join('')
                                        )}
                                    </div>
                                    <div>
                                        <div style={{
                                            fontFamily: "var(--font-body)",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: isFeatured ? "var(--color-white)" : "var(--color-text-heading)",
                                        }}>{t.author}</div>
                                        <div style={{
                                            fontFamily: "var(--font-body)",
                                            fontSize: "12px",
                                            color: isFeatured ? "rgba(255,255,255,0.4)" : "var(--color-text-muted)",
                                        }}>{t.role}, {t.company}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
