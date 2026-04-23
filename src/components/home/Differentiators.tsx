"use client";
import { useScrollReveal } from "@/components/home/Hero";

const items = [
    {
        num: "01",
        title: "Partners in your success",
        desc: "Not body shopping. We own the outcome — shared risk, shared upside, senior team end to end.",
    },
    {
        num: "02",
        title: "Direct communication",
        desc: "Weekly senior contact. No account-management layer, no silent weeks. You always know where the engagement stands.",
    },
    {
        num: "03",
        title: "A talent model that compounds",
        desc: "The CGAP pipeline — Georgia Tech sponsored, nine-month programme. We don't backfill with contractors.",
    },
];

export default function Differentiators() {
    useScrollReveal();

    return (
        <section
            style={{
                padding: "120px 32px",
                background: "var(--color-dark)",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* subtle green top accent */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                        "linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)",
                    opacity: 0.5,
                }}
            />

            <div style={{ maxWidth: "1160px", margin: "0 auto" }} className="diff-grid-asym">
                {/* LEFT — heading + subheading, vertically centered */}
                <div className="v2-reveal" style={{ alignSelf: "center" }}>
                    <span
                        className="section-tag"
                        style={{ color: "var(--color-primary-light)" }}
                    >
                        How we work
                    </span>
                    <h2
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                            fontWeight: 700,
                            color: "#fff",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            marginBottom: "24px",
                        }}
                    >
                        What makes CBT{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary-light)" }}>
                            different.
                        </em>
                    </h2>
                    <p
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "17.5px",
                            fontWeight: 300,
                            lineHeight: 1.7,
                            color: "rgba(255,255,255,0.7)",
                            maxWidth: "440px",
                        }}
                    >
                        Three principles that shape every engagement, from first call to final handover.
                    </p>
                </div>

                {/* RIGHT — all three principles stacked */}
                <div className="v2-reveal" style={{ display: "flex", flexDirection: "column" }}>
                    {items.map((it, i) => (
                        <div
                            key={it.num}
                            style={{
                                padding: i === 0 ? "0 0 40px 0" : "40px 0",
                                borderTop:
                                    i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "clamp(2.25rem, 3.4vw, 2.9rem)",
                                    fontWeight: 300,
                                    color: "var(--color-primary-light)",
                                    lineHeight: 1,
                                    letterSpacing: "0.05em",
                                    marginBottom: "16px",
                                }}
                            >
                                {it.num}
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "clamp(1.25rem, 1.7vw, 1.5rem)",
                                    fontWeight: 700,
                                    color: "#fff",
                                    lineHeight: 1.25,
                                    letterSpacing: "-0.01em",
                                    marginBottom: "10px",
                                }}
                            >
                                {it.title}
                            </div>
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "15px",
                                    lineHeight: 1.65,
                                    color: "rgba(255,255,255,0.7)",
                                    maxWidth: "460px",
                                }}
                            >
                                {it.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
