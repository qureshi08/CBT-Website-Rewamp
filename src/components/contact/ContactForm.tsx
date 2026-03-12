"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2 } from "lucide-react";

interface ContactFormData {
    name: string;
    email: string;
    company: string;
    region: string;
    industry: string;
    subject: string;
    message: string;
}

const subjects = [
    "Customer Enquiry",
    "Partnership (Arrange a Call)",
    "Product Support",
    "CGAP Query",
    "Other",
];

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

export default function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
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
            <div className="text-center py-16 bg-white rounded-2xl border border-border/50 shadow-sm">
                <CheckCircle2 size={48} className="text-persona-customer mx-auto mb-4" />
                <h3 className="text-xl font-bold text-charcoal mb-2">Thank You!</h3>
                <p className="text-mid-grey max-w-md mx-auto">
                    We&apos;ve received your message. Our team will get back to you shortly.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-outline mt-6"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl p-6 md:p-10 border border-border/50 shadow-sm"
        >
            <div className="space-y-10">
                {/* Basic Info Group */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                        <span className="w-6 h-6 rounded-full bg-persona-customer/10 text-persona-customer flex items-center justify-center text-xs font-bold">1</span>
                        <h3 className="font-bold text-charcoal uppercase tracking-wider text-sm">Basic info</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="form-label">Full Name *</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                className="form-input"
                                placeholder="Your full name"
                            />
                            {errors.name && <p className="form-error">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="form-label">Company *</label>
                            <input
                                {...register("company", { required: "Company is required" })}
                                className="form-input"
                                placeholder="Organisation name"
                            />
                            {errors.company && <p className="form-error">{errors.company.message}</p>}
                        </div>
                        <div>
                            <label className="form-label">Region *</label>
                            <select
                                {...register("region", { required: "Select a region" })}
                                className="form-input"
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
                                {...register("industry", { required: "Select an industry" })}
                                className="form-input"
                            >
                                <option value="">Select industry...</option>
                                {industries.map((i) => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                            {errors.industry && <p className="form-error">{errors.industry.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Contact Details Group */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                        <span className="w-6 h-6 rounded-full bg-persona-customer/10 text-persona-customer flex items-center justify-center text-xs font-bold">2</span>
                        <h3 className="font-bold text-charcoal uppercase tracking-wider text-sm">Contact details</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                                placeholder="you@company.com"
                            />
                            {errors.email && <p className="form-error">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="form-label">Subject *</label>
                            <select
                                {...register("subject", { required: "Select a subject" })}
                                className="form-input"
                            >
                                <option value="">Select a topic...</option>
                                {subjects.map((subject) => (
                                    <option key={subject} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                            {errors.subject && (
                                <p className="form-error">{errors.subject.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Message Group */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                        <span className="w-6 h-6 rounded-full bg-persona-customer/10 text-persona-customer flex items-center justify-center text-xs font-bold">3</span>
                        <h3 className="font-bold text-charcoal uppercase tracking-wider text-sm">Message</h3>
                    </div>

                    <div>
                        <label className="form-label">How can we help? *</label>
                        <textarea
                            {...register("message", { required: "Message is required" })}
                            rows={5}
                            className="form-input resize-none"
                            placeholder="Tell us about your project or enquiry..."
                        />
                        {errors.message && (
                            <p className="form-error">{errors.message.message}</p>
                        )}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary min-w-[200px] disabled:opacity-60"
                    >
                        {isSubmitting ? (
                            "Sending..."
                        ) : (
                            <>
                                Send Message
                                <Send size={16} />
                            </>
                        )}
                    </button>
                    <p className="text-[11px] text-mid-grey mt-4 leading-relaxed italic">
                        * We value your privacy. Your contact details are only used for the purpose of responding to your enquiry and are never shared publicly.
                    </p>
                </div>
            </div>
        </form>
    );
}
