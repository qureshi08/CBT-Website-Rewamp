import { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import PersonaBridge from "@/components/shared/PersonaBridge";
import ClientReveal from "@/components/shared/ClientReveal";

export const metadata: Metadata = {
    title: "Contact Us | CBT — Convergent Business Technologies",
    description:
        "Get in touch with CBT. We help organisations turn their data into competitive advantage. Offices in Islamabad, Pakistan.",
};

type IntentKey = "ecl-demo" | "discovery" | "partnership" | "custom-visual";

type IntentCopy = {
    tag: string;
    titleLead: string;
    titleAccent: string;
    sub: string;
    defaultSubject: string;
};

const INTENT_COPY: Record<IntentKey, IntentCopy> = {
    "ecl-demo": {
        tag: "ECL Calculator · Demo Request",
        titleLead: "Let's run ECL against your",
        titleAccent: "book.",
        sub: "Thirty minutes with a senior consultant and a KPMG collaborator. We'll walk the methodology, map it to your portfolio, and tell you whether a pilot fits.",
        defaultSubject: "ECL Calculator Demo",
    },
    discovery: {
        tag: "Discovery Call",
        titleLead: "Book your Discovery",
        titleAccent: "Call.",
        sub: "Thirty minutes with a senior consultant. No pitch deck — we'll scope the problem, pressure-test the approach, and tell you whether we're the right team for it.",
        defaultSubject: "Customer Enquiry",
    },
    partnership: {
        tag: "Partnership Enquiry",
        titleLead: "Let's explore a",
        titleAccent: "partnership.",
        sub: "Tell us about your practice, geography and the kinds of engagements you take on. We'll come back with where we see fit — or where we don't.",
        defaultSubject: "Partnership (Arrange a Call)",
    },
    "custom-visual": {
        tag: "Power BI Custom Visuals",
        titleLead: "Get support for your",
        titleAccent: "Power BI visuals.",
        sub: "Have a question about our custom visuals, AppSource listings, or need help integrating them into your reports? Our Power BI team will get back to you.",
        defaultSubject: "Power BI Support",
    },
};

const DEFAULT_COPY: IntentCopy = {
    tag: "Get in touch",
    titleLead: "Let's start a",
    titleAccent: "conversation.",
    sub: "Whether you're scoping a data transformation, exploring a partnership, or joining our talent pipeline — tell us what you're chasing and we'll take it from there.",
    defaultSubject: "",
};

function resolveIntent(raw: string | string[] | undefined): IntentKey | null {
    if (typeof raw !== "string") return null;
    if (raw in INTENT_COPY) return raw as IntentKey;
    return null;
}

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ContactPage({ searchParams }: Props) {
    const params = await searchParams;
    const intent = resolveIntent(params.intent);
    const copy = intent ? INTENT_COPY[intent] : DEFAULT_COPY;

    return (
        <main>
            <ClientReveal />
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
                            {copy.tag}
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
                        {copy.titleLead}{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                            {copy.titleAccent}
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
                        {copy.sub}
                    </p>

                    <div
                        className="a-fadeUp-4"
                        style={{
                            display: "flex",
                            gap: 16,
                            marginTop: 32,
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        <Link href="#contact-form" className="hero-btn-primary">
                            Send a message <span>→</span>
                        </Link>
                        <Link href="/case-studies" className="hero-btn-secondary">
                            See our work <span className="hero-btn-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── FORM + SIDEBAR ─── */}
            <section id="contact-form" className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="contact-body-grid">
                        {/* Sidebar */}
                        <aside className="contact-sidebar v2-reveal">
                            <span className="services-section-tag">why contact us</span>
                            <h2 className="services-section-title" style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", marginBottom: 28 }}>
                                Straight to a{" "}
                                <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                    senior consultant.
                                </em>
                            </h2>

                            <div className="contact-feature-list">
                                <div className="contact-feature">
                                    <div className="contact-feature-icon">
                                        <Clock size={18} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="contact-feature-title">Quick response</h3>
                                        <p className="contact-feature-body">
                                            Our consultants typically respond within one business day.
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-feature">
                                    <div className="contact-feature-icon">
                                        <MapPin size={18} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="contact-feature-title">Global delivery</h3>
                                        <p className="contact-feature-body">
                                            Based in Islamabad, Pakistan, delivering for brands worldwide.
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-feature">
                                    <div className="contact-feature-icon">
                                        <Mail size={18} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="contact-feature-title">Direct message</h3>
                                        <p className="contact-feature-body">
                                            Use the form to reach the team handling your enquiry directly.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-quote-card">
                                <p className="contact-quote-text">
                                    &ldquo;CBT helped us transform our reporting architecture in weeks, not months. Highly recommend their responsive team.&rdquo;
                                </p>
                                <div className="contact-quote-meta">
                                    <div className="contact-quote-avatar">EP</div>
                                    <span className="contact-quote-byline">Executive Partner, FMCG Client</span>
                                </div>
                            </div>
                        </aside>

                        {/* Form */}
                        <div className="contact-form-col v2-reveal">
                            <ContactForm intent={intent ?? undefined} defaultSubject={copy.defaultSubject || undefined} />
                        </div>
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="contact" />
        </main>
    );
}
