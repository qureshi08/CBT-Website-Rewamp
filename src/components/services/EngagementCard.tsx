import Ic from "@/components/shared/Icons";

const STEPS = [
    { num: "01", label: "Discover", body: "Where data lives today, who uses it, what hurts." },
    { num: "02", label: "Assess", body: "Maturity scored against a working reference model — not a glossy one." },
    { num: "03", label: "Roadmap", body: "Sequenced moves, sized, owned, with decision points baked in." },
    { num: "04", label: "Business case", body: "Value tied to P&L, risks surfaced, exec-ready in one pack." },
];

const DELIVERABLES = [
    "Maturity score & gap analysis",
    "Target operating model",
    "Prioritised 12–24 month roadmap",
    "P&L-tied business case",
];

export default function EngagementCard() {
    return (
        <aside className="services-engagement">
            <header className="services-engagement-head">
                <span className="services-engagement-eyebrow">Engagement at a glance</span>
                <h3 className="services-engagement-title">How a strategy engagement actually runs.</h3>
            </header>

            <ol className="services-engagement-steps">
                {STEPS.map((s) => (
                    <li key={s.num} className="services-engagement-step">
                        <span className="services-engagement-step-num">{s.num}</span>
                        <div>
                            <div className="services-engagement-step-label">{s.label}</div>
                            <p className="services-engagement-step-body">{s.body}</p>
                        </div>
                    </li>
                ))}
            </ol>

            <div className="services-engagement-meta">
                <div className="services-engagement-meta-row">
                    <span className="services-engagement-meta-key">Typical duration</span>
                    <span className="services-engagement-meta-val">4–8 weeks</span>
                </div>
                <div className="services-engagement-meta-row">
                    <span className="services-engagement-meta-key">Best for</span>
                    <span className="services-engagement-meta-val">
                        CDOs, transformation leads, exec sponsors
                    </span>
                </div>
            </div>

            <div className="services-engagement-deliverables">
                <span className="services-engagement-deliverables-label">You walk away with</span>
                <ul className="services-engagement-deliverables-list">
                    {DELIVERABLES.map((d) => (
                        <li key={d}>
                            <Ic name="check" size={16} stroke="var(--color-primary)" />
                            <span>{d}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
