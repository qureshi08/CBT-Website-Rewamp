"use client";

import { useEffect, useState } from "react";
import { Plus as PlusIcon } from "lucide-react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type LogoItem = {
    name: string;
    logoUrl?: string | null;
};

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, [breakpoint]);
    return isMobile;
}

const CLIENTS: LogoItem[] = [
    { name: "ThermosPHR" }, { name: "Goody" }, { name: "Cenium" },
    { name: "Pepsi" }, { name: "Microsoft" }, { name: "Coca-Cola" },
    { name: "P&G" }, { name: "KPMG" }, { name: "UNICEF" },
    { name: "Dabur" }, { name: "MBC" }, { name: "SPAR" },
    { name: "Bunge" }, { name: "Shelfr" }, { name: "Olayan" },
];

const TECH_PARTNERS: LogoItem[] = [
    { name: "WeCrunch" }, { name: "NuSoft" }, { name: "KPMG" },
    { name: "Tabadlab" }, { name: "Enable Success" }, { name: "Red Buffer" },
];

// Accept legacy string[] or the new object[] shape and normalise.
function normalise(
    input: string[] | LogoItem[] | undefined,
    fallback: LogoItem[],
): LogoItem[] {
    if (!input?.length) return fallback;
    return input.map((item) =>
        typeof item === "string" ? { name: item } : item,
    );
}

function MarqueeRail({
    items,
    label,
    duration = 40,
}: {
    items: LogoItem[];
    label: string;
    duration?: number;
}) {
    const isMobile = useIsMobile();
    const gap = isMobile ? 40 : 80;

    // Split into two interleaved rows for mobile so each row carries a balanced mix.
    const rowA = isMobile ? items.filter((_, i) => i % 2 === 0) : items;
    const rowB = isMobile ? items.filter((_, i) => i % 2 === 1) : [];

    return (
        <section
            className="py-[48px] md:py-[72px]"
            style={{ background: "#FFFFFF" }}
        >
            <p
                className="mb-[22px] md:mb-[32px]"
                style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,.42)",
                    textAlign: "center",
                }}
            >
                {label}
            </p>

            <div className="relative w-full overflow-hidden">
                <div className="flex flex-col gap-3 md:gap-0">
                    <div className="relative h-[64px] md:h-[88px] w-full overflow-hidden">
                        <InfiniteSlider
                            className="flex h-full w-full items-center"
                            duration={duration}
                            gap={gap}
                        >
                            {rowA.map((item, i) => (
                                <LogoCell key={`a-${item.name}-${i}`} item={item} />
                            ))}
                        </InfiniteSlider>
                    </div>

                    {isMobile && rowB.length > 0 && (
                        <div className="relative h-[64px] w-full overflow-hidden">
                            <InfiniteSlider
                                className="flex h-full w-full items-center"
                                duration={duration + 6}
                                gap={gap}
                                reverse
                            >
                                {rowB.map((item, i) => (
                                    <LogoCell key={`b-${item.name}-${i}`} item={item} />
                                ))}
                            </InfiniteSlider>
                        </div>
                    )}
                </div>

                <ProgressiveBlur
                    className="pointer-events-none absolute top-0 bottom-0 left-0 w-[60px] md:w-[180px]"
                    direction="left"
                    blurIntensity={1}
                />
                <ProgressiveBlur
                    className="pointer-events-none absolute top-0 bottom-0 right-0 w-[60px] md:w-[180px]"
                    direction="right"
                    blurIntensity={1}
                />
            </div>
        </section>
    );
}

function LogoCell({ item }: { item: LogoItem }) {
    const cellClass =
        "flex flex-none items-center justify-center w-[140px] h-[56px] md:w-[200px] md:h-[72px]";

    if (item.logoUrl) {
        return (
            <div className={cellClass}>
                <img
                    src={item.logoUrl}
                    alt={item.name}
                    className="w-auto h-auto object-contain max-h-[36px] max-w-[115px] md:max-h-[56px] md:max-w-[170px]"
                    style={{ filter: "grayscale(1)" }}
                />
            </div>
        );
    }

    return (
        <div className={cellClass}>
            <span
                style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "rgba(0,0,0,.45)",
                    letterSpacing: ".01em",
                    whiteSpace: "nowrap",
                }}
            >
                {item.name}
            </span>
        </div>
    );
}

// ─── Default export: client marquee ───
export default function ClientLogoStrip({
    clients,
    clientNames,
}: {
    clients?: LogoItem[];
    clientNames?: string[];
}) {
    const items = normalise(clients ?? clientNames, CLIENTS);
    return (
        <MarqueeRail
            items={items}
            label="Trusted by Leading Organisations"
            duration={40}
        />
    );
}

// ─── Named export: "Trusted by Industry Leaders" ───
export function IndustryLeadersStrip({
    clients,
    clientNames,
}: {
    clients?: LogoItem[];
    clientNames?: string[];
}) {
    const items = normalise(clients ?? clientNames, CLIENTS);
    return (
        <MarqueeRail
            items={items}
            label="Trusted by Industry Leaders"
            duration={44}
        />
    );
}

// ─── Named export: Strategic Alliances ───
export function TechPartnersStrip({
    partners,
    partnerNames,
}: {
    partners?: LogoItem[];
    partnerNames?: string[];
}) {
    const items = normalise(partners ?? partnerNames, TECH_PARTNERS);
    return (
        <MarqueeRail
            items={items}
            label="Our Strategic Alliances"
            duration={32}
        />
    );
}

