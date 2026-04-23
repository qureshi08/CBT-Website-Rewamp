"use client";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/components/home/Hero";

const items = [
    {
        num: "01",
        problem: "You need a plan you can actually ship.",
        response:
            "Most data strategies sit on a slide. Ours tie to P&L outcomes, sequence the moves, and survive first contact with delivery.",
    },
    {
        num: "02",
        problem: "Your data foundation doesn't hold up.",
        response:
            "Dashboards disagree, pipelines break, lineage is a mystery. We rebuild the plumbing — warehousing, governance, quality — so what comes out is trustworthy.",
    },
    {
        num: "03",
        problem: "You can't get a straight answer out of your data.",
        response:
            "Slow reporting, self-serve that isn't, week-old spreadsheets. We ship the dashboards, visuals and workflows that make the answer obvious.",
    },
    {
        num: "04",
        problem: "You're trying to make AI real.",
        response:
            "Beyond demos. Predictive models, copilots trained on your data, early agentic prototypes — safe by design, grounded in what your business already knows.",
    },
];

export default function ServicesGrid() {
    useScrollReveal();

    const [active, setActive] = useState<string>(items[0].num);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const num = entry.target.getAttribute("data-num");
                        if (num) setActive(num);
                    }
                });
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        );
        itemRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section style={{ padding: "120px 32px", background: "var(--color-white)" }}>
            <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
                <div className="wehelp-grid">
                    {/* LEFT — sticky heading + progress */}
                    <aside className="wehelp-sticky v2-reveal">
                        <span className="section-tag">Problems we solve</span>
                        <h2
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                                fontWeight: 700,
                                color: "var(--color-text-heading)",
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                                marginBottom: "20px",
                            }}
                        >
                            Where we{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>help.</em>
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "17.5px",
                                fontWeight: 300,
                                lineHeight: 1.7,
                                color: "var(--color-text-body)",
                                maxWidth: "440px",
                                marginBottom: "44px",
                            }}
                        >
                            Four things clients bring us. The work underneath is the same delivery team, end to end.
                        </p>

                        <div
                            className="wehelp-progress"
                            style={{ maxWidth: "380px", borderTop: "1px solid var(--color-border)", paddingTop: "8px" }}
                        >
                            {items.map((it) => {
                                const isActive = active === it.num;
                                return (
                                    <div
                                        key={it.num}
                                        className={`wehelp-progress-row${isActive ? " active" : ""}`}
                                    >
                                        <span
                                            style={{
                                                fontFamily: "var(--font-body)",
                                                fontSize: "13px",
                                                fontWeight: 600,
                                                letterSpacing: "0.12em",
                                                color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
                                                transition: "color 0.35s ease",
                                            }}
                                        >
                                            {it.num}
                                        </span>
                                        <span
                                            style={{
                                                fontFamily: "var(--font-body)",
                                                fontSize: "15px",
                                                fontWeight: isActive ? 500 : 400,
                                                color: isActive ? "var(--color-text-heading)" : "var(--color-text-muted)",
                                                transition: "color 0.35s ease, font-weight 0.35s ease",
                                                lineHeight: 1.45,
                                            }}
                                        >
                                            {it.problem.replace(/\.$/, "")}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    {/* RIGHT — scrolling scenes */}
                    <div>
                        {items.map((it, i) => (
                            <article
                                key={it.num}
                                ref={(el) => {
                                    itemRefs.current[i] = el;
                                }}
                                data-num={it.num}
                                className="wehelp-item v2-reveal"
                            >
                                <div
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        letterSpacing: "0.14em",
                                        color: "var(--color-primary)",
                                        marginBottom: "20px",
                                    }}
                                >
                                    {it.num}
                                </div>
                                <h3
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                        fontSize: "clamp(1.35rem, 2vw, 1.75rem)",
                                        fontWeight: 700,
                                        color: "var(--color-text-heading)",
                                        lineHeight: 1.25,
                                        letterSpacing: "-0.015em",
                                        marginBottom: "18px",
                                        maxWidth: "500px",
                                    }}
                                >
                                    {it.problem}
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "16.5px",
                                        fontWeight: 300,
                                        lineHeight: 1.7,
                                        color: "var(--color-text-body)",
                                        maxWidth: "500px",
                                    }}
                                >
                                    {it.response}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
