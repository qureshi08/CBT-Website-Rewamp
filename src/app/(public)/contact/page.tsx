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
        <div className="font-body">
            {/* Hero */}
            <section className="bg-white pt-[68px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 -z-10" />

                <div className="container-main py-12 md:py-16">
                    <div className="max-w-2xl">
                        <span className="uppercase-label text-primary mb-6 inline-block border-b border-primary/30 pb-1">
                            Partner with Us
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-text-heading leading-[1.1] font-heading tracking-tight">
                            Let&apos;s Start a <span className="italic-accent text-primary">Conversation.</span>
                        </h1>
                        <p className="mt-6 text-base md:text-lg text-text-body/80 leading-relaxed max-w-xl font-normal font-body">
                            Whether you&apos;re looking to transform your data architecture,
                            explore a partnership, or join our talent pipeline — we&apos;re here to help.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-surface relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-[300px] bg-white -z-10" />

                <div className="container-main py-16">
                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-1">
                            <h2 className="text-2xl font-bold text-text-heading mb-8 font-heading">
                                Why Contact Us?
                            </h2>

                            <div className="space-y-8 font-body">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-primary-muted text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-heading text-base font-heading">
                                            Quick Response
                                        </h3>
                                        <p className="text-[13px] text-text-body/70 mt-1 leading-relaxed">
                                            Our consultants typically respond within 1 business day.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-primary-muted text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-heading text-base font-heading">
                                            Global Delivery
                                        </h3>
                                        <p className="text-[13px] text-text-body/70 mt-1 leading-relaxed">
                                            Based in Islamabad, Pakistan, delivering for brands worldwide.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-primary-muted text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-heading text-base font-heading">
                                            Direct Message
                                        </h3>
                                        <p className="text-[13px] text-text-body/70 mt-1 leading-relaxed">
                                            Use the form to send a direct message to our support and team.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-6 bg-white border border-border/60 rounded-2xl relative overflow-hidden shadow-lg shadow-black/5">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                                <p className="text-sm text-text-body/80 italic leading-relaxed relative z-10 font-body">
                                    &ldquo;CBT helped us transform our reporting architecture in weeks, not months. Highly recommend their responsive team.&rdquo;
                                </p>
                                <div className="mt-6 flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-primary-muted flex items-center justify-center text-primary font-bold text-[9px]">EP</div>
                                    <p className="uppercase-label text-[9px] text-text-heading">Executive Partner, FMCG Client</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="lg:col-span-2">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="contact" />
        </div>
    );
}
