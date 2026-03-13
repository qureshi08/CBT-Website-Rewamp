import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    GraduationCap,
    BookOpen,
    Users,
    Database,
    BarChart3,
    BrainCircuit,
    Briefcase,
    Calendar,
    CheckCircle2,
    Quote,
    ExternalLink,
} from "lucide-react";
import { ClientLogoGrid } from "@/components/home/ClientLogoStrip";
import PersonaBridge from "@/components/shared/PersonaBridge";

export const metadata: Metadata = {
    title:
        "CGAP — Convergent Graduate Academy Program | Launch Your Data Career",
    description:
        "Join CGAP, a 6-month paid training program bridging academia and industry in Data Analytics. Mentored by seasoned consultants with multiple successful batches.",
};

const curriculum = [
    {
        icon: Database,
        title: "Data Engineering",
        description: "SQL, ETL pipelines, data warehouse design, data modelling",
        month: "Month 1-2",
    },
    {
        icon: BarChart3,
        title: "Business Intelligence",
        description: "Power BI, DAX, dashboard design, report automation",
        month: "Month 2-3",
    },
    {
        icon: BrainCircuit,
        title: "Analytics & Data Science",
        description: "Statistics, Python, machine learning fundamentals, forecasting",
        month: "Month 3-4",
    },
    {
        icon: Briefcase,
        title: "Consulting Skills",
        description:
            "Client communication, requirements gathering, project delivery, documentation",
        month: "Month 4-5",
    },
    {
        icon: Users,
        title: "Client Engagement",
        description:
            "Live project work with real CBT clients under senior consultant supervision",
        month: "Month 5-6",
    },
];

const alumni = [
    {
        name: "Sarah Ahmed",
        cohort: "Batch 10",
        role: "BI Consultant",
        company: "CBT",
        quote:
            "CGAP gave me the practical skills and confidence that university alone couldn't. Within 3 months of graduating, I was leading dashboards for a major FMCG client.",
    },
    {
        name: "Ali Hassan",
        cohort: "Batch 11",
        role: "Data Engineer",
        company: "CBT",
        quote:
            "The hands-on approach is what sets CGAP apart. You're working with real data and real clients from week one. No toy datasets.",
    },
    {
        name: "Fatima Malik",
        cohort: "Batch 9",
        role: "Analytics Consultant",
        company: "Tech Solutions Ltd",
        quote:
            "The mentors at CGAP are genuinely invested in your growth. I learned more in 6 months than I did in 4 years of university.",
    },
];

const eligibility = [
    "Bachelor's degree in Computer Science, Statistics, Mathematics, Engineering, Economics, or related fields",
    "Fresh graduates or up to 2 years of experience",
    "Strong analytical thinking and problem-solving skills",
    "Proficiency in English (written and verbal)",
    "Willingness to commit to 6 months of intensive training",
    "Based in Pakistan (Islamabad/Rawalpindi preferred)",
];

import { createClient } from "@/lib/supabase/server";

const fallbackAlumni = [
    {
        name: "Sarah Ahmed",
        cohort: "Batch 10",
        role: "BI Consultant",
        company: "CBT",
        quote:
            "CGAP gave me the practical skills and confidence that university alone couldn't. Within 3 months of graduating, I was leading dashboards for a major FMCG client.",
    },
    {
        name: "Ali Hassan",
        cohort: "Batch 11",
        role: "Data Engineer",
        company: "CBT",
        quote:
            "The hands-on approach is what sets CGAP apart. You're working with real data and real clients from week one. No toy datasets.",
    },
    {
        name: "Fatima Malik",
        cohort: "Batch 9",
        role: "Analytics Consultant",
        company: "Tech Solutions Ltd",
        quote:
            "The curriculum is intense but rewarding. The focus on both technical skills like SQL/Power BI and soft skills like client management is exactly what I needed.",
    },
];

