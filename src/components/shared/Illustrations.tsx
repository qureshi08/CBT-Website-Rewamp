"use client";
import { motion } from "framer-motion";

// ─── UTILS: REUSABLE GRADIENTS ───
const Gradients = () => (
    <defs>
        <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="1" />
            <stop offset="100%" stopColor="#006633" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="grad-glow-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--green)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
        </linearGradient>
        <pattern id="circuits" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 10 10 L 0 10 M 30 40 L 30 30 L 40 30" fill="none" stroke="var(--green)" strokeWidth="0.5" opacity="0.1" />
            <circle cx="10" cy="10" r="1.5" fill="var(--green)" opacity="0.1" />
            <circle cx="30" cy="30" r="1.5" fill="var(--green)" opacity="0.1" />
        </pattern>
    </defs>
);

// ─── HOME: THE ADVANCED INTELLIGENCE HUB (MAX HIGH-FIDELITY) ───
// Represents the "Neural Core" of CBT's Data, Cloud & AI Expertise.
export function HeroIllustration() {
    return (
        <motion.svg
            width="500" height="420" viewBox="0 0 500 420" fill="none"
            initial="hidden" animate="visible"
            className="overflow-visible"
        >
            <Gradients />

            {/* Background Circuit Mesh */}
            <rect width="500" height="420" fill="url(#circuits)" />

            {/* Orbital Rings - The outer intelligence layers */}
            <g transform="translate(250, 210)">
                {[160, 190].map((r, i) => (
                    <motion.circle
                        key={i} r={r} stroke="var(--green)" strokeWidth="0.8" strokeDasharray="10 20" opacity="0.1"
                        animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    />
                ))}
            </g>

            {/* The Central "Data Sun" / Neural Core */}
            <g transform="translate(250, 210)">
                <motion.circle
                    r="80" fill="url(#grad-glow-center)"
                    animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />

                {/* Geodesic Inner Hub (Rotating Prism) */}
                <motion.g
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    <motion.path
                        d="M0 -60 L50 -20 L50 20 L0 60 L-50 20 L-50 -20 Z"
                        fill="white" stroke="var(--green)" strokeWidth="2" opacity="0.9"
                        animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
                    />
                    <path d="M0 -60 v120 M-50 -20 L50 20 M-50 20 L50 -20" stroke="var(--green)" strokeWidth="0.5" opacity="0.4" />
                    <motion.circle
                        r="12" fill="var(--green)"
                        animate={{ scale: [1, 1.5, 1], filter: ["blur(0px)", "blur(4px)", "blur(0px)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.g>

                {/* Satellite Feature Nodes (Cloud, Data, AI) */}
                {[0, 120, 240].map((angle, i) => (
                    <motion.g
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                    >
                        <g transform={`translate(${110 * Math.cos(angle * Math.PI / 180)}, ${110 * Math.sin(angle * Math.PI / 180)})`}>
                            <motion.rect
                                x="-20" y="-20" width="40" height="40" rx="8" fill="white" stroke="var(--green)" strokeWidth="1.5"
                                animate={{ rotate: -360 }} transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                            />
                            <text x="0" y="4" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="var(--green)" letterSpacing="0.05em">
                                {i === 0 ? "CLOUD" : i === 1 ? "DATA" : "AI LAB"}
                            </text>

                            {/* Constant Connection Line to Core */}
                            <line x1="0" y1="0" x2={-110 * Math.cos(angle * Math.PI / 180)} y2={-110 * Math.sin(angle * Math.PI / 180)} stroke="var(--green)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
                        </g>
                    </motion.g>
                ))}
            </g>

            {/* High-Speed Data Beams (Rapid Success) */}
            {[0, 45, 135, 180, 225, 315].map((angle, i) => (
                <motion.g key={i} transform={`rotate(${angle}, 250, 210)`}>
                    <motion.rect
                        width="80" height="2" x="140" fill="url(#beam-grad)"
                        animate={{ x: [140, 300] }}
                        transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeIn" }}
                    />
                </motion.g>
            ))}

            {/* Code Shards (Floating around the periphery) */}
            {[1, 2, 3, 4, 5].map((shard, i) => (
                <motion.path
                    key={i} d="M0 0 L15 5 L5 15 Z" fill="var(--green)" opacity="0.15"
                    animate={{
                        x: [250 + 180 * Math.cos(i), 250 + 220 * Math.cos(i)],
                        y: [210 + 180 * Math.sin(i), 210 + 220 * Math.sin(i)],
                        rotate: [0, 360],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 10, delay: i * 2, repeat: Infinity }}
                />
            ))}
        </motion.svg>
    );
}

// ─── CUSTOMERS (USER APPROVED) ───
export function CustomersIllustration() {
    return (
        <motion.svg
            width="360" height="260" viewBox="0 0 360 260" fill="none"
            initial="hidden" animate="visible"
        >
            <Gradients />
            <motion.path d="M260 60 L300 80 L280 120 L240 100 Z" fill="white" stroke="var(--green)" strokeWidth="2" animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }} transition={{ duration: 4, repeat: Infinity }} />
            <motion.circle cx="270" cy="90" r="20" fill="url(#grad-glow-center)" opacity="0.3" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
            <text x="250" y="140" fontSize="10" fontWeight="800" fill="var(--green)">GOAL REACHED</text>
            <motion.path d="M60 180 Q 160 180 260 100" stroke="var(--green)" strokeWidth="4" fill="none" strokeDasharray="500" strokeDashoffset="500" animate={{ strokeDashoffset: 0 }} transition={{ duration: 2.5, ease: "easeInOut" }} />
            <g transform="translate(60, 210)">
                <circle r="25" fill="white" stroke="var(--border)" strokeWidth="1.5" />
                <path d="M-12 10 Q -12 -5 0 -5 Q 12 -5 12 10" fill="var(--border)" opacity="0.6" />
                <circle cy="-8" r="8" fill="var(--border)" opacity="0.6" />
                <motion.path d="M-5 15l5 5l10-10" stroke="var(--green)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.5 }} />
            </g>
        </motion.svg>
    );
}

// ─── PARTNERS (USER APPROVED) ───
export function PartnersIllustration() {
    return (
        <motion.svg
            width="380" height="300" viewBox="0 0 380 300" fill="none"
            initial="hidden" animate="visible"
        >
            <Gradients />
            <g opacity="0.1">
                <circle cx="50" cy="50" r="4" fill="var(--green)" />
                <circle cx="330" cy="80" r="6" fill="var(--green)" />
                <circle cx="300" cy="240" r="5" fill="var(--green)" />
                <circle cx="80" cy="260" r="4" fill="var(--green)" />
                <path d="M50 50 L330 80 L300 240 L80 260 Z" stroke="var(--green)" strokeWidth="0.5" strokeDasharray="4 4" />
            </g>
            <g transform="translate(190, 150)">
                <circle r="40" fill="white" stroke="var(--green)" strokeWidth="1.5" />
                <motion.path d="M-20 0h40 M0 -20v40" stroke="var(--green)" strokeWidth="2" animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
                <rect x="-45" y="-10" width="10" height="20" rx="2" fill="var(--green)" />
            </g>
            <motion.g initial={{ x: 20 }} animate={{ x: 0 }} transition={{ duration: 3, repeat: Infinity }}>
                <g transform="translate(60, 150)">
                    <rect x="-30" y="-30" width="60" height="60" rx="12" fill="white" stroke="var(--border)" strokeWidth="1.5" />
                    <path d="M-10 12 Q -10 0 0 0 Q 10 0 10 12" fill="var(--border)" opacity="0.6" />
                    <circle cy="-10" r="10" fill="var(--border)" opacity="0.6" />
                    <motion.rect x="-30" y="-30" width="60" height="60" rx="12" fill="none" stroke="var(--green)" strokeWidth="2.5" animate={{ scale: [1, 1.25], opacity: [0, 0.4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }} />
                </g>
            </motion.g>
            {[{ x: 280, y: 70, d: 2 }, { x: 310, y: 150, d: 2.4 }, { x: 280, y: 230, d: 2.8 }].map((node, i) => (
                <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: node.d, duration: 0.8 }}>
                    <g transform={`translate(${node.x}, ${node.y})`}>
                        <circle r="22" fill="white" stroke="var(--green)" strokeWidth="1" />
                        <path d="M-8 8 Q -8 -2 0 -2 Q 8 -2 8 8" fill="var(--green)" opacity="0.7" />
                        <circle cy="-6" r="6" fill="var(--green)" />
                        <motion.line x1="0" y1="0" x2={190 - node.x} y2={150 - node.y} stroke="var(--green)" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
                    </g>
                </motion.g>
            ))}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} transform="translate(190, 220)">
                <rect x="-60" width="120" height="24" rx="12" fill="var(--green-muted)" opacity="0.3" />
                <text x="0" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="var(--green)" letterSpacing="0.05em">SCALED SUCCESS</text>
            </motion.g>
        </motion.svg>
    );
}

