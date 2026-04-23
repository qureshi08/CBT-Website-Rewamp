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

type ContactFormProps = {
    intent?: string;
    defaultSubject?: string;
};

const subjects = [
    "Customer Enquiry",
    "ECL Calculator Demo",
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

export default function ContactForm({ intent, defaultSubject }: ContactFormProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        defaultValues: defaultSubject ? { subject: defaultSubject } : undefined,
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, intent }),
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
                <p className="text-text-muted max-w-md mx-auto leading-relaxed">
                    We&apos;ve received your message. Our consultants typically respond within 1 business day.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary mt-8"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-3xl p-8 md:p-12 border border-border/40 shadow-xl shadow-primary/5 font-body"
        >
            <div className="space-y-12">
                {/* Basic Info Group */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4 pb-3 border-b border-border/40">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                        <h3 className="font-bold text-text-heading uppercase tracking-widest text-xs">Basic info</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="form-label">Full Name *</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                className="form-input"
                                placeholder="Jane Smith"
                            />
                            {errors.name && <p className="text-xs text-error mt-2">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="form-label">Company *</label>
                            <input
                                {...register("company", { required: "Company is required" })}
                                className="form-input"
                                placeholder="Organisation name"
                            />
                            {errors.company && <p className="text-xs text-error mt-2">{errors.company.message}</p>}
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
                            {errors.region && <p className="text-xs text-error mt-2">{errors.region.message}</p>}
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
                            {errors.industry && <p className="text-xs text-error mt-2">{errors.industry.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Contact Details Group */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4 pb-3 border-b border-border/40">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">2</span>
                        <h3 className="uppercase-label text-text-heading text-[10px]">Contact details</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                <p className="text-xs text-error mt-2">{errors.subject.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Message Group */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4 pb-3 border-b border-border/40">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">3</span>
                        <h3 className="uppercase-label text-text-heading text-[10px]">Message</h3>
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
                            <p className="text-xs text-error mt-2">{errors.message.message}</p>
                        )}
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full md:w-auto min-w-[220px] py-4 disabled:opacity-60"
                    >
                        {isSubmitting ? (
                            "Sending..."
                        ) : (
                            <>
                                Send Message
                                <Send size={18} />
                            </>
                        )}
                    </button>
                    <p className="text-[11px] text-text-muted mt-6 leading-relaxed italic max-w-lg">
                        * Respecting your privacy is our priority. Your contact details are only used to respond to your enquiry and are never shared with third parties.
                    </p>
                </div>
            </div>
        </form>
    );
}
