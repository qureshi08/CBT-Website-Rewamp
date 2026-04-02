"use client";
// Animated SVG illustrations — pure geometric SVGs, no emojis, no clip-art

// Hero: animated data dashboard
export function HeroIllustration() {
    return (
        <svg width="300" height="220" viewBox="0 0 300 220" fill="none" style={{ flexShrink: 0 }}>
            <rect x="28" y="28" width="244" height="164" rx="14" fill="#0C1A10" opacity=".06" />
            <rect x="22" y="22" width="244" height="164" rx="14" fill="white" stroke="#E2E8E4" strokeWidth="1.5" />
            <rect x="22" y="22" width="244" height="36" rx="14" fill="#F7F8F7" />
            <rect x="22" y="44" width="244" height="14" fill="#F7F8F7" />
            <circle cx="42" cy="40" r="5" fill="#EF4444" opacity=".5" />
            <circle cx="58" cy="40" r="5" fill="#F59E0B" opacity=".5" />
            <circle cx="74" cy="40" r="5" fill="#00994D" opacity=".5" />
            <rect x="96" y="34" width="80" height="10" rx="3" fill="#E2E8E4" />
            {/* Bars — animated */}
            <rect x="44" y="102" width="24" height="62" rx="4" fill="#00994D" opacity=".85"
                style={{ transformOrigin: "44px 164px", animation: "barGrow .7s .1s cubic-bezier(.22,1,.36,1) both" }} />
            <rect x="78" y="82" width="24" height="82" rx="4" fill="#00994D" opacity=".65"
                style={{ transformOrigin: "78px 164px", animation: "barGrow .7s .2s cubic-bezier(.22,1,.36,1) both" }} />
            <rect x="112" y="118" width="24" height="46" rx="4" fill="#00994D" opacity=".45"
                style={{ transformOrigin: "112px 164px", animation: "barGrow .7s .3s cubic-bezier(.22,1,.36,1) both" }} />
            <rect x="146" y="72" width="24" height="92" rx="4" fill="#00994D" opacity=".9"
                style={{ transformOrigin: "146px 164px", animation: "barGrow .7s .4s cubic-bezier(.22,1,.36,1) both" }} />
            <rect x="180" y="94" width="24" height="70" rx="4" fill="#00994D" opacity=".6"
                style={{ transformOrigin: "180px 164px", animation: "barGrow .7s .5s cubic-bezier(.22,1,.36,1) both" }} />
            <rect x="214" y="60" width="24" height="104" rx="4" fill="#00994D" opacity=".75"
                style={{ transformOrigin: "214px 164px", animation: "barGrow .7s .6s cubic-bezier(.22,1,.36,1) both" }} />
            {/* Trend line */}
            <polyline points="56,130 90,112 124,128 158,90 192,106 226,72"
                stroke="#00C060" strokeWidth="2.5" fill="none" strokeLinecap="round"
                strokeDasharray="400"
                style={{ animation: "drawLine 1.2s .7s ease forwards", strokeDashoffset: 400 }} />
            <circle cx="226" cy="72" r="5" fill="#00C060"
                style={{ animation: "fadeIn .3s 1.8s ease both", opacity: 0 }} />
            {/* Floating +24.6% card */}
            <g style={{ animation: "float 3.8s ease-in-out infinite" }}>
                <rect x="190" y="6" width="98" height="44" rx="8" fill="white" stroke="#E2E8E4" strokeWidth="1.5" />
                <rect x="202" y="16" width="30" height="6" rx="2" fill="#E2E8E4" />
                <text x="202" y="40" fontFamily="DM Sans,sans-serif" fontSize="13" fontWeight="700" fill="#00994D">+24.6%</text>
            </g>
            {/* Floating info pill */}
            <g style={{ animation: "floatB 4.2s 1s ease-in-out infinite" }}>
                <rect x="2" y="80" width="76" height="30" rx="8" fill="white" stroke="#E2E8E4" strokeWidth="1.5" />
                <circle cx="16" cy="95" r="6" fill="#E6F5ED" />
                <rect x="28" y="89" width="40" height="5" rx="2" fill="#E2E8E4" />
                <rect x="28" y="97" width="28" height="4" rx="2" fill="#E6F5ED" />
            </g>
        </svg>
    );
}

