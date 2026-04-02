"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
    value: number;
    suffix: string;
    label: string;
}

interface StatsBarProps {
    stats?: StatItem[];
    experienceValue?: number;
    experienceLabel?: string;
}

const defaultStats: StatItem[] = [
    { value: 120, suffix: "+", label: "Projects delivered" },
    { value: 96, suffix: "%", label: "Client retention rate" },
    { value: 3.4, suffix: "×", label: "Average ROI for clients" },
    { value: 14, suffix: "", label: "Industries served" },
];

function AnimatedCounter({
    target,
    suffix,
    isVisible,
    isFloat = false,
}: {
    target: number;
    suffix: string;
    isVisible: boolean;
    isFloat?: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const duration = 1500;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isVisible, target]);

    const displayCount = isFloat ? count.toFixed(1) : Math.floor(count);

    return (
        <span>
            {displayCount}
            <span style={{ color: "var(--color-primary)" }}>{suffix}</span>
        </span>
    );
}

export default function StatsBar({
    stats = [],
    experienceValue = 12,
    experienceLabel = "Years of combined experience in data, cloud and AI consultancy"
}: StatsBarProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const displayStats = stats && stats.length > 0 ? stats : defaultStats;

    return (
        <section className="section-padding section-surface" id="about" ref={ref}>
            <div className="v2-wrap">
                <div className="stats-bar-grid">
                    {/* Left Side - Text */}
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
                        }}>Why CBT</span>
                        <h2 className="v2-h2" style={{
                            fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                        }}>
                            Built for businesses that want results, not reports
                        </h2>

                        <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column" }}>
                            {[
                                {
                                    title: "Outcome-first approach",
                                    body: "Every engagement starts with a clear business outcome in mind. We measure success by the impact on your organisation, not by deliverables.",
                                    first: true,
                                },
                                {
                                    title: "Specialists, not generalists",
                                    body: "Our team brings deep domain expertise in data, cloud and AI — so you're always working with people who truly understand your technical landscape.",
                                },
                                {
                                    title: "Approachable by design",
                                    body: "Complex technology, plain language. We cut through jargon to make sure every stakeholder — technical or not — is always fully informed and confident.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="group"
                                    style={{
                                        display: "flex",
                                        gap: "20px",
                                        padding: "28px 0",
                                        borderTop: item.first ? "1px solid var(--color-border)" : "none",
                                        borderBottom: "1px solid var(--color-border)",
                                    }}
                                >
                                    <div style={{
                                        width: "8px",
                                        height: "8px",
                                        background: "var(--color-border)",
                                        borderRadius: "50%",
                                        marginTop: "8px",
                                        flexShrink: 0,
                                        transition: "background 0.2s",
                                    }} />
                                    <div>
                                        <div className="v2-h3" style={{
                                            fontSize: "1.4rem",
                                            marginBottom: "8px",
                                        }}>{item.title}</div>
                                        <p style={{
                                            fontFamily: "var(--font-body)",
                                            fontSize: "16px",
                                            color: "var(--color-text-body)",
                                            lineHeight: 1.6,
                                        }}>{item.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="stats-box">
                        {/* Green glow */}
                        <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "240px", height: "240px", background: "radial-gradient(circle, rgba(0,153,77,0.3) 0%, transparent 65%)" }} />

                        {/* Top accent bar */}
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "var(--color-primary)" }} />

                        {/* BIG NUMBER SECTION */}
                        <div style={{
                            fontFamily: 'var(--font-playfair), var(--font-heading), serif',
                            fontSize: "5rem",
                            fontWeight: 700,
                            lineHeight: 1,
                            letterSpacing: "-0.04em",
                            color: "white",
                            marginBottom: "8px",
                            position: "relative",
                            zIndex: 1,
                        }}>
                            {experienceValue}+
                        </div>

                        {/* SUBTITLE SECTION */}
                        <div style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "14px",
                            fontWeight: 300,
                            color: "rgba(255, 255, 255, 0.6)",
                            lineHeight: 1.5,
                            marginBottom: "40px",
                            position: "relative",
                            zIndex: 1,
                        }}>
                            {experienceLabel}
                        </div>

                        {/* STATS LIST SECTION */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 1 }}>
                            {displayStats.map((stat, i) => {
                                return (
                                    <div key={stat.label} style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingBottom: "16px",
                                        borderBottom: i < displayStats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                                    }}>
                                        <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                                            {stat.label}
                                        </span>

                                        <span style={{
                                            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                                            fontSize: "16px",
                                            color: "var(--color-primary)",
                                            fontWeight: "bold"
                                        }}>
                                            {stat.value}{stat.suffix}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
