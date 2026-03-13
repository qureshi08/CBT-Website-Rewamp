import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Star, BarChart3 } from "lucide-react";
import PersonaBridge from "@/components/shared/PersonaBridge";

export const metadata: Metadata = {
    title: "Products | CBT — Power BI Custom Visuals & Analytics Tools",
    description:
        "Discover CBT's Power BI custom visuals and analytics tools built by data professionals for data professionals.",
};

import { createClient } from "@/lib/supabase/server";

import ProductFilter from "@/components/products/ProductFilter";

export default async function ProductsPage() {
    return (
        <div className="font-body">
            {/* Hero */}
            <section className="bg-surface relative overflow-hidden">
                {/* Abstract decorative elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-[-15deg] translate-x-1/2 -z-0" />
                <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2" />

                <div className="container-main py-12 md:py-16 relative z-10">
                    <div className="max-w-2xl text-center md:text-left">
                        <span className="uppercase-label text-primary mb-5 inline-block border-b border-primary/30 pb-1">
                            Enterprise Tools & Visuals
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading leading-[1.15] font-heading tracking-tight mb-5">
                            Power Up Your <br /> <span className="italic-accent text-primary">Analytics Stack.</span>
                        </h1>
                        <p className="mt-4 text-base md:text-lg text-text-body/80 leading-relaxed max-w-xl font-normal">
                            Industry-grade Power BI custom visuals and automation tools.
                            Built for <span className="font-medium text-text-heading">Banking</span>, <span className="font-medium text-text-heading">Retail</span>, and <span className="font-medium text-text-heading">Custom Visuals</span> sectors.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a href="#products" className="btn-primary">
                                Browse Products
                                <ArrowRight size={16} />
                            </a>
                            <Link href="/contact" className="btn-secondary">
                                Custom Request
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products with Filter Tabs */}
            <section className="bg-white relative z-10 -mt-8 sm:-mt-12" id="products">
                <div className="container-main rounded-[20px] bg-white shadow-xl shadow-black/5 p-6 md:p-8 border border-border/40">
                    <div className="text-center mb-8">
                        <span className="uppercase-label text-primary mb-2 block">Marketplace</span>
                        <h2 className="text-2xl font-bold text-text-heading font-heading">
                            Our Product <span className="italic-accent text-primary">Portfolio</span>
                        </h2>
                    </div>

                    <ProductFilter />
                </div>
            </section>

            {/* Why Our Products (Advantage) */}
            <section className="bg-surface py-16 relative overflow-hidden">
                <div className="container-main">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="uppercase-label text-primary mb-3 block">Built for Scale</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-text-heading font-heading leading-tight mb-6">
                                The CBT <br /> <span className="italic-accent text-primary">Product Edge</span>
                            </h2>
                            <p className="text-sm text-text-body/80 leading-relaxed mb-8 font-body">
                                Our products aren&apos;t just code; they are the distilled expertise of our
                                consulting team who solve enterprise data problems every day.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="w-10 h-10 rounded-xl bg-primary-muted flex items-center justify-center text-primary">
                                        <BarChart3 size={18} />
                                    </div>
                                    <h3 className="font-bold text-text-heading font-heading text-base">User Centric</h3>
                                    <p className="text-[13px] text-text-body/70 leading-relaxed font-body">Designed for high-frequency use in corporate environments.</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="w-10 h-10 rounded-xl bg-primary-muted flex items-center justify-center text-primary">
                                        <Star size={18} />
                                    </div>
                                    <h3 className="font-bold text-text-heading font-heading text-base">Certified Quality</h3>
                                    <p className="text-[13px] text-text-body/70 leading-relaxed font-body">Rigorously tested to meet enterprise security and performance standards.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white p-1.5 rounded-[20px] shadow-xl border border-border/40 rotate-1">
                                <div className="bg-surface rounded-xl p-6 text-center">
                                    <div className="text-3xl font-bold text-primary font-heading mb-2">2.5M+</div>
                                    <div className="uppercase-label text-[9px] text-text-muted mb-6">Data Points Rendered Daily</div>
                                    <div className="aspect-video bg-primary-muted/30 rounded-lg flex items-center justify-center">
                                        <div className="w-full max-w-[120px] h-16 flex items-end gap-1">
                                            <div className="flex-grow bg-primary/20 rounded-t h-[40%]" />
                                            <div className="flex-grow bg-primary/40 rounded-t h-[70%]" />
                                            <div className="flex-grow bg-primary rounded-t h-[90%]" />
                                            <div className="flex-grow bg-primary/60 rounded-t h-[55%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Requests Banner */}
            <section className="bg-white py-12">
                <div className="container-main">
                    <div className="bg-white border border-border shadow-xl rounded-[20px] p-8 md:p-12 text-center relative overflow-hidden group">
                        {/* Subtle Background Pattern */}
                        <div className="absolute inset-0 bg-primary-muted/20 opacity-40 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-4xl font-bold text-text-heading mb-5 font-heading tracking-tight leading-tight">
                                Need a <span className="italic-accent text-primary">Custom Solution?</span>
                            </h2>
                            <p className="text-base text-text-body/70 max-w-xl mx-auto mb-8 font-body">
                                Our product team can build custom visuals and automated tools
                                tailored to your unique enterprise requirements.
                            </p>
                            <Link
                                href="/contact?subject=Custom Visual Request"
                                className="btn-primary"
                            >
                                Request a Demo
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            <PersonaBridge exclude="products" />
        </div>
    );
}
