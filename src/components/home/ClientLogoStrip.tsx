"use client";

import { useEffect, useRef, useState } from "react";
import { Plus as PlusIcon } from "lucide-react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type LogoItem = {
    name: string;
    logoUrl?: string | null;
};

const MOSAIC_CELL_COUNT = 10;
const MOSAIC_SWAP_INTERVAL_MS = 2500;
// Must mirror the CSS animation duration in globals.css (.logo-mosaic-fade-*).
const MOSAIC_FADE_MS = 700;

// Per-cell border + plus-marker config for the 5×2 desktop / 2×5 mobile grid.
// Mirrors TechPartnersGrid's PARTNERS_GRID_LAYOUT pattern:
//   - border-r/border-b draw internal grid lines
//   - the wrapper supplies top + bottom hairlines that bleed to viewport edges
//   - the `+` marker decorates each *internal* cell intersection
//
// Index map:
//   Desktop (5×2):              Mobile (2×5):
//   [0] [1] [2] [3] [4]         [0] [1]
//   [5] [6] [7] [8] [9]         [2] [3]
//                               [4] [5]
//                               [6] [7]
//                               [8] [9]
const MOSAIC_LAYOUT: { border: string; plus: string | null }[] = [
    { border: "border-r border-b", plus: "block" },                          // 0 — inner on both
    { border: "border-b md:border-r", plus: "hidden md:block" },             // 1 — mobile last col, desktop inner
    { border: "border-r border-b", plus: "block" },                          // 2 — inner on both
    { border: "border-b md:border-r", plus: "hidden md:block" },             // 3 — mobile last col, desktop inner
    { border: "border-r border-b md:border-r-0", plus: "block md:hidden" },  // 4 — mobile inner, desktop last col
    { border: "border-b md:border-r md:border-b-0", plus: null },            // 5 — mobile last col, desktop last row
    { border: "border-r border-b md:border-b-0", plus: "block md:hidden" },  // 6 — mobile inner, desktop last row
    { border: "border-b md:border-r md:border-b-0", plus: null },            // 7 — mobile last col, desktop last row
    { border: "border-r", plus: null },                                      // 8 — last row both layouts, inner col
    { border: "", plus: null },                                              // 9 — last cell on both
];

