"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

function FloatingPaths({ position }: { position: number }) {
    const reduced = useReducedMotionSafe();
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
                style={{ transform: "scaleX(-1)" }}
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="#00994D"
                        strokeWidth={path.width}
                        strokeOpacity={0.05 + path.id * 0.011}
                        // The default `animate` holds keyframe ARRAYS, which
                        // are sequences rather than endpoints — with duration 0
                        // the resting value is ambiguous. The reduced branch
                        // therefore names scalars: fully drawn, mid opacity,
                        // no repeat. 36 paths x 2 instances = 72 infinite
                        // tweens otherwise.
                        initial={reduced ? false : { pathLength: 0.3, opacity: 0.5 }}
                        animate={
                            reduced
                                ? { pathLength: 1, opacity: 0.5 }
                                : {
                                      pathLength: 1,
                                      opacity: [0.25, 0.5, 0.25],
                                      pathOffset: [0, 1, 0],
                                  }
                        }
                        transition={
                            reduced
                                ? { duration: 0 }
                                : {
                                      // Derived from the path index, not
                                      // Math.random(): a random duration is
                                      // computed during render and differs
                                      // between the server and client passes.
                                      // It does not reach the HTML today, but
                                      // nondeterminism in a render path is a
                                      // hydration hazard waiting for someone to
                                      // read it into an attribute. The spread
                                      // (24–36s) is unchanged.
                                      duration: 24 + ((path.id * 7) % 12),
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "linear",
                                  }
                        }
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
}