export default async function CGAPPage() {
    const supabase = await createClient();

    // Fetch clients for the strip
    const { data: clientsData } = await supabase
        .from("clients")
        .select("name")
        .eq("is_featured", true)
        .order("display_order", { ascending: true });

    const clientNames = clientsData?.map((c) => c.name);

    // Fetch alumni
    const { data: dbAlumni } = await supabase
        .from("cgap_alumni")
        .select("*")
        .order("display_order", { ascending: true });

    const displayAlumni = dbAlumni?.length ? dbAlumni : fallbackAlumni;

    // Fetch latest open batch
    const { data: openBatches } = await supabase
        .from("cgap_cohorts")
        .select("*")
        .eq("status", "open")
        .order("cohort_number", { ascending: false })
        .limit(1);

    const activeBatch = openBatches?.[0];
    const applicationUrl = activeBatch?.application_url || "/contact";

    // Fetch total batch count for stats
    const { count: batchCount } = await supabase
        .from("cgap_cohorts")
        .select("*", { count: "exact", head: true });

    const displayBatchCount = batchCount || 0;

    return (
        <>
            <div className="font-body">
                {/* Hero */}
                <section className="bg-white pt-20 relative overflow-hidden">
                    {/* Background decorative element */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 -z-10" />

                    <div className="container-main py-12 md:py-16 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-2 mb-5">
                                    <GraduationCap size={16} className="text-primary" />
                                    <span className="uppercase-label text-primary">
                                        Graduate Program
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading leading-[1.15] font-heading tracking-tight mb-5">
                                    Bridging Academia <br /> & <span className="italic-accent text-primary">Industry.</span>
                                </h1>
                                <p className="mt-5 text-base md:text-lg text-text-body/80 leading-relaxed max-w-xl font-normal">
                                    CGAP is a 6-month intensive training program designed to turn
                                    top graduate talent into world-class data consultants.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-5 mt-8">
                                    <a
                                        href={applicationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary min-w-[180px] shadow-lg shadow-primary/5"
                                    >
                                        Apply Now
                                        <ExternalLink size={14} />
                                    </a>
                                    <div className="text-center sm:text-left">
                                        <a href="#curriculum" className="btn-ghost text-sm inline-flex items-center gap-2">
                                            View Curriculum
                                            <ArrowRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -inset-6 bg-primary/5 rounded-full blur-2xl" />
                                <div className="relative z-10 aspect-[4/3] rounded-xl overflow-hidden border border-border/40 shadow-lg">
                                    <img
                                        src="/images/cgap.png"
                                        alt="CGAP Learning Environment"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="absolute -bottom-4 -left-4 grid grid-cols-2 gap-3 z-20">
                                    {[
                                        { number: "6", label: "Month Program" },
                                        { number: `${displayBatchCount}+`, label: "Batches Run" },
                                    ].map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="bg-white shadow-lg rounded-lg p-4 text-center border border-border/40 min-w-[100px]"
                                        >
                                            <div className="text-xl font-bold text-primary font-heading">
                                                {stat.number}
                                            </div>
                                            <div className="uppercase-label text-[9px] text-text-muted mt-1">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="bg-surface py-16 relative overflow-hidden">
                    <div className="container-main">
                        <div className="max-w-4xl mx-auto text-center md:text-left">
                            <div className="mb-10">
                                <span className="uppercase-label text-primary mb-4 inline-block border-b border-primary/30 pb-1">
                                    The Academy
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-text-heading font-heading">
                                    The CGAP <span className="italic-accent text-primary">Curriculum</span>
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10 text-sm md:text-base text-text-body/70 leading-relaxed font-body">
                                <div className="space-y-4">
                                    <p>
                                        <strong className="text-text-heading font-semibold">CGAP</strong> (Convergent Graduate Academy Program) is our flagship development initiative. We transform high-potential graduates into industry-ready data professionals.
                                    </p>
                                    <p>
                                        Through 6 months of rigorous, hands-on training, you&apos;ll move past theory and into the complex reality of enterprise data consulting.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p>
                                        Participants receive a <strong className="text-text-heading font-semibold">paid stipend</strong> from day one and work on real client projects alongside senior consultants.
                                    </p>
                                    <p>
                                        After graduation, high performers are invited to join <strong className="text-text-heading font-semibold">CBT as permanent consultants</strong>, launching a career path.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Curriculum */}
                <section className="bg-white py-16" id="curriculum">
                    <div className="container-main">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                            <div className="max-w-2xl">
                                <span className="uppercase-label text-primary mb-2 block">
                                    The Roadmap
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-text-heading font-heading leading-tight">
                                    A Comprehensive <span className="italic-accent text-primary">Data Stack</span> Curriculum
                                </h2>
                            </div>
                            <div className="pb-1 hidden md:block">
                                <CheckCircle2 size={32} className="text-primary opacity-20" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {curriculum.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className="group card border border-border/40 p-5 flex flex-col"
                                    >
                                        <span className="uppercase-label text-primary opacity-60 mb-4 text-[10px]">
                                            {item.month}
                                        </span>
                                        <div className="w-9 h-9 rounded-lg bg-primary-muted flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Icon size={18} />
                                        </div>
                                        <h3 className="text-base font-bold text-text-heading mb-2 font-heading group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-[13px] text-text-body/70 leading-relaxed flex-grow font-body">
                                            {item.description}
                                        </p>
                                        <div className="mt-5 pt-4 border-t border-border/20 uppercase-label opacity-40 text-[9px]">
                                            Module 0{index + 1}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Requirements & Alumni */}
                <section className="bg-surface py-16 border-y border-border/50">
                    <div className="container-main">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Requirements */}
                            <div>
                                <h2 className="text-2xl font-bold text-text-heading mb-6 font-heading">
                                    The Ideal <span className="italic-accent text-primary">Candidate</span>
                                </h2>
                                <div className="space-y-2">
                                    {eligibility.map((item) => (
                                        <div key={item} className="flex items-start gap-3 p-3.5 rounded-lg bg-white/50 border border-transparent hover:border-primary/20 hover:bg-white transition-all">
                                            <CheckCircle2
                                                size={16}
                                                className="text-primary shrink-0 mt-0.5"
                                            />
                                            <span className="text-[13px] text-text-body/80 leading-relaxed font-body font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Alumni Showcase */}
                            <div>
                                <h2 className="text-2xl font-bold text-text-heading mb-6 font-heading text-center lg:text-left">
                                    What Our <span className="italic-accent text-primary">Alumni</span> Say
                                </h2>
                                <div className="space-y-4">
                                    {displayAlumni.map((alum: any) => (
                                        <div
                                            key={alum.name}
                                            className="bg-white rounded-lg p-5 border border-border/40 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
                                        >
                                            <Quote size={24} className="absolute -top-2 -right-2 text-primary/5 group-hover:text-primary/10 transition-colors" />
                                            <p className="text-[13px] text-text-body font-medium leading-relaxed mb-5 italic relative z-10 font-body">
                                                &ldquo;{alum.quote}&rdquo;
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded-full bg-primary-muted flex items-center justify-center text-primary font-bold text-[10px]">
                                                    {alum.name[0]}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-text-heading text-[11px] font-heading">
                                                        {alum.name}
                                                    </div>
                                                    <div className="uppercase-label text-[8px] text-text-muted tracking-widest mt-0.5">
                                                        {alum.role} • {alum.cohort || alum.batch}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who You'll Work With */}
                <section className="bg-white py-12">
                    <div className="container-main">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-text-heading font-heading">
                                Work with Leading <span className="italic-accent text-primary">Brands</span>
                            </h2>
                            <p className="mt-2 text-[13px] text-text-body/60 max-w-xl mx-auto font-body">
                                CGAP graduates work directly with industry-leading clients alongside our senior consulting team.
                            </p>
                        </div>
                        <ClientLogoGrid featured clientNames={clientNames} />
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 px-6">
                    <div className="container-main rounded-[24px] bg-text-heading overflow-hidden relative shadow-xl">
                        {/* Decorative patterns */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-[-20deg] translate-x-1/2" />

                        <div className="relative z-10 py-12 md:py-16 px-8 text-center text-white">
                            <GraduationCap size={40} className="text-primary/20 mx-auto mb-5" />
                            <h2 className="text-2xl md:text-4xl font-bold mb-5 font-heading tracking-tight leading-tight">
                                Ready to Launch Your <br className="hidden md:block" /> <span className="italic-accent text-primary">Data Career?</span>
                            </h2>
                            <p className="text-white/60 mb-6 max-w-xl mx-auto text-sm leading-relaxed font-body">
                                Applications for the next batch are now open. Join a group of high-potential individuals and start your journey into data consulting.
                            </p>
                            <div className="flex flex-col items-center gap-6">
                                <a
                                    href={applicationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    Submit Application
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <PersonaBridge exclude="cgap" />
            </div>
        </>
    );
}
