"use client";
import Link from "next/link";

export default function CtaBand() {
    return (
        <section className="cta-band">
            <div className="v2-wrap cta-inner-grid">
                <div>
                    <h2 className="cta-heading">
                        Ready to ship <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>outcomes?</em>
                    </h2>
                    <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                        Thirty minutes with a senior consultant. No pitch deck — we&apos;ll scope the problem, pressure-test the approach, and tell you whether we&apos;re the right team for it.
                    </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                    <Link href="/contact?intent=discovery" className="btn-cta-white" style={{ fontFamily: "var(--font-body)" }}>
                        Book a Discovery Call →
                    </Link>
                </div>
            </div>
        </section>
    );
}
