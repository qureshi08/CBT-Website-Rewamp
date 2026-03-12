"use client";

import { useState } from "react";
import { Star, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Product {
    name: string;
    slug: string;
    category: string;
    short_description: string;
    features: string[];
    appsource_url?: string;
    industry?: string;
    image: string;
}

const allProducts: Product[] = [
    {
        name: "CBT Variance Visual",
        slug: "cbt-variance-visual",
        category: "Power BI Visual",
        industry: "Retail",
        image: "/images/product_retail.png",
        short_description: "A Power BI custom visual for displaying variance analysis with conditional formatting. Perfect for retail sales vs target comparisons.",
        features: ["Conditional colour formatting", "Multi-level drill-down", "Flexible column configuration"],
        appsource_url: "#",
    },
    {
        name: "CBT KPI Scorecard",
        slug: "cbt-kpi-scorecard",
        category: "Power BI Visual",
        industry: "Banking",
        image: "/images/product_banking.png",
        short_description: "Executive KPI dashboards with traffic light indicators. Designed for high-frequency banking metrics and risk monitoring.",
        features: ["Traffic light indicators", "Configurable thresholds", "Trend sparklines"],
        appsource_url: "#",
    },
    {
        name: "CBT Data Auditor",
        slug: "cbt-data-auditor",
        category: "Analytics Tool",
        industry: "Technology",
        image: "/images/product_tech.png",
        short_description: "Automated data quality auditing and reporting. Ensure your tech stack is feeding clean, reliable data into your BI layer.",
        features: ["Auto-validation rules", "Anomalies detection", "Weekly PDF reports"],
        appsource_url: "#",
    },
];

const industries = ["All", "Banking", "Retail", "Technology"];

export default function ProductFilter() {
    const [activeIndustry, setActiveIndustry] = useState("All");

    const filteredProducts = activeIndustry === "All"
        ? allProducts
        : allProducts.filter(p => p.industry === activeIndustry);

    return (
        <div className="space-y-12">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {industries.map((ind) => (
                    <button
                        key={ind}
                        onClick={() => setActiveIndustry(ind)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeIndustry === ind
                                ? "bg-persona-product text-white shadow-lg shadow-persona-product/20"
                                : "bg-white text-mid-grey border border-border/50 hover:border-persona-product/50"
                            }`}
                    >
                        {ind}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.slug}
                        className="bg-white rounded-2xl border border-border/40 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
                    >
                        <div className="aspect-[16/10] bg-tag-bg-orange relative overflow-hidden group-hover:bg-persona-product/10 transition-colors">
                            <div className="absolute inset-4 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 flex items-center justify-center p-4">
                                <span className="text-persona-product font-bold text-center text-sm">{product.name} Preview</span>
                            </div>
                            <span className="absolute top-4 right-4 text-[10px] uppercase font-black text-white bg-persona-product px-2 py-1 rounded shadow-sm">
                                {product.industry}
                            </span>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-[11px] font-bold text-persona-product uppercase tracking-widest mb-2">{product.category}</div>
                            <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-persona-product transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-sm text-mid-grey leading-relaxed mb-6 flex-grow">
                                {product.short_description}
                            </p>

                            <div className="space-y-2 mb-8">
                                {product.features.map((f) => (
                                    <div key={f} className="flex items-center gap-2">
                                        <Star size={12} className="text-persona-product opacity-40 shrink-0" fill="currentColor" />
                                        <span className="text-xs text-charcoal">{f}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                <a
                                    href={product.appsource_url || "#"}
                                    className="inline-flex items-center justify-center gap-2 bg-persona-product text-white font-bold py-3 rounded-lg text-sm hover:bg-persona-product/90 transition-all shadow-lg shadow-persona-product/10"
                                >
                                    Get it on AppSource
                                    <ExternalLink size={14} />
                                </a>
                                <Link
                                    href={`/contact?subject=Product Demo - ${product.name}`}
                                    className="inline-flex items-center justify-center gap-2 border border-border/60 text-charcoal font-bold py-3 rounded-lg text-sm hover:bg-tag-bg-orange transition-all"
                                >
                                    Request a Demo
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
