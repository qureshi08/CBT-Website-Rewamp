# 003 — Move the hero orbit rotation from Framer Motion to CSS

- **Status**: TODO
- **Commit**: 317d1c1
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 2 files (`OrbitLogos.tsx`, `globals.css`), ~40 lines net

## Problem

`src/components/home/OrbitLogos.tsx` animates the homepage hero's three logo
rings with Framer Motion tweens that never stop:

```tsx
/* src/components/home/OrbitLogos.tsx:186 — current (the ring pivot) */
animate={{ rotate: 360 * ring.direction }}
transition={{
    duration: ring.duration,
    repeat: Infinity,
    ease: "linear",
}}
```

```tsx
/* src/components/home/OrbitLogos.tsx:205 — current (per-chip counter-rotation) */
animate={{ rotate: -360 * ring.direction }}
transition={{
    duration: ring.duration,
    repeat: Infinity,
    ease: "linear",
}}
```

The ring configuration at `OrbitLogos.tsx:41–45` declares three rings with 6, 8
and 10 slots:

```tsx
const RING_CONFIG: RingSpec[] = [
    { radius: 180, slots: 6,  uniqueMax: 3, phase: 225, duration: 75, direction: 1 },
    { radius: 280, slots: 8,  uniqueMax: 4, phase: 225, duration: 85, direction: -1 },
    { radius: 380, slots: 10, uniqueMax: 5, phase: 225, duration: 95, direction: 1 },
];
```

So at full logo count the hero runs **3 ring tweens + up to 24 chip
counter-rotations = up to 27 concurrent infinite Framer Motion animations**,
every one of them driven from JavaScript on the main thread, for as long as the
homepage is open.

Two costs:

1. **Main-thread work that never idles.** Framer Motion's `rotate` shorthand is
   not hardware-accelerated — it writes a transform from JS each frame rather
   than handing the animation to the compositor. This competes with hydration,
   scroll reveals, and the logo-mosaic swap timer on the site's most-visited
   page, and it keeps the tab from ever going quiet.
2. **It ignores reduced-motion entirely.** The stylesheet's blanket
   `prefers-reduced-motion` reset at `globals.css:690` only reaches CSS
   animations. `OrbitLogos.tsx` has no reduced-motion check of any kind, so for
   a user who has asked the OS to reduce motion, the single largest moving
   element on the site keeps spinning. (Compare `ClientLogoStrip.tsx:363` and
   `CgapHeroStats.tsx:28`, which both check correctly.)

The motion is a slow linear rotation with no gesture, no interruption, and no
state dependency — exactly the case CSS handles better than JS.

## Target

Two CSS keyframes plus class-based application. Durations and directions are
unchanged, so the visual result is identical; only the driver changes.

```css
/* target — add to the end of src/app/globals.css */

/* ─── HERO ORBIT ─── */
/* Rotation for OrbitLogos. Driven in CSS rather than Framer Motion so the
   compositor owns it and the tab can idle. Durations come from
   RING_CONFIG in src/components/home/OrbitLogos.tsx — keep them in sync. */
@keyframes orbitSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes orbitSpinReverse {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}

.orbit-ring {
  animation: orbitSpin var(--orbit-duration) linear infinite;
  will-change: transform;
}

.orbit-ring[data-direction="-1"] {
  animation-name: orbitSpinReverse;
}

/* Chips counter-rotate at the same rate so logos stay upright. */
.orbit-chip {
  animation: orbitSpinReverse var(--orbit-duration) linear infinite;
  will-change: transform;
}

.orbit-chip[data-direction="-1"] {
  animation-name: orbitSpin;
}

@media (prefers-reduced-motion: reduce) {

  .orbit-ring,
  .orbit-chip {
    animation: none;
  }
}
```

```tsx
/* target — src/components/home/OrbitLogos.tsx, ring pivot */
<div
    key={ring.radius}
    className="orbit-ring"
    data-direction={ring.direction}
    style={{
        position: "absolute",
        left: CENTER.x,
        top: CENTER.y,
        width: 0,
        height: 0,
        ["--orbit-duration" as string]: `${ring.duration}s`,
    }}
>
```

