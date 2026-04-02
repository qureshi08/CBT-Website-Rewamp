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
import PersonaBridge from "@/components/shared/PersonaBridge";
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
            <section style={{ paddingTop: "120px", paddingBottom: "72px", background: "var(--surface)" }}>
                <div className="v2-wrap" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "56px", alignItems: "center" }}>
                    <div>
                        <div className="v2-lbl v2-reveal">Partner Ecosystem</div>
                        <h1 className="v2-h1 v2-reveal" style={{ fontSize: "clamp(34px, 4.5vw, 50px)", marginBottom: "18px" }}>
                            Deliver Superior Value, <br /> <span className="italic-accent text-primary">Together.</span>
                        </h1>
                        <p className="v2-sub v2-reveal" style={{ maxWidth: "560px" }}>
                            Technology. Delivery. Referral. Three ways to partner with CBT and unlock enterprise-grade data opportunities for your clients.
                        </p>
                        <div className="v2-reveal" style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                            <a href="#partner-form" className="v2-btn v2-btn-p">Arrange a Call <ArrowRight size={16} stroke="white" /></a>
                            <a href="#models" className="v2-btn v2-btn-s">Explore Models</a>
                        </div>
                    </div>
                    <div className="v2-reveal a-scaleIn">
                        <PartnersIllustration />
                    </div>
                </div>
            </section>

            {/* Models */}
            <section className="bg-white py-16" id="models">
                <div className="v2-wrap">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="v2-lbl v2-reveal">Co-Innovation</span>
                        <h2 className="v2-h2 v2-reveal">Partnership Models</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", alignItems: "stretch" }}>
                        {partnershipTypes.map((type, i) => {
                            const Icon = type.icon;
                            return (
                                <div key={type.title} className={`v2-pc v2-reveal v2-d${(i % 3) + 1}`} style={{ textAlign: "center", alignItems: "center" }}>
                                    <div className="v2-pc-icon"><Icon size={20} /></div>
                                    <h3 className="v2-h3" style={{ fontSize: "17px", marginBottom: "8px" }}>{type.title}</h3>
                                    <p style={{ fontFamily: "var(--f-body)", fontSize: "13.5px", color: "var(--muted)", lineHeight: "1.6" }}>{type.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Partner */}
            <section className="bg-surface py-16">
                <div className="v2-wrap">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
                        <div>
                            <span className="v2-lbl v2-reveal">The Advantage</span>
                            <h2 className="v2-h2 v2-reveal" style={{ fontSize: "32px", marginBottom: "20px" }}>Why Global Leaders Partner with CBT?</h2>
                            <p className="v2-sub v2-reveal" style={{ marginBottom: "32px" }}>We combine niche technical expertise with a proven delivery model to help our partners close gaps in their data stack.</p>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                                {valueProps.map(prop => (
                                    <div key={prop.title}>
                                        <div style={{ color: "var(--green)", marginBottom: "8px" }}><prop.icon size={24} /></div>
                                        <h3 className="v2-h3" style={{ fontSize: "15px", marginBottom: "4px" }}>{prop.title}</h3>
                                        <p style={{ fontFamily: "var(--f-body)", fontSize: "12px", color: "var(--muted)", lineHeight: "1.5" }}>{prop.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="v2-reveal v2-card" style={{ padding: "40px" }}>
                            <div style={{ display: "grid", gap: "32px" }}>
                                {[[displayClientCount + "+", "Enterprise Clients"], ["30+", "Data Specialists"], [displayBatchCount + "+", "CGAP Batches"]].map(([n, l]) => (
                                    <div key={l} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "20px" }}>
                                        <div style={{ color: "var(--green)", fontSize: "32px", fontWeight: 700 }}>{n}</div>
                                        <div className="v2-lbl" style={{ marginBottom: 0 }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquees */}
            <IndustryLeadersStrip clientNames={clientNames} />
            <TechPartnersStrip />

            {/* Testimonials */}
            <section className="bg-surface py-16">
                <div className="v2-wrap">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="v2-lbl v2-reveal">Strategic Alliance</span>
                        <h2 className="v2-h2 v2-reveal">What Our Partners Say</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
                        {testimonials.map((t: any, i) => (
                            <div key={t.author} className={`v2-card v2-reveal v2-d${(i % 3) + 1}`}>
                                <Quote size={20} style={{ color: "var(--green)", opacity: 0.2, marginBottom: "16px" }} />
                                <p style={{ fontFamily: "var(--f-head)", fontStyle: "italic", color: "var(--heading-c)", lineHeight: "1.6", marginBottom: "20px" }}>
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--green-muted)", color: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "10px" }}>{t.author[0]}</div>
                                    <div>
                                        <div style={{ fontFamily: "var(--f-head)", fontWeight: 700, fontSize: "12px" }}>{t.author}</div>
                                        <div style={{ fontFamily: "var(--f-body)", fontSize: "10px", color: "var(--muted)", textTransform: "uppercase" }}>{t.company}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form */}
            <section id="partner-form" className="v2-section">
                <div className="v2-wrap" style={{ background: "var(--surface)", borderRadius: "32px", padding: "64px 32px", position: "relative", overflow: "hidden" }}>
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <h2 className="v2-h2">Arrange a Discovery Call</h2>
                        <p className="v2-sub" style={{ maxWidth: "560px", margin: "10px auto 0" }}>Start a conversation about how we can deliver more value together. Response within 24 hours.</p>
                    </div>
                    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <PartnerForm />
                    </div>
                </div>
            </section>

            <PersonaBridge exclude="partners" />
        </main>
    );
}
