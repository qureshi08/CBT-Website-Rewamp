import Link from "next/link";
import type { Metadata } from "next";
import CapabilityTile from "@/components/services/CapabilityTile";
import ToolsStrip from "@/components/services/ToolsStrip";
import { createClient } from "@/lib/supabase/server";
import type { IconName } from "@/components/shared/Icons";

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

            {(["strategy", "foundations", "intelligence"] as const).map((key) => {
                const meta = SECTION_META[key];
                const tiles = sections[key];
                if (tiles.length === 0) return null;
                return (
                    <section key={key} id={key} className={meta.sectionClass}>
                        <div className="v2-wrap">
                            <div className="services-section-head v2-reveal">
                                <span className="services-section-tag">{meta.tag}</span>
                                <h2 className="services-section-title">{meta.title}</h2>
                                <p className="services-section-sub">{meta.sub}</p>
                            </div>

                            <div className={meta.gridClass}>
                                {tiles.map((t) => (
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
                );
            })}

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
                    <div className="services-partners-head">
                        <span className="section-tag" style={{ marginBottom: 0 }}>
                            Partner ecosystem
                        </span>
                        <p className="services-partners-sub">
                            Tiered alliances that back our delivery. We earn these; we don&rsquo;t badge-collect.
                        </p>
                    </div>
                    <div className="services-partners-row">
                        <span className="services-partner-badge">Microsoft</span>
                        <span className="services-partner-badge">Snowflake</span>
                        <span className="services-partner-badge">KPMG</span>
                        <span className="services-partner-badge">OpenAI</span>
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
