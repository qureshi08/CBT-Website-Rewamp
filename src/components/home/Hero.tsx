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
        <section className="relative bg-white pt-[72px]">
            <div className="container-main py-20 md:py-28 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.12] tracking-tight text-charcoal">
                            Unlock the Power of{" "}
                            <span className="italic-accent">Your Data</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-mid-grey leading-relaxed max-w-lg">
                            We help organisations transform raw data into strategic advantage
                            through analytics, technology, and talent.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link href="/customers" className="btn-primary">
                                Our Work
                                <ArrowRight size={16} />
                            </Link>
                            <Link href="/contact" className="btn-outline">
                                Start a Conversation
                            </Link>
                        </div>
                    </div>

                    {/* Illustration / Visual */}
                    <div className="hidden lg:flex justify-center">
                        <div className="relative w-full max-w-lg aspect-square">
                            <img
                                src="/images/hero.png"
                                alt="CBT Data Consultancy Illustration"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
    );
}

export function PersonaCards() {
    const personas = [
        {
            icon: Users,
            title: "Customers",
            description: "Work with us to transform your data capability and drive decision-making.",
            href: "/customers",
            bgClass: "bg-tag-bg",
            iconClass: "text-persona-customer",
            hoverBorder: "bg-persona-customer",
            tag: "Services"
        },
        {
            icon: Handshake,
            title: "Partners",
            description: "Explore co-delivery partnerships and expand your technology reach.",
            href: "/partners",
            bgClass: "bg-tag-bg-purple",
            iconClass: "text-persona-partner",
            hoverBorder: "bg-persona-partner",
            tag: "Ecosystem"
        },
        {
            icon: Package,
            title: "Products",
            description: "Discover our Power BI custom visuals and analytics tools.",
            href: "/products",
            bgClass: "bg-tag-bg-orange",
            iconClass: "text-persona-products",
            hoverBorder: "bg-persona-products",
            tag: "Software"
        },
        {
            icon: GraduationCap,
            title: "CGAP",
            description: "Join our 6-month graduate program and launch your data career.",
            href: "/cgap",
            bgClass: "bg-tag-bg-red",
            iconClass: "text-persona-cgap",
            hoverBorder: "bg-persona-cgap",
            tag: "Careers"
        },
    ];

    return (
        <section className="bg-light-grey">
            <div className="container-main section-padding">
                <div className="text-center mb-16">
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-mid-grey mb-4 bg-white px-3 py-1 rounded shadow-sm">
                        Who are you?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-charcoal">
                        Find Your Journey
                    </h2>
                    <p className="mt-6 text-xl text-mid-grey max-w-2xl mx-auto leading-relaxed">
                        Whether you&apos;re a customer, partner, product user, or aspiring analyst — we have a path for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {personas.map((persona) => {
                        const Icon = persona.icon;
                        return (
                            <Link
                                key={persona.href}
                                href={persona.href}
                                className="bg-white rounded-2xl p-8 border border-border/40 group card-hover relative overflow-hidden flex flex-col h-full"
                            >
                                {/* Bottom accent border on hover */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${persona.hoverBorder} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                                <div className={`w-14 h-14 rounded-2xl ${persona.bgClass} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon
                                        size={28}
                                        className={persona.iconClass}
                                    />
                                </div>

                                <div className="mb-4">
                                    <span className={`text-[10px] uppercase font-black tracking-widest ${persona.iconClass} opacity-60`}>
                                        {persona.tag}
                                    </span>
                                    <h3 className="text-2xl font-bold text-charcoal mt-1">
                                        {persona.title}
                                    </h3>
                                </div>

                                <p className="text-mid-grey leading-relaxed mb-8 flex-grow">
                                    {persona.description}
                                </p>

                                <span className={`inline-flex items-center gap-2 text-sm font-bold ${persona.iconClass} group-hover:gap-3 transition-all duration-200`}>
                                    Explore Program
                                    <ArrowRight size={16} />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
