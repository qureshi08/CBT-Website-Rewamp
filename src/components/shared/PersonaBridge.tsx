import Link from "next/link";
import { Users, Package, GraduationCap, Handshake, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BridgeItem {
    href: string;
    icon: LucideIcon;
    label: string;
    description: string;
}

const allBridgeItems: Record<string, BridgeItem> = {
    customers: {
        href: "/customers",
        icon: Users,
        label: "Our Clients",
        description: "See who trusts us with their data",
    },
    partners: {
        href: "/partners",
        icon: Handshake,
        label: "Partner with Us",
        description: "Explore co-delivery opportunities",
    },
    products: {
        href: "/products",
        icon: Package,
        label: "Our Products",
        description: "Discover our Power BI visuals & tools",
    },
    cgap: {
        href: "/cgap",
        icon: GraduationCap,
        label: "CGAP Program",
        description: "Meet our graduate talent pipeline",
    },
};

interface PersonaBridgeProps {
    exclude: string; // key of the current page to exclude
}

export default function PersonaBridge({ exclude }: PersonaBridgeProps) {
    const items = Object.entries(allBridgeItems)
        .filter(([key]) => key !== exclude)
        .map(([, item]) => item);

    return (
        <section className="bg-tag-bg">
            <div className="container-main section-padding">
                <div className="text-center mb-10">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-green-primary">
                        Explore More
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-charcoal mt-2">
                        Also Relevant for You
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="bg-white rounded-xl p-6 flex flex-col items-center text-center group card-hover border border-border/50"
                            >
                                <div className="w-12 h-12 rounded-full bg-tag-bg flex items-center justify-center mb-4 group-hover:bg-green-primary transition-colors duration-200">
                                    <Icon
                                        size={22}
                                        className="text-green-primary group-hover:text-white transition-colors duration-200"
                                    />
                                </div>
                                <h3 className="font-semibold text-charcoal mb-1">
                                    {item.label}
                                </h3>
                                <p className="text-sm text-mid-grey mb-4 leading-relaxed">
                                    {item.description}
                                </p>
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-green-primary group-hover:gap-2 transition-all duration-200">
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
