"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface PartnerFormData {
    company: string;
    contactName: string;
    email: string;
    partnershipType: string;
    message: string;
}

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
            <div className="text-center py-12 bg-tag-bg rounded-2xl">
                <CheckCircle2 size={48} className="text-green-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-charcoal mb-2">Thank You!</h3>
                <p className="text-mid-grey">
                    We&apos;ve received your partner registration. Our team will reach out
                    within 1 business day.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="form-label">Company Name *</label>
                    <input
                        {...register("company", { required: "Company name is required" })}
                        className="form-input"
                        placeholder="Your company"
                    />
                    {errors.company && (
                        <p className="form-error">{errors.company.message}</p>
                    )}
                </div>
                <div>
                    <label className="form-label">Contact Name *</label>
                    <input
                        {...register("contactName", {
                            required: "Contact name is required",
                        })}
                        className="form-input"
                        placeholder="Your name"
                    />
                    {errors.contactName && (
                        <p className="form-error">{errors.contactName.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="form-label">Email *</label>
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
                        placeholder="you@company.com"
                    />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="form-label">Partnership Type *</label>
                    <select
                        {...register("partnershipType", {
                            required: "Select a partnership type",
                        })}
                        className="form-input"
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
                <label className="form-label">Message</label>
                <textarea
                    {...register("message")}
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Tell us about your organisation and partnership interests..."
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto disabled:opacity-60"
            >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
                {!isSubmitting && <ArrowRight size={16} />}
            </button>
        </form>
    );
}
