import Link from "next/link";
import { GraduationCap, ArrowRight, Sparkles } from "lucide-react";

interface CGAPTeaserProps {
    batchCount?: number;
}

export default function CGAPTeaser({ batchCount = 28 }: CGAPTeaserProps) {
    return (
        <section className="bg-surface">
            <div className="container-main section-padding">
                <div className="relative bg-white rounded-[40px] p-10 md:p-16 border border-border/40 overflow-hidden shadow-xl shadow-black/5">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10" />
                    <GraduationCap size={200} className="absolute -bottom-10 -right-10 text-primary opacity-5 -rotate-12" />

                    <div className="relative grid md:grid-cols-2 gap-12 items-center">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-primary-muted text-primary flex items-center justify-center">
                                    <GraduationCap size={22} />
                                </div>
                                <span className="uppercase-label text-primary">
                                    Graduate Academy
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-6 font-heading tracking-tight leading-tight">
                                Launch Your <br /> <span className="italic-accent text-primary">Data Career</span>
                            </h2>
                            <p className="text-lg text-text-body/70 leading-relaxed mb-10 font-body">
                                Our 6-month paid academy bridges the gap between academia and
                                industry. Join the next batch of professionals and master
                                analytics consulting.
                            </p>
                            <Link
                                href="/cgap"
                                className="btn-primary py-4 px-10 text-lg"
                            >
                                Explore the Program
                                <ArrowRight size={20} />
                            </Link>
                        </div>

                        <div className="flex justify-center md:justify-end">
                            <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                                {[
                                    { number: `${batchCount}+`, label: "Batches" },
                                    { number: "6", label: "Months" },
                                    { number: "100%", label: "Paid" },
                                    { number: "∞", label: "Potential" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="bg-surface rounded-3xl p-6 text-center border border-border/30 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="text-2xl font-bold text-primary font-heading mb-1">
                                            {item.number}
                                        </div>
                                        <div className="uppercase-label text-[9px] text-text-body/50 font-bold">
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
