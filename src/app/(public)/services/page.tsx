import Link from "next/link";
import type { Metadata } from "next";
import CapabilityTile from "@/components/services/CapabilityTile";
import ToolsStrip from "@/components/services/ToolsStrip";
import EngagementCard from "@/components/services/EngagementCard";
import PrinciplesStrip from "@/components/services/PrinciplesStrip";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ClientReveal from "@/components/shared/ClientReveal";
import { createClient } from "@/lib/supabase/server";
import type { IconName } from "@/components/shared/Icons";

const PARTNER_TIERS: Array<{ name: string; tier: string }> = [
    { name: "Microsoft", tier: "Solutions Partner — Data & AI" },
    { name: "Snowflake", tier: "Select Services Partner" },
    { name: "KPMG", tier: "Delivery Alliance" },
    { name: "OpenAI", tier: "API Platform" },
];

const DONT_DO: string[] = [
    "We don't sell licences we can't implement.",
    "We don't run change programs without a data foundation underneath.",
    "We don't dress pilots up as production.",
];

const MATURITY_STAGES: Array<{ label: string; note: string }> = [
    { label: "Reactive", note: "Spreadsheets. Tribal knowledge." },
    { label: "Repeatable", note: "A warehouse exists. Reports ship." },
    { label: "Defined", note: "Governance and lineage are real." },
    { label: "Managed", note: "Quality and SLAs, not vibes." },
    { label: "Optimising", note: "Data is a product, measured in P&L." },
];

export const metadata: Metadata = {
    title: "Services | Convergent Business Technologies",
    description:
        "Data, Cloud & AI — end to end. Six capabilities across strategy, foundations, and intelligence. One delivery team, outcome-owned.",
};

type ServiceRow = {
    slug: string;
    name: string;
    section: "strategy" | "foundations" | "intelligence";
    num: string;
    description: string | null;
    tools: string[] | null;
    icon: string | null;
    emerging: boolean;
    display_order: number;
};

const SECTION_META = {
    strategy: {
        tag: "#strategy",
        title: (
            <>
                Know where you are, plan where to{" "}
                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                    go.
                </em>
            </>
        ),
        sub: "A data strategy that survives first contact with delivery. We sequence the moves, tie investment to P&L, and make the plan something your team can actually ship.",
        gridClass: "services-grid services-grid-1",
        sectionClass: "services-section",
    },
    foundations: {
        tag: "#foundations · data domain",
        title: (
            <>
                The plumbing that makes the answer{" "}
                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                    trustworthy.
                </em>
            </>
        ),
        sub: "Pipelines, platforms, governance, analytics. The layer dashboards and models depend on — so what comes out isn’t lying to you.",
        gridClass: "services-grid services-grid-3",
        sectionClass: "services-section services-section-alt",
    },
    intelligence: {
        tag: "#intelligence",
        title: (
            <>
                AI, made{" "}
                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                    real.
                </em>
            </>
        ),
        sub: "Beyond demos. Predictive models, copilots trained on your data, and early agentic prototypes — grounded in what your business already knows, safe by design.",
        gridClass: "services-grid services-grid-2",
        sectionClass: "services-section services-section-intel",
    },
} as const;

