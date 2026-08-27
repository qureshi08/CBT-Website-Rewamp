# 004 — Replace the blanket reduced-motion reset with real coverage

- **Status**: TODO
- **Commit**: 317d1c1
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 5 files, ~60 lines net

## Problem

`src/app/globals.css:689–698` is the site's entire reduced-motion policy:

```css
/* src/app/globals.css:689 — current */
/* ─── ACCESSIBILITY ─── */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

It has three separate problems.

**1. It does not reach JavaScript-driven motion.** A CSS media query cannot stop
a Framer Motion tween. Four mounted components animate from JS with no
reduced-motion check of any kind:

| Component | Mounted on | Motion |
| --- | --- | --- |
| `src/components/ui/flip-words.tsx:26` | `/` (hero headline) | word swap every 3000ms, `y: 10` + `filter: blur(8px)` |
| `src/components/ui/infinite-slider.tsx:40` | `/` (logo strip) | infinite `animate()` on a motion value |
| `src/components/ui/background-paths.tsx:35` | `/cgap` | infinite `pathLength` + `opacity` |
| `src/components/shared/Illustrations.tsx:1233,1254,1268` | `/products` | multiple `repeat: Infinity` |

So a visitor who has asked their OS to reduce motion still gets a headline that
mutates under them and a page of perpetual movement. The reset creates the
appearance of a policy while the largest moving things on the site ignore it.

**2. `0.01ms` is the wrong instrument for infinite animations.** Three CSS
animations loop forever — `globals.css:673`, `globals.css:677` and
`globals.css:1140` (`marquee-fwd`, `marquee-rev`, `marquee`). Compressing an
infinite animation to 0.01ms does not stop it; it iterates it as fast as the
browser will allow. The correct instruction for a decorative loop is
`animation: none`, not a shorter duration.

**3. Reduced motion means *less* motion, not *no* motion.** Flattening every
transition to 0.01ms also removes opacity and colour feedback that aids
comprehension — hover states, focus rings, the scroll reveals that tell a user
content has arrived. The guidance is to drop *position change* and keep the
rest.

Why it matters: this is the one accessibility preference where getting it wrong
can make a person physically unwell, and the site currently honours it only for
the animations that were least likely to cause a problem.

## Target

**A. Replace the blanket reset** (`globals.css:689–698`) with targeted rules:

```css
/* target — replaces src/app/globals.css:689–698 */

/* ─── ACCESSIBILITY ─── */
/* Reduced motion means less movement, not no feedback. Position changes and
   decorative loops are removed; opacity, colour and border transitions are
   kept so the UI still confirms what the user did. */
