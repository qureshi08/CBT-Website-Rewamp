"use client";

const CLIENTS = [
    "ThermosPHR", "Goody", "Cenium", "Pepsi", "Microsoft",
    "Coca-Cola", "P&G", "KPMG", "UNICEF", "Dabur",
    "MBC", "SPAR", "Bunge", "Shelfr", "Olayan",
];

// Fallback only — the live list is fetched from the `partners` Supabase table
// and passed into TechPartnersStrip via the `partnerNames` prop. This array
// renders when the query returns empty (e.g. before any rows have been seeded).
const TECH_PARTNERS = [
    "WeCrunch", "NuSoft", "KPMG",
    "Tabadlab", "Enable Success", "Red Buffer",
];

// ─── Shared scrolling rail component ───
function MarqueeRail({
    items,
    label,
    speed = 38,
    dark = true,
}: {
    items: string[];
    label: string;
    speed?: number;
    dark?: boolean;
}) {
    // Triple the items so there's no gap at the seam
    const tripled = [...items, ...items, ...items];

    return (
        <div
            style={{
                background: dark ? "#0C1A10" : "#F7F8F7",
                padding: "18px 0 20px",
                overflow: "hidden",
                borderTop: dark ? "none" : "1px solid #E2E8E4",
                borderBottom: dark ? "none" : "1px solid #E2E8E4",
            }}
        >
            {/* Label */}
            <p
                style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: dark ? "rgba(255,255,255,.28)" : "rgba(0,0,0,.35)",
                    textAlign: "center",
                    marginBottom: "14px",
                }}
            >
                {label}
            </p>

            {/* Scrolling rail */}
            <div style={{ overflow: "hidden", position: "relative" }}>
                {/* left/right fade masks */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "80px",
                        background: dark
                            ? "linear-gradient(to right, #0C1A10, transparent)"
                            : "linear-gradient(to right, #F7F8F7, transparent)",
                        zIndex: 2,
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: "80px",
                        background: dark
                            ? "linear-gradient(to left, #0C1A10, transparent)"
                            : "linear-gradient(to left, #F7F8F7, transparent)",
                        zIndex: 2,
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        animation: `marquee ${speed}s linear infinite`,
                        width: "max-content",
                    }}
                >
                    {tripled.map((name, i) => (
                        <span
                            key={i}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                fontFamily: "var(--font-heading)",
                                fontSize: "var(--text-sm)",
                                fontWeight: 600,
                                color: dark ? "rgba(255,255,255,.42)" : "rgba(0,0,0,.38)",
                                letterSpacing: ".01em",
                                padding: "0 28px",
                                whiteSpace: "nowrap",
                                borderRight: dark
                                    ? "1px solid rgba(255,255,255,.10)"
                                    : "1px solid rgba(0,0,0,.10)",
                                cursor: "default",
                                transition: "color .2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = dark
                                    ? "rgba(255,255,255,.86)"
                                    : "var(--color-primary)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = dark
                                    ? "rgba(255,255,255,.42)"
                                    : "rgba(0,0,0,.38)";
                            }}
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Default export: client marquee (dark) ───
export default function ClientLogoStrip({
    clientNames,
}: {
    clientNames?: string[];
}) {
    const names = clientNames?.length ? clientNames : CLIENTS;
    return (
        <MarqueeRail
            items={names}
            label="Trusted by Leading Organisations"
            speed={38}
            dark={true}
        />
    );
}

// ─── Named export: "Trusted by Industry Leaders" (dark) ───
export function IndustryLeadersStrip({
    clientNames,
}: {
    clientNames?: string[];
}) {
    const names = clientNames?.length ? clientNames : CLIENTS;
    return (
        <MarqueeRail
            items={names}
            label="Trusted by Industry Leaders"
            speed={42}
            dark={true}
        />
    );
}

// ─── Named export: Strategic Alliances (dark — matches other strips) ───
export function TechPartnersStrip({
    partnerNames,
}: {
    partnerNames?: string[];
}) {
    const names = partnerNames?.length ? partnerNames : TECH_PARTNERS;
    return (
        <MarqueeRail
            items={names}
            label="Our Strategic Alliances"
            speed={28}
            dark={true}
        />
    );
}

// ─── Named export: static logo grid for sub-pages ───
export function ClientLogoGrid({
    clientNames,
}: {
    clientNames?: string[];
}) {
    const names = clientNames?.length ? clientNames : CLIENTS;
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {names.map((c) => (
                <div
                    key={c}
                    style={{
                        background: "white",
                        border: "1px solid var(--color-border)",
                        borderRadius: "9px",
                        padding: "10px 20px",
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        color: "var(--color-text-muted)",
                        transition: "all .18s",
                        cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-primary)";
                        e.currentTarget.style.color = "var(--color-primary)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.color = "var(--color-text-muted)";
                    }}
                >
                    {c}
                </div>
            ))}
        </div>
    );
}
