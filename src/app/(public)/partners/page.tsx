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
import { IndustryLeadersStrip, TechPartnersStrip } from "@/components/home/ClientLogoStrip";
import PartnerForm from "@/components/partners/PartnerForm";
import ClientReveal from "@/components/shared/ClientReveal";
import { PartnersIllustration } from "@/components/shared/Illustrations";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Partners | CBT — Technology & Delivery Partnership Models",
    description:
        "Join CBT's partner ecosystem. We work with technology providers and delivery partners to bring superior data solutions to global clients.",
};

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
        { data: batchStat },
        { data: dbTestimonials },
    ] = await Promise.all([
        supabase.from("clients").select("name").eq("is_featured", true).order("display_order", { ascending: true }),
        supabase.from("partners").select("name, logo_url").eq("partner_type", "Technology").order("display_order", { ascending: true }),
        supabase.from("clients").select("*", { count: "exact", head: true }),
        (supabase.from("stats" as any).select("value").eq("label", "CGAP Batches").single() as any),
        supabase.from("testimonials").select("*").or("page.eq.Partners,page.eq.General").order("display_order", { ascending: true }),
    ]);

    const clientNames = clientsData?.map((c) => c.name);
    const displayClientCount = clientCount || 0;
    const displayBatchCount = batchStat?.value || 12;
    const testimonials = dbTestimonials?.length ? dbTestimonials : fallbackTestimonials;

    const partnershipTypes = [
        { icon: Cpu, title: "Technology Partner", desc: "Integrate your technology with our analytics expertise. Joint solutions for shared clients." },
        { icon: Truck, title: "Delivery Partner", desc: "Co-deliver engagements leveraging CBT's data domain expertise and your client relationships." },
        { icon: Share2, title: "Referral Partner", desc: "Refer opportunities and earn commission. Simple, transparent, and mutually beneficial." },
    ];

    const valueProps = staticValueProps.map(vp => ({
        ...vp,
        description: vp.title === "Track Record"
            ? `${displayClientCount}+ clients served, ${displayBatchCount}+ CGAP batches, consistent delivery.`
            : vp.descriptionTemplate,
    }));

    return (
        <main>
            <ClientReveal />
            {/* Hero */}
            <section className="hero-grid-texture" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 80px", background: "#fff", position: "relative", overflow: "hidden" }}>
                <div className="v2-wrap home-hero-grid" style={{ position: "relative", zIndex: 1, width: "100%" }}>
                    <div>
                        <div className="a-fadeUp-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--color-primary-muted)", borderRadius: "20px", padding: "5px 13px", marginBottom: "22px" }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-primary)", display: "inline-block", animation: "pulse 2s infinite" }} />
                            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-primary)" }}>Partner Ecosystem</span>
                        </div>
                        <h1 className="v2-h1 a-fadeUp-2" style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)", marginBottom: "18px" }}>
                            Deliver Superior Value, <br /> <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>Together.</em>
                        </h1>
                        <p className="a-fadeUp-3" style={{ fontFamily: "var(--font-body)", fontSize: "20px", fontWeight: 350, color: "#4B5563", lineHeight: 1.7, maxWidth: "460px", marginTop: "13px" }}>
                            Technology. Delivery. Referral. Three ways to partner with CBT and unlock enterprise-grade data opportunities for your clients.
                        </p>
                        <div className="a-fadeUp-4" style={{ display: "flex", gap: "16px", marginTop: "28px", flexWrap: "wrap", alignItems: "center" }}>
                            <a href="#partner-form" className="hero-btn-primary">
                                Arrange a Call <span>→</span>
                            </a>
                            <a href="#models" className="hero-btn-secondary">
                                Explore Models <span className="hero-btn-arrow">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="a-scaleIn home-hero-illustration" style={{ flexShrink: 0 }}>
                        <PartnersIllustration />
                    </div>
                </div>
            </section>

            {/* Models */}
            <section className="bg-white py-16" id="models">
                <div className="v2-wrap">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="v2-lbl v2-reveal">Co-Innovation</span>
                        <h2 className="v2-h2 v2-reveal" style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)" }}>Partnership Models</h2>
                    </div>
                    <div className="services-grid-bordered v2-reveal">
                        {partnershipTypes.map((type, i) => {
                            const Icon = type.icon;
                            const num = String(i + 1).padStart(2, "0");
                            return (
                                <div key={type.title} className="service-card">
                                    <span className="service-num">{num}</span>
                                    <div className="service-icon-wrap">
                                        <Icon size={20} strokeWidth={1.5} stroke="var(--color-primary)" />
                                    </div>
                                    <div className="service-title">{type.title}</div>
                                    <p className="service-desc">{type.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Partner */}
            <section className="bg-white py-20">
                <div className="v2-wrap">
                    <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 56px" }}>
                        <span className="v2-lbl v2-reveal">The Advantage</span>
                        <h2 className="v2-h2 v2-reveal" style={{ fontSize: "clamp(28px, 4vw, 36px)", marginBottom: "20px" }}>Why Global Leaders Partner with CBT?</h2>
                        <p className="v2-sub v2-reveal">We combine niche technical expertise with a proven delivery model to help our partners close gaps in their data stack and deliver enterprise-grade results.</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {valueProps.map((prop, i) => (
                            <div key={prop.title} className={`v2-reveal v2-d${i + 1}`} style={{ textAlign: "center" }}>
                                <div style={{ color: "var(--green)", marginBottom: "16px", display: "flex", justifyContent: "center" }}>
                                    <prop.icon size={32} />
                                </div>
                                <h3 className="v2-h3" style={{ fontSize: "17px", marginBottom: "8px" }}>{prop.title}</h3>
                                <p style={{ fontFamily: "var(--f-body)", fontSize: "13.5px", color: "var(--muted)", lineHeight: "1.6" }}>
                                    {prop.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Marquees */}
            <IndustryLeadersStrip clientNames={clientNames} />
            <TechPartnersStrip />

            {/* Testimonials */}
            <section className="bg-white py-16">
                <div className="v2-wrap">
                    <div className="section-header-bar v2-reveal" style={{ borderBottom: "none", paddingBottom: 0, marginBottom: "48px" }}>
                        <div>
                            <span style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "11px",
                                fontWeight: 600,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "var(--color-primary)",
                                marginBottom: "14px",
                                display: "block",
                            }}>Strategic Alliance</span>
                            <h2 style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                                fontWeight: 700,
                                color: "var(--color-text-heading)",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                            }}>What Our Partners Say</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {testimonials.map((t: any, i) => (
                            <div key={t.author} className={`v2-card v2-card-static v2-reveal v2-d${(i % 3) + 1}`} style={{ display: "flex", flexDirection: "column" }}>
                                <Quote size={20} style={{ color: "var(--green)", opacity: 0.2, marginBottom: "16px" }} />
                                <p style={{ fontFamily: "var(--f-body)", color: "var(--heading-c)", lineHeight: "1.6", marginBottom: "20px" }}>
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
                                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--green-muted)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", fontWeight: 700, fontSize: "10px" }}>
                                        {t.avatar_url ? (
                                            <img src={t.avatar_url} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            t.author[0]
                                        )}
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "var(--f-head)", fontWeight: 700, fontSize: "14px" }}>{t.author}</div>
                                        <div style={{ fontFamily: "var(--f-body)", fontSize: "10px", color: "var(--muted)", textTransform: "uppercase" }}>{t.company}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form */}
            <section id="partner-form" className="v2-section" style={{ background: "var(--surface)" }}>
                <div className="v2-wrap" style={{ padding: "64px 32px", position: "relative" }}>
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <h2 style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                                fontWeight: 700,
                                color: "var(--color-text-heading)",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                            }}>Arrange a Discovery Call</h2>
                        <p className="v2-sub" style={{ maxWidth: "560px", margin: "10px auto 0" }}>Start a conversation about how we can deliver more value together. Response within 24 hours.</p>
                    </div>
                    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <PartnerForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
