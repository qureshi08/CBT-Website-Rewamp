import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import ClientReveal from "@/components/shared/ClientReveal";

export const metadata: Metadata = {
    title: "Privacy Policy | Convergent Business Technologies",
    description:
        "How Convergent Business Technologies collects, uses, and protects personal information when you use our services.",
};

const LAST_UPDATED = "November 21, 2024";

const bodyText: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 16.5,
    fontWeight: 350,
    lineHeight: 1.75,
    color: "var(--color-text-body)",
    margin: "0 0 16px",
};

const subHeading: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: "-0.005em",
    color: "var(--color-text-heading)",
    margin: "32px 0 12px",
};

const microHeading: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    color: "var(--color-primary)",
    margin: "26px 0 10px",
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

const definitionsList: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: "0",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 14,
};

const definitionItem: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: 16,
    fontWeight: 350,
    lineHeight: 1.7,
    color: "var(--color-text-body)",
    paddingLeft: 16,
    borderLeft: "2px solid var(--color-border)",
};

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

const linkStyle: React.CSSProperties = {
    color: "var(--color-primary)",
    textDecoration: "underline",
    textUnderlineOffset: 3,
    textDecorationColor: "rgba(0,153,77,0.35)",
};

export default function PrivacyPolicyPage() {
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
                        <Link href="/" className="case-study-breadcrumb-link">
                            ← Home
                        </Link>
                        <span className="case-study-breadcrumb-sep">/</span>
                        <span className="case-study-breadcrumb-current">Legal</span>
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
                            Legal · Privacy
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
                        Privacy{" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                            policy.
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
                        How Convergent Business Technologies collects, uses, and discloses information when you use our website and services — and the rights and protections that apply to you.
                    </p>
                </div>
            </section>

            {/* ─── INTERPRETATION & DEFINITIONS ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 01 · interpretation</span>
                        <h2 style={sectionTitleStyle}>
                            Words and what they{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                mean.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <p style={bodyText}>
                            Words with capitalised initials have the meanings defined below. The same definitions apply whether they appear in singular or plural form.
                        </p>

                        <ul style={definitionsList}>
                            <li style={definitionItem}>
                                <strong>Account</strong> — a unique account created for you to access our Service or parts of our Service.
                            </li>
                            <li style={definitionItem}>
                                <strong>Affiliate</strong> — an entity that controls, is controlled by, or is under common control with a party. &ldquo;Control&rdquo; means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for the election of directors or other managing authority.
                            </li>
                            <li style={definitionItem}>
                                <strong>Company</strong> (referred to as &ldquo;the Company&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo;, or &ldquo;Our&rdquo;) refers to Convergent Business Technologies, Islamabad, Pakistan.
                            </li>
                            <li style={definitionItem}>
                                <strong>Cookies</strong> — small files placed on your computer, mobile device, or any other device by a website, containing details of your browsing history on that website.
                            </li>
                            <li style={definitionItem}>
                                <strong>Country</strong> — Pakistan.
                            </li>
                            <li style={definitionItem}>
                                <strong>Device</strong> — any device that can access the Service, such as a computer, mobile phone, or tablet.
                            </li>
                            <li style={definitionItem}>
                                <strong>Personal Data</strong> — any information that relates to an identified or identifiable individual.
                            </li>
                            <li style={definitionItem}>
                                <strong>Service</strong> — refers to the Website.
                            </li>
                            <li style={definitionItem}>
                                <strong>Service Provider</strong> — any natural or legal person who processes data on behalf of the Company. This includes third-party companies or individuals employed to facilitate the Service, provide the Service on the Company&rsquo;s behalf, perform services related to the Service, or assist us in analysing how the Service is used.
                            </li>
                            <li style={definitionItem}>
                                <strong>Usage Data</strong> — data collected automatically, either generated by use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
                            </li>
                            <li style={definitionItem}>
                                <strong>Website</strong> — Convergent Business Technologies, accessible at{" "}
                                <a
                                    href="https://www.convergentbt.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={linkStyle}
                                >
                                    www.convergentbt.com
                                </a>
                                .
                            </li>
                            <li style={definitionItem}>
                                <strong>You</strong> — the individual accessing or using the Service, or the company or other legal entity on behalf of which such individual is accessing or using the Service.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ─── COLLECTING ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 02 · what we collect</span>
                        <h2 style={sectionTitleStyle}>
                            The data we{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                collect.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <h3 style={subHeading}>Personal data</h3>
                        <p style={bodyText}>
                            While using our Service, we may ask you to provide certain personally identifiable information that can be used to contact or identify you — including, but not limited to:
                        </p>
                        <ul style={ulStyle}>
                            <li style={liStyle}>Email address</li>
                            <li style={liStyle}>First and last name</li>
                            <li style={liStyle}>Usage Data</li>
                        </ul>

                        <h3 style={subHeading}>Usage data</h3>
                        <p style={bodyText}>
                            Usage Data is collected automatically when you use the Service. It may include your device&rsquo;s IP address, browser type and version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
                        </p>
                        <p style={bodyText}>
                            When you access the Service via a mobile device, we may collect certain information automatically — including the type of device, your mobile device&rsquo;s unique ID, IP address, mobile operating system, the type of mobile internet browser you use, and other unique identifiers.
                        </p>

                        <h3 style={subHeading}>Tracking technologies and cookies</h3>
                        <p style={bodyText}>
                            We use Cookies and similar tracking technologies to track activity on our Service and store certain information. Tracking technologies may include beacons, tags, and scripts to collect and analyse information and to improve our Service.
                        </p>
                        <ul style={ulStyle}>
                            <li style={liStyle}>
                                <strong>Cookies or browser cookies.</strong> Small files placed on your Device. You can instruct your browser to refuse all Cookies or to indicate when one is being sent — though refusing may limit parts of the Service.
                            </li>
                            <li style={liStyle}>
                                <strong>Web beacons.</strong> Small electronic files in sections of our Service and in our emails (also known as clear gifs, pixel tags, or single-pixel gifs) that allow us to count visits, track email opens, and gather related statistics.
                            </li>
                        </ul>
                        <p style={bodyText}>
                            Cookies can be either &ldquo;Persistent&rdquo; or &ldquo;Session&rdquo;. Persistent Cookies remain on your device when you go offline; Session Cookies are deleted as soon as you close the browser. We use both for the following purposes:
                        </p>

                        <h4 style={microHeading}>Necessary / essential cookies</h4>
                        <p style={bodyText}>
                            <strong>Session Cookies, administered by us.</strong> Essential to provide services available through the Website and to enable certain features. They authenticate users and prevent fraudulent use of accounts. Without them, the services you have requested cannot be provided.
                        </p>

                        <h4 style={microHeading}>Cookie acceptance cookies</h4>
                        <p style={bodyText}>
                            <strong>Persistent Cookies, administered by us.</strong> These identify whether users have accepted the use of cookies on the Website.
                        </p>

                        <h4 style={microHeading}>Functionality cookies</h4>
                        <p style={bodyText}>
                            <strong>Persistent Cookies, administered by us.</strong> These remember the choices you make when using the Website — such as login details or language preference — to provide a more personal experience and avoid you having to re-enter preferences each visit.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── HOW WE USE & SHARE ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 03 · how we use it</span>
                        <h2 style={sectionTitleStyle}>
                            Use, sharing, and{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                retention.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <h3 style={subHeading}>How we use your personal data</h3>
                        <p style={bodyText}>The Company may use Personal Data for the following purposes:</p>
                        <ul style={ulStyle}>
                            <li style={liStyle}>
                                <strong>To provide and maintain our Service</strong> — including monitoring usage of the Service.
                            </li>
                            <li style={liStyle}>
                                <strong>To manage your Account</strong> — including managing your registration as a user, which gives you access to functionalities available to registered users.
                            </li>
                            <li style={liStyle}>
                                <strong>For the performance of a contract</strong> — the development, compliance, and undertaking of any purchase contract for products, items, or services you have purchased through the Service.
                            </li>
                            <li style={liStyle}>
                                <strong>To contact you</strong> — by email, phone, SMS, or other electronic communication regarding updates, security notices, and informative communications related to functionalities, products, or contracted services.
                            </li>
                            <li style={liStyle}>
                                <strong>To send you news and offers</strong> about goods, services, and events similar to those you have already purchased or enquired about — unless you have opted out.
                            </li>
                            <li style={liStyle}>
                                <strong>To manage your requests</strong> — to attend to and process requests you make to us.
                            </li>
                            <li style={liStyle}>
                                <strong>For business transfers</strong> — to evaluate or conduct a merger, divestiture, restructuring, reorganisation, dissolution, or other sale of some or all of our assets.
                            </li>
                            <li style={liStyle}>
                                <strong>For other purposes</strong> — data analysis, identifying usage trends, measuring the effectiveness of campaigns, and improving the Service, products, marketing, and your experience.
                            </li>
                        </ul>

                        <h3 style={subHeading}>When we share personal information</h3>
                        <ul style={ulStyle}>
                            <li style={liStyle}>
                                <strong>With Service Providers</strong> — to monitor and analyse use of our Service and to contact you.
                            </li>
                            <li style={liStyle}>
                                <strong>For business transfers</strong> — in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition.
                            </li>
                            <li style={liStyle}>
                                <strong>With Affiliates</strong> — including our parent company, subsidiaries, joint venture partners, or other companies under common control with us. Affiliates are required to honour this Privacy Policy.
                            </li>
                            <li style={liStyle}>
                                <strong>With business partners</strong> — to offer you certain products, services, or promotions.
                            </li>
                            <li style={liStyle}>
                                <strong>With other users</strong> — when you share information or otherwise interact in public areas, that information may be viewed by all users and publicly distributed.
                            </li>
                            <li style={liStyle}>
                                <strong>With your consent</strong> — for any other purpose with your consent.
                            </li>
                        </ul>

                        <h3 style={subHeading}>Retention</h3>
                        <p style={bodyText}>
                            The Company retains your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
                        </p>
                        <p style={bodyText}>
                            Usage Data is generally retained for a shorter period — except when used to strengthen security or improve functionality, or when we are legally obligated to retain it for longer.
                        </p>

                        <h3 style={subHeading}>Transfer</h3>
                        <p style={bodyText}>
                            Your information, including Personal Data, is processed at the Company&rsquo;s operating offices and in any other place where the parties involved in the processing are located. This means it may be transferred to — and maintained on — computers located outside your state, province, country, or other governmental jurisdiction, where data protection laws may differ from yours.
                        </p>
                        <p style={bodyText}>
                            Your consent to this Privacy Policy, followed by your submission of information, represents your agreement to that transfer. The Company will take all steps reasonably necessary to ensure your data is treated securely — and no transfer will take place to an organisation or country unless adequate controls are in place.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── YOUR RIGHTS ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 04 · your rights</span>
                        <h2 style={sectionTitleStyle}>
                            Deletion, disclosure, and{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                security.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <h3 style={subHeading}>Delete your personal data</h3>
                        <p style={bodyText}>
                            You have the right to delete or request that we assist in deleting the Personal Data we have collected about you. Our Service may give you the ability to delete certain information about you from within the Service itself.
                        </p>
                        <p style={bodyText}>
                            You may update, amend, or delete your information at any time by signing in to your Account (if you have one) and visiting the account settings. You may also{" "}
                            <Link href="/contact" style={linkStyle}>
                                contact us
                            </Link>{" "}
                            to request access to, correct, or delete any personal information you have provided.
                        </p>
                        <p style={bodyText}>
                            Please note: we may need to retain certain information when we have a legal obligation or lawful basis to do so.
                        </p>

                        <h3 style={subHeading}>Disclosure</h3>

                        <h4 style={microHeading}>Business transactions</h4>
                        <p style={bodyText}>
                            If the Company is involved in a merger, acquisition, or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.
                        </p>

                        <h4 style={microHeading}>Law enforcement</h4>
                        <p style={bodyText}>
                            Under certain circumstances, the Company may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (such as a court or government agency).
                        </p>

                        <h4 style={microHeading}>Other legal requirements</h4>
                        <p style={bodyText}>
                            The Company may disclose your Personal Data in the good-faith belief that such action is necessary to:
                        </p>
                        <ul style={ulStyle}>
                            <li style={liStyle}>Comply with a legal obligation</li>
                            <li style={liStyle}>Protect and defend the rights or property of the Company</li>
                            <li style={liStyle}>Prevent or investigate possible wrongdoing in connection with the Service</li>
                            <li style={liStyle}>Protect the personal safety of users of the Service or the public</li>
                            <li style={liStyle}>Protect against legal liability</li>
                        </ul>

                        <h3 style={subHeading}>Security</h3>
                        <p style={bodyText}>
                            The security of your Personal Data is important to us — but no method of transmission over the Internet or method of electronic storage is 100% secure. While we use commercially acceptable means to protect your Personal Data, we cannot guarantee absolute security.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── CHILDREN'S PRIVACY ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 05 · children</span>
                        <h2 style={sectionTitleStyle}>
                            Children&rsquo;s{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                privacy.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <p style={bodyText}>
                            Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us — and if we become aware that we have collected Personal Data from anyone under 13 without verification of parental consent, we will take steps to remove that information from our servers.
                        </p>
                        <p style={bodyText}>
                            If we need to rely on consent as a legal basis for processing your information and your country requires consent from a parent, we may require your parent&rsquo;s consent before we collect and use that information.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── THIRD-PARTY LINKS & UPDATES ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 06 · external links & updates</span>
                        <h2 style={sectionTitleStyle}>
                            Third parties and{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                policy changes.
                            </em>
                        </h2>
                    </div>

                    <div className="v2-reveal" style={bodyContainer}>
                        <h3 style={subHeading}>Links to other websites</h3>
                        <p style={bodyText}>
                            Our Service may contain links to other websites that are not operated by us. If you click a third-party link, you will be directed to that third party&rsquo;s site. We strongly advise you to review the Privacy Policy of every site you visit.
                        </p>
                        <p style={bodyText}>
                            We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                        </p>

                        <h3 style={subHeading}>Changes to this Privacy Policy</h3>
                        <p style={bodyText}>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page — and let you know via email and/or a prominent notice on our Service before the change becomes effective, with the &ldquo;Last updated&rdquo; date refreshed accordingly.
                        </p>
                        <p style={bodyText}>
                            You are advised to review this Privacy Policy periodically for any changes. Changes are effective when they are posted on this page.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── CONTACT ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="v2-reveal" style={sectionHeadStyle}>
                        <span className="services-section-tag">section 07 · questions</span>
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
                            If you have any questions about this Privacy Policy, you can reach us directly:
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

                        <Link
                            href="/contact"
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
                                    fontFamily: "var(--font-body)",
                                    fontSize: 18,
                                    color: "var(--color-primary)",
                                }}
                            >
                                →
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
                                    Form
                                </span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: 16,
                                        fontWeight: 500,
                                        color: "var(--color-text-heading)",
                                    }}
                                >
                                    Use our contact form
                                </span>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
