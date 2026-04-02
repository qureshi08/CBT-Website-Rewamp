export default function Testimonials() {
    return (
        <section className="bg-white section-padding" id="case-studies">
            <div className="container-main">
                <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", marginBottom: "var(--space-12)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-2)" }}>
                        <div style={{ width: "4px", height: "28px", background: "var(--color-primary)", borderRadius: "2px" }} />
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--color-text-heading)" }}>
                            Don't take our word for it
                        </h2>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
                    <div className="card reveal reveal-delay-1" style={{ display: "flex", flexDirection: "column", background: "var(--color-surface)", border: "none" }}>
                        <div style={{ fontFamily: "var(--font-heading)", fontSize: "40px", color: "var(--color-primary)", lineHeight: 0.5, marginBottom: "var(--space-4)" }}>"</div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text-body)", lineHeight: 1.65, flexGrow: 1, marginBottom: "var(--space-6)" }}>
                            CBT helped us build a data infrastructure we should have had five years ago. Within three months, our ops team was making decisions from live dashboards rather than week-old spreadsheets.
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--color-white)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold", border: "1px solid var(--color-border)" }}>
                                SO
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--color-text-heading)" }}>Sarah Okonkwo</div>
                                <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-text-muted)" }}>CTO, NovaTech Solutions</div>
                            </div>
                        </div>
                    </div>

                    <div className="card reveal reveal-delay-2" style={{ display: "flex", flexDirection: "column", background: "var(--color-primary)", border: "none", color: "var(--color-white)", boxShadow: "0 12px 40px rgba(0,153,77,0.15)" }}>
                        <div style={{ fontFamily: "var(--font-heading)", fontSize: "40px", color: "rgba(255,255,255,0.5)", lineHeight: 0.5, marginBottom: "var(--space-4)" }}>"</div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-white)", lineHeight: 1.65, flexGrow: 1, marginBottom: "var(--space-6)" }}>
                            The team made our AWS migration feel effortless. Complex architecture decisions were explained clearly, timelines were kept, and the end result exceeded what we thought was possible.
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold", border: "1px solid rgba(255,255,255,0.2)" }}>
                                MK
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--color-white)" }}>Marcus Kwame</div>
                                <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>Head of Engineering, PulseHR</div>
                            </div>
                        </div>
                    </div>

                    <div className="card md:col-span-2 reveal reveal-delay-3" style={{ display: "flex", flexDirection: "column", background: "var(--color-surface)", border: "none" }}>
                        <div style={{ fontFamily: "var(--font-heading)", fontSize: "40px", color: "var(--color-primary)", lineHeight: 0.5, marginBottom: "var(--space-4)" }}>"</div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text-body)", lineHeight: 1.65, flexGrow: 1, marginBottom: "var(--space-6)" }}>
                            As a startup, we weren't sure where to start with AI. CBT helped us identify the right use cases, build quickly, and avoid the expensive mistakes we'd have made alone.
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--color-white)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold", border: "1px solid var(--color-border)" }}>
                                JA
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--color-text-heading)" }}>Jamie Adeyemi</div>
                                <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-text-muted)" }}>CEO, Rootly AI</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
