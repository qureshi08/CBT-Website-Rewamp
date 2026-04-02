"use client";
import { useScrollReveal } from "@/components/home/Hero";
import Ic from "@/components/shared/Icons";

const services = [
    { icon: "search" as const, title: "Analytical Maturity Assessment", desc: "Benchmark capability and roadmap the path forward." },
    { icon: "database" as const, title: "Enterprise DWH Implementation", desc: "Scalable data warehouse architecture and delivery." },
    { icon: "trendUp" as const, title: "Business Analytics", desc: "Dashboards and self-service analytics that drive decisions." },
    { icon: "brain" as const, title: "Decision Sciences", desc: "Statistical modelling, forecasting, prescriptive analytics." },
    { icon: "settings" as const, title: "AnalyticOps", desc: "Operationalise your analytics function end to end." },
    { icon: "bookOpen" as const, title: "Training & Development", desc: "Hands-on data analytics upskilling for your teams." },
];

export default function ServicesGrid() {
    useScrollReveal();
    return (
        <section className="v2-section">
            <div className="v2-wrap">
                <div style={{ marginBottom: "36px" }}>
                    <p className="v2-lbl v2-reveal">What We Do</p>
                    <h2 className="v2-h2 v2-reveal" style={{ fontSize: "34px", maxWidth: "440px" }}>Delivering great solutions, end-to-end</h2>
                    <p className="v2-sub v2-reveal" style={{ maxWidth: "500px" }}>
                        Cross-functional teams of architects, developers, cloud experts and analysts. Engagement models from dedicated delivery to executive advisory.
                    </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
                    {services.map((s, i) => (
                        <div key={s.title} className={`v2-stile v2-reveal v2-d${(i % 3) + 1}`}>
                            <div className="v2-stile-icon"><Ic name={s.icon} size={18} stroke="var(--green)" /></div>
                            <h3 className="v2-h3" style={{ fontSize: "15px", marginBottom: "6px" }}>{s.title}</h3>
                            <p style={{ fontFamily: "var(--f-body)", fontSize: "13px", color: "var(--muted)", lineHeight: "1.6" }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
