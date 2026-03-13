import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    Cpu,
    Truck,
    Share2,
    Users,
    Globe,
    Award,
    Target,
    Quote,
} from "lucide-react";
import { ClientLogoGrid } from "@/components/home/ClientLogoStrip";
import PersonaBridge from "@/components/shared/PersonaBridge";
import PartnerForm from "@/components/partners/PartnerForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Partners | CBT — Technology & Delivery Partnership Models",
    description:
        "Join CBT's partner ecosystem. We work with technology providers and delivery partners to bring superior data solutions to global clients.",
};

const partnershipTypes = [
    {
        icon: Cpu,
        title: "Technology Partner",
        description:
            "Integrate your technology with our analytics expertise. Joint solutions for shared clients.",
    },
    {
        icon: Truck,
        title: "Delivery Partner",
        description:
            "Co-deliver engagements leveraging CBT's data domain expertise and your client relationships.",
    },
    {
        icon: Share2,
        title: "Referral Partner",
        description:
            "Refer opportunities and earn commission. Simple, transparent, and mutually beneficial.",
    },
];

const staticValueProps = [
    {
        icon: Users,
        title: "Deep Talent Pool",
        descriptionTemplate: "30+ seasoned data consultants and a continuous CGAP pipeline.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        descriptionTemplate:
            "Clients across FMCG, finance, retail, hospitality, and NGO sectors.",
    },
    {
        icon: Award,
        title: "Proven Specialisation",
        descriptionTemplate: "Deep expertise in BI, data warehousing, and analytics.",
    },
    {
        icon: Target,
        title: "Track Record",
        descriptionTemplate: "", // Will be dynamically generated
    },
];

const fallbackTestimonials = [
    {
        quote: "WeCrunch has been an excellent partner. Their data expertise and delivery speed is unmatched.",
        author: "Alex Rivera",
        company: "WeCrunch",
    },
    {
        quote: "The CGAP graduates they placed on our project exceeded all expectations from day one.",
        author: "Sarah Jenkins",
        company: "DataStream Solutions",
    },
    {
        quote: "CBT's analytics approach helped us scale our BI infrastructure faster than we thought possible.",
        author: "Michael Chen",
        company: "Nexus Analytics",
    },
];

