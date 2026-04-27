"use client";
import { useScrollReveal } from "@/components/home/Hero";

type WhyItem = { head: string; body: string };

const WHY_ITEMS: WhyItem[] = [
    {
        head: "Seven years, founder-led",
        body: "Same leadership since 2018. The people who started it are still on the delivery floor, shaping every engagement.",
    },
    {
        head: "Our own people, trained in-house",
        body: "Every consultant comes through CGAP — our nine-month paid training program. No contractors, no backfills, no agencies in the middle.",
    },
    {
        head: "Trained on real client work",
        body: "From month two, CGAP cohorts work on live engagements under senior leads. You don't get juniors practising on your project — you get consultants who've already shipped.",
    },
];

const METRICS: { name: string; val: string }[] = [
    { name: "Years delivering", val: "7+" },
    { name: "Training program", val: "CGAP · 9 months" },
    { name: "Cohorts delivered", val: "12+" },
    { name: "Contractors used", val: "0" },
];

export default function AboutTheFirm() {
    useScrollReveal();

    return (
        <section style={{ padding: "clamp(64px, 12vw, 120px) 32px", background: "var(--color-surface)" }}>
            <div className="v2-wrap">
                <div className="about-firm-grid">
                    <div>
                        <p className="v2-lbl v2-reveal" style={{ margin: "0 0 14px 0" }}>The firm</p>
                        <h2
                            className="v2-reveal"
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                                fontWeight: 700,
                                color: "var(--color-text-heading)",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                                margin: "0 0 24px 0",
                            }}
                        >
                            Still founder-led.{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                Still on the floor.
                            </em>
                        </h2>

                        <div className="about-firm-items">
                            {WHY_ITEMS.map((i) => (
                                <div key={i.head} className="about-firm-item v2-reveal">
                                    <div className="about-firm-dot" />
                                    <div>
                                        <div className="about-firm-item-head">{i.head}</div>
                                        <p className="about-firm-item-body">{i.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="v2-reveal">
                        <div className="about-firm-stat-block">
                            <div className="about-firm-big-num">35+</div>
                            <div className="about-firm-big-label">
                                consultants. All direct. All trained through CGAP.
                            </div>
                            <div className="about-firm-metrics">
                                {METRICS.map((m) => (
                                    <div key={m.name} className="about-firm-metric">
                                        <span className="about-firm-metric-name">{m.name}</span>
                                        <span className="about-firm-metric-val">{m.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
