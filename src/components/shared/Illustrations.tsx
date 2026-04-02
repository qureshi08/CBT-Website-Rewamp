"use client";
import { motion } from "framer-motion";

// ─── UTILS: REUSABLE GRADIENTS ───
const Gradients = () => (
    <defs>
        <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="1" />
            <stop offset="100%" stopColor="#006633" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="grad-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
        </radialGradient>
    </defs>
);

// ─── HOME: THE INTELLIGENCE HUB (USER APPROVED) ───
export function HeroIllustration() {
    return (
        <motion.svg
            width="400" height="320" viewBox="0 0 400 320" fill="none"
            initial="hidden" animate="visible"
        >
            <Gradients />
            <g transform="translate(200, 180)">
                <motion.path
                    d="M-120 0 L0 60 L120 0 L0 -60 Z" fill="white" stroke="var(--border)" strokeWidth="1"
                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                />
                <motion.path d="M-120 5 L0 65 L120 5 L0 -55 Z" fill="var(--green-muted)" opacity="0.1" />
                {[-40, -80, -120].map((y, i) => (
                    <motion.g
                        key={i}
                        animate={{ y: [y, y - 10, y] }}
                        transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path d="M-80 0 L0 40 L80 0 L0 -40 Z" fill="white" stroke="var(--green)" strokeWidth="0.5" opacity={0.2 + (i * 0.2)} />
                        <text x="-30" y="5" fontSize="8" fontWeight="700" fill="var(--green)" opacity="0.4">
                            {i === 0 ? "BIG DATA" : i === 1 ? "CLOUD INFRA" : "AI ENGINE"}
                        </text>
                    </motion.g>
                ))}
                <motion.circle
                    cy="0" r="40" fill="url(#radial-glow)"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </g>
        </motion.svg>
    );
}

// ─── CUSTOMERS: GETTING EXACTLY WHAT THEY WANT ───
// Represents "Client Goals Achieved". A bridge to the desired outcome.
export function CustomersIllustration() {
    return (
        <motion.svg
            width="360" height="260" viewBox="0 0 360 260" fill="none"
            initial="hidden" animate="visible"
        >
            <Gradients />

            {/* The Goal: A glowing corporate success node */}
            <motion.path
                d="M260 60 L300 80 L280 120 L240 100 Z" fill="white" stroke="var(--green)" strokeWidth="2"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }} transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle cx="270" cy="90" r="20" fill="url(#grad-glow)" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
            <text x="250" y="140" fontSize="10" fontWeight="800" fill="var(--green)">GOAL REACHED</text>

            {/* The Bridge (CBT Solution) */}
            <motion.path
                d="M60 180 Q 160 180 260 100" stroke="var(--green)" strokeWidth="4" fill="none" strokeDasharray="500" strokeDashoffset="500"
                animate={{ strokeDashoffset: 0 }} transition={{ duration: 2.5, ease: "easeInOut" }}
            />

            {/* The Customer Persona */}
            <g transform="translate(60, 210)">
                <circle r="25" fill="white" stroke="var(--border)" strokeWidth="1.5" />
                <path d="M-12 10 Q -12 -5 0 -5 Q 12 -5 12 10" fill="var(--border)" opacity="0.6" />
                <circle cy="-8" r="8" fill="var(--border)" opacity="0.6" />
                <motion.path d="M-5 15l5 5l10-10" stroke="var(--green)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.5 }} />
            </g>
        </motion.svg>
    );
}

