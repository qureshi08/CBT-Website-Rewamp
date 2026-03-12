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

const valueProps = [
    {
        icon: Users,
        title: "Deep Talent Pool",
        description: "30+ seasoned data consultants and a continuous CGAP pipeline.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        description:
            "Clients across FMCG, finance, retail, hospitality, and NGO sectors.",
    },
    {
        icon: Award,
        title: "Proven Specialisation",
        description: "Deep expertise in BI, data warehousing, and analytics.",
    },
    {
        icon: Target,
        title: "Track Record",
        description: "50+ clients served, 28+ CGAP cohorts, consistent delivery.",
    },
];

const testimonials = [
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

const techPartners = ["WeCrunch", "Microsoft", "Databricks", "Fivetran", "Snowflake"];

export default async function PartnersPage() {
    const supabase = await createClient();
    const { data: clientsData } = await supabase
        .from("clients")
        .select("name")
        .eq("is_featured", true)
        .order("display_order", { ascending: true });

    const clientNames = clientsData?.map((c) => c.name);

    return (
        <>
            {/* Hero */}
            <section className="bg-persona-partner text-white pt-[72px]">
                <div className="container-main py-20 md:py-32">
                    <div className="max-w-3xl">
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-4 bg-white/10 px-3 py-1 rounded">
                            Partner Ecosystem
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Deliver more, <span className="opacity-70 italic font-serif">together</span>
                        </h1>
                        <p className="mt-6 text-xl text-white/80 leading-relaxed max-w-2xl">
                            Technology. Delivery. Referral. Three ways to partner with CBT and unlock new opportunities for your clients.
                        </p>
                        <div className="mt-10">
                            <a href="#partner-form" className="inline-flex items-center gap-2 bg-white text-persona-partner font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-all shadow-xl shadow-black/10">
                                Arrange a Call
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partnership Models */}
            <section className="bg-white">
                <div className="container-main section-padding">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
                            Partnership Model
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {partnershipTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                                <div
                                    key={type.title}
                                    className="bg-tag-bg-purple rounded-2xl p-8 border border-persona-partner/10 group hover:border-persona-partner/30 transition-all text-center"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white text-persona-partner flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:scale-110 transition-transform">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-charcoal mb-4">
                                        {type.title}
                                    </h3>
                                    <p className="text-mid-grey leading-relaxed">
                                        {type.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Partner */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
                            Why Partner with CBT?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valueProps.map((prop) => {
                            const Icon = prop.icon;
                            return (
                                <div key={prop.title} className="bg-white p-6 rounded-xl border border-border/40 shadow-sm text-center">
                                    <div className="text-persona-partner mb-4 flex justify-center">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="font-bold text-charcoal mb-3">{prop.title}</h3>
                                    <p className="text-sm text-mid-grey leading-relaxed">
                                        {prop.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tech Partners Logos */}
            <section className="bg-white border-y border-border/40 py-16">
                <div className="container-main">
                    <div className="text-center mb-10">
                        <h3 className="text-sm font-bold text-mid-grey uppercase tracking-widest">Our Technology Partners</h3>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {techPartners.map(p => (
                            <span key={p} className="text-2xl font-bold text-charcoal select-none">{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Base */}
            <section className="bg-light-grey">
                <div className="container-main section-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                            Our Key Client Base
                        </h2>
                    </div>
                    <ClientLogoGrid featured clientNames={clientNames} />
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white">
                <div className="container-main section-padding border-t border-border/40">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
                            What Our Partners Say
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {testimonials.map((t) => (
                            <div key={t.author} className="bg-tag-bg-purple p-8 rounded-2xl border border-persona-partner/5 italic text-persona-partner">
                                <p className="text-lg leading-relaxed mb-6 font-serif">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="not-italic flex flex-col">
                                    <span className="font-bold text-charcoal">{t.author}</span>
                                    <span className="text-sm text-mid-grey">{t.company}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Registration Form */}
            <section className="bg-light-grey" id="partner-form">
                <div className="container-main section-padding border-t border-border/40">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-4">
                                Register as a Partner / Arrange a Call
                            </h2>
                            <p className="text-xl text-mid-grey">
                                Start the conversation today. No email addresses are shown publicly.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-persona-partner/5 border border-persona-partner/10">
                            <PartnerForm />
                        </div>
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="partners" />
        </>
    );
}
