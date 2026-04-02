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
import { IndustryLeadersStrip } from "@/components/home/ClientLogoStrip";
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
            <div className="font-body">
                {/* Hero */}
                <section className="bg-white pt-20 md:pt-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2 -z-10" />

                    <div className="container-main py-12 md:py-16">
                        <div className="max-w-2xl">
                            <span className="uppercase-label text-primary mb-5 inline-block border-b border-primary/30 pb-1">
                                Our Portfolio
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading leading-[1.15] font-heading tracking-tight mb-5">
                                Trusted by Leading <br /> Organisations <span className="italic-accent text-primary">Across Industries.</span>
                            </h1>
                            <p className="text-base md:text-lg text-text-body/80 leading-relaxed max-w-xl font-normal mb-8 font-body">
                                From FMCG giants to financial institutions, we help organisations
                                turn their data into competitive advantage through delivery excellence.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/contact" className="btn-primary shadow-lg shadow-primary/5">
                                    Start a Conversation
                                    <ArrowRight size={16} />
                                </Link>
                                <a href="#works" className="btn-secondary">
                                    View Case Studies
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Client Logos — scrolling marquee */}
                <IndustryLeadersStrip clientNames={clientNames} />

                {/* Services */}
                <section className="bg-white py-16">
                    <div className="container-main">
                        <div className="text-center mb-12">
                            <span className="uppercase-label text-primary mb-2 block">
                                Expertise
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-text-heading font-heading">
                                Services We <span className="italic-accent text-primary">Deliver</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {services.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <div
                                        key={service.title}
                                        className="group card border border-border/40 p-6 flex flex-col"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary-muted text-primary flex items-center justify-center mb-5 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Icon size={20} />
                                        </div>
                                        <h3 className="text-lg font-bold text-text-heading mb-2 font-heading group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-text-body/70 leading-relaxed font-body">
                                            {service.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Case Studies */}
                <section className="bg-surface py-16 relative overflow-hidden" id="works">
                    <div className="container-main">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                            <div className="max-w-2xl">
                                <span className="uppercase-label text-primary mb-2 block">
                                    Impact
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-text-heading font-heading leading-tight">
                                    Our Work in <span className="italic-accent text-primary">Action</span>
                                </h2>
                            </div>
                            <div className="pb-1 hidden md:block">
                                <FileText size={32} className="text-primary opacity-10" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {displayCaseStudies.map((study: any) => (
                                <div
                                    key={study.title}
                                    className="bg-white rounded-xl p-6 border border-border/40 shadow-sm relative group hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {study.tags?.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="uppercase-label text-[9px] text-primary bg-primary-muted px-2 py-0.5 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-bold text-text-heading mb-3 font-heading leading-tight group-hover:text-primary transition-colors">
                                        {study.title}
                                    </h3>
                                    <p className="text-[13px] text-text-body/70 leading-relaxed font-body mb-5 flex-grow">
                                        {study.summary}
                                    </p>
                                    <Link href="/contact" className="mt-auto inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] group-hover:gap-3 transition-all">
                                        Learn More
                                        <ArrowRight size={12} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 px-6">
                    <div className="container-main rounded-[24px] bg-text-heading overflow-hidden relative shadow-xl">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-[-20deg] translate-x-1/2" />

                        <div className="relative z-10 py-12 px-8 text-center text-white">
                            <h2 className="text-2xl md:text-4xl font-bold mb-5 font-heading tracking-tight leading-tight">
                                Ready to Transform Your <br className="hidden md:block" /> <span className="italic-accent text-primary">Data Capability?</span>
                            </h2>
                            <p className="text-white/60 mb-8 max-w-xl mx-auto text-base leading-relaxed font-body font-light">
                                Tell us about your challenge. We&apos;ll show you how data can solve it.
                            </p>
                            <Link
                                href="/contact"
                                className="btn-primary shadow-lg shadow-black/20"
                            >
                                Start a Conversation
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>

                <PersonaBridge exclude="customers" />
            </div>
        </>
    );
}