// ─── Named export: static partner grid (3×2 desktop / 2×3 mobile) ───
// Sized for exactly 6 logos; extra entries are dropped, fewer entries leave
// trailing cells empty. Border + plus-marker pattern is hardcoded for the
// 6-cell layout — change the layout map below if the count ever shifts.
const PARTNERS_GRID_LAYOUT: { border: string; plus: string | null }[] = [
    // [0] inner cell on both layouts → permanent BR plus
    { border: "border-r border-b", plus: "block" },
    // [1] mobile last col / desktop inner → plus only on desktop
    { border: "border-b md:border-r", plus: "hidden md:block" },
    // [2] mobile inner / desktop last col → plus only on mobile
    { border: "border-r border-b md:border-r-0", plus: "block md:hidden" },
    // [3] mobile last col / desktop last row col 0
    { border: "border-b md:border-b-0 md:border-r", plus: null },
    // [4] mobile last row col 0 / desktop last row col 1
    { border: "border-r", plus: null },
    // [5] last cell in both layouts
    { border: "", plus: null },
];

export function TechPartnersGrid({
    partners,
    partnerNames,
    eyebrow = "Our Strategic Alliances",
    title,
    description,
}: {
    partners?: LogoItem[];
    partnerNames?: string[];
    eyebrow?: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
}) {
    const items = normalise(partners ?? partnerNames, TECH_PARTNERS).slice(0, 6);
    const hasFullHeader = !!title || !!description;

    return (
        <section
            className="py-[64px] md:py-[96px]"
            style={{ background: "#FFFFFF" }}
        >
            <div className="v2-wrap">
                <div
                    className={hasFullHeader ? "mb-[40px] md:mb-[56px]" : "mb-[22px] md:mb-[36px]"}
                    style={{ textAlign: "center", maxWidth: 720, margin: hasFullHeader ? "0 auto 48px" : undefined }}
                >
                    <p
                        className={hasFullHeader ? "mb-[14px]" : ""}
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: ".18em",
                            textTransform: "uppercase",
                            color: "rgba(0,0,0,.42)",
                            margin: hasFullHeader ? "0 0 14px" : 0,
                        }}
                    >
                        {eyebrow}
                    </p>
                    {title && (
                        <h2
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                                fontWeight: 700,
                                lineHeight: 1.15,
                                letterSpacing: "-.02em",
                                color: "var(--color-text-heading)",
                                margin: "0 0 16px",
                            }}
                        >
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "17.5px",
                                fontWeight: 300,
                                lineHeight: 1.7,
                                color: "var(--color-text-muted)",
                                margin: 0,
                                maxWidth: 620,
                                marginInline: "auto",
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>

                <div
                    className="relative grid grid-cols-2 md:grid-cols-3"
                    style={{ borderColor: "var(--color-border)" }}
                >
                    {/* Top hairline — extends to the viewport edges */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 w-screen border-t"
                        style={{ borderColor: "var(--color-border)" }}
                    />

                    {items.map((item, i) => {
                        const cfg = PARTNERS_GRID_LAYOUT[i] ?? { border: "", plus: null };
                        return (
                            <div
                                key={`${item.name}-${i}`}
                                className={`relative flex items-center justify-center px-4 py-8 md:p-10 ${cfg.border}`}
                                style={{ borderColor: "var(--color-border)" }}
                            >
                                {item.logoUrl ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={item.logoUrl}
                                        alt={item.name}
                                        className="pointer-events-none select-none object-contain h-7 max-w-[140px] md:h-9 md:max-w-[170px]"
                                        draggable={false}
                                    />
                                ) : (
                                    <span
                                        style={{
                                            fontFamily: "var(--font-heading)",
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            color: "var(--color-text-muted)",
                                            letterSpacing: ".01em",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                )}
                                {cfg.plus && (
                                    <PlusIcon
                                        className={`absolute z-10 ${cfg.plus}`}
                                        size={20}
                                        strokeWidth={1.25}
                                        style={{
                                            right: -10,
                                            bottom: -10,
                                            color: "var(--color-text-muted)",
                                            opacity: 0.55,
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}

                    {/* Bottom hairline — extends to the viewport edges */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-px left-1/2 -translate-x-1/2 w-screen border-b"
                        style={{ borderColor: "var(--color-border)" }}
                    />
                </div>
            </div>
        </section>
    );
}

// ─── Named export: static logo grid for sub-pages ───
export function ClientLogoGrid({
    clients,
    clientNames,
}: {
    clients?: LogoItem[];
    clientNames?: string[];
}) {
    const items = normalise(clients ?? clientNames, CLIENTS);
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {items.map((c) => (
                <div
                    key={c.name}
                    style={{
                        background: "white",
                        border: "1px solid var(--color-border)",
                        borderRadius: "9px",
                        padding: c.logoUrl ? "8px 16px" : "10px 20px",
                        minHeight: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all .18s",
                        cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-primary)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-border)";
                    }}
                >
                    {c.logoUrl ? (
                        <img
                            src={c.logoUrl}
                            alt={c.name}
                            style={{
                                maxHeight: "28px",
                                maxWidth: "120px",
                                width: "auto",
                                height: "auto",
                                objectFit: "contain",
                                filter: "grayscale(1)",
                            }}
                        />
                    ) : (
                        <span
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "var(--text-sm)",
                                fontWeight: 600,
                                color: "var(--color-text-muted)",
                            }}
                        >
                            {c.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
