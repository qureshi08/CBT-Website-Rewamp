import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
    label?: string;
    title: string;
    description?: string;
    centered?: boolean;
    light?: boolean;
}

export default function SectionHeader({
    label,
    title,
    description,
    centered = true,
    light = false,
}: SectionHeaderProps) {
    return (
        <div className={`mb-12 ${centered ? "text-center" : ""}`}>
            {label && (
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-green-primary bg-tag-bg px-3 py-1.5 rounded-full mb-4">
                    {label}
                </span>
            )}
            <h2
                className={`text-3xl md:text-4xl font-bold leading-tight ${light ? "text-white" : "text-charcoal"
                    }`}
            >
                {title}
            </h2>
            {description && (
                <p
                    className={`mt-4 text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""
                        } ${light ? "text-white/70" : "text-mid-grey"}`}
                >
                    {description}
                </p>
            )}
        </div>
    );
}

interface CTAButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: "primary" | "outline";
    external?: boolean;
    className?: string;
}

export function CTAButton({
    href,
    children,
    variant = "primary",
    external = false,
    className = "",
}: CTAButtonProps) {
    const baseClass = variant === "primary" ? "btn-primary" : "btn-outline";

    if (external) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClass} ${className}`}
            >
                {children}
                <ArrowRight size={16} />
            </a>
        );
    }

    return (
        <Link href={href} className={`${baseClass} ${className}`}>
            {children}
            <ArrowRight size={16} />
        </Link>
    );
}
