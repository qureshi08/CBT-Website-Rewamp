"use client";
import { motion } from "framer-motion";

// ─── HERO: THE NEURAL DATA NETWORK ───
export function HeroIllustration() {
    return (
        <motion.svg
            width="320" height="240" viewBox="0 0 320 240" fill="none"
            initial="hidden" animate="visible"
        >
            <motion.circle
                cx="160" cy="120" r="40" stroke="var(--green)" strokeWidth="1.5" fill="var(--green-muted)"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx="160" cy="120" r="28" fill="var(--green)" opacity="0.15" />

            {[
                { x: 60, y: 60, r: 8 }, { x: 260, y: 80, r: 12 },
                { x: 220, y: 190, r: 10 }, { x: 80, y: 180, r: 14 }
            ].map((node, i) => (
                <g key={i}>
                    <motion.circle
                        cx={node.x} cy={node.y} r={node.r} fill="white" stroke="var(--border)" strokeWidth="1"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.line
                        x1={node.x} y1={node.y} x2={160} y2={120} stroke="var(--green)" strokeWidth="1" strokeDasharray="4,4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.2 }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                    />
                    <motion.circle
                        r="3" fill="var(--green)"
                        animate={{
                            cx: [node.x, 160],
                            cy: [node.y, 120],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
                    />
                </g>
            ))}

            <motion.path
                d="M150 115a10 10 0 0110-10 10 10 0 0110 10v10a10 10 0 01-10 10 10 10 0 01-10-10z"
                stroke="var(--green)" strokeWidth="2"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.svg>
    );
}

// ─── CGAP: THE SUCCESS PATHWAY ───
export function CGAPIllustration() {
    return (
        <motion.svg
            width="280" height="200" viewBox="0 0 280 200" fill="none"
            initial="hidden" animate="visible"
        >
            <motion.path
                d="M40 160 Q140 60 240 160" stroke="var(--green)" strokeWidth="2" strokeDasharray="6,4" opacity="0.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
            />

            <g transform="translate(30, 140)">
                <motion.rect x="0" y="0" width="40" height="10" rx="2" fill="var(--border)" initial={{ x: -20 }} animate={{ x: 0 }} />
                <motion.rect x="5" y="-12" width="30" height="10" rx="2" fill="var(--border)" opacity="0.6" initial={{ x: -25 }} animate={{ x: 5 }} transition={{ delay: 0.2 }} />
                <motion.rect x="2" y="-24" width="36" height="10" rx="2" fill="var(--green-muted)" initial={{ x: -30 }} animate={{ x: 2 }} transition={{ delay: 0.4 }} />
            </g>

            <motion.circle
                cx="140" cy="100" r="24" fill="white" stroke="var(--green)" strokeWidth="1.5"
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.path d="M132 108l8-8 8 8" stroke="var(--green)" strokeWidth="2" />

            <g transform="translate(210, 130)">
                {[15, 30, 22].map((h, i) => (
                    <motion.rect
                        key={i} x={i * 12} y={30 - h} width="8" height={h} rx="2" fill="var(--green)"
                        initial={{ height: 0 }} animate={{ height: h }} transition={{ delay: 1 + i * 0.1 }}
                    />
                ))}
            </g>

            <motion.g
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <path d="M120 70l20-8 20 8-20 8z" fill="var(--green)" />
                <path d="M125 72v8a15 15 0 0030 0v-8" fill="var(--green)" opacity="0.3" />
            </motion.g>
        </motion.svg>
    );
}

// ─── PRODUCTS: PRECISION ENGINEERING ───
export function ProductIllustration({ color = "#00994D" }: { color?: string }) {
    return (
        <motion.svg
            width="240" height="180" viewBox="0 0 240 180" fill="none"
            initial="hidden" animate="visible"
        >
            <motion.rect
                x="40" y="40" width="160" height="100" rx="8" stroke="var(--border)" strokeWidth="1.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            />

            <g transform="translate(120, 90)">
                <motion.path
                    d="M0 0 L-20 -35 A40 40 0 0 1 20 -35 Z" fill={color} opacity="0.9"
                    animate={{ x: [-5, -12, -5], y: [-5, -12, -5] }} transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.path
                    d="M0 0 L25 -30 A40 40 0 0 1 35 15 Z" fill={color} opacity="0.6"
                    animate={{ x: [5, 10, 5], y: [-5, -8, -5] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle r="40" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2,2" />
            </g>

            <motion.path
                d="M50 120h140 M50 100h140 M50 80h140" stroke="var(--border)" strokeWidth="0.5" opacity="0.3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 }}
            />

            <motion.text
                x="50" y="60" fontFamily="monospace" fontSize="8" fill="var(--green)"
                initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.2 }}
            >
                {"<Visual />"}
            </motion.text>
        </motion.svg>
    );
}

// ─── PARTNERS: STRATEGIC INTERLOCK ───
export function PartnersIllustration() {
    return (
        <motion.svg
            width="260" height="200" viewBox="0 0 260 200" fill="none"
            initial="hidden" animate="visible"
        >
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <circle cx="80" cy="100" r="40" stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4" />
                {[0, 90, 180, 270].map(deg => (
                    <circle key={deg} cx={80 + 40 * Math.cos(deg * Math.PI / 180)} cy={100 + 40 * Math.sin(deg * Math.PI / 180)} r="4" fill="var(--green)" />
                ))}
            </motion.g>

            <motion.g animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <circle cx="180" cy="100" r="40" stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4" />
                {[45, 135, 225, 315].map(deg => (
                    <rect key={deg} x={180 + 40 * Math.cos(deg * Math.PI / 180) - 3} y={100 + 40 * Math.sin(deg * Math.PI / 180) - 3} width="6" height="6" fill="var(--green)" opacity="0.6" />
                ))}
            </motion.g>

            <motion.rect
                x="110" y="85" width="40" height="30" rx="15" fill="white" stroke="var(--green)" strokeWidth="1.5"
                animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
                d="M120 100l20 0" stroke="var(--green)" strokeWidth="2" strokeLinecap="round"
                animate={{ x: [-2, 2, -2] }} transition={{ duration: 1, repeat: Infinity }}
            />
        </motion.svg>
    );
}

// ─── CUSTOMERS: SCALABLE GROWTH ───
export function CustomersIllustration() {
    return (
        <motion.svg
            width="300" height="220" viewBox="0 0 300 220" fill="none"
            initial="hidden" animate="visible"
        >
            <path d="M40 180h220" stroke="var(--border)" strokeWidth="2" />

            {[
                { x: 60, h: 40, d: 0.2 }, { x: 90, h: 70, d: 0.4 },
                { x: 120, h: 110, d: 0.6 }, { x: 150, h: 60, d: 0.8 },
                { x: 180, h: 140, d: 1.0 }, { x: 210, h: 100, d: 1.2 }
            ].map((b, i) => (
                <motion.rect
                    key={i} x={b.x} y={180 - b.h} width="22" height={b.h} rx="4" fill="var(--green)" opacity={0.2 + (i * 0.15)}
                    initial={{ height: 0, y: 180 }}
                    animate={{ height: b.h, y: 180 - b.h }}
                    transition={{ duration: 1.5, delay: b.d, ease: "easeOut" }}
                />
            ))}

            <motion.path
                d="M71 140 L101 110 L131 70 L161 120 L191 40 L221 80"
                stroke="var(--green)" strokeWidth="2.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
            />

            <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, type: "spring" }}
            >
                <circle cx="191" cy="40" r="6" fill="var(--green)" />
                <circle cx="191" cy="40" r="12" stroke="var(--green)" strokeWidth="1" strokeDasharray="4,2" />
            </motion.g>
        </motion.svg>
    );
}
