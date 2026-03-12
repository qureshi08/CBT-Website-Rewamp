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
        .filter(([key]) => key !== exclude);

    return (
        <div className="bg-light-grey border-y border-border/40 py-10">
            <div className="container-main">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center md:text-left">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-mid-grey uppercase tracking-[0.3em] mb-1">
                            Continue Browsing
                        </span>
                        <span className="text-xl font-bold text-charcoal">
                            Explore more of CBT
                        </span>
                    </div>

                    <div className="h-px w-12 bg-border hidden md:block" />

                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {items.map(([key, item]) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 text-sm font-bold text-mid-grey hover:text-charcoal transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white border border-border/50 flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-all shadow-sm">
                                        <Icon size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                            {item.label}
                                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </span>
                                        <span className="text-[10px] font-normal opacity-60 hidden sm:block">{item.description}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