// ─── PRODUCTS (USER APPROVED) ───
export function ProductIllustration({ color = "#00994D" }: { color?: string }) {
    return (
        <motion.svg
            width="340" height="280" viewBox="0 0 340 280" fill="none"
            initial="hidden" animate="visible"
        >
            <Gradients />
            {[
                { label: "VISUALS", y: 50, x: 70, icon: "M10 25h10v10h-10z M25 15h10v20h-10z" },
                { label: "AUTOMATION", y: 110, x: 70, icon: "M15 20l15 10l-15 10z" },
                { label: "CONNECTORS", y: 170, x: 70, icon: "M10 20h25 M10 30h25" }
            ].map((prod, i) => (
                <motion.g
                    key={i}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: prod.x, opacity: 1 }}
                    transition={{ delay: i * 0.3, type: "spring" }}
                >
                    <rect width="200" height="50" rx="8" fill="white" stroke="var(--border)" strokeWidth="1.5" y={prod.y} />
                    <rect width="40" height="50" rx="8" fill={color} opacity="0.1" y={prod.y} />
                    <g transform={`translate(0, ${prod.y})`}>
                        <path d={prod.icon} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
                    </g>
                    <text x="55" y={prod.y + 30} fontSize="10" fontWeight="800" fill="#333" letterSpacing="0.05em">
                        CBT.{prod.label}
                    </text>
                    <motion.circle
                        cx="180" cy={prod.y + 25} r="6" fill="var(--green)" opacity="0.2"
                        animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.g>
            ))}
            <line x1="85" y1="40" x2="85" y2="230" stroke="var(--green)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
        </motion.svg>
    );
}

