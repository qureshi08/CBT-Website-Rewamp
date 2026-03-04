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
        "Join CGAP, a 6-month paid training program bridging academia and industry in Data Analytics. Mentored by seasoned consultants. 28+ successful cohorts.",
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
        cohort: "Cohort 10",
        role: "BI Consultant",
        company: "CBT",
        quote:
            "CGAP gave me the practical skills and confidence that university alone couldn't. Within 3 months of graduating, I was leading dashboards for a major FMCG client.",
    },
    {
        name: "Ali Hassan",
        cohort: "Cohort 11",
        role: "Data Engineer",
        company: "CBT",
        quote:
            "The hands-on approach is what sets CGAP apart. You're working with real data and real clients from week one. No toy datasets.",
    },
    {
        name: "Fatima Malik",
        cohort: "Cohort 9",
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
        cohort: "Cohort 10",
        role: "BI Consultant",
        company: "CBT",
        quote:
            "CGAP gave me the practical skills and confidence that university alone couldn't. Within 3 months of graduating, I was leading dashboards for a major FMCG client.",
    },
    {
        name: "Ali Hassan",
        cohort: "Cohort 11",
        role: "Data Engineer",
        company: "CBT",
        quote:
            "The hands-on approach is what sets CGAP apart. You're working with real data and real clients from week one. No toy datasets.",
    },
    {
        name: "Fatima Malik",
        cohort: "Cohort 9",
        role: "Analytics Consultant",
        company: "Tech Solutions Ltd",
        quote:
            "The mentors at CGAP are genuinely invested in your growth. I learned more in 6 months than I did in 4 years of university.",
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

    // Fetch latest open cohort
    const { data: openCohorts } = await supabase
        .from("cgap_cohorts")
        .select("*")
        .eq("status", "open")
        .order("cohort_number", { ascending: false })
        .limit(1);

    const activeCohort = openCohorts?.[0];
    const applicationUrl = activeCohort?.application_url || "https://cbt-recruitment-portal.vercel.app/";

    return (
        <>
            {/* Hero */}
            <section className="bg-white pt-[72px]">
                <div className="container-main py-20 md:py-28">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <GraduationCap size={20} className="text-green-primary" />
                                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-green-primary">
                                    Graduate Program
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                                Convergent Graduate{" "}
                                <span className="italic-accent">Academy Program</span>
                            </h1>
                            <p className="mt-6 text-lg text-mid-grey leading-relaxed max-w-lg">
                                A 6-month paid training program that bridges the gap between
                                academia and industry. Learn from seasoned consultants, work with
                                real clients, and launch your career in data analytics.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <a
                                    href={applicationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    Apply Now
                                    <ExternalLink size={16} />
                                </a>
                                <a href="#curriculum" className="btn-outline">
                                    View Curriculum
                                </a>
                            </div>
                        </div>

                        <div className="relative h-[300px] md:h-[400px]">
                            <img
                                src="/images/cgap.png"
                                alt="CGAP Learning Illustration"
                                className="w-full h-full object-contain drop-shadow-xl"
                            />
                            <div className="absolute -bottom-6 -left-6 grid grid-cols-2 gap-4">
                                {[
                                    { number: "6", label: "Month Program" },
                                    { number: "28+", label: "Cohorts Run" },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="bg-white shadow-lg rounded-xl p-4 text-center border border-border/50"
                                    >
                                        <div className="text-xl font-bold text-green-primary">
                                            {stat.number}
                                        </div>
                                        <div className="text-xs font-semibold text-charcoal mt-1">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About the Program */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            About
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            About the Program
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6 text-mid-grey leading-relaxed">
                        <p>
                            <strong className="text-charcoal">CGAP</strong> (Convergent
                            Graduate Academy Program) is CBT&apos;s flagship graduate development
                            initiative. We take talented graduates from leading universities
                            and transform them into industry-ready data professionals through
                            6 months of rigorous, hands-on training.
                        </p>
                        <p>
                            Participants receive a{" "}
                            <strong className="text-charcoal">paid stipend</strong> from day
                            one, work on{" "}
                            <strong className="text-charcoal">real client projects</strong>{" "}
                            under the supervision of senior consultants, and gain practical
                            experience across the entire data stack — from data engineering to
                            business intelligence to analytics.
                        </p>
                        <p>
                            After successful completion, graduates are given the opportunity
                            for{" "}
                            <strong className="text-charcoal">
                                permanent roles at CBT
                            </strong>{" "}
                            or are equipped to join any data team worldwide with a strong
                            portfolio of real work.
                        </p>
                    </div>
                </div>
            </section>

            {/* Curriculum */}
            <section className="bg-white" id="curriculum">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            Curriculum
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            What You&apos;ll Learn
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {curriculum.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="flex gap-4 p-5 bg-light-grey rounded-xl group hover:bg-tag-bg transition-colors duration-200 border border-transparent hover:border-green-primary/20"
                                >
                                    <div className="relative flex flex-col items-center">
                                        <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:bg-green-primary transition-colors duration-200 shrink-0">
                                            <Icon
                                                size={20}
                                                className="text-mid-grey group-hover:text-white transition-colors duration-200"
                                            />
                                        </div>
                                        {index < curriculum.length - 1 && (
                                            <div className="w-px h-full bg-border mt-2" />
                                        )}
                                    </div>
                                    <div className="pb-4">
                                        <span className="text-xs font-semibold text-green-primary uppercase tracking-wider">
                                            {item.month}
                                        </span>
                                        <h3 className="text-base font-bold text-charcoal mt-1 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-mid-grey leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Eligibility */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            Requirements
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            Eligibility Criteria
                        </h2>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-3">
                        {eligibility.map((item) => (
                            <div key={item} className="flex items-start gap-3">
                                <CheckCircle2
                                    size={18}
                                    className="text-green-primary shrink-0 mt-0.5"
                                />
                                <span className="text-mid-grey leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Alumni Stories */}
            <section className="bg-white">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                            Alumni
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            What Graduates Say
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayAlumni.map((alum: any) => (
                            <div
                                key={alum.name}
                                className="bg-light-grey rounded-xl p-6 border border-border/50 card-hover"
                            >
                                <Quote size={24} className="text-green-primary/20 mb-3" />
                                <p className="text-sm text-mid-grey leading-relaxed mb-5 italic">
                                    &ldquo;{alum.quote}&rdquo;
                                </p>
                                <div className="border-t border-border pt-4">
                                    <div className="font-semibold text-charcoal text-sm">
                                        {alum.name}
                                    </div>
                                    <div className="text-xs text-mid-grey">
                                        {alum.role}, {alum.company} — {alum.cohort}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who You'll Work With */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            Who You&apos;ll Work With
                        </h2>
                        <p className="mt-3 text-mid-grey">
                            CGAP graduates work directly with industry-leading clients
                        </p>
                    </div>
                    <ClientLogoGrid featured clientNames={clientNames} />
                    <div className="text-center mt-8">
                        <Link
                            href="/customers"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-green-primary hover:gap-3 transition-all duration-200"
                        >
                            See All Clients
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Apply CTA */}
            <section className="bg-green-primary">
                <div className="container-main py-16 md:py-20 text-center">
                    <GraduationCap size={40} className="text-white/40 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to Launch Your Data Career?
                    </h2>
                    <p className="text-white/70 mb-8 max-w-xl mx-auto">
                        Applications for the next cohort are now open. Apply through our
                        recruitment portal.
                    </p>
                    <a
                        href={applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-green-primary font-semibold px-6 py-3 rounded-md hover:bg-light-grey transition-colors duration-150"
                    >
                        Apply Now
                        <ExternalLink size={16} />
                    </a>
                </div>
            </section>

            <PersonaBridge exclude="cgap" />
        </>
    );
}
