import { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
    title: "Contact Us | CBT — Convergent Business Technologies",
    description:
        "Get in touch with CBT. We help organisations turn their data into competitive advantage. Offices in Islamabad, Pakistan.",
};

export default function ContactPage() {
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
                            Let&apos;s Start a <span className="italic-accent">Conversation</span>
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
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
