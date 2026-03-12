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
            <div className="text-center py-16 bg-tag-bg-purple rounded-2xl border border-persona-partner/20 shadow-sm">
                <CheckCircle2 size={48} className="text-persona-partner mx-auto mb-4" />
                <h3 className="text-xl font-bold text-charcoal mb-2">Registration Received!</h3>
                <p className="text-mid-grey max-w-sm mx-auto">
                    We&apos;ve received your interest. Our partnership team will reach out to schedule your introductory call shortly.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-persona-partner font-semibold hover:underline"
                >
                    Send Another Request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                    <label className="form-label">Contact Name *</label>
                    <input
                        {...register("contactName", {
                            required: "Contact name is required",
                        })}
                        className="form-input focus:border-persona-partner focus:ring-persona-partner/10"
                        placeholder="Your name"
                    />
                    {errors.contactName && (
                        <p className="form-error">{errors.contactName.message}</p>
                    )}
                </div>
                <div>
                    <label className="form-label">Company *</label>
                    <input
                        {...register("company", { required: "Company name is required" })}
                        className="form-input focus:border-persona-partner focus:ring-persona-partner/10"
                        placeholder="Organisation"
                    />
                    {errors.company && (
                        <p className="form-error">{errors.company.message}</p>
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
                        className="form-input focus:border-persona-partner focus:ring-persona-partner/10"
                        placeholder="you@company.com"
                    />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                    <label className="form-label">Region *</label>
                    <select
                        {...register("region", { required: "Select region" })}
                        className="form-input focus:border-persona-partner focus:ring-persona-partner/10"
                    >
                        <option value="">Select region...</option>
                        {regions.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                    {errors.region && <p className="form-error">{errors.region.message}</p>}
                </div>
                <div>
                    <label className="form-label">Industry *</label>
                    <select
                        {...register("industry", { required: "Select industry" })}
                        className="form-input focus:border-persona-partner focus:ring-persona-partner/10"
                    >
                        <option value="">Select industry...</option>
                        {industries.map((i) => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                    {errors.industry && <p className="form-error">{errors.industry.message}</p>}
                </div>
                <div>
                    <label className="form-label">Partnership Type *</label>
                    <select
                        {...register("partnershipType", {
                            required: "Select a type",
                        })}
                        className="form-input focus:border-persona-partner focus:ring-persona-partner/10"
                    >
                        <option value="">Select type...</option>
                        <option value="technology">Technology Partner</option>
                        <option value="delivery">Delivery Partner</option>
                        <option value="referral">Referral Partner</option>
                    </select>
                    {errors.partnershipType && (
                        <p className="form-error">{errors.partnershipType.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="form-label">Message / How can we collaborate?</label>
                <textarea
                    {...register("message")}
                    rows={4}
                    className="form-input resize-none focus:border-persona-partner focus:ring-persona-partner/10"
                    placeholder="Briefly describe your interest..."
                />
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 bg-persona-partner text-white font-bold px-8 py-4 rounded-lg hover:bg-persona-partner/90 transition-all disabled:opacity-60 shadow-lg shadow-persona-partner/20"
                >
                    {isSubmitting ? "Sending..." : "Arrange a Call"}
                    {!isSubmitting && <ArrowRight size={18} />}
                </button>
                <p className="text-[11px] text-mid-grey mt-4 italic">
                    * Your information will be shared with our internal partnership team only. No emails are shown publicly.
                </p>
            </div>
        </form>
    );
}
