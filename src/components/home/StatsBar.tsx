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

export default function StatsBar({ stats = defaultStats }: StatsBarProps) {
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

    const displayStats = stats.length > 0 ? stats : defaultStats;

    return (
        <section className="bg-surface py-24 px-8" id="about" ref={ref}>
            <div className="container-main w-full p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Text */}
                    <div className="flex flex-col">
                        <span className="section-tag animate-fade-in">Why CBT</span>
                        <h2 className="section-heading mb-[4px] animate-fade-up animation-delay-100">
                            Built for businesses that want results, not reports
                        </h2>

                        <div className="mt-10 flex flex-col gap-[0]">
                            <div className="flex gap-4 animate-fade-up py-5 border-t border-b border-border">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                <div>
                                    <div className="font-heading text-[1.1rem] font-bold text-text-heading mb-1">Outcome-first approach</div>
                                    <p className="text-[13px] leading-[1.65] text-text-body">Every engagement starts with a clear business outcome in mind. We measure success by the impact on your organisation, not by deliverables.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 animate-fade-up animation-delay-100 py-5 border-b border-border group">
                                <div className="w-1.5 h-1.5 bg-border group-hover:bg-primary transition-colors duration-200 rounded-full mt-2 shrink-0" />
                                <div>
                                    <div className="font-heading text-[1.1rem] font-bold text-text-heading mb-1">Specialists, not generalists</div>
                                    <p className="text-[13px] leading-[1.65] text-text-body">Our team brings deep domain expertise in data, cloud and AI — so you're always working with people who truly understand your technical landscape.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 animate-fade-up animation-delay-200 py-5 border-b border-border group">
                                <div className="w-1.5 h-1.5 bg-border group-hover:bg-primary transition-colors duration-200 rounded-full mt-2 shrink-0" />
                                <div>
                                    <div className="font-heading text-[1.1rem] font-bold text-text-heading mb-1">Approachable by design</div>
                                    <p className="text-[13px] leading-[1.65] text-text-body">Complex technology, plain language. We cut through jargon to make sure every stakeholder — technical or not — is always fully informed and confident.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Stat Block */}
                    <div className="bg-text-heading rounded-2xl p-10 text-white animate-fade-up animation-delay-100 relative overflow-hidden shadow-2xl before:absolute before:bottom-[-60px] before:right-[-60px] before:w-[240px] before:h-[240px] before:bg-[radial-gradient(circle,rgba(0,153,77,0.3)_0%,transparent_65%)] after:absolute after:top-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary">
                        <div className="font-heading text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-white mb-2 relative z-10">
                            <AnimatedCounter target={12} suffix="+" isVisible={isVisible} />
                        </div>
                        <div className="text-[13px] font-light text-white/60 leading-[1.5] mb-8 relative z-10">
                            Years of combined experience in<br className="hidden sm:block" />data, cloud and AI consultancy
                        </div>

                        <div className="flex flex-col gap-4 relative z-10">
                            {displayStats.map((stat, i) => {
                                const isFloat = stat.value % 1 !== 0;
                                return (
                                    <div key={stat.label} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-b-0 last:pb-0">
                                        <span className="text-[12px] text-white/50">
                                            {stat.label}
                                        </span>
                                        <span className="font-mono text-[12px] text-primary font-bold">
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
