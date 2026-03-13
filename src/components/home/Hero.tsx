import Link from "next/link";
import {
    Users,
    Handshake,
    Package,
    GraduationCap,
    ArrowRight,
} from "lucide-react";

export default function Hero() {
    return (
        <section className="min-h-[85vh] flex items-center pt-[100px] px-8 pb-[60px] relative overflow-hidden bg-white before:absolute before:inset-0 before:bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] before:bg-[length:48px_48px] before:opacity-45 after:absolute after:-bottom-[120px] after:-right-[120px] after:w-[560px] after:h-[560px] after:rounded-full after:bg-[radial-gradient(circle,rgba(0,153,77,0.09)_0%,transparent_70%)] after:pointer-events-none">
            <div className="container-main w-full grid lg:grid-cols-2 gap-[64px] items-center relative z-10 transition-all">
                {/* Text Content */}
                <div className="text-left">
                    <div className="inline-flex items-center gap-[8px] text-[10px] font-semibold tracking-[0.1em] uppercase text-primary mb-[20px] animate-fade-in">
                        <span className="w-[5px] h-[5px] bg-primary rounded-full animate-pulse" />
                        Data · Cloud · Artificial Intelligence
                    </div>
                    <h1 className="font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-text-heading leading-[1.15] tracking-[-0.025em] mb-[20px] animate-fade-up">
                        Where data meets <em className="italic text-primary">intelligent</em> business strategy
                    </h1>
                    <p className="text-[15px] font-light leading-[1.65] text-text-body max-w-[440px] mb-[32px] animate-fade-up animation-delay-100">
                        We help ambitious businesses unlock the full potential of their data — through modern cloud infrastructure, AI adoption, and strategic consultancy that actually delivers.
                    </p>

                    <div className="flex items-center gap-[12px] animate-fade-up animation-delay-200">
                        <Link href="/contact" className="btn-primary">
                            Work with us
                            <span>→</span>
                        </Link>
                        <Link href="/services" className="btn-secondary group">
                            Explore services
                            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

                {/* Illustration / Visual */}
                <div className="animate-fade-up animation-delay-300 w-full max-w-[500px] mx-auto lg:mx-0 lg:max-w-none">
                    <div className="bg-white border border-border rounded-[14px] p-[24px] shadow-[0_4px_32px_rgba(0,0,0,0.05)] relative before:absolute before:top-0 before:left-[24px] before:right-[24px] before:h-[3px] before:bg-primary before:rounded-b-[3px]">
                        <div className="text-[10px] font-semibold tracking-[0.08em] uppercase text-text-muted mb-[16px]">
                            Client outcomes at a glance
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-border rounded-[8px] overflow-hidden mb-[20px]">
                            <div className="bg-white p-[16px] sm:rounded-tl-[8px]">
                                <div className="font-heading text-[1.75rem] font-bold text-text-heading leading-none mb-[4px]">
                                    40<span className="text-primary">%</span>
                                </div>
                                <div className="text-[11px] text-text-muted leading-[1.4]">Average reduction in data processing time</div>
                            </div>
                            <div className="bg-white p-[16px] sm:rounded-tr-[8px]">
                                <div className="font-heading text-[1.75rem] font-bold text-text-heading leading-none mb-[4px]">
                                    3<span className="text-primary">×</span>
                                </div>
                                <div className="text-[11px] text-text-muted leading-[1.4]">Faster cloud deployment cycles</div>
                            </div>
                            <div className="bg-white p-[16px] sm:col-span-2 sm:rounded-b-[8px]">
                                <div className="flex flex-col gap-[8px]">
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[11px] text-text-body font-medium">Data Strategy</span>
                                            <span className="text-[11px] text-primary font-semibold font-mono">94%</span>
                                        </div>
                                        <div className="h-[4px] bg-surface rounded-[2px] overflow-hidden">
                                            <div className="h-full bg-primary rounded-[2px] w-[94%]" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[11px] text-text-body font-medium">Cloud Migration</span>
                                            <span className="text-[11px] text-primary font-semibold font-mono">87%</span>
                                        </div>
                                        <div className="h-[4px] bg-surface rounded-[2px] overflow-hidden">
                                            <div className="h-full bg-primary rounded-[2px] w-[87%]" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[11px] text-text-body font-medium">AI Adoption</span>
                                            <span className="text-[11px] text-primary font-semibold font-mono">91%</span>
                                        </div>
                                        <div className="h-[4px] bg-surface rounded-[2px] overflow-hidden">
                                            <div className="h-full bg-primary rounded-[2px] w-[91%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[10px] pt-[16px] border-t border-border">
                            <div className="flex">
                                <div className="w-[24px] h-[24px] rounded-full border-2 border-white bg-surface flex items-center justify-center text-[9px] font-semibold text-text-muted overflow-hidden">SO</div>
                                <div className="w-[24px] h-[24px] rounded-full border-2 border-white bg-surface flex items-center justify-center text-[9px] font-semibold text-text-muted overflow-hidden -ml-[6px]">MK</div>
                                <div className="w-[24px] h-[24px] rounded-full border-2 border-white bg-surface flex items-center justify-center text-[9px] font-semibold text-text-muted overflow-hidden -ml-[6px]">JA</div>
                                <div className="w-[24px] h-[24px] rounded-full border-2 border-white bg-primary-muted text-primary flex items-center justify-center text-[9px] font-semibold overflow-hidden -ml-[6px]">+</div>
                            </div>
                            <div className="text-[11px] text-text-muted leading-[1.4]">
                                <strong className="text-text-heading font-semibold">50+ businesses</strong> transformed<br />
                                across the UK &amp; beyond
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function PersonaCards() {
    const personas = [
        {
            icon: Users,
            title: "Our Clients",
            description: "Work with us to transform your data capability and drive decision-making.",
            href: "/customers",
            tag: "Services"
        },
        {
            icon: Handshake,
            title: "Strategic Partners",
            description: "Explore co-delivery partnerships and expand your technology reach.",
            href: "/partners",
            tag: "Ecosystem"
        },
        {
            icon: Package,
            title: "Analytics Products",
            description: "Discover our Power BI custom visuals and analytics tools built for scale.",
            href: "/products",
            tag: "Software"
        },
        {
            icon: GraduationCap,
            title: "Graduate Talent",
            description: "Join our 6-month program and launch your high-growth data career.",
            href: "/cgap",
            tag: "Careers"
        },
    ];

    return (
        <section className="bg-surface py-16 px-8">
            <div className="container-main p-0">
                <div className="text-center mb-[48px]">
                    <span className="uppercase-label text-primary inline-block border-b border-primary pb-1 mb-5">
                        Who are you?
                    </span>
                    <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-text-heading tracking-[-0.02em]">
                        Tailored for <span className="italic text-primary">Your Journey</span>
                    </h2>
                    <p className="mt-[20px] text-[15px] text-text-body/80 max-w-xl mx-auto leading-[1.65] font-body">
                        Whether you&apos;re an enterprise leader, startup partner, or aspiring analyst — we have a path for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                    {personas.map((persona) => {
                        const Icon = persona.icon;
                        return (
                            <Link
                                key={persona.href}
                                href={persona.href}
                                className="group card flex flex-col h-full bg-white transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0_12px_40px_rgba(0,153,77,0.09)] p-6"
                            >
                                <div className="w-[40px] h-[40px] rounded-[8px] bg-primary-muted flex items-center justify-center mb-[24px] group-hover:scale-110 transition-transform duration-300">
                                    <Icon
                                        size={20}
                                        className="text-primary"
                                    />
                                </div>

                                <div className="mb-[12px]">
                                    <span className="uppercase-label text-primary border-b border-transparent pb-[2px] transition-colors group-hover:border-primary/30 text-[9px]">
                                        {persona.tag}
                                    </span>
                                    <h3 className="text-[18px] font-bold text-text-heading mt-[4px] font-heading group-hover:text-primary transition-colors">
                                        {persona.title}
                                    </h3>
                                </div>

                                <p className="text-[13px] text-text-body/80 leading-[1.55] mb-[24px] flex-grow">
                                    {persona.description}
                                </p>

                                <span className="inline-flex items-center gap-[6px] text-[12px] font-bold text-text-heading group-hover:text-primary group-hover:gap-[10px] transition-all duration-200 uppercase tracking-widest">
                                    Explore More
                                    <ArrowRight size={14} />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
