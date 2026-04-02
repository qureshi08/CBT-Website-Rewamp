"use client";
import Link from "next/link";

export default function CtaBand() {
    return (
        <section className="cta-band">
            <div className="v2-wrap cta-inner-grid">
                <div>
                    <h2 className="cta-heading">
                        Ready to make your data <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>work harder?</em>
                    </h2>
                    <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                        Whether you&apos;re at the start of your data journey or scaling an existing capability, let&apos;s have a conversation.
                    </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                    <Link href="/contact" className="btn-cta-white" style={{ fontFamily: "var(--font-body)" }}>
                        Start a conversation →
                    </Link>

                </div>
            </div>
        </section>
    );
}