// ─── PARTNERS: SYNERGY FOR SUCCESS ───
// Represents "Successful Connection & Scaling". Two units becoming more together.
export function PartnersIllustration() {
    return (
        <motion.svg
            width="340" height="260" viewBox="0 0 340 260" fill="none"
            initial="hidden" animate="visible"
        >
            <Gradients />

            {/* Partner Node (Left) */}
            <motion.g transform="translate(80, 130)" animate={{ x: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <rect x="-30" y="-30" width="60" height="60" rx="10" fill="white" stroke="var(--border)" strokeWidth="1.5" />
                <path d="M-10 10 Q -10 -5 0 -5 Q 10 -5 10 10" fill="var(--border)" opacity="0.4" />
                <circle cy="-10" r="8" fill="var(--border)" opacity="0.4" />
                <text x="-25" y="45" fontSize="8" fontWeight="700" fill="var(--border)">PARTNER</text>
            </motion.g>

            {/* CBT Node (Right) */}
            <motion.g transform="translate(260, 130)" animate={{ x: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <rect x="-30" y="-30" width="60" height="60" rx="10" fill="white" stroke="var(--green)" strokeWidth="2" />
                <path d="M-10 10 Q -10 -5 0 -5 Q 10 -5 10 10" fill="var(--green)" opacity="0.8" />
                <circle cy="-10" r="8" fill="var(--green)" />
                <text x="-20" y="45" fontSize="8" fontWeight="700" fill="var(--green)">CBT</text>
            </motion.g>

            {/* The Connection "Success Pulse" */}
            <motion.g
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1.5 }}
                transition={{ delay: 2, repeat: Infinity, repeatDelay: 2, duration: 1.5 }}
                style={{ transformOrigin: "170px 130px" }}
            >
                <circle cx="170" cy="130" r="40" fill="url(#grad-glow)" />
                <motion.path d="M160 130 l7 7 l12 -12" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" />
            </motion.g>

            {/* Result: Partner Node scaling up */}
            <motion.rect
                x="50" y="100" width="60" height="60" rx="10" fill="none" stroke="var(--green)" strokeWidth="2" strokeDasharray="4 4"
                animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                transition={{ delay: 2, repeat: Infinity, duration: 2 }}
            />
        </motion.svg>
    );
}

// ─── PRODUCTS: THE PROFESSIONAL SUITE (USER APPROVED) ───
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

// ─── CGAP: THE CAREER TRANSFORMATION ───
// Represents "University Graduate -> CGAP -> Professional Consultant".
export function CGAPIllustration() {
    return (
        <motion.svg
            width="380" height="300" viewBox="0 0 380 300" fill="none"
            initial="hidden" animate="visible"
        >
            <Gradients />

            {/* Step 1: The University Graduate */}
            <g transform="translate(60, 150)">
                <circle r="30" fill="white" stroke="var(--border)" strokeWidth="1" />
                <path d="M-15 12 Q -15 0 0 0 Q 15 0 15 12" fill="var(--border)" opacity="0.4" />
                <circle cy="-10" r="10" fill="var(--border)" opacity="0.4" />
                {/* Graduation Cap */}
                <path d="M-12 -18 l12 -6 l12 6 l-12 6z" fill="var(--green)" opacity="0.8" />
                <text x="-25" y="55" fontSize="8" fontWeight="700" fill="var(--border)">GRADUATE</text>
            </g>

            {/* Step 2: The CGAP Transformation Gateway (Company's Program) */}
            <g transform="translate(190, 150)">
                <motion.rect
                    x="-40" y="-40" width="80" height="80" rx="10" fill="var(--green-muted)" opacity="0.1" stroke="var(--green)" strokeWidth="1" strokeDasharray="5 5"
                    animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <circle r="35" fill="white" stroke="var(--green)" strokeWidth="2" />
                <text x="-20" y="5" fontSize="12" fontWeight="900" fill="var(--green)">CGAP</text>
                <text x="-32" y="58" fontSize="8" fontWeight="800" fill="var(--green)" letterSpacing="0.05em">ACADEMY</text>
            </g>

            {/* Step 3: Industry Professional Consultant */}
            <g transform="translate(320, 150)">
                <motion.circle r="35" fill="var(--green)" opacity="0.1" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5 }} />
                <circle r="30" fill="white" stroke="var(--green)" strokeWidth="2" />
                <path d="M-15 12 Q -15 0 0 0 Q 15 0 15 12" fill="var(--green)" />
                <circle cy="-10" r="10" fill="var(--green)" />
                {/* Briefcase/Badges */}
                <rect x="5" y="-18" width="12" height="10" rx="2" fill="var(--green)" opacity="0.5" />
                <text x="-25" y="55" fontSize="8" fontWeight="700" fill="var(--green)">CONSULTANT</text>
            </g>

            {/* The Transformation Flow (Beams) */}
            <motion.path
                d="M90 150 H155 M225 150 H285" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300"
                animate={{ strokeDashoffset: 0 }} transition={{ duration: 2, delay: 0.5 }}
            />
        </motion.svg>
    );
}
