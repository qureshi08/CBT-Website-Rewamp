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
                        Data, Cloud &amp; AI that actually{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>ships.</em>
                    </h1>

                    <p className="a-fadeUp-3" style={{ fontFamily: "var(--font-body)", fontSize: "20px", fontWeight: 350, color: "#4B5563", lineHeight: 1.7, maxWidth: "480px", marginTop: "13px" }}>
                        Enterprise data capability, delivered by a team that owns the outcome. Trusted by P&amp;G, Coca-Cola, PepsiCo, UNICEF, and ADNOC.
                    </p>

                    <div className="a-fadeUp-4" style={{ display: "flex", gap: "16px", marginTop: "28px", flexWrap: "wrap", alignItems: "center" }}>
                        <Link href="/contact?intent=discovery" className="hero-btn-primary">
                            Book a Discovery Call <span>→</span>
                        </Link>
                        <Link href="/customers" className="hero-btn-secondary">
                            See our work <span className="hero-btn-arrow">→</span>
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

// ─── Secondary Entries (demoted tri-block: CGAP, Products, Partners) ───
export function SecondaryEntries() {
    const entries = [
        { href: "/cgap", icon: "graduation" as const, title: "CGAP", sub: "A career, not a job. Nine-month graduate programme — Georgia Tech sponsored." },
        { href: "/products", icon: "layersData" as const, title: "Products", sub: "Productising our expertise. ECL Calculator and Power BI visuals on AppSource." },
        { href: "/partners", icon: "handshake" as const, title: "Partners", sub: "Global network of technology and delivery partners. Explore collaboration." },
    ];

    return (
        <section style={{ padding: "80px 32px", background: "var(--color-surface)" }}>
            <div className="v2-wrap">
                <div className="v2-reveal" style={{ marginBottom: "36px" }}>
                    <p className="v2-lbl">Also at CBT</p>
                    <h2 className="v2-h3" style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", maxWidth: "640px" }}>
                        Other ways we <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>work together.</em>
                    </h2>
                </div>

                <div className="home-persona-grid v2-reveal">
                    {entries.map((e) => (
                        <Link key={e.href} href={e.href} style={{ textDecoration: "none" }}>
                            <div className="v2-pc" style={{ padding: "24px 22px" }}>
                                <div className="v2-pc-icon" style={{ width: 36, height: 36, borderRadius: 8, marginBottom: 12 }}>
                                    <Ic name={e.icon as any} size={18} stroke="var(--color-primary)" />
                                </div>
                                <div style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    color: "var(--color-text-heading)",
                                    marginBottom: 6,
                                }}>
                                    {e.title}
                                </div>
                                <p style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 13.5,
                                    lineHeight: 1.6,
                                    color: "var(--color-text-muted)",
                                    marginBottom: 16,
                                    flexGrow: 1,
                                }}>
                                    {e.sub}
                                </p>
                                <span style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "var(--color-text-body)",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 5,
                                }}>
                                    Explore <span>→</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Backwards-compat alias (pages still importing PersonaCards) ───
export const PersonaCards = SecondaryEntries;
