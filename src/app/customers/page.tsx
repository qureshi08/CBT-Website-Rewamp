import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    BarChart3,
    Database,
    LineChart,
    BrainCircuit,
    Settings2,
    BookOpen,
    FileText,
} from "lucide-react";
import { ClientLogoGrid } from "@/components/home/ClientLogoStrip";
import PersonaBridge from "@/components/shared/PersonaBridge";

export const metadata: Metadata = {
    title: "Our Customers | CBT — Convergent Business Technologies",
    description:
        "See who trusts CBT for data analytics, business intelligence, and technology consulting. Clients include Pepsi, Microsoft, Coca-Cola, KPMG, and more.",
};

import { createClient } from "@/lib/supabase/server";

const services = [
    {
        icon: BarChart3,
        title: "Analytical Maturity Assessment",
        description:
            "We evaluate your organisation's analytics capabilities and create a clear roadmap to maturity — from ad-hoc reporting to predictive and prescriptive analytics.",
    },
    {
        icon: Database,
        title: "Enterprise DWH Implementation",
        description:
            "Design, build, and deploy scalable enterprise data warehouses using modern cloud and on-premise technologies. From schema design to ETL pipelines.",
    },
    {
        icon: LineChart,
        title: "Business Analytics",
        description:
            "Interactive dashboards, self-service BI, and automated reporting that turn your data into clear, actionable insights for every level of the organisation.",
    },
    {
        icon: BrainCircuit,
        title: "Decision Sciences",
        description:
            "Advanced statistical modelling, machine learning, and AI solutions applied to real business problems — pricing, demand forecasting, customer segmentation.",
    },
    {
        icon: Settings2,
        title: "AnalyticOps",
        description:
            "Operationalise your analytics with governance frameworks, automated pipelines, monitoring, and sustainable delivery models.",
    },
    {
        icon: BookOpen,
        title: "Training & Development",
        description:
            "Hands-on training programs for data engineering, analytics, BI tools, and consulting skills — tailored to your team's needs.",
    },
];

const fallbackCaseStudies = [
    {
        title: "Enterprise Data Warehouse for Leading FMCG Company",
        tags: ["Enterprise DWH", "FMCG"],
        summary:
            "Designed and implemented a scalable enterprise data warehouse serving 500+ daily users across 12 markets, reducing report generation time by 80%.",
    },
    {
        title: "Advanced Analytics for Retail Chain",
        tags: ["Decision Sciences", "Retail"],
        summary:
            "Developed demand forecasting models that improved inventory accuracy by 35% and reduced stockouts across 200+ stores.",
    },
    {
        title: "BI Transformation for Financial Services Firm",
        tags: ["Business Analytics", "Finance"],
        summary:
            "Migrated legacy reporting to a modern Power BI platform with real-time dashboards, serving C-suite to operational teams.",
    },
];

export default async function CustomersPage() {
    const supabase = await createClient();

    // Fetch clients
    const { data: clientsData } = await supabase
        .from("clients")
        .select("name")
        .order("display_order", { ascending: true });

    const clientNames = clientsData?.map((c) => c.name);

    // Fetch case studies
    const { data: dbCaseStudies } = await supabase
        .from("case_studies")
        .select("title, summary, tags")
        .eq("published", true)
        .order("created_at", { ascending: false });

    const displayCaseStudies = dbCaseStudies?.length
        ? dbCaseStudies
        : fallbackCaseStudies;

    return (
        <>
            {/* Hero */}
            <section className="bg-white pt-[72px]">
                <div className="container-main py-20 md:py-28">
                    <div className="max-w-3xl">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            Customers
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                            Trusted by Leading Organisations{" "}
                            <span className="italic-accent">Across Industries</span>
                        </h1>
                        <p className="mt-6 text-lg text-mid-grey leading-relaxed max-w-2xl">
                            From FMCG giants to financial institutions, we help organisations
                            turn their data into competitive advantage.
                        </p>
                        <div className="mt-8">
                            <Link href="/contact" className="btn-primary">
                                Start a Conversation
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Logos */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            Our Client Portfolio
                        </h2>
                        <p className="mt-3 text-mid-grey">
                            Working with global brands across multiple sectors
                        </p>
                    </div>
                    <ClientLogoGrid clientNames={clientNames} />
                </div>
            </section>

            {/* Services */}
            <section className="bg-white">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            Services
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            Services We Deliver
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={service.title}
                                    className="bg-light-grey rounded-xl p-6 group hover:bg-tag-bg transition-colors duration-200 border border-transparent hover:border-green-primary/20"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-green-primary transition-colors duration-200">
                                            <Icon
                                                size={20}
                                                className="text-mid-grey group-hover:text-white transition-colors duration-200"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-charcoal mb-1">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-mid-grey leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            Case Studies
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            Our Work in Action
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayCaseStudies.map((study: any) => (
                            <div
                                key={study.title}
                                className="bg-white rounded-xl p-6 border border-border/50 card-hover group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-tag-bg flex items-center justify-center mb-4">
                                    <FileText size={18} className="text-green-primary" />
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {study.tags?.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-medium text-green-primary bg-tag-bg px-2.5 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="font-bold text-charcoal mb-2 leading-snug">
                                    {study.title}
                                </h3>
                                <p className="text-sm text-mid-grey leading-relaxed">
                                    {study.summary}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-green-primary">
                <div className="container-main py-16 md:py-20 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Data Capability?
                    </h2>
                    <p className="text-white/70 mb-8 max-w-xl mx-auto">
                        Tell us about your challenge. We&apos;ll show you how data can solve
                        it.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white text-green-primary font-semibold px-6 py-3 rounded-md hover:bg-light-grey transition-colors duration-150"
                    >
                        Start a Conversation
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            <PersonaBridge exclude="customers" />
        </>
    );
}

