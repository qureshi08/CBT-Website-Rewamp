"use client";
import Ic from "@/components/shared/Icons";
import { useScrollReveal } from "@/components/home/Hero";
import type { IconName } from "@/components/shared/Icons";

type Credential = {
    icon: IconName;
    title: string;
    sub: string;
};

const credentials: Credential[] = [
    { icon: "shield", title: "AWS Certified", sub: "Certified consultants across AWS — the cloud foundation behind our data and analytics builds." },
    { icon: "award", title: "Microsoft Certified", sub: "Certified across Microsoft Fabric and Power BI — the stack powering most of our delivery." },
    { icon: "external", title: "AppSource Publisher", sub: "Custom Power BI visuals published to the Microsoft marketplace, downloaded by teams across the world." },
];

export default function CredentialsBar() {
    useScrollReveal();

    return (
        <section style={{ padding: "80px 32px", background: "var(--color-primary-muted)" }}>
            <div className="v2-wrap">
                <div className="v2-reveal" style={{ textAlign: "center", marginBottom: "36px" }}>
                    <p className="v2-lbl">Credentials</p>
                    <h2 className="v2-h3" style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)" }}>
                        The proof, not just the <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>pitch.</em>
                    </h2>
                </div>

                <div
                    className="home-persona-grid v2-reveal"
                    style={{ gap: "16px" }}
                >
                    {credentials.map((c) => (
                        <div
                            key={c.title}
                            style={{
                                background: "white",
                                border: "1px solid var(--color-border)",
                                borderRadius: "12px",
                                padding: "22px 24px",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                transition: "transform .22s, box-shadow .22s",
                            }}
                        >
                            <div
                                style={{
                                    flexShrink: 0,
                                    width: 44,
                                    height: 44,
                                    borderRadius: 10,
                                    background: "var(--color-primary-muted)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Ic name={c.icon} size={20} stroke="var(--color-primary)" />
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                        fontSize: "1.05rem",
                                        fontWeight: 700,
                                        color: "var(--color-text-heading)",
                                        lineHeight: 1.2,
                                        marginBottom: 4,
                                    }}
                                >
                                    {c.title}
                                </div>
                                <p
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "13px",
                                        lineHeight: 1.55,
                                        color: "var(--color-text-muted)",
                                    }}
                                >
                                    {c.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
