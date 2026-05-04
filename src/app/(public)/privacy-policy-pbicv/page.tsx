import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy · Power BI Custom Visuals | Convergent Business Technologies",
    description:
        "How CBT's Power BI custom visuals handle data. The visuals do not collect, store, transmit, or process personal data outside of the Power BI environment.",
};

const LAST_UPDATED = "January 20, 2026";

const h2: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 18,
    fontWeight: 600,
    color: "var(--color-text-heading)",
    margin: "24px 0 8px",
};

const p: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 16,
    fontWeight: 350,
    lineHeight: 1.65,
    color: "var(--color-text-body)",
    margin: "0 0 12px",
};

const ul: React.CSSProperties = {
    paddingLeft: 22,
    margin: "0 0 12px",
    fontFamily: "var(--font-body)",
    fontSize: 16,
    fontWeight: 350,
    lineHeight: 1.65,
    color: "var(--color-text-body)",
};

export default function PrivacyPolicyPbicvPage() {
    return (
        <main style={{ background: "#fff" }}>
            <article
                style={{
                    maxWidth: 720,
                    margin: "0 auto",
                    padding: "120px 24px 80px",
                }}
            >
                <Link
                    href="/cbt-custom-visuals"
                    style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: "var(--color-text-muted)",
                        textDecoration: "none",
                    }}
                >
                    ← Custom Visuals
                </Link>

                <h1
                    style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 26,
                        fontWeight: 600,
                        color: "var(--color-text-heading)",
                        margin: "16px 0 4px",
                        lineHeight: 1.3,
                    }}
                >
                    Privacy Policy &mdash; Power BI Custom Visuals
                </h1>
                <p
                    style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: "var(--color-text-muted)",
                        margin: "0 0 28px",
                    }}
                >
                    Last updated: {LAST_UPDATED}
                </p>

                <h2 style={h2}>Introduction</h2>
                <p style={p}>
                    This Privacy Policy describes how the CBT Power BI Custom Visuals handle data. The visuals are designed to respect user privacy and does not collect, store, transmit, or process personal data outside of the Power BI environment.
                </p>

                <h2 style={h2}>Data Collection</h2>
                <p style={p}>
                    The visuals do not collect or transmit any data to external servers, services, or third parties.
                </p>
                <p style={p}>All data used by the visuals is:</p>
                <ul style={ul}>
                    <li>Provided directly by Power BI at runtime</li>
                    <li>Processed locally within the Power BI client or service</li>
                    <li>Used solely for rendering and interaction purposes</li>
                </ul>

                <h2 style={h2}>Data Storage</h2>
                <p style={p}>The visuals do not store any data, including:</p>
                <ul style={ul}>
                    <li>Personal data</li>
                    <li>Usage data</li>
                    <li>Telemetry</li>
                    <li>Identifiers (such as IP addresses, user IDs, or device information)</li>
                </ul>

                <h2 style={h2}>Data Sharing</h2>
                <p style={p}>The visuals do not share data with:</p>
                <ul style={ul}>
                    <li>Third-party services</li>
                    <li>External APIs</li>
                    <li>Analytics or tracking platforms</li>
                </ul>

                <h2 style={h2}>Internet Connectivity</h2>
                <p style={p}>
                    The visual do not require internet access and does not make network calls of any kind.
                </p>

                <h2 style={h2}>Cookies and Tracking Technologies</h2>
                <p style={p}>
                    The visuals do not use cookies, local storage, session storage, or any tracking technologies.
                </p>

                <h2 style={h2}>Security</h2>
                <p style={p}>
                    All data remains within the Power BI environment and is subject to Microsoft&rsquo;s existing security, compliance, and governance controls.
                </p>
            </article>
        </main>
    );
}
