"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── CBT brand colours (light-mode) ──────────────────────────────────────────
const GREEN = "#00994D";   // --color-primary
const GLIGHT = "#00C060";   // brighter accent
const GDARK = "#007A3D";   // darker shade
const INK = "#0C1A10";   // --color-heading (used for labels)
const BG = "#FFFFFF";   // hero background is white

// ─── HOME ─── Data-Convergence Canvas Animation ──────────────────────────────
//   Phase 0 – particles drift freely on a grid
//   Phase 1 – convergence: particles curve toward nodes
//   Phase 2 – crystallisation: knowledge-graph materialises
//   Phase 3 – breathing: live data packets circulate
export function HeroIllustration() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;

        let W = 0, H = 0, CX = 0, CY = 0;
        let phase = 0, phaseT = 0, startT: number | null = null;
        let particles: Particle[] = [];
        let nodes: NetNode[] = [];
        let edges: NetEdge[] = [];
        let packets: DataPacket[] = [];
        let raf = 0;

        const PHASE_DURATIONS = [2200, 2400, 1600, Infinity];

        const NODE_DEFS = [
            { label: "Data\nStrategy", dx: -0.38, dy: -0.28 },
            { label: "Cloud\nMigration", dx: 0.38, dy: -0.28 },
            { label: "Analytics", dx: -0.38, dy: 0.28 },
            { label: "AI\nAdoption", dx: 0.38, dy: 0.28 },
            { label: "BI &\nReporting", dx: 0.0, dy: -0.40 },
            { label: "Training", dx: -0.44, dy: 0.0 },
            { label: "Decision\nSci", dx: 0.44, dy: 0.0 },
            { label: "AnalyticOps", dx: 0.0, dy: 0.40 },
        ];

        const EDGE_PAIRS = [
            [0, 4], [0, 5], [0, 2],
            [1, 4], [1, 6], [1, 3],
            [2, 7], [2, 5],
            [3, 7], [3, 6],
            [4, 1], [4, 0],
            [5, 7], [6, 7],
            [0, 1], [2, 3],
        ];

        function rand(a: number, b: number) { return a + Math.random() * (b - a); }
        function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
        function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
        function easeInOutQuad(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

        function noise(x: number, y: number, t: number) {
            return Math.sin(x * 0.8 + t * 0.7) * Math.cos(y * 0.6 + t * 0.5) * 0.5
                + Math.sin(x * 1.3 + t * 0.3) * Math.sin(y * 1.1 + t * 0.4) * 0.3;
        }

        function resize() {
            const r = canvas!.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas!.width = r.width * dpr;
            canvas!.height = r.height * dpr;
            ctx.scale(dpr, dpr);
            W = r.width; H = r.height;
            CX = W / 2; CY = H / 2;
        }

        // ── Particle ──────────────────────────────────────────────────────────
        class Particle {
            x = 0; y = 0; vx = 0; vy = 0;
            alpha = rand(0.4, 1);
            age = rand(0, 200);
            speed = rand(0.3, 1.1);
            size = rand(1.2, 3.0);
            tail: { x: number; y: number }[] = [];
            converging = false;
            convergeX = 0; convergeY = 0;
            convergeProgress = 0;
            startX = 0; startY = 0;
            bx1 = 0; by1 = 0; bx2 = 0; by2 = 0;
            absorbed = false;
            // Light-mode: use greens on white background
            color = Math.random() > 0.15 ? GREEN : (Math.random() > 0.5 ? GLIGHT : "#004d26");

            constructor() { this.reset(); this.startX = this.x; this.startY = this.y; }

            reset() {
                const side = Math.floor(rand(0, 4));
                if (side === 0) { this.x = rand(0, W); this.y = -10; }
                else if (side === 1) { this.x = W + 10; this.y = rand(0, H); }
                else if (side === 2) { this.x = rand(0, W); this.y = H + 10; }
                else { this.x = -10; this.y = rand(0, H); }
                this.vx = rand(-0.4, 0.4); this.vy = rand(-0.4, 0.4);
            }

            startConverge(tx: number, ty: number) {
                this.converging = true;
                this.startX = this.x; this.startY = this.y;
                this.convergeX = tx; this.convergeY = ty;
                this.convergeProgress = 0;
                const mx = lerp(this.x, tx, 0.5) + rand(-80, 80);
                const my = lerp(this.y, ty, 0.5) + rand(-80, 80);
                this.bx1 = mx + rand(-40, 40); this.by1 = my + rand(-40, 40);
                this.bx2 = lerp(mx, tx, 0.6) + rand(-20, 20);
                this.by2 = lerp(my, ty, 0.6) + rand(-20, 20);
                this.speed = rand(0.006, 0.018);
            }

            update(dt: number, t: number) {
                if (this.absorbed) return;
                this.age += dt;
                this.tail.push({ x: this.x, y: this.y });
                if (this.tail.length > 8) this.tail.shift();

                if (this.converging) {
                    this.convergeProgress = Math.min(1, this.convergeProgress + this.speed * dt * 0.06);
                    const p = easeInOutQuad(this.convergeProgress);
                    const q = 1 - p;
                    this.x = q * q * q * this.startX + 3 * q * q * p * this.bx1 + 3 * q * p * p * this.bx2 + p * p * p * this.convergeX;
                    this.y = q * q * q * this.startY + 3 * q * q * p * this.by1 + 3 * q * p * p * this.by2 + p * p * p * this.convergeY;
                    if (this.convergeProgress >= 0.98) this.absorbed = true;
                } else {
                    const n = noise(this.x * 0.006, this.y * 0.006, t * 0.0003);
                    const angle = n * Math.PI * 4;
                    this.vx += Math.cos(angle) * 0.05;
                    this.vy += Math.sin(angle) * 0.05;
                    this.vx *= 0.97; this.vy *= 0.97;
                    this.x += this.vx * this.speed;
                    this.y += this.vy * this.speed;
                }
            }

            draw() {
                if (this.absorbed) return;
                // Tail
                if (this.tail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(this.tail[0].x, this.tail[0].y);
                    for (let i = 1; i < this.tail.length; i++) ctx.lineTo(this.tail[i].x, this.tail[i].y);
                    ctx.strokeStyle = this.color;
                    ctx.globalAlpha = 0.18 * this.alpha;
                    ctx.lineWidth = this.size * 0.5;
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha * (this.converging ? (1 - this.convergeProgress * 0.7) : 0.85);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        // ── Network Node ──────────────────────────────────────────────────────
        class NetNode {
            tx: number; ty: number;
            x: number; y: number;
            r: number;
            alpha = 0;
            pulse = 0;
            pulseSpeed = rand(0.8, 1.4);
            spawnT = rand(0, 800);

            constructor(public id: number, def: typeof NODE_DEFS[0]) {
                this.tx = CX + def.dx * Math.min(W, H) * 0.75;
                this.ty = CY + def.dy * Math.min(W, H) * 0.75;
                this.x = CX; this.y = CY;
                this.r = id === 4 || id === 0 ? 11 : 8;
            }

            get label() { return NODE_DEFS[this.id].label; }

            update(t: number, crystalProgress: number) {
                if (crystalProgress <= 0) return;
                const p = Math.max(0, Math.min(1, (crystalProgress * 1600 - this.spawnT) / 600));
                this.alpha = easeOutCubic(p);
                this.x = lerp(CX, this.tx, easeOutCubic(p));
                this.y = lerp(CY, this.ty, easeOutCubic(p));
                this.pulse = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.001 * this.pulseSpeed + this.id));
            }

            draw() {
                if (this.alpha <= 0) return;
                ctx.save();
                ctx.globalAlpha = this.alpha;

                // Glow ring
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r + 6 * this.pulse, 0, Math.PI * 2);
                ctx.strokeStyle = GREEN;
                ctx.lineWidth = 1;
                ctx.globalAlpha = this.alpha * 0.25 * this.pulse;
                ctx.stroke();

                // Node fill – light mode: white fill, green border
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = "#FFFFFF";
                ctx.globalAlpha = this.alpha;
                ctx.fill();
                ctx.strokeStyle = GREEN;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Centre dot
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = GLIGHT;
                ctx.globalAlpha = this.alpha * this.pulse;
                ctx.fill();

                // Label
                const lines = this.label.split("\n");
                ctx.fillStyle = GDARK;
                ctx.font = `500 9.5px 'DM Sans', sans-serif`;
                ctx.textAlign = "center";
                ctx.globalAlpha = this.alpha * 0.85;
                const offY = this.r + 13;
                lines.forEach((ln, i) => ctx.fillText(ln, this.x, this.y + offY + i * 12));

                ctx.restore();
            }
        }

        // ── Edge ──────────────────────────────────────────────────────────────
        class NetEdge {
            progress = 0;
            alpha = 0;
            delay = rand(0, 1000);

            constructor(public a: number, public b: number) { }

            update(crystalProgress: number) {
                const p = Math.max(0, Math.min(1, (crystalProgress * 1600 - this.delay) / 500));
                this.progress = easeOutCubic(p);
                this.alpha = this.progress;
            }

            draw() {
                if (this.alpha <= 0) return;
                const A = nodes[this.a], B = nodes[this.b];
                if (!A || !B || A.alpha <= 0 || B.alpha <= 0) return;
                const ex = lerp(A.x, B.x, this.progress);
                const ey = lerp(A.y, B.y, this.progress);
                ctx.beginPath();
                ctx.moveTo(A.x, A.y);
                ctx.lineTo(ex, ey);
                ctx.strokeStyle = GREEN;
                ctx.lineWidth = 0.8;
                ctx.globalAlpha = 0.30 * this.alpha * Math.min(A.alpha, B.alpha);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }

        // ── Data Packet ───────────────────────────────────────────────────────
        class DataPacket {
            srcI = 0; dstI = 0;
            t = 0;
            speed = rand(0.003, 0.008);
            done = false;
            size = rand(2.5, 4.5);

            constructor() { this.reset(); }

            reset() {
                const e = edges[Math.floor(Math.random() * edges.length)];
                if (!e) { this.done = true; return; }
                const flip = Math.random() > 0.5;
                this.srcI = flip ? e.b : e.a;
                this.dstI = flip ? e.a : e.b;
                this.t = 0;
                this.speed = rand(0.003, 0.008);
                this.done = false;
                this.size = rand(2.5, 4.5);
            }

            update() {
                this.t += this.speed;
                if (this.t >= 1) this.done = true;
            }

            draw() {
                if (this.done) return;
                const A = nodes[this.srcI], B = nodes[this.dstI];
                if (!A || !B || A.alpha < 0.5 || B.alpha < 0.5) return;
                const p = easeInOutQuad(this.t);
                const x = lerp(A.x, B.x, p);
                const y = lerp(A.y, B.y, p);
                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = GREEN;
                ctx.globalAlpha = 0.85 * (1 - Math.abs(p - 0.5) * 1.5);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        // ── Hub variables ─────────────────────────────────────────────────────
        let hubAlpha = 0, hubPulse = 0;

        function initScene() {
            particles = []; nodes = []; edges = []; packets = [];
            phase = 0; phaseT = 0; startT = null; hubAlpha = 0;
            for (let i = 0; i < 110; i++) particles.push(new Particle());
            NODE_DEFS.forEach((d, i) => nodes.push(new NetNode(i, d)));
            EDGE_PAIRS.forEach(([a, b]) => edges.push(new NetEdge(a, b)));
        }

        function spawnPackets() {
            while (packets.length < 18) {
                const pk = new DataPacket();
                pk.t = Math.random();
                packets.push(pk);
            }
        }

        function totalBefore(ph: number) { return PHASE_DURATIONS.slice(0, ph).reduce((a, b) => a + b, 0); }

        function draw(ts: number) {
            if (!startT) startT = ts;
            const elapsed = ts - startT;

            if (phase < 3) {
                phaseT = elapsed - totalBefore(phase);
                if (phaseT / PHASE_DURATIONS[phase] >= 1) phase++;
            }

            const p1 = Math.max(0, Math.min(1, (elapsed - totalBefore(0)) / PHASE_DURATIONS[1]));
            const p2 = Math.max(0, Math.min(1, (elapsed - totalBefore(1)) / PHASE_DURATIONS[2]));

            ctx.clearRect(0, 0, W, H);

            // Fully transparent — blends with hero background
            // Soft central glow only
            const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.6);
            grad.addColorStop(0, "rgba(230,245,237,0.25)");
            grad.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);

            // Grid shimmer (phase 0 only)
            if (phase <= 1) {
                const gridAlpha = Math.max(0, 1 - p1 * 2);
                ctx.strokeStyle = "#D1EAD9";
                ctx.lineWidth = 0.5;
                ctx.globalAlpha = gridAlpha * 0.7;
                const step = 40;
                for (let x = 0; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
                for (let y = 0; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
                ctx.globalAlpha = 1;
            }

            // Trigger convergence
            if (phase >= 1 && p1 > 0) {
                particles.forEach((p, i) => {
                    if (!p.converging && !p.absorbed) {
                        const delay = (i / particles.length) * 0.6;
                        if (p1 > delay) {
                            const targetNode = nodes[i % nodes.length];
                            const tx = p1 > 0.7 ? targetNode.tx : CX + rand(-20, 20);
                            const ty = p1 > 0.7 ? targetNode.ty : CY + rand(-20, 20);
                            p.startConverge(tx, ty);
                        }
                    }
                });
            }

            // Phase 3: keep new particles flowing in
            if (phase === 3) {
                spawnPackets();
                if (Math.random() < 0.015) {
                    const np = new Particle();
                    np.startConverge(
                        nodes[Math.floor(Math.random() * nodes.length)].tx,
                        nodes[Math.floor(Math.random() * nodes.length)].ty
                    );
                    particles.push(np);
                }
            }

            // Draw edges
            edges.forEach(e => { e.update(p2); e.draw(); });

            // Draw particles
            particles.forEach(p => { p.update(16, ts); p.draw(); });

            // Hub node
            hubAlpha = Math.min(1, p1 * 3);
            hubPulse = 0.5 + 0.5 * Math.abs(Math.sin(ts * 0.0015));
            if (hubAlpha > 0) {
                // Outer halo
                ctx.beginPath();
                ctx.arc(CX, CY, 28 + 8 * hubPulse, 0, Math.PI * 2);
                ctx.strokeStyle = GREEN;
                ctx.lineWidth = 1;
                ctx.globalAlpha = hubAlpha * 0.12 * hubPulse;
                ctx.stroke();
                // Inner ring
                ctx.beginPath();
                ctx.arc(CX, CY, 20 + 4 * hubPulse, 0, Math.PI * 2);
                ctx.strokeStyle = GREEN;
                ctx.lineWidth = 1.5;
                ctx.globalAlpha = hubAlpha * 0.3 * hubPulse;
                ctx.stroke();
                // Fill – white in light mode
                ctx.beginPath();
                ctx.arc(CX, CY, 18, 0, Math.PI * 2);
                ctx.fillStyle = "#FFFFFF";
                ctx.globalAlpha = hubAlpha;
                ctx.fill();
                ctx.strokeStyle = GREEN;
                ctx.lineWidth = 2;
                ctx.stroke();
                // CBT label
                ctx.fillStyle = GDARK;
                ctx.font = `700 11px 'DM Sans', sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.globalAlpha = hubAlpha;
                ctx.fillText("CBT", CX, CY);
                ctx.globalAlpha = 1;
                ctx.textBaseline = "alphabetic";
            }

            // Network nodes
            nodes.forEach(n => { n.update(ts, p2); n.draw(); });

            // Data packets (phase 3 only)
            if (phase === 3) {
                packets = packets.filter(pk => !pk.done);
                packets.forEach(pk => { pk.update(); pk.draw(); });
            }

            ctx.globalAlpha = 1;

            raf = requestAnimationFrame(draw);
        }

        const onResize = () => { resize(); initScene(); };

        resize();
        initScene();
        raf = requestAnimationFrame(draw);
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                width: "480px",
                height: "420px",
                background: "transparent",
                flexShrink: 0,
            }}
        />
    );
}

// ─── CUSTOMERS (APPROVED) ────────────────────────────────────────────────────
export function CustomersIllustration() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext('2d')!;

        let W = 0, H = 0, raf = 0, t = 0;
        let startTime: number | null = null;

        const G = '#00994D', GL = '#00C060', GD = '#007A3D';
        const BG = 'transparent';

        function resize() {
            const r = cv!.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            cv!.width = r.width * dpr;
            cv!.height = r.height * dpr;
            ctx.scale(dpr, dpr);
            W = r.width; H = r.height;
        }

        function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
        function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }
        function ease(t: number) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

        const FLOORS = [
            { label: 'Raw Data', sublabel: 'Siloed sources', color: '#E6F5ED', accent: GD, icon: 'db', level: 0 },
            { label: 'DWH Layer', sublabel: 'Unified warehouse', color: '#D1EAD9', accent: G, icon: 'stack', level: 1 },
            { label: 'Analytics', sublabel: 'Self-service BI', color: '#BDE0C6', accent: G, icon: 'chart', level: 2 },
            { label: 'Decisions', sublabel: 'Decision sciences', color: '#A8D5B2', accent: GL, icon: 'brain', level: 3 },
            { label: 'AI & Insight', sublabel: 'Intelligent automation', color: '#93CB9F', accent: GL, icon: 'spark', level: 4 },
        ];

        const FLOOR_COUNT = FLOORS.length;

        class DataPacket {
            x: number; y: number; speed: number; size: number; alpha: number; color: string; trail: { x: number, y: number }[] = [];
            constructor(x: number, startY: number) {
                this.x = x + (Math.random() - 0.5) * 6;
                this.y = startY;
                this.speed = 0.4 + Math.random() * 0.8;
                this.size = 2 + Math.random() * 2.5;
                this.alpha = 0.6 + Math.random() * 0.4;
                this.color = Math.random() > 0.3 ? G : (Math.random() > .5 ? GL : GD);
            }
            update() {
                this.trail.push({ x: this.x, y: this.y });
                if (this.trail.length > 10) this.trail.shift();
                this.y -= this.speed;
            }
            draw() {
                if (this.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(this.trail[0].x, this.trail[0].y);
                    for (let i = 1; i < this.trail.length; i++) ctx.lineTo(this.trail[i].x, this.trail[i].y);
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = this.size * 0.5;
                    ctx.globalAlpha = this.alpha * 0.25;
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        class ScanLine {
            y: number; floorY: number; floorH: number; alpha: number; speed: number; color: string;
            constructor(floorY: number, floorH: number, color: string) {
                this.y = floorY + Math.random() * floorH;
                this.floorY = floorY;
                this.floorH = floorH;
                this.alpha = 0.15 + Math.random() * 0.25;
                this.speed = 0.3 + Math.random() * 0.5;
                this.color = color;
            }
            update() {
                this.y -= this.speed;
                if (this.y < this.floorY) this.y = this.floorY + this.floorH;
            }
            draw(x: number, w: number) {
                ctx.beginPath();
                ctx.moveTo(x, this.y);
                ctx.lineTo(x + w, this.y);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 0.5;
                ctx.globalAlpha = this.alpha;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }

        let particles: DataPacket[] = [];
        let scanLines: ScanLine[] = [];

        function drawIcon(type: string, cx: number, cy: number, r: number, color: string, alpha: number) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 1.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (type === 'db') {
                ctx.beginPath(); ctx.ellipse(cx, cy - r * 0.4, r * 0.7, r * 0.25, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cx - r * 0.7, cy - r * 0.4); ctx.lineTo(cx - r * 0.7, cy + r * 0.4); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cx + r * 0.7, cy - r * 0.4); ctx.lineTo(cx + r * 0.7, cy + r * 0.4); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(cx, cy + r * 0.4, r * 0.7, r * 0.25, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.7, r * 0.25, 0, 0, Math.PI * 2); ctx.stroke();
            } else if (type === 'stack') {
                for (let i = 0; i < 3; i++) {
                    const yy = cy - r * 0.5 + i * r * 0.5;
                    ctx.beginPath();
                    ctx.roundRect(cx - r * 0.7, yy - r * 0.18, r * 1.4, r * 0.3, 2);
                    ctx.stroke();
                }
            } else if (type === 'chart') {
                const bars = [0.4, 0.75, 0.55, 1.0, 0.65];
                bars.forEach((h, i) => {
                    const bx = cx - r * 0.8 + i * (r * 1.6 / bars.length);
                    const bh = h * r * 0.8;
                    ctx.fillRect(bx, cy + r * 0.4 - bh, r * 0.22, bh);
                });
            } else if (type === 'brain') {
                ctx.beginPath(); ctx.arc(cx - r * 0.2, cy, r * 0.55, Math.PI * 0.1, Math.PI * 1.9); ctx.stroke();
                ctx.beginPath(); ctx.arc(cx + r * 0.2, cy, r * 0.55, Math.PI * 1.1, Math.PI * 2.9); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cx, cy - r * 0.55); ctx.lineTo(cx, cy + r * 0.55); ctx.stroke();
            } else if (type === 'spark') {
                ctx.beginPath();
                ctx.moveTo(cx + r * 0.2, cy - r * 0.9);
                ctx.lineTo(cx - r * 0.3, cy - r * 0.0);
                ctx.lineTo(cx + r * 0.15, cy + r * 0.05);
                ctx.lineTo(cx - r * 0.2, cy + r * 0.9);
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawKpiTag(x: number, y: number, label: string, value: string, color: string) {
            const pad = 8;
            const w = 82, h = 30;
            ctx.save();
            ctx.globalAlpha = 0.92;
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, 4);
            ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#374151'; // text-body
            ctx.font = '500 9px "DM Sans",sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(label, x + pad, y + 11);
            ctx.fillStyle = color;
            ctx.font = '600 12px "DM Sans",sans-serif';
            ctx.fillText(value, x + pad, y + 24);
            ctx.restore();
        }

        function frame(ts: number) {
            if (!startTime) startTime = ts;
            t = (ts - startTime) * 0.001;

            ctx.clearRect(0, 0, W, H);

            const margin = 20;
            const labelW = 90;
            const buildingX = margin + labelW + 12;
            const buildingW = W - buildingX - margin;
            const buildingH = H - 80;
            const buildingY = 30;
            const floorH = buildingH / FLOOR_COUNT;

            const pipeXs = [
                buildingX + buildingW * 0.12,
                buildingX + buildingW * 0.32,
                buildingX + buildingW * 0.55,
                buildingX + buildingW * 0.75,
            ];

            if (scanLines.length === 0) {
                FLOORS.forEach((f, fi) => {
                    const fy = buildingY + fi * floorH;
                    for (let i = 0; i < 4; i++) scanLines.push(new ScanLine(fy, floorH, f.accent));
                });
            }
            scanLines.forEach(s => s.update());

            if (Math.random() < 0.18) {
                const px = pipeXs[Math.floor(Math.random() * pipeXs.length)];
                particles.push(new DataPacket(px, buildingY + buildingH));
            }
            particles = particles.filter(p => p.y > buildingY - 20);
            particles.forEach(p => p.update());

            FLOORS.forEach((f, fi) => {
                const fy = buildingY + fi * floorH;
                const floorProgress = clamp((t * 0.6 - fi * 0.18), 0, 1);
                const fp = ease(floorProgress);

                ctx.save();
                ctx.beginPath();
                ctx.rect(buildingX, fy, buildingW * fp, floorH - 1);
                ctx.fillStyle = f.color;
                ctx.fill();

                ctx.clip();
                scanLines.filter(s => s.floorY === fy).forEach(s => s.draw(buildingX, buildingW));
                ctx.restore();

                ctx.beginPath();
                ctx.rect(buildingX, fy, buildingW * fp, floorH - 1);
                ctx.strokeStyle = f.accent;
                ctx.lineWidth = 0.5;
                ctx.globalAlpha = 0.4;
                ctx.stroke();
                ctx.globalAlpha = 1;

                ctx.fillStyle = f.accent;
                ctx.globalAlpha = fp * 0.9;
                ctx.fillRect(buildingX, fy, 3, floorH - 1);
                ctx.globalAlpha = 1;

                for (let d = 0; d <= f.level; d++) {
                    ctx.beginPath();
                    ctx.arc(buildingX + 14 + d * 11, fy + floorH / 2, 3.5, 0, Math.PI * 2);
                    ctx.fillStyle = f.accent;
                    ctx.globalAlpha = fp * (d === f.level ? 1 : 0.35);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }

                ctx.globalAlpha = fp;
                ctx.fillStyle = '#0C1A10'; // GDARK
                ctx.font = '600 11px "DM Sans",sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(f.label, buildingX - 16, fy + floorH / 2 - 5);
                ctx.fillStyle = '#6B7280'; // MUTED
                ctx.font = '400 9px "DM Sans",sans-serif';
                ctx.fillText(f.sublabel, buildingX - 16, fy + floorH / 2 + 8);
                ctx.globalAlpha = 1;

                const iconX = buildingX + buildingW * 0.88;
                const iconY = fy + floorH / 2;
                drawIcon(f.icon, iconX, iconY, 13, f.accent, fp * (0.6 + 0.4 * Math.sin(t * 1.2 + fi)));

                const barCount = 6;
                const barW = 9;
                const barGap = 4;
                const barX = buildingX + 60;
                for (let b = 0; b < barCount; b++) {
                    const phase = t * (0.4 + fi * 0.1) + b * 0.8;
                    const bh = (0.35 + 0.55 * Math.abs(Math.sin(phase))) * (floorH - 14);
                    ctx.fillStyle = f.accent;
                    ctx.globalAlpha = fp * (0.3 + 0.5 * (fi / FLOOR_COUNT));
                    ctx.fillRect(barX + b * (barW + barGap), fy + floorH - 7 - bh, barW, bh);
                }
                ctx.globalAlpha = 1;

                pipeXs.forEach(px => {
                    ctx.beginPath();
                    ctx.rect(px - 2, fy, 4, floorH - 1);
                    ctx.fillStyle = '#FFFFFF';
                    ctx.globalAlpha = 0.7;
                    ctx.fill();
                    ctx.strokeStyle = GD;
                    ctx.lineWidth = 0.5;
                    ctx.globalAlpha = 0.4;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                });
            });

            particles.forEach(p => p.draw());

            const kpiAlpha = clamp(t * 0.4 - 0.9, 0, 1);
            if (kpiAlpha > 0) {
                const kpis = [
                    { label: 'Data Maturity', value: '+2.4 levels' },
                    { label: 'Report Time', value: '-68% faster' },
                    { label: 'Accuracy', value: '99.1%' },
                ];
                const kpiY = buildingY + buildingH + 16;
                const spacing = buildingW / kpis.length;
                kpis.forEach((k, i) => {
                    const kx = buildingX + i * spacing + spacing / 2 - 41;
                    ctx.globalAlpha = kpiAlpha * ease(clamp(t * 0.5 - 1.0 - i * 0.12, 0, 1));
                    drawKpiTag(kx, kpiY, k.label, k.value, GL);
                    ctx.globalAlpha = 1;
                });
            }

            const elevProgress = clamp((t * 0.22) % 1.2, 0, 1);
            const elevY = buildingY + buildingH - elevProgress * buildingH;
            const elevX = buildingX + buildingW * 0.96;
            ctx.save();
            ctx.globalAlpha = 0.85;
            ctx.fillStyle = GL;
            ctx.beginPath();
            ctx.arc(elevX, elevY, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(elevX, elevY + 5);
            ctx.lineTo(elevX, elevY + 30);
            ctx.strokeStyle = GL;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = 0.25;
            ctx.stroke();
            ctx.restore();

            raf = requestAnimationFrame(frame);
        }

        const onResize = () => { resize(); };
        resize();
        raf = requestAnimationFrame(frame);
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                width: "480px",
                height: "420px",
                background: "transparent",
                flexShrink: 0,
            }}
        />
    );
}

// ─── PARTNERS (APPROVED) ─────────────────────────────────────────────────────
export function PartnersIllustration() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext('2d')!;

        let W = 0, H = 0, t = 0;
        let startTime: number | null = null;
        let raf = 0;

        const C1 = '#00994D', C1L = '#00C060';
        const C2 = '#3B82F6', C2L = '#60A5FA';
        const GOLD = '#F59E0B';

        function resize() {
            const r = cv!.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            cv!.width = r.width * dpr;
            cv!.height = r.height * dpr;
            ctx.scale(dpr, dpr);
            W = r.width; H = r.height;
        }

        function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
        function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }
        function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
        function easeInOut(t: number) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; }
        function dist(ax: number, ay: number, bx: number, by: number) { return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2); }

        const PHASE = [0, 1.5, 3.5, 5.0];

        const CBT_CAPS = ['Analytics', 'DWH', 'AI', 'BI', 'Training'];
        const PART_CAPS = ['Distribution', 'Tech Stack', 'Market', 'Scale', 'Network'];
        const JOINT_OUT = ['Joint Revenue', 'Faster Delivery', 'Wider Reach', 'Shared IP', 'More Value'];

        class StreamParticle {
            sx: number; sy: number; ex: number; ey: number; color: string;
            t = 0; delay: number; speed: number; size: number; alpha: number; done = false;
            trail: { x: number, y: number }[] = [];

            constructor(fromX: number, fromY: number, toX: number, toY: number, color: string, delay: number) {
                this.sx = fromX; this.sy = fromY;
                this.ex = toX; this.ey = toY;
                this.color = color;
                this.delay = delay;
                this.speed = 0.008 + Math.random() * 0.012;
                this.size = 1.8 + Math.random() * 2;
                this.alpha = 0.5 + Math.random() * 0.5;
            }
            update() {
                if (this.t < this.delay) { this.t += 0.016; return; }
                this.t += this.speed;
                if (this.t >= 1 + this.delay) this.done = true;
            }
            draw() {
                const p = clamp(this.t - this.delay, 0, 1);
                if (p <= 0) return;
                const e = easeInOut(p);
                const mx = (this.sx + this.ex) / 2, my = (this.sy + this.ey) / 2 - 40;
                const x = lerp(lerp(this.sx, mx, e), lerp(mx, this.ex, e), e);
                const y = lerp(lerp(this.sy, my, e), lerp(my, this.ey, e), e);
                this.trail.push({ x, y });
                if (this.trail.length > 12) this.trail.shift();
                if (this.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(this.trail[0].x, this.trail[0].y);
                    for (let i = 1; i < this.trail.length; i++) ctx.lineTo(this.trail[i].x, this.trail[i].y);
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = this.size * 0.5;
                    ctx.globalAlpha = this.alpha * 0.3;
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha * (1 - p * 0.4);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        let streamParticles: StreamParticle[] = [];

        class Satellite {
            cx: number; cy: number; r: number; speed: number; size: number; color: string; angle: number;
            trail: { x: number, y: number }[] = [];
            constructor(cx: number, cy: number, r: number, speed: number, size: number, color: string, angle0: number) {
                this.cx = cx; this.cy = cy; this.r = r; this.speed = speed; this.size = size; this.color = color; this.angle = angle0;
            }
            update(cx: number, cy: number) {
                this.cx = cx; this.cy = cy;
                this.angle += this.speed;
                const x = this.cx + Math.cos(this.angle) * this.r;
                const y = this.cy + Math.sin(this.angle) * this.r;
                this.trail.push({ x, y });
                if (this.trail.length > 20) this.trail.shift();
            }
            draw(alpha: number) {
                if (this.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(this.trail[0].x, this.trail[0].y);
                    for (let i = 1; i < this.trail.length; i++) ctx.lineTo(this.trail[i].x, this.trail[i].y);
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = 0.8;
                    ctx.globalAlpha = alpha * 0.3;
                    ctx.stroke();
                }
                const x = this.cx + Math.cos(this.angle) * this.r;
                const y = this.cy + Math.sin(this.angle) * this.r;
                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = alpha * 0.85;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function drawFieldRings(cx: number, cy: number, color: string, alpha: number, count: number, maxR: number, pulse: number) {
            for (let i = 0; i < count; i++) {
                const r = maxR * (i + 1) / count + pulse * 8;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = color;
                ctx.lineWidth = 0.5;
                ctx.globalAlpha = alpha * (1 - (i / count) * 0.7);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }

        function drawOrb(cx: number, cy: number, r: number, color: string, colorL: string, label: string, sublabel: string, alpha: number, pulse: number) {
            ctx.beginPath();
            ctx.arc(cx, cy, r + 10 + pulse * 6, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.globalAlpha = alpha * 0.15 * pulse;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
            ctx.strokeStyle = colorL;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = alpha * 0.35;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = alpha;
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#0C1A10';
            ctx.font = '600 12px "DM Sans",sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.globalAlpha = alpha;
            ctx.fillText(label, cx, cy - 5);
            ctx.fillStyle = color;
            ctx.font = '500 9px "DM Sans",sans-serif';
            ctx.fillText(sublabel, cx, cy + 8);
            ctx.globalAlpha = 1;
            ctx.textBaseline = 'alphabetic';
        }

        function drawCapLabel(cx: number, cy: number, angle: number, r: number, text: string, color: string, alpha: number) {
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            const w = 62, h = 18;
            ctx.save();
            ctx.globalAlpha = Math.max(0, alpha);
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.roundRect(x - w / 2, y - h / 2, w, h, 3);
            ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#0C1A10';
            ctx.font = '500 9px "DM Sans",sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, x, y);
            ctx.restore();
        }

        function drawConnectionArc(ax: number, ay: number, bx: number, by: number, color: string, alpha: number, progress: number) {
            const mx = (ax + bx) / 2, my = (ay + by) / 2 - H * 0.12;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            const steps = 40;
            for (let i = 0; i <= steps * progress; i++) {
                const tt = i / steps;
                const e = 1 - tt;
                const x = e * e * ax + 2 * e * tt * mx + tt * tt * bx;
                const y = e * e * ay + 2 * e * tt * my + tt * tt * by;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.2;
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        function drawJointOutput(cx: number, cy: number, alpha: number) {
            if (alpha <= 0) return;
            const r = 38;
            ctx.beginPath();
            ctx.arc(cx, cy, r + 10 + 3 * Math.sin(t * 2), 0, Math.PI * 2);
            ctx.strokeStyle = GOLD;
            ctx.lineWidth = 1;
            ctx.globalAlpha = alpha * 0.2;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = GOLD;
            ctx.lineWidth = 2;
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = alpha;
            ctx.fill(); ctx.stroke();

            ctx.fillStyle = '#0C1A10';
            ctx.font = '600 11px "DM Sans",sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('1+1=3', cx, cy - 5);
            ctx.fillStyle = GOLD;
            ctx.font = '500 9px "DM Sans",sans-serif';
            ctx.fillText('Joint Value', cx, cy + 9);
            ctx.globalAlpha = 1;
            ctx.textBaseline = 'alphabetic';

            JOINT_OUT.forEach((lbl, i) => {
                const a = (-Math.PI / 2) + (i / JOINT_OUT.length) * Math.PI * 2 + t * 0.15;
                drawCapLabel(cx, cy, a, 78, lbl, GOLD, alpha * 0.85);
            });
        }

        let cbtSats: Satellite[] = [], partSats: Satellite[] = [];
        function initSats(cx: number, cy: number, color: string, arr: Satellite[]) {
            arr.length = 0;
            [28, 20, 36].forEach((r, i) => {
                arr.push(new Satellite(cx, cy, r, 0.025 * (i % 2 === 0 ? 1 : -1) * ((i + 1) * 0.4 + 0.6), 2.5 - i * 0.3, color, Math.random() * Math.PI * 2));
            });
        }

        let initted = false;

        function frame(ts: number) {
            if (!startTime) startTime = ts;
            t = (ts - startTime) * 0.001;

            if (!initted) {
                initSats(0, 0, C1, cbtSats);
                initSats(0, 0, C2, partSats);
                initted = true;
            }

            ctx.clearRect(0, 0, W, H);

            const ph1 = clamp((t - PHASE[0]) / (PHASE[1] - PHASE[0]), 0, 1);
            const ph2 = clamp((t - PHASE[1]) / (PHASE[2] - PHASE[1]), 0, 1);
            const ph3 = clamp((t - PHASE[2]) / (PHASE[3] - PHASE[2]), 0, 1);
            const ph4 = clamp((t - PHASE[3]), 0, 999);

            const e2 = easeOut(ph2);
            const e3 = easeOut(ph3);

            const spread = W * 0.30;
            const cx0 = W / 2, cy0 = H / 2;
            const approachFactor = e2;
            const orbitR = lerp(spread, W * 0.19, approachFactor);

            const orbitAngle = t * (0.4 + ph3 * 0.3);
            const finalOrbitR = lerp(orbitR, W * 0.17, e3);

            let cbtX, cbtY, partX, partY;
            if (t < PHASE[1]) {
                cbtX = cx0 - spread * (1 - ph1 * 0.1);
                cbtY = cy0 + Math.sin(t * 0.8) * 18;
                partX = cx0 + spread * (1 - ph1 * 0.1);
                partY = cy0 + Math.sin(t * 0.8 + Math.PI) * 18;
            } else {
                const angle = orbitAngle;
                cbtX = cx0 - Math.cos(angle) * finalOrbitR;
                cbtY = cy0 - Math.sin(angle) * finalOrbitR * 0.45;
                partX = cx0 + Math.cos(angle) * finalOrbitR;
                partY = cy0 + Math.sin(angle) * finalOrbitR * 0.45;
            }

            const pulse = 0.5 + 0.5 * Math.abs(Math.sin(t * 1.4));
            const pulse2 = 0.5 + 0.5 * Math.abs(Math.sin(t * 1.4 + 1.2));

            const fieldAlpha = clamp(ph1 * 2, 0, 0.35) * (1 - ph2 * 0.6);
            if (fieldAlpha > 0) {
                drawFieldRings(cbtX, cbtY, C1, fieldAlpha, 4, 90, pulse);
                drawFieldRings(partX, partY, C2, fieldAlpha, 4, 90, pulse2);
            }

            const arcAlpha = clamp(ph2 * 3, 0, 0.5);
            if (arcAlpha > 0) {
                drawConnectionArc(cbtX, cbtY, partX, partY, '#00994D', arcAlpha * 0.5, ph2);
            }

            if (ph3 > 0) {
                const midX = (cbtX + partX) / 2, midY = (cbtY + partY) / 2;
                const ringR = dist(cbtX, cbtY, partX, partY) * 0.38;
                ctx.beginPath();
                ctx.arc(midX, midY, ringR, 0, Math.PI * 2 * e3);
                ctx.strokeStyle = GOLD;
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 6]);
                ctx.globalAlpha = e3 * 0.4;
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.globalAlpha = 1;
            }

            cbtSats.forEach(s => { s.update(cbtX, cbtY); s.draw(clamp(ph1 * 3, 0, 0.8)); });
            partSats.forEach(s => { s.update(partX, partY); s.draw(clamp(ph1 * 3, 0, 0.8)); });

            const capAlpha = clamp(ph1 * 2 - 0.2, 0, 0.9) * (1 - ph3 * 0.4);
            CBT_CAPS.forEach((cap, i) => {
                const a = (i / CBT_CAPS.length) * Math.PI * 2 - Math.PI / 4 + t * 0.04;
                drawCapLabel(cbtX, cbtY, a, 72, cap, C1, capAlpha);
            });
            PART_CAPS.forEach((cap, i) => {
                const a = (i / PART_CAPS.length) * Math.PI * 2 + Math.PI / 4 - t * 0.04;
                drawCapLabel(partX, partY, a, 72, cap, C2, capAlpha);
            });

            drawOrb(cbtX, cbtY, 28, C1, C1L, 'CBT', 'Data & AI', 1, pulse);
            drawOrb(partX, partY, 28, C2, C2L, 'Partner', 'Your Org', 1, pulse2);

            if (ph2 > 0.3) {
                if (Math.random() < 0.12) {
                    const toRight = Math.random() > 0.5;
                    streamParticles.push(new StreamParticle(
                        toRight ? cbtX : partX, toRight ? cbtY : partY,
                        toRight ? partX : cbtX, toRight ? partY : cbtY,
                        toRight ? C1 : C2, Math.random() * 0.3
                    ));
                }
            }
            streamParticles = streamParticles.filter(p => !p.done);
            streamParticles.forEach(p => { p.update(); p.draw(); });

            const joAlpha = clamp(e3 * 2, 0, 1);
            if (joAlpha > 0) {
                const jx = (cbtX + partX) / 2, jy = (cbtY + partY) / 2 + (ph4 > 0 ? 0 : -10 * (1 - e3));
                [cbtX, partX].forEach((ox, i) => {
                    const oy = i === 0 ? cbtY : partY;
                    ctx.beginPath();
                    ctx.moveTo(ox, oy);
                    ctx.lineTo(jx, jy);
                    ctx.strokeStyle = i === 0 ? C1 : C2;
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = joAlpha * 0.4;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                });
                drawJointOutput(jx, jy, joAlpha);
            }

            raf = requestAnimationFrame(frame);
        }

        const onResize = () => { resize(); };
        resize();
        window.addEventListener("resize", onResize);
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                width: "480px",
                height: "420px",
                background: "transparent",
                flexShrink: 0,
            }}
        />
    );
}

// ─── PRODUCTS (APPROVED) ─────────────────────────────────────────────────────
export function ProductIllustration({ color = GREEN }: { color?: string }) {
    return (
        <motion.svg width="320" height="280" viewBox="0 0 340 280" fill="none" initial="hidden" animate="visible">
            {[
                { label: "VISUALS", y: 50, icon: "M10 25h10v10h-10z M25 15h10v20h-10z" },
                { label: "AUTOMATION", y: 115, icon: "M15 20l15 10l-15 10z" },
                { label: "CONNECTORS", y: 180, icon: "M10 20h25 M10 30h25" },
            ].map((prod, i) => (
                <motion.g key={i} initial={{ x: -60, opacity: 0 }} animate={{ x: 70, opacity: 1 }} transition={{ delay: i * 0.3, type: "spring" }}>
                    <rect width="200" height="52" rx="10" fill="white" stroke="#E2E8E4" strokeWidth="1.5" y={prod.y} />
                    <rect width="42" height="52" rx="10" fill={color} opacity="0.08" y={prod.y} />
                    <g transform={`translate(6, ${prod.y + 6})`}>
                        <path d={prod.icon} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
                    </g>
                    <text x="125" y={prod.y + 31} fontSize="10" fontWeight="800" fill="#374151" letterSpacing="0.05em" textAnchor="middle">CBT.{prod.label}</text>
                    <motion.circle cx="250" cy={prod.y + 26} r="5" fill={color} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
                </motion.g>
            ))}
        </motion.svg>
    );
}

// ─── CGAP (APPROVED) ─────────────────────────────────────────────────────────
export function CGAPIllustration() {
    return (
        <motion.svg width="380" height="300" viewBox="0 0 380 300" fill="none" initial="hidden" animate="visible">
            {/* Graduate */}
            <g transform="translate(60, 150)">
                <circle r="30" fill="white" stroke="#E2E8E4" strokeWidth="1" />
                <path d="M-15 12 Q -15 0 0 0 Q 15 0 15 12" fill="#D1D5DB" opacity="0.5" />
                <circle cy="-10" r="10" fill="#D1D5DB" opacity="0.5" />
                <path d="M-12 -18 l12 -6 l12 6 l-12 6z" fill={GREEN} opacity="0.8" />
                <text x="-28" y="54" fontSize="8" fontWeight="700" fill="#6B7280">GRADUATE</text>
            </g>
            {/* Academy Hub */}
            <g transform="translate(190, 150)">
                <motion.rect x="-40" y="-40" width="80" height="80" rx="10" fill="none" stroke={GREEN} strokeWidth="1" strokeDasharray="5 5" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                <circle r="35" fill="white" stroke={GREEN} strokeWidth="2" />
                <text x="-20" y="5" fontSize="12" fontWeight="900" fill={GREEN}>CGAP</text>
                <text x="-27" y="55" fontSize="8" fontWeight="800" fill={GREEN} letterSpacing="0.05em">ACADEMY</text>
            </g>
            {/* Consultant */}
            <g transform="translate(320, 150)">
                <motion.circle r="35" fill={GREEN} opacity="0.08" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5 }} />
                <circle r="30" fill="white" stroke={GREEN} strokeWidth="2" />
                <path d="M-15 12 Q -15 0 0 0 Q 15 0 15 12" fill={GREEN} />
                <circle cy="-10" r="10" fill={GREEN} />
                <text x="-26" y="55" fontSize="8" fontWeight="700" fill={GREEN}>CONSULTANT</text>
            </g>
            {/* Path arrows */}
            <motion.path d="M90 150 H155 M225 150 H285" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300" animate={{ strokeDashoffset: 0 }} transition={{ duration: 2, delay: 0.5 }} />
        </motion.svg>
    );
}
