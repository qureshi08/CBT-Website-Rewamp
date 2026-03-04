"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
    { value: 30, suffix: "+", label: "Consultants" },
    { value: 12, suffix: "+", label: "CGAP Cohorts" },
    { value: 50, suffix: "+", label: "Clients Served" },
];

function AnimatedCounter({
    target,
    suffix,
    isVisible,
}: {
    target: number;
    suffix: string;
    isVisible: boolean;
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
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, target]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}

export default function StatsBar() {
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
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-green-primary" ref={ref}>
            <div className="container-main py-16 md:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                <AnimatedCounter
                                    target={stat.value}
                                    suffix={stat.suffix}
                                    isVisible={isVisible}
                                />
                            </div>
                            <div className="text-sm font-medium text-white/70 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