// CGAP illustration — 3 graduate silhouettes connected to CBT hub
export function CGAPIllustration() {
    return (
        <svg width="260" height="190" viewBox="0 0 260 190" fill="none" style={{ flexShrink: 0 }}>
            <path d="M50 140 Q130 80 210 140" stroke="#E6F5ED" strokeWidth="28" fill="none" strokeLinecap="round" />
            <path d="M50 140 Q130 80 210 140" stroke="#00994D" strokeWidth="2" fill="none"
                strokeDasharray="300" style={{ animation: "drawLine 1.4s .5s ease forwards", strokeDashoffset: 300 }} />
            <g style={{ animation: "fadeUp .5s .2s ease both", opacity: 0 }}>
                <circle cx="50" cy="90" r="22" fill="#E6F5ED" stroke="#00994D" strokeWidth="1.5" />
                <circle cx="50" cy="84" r="8" fill="#00994D" opacity=".7" />
                <path d="M34 106 Q50 96 66 106" stroke="#00994D" strokeWidth="1.5" fill="none" />
                <rect x="32" y="118" width="36" height="14" rx="5" fill="#007A3D" opacity=".8" />
                <rect x="36" y="122" width="28" height="6" rx="2" fill="white" opacity=".5" />
            </g>
            <g style={{ animation: "fadeUp .5s .38s ease both", opacity: 0 }}>
                <circle cx="130" cy="72" r="26" fill="#E6F5ED" stroke="#00994D" strokeWidth="1.5" />
                <circle cx="130" cy="65" r="9" fill="#00994D" opacity=".85" />
                <path d="M112 88 Q130 77 148 88" stroke="#00994D" strokeWidth="1.5" fill="none" />
                <rect x="112" y="102" width="36" height="14" rx="5" fill="#00994D" />
                <rect x="116" y="106" width="28" height="6" rx="2" fill="white" opacity=".5" />
            </g>
            <g style={{ animation: "fadeUp .5s .54s ease both", opacity: 0 }}>
                <circle cx="210" cy="90" r="22" fill="#E6F5ED" stroke="#00994D" strokeWidth="1.5" />
                <circle cx="210" cy="84" r="8" fill="#00994D" opacity=".7" />
                <path d="M194 106 Q210 96 226 106" stroke="#00994D" strokeWidth="1.5" fill="none" />
                <rect x="192" y="118" width="36" height="14" rx="5" fill="#007A3D" opacity=".8" />
                <rect x="196" y="122" width="28" height="6" rx="2" fill="white" opacity=".5" />
            </g>
            <g style={{ animation: "scaleIn .5s .7s ease both", opacity: 0 }}>
                <circle cx="130" cy="158" r="22" fill="#00994D" />
                <text x="130" y="163" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="11" fontWeight="700" fill="white">CBT</text>
            </g>
            <line x1="50" y1="140" x2="112" y2="154" stroke="#00994D" strokeWidth="1" strokeDasharray="4 3" opacity=".5" />
            <line x1="210" y1="140" x2="148" y2="154" stroke="#00994D" strokeWidth="1" strokeDasharray="4 3" opacity=".5" />
        </svg>
    );
}

// Products: mini BI dashboard
export function ProductIllustration({ color = "#00994D" }: { color?: string }) {
    return (
        <svg width="200" height="138" viewBox="0 0 200 138" fill="none"
            style={{ animation: "float 3.4s ease-in-out infinite", flexShrink: 0 }}>
            <rect x="1" y="1" width="198" height="136" rx="10" fill="white" stroke="#E2E8E4" strokeWidth="1.5" />
            <rect x="1" y="1" width="198" height="30" rx="10" fill="#F7F8F7" />
            <rect x="1" y="21" width="198" height="10" fill="#F7F8F7" />
            <circle cx="16" cy="16" r="5" fill="#EF4444" opacity=".45" />
            <circle cx="28" cy="16" r="5" fill="#F59E0B" opacity=".45" />
            <circle cx="40" cy="16" r="5" fill="#00994D" opacity=".45" />
            <rect x="60" y="11" width="80" height="10" rx="3" fill="#E2E8E4" />
            {[
                { x: 20, h: 52, o: 0.9 }, { x: 44, h: 38, o: 0.65 }, { x: 68, h: 60, o: 0.8 },
                { x: 92, h: 30, o: 0.5 }, { x: 116, h: 50, o: 0.75 }, { x: 140, h: 66, o: 0.9 }, { x: 164, h: 42, o: 0.6 }
            ].map((bar, i) => (
                <rect key={i} x={bar.x} y={104 - bar.h} width={18} height={bar.h} rx="3" fill={color} opacity={bar.o} />
            ))}
            <polyline points="29,78 53,90 77,72 101,96 125,80 149,60 173,74"
                stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
            {[0, 1, 2].map(i => (
                <line key={i} x1="12" y1={44 + i * 24} x2="188" y2={44 + i * 24} stroke="#E2E8E4" strokeWidth=".8" />
            ))}
        </svg>
    );
}

