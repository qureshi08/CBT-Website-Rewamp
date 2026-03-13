export default function Testimonials() {
    return (
        <section className="bg-white py-16 px-8" id="case-studies">
            <div className="container-main p-0 max-w-[1160px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 mb-10">
                    <div>
                        <span className="section-tag animate-fade-in block mb-3">Client stories</span>
                        <h2 className="section-heading animate-fade-up animation-delay-100">
                            Don't take our word for it
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                    <div className="bg-surface rounded-2xl p-8 flex flex-col items-start animate-fade-up">
                        <div className="font-heading text-5xl leading-[0.5] text-primary mb-4">"</div>
                        <p className="text-[15px] font-medium leading-[1.65] text-text-heading mb-8 flex-grow">
                            CBT helped us build a data infrastructure we should have had five years ago. Within three months, our ops team was making decisions from live dashboards rather than week-old spreadsheets.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-text-heading border border-border shadow-sm">
                                SO
                            </div>
                            <div>
                                <div className="text-sm font-bold text-text-heading">Sarah Okonkwo</div>
                                <div className="text-[11px] text-text-muted">CTO, NovaTech Solutions</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary rounded-2xl p-8 flex flex-col items-start text-white shadow-[0_12px_40px_rgba(0,153,77,0.15)] animate-fade-up animation-delay-100">
                        <div className="font-heading text-5xl leading-[0.5] text-white/50 mb-4">"</div>
                        <p className="text-[15px] font-medium leading-[1.65] mb-8 flex-grow">
                            The team made our AWS migration feel effortless. Complex architecture decisions were explained clearly, timelines were kept, and the end result exceeded what we thought was possible.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white border border-white/20">
                                MK
                            </div>
                            <div>
                                <div className="text-sm font-bold">Marcus Kwame</div>
                                <div className="text-[11px] text-white/70">Head of Engineering, PulseHR</div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-surface rounded-2xl p-8 flex flex-col items-start animate-fade-up animation-delay-200">
                        <div className="font-heading text-5xl leading-[0.5] text-primary mb-4">"</div>
                        <p className="text-[15px] font-medium leading-[1.65] text-text-heading mb-8 flex-grow">
                            As a startup, we weren't sure where to start with AI. CBT helped us identify the right use cases, build quickly, and avoid the expensive mistakes we'd have made alone.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-text-heading border border-border shadow-sm">
                                JA
                            </div>
                            <div>
                                <div className="text-sm font-bold text-text-heading">Jamie Adeyemi</div>
                                <div className="text-[11px] text-text-muted">CEO, Rootly AI</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
