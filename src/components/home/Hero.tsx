"use client";
import { useEffect } from "react";
import Link from "next/link";
import Ic from "@/components/shared/Icons";
import { HeroIllustration } from "@/components/shared/Illustrations";

// ─── Scroll reveal hook ───
export function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".v2-reveal");
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("v2-in"); });
        }, { threshold: 0.1 });
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    });
}

// ─── Hero Section ───
export default function Hero({ batchCount = 12 }: { batchCount?: number }) {
    useScrollReveal();

    return (
        <section style={{ paddingTop: "116px", paddingBottom: "72px", background: "linear-gradient(158deg,#fff 58%,var(--color-primary-muted) 100%)" }}>
            <div className="v2-wrap home-hero-grid">
                <div>
                    <div className="a-fadeUp-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--color-primary-muted)", borderRadius: "20px", padding: "5px 13px", marginBottom: "22px" }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-primary)", display: "inline-block", animation: "pulse 2s infinite" }} />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-primary)" }}>Data, Cloud &amp; AI Consultancy</span>
                    </div>

                    <h1 className="v2-h1 a-fadeUp-2" style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)", marginBottom: "18px" }}>
                        Enabling Business to<br />
                        Harness Data and{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>Deliver Value</em>
                    </h1>

                    <p className="a-fadeUp-3" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", fontWeight: 300, color: "var(--color-text-body)", lineHeight: 1.7, maxWidth: "480px", marginTop: "13px" }}>
                        Strategic agile development experts. We help companies create software that rapidly scales businesses and delights users.
                    </p>

                    <div className="a-fadeUp-4" style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
                        <Link href="/contact" className="v2-btn v2-btn-p">
                            Start a Conversation <Ic name="arrowRight" size={16} stroke="white" />
                        </Link>
                        <Link href="/customers" className="v2-btn v2-btn-s">
                            See Our Work
                        </Link>
                    </div>
                </div>

                <div className="a-scaleIn home-hero-illustration" style={{ flexShrink: 0 }}>
                    <HeroIllustration />
                </div>
            </div>
        </section>
    );
}

// ─── Persona Cards ───
export function PersonaCards() {
    const personas = [
        { href: "/customers", icon: "building" as const, title: "Customer", sub: "Work with us to transform your data capability and deliver measurable business value." },
        { href: "/partners", icon: "/handshake" as const, title: "Partner", sub: "Co-deliver engagements and grow through a structured collaboration with CBT." },
        { href: "/products", icon: "pieChart" as const, title: "Products", sub: "Power BI custom visuals and analytics tools built for data-driven teams." },
        { href: "/cgap", icon: "graduation" as const, title: "CGAP", sub: "Graduate academy bridging academia and industry in data analytics consultancy." },
    ];

    return (
        <section className="v2-section-s" style={{ background: "var(--color-surface)" }}>
            <div className="v2-wrap">
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <p className="v2-lbl v2-reveal">Choose your journey</p>
                    <h2 className="v2-h2 v2-reveal" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)" }}>Who are you?</h2>
                </div>
                <div className="home-persona-grid">
                    {personas.map((p, i) => (
                        <Link key={p.href} href={p.href} style={{ textDecoration: "none", display: "flex" }}>
                            <div className={`v2-pc v2-reveal v2-d${i + 1}`}>
                                <div className="v2-pc-icon">
                                    <Ic name={p.icon as any} size={20} stroke="var(--color-primary)" />
                                </div>
                                <h3 className="v2-h3" style={{ fontSize: "var(--text-lg)", marginBottom: "8px" }}>{p.title}</h3>
                                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: "1.6", marginBottom: "20px" }}>
                                    {p.sub}
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-primary)", marginTop: "auto" }}>
                                    Explore <Ic name="arrowRight" size={14} stroke="var(--color-primary)" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
