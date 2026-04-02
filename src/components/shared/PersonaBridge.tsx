"use client";
import Link from "next/link";
import Ic from "@/components/shared/Icons";

const personas = [
    { key: "customers", label: "Customers", href: "/customers", icon: "building" as const },
    { key: "partners", label: "Partners", href: "/partners", icon: "handshake" as const },
    { key: "products", label: "Products", href: "/products", icon: "pieChart" as const },
    { key: "cgap", label: "CGAP", href: "/cgap", icon: "graduation" as const },
];

export default function PersonaBridge({ exclude }: { exclude?: string }) {
    const items = personas.filter(p => p.key !== exclude);
    return (
        <div className="v2-bridge" style={{ margin: "48px 24px 0" }}>
            <div className="v2-wrap" style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", maxWidth: 1200 }}>
                <span style={{ fontFamily: "var(--f-body)", fontSize: "13px", fontWeight: 500, color: "var(--muted)", marginRight: "6px" }}>
                    Also explore:
                </span>
                {items.map(p => (
                    <Link key={p.key} href={p.href} style={{ textDecoration: "none" }}>
                        <div className="v2-bridge-chip">
                            <Ic name={p.icon} size={15} stroke="var(--green)" />
                            {p.label}
                            <Ic name="arrowRight" size={13} stroke="var(--muted)" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