```tsx
/* target — src/components/home/OrbitLogos.tsx, chip */
<div
    key={`${ring.radius}-${i}-${logo.name}`}
    className="orbit-chip"
    data-direction={ring.direction}
    style={{
        position: "absolute",
        left: `${x - CHIP_SIZE / 2}px`,
        top: `${y - CHIP_SIZE / 2}px`,
        ["--orbit-duration" as string]: `${ring.duration}s`,
    }}
>
```

Note the chip's `--orbit-duration` is set explicitly rather than inherited,
because the chip's `left`/`top` inline styles put it in the same style object —
setting it locally keeps the two values impossible to desync.

With the rotation in CSS, the reduced-motion rule above covers it for free and
no JS check is needed in this component.

## Repo conventions to follow

- All CSS lives in `src/app/globals.css`; sections open with a banner comment in
  the form `/* ─── NAME ─── */`.
- Keyframes are declared at the top level of the stylesheet, not inside
  `@layer`. Exemplar: `/* ─── MARQUEE ─── */` at `globals.css:621`, which
  already does exactly this pattern — a linear infinite CSS rotation/translation
  driving a decorative loop.
- CSS custom properties are set inline from React elsewhere in this codebase;
  the `["--name" as string]` cast is required because `React.CSSProperties` does
  not type custom properties.
- Components are `"use client"` only where needed — `OrbitLogos.tsx` must stay a
  client component because `LogoChip` holds hover state.

## Steps

1. Add the `/* ─── HERO ORBIT ─── */` block from **Target** verbatim to the end
   of `src/app/globals.css`.
2. In `src/components/home/OrbitLogos.tsx`, replace the ring `<motion.div>` at
   line 186 with a plain `<div>` carrying `className="orbit-ring"`,
   `data-direction={ring.direction}` and the `--orbit-duration` custom property,
   exactly as in **Target**. Delete its `animate` and `transition` props.
3. Replace the chip `<motion.div>` at line 205 with a plain `<div>` carrying
   `className="orbit-chip"`, `data-direction={ring.direction}` and
   `--orbit-duration`, exactly as in **Target**. Delete its `animate` and
   `transition` props. Keep the existing `key` and the `left`/`top` values
   unchanged.
4. Remove the now-unused import: delete `import { motion } from "framer-motion";`
   at `OrbitLogos.tsx:4`. Verify with
   `grep -n "motion\." src/components/home/OrbitLogos.tsx` returning nothing
   before removing it.
5. Leave `RING_CONFIG`, `CENTER`, `CHIP_SIZE`, the slot/angle maths, the static
   SVG ring circles, and `LogoChip` untouched.

## Boundaries

- Do NOT change `RING_CONFIG` values — radii, slots, phases, durations and
  directions must stay identical. This plan changes the driver, not the design.
- Do NOT remove `framer-motion` from `package.json`; five other components still
  use it.
- Do NOT touch `src/components/ui/flip-words.tsx`,
  `src/components/ui/background-paths.tsx`, or
  `src/components/shared/Illustrations.tsx` — their reduced-motion gaps are
  plan 004's scope.
- Do NOT add a `useReducedMotion()` hook here; the CSS media query in **Target**
  covers this component completely.
- Do NOT add new dependencies.
- If `OrbitLogos.tsx` no longer matches the excerpts above (drift since commit
  `317d1c1`), STOP and report instead of improvising.

## Verification

- **Mechanical**:
  - `npx tsc --noEmit` — 18 pre-existing errors are expected; there must be no
    new error in `OrbitLogos.tsx`.
  - `npm run build` — must compile clean.
  - `grep -c "motion\." src/components/home/OrbitLogos.tsx` must return `0`.
- **Feel check**: run `npm run dev` and load `/`.
  - The three rings must rotate at visibly different speeds, the middle ring
    opposite to the outer two — identical to before the change.
  - Logos must stay **upright** throughout a full revolution. Watch one chip for
    ~90s; if it slowly tilts, the ring and chip durations have desynced.
  - Open DevTools → Performance, record 10s on an idle homepage. The main thread
    must be **near-flat**; before this change it shows continuous scripting.
    Confirm the rotation appears under compositor work, not scripting.
  - DevTools → Rendering → **Emulate CSS prefers-reduced-motion: reduce**, then
    reload. The rings must be completely still, with logos still visible and
    correctly positioned around each ring — not stacked or collapsed at centre.
  - Resize the window during rotation; chips must not jump or re-seat.
- **Done when**: the hero looks unchanged at default settings, the main thread
  is idle while it spins, and reduced-motion stops it dead.
