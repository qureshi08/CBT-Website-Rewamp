import Link from "next/link";

export default function Footer() {
    return (
        <>
            {/* CTA BAND */}
            <section className="bg-text-heading text-white py-16 px-8" id="contact">
                <div className="container-main p-0 max-w-[1160px] mx-auto grid lg:grid-cols-[1fr_auto] items-center gap-10 lg:gap-16">
                    <div>
                        <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.15] mb-4 tracking-[-0.02em]">
                            Ready to make your data work harder?
                        </h2>
                        <p className="text-base font-light text-white/70 max-w-[500px] leading-[1.6]">
                            Whether you're at the start of your data journey or scaling an existing capability, let's have a conversation.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                        <Link href="/contact" className="inline-flex items-center justify-center bg-white text-text-heading font-body text-[14px] font-semibold px-6 py-3.5 rounded-md transition-transform duration-200 hover:-translate-y-[2px]">
                            Start a conversation →
                        </Link>
                        <Link href="/cgap" className="inline-flex items-center justify-center bg-transparent text-white font-body text-[14px] font-medium px-4 py-3.5 border-b border-white/20 transition-colors duration-200 hover:text-primary hover:border-primary">
                            View our training programme →
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-surface pt-12 pb-8 px-8 border-t border-border">
                <div className="container-main p-0 max-w-[1160px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-[30px] h-[30px] bg-text-heading rounded-[6px] flex items-center justify-center relative overflow-hidden">
                            <span className="text-white font-mono text-[9px] relative z-10 mt-[2px]">CBT</span>
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                        </div>
                        <span className="font-body text-[13px] font-semibold text-text-heading">
                            Convergent Business Technologies
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        <Link href="/services" className="text-[13px] font-medium text-text-body hover:text-primary transition-colors">
                            Services
                        </Link>
                        <Link href="/cgap" className="text-[13px] font-medium text-text-body hover:text-primary transition-colors">
                            Training
                        </Link>
                        <Link href="/partners" className="text-[13px] font-medium text-text-body hover:text-primary transition-colors">
                            Partners
                        </Link>
                        <Link href="/contact" className="text-[13px] font-medium text-text-body hover:text-primary transition-colors">
                            Contact
                        </Link>
                    </div>

                    <div className="text-[11px] text-text-muted">
                        © {new Date().getFullYear()} CBT. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}
