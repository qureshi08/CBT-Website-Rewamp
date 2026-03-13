"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PartnerFormData>();

    const onSubmit = async (data: PartnerFormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/partner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsSubmitted(true);
                reset();
            }
        } catch {
            // handle error silently
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl border border-border/50 shadow-sm font-body">
                <CheckCircle2 size={56} className="text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-text-heading mb-3 font-heading">Thank You!</h3>
                <p className="text-text-body/70 max-w-sm mx-auto leading-relaxed">
                    We&apos;ve received your interest. Our partnership team will reach out to schedule your introductory call within 1 business day.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary mt-8"
                >
                    Send Another Request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 font-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label className="form-label">Contact Name *</label>
                    <input
                        {...register("contactName", {
                            required: "Contact name is required",
                        })}
                        className="form-input"
                        placeholder="Jane Smith"
                    />
                    {errors.contactName && (
                        <p className="text-xs text-error mt-2">{errors.contactName.message}</p>
                    )}
                </div>
                <div>
                    <label className="form-label">Company *</label>
                    <input
                        {...register("company", { required: "Company name is required" })}
                        className="form-input"
                        placeholder="Organisation"
                    />
                    {errors.company && (
                        <p className="text-xs text-error mt-2">{errors.company.message}</p>
                    )}
                </div>
                <div>
                    <label className="form-label">Work Email *</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                            },
                        })}
                        className="form-input"
                        placeholder="jane@company.com"
                    />
                    {errors.email && <p className="text-xs text-error mt-2">{errors.email.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label className="form-label">Region *</label>
                    <select
                        {...register("region", { required: "Select region" })}
                        className="form-input"
                    >
                        <option value="">Select region...</option>
                        {regions.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                    {errors.region && <p className="text-xs text-error mt-2">{errors.region.message}</p>}
                </div>
                <div>
                    <label className="form-label">Industry *</label>
                    <select
                        {...register("industry", { required: "Select industry" })}
                        className="form-input"
                    >
                        <option value="">Select industry...</option>
                        {industries.map((i) => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                    {errors.industry && <p className="text-xs text-error mt-2">{errors.industry.message}</p>}
                </div>
                <div>
                    <label className="form-label">Partnership Type *</label>
                    <select
                        {...register("partnershipType", {
                            required: "Select a type",
                        })}
                        className="form-input"
                    >
                        <option value="">Select type...</option>
                        <option value="technology">Technology Partner</option>
                        <option value="delivery">Delivery Partner</option>
                        <option value="referral">Referral Partner</option>
                    </select>
                    {errors.partnershipType && (
                        <p className="text-xs text-error mt-2">{errors.partnershipType.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="form-label">Message / How can we collaborate?</label>
                <textarea
                    {...register("message")}
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Briefly describe your interest..."
                />
            </div>

            <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full md:w-auto min-w-[220px] py-4 disabled:opacity-60"
                >
                    {isSubmitting ? "Sending..." : "Arrange a Call"}
                    {!isSubmitting && <ArrowRight size={18} />}
                </button>
                <p className="text-[11px] text-text-body/60 italic leading-relaxed max-w-sm text-center md:text-right">
                    * Your information will be shared with our internal partnership team only.
                    We respect your privacy and never share details publicly.
                </p>
            </div>
        </form>
    );
}
