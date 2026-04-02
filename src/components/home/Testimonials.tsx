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
        quote: "CBT helped us build a data infrastructure we should have had five years ago. Within three months, our ops team was making decisions from live dashboards.",
        author: "Sarah Okonkwo",
        role: "CTO",
        company: "NovaTech Solutions",
    },
    {
        quote: "The team made our AWS migration feel effortless. Complex architecture decisions were explained clearly, and the result exceeded what we thought was possible.",
        author: "Marcus Kwame",
        role: "Head of Engineering",
        company: "PulseHR",
    },
    {
        quote: "As a startup, we weren't sure where to start with AI. CBT helped us identify the right use cases, build quickly, and avoid the expensive mistakes.",
        author: "Jamie Adeyemi",
        role: "CEO",
        company: "Rootly AI",
    }
];

export default function Testimonials({ testimonials = [] }: TestimonialsProps) {
    const list = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

    return (
        <section className="bg-white section-padding" id="case-studies">
            <div className="container-main">
                <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", marginBottom: "var(--space-12)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-2)" }}>
                        <div style={{ width: "4px", height: "28px", background: "var(--color-primary)", borderRadius: "2px" }} />
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--color-text-heading)" }}>
                            Don't take our word for it
                        </h2>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
                    {list.map((t, i) => (
                        <div key={i} className={`card reveal reveal-delay-${(i % 3) + 1}`} style={{
                            display: "flex",
                            flexDirection: "column",
                            background: i === 1 ? "var(--color-primary)" : "var(--color-surface)",
                            border: "none",
                            color: i === 1 ? "white" : "inherit",
                            boxShadow: i === 1 ? "0 12px 40px rgba(0,153,77,0.15)" : "none"
                        }}>
                            <div style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "40px",
                                color: i === 1 ? "rgba(255,255,255,0.5)" : "var(--color-primary)",
                                lineHeight: 0.5,
                                marginBottom: "var(--space-4)"
                            }}>"</div>
                            <p style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "var(--text-sm)",
                                lineHeight: 1.65,
                                flexGrow: 1,
                                marginBottom: "var(--space-6)",
                                color: i === 1 ? "white" : "var(--color-text-body)"
                            }}>
                                {t.quote}
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                                <div style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: i === 1 ? "rgba(255,255,255,0.1)" : "var(--color-white)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    border: i === 1 ? "1px solid rgba(255,255,255,0.2)" : "1px solid var(--color-border)",
                                    overflow: "hidden"
                                }}>
                                    {t.avatar_url ? (
                                        <img src={t.avatar_url} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        t.author.split(' ').map(n => n[0]).join('')
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "var(--text-sm)", color: i === 1 ? "white" : "var(--color-text-heading)" }}>{t.author}</div>
                                    <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: i === 1 ? "rgba(255,255,255,0.7)" : "var(--color-text-muted)" }}>{t.role}, {t.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
