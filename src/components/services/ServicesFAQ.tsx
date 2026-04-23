type QA = { q: string; a: string };

const ITEMS: QA[] = [
    {
        q: "How does an engagement start?",
        a: "A 30-minute discovery call with a senior consultant — no pitch deck. We pressure-test where you are, where the value is, and whether we're the right team. If it's not a fit, we'll say so and point you somewhere that is.",
    },
    {
        q: "Do you work fixed-price or time-and-materials?",
        a: "Both. Strategy and discovery work is typically fixed-price against a defined scope. Build and run work is usually T&M against a capped envelope, with go/no-go decision points every few sprints so budget stays honest.",
    },
    {
        q: "What size of business is this for?",
        a: "Mid-market through enterprise is where we spend most of our time — organisations with enough data to matter and enough complexity that generic tooling has stopped working. We also take on smaller engagements when the problem is sharp and the buyer is clear.",
    },
    {
        q: "Can you work alongside our incumbent vendor?",
        a: "Yes, and we often do. We're platform-fluent rather than platform-dogmatic. If you already have a Databricks contract or a Power BI estate, we build on it — we don't rip and replace for the sake of it.",
    },
    {
        q: "How fast can we see value?",
        a: "A maturity assessment delivers a usable roadmap inside six weeks. A focused foundations build — one pipeline, one dashboard, one governed dataset — typically shows value in 8–12 weeks. AI work varies more; we'll be upfront about what's realistic before you spend anything.",
    },
];

export default function ServicesFAQ() {
    return (
        <div className="services-faq">
            {ITEMS.map((item, i) => (
                <details
                    key={item.q}
                    className="services-faq-item"
                    {...(i === 0 ? { open: true } : {})}
                >
                    <summary className="services-faq-q">
                        <span>{item.q}</span>
                        <span className="services-faq-chev" aria-hidden>
                            +
                        </span>
                    </summary>
                    <div className="services-faq-a">{item.a}</div>
                </details>
            ))}
        </div>
    );
}
