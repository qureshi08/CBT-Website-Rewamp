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
                <span className="section-tag px-3 py-1 bg-primary-muted rounded-full inline-block mb-4">
                    {label}
                </span>
            )}
            <h2 className={`section-heading ${light ? "!text-white" : ""}`}>
                {title}
            </h2>
            {description && (
                <p className={`section-sub mt-4 ${centered ? "mx-auto" : ""} ${light ? "!text-white/70" : ""}`}>
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
