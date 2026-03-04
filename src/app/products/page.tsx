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

const fallbackProducts = [
    {
        name: "CBT Variance Visual",
        slug: "cbt-variance-visual",
        category: "Power BI Visual",
        description:
            "A Power BI custom visual for displaying variance analysis with conditional formatting. Compare actuals against targets with intuitive color-coded indicators, drill-down capabilities, and flexible layout options.",
        features: [
            "Conditional colour formatting",
            "Multi-level drill-down",
            "Flexible column configuration",
            "PDF export ready",
            "Mobile responsive design",
        ],
    },
    {
        name: "CBT KPI Scorecard",
        slug: "cbt-kpi-scorecard",
        category: "Power BI Visual",
        description:
            "A Power BI custom visual for executive KPI dashboards with traffic light indicators. Monitor key metrics at a glance with customisable thresholds, trend arrows, and sparklines.",
        features: [
            "Traffic light indicators",
            "Configurable thresholds",
            "Trend sparklines",
            "Grouping and categories",
            "Theme-aware styling",
        ],
    },
];

export default async function ProductsPage() {
    const supabase = await createClient();

    const { data: dbProducts } = await supabase
        .from("products")
        .select("*")
        .order("display_order", { ascending: true });

    const displayProducts = dbProducts?.length ? dbProducts : fallbackProducts;

    return (
        <>
            {/* Hero */}
            <section className="bg-white pt-[72px]">
                <div className="container-main py-20 md:py-28">
                    <div className="max-w-3xl">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            Products
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                            Tools Built by{" "}
                            <span className="italic-accent">Data People</span>, for Data
                            People
                        </h1>
                        <p className="mt-6 text-lg text-mid-grey leading-relaxed max-w-2xl">
                            Power BI custom visuals and analytics tools designed for real-world
                            data challenges, built by the same team that delivers for
                            enterprise clients.
                        </p>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {displayProducts.map((product: any) => (
                            <div
                                key={product.slug}
                                className="bg-white rounded-2xl border border-border/50 overflow-hidden card-hover group"
                            >
                                {/* Product Screenshot Placeholder */}
                                <div className="aspect-video bg-white flex items-center justify-center relative border-b border-border/50 overflow-hidden">
                                    <img
                                        src="/images/product_preview.png"
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Category badge */}
                                    <span className="absolute top-4 left-4 text-xs font-semibold text-green-primary bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="p-6 md:p-8">
                                    <h3 className="text-xl font-bold text-charcoal mb-3">
                                        {product.name}
                                    </h3>
                                    <p className="text-mid-grey leading-relaxed mb-5">
                                        {product.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 mb-6">
                                        {product.features?.map((feature: string) => (
                                            <div key={feature} className="flex items-center gap-2">
                                                <Star
                                                    size={14}
                                                    className="text-green-primary shrink-0"
                                                    fill="currentColor"
                                                />
                                                <span className="text-sm text-charcoal">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <a
                                            href="#"
                                            className="btn-primary text-sm py-2.5 px-5"
                                        >
                                            View on AppSource
                                            <ExternalLink size={14} />
                                        </a>
                                        <Link
                                            href="/contact"
                                            className="btn-outline text-sm py-2.5 px-5"
                                        >
                                            Request a Demo
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Built by CGAP */}
            <section className="bg-white">
                <div className="container-main section-padding">
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            Behind the Products
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
                            Built by Our Team, Including CGAP Graduates
                        </h2>
                        <p className="text-mid-grey leading-relaxed mb-8">
                            Our products are built by experienced consultants and talented CGAP
                            graduates — the same people who deliver enterprise data solutions
                            for global brands.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/cgap" className="btn-outline">
                                Meet the CGAP Program
                                <ArrowRight size={16} />
                            </Link>
                            <Link href="/contact" className="btn-primary">
                                Contact Product Support
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="products" />
        </>
    );
}