// Customers: Enterprise Growth & Global Presence
export function CustomersIllustration() {
    return (
        <svg width="280" height="200" viewBox="0 0 280 200" fill="none" style={{ flexShrink: 0 }}>
            {/* Global Grid Background */}
            <path d="M40 160h200M40 120h200M40 80h200M40 40h200M80 40v120M120 40v120M160 40v120M200 40v120"
                stroke="#E2E8E4" strokeWidth="0.5" strokeDasharray="3 3" />

            {/* Central Enterprise Node */}
            <g style={{ animation: "float 4s ease-in-out infinite" }}>
                <rect x="110" y="70" width="60" height="60" rx="12" fill="white" stroke="#00994D" strokeWidth="1.5" />
                <path d="M125 100l5-5 5 5M145 100l-5-5-5 5" stroke="#00994D" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Orbiting client nodes */}
            <circle cx="50" cy="60" r="6" fill="#E6F5ED" stroke="#00994D" strokeWidth="1"
                style={{ animation: "pulse 2.5s infinite" }} />
            <circle cx="230" cy="80" r="8" fill="#E6F5ED" stroke="#00994D" strokeWidth="1.2"
                style={{ animation: "pulse 3s infinite" }} />
            <circle cx="60" cy="150" r="5" fill="#E6F5ED" stroke="#00994D" strokeWidth="1"
                style={{ animation: "pulse 2.8s infinite" }} />
            <circle cx="210" cy="140" r="7" fill="#E6F5ED" stroke="#00994D" strokeWidth="1.2"
                style={{ animation: "pulse 3.2s infinite" }} />

            {/* Connecting lines */}
            <line x1="56" y1="65" x2="110" y2="90" stroke="#00994D" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3"
                style={{ animation: "drawLine 1s 0.2s ease forwards", strokeDashoffset: 100 }} />
            <line x1="222" y1="85" x2="170" y2="105" stroke="#00994D" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
            <line x1="68" y1="145" x2="115" y2="125" stroke="#00994D" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />

            {/* Success Bar */}
            <g style={{ animation: "floatB 3.5s 0.5s ease-in-out infinite" }}>
                <rect x="170" y="30" width="80" height="32" rx="8" fill="white" stroke="#E2E8E4" strokeWidth="1" />
                <rect x="182" y="43" width="30" height="5" rx="2" fill="#00994D" opacity="0.4" />
                <path d="M220 46l4-4 4 4" stroke="#00994D" strokeWidth="1.5" strokeLinecap="round" />
            </g>
        </svg>
    );
}

// Partners: Interlocking Synergy
export function PartnersIllustration() {
    return (
        <svg width="240" height="180" viewBox="0 0 240 180" fill="none" style={{ flexShrink: 0 }}>
            {/* Background Hex Pattern */}
            <path d="M20 40l15-8 15 8v16l-15 8-15-8z M190 120l15-8 15 8v16l-15 8-15-8z"
                stroke="#E2E8E4" strokeWidth="1" strokeDasharray="2 2" />

            {/* Two Interlocking Hexagons/Cubes */}
            <g style={{ animation: "float 4s ease-in-out infinite" }}>
                <path d="M80 60l30-16 30 16v32l-30 16-30-16z" fill="white" stroke="#00994D" strokeWidth="1.5" />
                <path d="M110 44v32l-30-16 M110 76l30-16" stroke="#00994D" strokeWidth="1" opacity="0.3" />
            </g>

            <g style={{ animation: "floatB 4s 0.5s ease-in-out infinite" }}>
                <path d="M130 90l30-16 30 16v32l-30 16-30-16z" fill="#E6F5ED" stroke="#00994D" strokeWidth="1.5" opacity="0.8" />
                <path d="M160 74v32l-30-16 M160 106l30-16" stroke="#00994D" strokeWidth="1" opacity="0.4" />
            </g>

            {/* Flowing data particles */}
            <circle r="3" fill="#00C060">
                <animateMotion path="M110 90 Q130 90 150 90" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="2.5" fill="#00994D" opacity="0.6">
                <animateMotion path="M110 110 Q140 100 170 100" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
            </circle>

            {/* Floating Connection Tag */}
            <rect x="20" y="100" width="70" height="24" rx="12" fill="white" stroke="#E2E8E4" strokeWidth="1"
                style={{ animation: "scaleIn 0.5s 1s ease both", opacity: 0 }} />
            <text x="35" y="115" fontFamily="DM Sans" fontSize="9" fontWeight="700" fill="#00994D">SYNCED</text>
        </svg>
    );
}
