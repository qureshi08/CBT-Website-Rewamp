import Ic, { type IconName } from "@/components/shared/Icons";

type Principle = {
    icon: IconName;
    title: string;
    body: string;
};

const PRINCIPLES: Principle[] = [
    {
        icon: "users",
        title: "One team, end to end",
        body: "The same people shape the strategy and ship the pipelines. Nothing gets rebadged at a handoff.",
    },
    {
        icon: "target",
        title: "Outcome-owned",
        body: "We sign up to the metric that matters — adoption, cycle time, margin — not just the deliverable.",
    },
    {
        icon: "cpu",
        title: "Senior on the keyboard",
        body: "No pyramid. The consultant who scoped the work is the one still there at go-live.",
    },
    {
        icon: "shield",
        title: "Productionised, not prototyped",
        body: "Pilots only count when they survive ops, audit, and the next budget cycle. That's the bar.",
    },
];

export default function PrinciplesStrip() {
    return (
        <div className="services-principles-grid">
            {PRINCIPLES.map((p) => (
                <article key={p.title} className="services-principle">
                    <div className="services-principle-icon">
                        <Ic name={p.icon} size={22} stroke="var(--color-primary)" />
                    </div>
                    <h3 className="services-principle-title">{p.title}</h3>
                    <p className="services-principle-body">{p.body}</p>
                </article>
            ))}
        </div>
    );
}