@media (prefers-reduced-motion: reduce) {

  /* Decorative infinite loops stop completely — shortening an infinite
     animation speeds it up rather than stopping it. */
  .animate-marquee-fwd,
  .animate-marquee-rev,
  .v2-mq-track {
    animation: none;
  }

  /* Entrance animations resolve instantly to their end state rather than
     travelling. */
  .animate-fade-up,
  .animate-fade-in,
  .a-fadeUp-1,
  .a-fadeUp-2,
  .a-fadeUp-3,
  .a-fadeUp-4,
  .a-scaleIn {
    animation: none;
  }

  /* Scroll reveals: keep the fade, drop the 22–24px travel. */
  .reveal,
  .v2-reveal {
    transform: none;
    transition: opacity 0.2s ease;
  }

  .reveal.visible,
  .v2-reveal.v2-in {
    transform: none;
  }

  /* Hover and press lifts flatten; colour and shadow feedback survives. */
  .card:hover,
  .v2-pc:hover,
  .v2-prod-card:hover,
  .v2-stile:hover,
  .v2-bridge-chip:hover,
  .btn-primary:hover,
  .btn-primary-v2:hover,
  .btn-secondary:hover,
  .btn-outline:hover,
  .btn-cta-white:hover,
  .hero-btn-primary:hover,
  .hero-btn-video:hover,
  .v2-nav-cta:hover {
    transform: none;
  }
}
```

**B. Gate the four JS components.** Framer Motion already ships the hook — no
new dependency:

```tsx
import { useReducedMotion } from "framer-motion";
```

- `flip-words.tsx` — when `useReducedMotion()` is true, render the **first word
  only**, statically, and do not start the cycling timer. A rotating headline is
  the single most disruptive element on the page for a motion-sensitive reader.
- `infinite-slider.tsx` — when true, skip the `animate()` call entirely and
  leave the track at its initial offset. The logos remain visible and readable,
  just still.
- `background-paths.tsx` — when true, render the paths at their final state
  (`pathLength: 1`, the animation's end opacity) with no `animate` prop.
- `Illustrations.tsx` — when true, render every `motion.*` at its `animate`
  target with no transition. The illustrations are explanatory; they must stay
  visible and complete, only motionless.

The exact shape in each case:

```tsx
/* target pattern */
const reduced = useReducedMotion();
// …
<motion.div
    initial={reduced ? false : { opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={reduced ? { duration: 0 } : { duration: 0.3 }}
/>
```

`initial={false}` tells Framer Motion to mount straight at the `animate` values
with no transition — the correct primitive here, rather than duplicating target
values by hand.

## Repo conventions to follow

- `framer-motion` v12.38.0 is already a dependency (`package.json`); import
  `useReducedMotion` from it rather than writing a `matchMedia` hook.
- Two components already read this preference correctly and are the exemplars:
  `src/components/home/ClientLogoStrip.tsx:363` and
  `src/components/cgap/CgapHeroStats.tsx:28`. Both use raw `matchMedia`; prefer
  the Framer hook in components that already import from `framer-motion`.
- All CSS lives in `src/app/globals.css`; sections open with a
  `/* ─── NAME ─── */` banner.
- Components are `"use client"` where they hold state; all four JS components in
  scope already are.

## Steps

1. In `src/app/globals.css`, replace lines **689–698** (the `/* ─── ACCESSIBILITY
   ─── */` banner through the closing `}` of its media query) with block **A**
   from **Target** verbatim.
2. Confirm the three infinite CSS animations named in block A still exist at
   `globals.css:673`, `globals.css:677` and `globals.css:1140`. If any selector
   name differs, use the real one and note the substitution in your report.
3. `src/components/ui/flip-words.tsx` — import `useReducedMotion`; when true,
   render `words[0]` as plain text and return before the `setTimeout` at line 26
   is scheduled, so no timer is created.
4. `src/components/ui/infinite-slider.tsx` — import `useReducedMotion`; when
   true, return early from the effect that calls `animate()` at line 40 without
   starting or scheduling a control.
5. `src/components/ui/background-paths.tsx` — import `useReducedMotion`; when
   true, pass `initial={false}` and `transition={{ duration: 0 }}` to the
   `motion.path` at line 34, leaving the `animate` target unchanged.
6. `src/components/shared/Illustrations.tsx` — import `useReducedMotion`; when
   true, pass `initial={false}` and `transition={{ duration: 0 }}` to every
   `motion.*` element that currently carries a `transition` prop, and drop
   `repeat: Infinity` in that branch. Elements with array-valued `animate` (e.g.
   `animate={{ opacity: [1, 0.3, 1] }}` at line 1233) must instead animate to
   the array's **first** value as a scalar.
7. Run the verification below with the preference emulated **on** before
   considering any step done.

## Boundaries

- Do NOT touch `src/components/home/OrbitLogos.tsx` — plan 003 converts it to
  CSS, and block A's `animation: none` rules then cover it. If plan 003 has not
  run yet, note it in your report; do not fix it here.
- Do NOT remove the `.orbit-ring` / `.orbit-chip` rules if plan 003 has already
  added them.
- Do NOT add a custom `usePrefersReducedMotion` hook — use Framer Motion's.
- Do NOT use `!important` anywhere in block A.
- Do NOT change any default-path animation values, durations or easings. This
  plan only adds a reduced branch.
- Do NOT add new dependencies.
- If `globals.css:689–698` does not match the excerpt in **Problem** (drift
  since commit `317d1c1`), STOP and report.

## Verification

- **Mechanical**:
  - `npx tsc --noEmit` — 18 pre-existing errors expected; no new ones.
  - `npm run build` — must compile clean.
  - `grep -c "0.01ms" src/app/globals.css` must return `0`.
  - `grep -rl "useReducedMotion" src/components/` must list all four files from
    steps 3–6.
- **Feel check**: run `npm run dev`, then DevTools → Rendering →
  **Emulate CSS prefers-reduced-motion: reduce**. With it ON:
  - `/` — the hero headline must show one fixed word and never change. The logo
    strip must be readable and **completely still** (not scrolling fast).
  - `/` — scroll down. Sections must appear by fading only, with no upward
    travel, and must still appear (not stay invisible).
  - `/` — hover a persona card. Colour and border must still respond; the card
    must not lift.
  - `/cgap` — background paths must be drawn and static.
  - `/products` — illustrations must be fully drawn and complete, not blank,
    half-drawn, or pulsing.
  - Open the Performance panel and record 10s idle on `/`. There must be **no
    recurring animation frames**.
  - Now turn the emulation OFF and reload every page above: all motion must
    return exactly as before this plan. Regressions to the default path are the
    main risk here.
- **Done when**: with reduced motion on, nothing on the site moves or loops,
  every element is present and legible in its final state, and hover/focus still
  give colour feedback — and with it off, nothing has changed at all.