function shuffle<T>(arr: T[]): T[] {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

function logoKey(item: LogoItem): string {
    return `${item.name}|${item.logoUrl ?? ""}`;
}

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

// Fallback only — the live list is fetched from the `partners` Supabase table
// and passed into TechPartnersStrip via the `partnerNames` prop. This array
// renders when the query returns empty (e.g. before any rows have been seeded).
const TECH_PARTNERS = [
    "WeCrunch", "NuSoft", "KPMG",
    "Tabadlab", "Enable Success", "Red Buffer",
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

// ─── Logo mosaic — static grid with single-cell cross-fade swaps ───

function LogoFace({ item, mode }: { item: LogoItem; mode: "in" | "out" }) {
    const className =
        mode === "in" ? "logo-mosaic-fade-in" : "logo-mosaic-fade-out";

    return (
        <div className={className}>
            {item.logoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                    src={item.logoUrl}
                    alt={item.name}
                    className="pointer-events-none select-none object-contain h-9 max-w-[130px] md:h-12 md:max-w-[180px]"
                    style={{ filter: "grayscale(1)" }}
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
        </div>
    );
}

function MosaicCell({
    item,
    borderClasses,
    plusClasses,
}: {
    item: LogoItem;
    borderClasses: string;
    plusClasses: string | null;
}) {
    const [previous, setPrevious] = useState<LogoItem | null>(null);
    const lastItemRef = useRef(item);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            lastItemRef.current = item;
            return;
        }
        if (logoKey(lastItemRef.current) === logoKey(item)) return;

        const prev = lastItemRef.current;
        lastItemRef.current = item;
        setPrevious(prev);

        const t = setTimeout(() => setPrevious(null), MOSAIC_FADE_MS + 40);
        return () => clearTimeout(t);
    }, [item]);

    return (
        <div
            className={`relative flex items-center justify-center px-4 py-8 md:p-10 ${borderClasses}`}
            style={{ borderColor: "var(--color-border)" }}
        >
            <LogoFace
                key={`curr-${logoKey(item)}`}
                item={item}
                mode="in"
            />
            {previous && (
                <LogoFace
                    key={`prev-${logoKey(previous)}`}
                    item={previous}
                    mode="out"
                />
            )}
            {plusClasses && (
                <PlusIcon
                    className={`absolute z-10 ${plusClasses}`}
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
}

// Top-N slice. No duplicate-padding — if the pool is smaller than the grid,
// we render fewer cells rather than show the same logo twice.
function takeTopForCells(items: LogoItem[]): LogoItem[] {
    return items.slice(0, MOSAIC_CELL_COUNT);
}

// Weighted random index pick. weights need not sum to anything in particular;
// each weight is its own probability mass.
function pickWeightedIndex(weights: number[]): number {
    const total = weights.reduce((s, w) => s + w, 0);
    if (total <= 0) return 0;
    let r = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r <= 0) return i;
    }
    return weights.length - 1;
}

function LogoMosaic({
    items,
    eyebrow,
    title,
    description,
}: {
    items: LogoItem[];
    eyebrow?: string;
    title: React.ReactNode;
    description?: string;
}) {
    // SSR-safe initial state: deterministic top-N slice. Shuffled on mount.
    const [cells, setCells] = useState<LogoItem[]>(() => takeTopForCells(items));
    const lastSwappedRef = useRef<number>(-1);

    // Reshuffle starting positions on the client so the top-N don't always
    // render in display_order.
    useEffect(() => {
        if (items.length === 0) return;
        setCells(shuffle(takeTopForCells(items)));
    }, [items]);

    // Single-cell cross-fade swap loop. Only runs when there's a swap pool
    // (i.e. more items than visible cells) and motion is allowed.
    //
    // Frequency weighting: position in `items` = priority rank (0 = top).
    //   - Cell to swap OUT: weighted toward cells holding low-priority logos
    //     (weight = rank + 1, so top item rarely leaves but isn't pinned).
    //   - Logo to swap IN:  weighted toward high-priority logos in the pool
    //     (weight = items.length - rank).
    // Net effect: high-priority logos visible more often over time.
    useEffect(() => {
        if (items.length <= MOSAIC_CELL_COUNT) return;

        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduced) return;

        const interval = setInterval(() => {
            if (typeof document !== "undefined" && document.hidden) return;

            setCells((prev) => {
                const rankByKey = new Map<string, number>();
                items.forEach((it, i) => rankByKey.set(logoKey(it), i));

                // Pick which cell to swap out (favour low-priority logos).
                const cellWeights = prev.map(
                    (item) => (rankByKey.get(logoKey(item)) ?? 0) + 1,
                );
                let cellIdx = pickWeightedIndex(cellWeights);
                if (cellIdx === lastSwappedRef.current && prev.length > 1) {
                    const retry = pickWeightedIndex(cellWeights);
                    cellIdx = retry === lastSwappedRef.current
                        ? (cellIdx + 1) % prev.length
                        : retry;
                }
                lastSwappedRef.current = cellIdx;

                // Pick which logo to swap in (favour high-priority items),
                // restricted to logos not currently visible — guarantees no
                // duplicate logo on screen at the same time.
                const inUse = new Set(prev.map(logoKey));
                const available = items.filter((p) => !inUse.has(logoKey(p)));
                if (available.length === 0) return prev;

                const newWeights = available.map(
                    (p) => items.length - (rankByKey.get(logoKey(p)) ?? 0),
                );
                const newItem = available[pickWeightedIndex(newWeights)];

                const next = [...prev];
                next[cellIdx] = newItem;
                return next;
            });
        }, MOSAIC_SWAP_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [items]);

    if (cells.length === 0) return null;

    return (
        <section
            className="py-[64px] md:py-[96px]"
            style={{ background: "#FFFFFF" }}
        >
            <div className="v2-wrap">
                <div
                    className="mb-[40px] md:mb-[56px]"
                    style={{
                        textAlign: "center",
                        maxWidth: 720,
                        marginInline: "auto",
                    }}
                >
                    {eyebrow && (
                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: ".18em",
                                textTransform: "uppercase",
                                color: "rgba(0,0,0,.42)",
                                margin: "0 0 14px",
                            }}
                        >
                            {eyebrow}
                        </p>
                    )}
                    <h2
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: "-.02em",
                            color: "var(--color-text-heading)",
                            margin: description ? "0 0 18px" : 0,
                        }}
                    >
                        {title}
                    </h2>
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
                    className="relative grid grid-cols-2 md:grid-cols-5"
                    style={{ borderColor: "var(--color-border)" }}
                >
                    {/* Top hairline — extends to viewport edges */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 w-screen border-t"
                        style={{ borderColor: "var(--color-border)" }}
                    />

                    {cells.map((item, i) => {
                        const cfg = MOSAIC_LAYOUT[i] ?? { border: "", plus: null };
                        return (
                            <MosaicCell
                                key={i}
                                item={item}
                                borderClasses={cfg.border}
                                plusClasses={cfg.plus}
                            />
                        );
                    })}

                    {/* Bottom hairline — extends to viewport edges */}
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

// ─── Default export: client logo mosaic ───
export default function ClientLogoStrip({
    clients,
    clientNames,
}: {
    clients?: LogoItem[];
    clientNames?: string[];
}) {
    const items = normalise(clients ?? clientNames, CLIENTS);
    return (
        <LogoMosaic
            items={items}
            eyebrow="Our clients"
            title={
                <>
                    Trusted by leading organisations{" "}
                    <em style={{ fontStyle: "italic", color: "var(--color-primary)" }}>
                        across industries.
                    </em>
                </>
            }
            description="From global brands to ambitious challengers in banking, retail, telecom, and FMCG, we partner with teams turning data, cloud, and AI into measurable outcomes."
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
        <LogoMosaic
            items={items}
            eyebrow="Industry leaders"
            title="Building alongside the teams shaping their industries"
            description="A selection of the partners we've worked with on data, cloud, and AI engagements across regions and sectors."
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
