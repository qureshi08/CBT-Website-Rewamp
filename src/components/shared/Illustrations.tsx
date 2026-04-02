"use client";
import { motion } from "framer-motion";

export function HeroIllustration() {
    return (
        <motion.svg
            width="360" height="280" viewBox="0 0 360 280" fill="none"
            initial="hidden" animate="visible"
        >
            <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--green)" strokeWidth="0.2" opacity="0.1" />
            </pattern>
            <rect width="360" height="280" fill="url(#grid)" />

            <motion.path
                d="M40 80 Q 180 140 180 140" stroke="var(--green)" strokeWidth="2.5" opacity="0.4"
                animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                strokeDasharray="10, 20"
            />
            <motion.path
                d="M320 80 Q 180 140 180 140" stroke="var(--green)" strokeWidth="2.5" opacity="0.4"
                animate={{ strokeDashoffset: [0, 100] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                strokeDasharray="10, 20"
            />
            <motion.path
                d="M180 260 Q 180 140 180 140" stroke="var(--green)" strokeWidth="2.5" opacity="0.4"
                animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                strokeDasharray="10, 20"
            />

            <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "180px 140px" }}
            >
                <circle cx="180" cy="140" r="50" stroke="var(--green)" strokeWidth="1" strokeDasharray="5, 5" opacity="0.3" />
                <circle cx="180" cy="140" r="65" stroke="var(--green)" strokeWidth="1" strokeDasharray="3, 7" opacity="0.15" />
            </motion.g>

            <motion.g
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <motion.path
                    d="M180 100 L215 120 L180 180 L145 120 Z"
                    fill="white" stroke="var(--green)" strokeWidth="2"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                />
                <motion.path
                    d="M180 100 L180 180 M180 100 L145 120 M180 180 L145 120"
                    stroke="var(--green)" strokeWidth="0.5" opacity="0.4"
                />
                <motion.circle
                    cx="180" cy="140" r="8" fill="var(--green)"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                    cx="180" cy="140" r="40" stroke="var(--green)" strokeWidth="1"
                    animate={{ scale: [0.8, 1.8], opacity: [0.6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                />
            </motion.g>

            <text x="35" y="70" fontSize="10" fontWeight="700" fill="var(--green)" opacity="0.6">DATA</text>
            <text x="290" y="70" fontSize="10" fontWeight="700" fill="var(--green)" opacity="0.6">CLOUD</text>
            <text x="165" y="275" fontSize="10" fontWeight="700" fill="var(--green)" opacity="0.6">AI LAB</text>
        </motion.svg>
    );
}

export function CustomersIllustration() {
    return (
        <motion.svg
            width="320" height="240" viewBox="0 0 320 240" fill="none"
            initial="hidden" animate="visible"
        >
            <g transform="translate(160, 120)">
                <motion.path
                    d="M-40 40 L40 40 L50 -40 L-50 -40 Z" fill="white" stroke="var(--border)" strokeWidth="1.5"
                    animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.path
                    d="M-30 30 L30 30 L35 -30 L-35 -30 Z" fill="var(--green-muted)" opacity="0.3"
                />
                {[-25, 0, 25].map((x, i) => (
                    <motion.rect
                        key={i} x={x - 5} y="-20" width="10" height={0} fill="var(--green)" rx="2"
                        animate={{ height: [20, 50, 20], y: [-20, -50, -20] }}
                        transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                    />
                ))}
            </g>

            {[{ x: 50, y: 60 }, { x: 260, y: 80 }, { x: 80, y: 190 }].map((node, i) => (
                <g key={i}>
                    <motion.circle
                        cx={node.x} cy={node.y} r="15" fill="white" stroke="var(--border)" strokeWidth="1"
                    />
                    <motion.path
                        d={`M${node.x - 5} ${node.y + 5} l5 -10 l5 10`} stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round"
                        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: i }}
                    />
                    <motion.line
                        x1={node.x} y1={node.y} x2="160" y2="120" stroke="var(--green)" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2"
                    />
                </g>
            ))}

            <motion.path
                d="M50 200 Q 160 180 270 40" stroke="var(--green)" strokeWidth="3" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5 }}
            />
        </motion.svg>
    );
}

