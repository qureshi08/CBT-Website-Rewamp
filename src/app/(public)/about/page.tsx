import type { Metadata } from "next";
import Link from "next/link";
import Ic from "@/components/shared/Icons";

export const metadata: Metadata = {
    title: "About | Convergent Business Technologies",
    description:
        "Convergent Business Technologies is a Data, Cloud & AI consultancy. Senior consultants, outcome-owned delivery, our own talent pipeline — trusted by P&G, Coca-Cola, PepsiCo, UNICEF, and ADNOC.",
};

const VALUES = [
    {
        num: "01",
        icon: "target" as const,
        title: "Outcome-owned delivery",
        body: "We don't hand the work back over the wall and walk away. The team that scopes the problem is on the hook when it's in production — that's the only model we've found that keeps the numbers moving.",
    },
    {
        num: "02",
        icon: "users" as const,
        title: "Senior consultants only",
        body: "The people you meet in discovery are the people who ship. No bench swaps after the SOW is signed, no juniors parachuted in mid-project to protect margin.",
    },
    {
        num: "03",
        icon: "graduation" as const,
        title: "Our own pipeline",
        body: "We don't offshore. Our talent comes through CGAP — a 9-month Georgia Tech-sponsored programme that trains graduates on real client work from month two. The result is a bench that already knows how we deliver.",
    },
    {
        num: "04",
        icon: "layersData" as const,
        title: "Focused toolkit",
        body: "We work deeply in a named stack — Microsoft Fabric, Snowflake, Databricks, Power BI, OpenAI — rather than claiming everything. If we don't list it on the services page, we don't claim it.",
    },
];

const PARTNERS = [
    { name: "Microsoft", note: "Solutions partner" },
    { name: "Snowflake", note: "Select partner" },
    { name: "KPMG", note: "Banking alliance" },
    { name: "OpenAI", note: "Applied AI" },
];

const STATS = [
    { number: "25+", label: "enterprise clients", note: "retail, banking, telecom, FMCG, public sector" },
    { number: "12", label: "CGAP batches", note: "9-month Georgia Tech programme" },
    { number: "4", label: "partner alliances", note: "Microsoft, Snowflake, KPMG, OpenAI" },
    { number: "100%", label: "senior on engagement", note: "no bench swaps after SOW" },
];

