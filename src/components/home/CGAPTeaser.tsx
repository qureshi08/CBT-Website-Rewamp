"use client";
import Link from "next/link";
import Image from "next/image";

export default function CGAPTeaser({ batchCount = 12 }: { batchCount?: number }) {
    return (
        <section className="v2-section" style={{
            background: "var(--dark)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Green accent bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "var(--color-primary)" }} />
            {/* Radial glow */}
            <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0,153,77,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />

            <div className="v2-wrap home-cgap-grid" style={{ position: "relative", zIndex: 1 }}>
                <div>
                    <div style={{ marginBottom: "46px" }}>
                        <Image
                            src="/cgap logos/CGAP - Logo Dark BG.png"
                            alt="CGAP Logo"
                            width={180}
                            height={50}
                            style={{ objectFit: "contain", objectPosition: "left" }}
                        />
                    </div>
                    <h2 style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                        fontWeight: 700,
                        color: "white",
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        marginBottom: "16px",
                    }}><span style={{ color: "var(--color-primary)" }}>Convergent</span> <em style={{ fontStyle: "normal" }}>Graduate Academy Program</em></h2>
                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "15px",
                        fontWeight: 300,
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.7,
                        maxWidth: "520px",
                    }}>
                        A 6-month paid training program bridging academia and industry in Data Analytics. {batchCount}+ successful cohorts. Stipend provided.
                    </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                    <Link href="/cgap" className="btn-cta-white" style={{ fontFamily: "var(--font-body)" }}>
                        Learn About CGAP →
                    </Link>
                    <a
                        href="https://cbt-recruitment-portal.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-cta-ghost"
                    >
                        Apply directly →
                    </a>
                </div>
            </div>
        </section>
    );
}
