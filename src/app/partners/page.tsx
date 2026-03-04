"use client";

import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    Cpu,
    Truck,
    Share2,
    Users,
    Globe,
    Award,
    Target,
    CheckCircle2,
} from "lucide-react";
import { ClientLogoGrid } from "@/components/home/ClientLogoStrip";
import PersonaBridge from "@/components/shared/PersonaBridge";
import { useForm } from "react-hook-form";
import { useState } from "react";

const partnershipTypes = [
    {
        icon: Cpu,
        title: "Technology Partner",
        description:
            "Integrate your technology with our analytics expertise. Joint solutions for shared clients.",
    },
    {
        icon: Truck,
        title: "Delivery Partner",
        description:
            "Co-deliver engagements leveraging CBT's data domain expertise and your client relationships.",
    },
    {
        icon: Share2,
        title: "Referral Partner",
        description:
            "Refer opportunities and earn commission. Simple, transparent, and mutually beneficial.",
    },
];

const valueProps = [
    {
        icon: Users,
        title: "Deep Talent Pool",
        description: "30+ seasoned data consultants and a continuous CGAP pipeline.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        description:
            "Clients across FMCG, finance, retail, hospitality, and NGO sectors.",
    },
    {
        icon: Award,
        title: "Proven Specialisation",
        description: "Deep expertise in BI, data warehousing, and analytics.",
    },
    {
        icon: Target,
        title: "Track Record",
        description: "50+ clients served, 12+ CGAP cohorts, consistent delivery.",
    },
];

interface PartnerFormData {
    company: string;
    contactName: string;
    email: string;
    partnershipType: string;
    message: string;
}

export default function PartnersPage() {
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
                            Partners
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                            Deliver More,{" "}
                            <span className="italic-accent">Together</span>
                        </h1>
                        <p className="mt-6 text-lg text-mid-grey leading-relaxed max-w-2xl">
                            Join a growing ecosystem of technology and delivery partners.
                            Combine your strengths with our data expertise to deliver more
                            value to shared clients.
                        </p>
                    </div>
                </div>
            </section>

            {/* Partnership Models */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            Models
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            Partnership Models
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {partnershipTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                                <div
                                    key={type.title}
                                    className="bg-white rounded-xl p-6 border border-border/50 card-hover group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-tag-bg flex items-center justify-center mb-4 group-hover:bg-green-primary transition-colors duration-200">
                                        <Icon
                                            size={22}
                                            className="text-green-primary group-hover:text-white transition-colors duration-200"
                                        />
                                    </div>
                                    <h3 className="text-lg font-bold text-charcoal mb-2">
                                        {type.title}
                                    </h3>
                                    <p className="text-sm text-mid-grey leading-relaxed">
                                        {type.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Partner */}
            <section className="bg-white">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            Why Partner with CBT?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {valueProps.map((prop) => {
                            const Icon = prop.icon;
                            return (
                                <div key={prop.title} className="text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-tag-bg flex items-center justify-center mx-auto mb-4">
                                        <Icon size={24} className="text-green-primary" />
                                    </div>
                                    <h3 className="font-bold text-charcoal mb-2">{prop.title}</h3>
                                    <p className="text-sm text-mid-grey leading-relaxed">
                                        {prop.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Client Base */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            Our Client Base
                        </h2>
                        <p className="mt-3 text-mid-grey">
                            Join our ecosystem and access opportunities with these brands
                        </p>
                    </div>
                    <ClientLogoGrid featured />
                    <div className="text-center mt-8">
                        <Link
                            href="/customers"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-green-primary hover:gap-3 transition-all duration-200"
                        >
                            See All Clients
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Partner Registration Form */}
            <section className="bg-white" id="partner-form">
                <div className="container-main section-padding">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                                Get Started
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                                Register as a Partner
                            </h2>
                            <p className="mt-3 text-mid-grey">
                                Tell us about your organisation and how we can work together.
                            </p>
                        </div>

                        {isSubmitted ? (
                            <div className="text-center py-12 bg-tag-bg rounded-2xl">
                                <CheckCircle2
                                    size={48}
                                    className="text-green-primary mx-auto mb-4"
                                />
                                <h3 className="text-xl font-bold text-charcoal mb-2">
                                    Thank You!
                                </h3>
                                <p className="text-mid-grey">
                                    We&apos;ve received your partner registration. Our team will
                                    reach out within 1 business day.
                                </p>
                            </div>
                        ) : (
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
                                        {errors.email && (
                                            <p className="form-error">{errors.email.message}</p>
                                        )}
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
                                            <p className="form-error">
                                                {errors.partnershipType.message}
                                            </p>
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
                        )}
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="partners" />
        </>
    );
}