// ─── CGAP (USER APPROVED) ───
export function CGAPIllustration() {
    return (
        <motion.svg
            width="380" height="300" viewBox="0 0 380 300" fill="none"
            initial="hidden" animate="visible"
        >
            <Gradients />
            <g transform="translate(60, 150)">
                <circle r="30" fill="white" stroke="var(--border)" strokeWidth="1" />
                <path d="M-15 12 Q -15 0 0 0 Q 15 0 15 12" fill="var(--border)" opacity="0.4" />
                <circle cy="-10" r="10" fill="var(--border)" opacity="0.4" />
                <path d="M-12 -18 l12 -6 l12 6 l-12 6z" fill="var(--green)" opacity="0.8" />
                <text x="-25" y="55" fontSize="8" fontWeight="700" fill="var(--border)">GRADUATE</text>
            </g>
            <g transform="translate(190, 150)">
                <motion.rect x="-40" y="-40" width="80" height="80" rx="10" fill="var(--green-muted)" opacity="0.1" stroke="var(--green)" strokeWidth="1" strokeDasharray="5 5" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                <circle r="35" fill="white" stroke="var(--green)" strokeWidth="2" />
                <text x="-20" y="5" fontSize="12" fontWeight="900" fill="var(--green)">CGAP</text>
                <text x="-32" y="58" fontSize="8" fontWeight="800" fill="var(--green)" letterSpacing="0.05em">ACADEMY</text>
            </g>
            <g transform="translate(320, 150)">
                <motion.circle r="35" fill="var(--green)" opacity="0.1" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5 }} />
                <circle r="30" fill="white" stroke="var(--green)" strokeWidth="2" />
                <path d="M-15 12 Q -15 0 0 0 Q 15 0 15 12" fill="var(--green)" />
                <circle cy="-10" r="10" fill="var(--green)" />
                <rect x="5" y="-18" width="12" height="10" rx="2" fill="var(--green)" opacity="0.5" />
                <text x="-25" y="55" fontSize="8" fontWeight="700" fill="var(--green)">CONSULTANT</text>
            </g>
            <motion.path d="M90 150 H155 M225 150 H285" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300" animate={{ strokeDashoffset: 0 }} transition={{ duration: 2, delay: 0.5 }} />
        </motion.svg>
    );
}
