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
            description:
                "Work with us to transform your data capability and drive decision-making.",
            href: "/customers",
            color: "#2D7D46",
        },
        {
            icon: Handshake,
            title: "Partners",
            description:
                "Explore co-delivery partnerships and expand your technology reach.",
            href: "/partners",
            color: "#4CAF72",
        },
        {
            icon: Package,
            title: "Products",
            description:
                "Discover our Power BI custom visuals and analytics tools.",
            href: "/products",
            color: "#3A9E5A",
        },
        {
            icon: GraduationCap,
            title: "CGAP",
            description:
                "Join our 6-month graduate program and launch your data career.",
            href: "/cgap",
            color: "#2D7D46",
        },
    ];

    return (
        <section className="bg-light-grey">
            <div className="container-main section-padding">
                <div className="text-center mb-12">
                    <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                        Who are you?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
                        Find Your Journey
                    </h2>
                    <p className="mt-4 text-lg text-mid-grey max-w-2xl mx-auto">
                        Whether you&apos;re a customer, partner, product user, or aspiring
                        analyst — we have a path for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {personas.map((persona) => {
                        const Icon = persona.icon;
                        return (
                            <Link
                                key={persona.href}
                                href={persona.href}
                                className="bg-white rounded-xl p-6 border border-border/50 group card-hover relative overflow-hidden"
                            >
                                {/* Left accent border on hover */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top rounded-l-xl" />

                                <div className="w-12 h-12 rounded-xl bg-tag-bg flex items-center justify-center mb-4 group-hover:bg-green-primary transition-colors duration-200">
                                    <Icon
                                        size={22}
                                        className="text-green-primary group-hover:text-white transition-colors duration-200"
                                    />
                                </div>

                                <h3 className="text-lg font-bold text-charcoal mb-2">
                                    {persona.title}
                                </h3>
                                <p className="text-sm text-mid-grey leading-relaxed mb-4">
                                    {persona.description}
                                </p>

                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-primary group-hover:gap-2.5 transition-all duration-200">
                                    Explore
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
