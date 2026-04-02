"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
    value: number;
    suffix: string;
    label: string;
}

interface StatsBarProps {
    stats?: StatItem[];
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
            <span className="text-primary-light">{suffix}</span>
        </span>
    );
}

export default function StatsBar({ stats = [] }: StatsBarProps) {
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
        <section className="bg-surface section-padding" id="about" ref={ref}>
            <div className="container-main">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-12)", alignItems: "center" }}>
                    {/* Left Side - Text */}
                    <div className="reveal" style={{ display: "flex", flexDirection: "column" }}>
                        <span className="section-tag animate-fade-in block" style={{ marginBottom: "var(--space-3)" }}>Why CBT</span>
                        <h2 className="animate-fade-up animation-delay-100" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--color-text-heading)", lineHeight: 1.2 }}>
                            Built for businesses that want results, not reports
                        </h2>

                        <div className="animate-fade-up animation-delay-200" style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column" }}>
                            <div className="group" style={{ display: "flex", gap: "var(--space-4)", padding: "var(--space-5) 0", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
                                <div style={{ width: "6px", height: "6px", background: "var(--color-primary)", borderRadius: "50%", marginTop: "8px", flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--color-text-heading)", marginBottom: "var(--space-1)" }}>Outcome-first approach</div>
                                    <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text-body)", lineHeight: 1.65 }}>Every engagement starts with a clear business outcome in mind. We measure success by the impact on your organisation, not by deliverables.</p>
                                </div>
                            </div>
                            <div className="group" style={{ display: "flex", gap: "var(--space-4)", padding: "var(--space-5) 0", borderBottom: "1px solid var(--color-border)" }}>
                                <div className="group-hover:bg-primary transition-colors duration-200" style={{ width: "6px", height: "6px", background: "var(--color-border)", borderRadius: "50%", marginTop: "8px", flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--color-text-heading)", marginBottom: "var(--space-1)" }}>Specialists, not generalists</div>
                                    <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text-body)", lineHeight: 1.65 }}>Our team brings deep domain expertise in data, cloud and AI — so you're always working with people who truly understand your technical landscape.</p>
                                </div>
                            </div>
                            <div className="group" style={{ display: "flex", gap: "var(--space-4)", padding: "var(--space-5) 0", borderBottom: "1px solid var(--color-border)" }}>
                                <div className="group-hover:bg-primary transition-colors duration-200" style={{ width: "6px", height: "6px", background: "var(--color-border)", borderRadius: "50%", marginTop: "8px", flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--color-text-heading)", marginBottom: "var(--space-1)" }}>Approachable by design</div>
                                    <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text-body)", lineHeight: 1.65 }}>Complex technology, plain language. We cut through jargon to make sure every stakeholder — technical or not — is always fully informed and confident.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Stat Block */}
                    <div className="reveal reveal-delay-1 relative overflow-hidden" style={{ background: "var(--color-text-heading)", borderRadius: "12px", padding: "var(--space-10)", color: "white", boxShadow: "0 24px 50px rgba(0,0,0,0.15)" }}>
                        <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "240px", height: "240px", background: "radial-gradient(circle, rgba(0,153,77,0.3) 0%, transparent 65%)" }} />
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "var(--color-primary)" }} />

                        <div style={{ fontFamily: "var(--font-heading)", fontSize: "56px", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.04em", color: "white", marginBottom: "var(--space-2)", position: "relative", zIndex: 10 }}>
                            <AnimatedCounter target={12} suffix="+" isVisible={isVisible} />
                        </div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: "var(--space-8)", position: "relative", zIndex: 10 }}>
                            Years of combined experience in<br className="hidden sm:block" />data, cloud and AI consultancy
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", position: "relative", zIndex: 10 }}>
                            {displayStats.map((stat, i) => {
                                const isFloat = stat.value % 1 !== 0;
                                return (
                                    <div key={stat.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "var(--space-4)", borderBottom: "1px solid rgba(255,255,255,0.1)" }} className="last:border-b-0 last:pb-0">
                                        <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                                            {stat.label}
                                        </span>
                                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--color-primary)", fontWeight: "bold" }}>
                                            <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} isFloat={isFloat} />
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
