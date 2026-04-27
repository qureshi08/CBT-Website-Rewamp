"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
    prefix?: string;
    value: number;
    suffix?: string;
    label: string;
};

type Props = {
    stats: Stat[];
};

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

function StatCell({ stat, start }: { stat: Stat; start: boolean }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return;

        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
            setValue(stat.value);
            return;
        }

        const duration = 1100;
        const t0 = performance.now();
        let raf = 0;
        const tick = (now: number) => {
            const t = Math.min(1, (now - t0) / duration);
            setValue(Math.round(stat.value * easeOutCubic(t)));
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [start, stat.value]);

    return (
        <div className="cgap-hero-fact">
            <span className="cgap-hero-fact-num">
                {stat.prefix ?? ""}
                {value}
                {stat.suffix ?? ""}
            </span>
            <span className="cgap-hero-fact-label">{stat.label}</span>
        </div>
    );
}

export default function CgapHeroStats({ stats }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setVisible(true);
                        obs.disconnect();
                    }
                });
            },
            { threshold: 0.25 }
        );
        obs.observe(node);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} className="cgap-hero-facts">
            {stats.map((s) => (
                <StatCell key={s.label} stat={s} start={visible} />
            ))}
        </div>
    );
}
