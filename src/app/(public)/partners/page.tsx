import { Metadata } from "next";
import Link from "next/link";
import {
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

            {/* ─── MODELS ─── */}
            <section id="models" className="services-section">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">partnership models</span>
                        <h2 className="services-section-title">
                            Three ways to{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                collaborate.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Technology, delivery, referral — pick the shape that fits your practice and the clients you already serve.
                        </p>
                    </div>

                    <div className="services-grid services-grid-3">
                        {partnershipTypes.map((type, i) => {
                            const Icon = type.icon;
                            const num = String(i + 1).padStart(2, "0");
                            return (
                                <article key={type.title} className="services-tile">
                                    <div className="services-tile-head">
                                        <div className="services-tile-icon">
                                            <Icon size={22} strokeWidth={1.5} stroke="var(--color-primary)" />
                                        </div>
                                        <span className="services-tile-num">{num}</span>
                                    </div>
                                    <div className="services-tile-title-row">
                                        <h3 className="services-tile-title">{type.title}</h3>
                                    </div>
                                    <p className="services-tile-desc">{type.desc}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── WHY PARTNER ─── */}
            <section className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">the advantage</span>
                        <h2 className="services-section-title">
                            Why global leaders partner with{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                CBT.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Niche technical expertise and a proven delivery model — so you can close gaps in your data stack without building the bench yourself.
                        </p>
                    </div>

                    <div className="services-grid services-grid-2">
                        {valueProps.map((prop, i) => {
                            const Icon = prop.icon;
                            const num = String(i + 1).padStart(2, "0");
                            return (
                                <article key={prop.title} className="services-tile">
                                    <div className="services-tile-head">
                                        <div className="services-tile-icon">
                                            <Icon size={22} strokeWidth={1.5} stroke="var(--color-primary)" />
                                        </div>
                                        <span className="services-tile-num">{num}</span>
                                    </div>
                                    <div className="services-tile-title-row">
                                        <h3 className="services-tile-title">{prop.title}</h3>
                                    </div>
                                    <p className="services-tile-desc">{prop.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── MARQUEES ─── */}
            <IndustryLeadersStrip clientNames={clientNames} />
            <TechPartnersStrip />

            {/* ─── TESTIMONIALS ─── */}
            <section className="services-section">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">strategic alliance</span>
                        <h2 className="services-section-title">
                            What our partners{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                say.
                            </em>
                        </h2>
                    </div>

                    <div className="partners-testimonial-grid">
                        {testimonials.map((t: any) => (
                            <article key={t.author} className="partners-testimonial-card v2-reveal">
                                <Quote size={20} style={{ color: "var(--color-primary)", opacity: 0.25, marginBottom: 16 }} />
                                <p className="partners-testimonial-quote">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="partners-testimonial-meta">
                                    <div className="partners-testimonial-avatar">
                                        {t.avatar_url ? (
                                            <img src={t.avatar_url} alt="" />
                                        ) : (
                                            t.author[0]
                                        )}
                                    </div>
                                    <div>
                                        <div className="partners-testimonial-author">{t.author}</div>
                                        <div className="partners-testimonial-company">{t.company}</div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FORM ─── */}
            <section id="partner-form" className="services-section services-section-alt">
                <div className="v2-wrap">
                    <div className="services-section-head v2-reveal">
                        <span className="services-section-tag">arrange a call</span>
                        <h2 className="services-section-title">
                            Start the{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                conversation.
                            </em>
                        </h2>
                        <p className="services-section-sub">
                            Tell us about your practice and the clients you serve. We&rsquo;ll come back within one business day.
                        </p>
                    </div>

                    <div className="partners-form-wrap v2-reveal">
                        <PartnerForm />
                    </div>
                </div>
            </section>

            {/* ─── CTA BAND ─── */}
            <section className="cta-band">
                <div className="v2-wrap cta-inner-grid">
                    <div>
                        <h2 className="cta-heading">
                            Prefer to talk before the{" "}
                            <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                                paperwork?
                            </em>
                        </h2>
                        <p className="cta-sub" style={{ fontFamily: "var(--font-body)" }}>
                            Thirty minutes with a senior consultant to sanity-check the fit — no form, no pitch.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                        <Link
                            href="/contact?intent=partnership"
                            className="btn-cta-white"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Book a Discovery Call →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
