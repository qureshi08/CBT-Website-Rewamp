"use client";

import * as React from "react";
import { motion } from "framer-motion";

export type ClientLogo = { name: string; logo_url: string };

interface OrbitLogosProps {
    clients: ClientLogo[];
}

const CONTAINER_W = 480;
const CONTAINER_H = 420;
// Orbit center sits just past the bottom-right of the container. Nudging
// CENTER.y below the container edge keeps the top of each ring (y = cy - r)
// inside the viewport so chips don't clip at the top as they orbit.
const CENTER = { x: 420, y: 440 };
const CHIP_SIZE = 72;

type RingSpec = {
    radius: number;
    // Number of evenly-spaced chip slots around the ring. Density is set
    // high enough that the visible arc is rarely empty, even with few
    // unique logos (slots get filled by cycling the ring's own subset).
    slots: number;
    // Maximum unique logos this ring consumes from the logo list before
    // overflow spills to the next ring. Ensures no logo appears on two
    // different rings.
    uniqueMax: number;
    // Starting angle (degrees) of the first slot. Slots after it are placed
    // at phase + i * (360 / slots).
    phase: number;
    // Seconds for one full 360° revolution.
    duration: number;
    // 1 = clockwise, -1 = counter-clockwise.
    direction: 1 | -1;
};

// Inner → outer. Inner and outer rotate clockwise, middle rotates
// counter-clockwise. Durations are close but distinct so the three rings
// don't stay visually synced.
const RING_CONFIG: RingSpec[] = [
    { radius: 180, slots: 6, uniqueMax: 3, phase: 225, duration: 75, direction: 1 },
    { radius: 280, slots: 8, uniqueMax: 4, phase: 225, duration: 85, direction: -1 },
    { radius: 380, slots: 10, uniqueMax: 5, phase: 225, duration: 95, direction: 1 },
];

function LogoChip({ logo }: { logo: ClientLogo }) {
    const [hover, setHover] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                width: CHIP_SIZE,
                height: CHIP_SIZE,
                borderRadius: "50%",
                background: "#fff",
                border: `1px solid ${hover ? "var(--color-primary)" : "var(--color-border)"}`,
                boxShadow:
                    "0 8px 22px -8px rgba(17, 24, 39, 0.14), 0 2px 6px -2px rgba(17, 24, 39, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: hover ? "scale(1.08)" : "scale(1)",
                transition: "transform .2s ease, border-color .2s ease",
                padding: 12,
            }}
            title={logo.name}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={logo.logo_url}
                alt={logo.name}
                loading="eager"
                draggable={false}
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    userSelect: "none",
                }}
            />
        </div>
    );
}

export default function OrbitLogos({ clients }: OrbitLogosProps) {
    const withLogos = React.useMemo(
        () => clients.filter((c) => c.logo_url),
        [clients]
    );

    // Each ring gets its own disjoint subset of unique logos (inner fills
    // first, overflow spills outward). Within a ring the subset cycles to
    // fill all slots, keeping the visible arc populated — but no logo ever
    // appears on two different rings.
    const rings = React.useMemo(() => {
        // Pre-compute each ring's slice boundaries so the map stays pure.
        const offsets = RING_CONFIG.reduce<number[]>((acc, cfg, i) => {
            const prev = i === 0 ? 0 : acc[i - 1];
            const take = Math.min(cfg.uniqueMax, Math.max(0, withLogos.length - prev));
            acc.push(prev + take);
            return acc;
        }, []);

        return RING_CONFIG.map((cfg, i) => {
            const step = 360 / cfg.slots;
            const angles = Array.from({ length: cfg.slots }, (_, j) => cfg.phase + j * step);
            const start = i === 0 ? 0 : offsets[i - 1];
            const ringLogos = withLogos.slice(start, offsets[i]);
            const logos: ClientLogo[] =
                ringLogos.length === 0
                    ? []
                    : angles.map((_, j) => ringLogos[j % ringLogos.length]);
            return { ...cfg, angles, logos };
        });
    }, [withLogos]);

    if (withLogos.length === 0) return null;

    // Soft edge mask — fades content toward the right and bottom edges so
    // chips leaving the viewport dissolve instead of being hard-clipped.
    // Two linear gradients composited with intersect (min of both).
    const FADE_START = "88%";
    const edgeMask =
        `linear-gradient(to right, black 0%, black ${FADE_START}, transparent 100%), ` +
        `linear-gradient(to bottom, black 0%, black ${FADE_START}, transparent 100%)`;

    return (
        <div
            aria-hidden="true"
            style={{
                position: "relative",
                width: CONTAINER_W,
                height: CONTAINER_H,
                overflow: "hidden",
                flexShrink: 0,
                WebkitMaskImage: edgeMask,
                maskImage: edgeMask,
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
            }}
        >
            {/* Static orbit rings */}
            <svg
                width={CONTAINER_W}
                height={CONTAINER_H}
                style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
                {rings.map((r) => (
                    <circle
                        key={r.radius}
                        cx={CENTER.x}
                        cy={CENTER.y}
                        r={r.radius}
                        fill="none"
                        stroke="rgba(17, 24, 39, 0.14)"
                        strokeWidth={1}
                    />
                ))}
            </svg>

            {/* Rotating rings — each is a zero-size pivot at CENTER whose
                children sit on the ring's radius. Inner chip counter-rotates
                to keep the logo upright. */}
            {rings.map((ring) => {
                if (ring.logos.length === 0) return null;
                return (
                    <motion.div
                        key={ring.radius}
                        style={{
                            position: "absolute",
                            left: CENTER.x,
                            top: CENTER.y,
                            width: 0,
                            height: 0,
                        }}
                        animate={{ rotate: 360 * ring.direction }}
                        transition={{
                            duration: ring.duration,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {ring.logos.map((logo, i) => {
                            const rad = (ring.angles[i] * Math.PI) / 180;
                            const x = ring.radius * Math.cos(rad);
                            const y = ring.radius * Math.sin(rad);
                            return (
                                <motion.div
                                    key={`${ring.radius}-${i}-${logo.name}`}
                                    style={{
                                        position: "absolute",
                                        left: x - CHIP_SIZE / 2,
                                        top: y - CHIP_SIZE / 2,
                                    }}
                                    animate={{ rotate: -360 * ring.direction }}
                                    transition={{
                                        duration: ring.duration,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <LogoChip logo={logo} />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                );
            })}
        </div>
    );
}
