"use client";
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function CtaBand() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [challenge, setChallenge] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (status === "submitting") return;
        setStatus("submitting");
        setErrorMsg(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    company: company.trim() || undefined,
                    subject: "Data challenge — homepage CTA",
                    message: challenge.trim(),
                    intent: "discovery",
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setErrorMsg(data?.error || "Something went wrong. Please try again.");
                setStatus("error");
                return;
            }
            setStatus("success");
        } catch {
            setErrorMsg("Network error. Please try again.");
            setStatus("error");
        }
    }

    return (
        <section className="cta-band">
            <div className="v2-wrap cta-band-grid">
                <div className="cta-band-intro">
                    <h2 className="cta-heading">
                        Ready to make your data {" "}
                        <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                            work harder?
                        </em>
                    </h2>
                    <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                        Thirty minutes with a senior consultant. No pitch deck — we&apos;ll scope the problem, pressure-test the approach, and tell you whether we&apos;re the right team for it.
                    </p>
                </div>

                <div className="cta-band-form-wrap">
                    {status === "success" ? (
                        <div className="cta-form-success" role="status">
                            <div className="cta-form-success-title">Thanks — message received.</div>
                            <p className="cta-form-success-body">
                                A senior consultant will reply within one business day.
                            </p>
                        </div>
                    ) : (
                        <form className="cta-form" onSubmit={onSubmit} noValidate>
                            <div className="cta-form-row">
                                <label className="cta-form-field">
                                    <span className="cta-form-label">Your name</span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        autoComplete="name"
                                        placeholder="Jane Doe"
                                    />
                                </label>
                                <label className="cta-form-field">
                                    <span className="cta-form-label">Work email</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        placeholder="you@company.com"
                                    />
                                </label>
                            </div>
                            <label className="cta-form-field">
                                <span className="cta-form-label">Company <span className="cta-form-label-optional">(optional)</span></span>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    autoComplete="organization"
                                    placeholder="Acme Bank"
                                    maxLength={120}
                                />
                            </label>
                            <label className="cta-form-field">
                                <span className="cta-form-label">What&apos;s the data challenge?</span>
                                <input
                                    type="text"
                                    value={challenge}
                                    onChange={(e) => setChallenge(e.target.value)}
                                    required
                                    placeholder="e.g. our Power BI stack is buckling under the book"
                                    maxLength={200}
                                />
                            </label>

                            {errorMsg && <div className="cta-form-error" role="alert">{errorMsg}</div>}

                            <button
                                type="submit"
                                className="btn-cta-white cta-form-submit"
                                disabled={status === "submitting"}
                            >
                                {status === "submitting" ? "Sending…" : "Send message"}
                                {status !== "submitting" && <span aria-hidden>→</span>}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
