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
        <section className="hero-grid-texture" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 80px", background: "#fff", position: "relative", overflow: "hidden" }}>
            <div className="v2-wrap home-hero-grid" style={{ position: "relative", zIndex: 1, width: "100%" }}>
                <div>
                    <div className="a-fadeUp-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--color-primary-muted)", borderRadius: "20px", padding: "5px 13px", marginBottom: "22px" }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-primary)", display: "inline-block", animation: "pulse 2s infinite" }} />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-primary)" }}>Data, Cloud &amp; AI Consultancy</span>
                    </div>

                    <h1 className="v2-h1 a-fadeUp-2" style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)", marginBottom: "18px" }}>
                        Enabling Business to<br />
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>harness data </em>
                        and Deliver Value{" "}
                    </h1>

                    <p className="a-fadeUp-3" style={{ fontFamily: "var(--font-body)", fontSize: "20px", fontWeight: 350, color: "#4B5563", lineHeight: 1.7, maxWidth: "460px", marginTop: "13px" }}>
                        Strategic agile development experts. We help companies create software that rapidly scales businesses and delights users.
                    </p>

                    <div className="a-fadeUp-4" style={{ display: "flex", gap: "16px", marginTop: "28px", flexWrap: "wrap", alignItems: "center" }}>
                        <Link href="/contact" className="hero-btn-primary">
                            Work with us <span>→</span>
                        </Link>
                        <Link href="/customers" className="hero-btn-secondary">
                            See Our Work <span className="hero-btn-arrow">→</span>
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
        { num: "01", href: "/customers", icon: "building" as const, title: "Customer", sub: "Work with us to transform your data capability and deliver measurable business value." },
        { num: "02", href: "/partners", icon: "handshake" as const, title: "Partner", sub: "Co-deliver engagements and grow through a structured collaboration with CBT." },
        { num: "03", href: "/cgap", icon: "graduation" as const, title: "CGAP", sub: "Graduate academy bridging academia and industry in data analytics consultancy." },
    ];

    return (
        <section style={{ padding: "100px 32px", background: "var(--color-white)" }}>
            <div className="v2-wrap">
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <p className="v2-lbl v2-reveal">Choose your journey</p>
                    <h2 className="v2-h2 v2-reveal" style={{ fontSize: "clamp(2rem, 3vw, 2.6rem)" }}>Who are you?</h2>
                </div>

                <div className="services-grid-bordered v2-reveal">
                    {personas.map((p, i) => (
                        <Link key={p.href} href={p.href} style={{ textDecoration: "none" }}>
                            <div className="service-card" style={{ height: "100%" }}>
                                <span className="service-num">{p.num}</span>
                                <div className="service-icon-wrap">
                                    <Ic name={p.icon as any} size={20} stroke="var(--color-primary)" />
                                </div>
                                <div className="service-title">{p.title}</div>
                                <p className="service-desc" style={{ marginBottom: "24px" }}>
                                    {p.sub}
                                </p>
                                <span className="service-link">
                                    Explore <span style={{ transition: "transform 0.2s" }}>→</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