export default async function PartnersPage() {
    const supabase = await createClient();

    // Fetch all data in parallel
    const [
        { data: clientsData },
        { data: partnersData },
        { count: clientCount },
        { count: batchCount },
        { data: dbTestimonials },
    ] = await Promise.all([
        supabase.from("clients").select("name").eq("is_featured", true).order("display_order", { ascending: true }),
        supabase.from("partners").select("name, logo_url").eq("partner_type", "Technology").order("display_order", { ascending: true }),
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("cgap_cohorts").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*").or("page.eq.Partners,page.eq.General").order("display_order", { ascending: true }),
    ]);

    const clientNames = clientsData?.map((c) => c.name);

    const techPartners = partnersData?.length
        ? partnersData
        : [{ name: "WeCrunch", logo_url: null }, { name: "Microsoft", logo_url: null }, { name: "Databricks", logo_url: null }, { name: "Fivetran", logo_url: null }, { name: "Snowflake", logo_url: null }];

    const displayClientCount = clientCount || 0;
    const displayBatchCount = batchCount || 0;

    const testimonials = dbTestimonials?.length ? dbTestimonials : fallbackTestimonials;

    // Build dynamic value props
    const valueProps = staticValueProps.map(vp => ({
        ...vp,
        description: vp.title === "Track Record"
            ? `${displayClientCount}+ clients served, ${displayBatchCount}+ CGAP batches, consistent delivery.`
            : vp.descriptionTemplate,
    }));

    return (
        <>
            <div className="font-body">
                {/* Hero */}
                <section className="bg-surface relative overflow-hidden">
                    {/* Abstract background elements */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-[-15deg] translate-x-1/2 -z-0" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                    <div className="container-main py-12 md:py-16 lg:py-20 relative z-10">
                        <div className="max-w-3xl text-center md:text-left">
                            <span className="uppercase-label text-primary mb-6 inline-block border-b border-primary/30 pb-1">
                                Partner Ecosystem
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading leading-[1.15] font-heading tracking-tight mb-6">
                                Deliver Superior Value, <br /> <span className="italic-accent text-primary">Together.</span>
                            </h1>
                            <p className="mt-6 text-base md:text-lg text-text-body/80 leading-relaxed max-w-2xl font-normal font-body">
                                Technology. Delivery. Referral. Three ways to partner with CBT
                                and unlock enterprise-grade data opportunities for your clients.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <a href="#partner-form" className="btn-primary shadow-lg shadow-primary/5">
                                    Arrange a Call
                                    <ArrowRight size={16} />
                                </a>
                                <a href="#models" className="btn-secondary">
                                    Explore Models
                                    <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partnership Models */}
                <section className="bg-white relative z-10 -mt-8 md:-mt-12" id="models">
                    <div className="container-main rounded-[24px] bg-white shadow-xl shadow-black/5 p-8 md:p-12 border border-border/40">
                        <div className="text-center mb-10">
                            <span className="uppercase-label text-primary mb-2 block">Co-Innovation</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-text-heading font-heading">
                                Our Partnership <span className="italic-accent text-primary">Models</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            {partnershipTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <div
                                        key={type.title}
                                        className="group card border border-border/40 p-8 flex flex-col items-center text-center"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary-muted text-primary flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="text-xl font-bold text-text-heading mb-4 font-heading group-hover:text-primary transition-colors">
                                            {type.title}
                                        </h3>
                                        <p className="text-sm text-text-body/70 leading-relaxed font-body">
                                            {type.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Partner */}
                <section className="bg-surface relative overflow-hidden">
                    <div className="container-main py-16">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="uppercase-label text-primary mb-3 block">The Advantage</span>
                                <h2 className="text-2xl md:text-4xl font-bold text-text-heading font-heading leading-tight mb-8">
                                    Why Global Leaders <br /> <span className="italic-accent text-primary">Partner with CBT?</span>
                                </h2>
                                <p className="text-base text-text-body/80 leading-relaxed mb-10 font-body">
                                    We combine niche technical expertise with a proven delivery model to help our partners close gaps in their data stack and accelerate client success.
                                </p>
                                <div className="grid grid-cols-2 gap-6">
                                    {valueProps.map((prop) => {
                                        const Icon = prop.icon;
                                        return (
                                            <div key={prop.title} className="space-y-3">
                                                <div className="text-primary">
                                                    <Icon size={24} />
                                                </div>
                                                <h3 className="font-bold text-text-heading text-base font-heading">{prop.title}</h3>
                                                <p className="text-[13px] text-text-body/70 leading-relaxed font-body">{prop.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl" />
                                <div className="relative bg-white rounded-2xl p-8 border border-border/40 shadow-xl">
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-5 pb-8 border-b border-border/40">
                                            <div className="text-3xl font-bold text-primary font-heading">{displayClientCount}+</div>
                                            <div className="uppercase-label text-text-heading text-[10px]">Enterprise <br /> Clients</div>
                                        </div>
                                        <div className="flex items-center gap-5 pb-8 border-b border-border/40">
                                            <div className="text-3xl font-bold text-primary font-heading">30+</div>
                                            <div className="uppercase-label text-text-heading text-[10px]">Data <br /> Specialists</div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <div className="text-3xl font-bold text-primary font-heading">{displayBatchCount}+</div>
                                            <div className="uppercase-label text-text-heading text-[10px]">CGAP <br /> Batches</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trusted by Section */}
                <section className="bg-white">
                    <div className="container-main py-12 md:py-16 pb-0">
                        <div className="text-center mb-10">
                            <span className="uppercase-label text-text-muted mb-2 block">Proven Reach</span>
                            <h2 className="text-2xl font-bold text-text-heading font-heading">
                                Trusted by Industry <span className="italic-accent text-primary">Leaders</span>
                            </h2>
                            <p className="mt-3 text-[13px] text-text-body/60 max-w-xl mx-auto font-body">
                                Partners join an ecosystem that delivers for global brands across sectors.
                            </p>
                        </div>
                        <ClientLogoGrid featured clientNames={clientNames} />
                    </div>
                </section>

                {/* Tech Partners Section */}
                <section className="bg-white border-y border-border/50">
                    <div className="container-main py-12 md:py-16">
                        <div className="text-center mb-10">
                            <span className="uppercase-label text-text-muted mb-2 block">Integration</span>
                            <h2 className="text-2xl font-bold text-text-heading font-heading">
                                Our Technology <span className="italic-accent text-primary">Stack Partners</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                            {techPartners.map((p: any) => (
                                <div key={p.name} className="flex flex-col items-center group">
                                    {p.logo_url ? (
                                        <img src={p.logo_url} alt={p.name} className="h-10 max-w-[140px] object-contain grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-500" />
                                    ) : (
                                        <span className="text-2xl lg:text-3xl font-bold text-text-heading/30 group-hover:text-text-heading tracking-tighter select-none font-heading transition-colors duration-500">{p.name}</span>
                                    )}
                                    <div className="w-6 h-1 bg-primary/20 mt-2 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="bg-surface relative overflow-hidden">
                    <div className="container-main py-16">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                            <div className="max-w-2xl text-center md:text-left">
                                <span className="uppercase-label text-primary mb-2 block">
                                    Strategic Alliance
                                </span>
                                <h2 className="text-2xl md:text-4xl font-bold text-text-heading font-heading leading-tight">
                                    What Our <span className="italic-accent text-primary">Partners</span> Say
                                </h2>
                            </div>
                            <div className="pb-1 hidden md:block">
                                <Quote size={40} className="text-primary opacity-10" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.map((t: any) => (
                                <div key={t.author} className="bg-white p-8 rounded-2xl border border-border/40 shadow-sm relative group hover:shadow-xl transition-all duration-300">
                                    <Quote size={20} className="text-primary/20 mb-6" />
                                    <p className="text-base leading-relaxed text-text-heading font-medium italic mb-8 relative z-10 font-body">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-muted flex items-center justify-center text-primary font-bold text-[10px]">
                                            {t.author[0]}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-text-heading text-xs font-heading">{t.author}</span>
                                            <span className="uppercase-label text-text-muted text-[8px] mt-0.5">{t.company}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Partner Form Section */}
                <section className="bg-white relative overflow-hidden px-6 pb-16 md:pb-20" id="partner-form">
                    <div className="container-main py-12 md:py-16 bg-surface rounded-[32px] border border-border/60 shadow-inner relative overflow-hidden text-center md:text-left">
                        {/* Decorative radial gradient */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="max-w-4xl mx-auto relative z-10 px-6">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl md:text-5xl font-bold text-text-heading mb-6 font-heading tracking-tight leading-tight">
                                    Arrange a <span className="italic-accent text-primary">Discovery Call</span>
                                </h2>
                                <p className="text-base text-text-body/70 max-w-2xl mx-auto font-body">
                                    Start a conversation about how we can deliver more value together.
                                    Our partnership team will respond within 24 hours.
                                </p>
                            </div>

                            <PartnerForm />
                        </div>
                    </div>
                </section>

                <PersonaBridge exclude="partners" />
            </div>
        </>
    );
}
