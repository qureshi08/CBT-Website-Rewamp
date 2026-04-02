"use client";
import Link from "next/link";

const navLinks = ["customers", "partners", "products", "cgap", "contact"];
const services = ["Analytical Maturity", "Enterprise DWH", "Business Analytics", "Decision Sciences", "AnalyticOps", "Training & Dev"];

export default function Footer() {
    return (
        <footer className="v2-footer">
            <div className="v2-wrap">
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px" }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "6px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <img src="/logo.png" alt="CBT Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <span style={{ fontFamily: "var(--f-head)", fontSize: "17px", fontWeight: 700, color: "white" }}>Convergent</span>
                        </div>
                        <p style={{ fontFamily: "var(--f-body)", fontSize: "13.5px", color: "rgba(255,255,255,.45)", lineHeight: "1.7", maxWidth: "300px" }}>
                            Strategic agile development experts helping companies harness data and deliver business value.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p style={{ fontFamily: "var(--f-body)", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: "14px" }}>
                            Navigation
                        </p>
                        {navLinks.map(l => (
                            <div key={l} style={{ marginBottom: "9px" }}>
                                <Link href={`/${l === "home" ? "" : l}`} className="v2-footer-link" style={{ textTransform: "capitalize" }}>
                                    {l === "cgap" ? "CGAP" : l.charAt(0).toUpperCase() + l.slice(1)}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Services */}
                    <div>
                        <p style={{ fontFamily: "var(--f-body)", fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: "14px" }}>
                            Services
                        </p>
                        {services.map(s => (
                            <div key={s} style={{ marginBottom: "9px" }}>
                                <span style={{ fontFamily: "var(--f-body)", fontSize: "13px", color: "rgba(255,255,255,.4)" }}>{s}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.08)", margin: "36px 0 24px" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--f-body)", fontSize: "12.5px", color: "rgba(255,255,255,.28)" }}>
                        © {new Date().getFullYear()} Convergent Business Technologies. All rights reserved.
                    </span>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Link href="/contact" className="v2-footer-link" style={{ fontSize: "12.5px" }}>Contact</Link>
                        <button className="v2-footer-link" style={{ fontSize: "12.5px" }}>Privacy Policy</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
