"use client";
import { useScrollReveal } from "@/components/home/Hero";

const items = [
    {
        num: "01",
        title: "Partners, not vendors",
        desc: "We own the outcome alongside you. Shared risk, shared upside, senior team from scoping to handover — no hiding behind the statement of work when things get hard.",
    },
    {
        num: "02",
        title: "Direct, senior, every week",
        desc: "You speak with the people doing the work, not an account layer. Weekly senior contact means problems surface early, decisions happen fast, and nothing quietly drifts off course.",
    },
    {
        num: "03",
        title: "Our own people, trained to our standard",
        desc: "Every consultant joins through CGAP, our nine-month learning-and-grooming program. No contractors, no backfills, no agencies — the quality of the work is the quality of our people, and we control both.",
    },
];

export default function Differentiators() {
    useScrollReveal();

    return (
        <section
            style={{
                padding: "clamp(64px, 12vw, 120px) 32px",
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
                        A 100% client success rate — every engagement delivered, every client we've worked with would work with us again. Here's how we get there.
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
