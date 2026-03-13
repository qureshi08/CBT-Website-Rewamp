import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <>
            {/* CTA BAND */}
            <section className="cta-band" id="contact">
                <div className="container-main p-0 max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_auto] items-center gap-10 lg:gap-20 relative z-10">
                    <div>
                        <h2 className="cta-heading">
                            Ready to make your data{" "}
                            <span className="font-heading italic text-white">work harder?</span>
                        </h2>
                        <p className="cta-sub">
                            Whether you&apos;re at the start of your data journey or scaling an existing capability, let&apos;s have a conversation.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0 lg:items-center">
                        <Link href="/contact" className="btn-cta-white">
                            Start a conversation
                            <ArrowRight size={16} />
                        </Link>
                        <Link href="/cgap" className="inline-flex items-center justify-center bg-transparent text-white/60 font-body text-[14px] font-medium px-2 py-2 border-b border-white/20 transition-colors duration-200 hover:text-white hover:border-white gap-2">
                            View our training programme
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-text-heading py-[48px] px-8 border-t-[3px] border-primary">
                <div className="container-main p-0 max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Left: Logo + Name */}
                        <div className="flex items-center gap-3">
                            <div className="w-[32px] h-[32px] bg-primary rounded-[6px] flex items-center justify-center relative overflow-hidden">
                                <span className="text-white font-mono text-[10px] font-bold relative z-10">CBT</span>
                            </div>
                            <span className="font-body text-[14px] font-semibold text-white">
                                Convergent Business Technologies
                            </span>
                        </div>

                        {/* Center: Nav Links */}
                        <div className="flex flex-wrap justify-center gap-8">
                            <Link href="/" className="text-[13px] font-medium text-white/50 hover:text-primary transition-colors">
                                Home
                            </Link>
                            <Link href="/customers" className="text-[13px] font-medium text-white/50 hover:text-primary transition-colors">
                                Customers
                            </Link>
                            <Link href="/partners" className="text-[13px] font-medium text-white/50 hover:text-primary transition-colors">
                                Partners
                            </Link>
                            <Link href="/products" className="text-[13px] font-medium text-white/50 hover:text-primary transition-colors">
                                Products
                            </Link>
                            <Link href="/contact" className="text-[13px] font-medium text-white/50 hover:text-primary transition-colors">
                                Contact
                            </Link>
                        </div>

                        {/* Right: Email */}
                        <a href="mailto:admin@convergentbt.com" className="inline-flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-primary transition-colors">
                            <Mail size={14} />
                            admin@convergentbt.com
                        </a>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-[12px] text-white/30 font-body">
                            © {new Date().getFullYear()} Convergent Business Technologies. All rights reserved.
                        </p>
                        <p className="text-[12px] text-white/30 font-body">
                            Data · Cloud · AI Consultancy
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
