"use client";
import { useScrollReveal } from "@/components/home/Hero";
import Ic from "@/components/shared/Icons";

export default function CGAPTeaser({ batchCount = 12 }: { batchCount?: number }) {
    useScrollReveal();
    return (
        <section style={{ background: "var(--color-text-heading)", padding: "60px 24px" }}>
            <div className="v2-wrap home-cgap-grid">
                <div className="v2-reveal">
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                        <div style={{ width: "38px", height: "38px", background: "var(--color-primary)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Ic name="graduation" size={18} stroke="white" />
                        </div>
                        <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 700, color: "white" }}>CGAP</span>
                    </div>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "white", marginBottom: "10px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>Convergent Graduate Academy Program</h2>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 300, color: "rgba(255,255,255,.55)", lineHeight: "1.7", maxWidth: "460px" }}>
                        A 6-month paid training program bridging academia and industry in Data Analytics. {batchCount}+ successful cohorts. Stipend provided.
                    </p>
                </div>
                <div className="v2-reveal" style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                    <a href="/cgap" className="v2-btn v2-btn-p">Learn About CGAP</a>
                    <a href="https://cbt-recruitment-portal.vercel.app/" target="_blank" rel="noreferrer"
                        style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-primary-light)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                        Apply directly <Ic name="external" size={13} stroke="var(--color-primary-light)" />
                    </a>
                </div>
            </div>
        </section>
    );
}
