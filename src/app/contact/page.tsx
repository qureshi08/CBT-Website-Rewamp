import { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
    title: "Contact Us | CBT — Convergent Business Technologies",
    description:
        "Get in touch with CBT. We help organisations turn their data into competitive advantage. Offices in Islamabad, Pakistan.",
};

import PersonaBridge from "@/components/shared/PersonaBridge";

export default function ContactPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-white pt-[72px]">
                <div className="container-main py-20 md:py-28">
                    <div className="max-w-3xl">
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
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
                                Why Contact Us?
                            </h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-tag-bg flex items-center justify-center shrink-0">
                                        <Clock size={20} className="text-green-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-charcoal text-base">
                                            Quick Response
                                        </h3>
                                        <p className="text-sm text-mid-grey mt-1">
                                            Our consultants typically respond within 1 business day.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-tag-bg flex items-center justify-center shrink-0">
                                        <MapPin size={20} className="text-green-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-charcoal text-base">
                                            Global Delivery
                                        </h3>
                                        <p className="text-sm text-mid-grey mt-1">
                                            Based in Islamabad, Pakistan, delivering for brands worldwide.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-tag-bg flex items-center justify-center shrink-0">
                                        <Mail size={20} className="text-green-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-charcoal text-base">
                                            Direct Message
                                        </h3>
                                        <p className="text-sm text-mid-grey mt-1">
                                            Use the form to send a direct message to our support and consultancy team.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-6 bg-white rounded-2xl border border-border/50">
                                <p className="text-sm text-mid-grey italic leading-relaxed">
                                    &ldquo;CBT helped us transform our reporting architecture in weeks, not months. Highly recommend their responsive team.&rdquo;
                                </p>
                                <p className="text-xs font-bold text-charcoal mt-4">— Executive Partner, FMCG Client</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-green-primary/5 border border-border/40">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="contact" />
        </>
    );
}
