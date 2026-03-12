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
        <>
            {/* Hero */}
            <section className="bg-persona-product text-white pt-[72px]">
                <div className="container-main py-20 md:py-32">
                    <div className="max-w-4xl">
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-4 bg-white/10 px-3 py-1 rounded">
                            Our Products
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                            Power up your <span className="italic font-serif opacity-70">Analytics</span>
                        </h1>
                        <p className="mt-8 text-xl text-white/80 leading-relaxed max-w-2xl">
                            Industry-grade Power BI custom visuals and automation tools. Built by data professionals for data professionals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Products with Filter Tabs */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <ProductFilter />
                </div>
            </section>

            {/* Request a Demo Banner (Large) */}
            <section className="bg-persona-product py-16 text-white text-center">
                <div className="container-main">
                    <h2 className="text-4xl font-extrabold mb-6">Need a Custom Solution?</h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto italic font-serif">
                        Our product team can build custom visuals and automated reports tailored to your unique requirements.
                    </p>
                    <Link
                        href="/contact?subject=Custom Product Support"
                        className="inline-flex items-center gap-3 bg-white text-charcoal font-black px-10 py-5 rounded-full text-lg hover:bg-white/90 shadow-2xl shadow-persona-product/20"
                    >
                        Request a Demo
                        <ArrowRight size={22} className="text-persona-product" />
                    </Link>
                </div>
            </section>

            {/* Behind the Products - CGAP Focus */}
            <section className="bg-white">
                <div className="container-main section-padding">
                    <div className="max-w-4xl mx-auto bg-tag-bg-orange rounded-3xl p-10 md:p-16 border border-persona-product/10 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
                            The CGAP Advantage
                        </h2>
                        <p className="text-lg text-mid-grey leading-relaxed mb-10">
                            The same talented graduates that deliver for our enterprise clients also build and maintain our custom visual library. Every product is tested by our veteran consultants for real-world reliability.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/cgap" className="inline-flex items-center gap-3 bg-persona-product text-white font-bold px-8 py-4 rounded-xl hover:bg-persona-product/90 transition-all shadow-lg shadow-persona-product/20">
                                Meet the CGAP Program
                                <ArrowRight size={20} />
                            </Link>
                            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-charcoal font-bold px-8 py-4 rounded-xl border border-border/50 hover:bg-tag-bg-orange transition-all">
                                Contact Product Support
                                <BarChart3 size={20} className="text-persona-product" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="products" />
        </>
    );
}
