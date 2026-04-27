"use client";

import { useState, useEffect } from "react";
import { ExternalLink, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Product {
    name: string;
    slug: string;
    category: string;
    short_description: string;
    appsource_url?: string;
    industry?: string;
    badge_text?: string | null;
    detail_path?: string | null;
    partner_note?: string | null;
}

export default function ProductFilter() {
    const [products, setProducts] = useState<Product[]>([]);
    const [industries, setIndustries] = useState<string[]>(["All"]);
    const [activeIndustry, setActiveIndustry] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("display_order", { ascending: true });

        if (!error && data) {
            // Map the DB data to our UI format
            const mappedProducts: Product[] = data.map(p => ({
                name: p.name,
                slug: p.slug,
                category: p.category,
                short_description: p.short_description || "",
                appsource_url: p.appsource_url || "#",
                industry: p.industry || "General",
                badge_text: p.badge_text || null,
                detail_path: p.detail_path || null,
                partner_note: p.partner_note || null,
            }));

            setProducts(mappedProducts);

            // Extract unique industries
            const uniqueIndustries = ["All", ...new Set(mappedProducts.map(p => p.industry).filter(Boolean) as string[])];
            setIndustries(uniqueIndustries);
        }
        setIsLoading(false);
    }

    const filteredProducts = activeIndustry === "All"
        ? products
        : products.filter(p => p.industry === activeIndustry);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
                <Loader2 className="animate-spin text-primary" size={48} />
                <p className="text-text-body/60 font-body animate-pulse">Gathering our product portfolio...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 md:space-y-16 font-body">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 pb-4 border-b border-border/40">
                {industries.map((ind) => (
                    <button
                        key={ind}
                        onClick={() => setActiveIndustry(ind)}
                        className={`px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeIndustry === ind
                            ? "bg-primary text-white shadow-xl shadow-primary/10 scale-105"
                            : "bg-white text-text-muted border border-border/60 hover:border-primary/30 hover:bg-surface"
                            }`}
                    >
                        {ind === "All" ? "All" : ind}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {filteredProducts.map((product) => (
                    <div
                        key={product.slug}
                        className="bg-white rounded-3xl border border-border/40 overflow-hidden shadow-sm flex flex-col h-full"
                    >
                        {/* Product Visual Mock */}
                        <div className="aspect-[16/11] bg-surface relative overflow-hidden flex items-center justify-center p-8">
                            <div className="relative w-full h-full bg-white rounded-xl shadow-2xl border border-border/20 flex flex-col p-4 overflow-hidden">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                                    <div className="w-12 h-1.5 rounded-full bg-surface" />
                                </div>
                                <div className="flex-grow flex items-end gap-1">
                                    <div className="flex-grow bg-primary/10 rounded-t-sm h-[40%]" />
                                    <div className="flex-grow bg-primary/20 rounded-t-sm h-[70%]" />
                                    <div className="flex-grow bg-primary h-[90%]" />
                                    <div className="flex-grow bg-primary/10 rounded-t-sm h-[30%]" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent flex items-center justify-center p-6 text-center">
                                    <span className="text-text-heading font-heading font-bold text-lg opacity-80">{product.name}</span>
                                </div>
                            </div>

                            <span className="absolute top-6 left-6 uppercase-label text-white bg-primary px-3 py-1 rounded-full shadow-lg">
                                {product.industry}
                            </span>

                            {product.badge_text && (
                                <span
                                    className="absolute top-6 right-6 font-mono text-[10px] font-bold tracking-wider uppercase text-text-heading bg-white/95 border border-border/40 px-2.5 py-1 rounded-full shadow-md"
                                >
                                    {product.badge_text}
                                </span>
                            )}
                        </div>

                        <div className="p-5 sm:p-8 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-5 h-[1px] bg-primary" />
                                <span className="uppercase-label text-primary">{product.category}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-text-heading mb-2 font-heading">
                                {product.name}
                            </h3>

                            {product.partner_note && (
                                <p className="text-[11px] font-mono uppercase tracking-wider text-primary mb-4">
                                    {product.partner_note}
                                </p>
                            )}

                            <p className="text-text-body/70 leading-relaxed mb-8 text-sm font-body mt-2">
                                {product.short_description}
                            </p>

                            <div className="mt-auto flex flex-col gap-3">
                                {product.detail_path ? (
                                    <Link
                                        href={product.detail_path}
                                        className="hero-btn-primary"
                                        style={{ display: "flex", width: "100%", justifyContent: "center" }}
                                    >
                                        Learn more <span><ArrowRight size={14} /></span>
                                    </Link>
                                ) : (
                                    <a
                                        href={product.appsource_url || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hero-btn-primary"
                                        style={{ display: "flex", width: "100%", justifyContent: "center" }}
                                    >
                                        Get on AppSource <span><ExternalLink size={14} /></span>
                                    </a>
                                )}
                                <Link
                                    href={`/contact?subject=${encodeURIComponent(`Demo: ${product.name}`)}`}
                                    className="btn-ghost justify-center text-sm font-bold"
                                >
                                    Request a Demo
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
