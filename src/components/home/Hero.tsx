import Link from "next/link";
import {
    Users,
    Handshake,
    Package,
    GraduationCap,
    ArrowRight,
    Sparkles,
    BarChart2,
    Cloud,
    Cpu
} from "lucide-react";

export default function Hero() {
    return (
        <section className="hero hero-grid-texture min-h-[95vh] flex items-center pt-[140px] px-8 pb-[100px] relative overflow-hidden bg-white">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,153,77,0.06)_0%,transparent_70%)] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,153,77,0.04)_0%,transparent_70%)] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="container-main w-full grid lg:grid-cols-2 gap-[100px] items-center relative z-10 transition-all">
                {/* Text Content */}
                <div className="text-left max-w-2xl">
                    <div className="inline-flex items-center gap-[10px] px-4 py-2 bg-primary-muted rounded-full text-[11px] font-bold tracking-[0.12em] uppercase text-primary mb-[32px] animate-fade-in">
                        <Sparkles size={14} className="animate-pulse" />
                        Data · Cloud · Artificial Intelligence
                    </div>

                    <h1 className="font-heading text-[clamp(2.8rem,5.5vw,4.2rem)] font-bold text-text-heading leading-[1.1] tracking-[-0.03em] mb-[28px] animate-fade-up">
                        Enabling Business to Harness Data <br className="hidden md:block" />
                        <span className="text-primary italic-accent">and Deliver Business Value</span>
                    </h1>

                    <p className="text-[18px] font-body leading-[1.75] text-text-body max-w-[540px] mb-[48px] animate-fade-up animation-delay-100 italic">
                        Strategic agile development experts. We help companies create software that rapidly scales business.
                    </p>

                    <div className="flex flex-wrap items-center gap-[16px] animate-fade-up animation-delay-200">
                        <Link href="/contact" className="btn-primary h-[52px] px-8 text-[15px]">
                            Work with us
                            <ArrowRight size={18} />
                        </Link>
                        <a href="#services" className="btn-secondary h-[52px] px-8 text-[15px] group">
                            Explore services
                            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>

                {/* Illustration / Visual */}
                <div className="animate-fade-up animation-delay-300 w-full relative">
                    <div className="relative z-10 bg-white border border-border rounded-[24px] p-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] before:absolute before:top-0 before:left-[40px] before:right-[40px] before:h-[4px] before:bg-primary before:rounded-b-[4px]">
                        <div className="flex justify-between items-center mb-[32px]">
                            <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-text-muted">
                                Real-time Insights
                            </div>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="p-5 bg-surface rounded-2xl border border-border/50">
                                <BarChart2 size={24} className="text-primary mb-3" />
                                <div className="text-2xl font-bold text-text-heading font-heading mb-1">40%</div>
                                <div className="text-[10px] text-text-muted leading-tight uppercase font-bold tracking-wider">Processing Time Reduction</div>
                            </div>
                            <div className="p-5 bg-surface rounded-2xl border border-border/50">
                                <Cloud size={24} className="text-primary mb-3" />
                                <div className="text-2xl font-bold text-text-heading font-heading mb-1">3×</div>
                                <div className="text-[10px] text-text-muted leading-tight uppercase font-bold tracking-wider">Faster Deployment</div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            {[
                                { label: "Data Strategy", val: 94, icon: BarChart2 },
                                { label: "Cloud Migration", val: 87, icon: Cloud },
                                { label: "AI Adoption", val: 91, icon: Cpu }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[12px] text-text-heading font-semibold flex items-center gap-2">
                                            <item.icon size={14} className="text-primary" />
                                            {item.label}
                                        </span>
                                        <span className="text-[11px] text-primary font-bold font-mono">{item.val}%</span>
                                    </div>
                                    <div className="h-[6px] bg-border/30 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${item.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t border-border">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-border flex items-center justify-center text-[10px] font-bold text-text-muted">
                                        {["SO", "MK", "JA"][i - 1]}
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                                    +
                                </div>
                            </div>
                            <div className="text-[12px] text-text-body leading-tight">
                                <strong className="text-text-heading font-bold">50+ businesses</strong> transformed<br />
                                <span className="text-text-muted text-[11px]">Across the UK & beyond</span>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Background Card */}
                    <div className="absolute -bottom-6 -left-6 w-full h-full border border-primary/20 bg-primary/5 rounded-[24px] -z-10" />
                </div>
            </div>
        </section>
    );
}

export function PersonaCards() {
    const personas = [
        {
            icon: Users,
            title: "Customer",
            description: "Work with us to transform your data capability and drive decision-making.",
            href: "/customers",
            tag: "Clients",
            cta: "Explore"
        },
        {
            icon: Handshake,
            title: "Partner",
            description: "Co-deliver with our expert consulting teams and expand target reach.",
            href: "/partners",
            tag: "Collaboration",
            cta: "Explore"
        },
        {
            icon: Package,
            title: "Products",
            description: "Power BI custom visuals and analytics tools built for data teams.",
            href: "/products",
            tag: "Solutions",
            cta: "Explore"
        },
        {
            icon: GraduationCap,
            title: "CGAP",
            description: "Graduate program bridging academia to industry for data talent.",
            href: "/cgap",
            tag: "Talent",
            cta: "Apply"
        },
    ];

    return (
        <section className="bg-surface py-24 px-8 border-y border-border">
            <div className="container-main p-0">
                <div className="text-center mb-[64px]">
                    <span className="section-tag inline-block px-4 py-1 bg-primary-muted rounded-full">
                        Your Journey
                    </span>
                    <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-text-heading tracking-[-0.02em] mt-4">
                        Choose your <span className="text-primary italic-accent">journey</span>
                    </h2>
                    <p className="mt-[20px] text-[16px] text-text-body font-body leading-[1.7] max-w-2xl mx-auto">
                        Whether you're an enterprise leader, startup partner, or aspiring analyst — we have a tailored path for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                    {personas.map((persona) => {
                        const Icon = persona.icon;
                        return (
                            <div
                                key={persona.title}
                                className="group card flex flex-col h-full bg-white relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Icon size={80} />
                                </div>

                                <div className="w-[48px] h-[48px] rounded-[12px] bg-primary text-white flex items-center justify-center mb-[28px] transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-primary/20">
                                    <Icon size={24} />
                                </div>

                                <div className="mb-[16px]">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em]">
                                        {persona.tag}
                                    </span>
                                    <h3 className="text-[22px] font-bold text-text-heading mt-1 font-heading group-hover:text-primary transition-colors">
                                        {persona.title}
                                    </h3>
                                </div>

                                <p className="text-[14px] text-text-body leading-[1.65] mb-[32px] flex-grow font-body">
                                    {persona.description}
                                </p>

                                <Link
                                    href={persona.href}
                                    className="btn-primary h-[44px] w-full mt-auto"
                                >
                                    {persona.cta}
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