export default function AboutPage() {
    return (
        <main>
            {/* ─── HERO ─── */}
            <section
                className="hero-grid-texture"
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    padding: "120px 0 80px",
                    background: "#fff",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div className="v2-wrap" style={{ position: "relative", zIndex: 1, width: "100%" }}>
                    <div
                        className="a-fadeUp-1"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "var(--color-primary-muted)",
                            borderRadius: 20,
                            padding: "5px 13px",
                            marginBottom: 22,
                        }}
                    >
                        <span
                            style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: "var(--color-primary)",
                                animation: "pulse 2s infinite",
                            }}
                        />
                        <span
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "var(--text-xs)",
                                fontWeight: 500,
                                color: "var(--color-primary)",
                            }}
                        >
                            About CBT
                        </span>
                    </div>

                    <h1
                        className="v2-h1 a-fadeUp-2"
                        style={{
                            fontSize: "clamp(2.6rem, 5vw, 4rem)",
                            marginBottom: 22,
                            maxWidth: 920,
                        }}
                    >
                        Senior consultants, outcomes{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                            owned.
                        </em>
                    </h1>

                    <p
                        className="a-fadeUp-3"
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 20,
                            fontWeight: 350,
                            color: "#4B5563",
                            lineHeight: 1.7,
                            maxWidth: 640,
                        }}
                    >
                        Convergent Business Technologies is a Data, Cloud &amp; AI consultancy. We&rsquo;re the team that ships &mdash; and then stands behind it when it&rsquo;s in production. Trusted by P&amp;G, Coca-Cola, PepsiCo, UNICEF, and ADNOC.
                    </p>

                    <div
                        className="a-fadeUp-4"
                        style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}
                    >
                        <Link href="/contact?intent=discovery" className="hero-btn-primary">
                            Book a Discovery Call <span>→</span>
                        </Link>
                        <Link href="/case-studies" className="hero-btn-secondary">
                            See our work <span className="hero-btn-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── BY THE NUMBERS ─── */}
            <section className="industry-highlights">
                <div className="v2-wrap">
                    <div className="about-stats-row">
                        {STATS.map((s) => (
                            <div key={s.label} className="industry-highlight">
                                <div className="industry-highlight-number">{s.number}</div>
                                <div className="industry-highlight-label">{s.label}</div>
                                <div className="industry-highlight-note">{s.note}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── MISSION NARRATIVE ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="industry-context v2-reveal">
                        <span className="services-section-tag">why we exist</span>
                        <h2 className="services-section-title" style={{ maxWidth: 820 }}>
                            Data consulting should end with an outcome, not a{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                slide deck.
                            </em>
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 18,
                                fontWeight: 350,
                                lineHeight: 1.75,
                                color: "var(--color-text-body)",
                                maxWidth: 820,
                                marginBottom: 16,
                            }}
                        >
                            CBT was built around a simple frustration: too many data initiatives ship a strategy document and stop there. The roadmap looks great on a slide and then quietly stalls the moment it meets real systems, real users, and real deadlines.
                        </p>
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 18,
                                fontWeight: 350,
                                lineHeight: 1.75,
                                color: "var(--color-text-body)",
                                maxWidth: 820,
                            }}
                        >
                            We built the team to fix that. Senior consultants, our own graduate pipeline, a focused toolkit, and delivery that doesn&rsquo;t end at go-live. Whether the work is a data foundation, an IFRS 9 ECL pipeline, or a generative AI copilot &mdash; we own the outcome.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── HOW WE WORK ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">how we work</span>
                        <h2 className="services-section-title">
                            Four things we refuse to{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                compromise.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Principles more than positioning &mdash; these are the operating choices that shape every engagement.
                        </p>
                    </div>

                    <div className="services-grid services-grid-2">
                        {VALUES.map((v) => (
                            <article key={v.num} className="services-tile">
                                <div className="services-tile-head">
                                    <div className="services-tile-icon">
                                        <Ic name={v.icon} size={22} stroke="var(--color-primary)" />
                                    </div>
                                    <span className="services-tile-num">{v.num}</span>
                                </div>
                                <div className="services-tile-title-row">
                                    <h3 className="services-tile-title">{v.title}</h3>
                                </div>
                                <p className="services-tile-desc">{v.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PARTNERS ─── */}
            <section className="services-partners">
                <div className="v2-wrap">
                    <div className="services-partners-head">
                        <span className="section-tag" style={{ marginBottom: 0 }}>
                            Partner ecosystem
                        </span>
                        <p className="services-partners-sub">
                            Alliances that back our delivery. We earn these — we don&rsquo;t badge-collect.
                        </p>
                    </div>
                    <div className="about-partners-grid">
                        {PARTNERS.map((p) => (
                            <div key={p.name} className="about-partner-card">
                                <span className="about-partner-name">{p.name}</span>
                                <span className="about-partner-note">{p.note}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PEOPLE / CGAP BRIDGE ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="about-cgap-bridge v2-reveal">
                        <div>
                            <span className="services-section-tag">the team</span>
                            <h2 className="services-section-title">
                                Built by practitioners, trained through{" "}
                                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                    CGAP.
                                </em>
                            </h2>
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: 17,
                                    fontWeight: 350,
                                    lineHeight: 1.75,
                                    color: "var(--color-text-body)",
                                    maxWidth: 600,
                                    marginBottom: 24,
                                }}
                            >
                                Our bench is built deliberately. The Convergent Graduate Academy Programme &mdash; 9 months, Georgia Tech-sponsored &mdash; funnels the engineers and analysts who deliver for our clients. No offshoring, no contractor swaps, no surprise juniors.
                            </p>
                            <Link href="/cgap" className="hero-btn-secondary">
                                Explore CGAP <span className="hero-btn-arrow">→</span>
                            </Link>
                        </div>
                        <div className="about-cgap-side">
                            <div className="about-cgap-fact">
                                <span className="about-cgap-fact-num">9</span>
                                <span className="about-cgap-fact-label">months</span>
                                <span className="about-cgap-fact-note">
                                    fundamentals → specialise → live project → placement
                                </span>
                            </div>
                            <div className="about-cgap-fact">
                                <span className="about-cgap-fact-num">GT</span>
                                <span className="about-cgap-fact-label">sponsored</span>
                                <span className="about-cgap-fact-note">
                                    Georgia Tech partnership on content + certification
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA BAND ─── */}
            <section className="cta-band">
                <div className="v2-wrap cta-inner-grid">
                    <div>
                        <h2 className="cta-heading">
                            Want the same team on your{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                problem?
                            </em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Thirty minutes with a senior consultant. No pitch deck &mdash; we&rsquo;ll scope the problem, pressure-test the approach, and tell you whether we&rsquo;re the right team for it.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                        <Link
                            href="/contact?intent=discovery"
                            className="btn-cta-white"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Book a Discovery Call →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
