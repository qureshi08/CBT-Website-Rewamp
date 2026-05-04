import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import ClientReveal from "@/components/shared/ClientReveal";

export const metadata: Metadata = {
    title: "Privacy Policy · Power BI Custom Visuals | Convergent Business Technologies",
    description:
        "How CBT's Power BI custom visuals handle data. The visuals do not collect, store, transmit, or process personal data outside of the Power BI environment.",
};

const LAST_UPDATED = "January 20, 2026";

const bodyText: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 16.5,
    fontWeight: 350,
    lineHeight: 1.75,
    color: "var(--color-text-body)",
    margin: "0 0 16px",
};

const ulStyle: React.CSSProperties = {
    paddingLeft: 22,
    margin: "0 0 16px",
    fontFamily: "var(--font-body)",
    fontSize: 16.5,
    fontWeight: 350,
    lineHeight: 1.75,
    color: "var(--color-text-body)",
};

const liStyle: React.CSSProperties = { marginBottom: 8 };

const sectionHeadStyle: React.CSSProperties = {
    maxWidth: 880,
    marginBottom: 32,
};

const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
    fontWeight: 600,
    color: "var(--color-text-heading)",
    letterSpacing: "-0.015em",
    lineHeight: 1.2,
    margin: "8px 0 0",
};

const bodyContainer: React.CSSProperties = {
    maxWidth: 780,
};

export default function PrivacyPolicyPbicvPage() {
    return (
        <main>
            <ClientReveal />

            {/* ─── HERO ─── */}
            <section
                className="hero-grid-texture"
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "140px 0 70px",
                    background: "#fff",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div className="v2-wrap" style={{ position: "relative", zIndex: 1, width: "100%" }}>
                    <nav
                        className="case-study-breadcrumb a-fadeUp-1"
                        aria-label="Breadcrumb"
                        style={{ marginBottom: 18 }}
                    >
                        <Link href="/cbt-custom-visuals" className="case-study-breadcrumb-link">
                            ← Custom Visuals
                        </Link>
                        <span className="case-study-breadcrumb-sep">/</span>
                        <span className="case-study-breadcrumb-current">Privacy</span>
                    </nav>

                    <div
                        className="a-fadeUp-1"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "var(--color-primary-muted)",
                            borderRadius: 20,
                            padding: "5px 13px",
                            marginBottom: 18,
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
                            Power BI · Custom Visuals
                        </span>
                    </div>

                    <h1
                        className="v2-h1 a-fadeUp-2"
                        style={{
                            fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
                            marginBottom: 16,
                            maxWidth: 880,
                        }}
                    >
                        Privacy Policy &mdash;{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                            Power BI Custom Visuals.
                        </em>
                    </h1>

                    <p
                        className="a-fadeUp-3"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            color: "var(--color-primary)",
                            margin: "0 0 14px",
                        }}
                    >
                        Last updated · {LAST_UPDATED}
                    </p>

                    <p
                        className="a-fadeUp-3"
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 18,
                            fontWeight: 350,
                            color: "#4B5563",
                            lineHeight: 1.7,
                            maxWidth: 720,
                            marginBottom: 4,
                        }}
                    >
                        How CBT&rsquo;s Power BI custom visuals handle data &mdash; and the boundaries we keep so nothing leaves the Power BI environment.
                    </p>
                </div>
            </section>

            {/* ─── INTRODUCTION ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 01 · introduction</span>
                        <h2 style={sectionTitleStyle}>
                            What this policy{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                covers.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <p style={bodyText}>
                            This Privacy Policy describes how the CBT Power BI Custom Visuals handle data. The visuals are designed to respect user privacy and does not collect, store, transmit, or process personal data outside of the Power BI environment.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── DATA COLLECTION ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 02 · data collection</span>
                        <h2 style={sectionTitleStyle}>
                            Data{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                collection.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <p style={bodyText}>
                            The visuals do not collect or transmit any data to external servers, services, or third parties.
                        </p>
                        <p style={bodyText}>All data used by the visuals is:</p>
                        <ul style={ulStyle}>
                            <li style={liStyle}>Provided directly by Power BI at runtime</li>
                            <li style={liStyle}>Processed locally within the Power BI client or service</li>
                            <li style={liStyle}>Used solely for rendering and interaction purposes</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ─── DATA STORAGE ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 03 · data storage</span>
                        <h2 style={sectionTitleStyle}>
                            Data{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                storage.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <p style={bodyText}>The visuals do not store any data, including:</p>
                        <ul style={ulStyle}>
                            <li style={liStyle}>Personal data</li>
                            <li style={liStyle}>Usage data</li>
                            <li style={liStyle}>Telemetry</li>
                            <li style={liStyle}>Identifiers (such as IP addresses, user IDs, or device information)</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ─── DATA SHARING ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 04 · data sharing</span>
                        <h2 style={sectionTitleStyle}>
                            Data{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                sharing.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <p style={bodyText}>The visuals do not share data with:</p>
                        <ul style={ulStyle}>
                            <li style={liStyle}>Third-party services</li>
                            <li style={liStyle}>External APIs</li>
                            <li style={liStyle}>Analytics or tracking platforms</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ─── INTERNET CONNECTIVITY ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 05 · internet connectivity</span>
                        <h2 style={sectionTitleStyle}>
                            Internet{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                connectivity.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <p style={bodyText}>
                            The visual do not require internet access and does not make network calls of any kind.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── COOKIES & TRACKING ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 06 · cookies & tracking</span>
                        <h2 style={sectionTitleStyle}>
                            Cookies and tracking{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                technologies.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <p style={bodyText}>
                            The visuals do not use cookies, local storage, session storage, or any tracking technologies.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── SECURITY ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 07 · security</span>
                        <h2 style={sectionTitleStyle}>
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                Security.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <p style={bodyText}>
                            All data remains within the Power BI environment and is subject to Microsoft&rsquo;s existing security, compliance, and governance controls.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── CONTACT ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">questions</span>
                        <h2 style={sectionTitleStyle}>
                            Get in{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                touch.
                            </em>
                        </h2>
                    </div>

                    <div
                        className="v2-reveal"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: 14,
                            maxWidth: 580,
                        }}
                    >
                        <p style={{ ...bodyText, marginBottom: 8 }}>
                            If you have any questions about how our Power BI custom visuals handle data, you can reach us directly:
                        </p>

                        <a
                            href="mailto:admin@convergentbt.com"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                                padding: "16px 20px",
                                background: "#fff",
                                border: "1px solid var(--color-border)",
                                borderRadius: 12,
                                textDecoration: "none",
                                transition: "border-color 160ms ease, transform 160ms ease",
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 36,
                                    height: 36,
                                    borderRadius: 10,
                                    background: "var(--color-primary-muted)",
                                    flexShrink: 0,
                                }}
                            >
                                <Mail size={18} strokeWidth={1.5} color="var(--color-primary)" />
                            </span>
                            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
                                <span
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 11,
                                        letterSpacing: ".08em",
                                        textTransform: "uppercase",
                                        color: "var(--color-primary)",
                                        marginBottom: 4,
                                    }}
                                >
                                    Email
                                </span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: 16,
                                        fontWeight: 500,
                                        color: "var(--color-text-heading)",
                                    }}
                                >
                                    admin@convergentbt.com
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
