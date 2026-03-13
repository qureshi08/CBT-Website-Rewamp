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
        <div className="bg-surface border-y border-border/50 py-16">
            <div className="container-main">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 text-center lg:text-left">
                    <div className="flex flex-col">
                        <span className="uppercase-label text-primary text-[10px] mb-2">
                            Next Steps
                        </span>
                        <span className="text-3xl font-bold text-text-heading font-heading">
                            Explore more of <span className="italic-accent text-primary">CBT.</span>
                        </span>
                    </div>

                    <div className="h-16 w-px bg-border/50 hidden lg:block" />

                    <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                        {items.map(([key, item]) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-5 text-sm font-semibold text-text-body/60 hover:text-primary transition-all group font-body"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-border/40 shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all text-primary">
                                        <Icon size={20} />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-text-heading group-hover:text-primary transition-colors flex items-center gap-2 font-bold font-heading text-lg">
                                            {item.label}
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </span>
                                        <span className="text-[11px] font-normal text-text-body/40 hidden sm:block whitespace-nowrap uppercase tracking-widest">{item.description}</span>
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