export default async function ServicesPage() {
    const supabase = await createClient();
    const { data } = await supabase
        .from("services")
        .select("slug, name, section, num, description, tools, icon, emerging, display_order")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

    const rows = (data || []) as ServiceRow[];

    const sections: Record<ServiceRow["section"], ServiceRow[]> = {
        strategy: rows.filter(r => r.section === "strategy"),
        foundations: rows.filter(r => r.section === "foundations"),
        intelligence: rows.filter(r => r.section === "intelligence"),
    };

    return (
        <>
            <ClientReveal />
            {/* ─── HERO ─── */}
            <section
                className="hero-grid-texture services-hero"
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
                <div
                    className="v2-wrap"
                    style={{ position: "relative", zIndex: 1, width: "100%", textAlign: "left" }}
                >
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
                            Capabilities
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
                        Data, Cloud &amp; AI &mdash; end to{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>end.</em>
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
                        From raw data to AI &mdash; six capabilities, one delivery team, outcome-owned. No handoffs, no finger-pointing when it lands in production.
                    </p>

                    <div
                        className="a-fadeUp-4"
                        style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}
                    >
                        <Link href="/contact?intent=discovery" className="hero-btn-primary">
                            Book a Discovery Call <span>→</span>
                        </Link>
                        <Link href="#strategy" className="hero-btn-secondary">
                            Explore capabilities <span className="hero-btn-arrow">→</span>
                        </Link>
                    </div>

                    <nav className="services-toc" aria-label="Capability sections">
                        <Link href="#strategy" className="services-toc-link">
                            <span className="services-toc-num">01</span>
                            <span>Strategy</span>
                        </Link>
                        <Link href="#foundations" className="services-toc-link">
                            <span className="services-toc-num">02&ndash;04</span>
                            <span>Foundations</span>
                        </Link>
                        <Link href="#intelligence" className="services-toc-link">
                            <span className="services-toc-num">05&ndash;06</span>
                            <span>Intelligence</span>
                        </Link>
                        <Link href="#tools" className="services-toc-link">
                            <span className="services-toc-num">#</span>
                            <span>Tools</span>
                        </Link>
                    </nav>
                </div>
            </section>

            {/* ─── #STRATEGY (custom 2-col: tile + engagement sidebar) ─── */}
            {sections.strategy.length > 0 && (
                <section id="strategy" className={SECTION_META.strategy.sectionClass}>
                    <div className="v2-wrap">
                        <div className="services-section-head v2-reveal">
                            <span className="services-section-tag">{SECTION_META.strategy.tag}</span>
                            <h2 className="services-section-title">{SECTION_META.strategy.title}</h2>
                            <p className="services-section-sub">{SECTION_META.strategy.sub}</p>
                        </div>

                        <div className="services-strategy-grid">
                            <div className="services-strategy-left">
                                {sections.strategy.map((t) => (
                                    <CapabilityTile
                                        key={t.slug}
                                        num={t.num}
                                        icon={(t.icon || "target") as IconName}
                                        title={t.name}
                                        description={t.description || ""}
                                        tools={t.tools?.length ? t.tools : undefined}
                                        emerging={t.emerging}
                                    />
                                ))}
                                <div className="services-maturity">
                                    <div className="services-maturity-head">
                                        <span className="services-maturity-eyebrow">
                                            Maturity model
                                        </span>
                                        <h4 className="services-maturity-title">
                                            Where most teams sit — and where they&rsquo;re trying to get.
                                        </h4>
                                    </div>
                                    <ol className="services-maturity-ladder">
                                        {MATURITY_STAGES.map((s, i) => (
                                            <li key={s.label} className="services-maturity-step">
                                                <div className="services-maturity-num">
                                                    {String(i + 1).padStart(2, "0")}
                                                </div>
                                                <div className="services-maturity-text">
                                                    <div className="services-maturity-label">{s.label}</div>
                                                    <div className="services-maturity-note">{s.note}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                            <EngagementCard />
                        </div>
                    </div>
                </section>
            )}

            {/* ─── #FOUNDATIONS ─── */}
            {sections.foundations.length > 0 && (
                <section id="foundations" className={SECTION_META.foundations.sectionClass}>
                    <div className="v2-wrap">
                        <div className="services-section-head v2-reveal">
                            <span className="services-section-tag">{SECTION_META.foundations.tag}</span>
                            <h2 className="services-section-title">{SECTION_META.foundations.title}</h2>
                            <p className="services-section-sub">{SECTION_META.foundations.sub}</p>
                        </div>
                        <div className={SECTION_META.foundations.gridClass}>
                            {sections.foundations.map((t) => (
                                <CapabilityTile
                                    key={t.slug}
                                    num={t.num}
                                    icon={(t.icon || "target") as IconName}
                                    title={t.name}
                                    description={t.description || ""}
                                    tools={t.tools?.length ? t.tools : undefined}
                                    emerging={t.emerging}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── HOW WE DELIVER (principles) ─── */}
            <section className="services-section services-section-principles">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">#delivery · how we work</span>
                        <h2 className="services-section-title">
                            The same people, from the whiteboard to{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                production.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Four principles that decide how we staff, scope, and ship. They&rsquo;re also why we turn work down when the shape&rsquo;s wrong.
                        </p>
                    </div>
                    <PrinciplesStrip />
                </div>
            </section>

            {/* ─── #INTELLIGENCE ─── */}
            {sections.intelligence.length > 0 && (
                <section id="intelligence" className={SECTION_META.intelligence.sectionClass}>
                    <div className="v2-wrap">
                        <div className="services-section-head v2-reveal">
                            <span className="services-section-tag">{SECTION_META.intelligence.tag}</span>
                            <h2 className="services-section-title">{SECTION_META.intelligence.title}</h2>
                            <p className="services-section-sub">{SECTION_META.intelligence.sub}</p>
                        </div>
                        <div className={SECTION_META.intelligence.gridClass}>
                            {sections.intelligence.map((t) => (
                                <CapabilityTile
                                    key={t.slug}
                                    num={t.num}
                                    icon={(t.icon || "target") as IconName}
                                    title={t.name}
                                    description={t.description || ""}
                                    tools={t.tools?.length ? t.tools : undefined}
                                    emerging={t.emerging}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── WHAT WE DON'T DO ─── */}
            <section className="services-dontdo-section">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">#candour</span>
                        <h2 className="services-section-title">
                            What we{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                don&rsquo;t
                            </em>{" "}
                            do.
                        </h2>
                        <p className="services-section-sub">
                            Saying no is a capability. Three lines we won&rsquo;t cross, so the ones we do cross mean something.
                        </p>
                    </div>
                    <ul className="services-dontdo-list">
                        {DONT_DO.map((line) => (
                            <li key={line} className="services-dontdo-item">
                                <span className="services-dontdo-mark" aria-hidden>
                                    ×
                                </span>
                                <span>{line}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ─── #TOOLS ─── */}
            <section id="tools" className="services-section">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">#tools &middot; the stack</span>
                        <h2 className="services-section-title">
                            A focused toolkit, not a sprawling{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                menu.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Sixteen named tools across three groups. The real stack we deliver on &mdash; if we don&rsquo;t list it, we don&rsquo;t claim it.
                        </p>
                    </div>

                    <ToolsStrip />
                </div>
            </section>

            {/* ─── PARTNER BADGES ─── */}
            <section className="services-partners">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">#partners · the ecosystem</span>
                        <h2 className="services-section-title">
                            Tiered alliances, not a{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                badge collection.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Each partnership here maps to real project history — co-delivered work, certified people, joint customers. We earn these; we don&rsquo;t collect them.
                        </p>
                    </div>
                    <div className="services-partners-row">
                        {PARTNER_TIERS.map((p) => (
                            <div key={p.name} className="services-partner-cell">
                                <span className="services-partner-badge">{p.name}</span>
                                <span className="services-partner-tier">{p.tier}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="services-section services-section-faq">
                <div className="v2-wrap">
                    <div className="services-faq-wrap">
                        <div className="services-faq-head v2-reveal">
                            <span className="services-section-tag">#common questions</span>
                            <h2 className="services-section-title">
                                What most teams ask before they{" "}
                                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                    engage.
                                </em>
                            </h2>
                            <p className="services-section-sub">
                                Five questions that come up on almost every first call. Short, honest answers.
                            </p>
                        </div>
                        <ServicesFAQ />
                    </div>
                </div>
            </section>

            {/* ─── CTA BAND ─── */}
            <section className="cta-band">
                <div className="v2-wrap cta-inner-grid">
                    <div>
                        <h2 className="cta-heading">
                            Where are you on the maturity{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                curve?
                            </em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Thirty minutes with a senior consultant. We&rsquo;ll pressure-test where you are, where the value is, and whether we&rsquo;re the right team to help you get there.
                        </p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                            alignItems: "center",
                        }}
                    >
                        <Link
                            href="/contact?intent=discovery"
                            className="btn-cta-white"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Book a Discovery Call →
                        </Link>
                        <Link
                            href="/case-studies"
                            className="btn-cta-ghost"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            See our work →
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
