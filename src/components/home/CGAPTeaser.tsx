import Link from "next/link";
import { GraduationCap, ArrowRight, Sparkles } from "lucide-react";

interface CGAPTeaserProps {
    cohortCount?: number;
}

export default function CGAPTeaser({ cohortCount = 28 }: CGAPTeaserProps) {
    return (
        <section className="bg-light-grey">
            <div className="container-main section-padding">
                <div className="relative bg-white rounded-2xl p-8 md:p-12 border border-border/50 overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-tag-bg to-transparent rounded-bl-full opacity-60" />

                    <div className="relative grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <GraduationCap size={20} className="text-green-primary" />
                                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-green-primary">
                                    Graduate Program
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
                                Convergent Graduate Academy Program
                            </h2>
                            <p className="text-mid-grey leading-relaxed mb-6">
                                A 6-month paid training program that bridges academia and
                                industry. Join the next cohort of data professionals and launch
                                your career in analytics consulting.
                            </p>
                            <Link
                                href="/cgap"
                                className="btn-primary inline-flex"
                            >
                                Learn About CGAP
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="flex justify-center">
                            <div className="grid grid-cols-2 gap-4 max-w-xs">
                                {[
                                    { number: `${cohortCount}+`, label: "Cohorts Completed" },
                                    { number: "6", label: "Month Program" },
                                    { number: "100%", label: "Paid Stipend" },
                                    { number: "∞", label: "Career Potential" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="bg-tag-bg rounded-xl p-4 text-center"
                                    >
                                        <div className="text-xl font-bold text-green-primary">
                                            {item.number}
                                        </div>
                                        <div className="text-xs text-mid-grey font-medium mt-1">
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
