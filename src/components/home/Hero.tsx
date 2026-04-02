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
        <section style={{ paddingTop: "116px", paddingBottom: "72px", background: "linear-gradient(158deg,#fff 58%,#e6f5ed 100%)" }}>
            <div className="v2-wrap" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "56px", alignItems: "center" }}>
                <div>
                    <div className="a-fadeUp-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--green-muted)", borderRadius: "20px", padding: "5px 13px", marginBottom: "22px" }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--green)", display: "inline-block", animation: "pulse 2s infinite" }} />
                        <span style={{ fontFamily: "var(--f-body)", fontSize: "12.5px", fontWeight: 500, color: "var(--green)" }}>Data, Cloud &amp; AI Consultancy</span>
                    </div>

                    <h1 className="v2-h1 a-fadeUp-2" style={{ fontSize: "clamp(34px,4.5vw,54px)", marginBottom: "18px" }}>
                        Enabling Business to<br />
                        Harness Data and{" "}
                        <em style={{ fontStyle: "italic", color: "var(--green)" }}>Deliver Value</em>
                    </h1>

                    <p className="v2-sub a-fadeUp-3" style={{ fontSize: "17px", maxWidth: "480px" }}>
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

                <div className="a-scaleIn" style={{ flexShrink: 0 }}>
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
        <section className="v2-section-s" style={{ background: "var(--surface)" }}>
            <div className="v2-wrap">
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <p className="v2-lbl v2-reveal">Choose your journey</p>
                    <h2 className="v2-h2 v2-reveal" style={{ fontSize: "30px" }}>Who are you?</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", alignItems: "stretch" }}>
                    {personas.map((p, i) => (
                        <Link key={p.href} href={p.href} style={{ textDecoration: "none", display: "flex" }}>
                            <div className={`v2-pc v2-reveal v2-d${i + 1}`}>
                                <div className="v2-pc-icon">
                                    <Ic name={p.icon as any} size={20} stroke="var(--green)" />
                                </div>
                                <h3 className="v2-h3" style={{ fontSize: "17px", marginBottom: "8px" }}>{p.title}</h3>
                                <p style={{ fontFamily: "var(--f-body)", fontSize: "13.5px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "20px" }}>
                                    {p.sub}
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--f-body)", fontSize: "13.5px", fontWeight: 600, color: "var(--green)", marginTop: "auto" }}>
                                    Explore <Ic name="arrowRight" size={14} stroke="var(--green)" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
