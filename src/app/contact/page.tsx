"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Mail,
    MapPin,
    Clock,
    ArrowRight,
    CheckCircle2,
    Send,
} from "lucide-react";

interface ContactFormData {
    name: string;
    email: string;
    company: string;
    subject: string;
    message: string;
}

const subjects = [
    "Customer Enquiry",
    "Partnership",
    "Product",
    "CGAP",
    "Other",
];

export default function ContactPage() {
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
            // handle silently for Phase 1
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Hero */}
            <section className="bg-white pt-[72px]">
                <div className="container-main py-20 md:py-28">
                    <div className="max-w-3xl">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            Contact
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                            Let&apos;s Start a{" "}
                            <span className="italic-accent">Conversation</span>
                        </h1>
                        <p className="mt-6 text-lg text-mid-grey leading-relaxed max-w-2xl">
                            Whether you&apos;re a potential client, partner, product user, or
                            CGAP applicant — we&apos;d love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1">
                            <h2 className="text-xl font-bold text-charcoal mb-6">
                                Get in Touch
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-tag-bg flex items-center justify-center shrink-0">
                                        <Mail size={18} className="text-green-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-charcoal text-sm">
                                            Email
                                        </h3>
                                        <a
                                            href="mailto:admin@convergentbt.com"
                                            className="text-sm text-mid-grey hover:text-green-primary transition-colors"
                                        >
                                            admin@convergentbt.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-tag-bg flex items-center justify-center shrink-0">
                                        <MapPin size={18} className="text-green-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-charcoal text-sm">
                                            Location
                                        </h3>
                                        <p className="text-sm text-mid-grey">
                                            Islamabad, Pakistan
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-tag-bg flex items-center justify-center shrink-0">
                                        <Clock size={18} className="text-green-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-charcoal text-sm">
                                            Response Time
                                        </h3>
                                        <p className="text-sm text-mid-grey">
                                            We respond within 1 business day
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            {isSubmitted ? (
                                <div className="text-center py-16 bg-white rounded-2xl border border-border/50">
                                    <CheckCircle2
                                        size={48}
                                        className="text-green-primary mx-auto mb-4"
                                    />
                                    <h3 className="text-xl font-bold text-charcoal mb-2">
                                        Thank You!
                                    </h3>
                                    <p className="text-mid-grey max-w-md mx-auto">
                                        We&apos;ve received your message. Our team will get back to
                                        you within 1 business day.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="btn-outline mt-6"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="bg-white rounded-2xl p-6 md:p-8 border border-border/50"
                                >
                                    <h2 className="text-xl font-bold text-charcoal mb-6">
                                        Send Us a Message
                                    </h2>

                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="form-label">Full Name *</label>
                                                <input
                                                    {...register("name", {
                                                        required: "Name is required",
                                                    })}
                                                    className="form-input"
                                                    placeholder="Your full name"
                                                />
                                                {errors.name && (
                                                    <p className="form-error">{errors.name.message}</p>
                                                )}
                                            </div>
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
                                                {errors.email && (
                                                    <p className="form-error">{errors.email.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="form-label">Company</label>
                                                <input
                                                    {...register("company")}
                                                    className="form-input"
                                                    placeholder="Your company name"
                                                />
                                            </div>
                                            <div>
                                                <label className="form-label">Subject *</label>
                                                <select
                                                    {...register("subject", {
                                                        required: "Select a subject",
                                                    })}
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

                                        <div>
                                            <label className="form-label">Message *</label>
                                            <textarea
                                                {...register("message", {
                                                    required: "Message is required",
                                                })}
                                                rows={5}
                                                className="form-input resize-none"
                                                placeholder="Tell us about your needs..."
                                            />
                                            {errors.message && (
                                                <p className="form-error">{errors.message.message}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn-primary w-full sm:w-auto disabled:opacity-60"
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
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