export function PartnersIllustration() {
    return (
        <motion.svg
            width="300" height="220" viewBox="0 0 300 220" fill="none"
            initial="hidden" animate="visible"
        >
            <motion.g animate={{ x: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <rect x="50" y="70" width="80" height="80" rx="8" stroke="var(--border)" strokeWidth="1.5" fill="white" />
                <circle cx="90" cy="110" r="20" stroke="var(--green)" strokeWidth="1" strokeDasharray="4,2" />
                <path d="M75 110h30 M90 95v30" stroke="var(--green)" strokeWidth="1.5" opacity="0.5" />
            </motion.g>

            <motion.g animate={{ x: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <rect x="170" y="70" width="80" height="80" rx="8" stroke="var(--border)" strokeWidth="1.5" fill="white" />
                <rect x="195" y="95" width="30" height="30" rx="4" fill="var(--green-muted)" opacity="0.5" />
                <path d="M200 110l10 10 10-20" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>

            <motion.g
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
            >
                <circle cx="150" cy="110" r="25" fill="white" stroke="var(--green)" strokeWidth="2" />
                <motion.path
                    d="M142 110h16" stroke="var(--green)" strokeWidth="3" strokeLinecap="round"
                    animate={{ rotate: [0, 360] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
            </motion.g>

            <motion.path
                d="M130 110H40 M170 110h90" stroke="var(--green)" strokeWidth="1" strokeDasharray="5,5" opacity="0.2"
            />
        </motion.svg>
    );
}

export function ProductIllustration({ color = "#00994D" }: { color?: string }) {
    return (
        <motion.svg
            width="320" height="240" viewBox="0 0 320 240" fill="none"
            initial="hidden" animate="visible"
        >
            <motion.rect
                x="40" y="40" width="240" height="140" rx="12" fill="white" stroke="var(--border)" strokeWidth="1.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            />

            <g transform="translate(160, 110)">
                <motion.circle
                    r="45" stroke="var(--green)" strokeWidth="0.5" strokeDasharray="4,4"
                    animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M-20 -20 L20 -20 L30 20 L-30 20 Z" fill={color} opacity="0.8"
                    animate={{ skewX: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}
                />
                {[0, 120, 240].map(angle => (
                    <motion.rect
                        key={angle} x={50 * Math.cos(angle * Math.PI / 180)} y={50 * Math.sin(angle * Math.PI / 180)} width="12" height="12" rx="2" fill={color} opacity="0.4"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.4, 0, 0.4]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                ))}
            </g>

            <motion.rect
                x="60" y="195" width="200" height="15" rx="7.5" fill="var(--green-muted)" opacity="0.5"
                initial={{ width: 0 }} animate={{ width: 200 }} transition={{ duration: 2, delay: 1 }}
            />
        </motion.svg>
    );
}

export function CGAPIllustration() {
    return (
        <motion.svg
            width="340" height="260" viewBox="0 0 340 260" fill="none"
            initial="hidden" animate="visible"
        >
            <motion.path
                d="M50 200c50-180 190-180 240 0" stroke="var(--green)" strokeWidth="1" strokeDasharray="8,4" opacity="0.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3 }}
            />

            <g transform="translate(60, 210)">
                <motion.circle r="25" fill="white" stroke="var(--border)" strokeWidth="1.5" />
                <motion.path d="M-10 0l20 0 M0 -10l0 20" stroke="var(--green)" strokeWidth="1" opacity="0.4" />
                <text x="-8" y="5" fontSize="14" fill="var(--green)" opacity="0.2">💡</text>
            </g>

            <motion.g
                transform="translate(170, 80)"
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}
            >
                <circle r="35" fill="white" stroke="var(--green)" strokeWidth="2" />
                <motion.path
                    d="M-15 0h30 M0 -15v30" stroke="var(--green)" strokeWidth="1" opacity="0.3"
                    animate={{ rotate: 180 }} transition={{ duration: 3, repeat: Infinity }}
                />
                <circle r="15" fill="var(--green)" opacity="0.1" />
            </motion.g>

            <g transform="translate(280, 210)">
                <motion.rect x="-20" y="-20" width="40" height="40" rx="8" fill="var(--green)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }} />
                <motion.path d="M-10 0l7 7 13 -13" stroke="white" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.5 }} />
            </g>

            <motion.path
                d="M85 200 L140 100 L170 80 L200 100 L255 200"
                stroke="var(--green)" strokeWidth="2" opacity="0.6"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }}
            />
        </motion.svg>
    );
}
