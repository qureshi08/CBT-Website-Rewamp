"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface PartnerFormData {
    company: string;
    contactName: string;
    email: string;
    region: string;
    industry: string;
    partnershipType: string;
    message: string;
}

const regions = [
    "Middle East",
    "Pakistan",
    "Europe",
    "North America",
    "Asia Pacific",
    "Africa",
    "Other",
];

const industries = [
    "FMCG",
    "Financial Services",
    "Retail",
    "Manufacturing",
    "Technology",
    "Healthcare",
    "Energy",
    "Other",
];

export default function PartnerForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PartnerFormData>();

    const onSubmit = async (data: PartnerFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const res = await fetch("/api/partner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsSubmitted(true);
                reset();
            } else {
                const body = await res.json().catch(() => ({}));
                setSubmitError(body?.error || "Something went wrong. Please try again.");
            }
        } catch {
            setSubmitError("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="cta-form-success" role="status">
                <div className="cta-form-success-title">Thanks — enquiry received.</div>
                <p className="cta-form-success-body">
                    Our partnership team will reach out within one business day to schedule the intro call.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="cta-form" noValidate>
            <div className="cta-form-row">
                <label className="cta-form-field">
                    <span className="cta-form-label">Contact name</span>
                    <input
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        {...register("contactName", { required: "Contact name is required" })}
                    />
                    {errors.contactName && (
                        <span className="cta-form-field-err">{errors.contactName.message}</span>
                    )}
                </label>
                <label className="cta-form-field">
                    <span className="cta-form-label">Work email</span>
                    <input
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <span className="cta-form-field-err">{errors.email.message}</span>
                    )}
                </label>
            </div>

            <div className="cta-form-row">
                <label className="cta-form-field">
                    <span className="cta-form-label">Company</span>
                    <input
                        type="text"
                        autoComplete="organization"
                        placeholder="Organisation"
                        {...register("company", { required: "Company is required" })}
                    />
                    {errors.company && (
                        <span className="cta-form-field-err">{errors.company.message}</span>
                    )}
                </label>
                <label className="cta-form-field">
                    <span className="cta-form-label">Partnership type</span>
                    <select {...register("partnershipType", { required: "Select a type" })}>
                        <option value="">Select type…</option>
                        <option value="technology">Technology Partner</option>
                        <option value="delivery">Delivery Partner</option>
                        <option value="referral">Referral Partner</option>
                    </select>
                    {errors.partnershipType && (
                        <span className="cta-form-field-err">{errors.partnershipType.message}</span>
                    )}
                </label>
            </div>

            <div className="cta-form-row">
                <label className="cta-form-field">
                    <span className="cta-form-label">Region</span>
                    <select {...register("region", { required: "Select a region" })}>
                        <option value="">Select region…</option>
                        {regions.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                    {errors.region && (
                        <span className="cta-form-field-err">{errors.region.message}</span>
                    )}
                </label>
                <label className="cta-form-field">
                    <span className="cta-form-label">Industry</span>
                    <select {...register("industry", { required: "Select an industry" })}>
                        <option value="">Select industry…</option>
                        {industries.map((i) => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                    {errors.industry && (
                        <span className="cta-form-field-err">{errors.industry.message}</span>
                    )}
                </label>
            </div>

            <label className="cta-form-field">
                <span className="cta-form-label">
                    Message <span className="cta-form-label-optional">(optional)</span>
                </span>
                <textarea
                    rows={2}
                    placeholder="Briefly describe your interest…"
                    {...register("message")}
                />
            </label>

            {submitError && (
                <div className="cta-form-error" role="alert">{submitError}</div>
            )}

            <button
                type="submit"
                className="btn-cta-white cta-form-submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Sending…" : "Arrange a Call"}
                {!isSubmitting && <span aria-hidden>→</span>}
            </button>
        </form>
    );
}
