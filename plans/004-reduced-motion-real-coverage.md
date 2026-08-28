# 004 — Replace the blanket reduced-motion reset with real coverage

- **Status**: DONE — executed 2026-08-28
- **Commit**: 317d1c1 (planned against), reconciled and executed against `853db86`
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 5 files, ~85 lines net (revised up from ~60)

## Outcome

Executed using the **amended** block A and the corrected steps in
Reconciliation, not the originals under Target.

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | 18 — the pre-existing baseline, none in the five touched files |
| `npm run build` | Clean, 50/50 static pages |
| `npm run test:spam` | 31/31 (unrelated canary) |
| `grep -c "0.01ms"` in `globals.css` | `0` |
| `useReducedMotion` in components | All four files |
| Audit snippet re-run | **0 remaining gaps** |
| Served CSS | `0.01ms` gone; all 14 previously-uncovered selectors present |
| `/`, `/cgap`, `/products`, `/case-studies` | 200 |

Two deviations from the amended plan, both deliberate:

- **`flip-words.tsx` gained a `clearTimeout` cleanup** the original effect
  lacked. Strictly this touches the default path, which Boundaries discourage.
  Kept because the component now early-returns for reduced motion, and an
  uncleaned timer on an unmounting component is a leak — the correctness win
  outweighs the boundary. No change to duration, easing or sequence.
- **`infinite-slider.tsx` gates the whole effect**, per Reconciliation, and
  calls `translation.set(0)` so the track rests at its start offset rather than
  wherever a partially-run tween left it.

`Illustrations.tsx` had **five** `transition` props, not the three enumerated in
the original steps (1226 and 1261 were unlisted). All five are gated. Verified
there are no `variants=` props in the file, so the `initial="hidden"
animate="visible"` pairs on the two `motion.svg` roots are inert and need no
branch.

Estimates and the original Target below are left unedited.

## Reconciliation — 2026-08-28

Re-verified against the tree at `853db86`. **Everything below the "Problem"
heading is the original plan and is left unedited**; where this section and the
original disagree, this section wins.

### Anchors that still hold

| Claim | Status |
| --- | --- |
| Blanket reset at `globals.css:689–698` | Exact match, byte for byte |
| `0.01ms` appears only there | Confirmed — lines 695, 696, nowhere else |
| All 25 selectors named in block A exist | Confirmed, each present |
| Infinite CSS animations = the 3 named | Confirmed complete; `.orbit-ring`/`.orbit-chip` already carry their own reduced-motion rule from 003 |
| `Illustrations.tsx:1233, 1254, 1268` | Exact |
| `flip-words.tsx:26` timer | Exact |
| All four JS components ungated | Confirmed — zero reduced-motion checks between them |
| `OrbitLogos.tsx` | **Now covered by 003. Skip it** — the original Boundaries section is stale on this point |

### Blocking defect in block A — it would make things worse

**Block A covers 13 of the 27 `:hover` rules that set a transform. 14 are
uncovered.**

This is not a cosmetic omission. The blanket reset currently freezes *every*
transition to `0.01ms`, so today a reduced-motion user gets all 27 hover lifts
instantly, without travel. Block A removes that blanket and replaces it with 13
named selectors — which means the other 14 stop being frozen and start animating
at full duration. **Plan 004 as written would give reduced-motion users more
visible hover movement than they have today**, on the case-studies grid, the
products grid, the nav and the services page.

Uncovered rules, generated from the current file:

| Line | Selector | Transform |
| --- | --- | --- |
| 872 | `.v2-btn-p:hover` | `translateY(-2px)` |
| 884 | `.v2-btn-s:hover` | `translateY(-1px)` |
| 949 | `.hero-btn-secondary:hover .hero-btn-arrow` | `translateX(4px)` |
| 987 | `.v2-card:hover` | `translateY(-3px)` |
| 1036 | `.v2-pc:hover::before` | `scaleX(1)` |
| 1672 | `.v2-nm-featured:hover` | `translateY(-2px)` |
| 2649 | `.service-card:hover .service-link>span` | `translateX(3px)` |
| 2955 | `.services-toc-link:hover` | `translateY(-1px)` |
| 3156 | `.cv-tile-preview:hover img` | `scale(1.04)` |
| 3293 | `.products-page .products-card-preview:hover > div:first-child` | `scale(1.04)` |
| 4000 | `.case-study-card:hover` | `translateY(-3px)` |
| 6070 | `.cs-card:hover` | `translateY(-4px)` |
| 6076 | `.cs-card:hover::before` | `scaleX(1)` |
| 992 | `.v2-card-static:hover` | already `none` — no-op, skip |

Note `.v2-pc:hover::before` is **not** matched by block A's `.v2-pc:hover`; a
pseudo-element needs its own selector.

**Resolution: enumerate all of them.** The tempting fix is a catch-all
`*:hover { transform: none }`, but it does not work — its specificity (0-1-0)
loses to every `.class:hover` (0-2-0), so it would need `!important`, which the
Boundaries forbid. Enumeration is verifiable and has no specificity trap. Its
cost is that the list rots the moment someone adds a hover lift, so the
amended block carries a comment saying so.

**Two deliberate exclusions.** The `::before { scaleX(1) }` rules on `.v2-pc`
and `.cs-card` are underline/bar reveals, not position changes. Setting them to
`transform: none` would delete the hover affordance entirely rather than calm
it, which is worse for everyone. Leave them.

The two `scale(1.04)` image zooms **are** included — a photo growing under the
cursor is exactly the kind of movement the preference is asking us to stop.

### Corrections to steps 3–6

- **Step 4 (`infinite-slider.tsx`)** — the plan points at the `animate()` on
  line 40. That is the hover-retarget branch; the infinite loop is the `else`
  branch at **line 50** (`repeat: Infinity`). Gate the whole effect, not one
  branch.
- **Step 5 (`background-paths.tsx`)** — "leave the `animate` target unchanged"
  does not work here. The target holds **array** values
  (`opacity: [0.25, 0.5, 0.25]`, `pathOffset: [0, 1, 0]`) which are keyframe
  sequences, not endpoints; with `duration: 0` the resting value is ambiguous.
  The reduced branch must pass scalars: `{ pathLength: 1, opacity: 0.5 }` and no
  `repeat`. Also note this file uses `Number.POSITIVE_INFINITY`, not
  `repeat: Infinity` — a grep for the latter misses it. Scale worth knowing:
  36 paths × 2 instances = **72 infinite tweens** on `/cgap`, more than the hero
  orbit that plan 003 just removed.
- **Step 3 (`flip-words.tsx`)** — gating the timer is necessary but not
  sufficient. The per-letter `motion.span`s at lines 66–91 animate `y` and
  `filter: blur(8px)` on mount, so even with the timer stopped the first word
  still assembles letter by letter. Rendering `words[0]` as plain text in the
  reduced branch handles both at once, as the original Target intends.
- **Step 6 (`Illustrations.tsx`)** — line **1226** also carries a `transition`
  (`x: -60 → 70`, spring) and is in scope under step 6's own rule ("every
  `motion.*` that currently carries a `transition` prop") despite not being
  enumerated. Line 1261's `initial={{ scale: 0 }}` is tracked separately as a
  LOW finding in `README.md`; `initial={false}` in the reduced branch neutralises
  it here regardless.
- **`ClientLogoStrip.tsx:363` is a weaker exemplar than the plan implies.** That
  guard covers the mosaic **swap timer**, not the `InfiniteSlider` it renders at
  line 135. The slider is genuinely ungated — the finding stands.

### Amended block A — use this, not the one under Target

```css
/* replaces src/app/globals.css:689–698 */

/* ─── ACCESSIBILITY ─── */
/* Reduced motion means less movement, not no feedback. Position changes and
   decorative loops are removed; opacity, colour, border and shadow transitions
   are kept so the UI still confirms what the user did. */
@media (prefers-reduced-motion: reduce) {

  /* Decorative infinite loops stop completely — shortening an infinite
     animation speeds it up rather than stopping it. The hero orbit is not
     listed here: it carries its own rule in the HERO ORBIT section. */
  .animate-marquee-fwd,
  .animate-marquee-rev,
  .v2-mq-track {
    animation: none;
  }

  /* Entrance animations resolve instantly to their end state. */
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

  /* Hover and press lifts flatten; colour and shadow feedback survives.
     This list must name EVERY :hover rule that sets a transform. It is
     exhaustive as of 853db86 — if you add a hover lift anywhere, add it here
     too, or reduced-motion users get the movement at full duration. Verify
     with the audit snippet in this plan's Verification section.
     A catch-all `*:hover` does not work: at 0-1-0 it loses to every
     `.class:hover` at 0-2-0, and !important is out of bounds. */
  .card:hover,
  .v2-pc:hover,
  .v2-prod-card:hover,
  .v2-stile:hover,
  .v2-bridge-chip:hover,
  .v2-card:hover,
  .v2-nm-featured:hover,
  .case-study-card:hover,
  .cs-card:hover,
  .btn-primary:hover,
  .btn-primary-v2:hover,
  .btn-secondary:hover,
  .btn-outline:hover,
  .btn-cta-white:hover,
  .hero-btn-primary:hover,
  .hero-btn-video:hover,
  .v2-nav-cta:hover,
  .v2-btn-p:hover,
  .v2-btn-s:hover,
  .services-toc-link:hover {
    transform: none;
  }

  /* Icon and arrow nudges. */
  .hero-btn-secondary:hover .hero-btn-arrow,
  .service-card:hover .service-link>span {
    transform: none;
  }

  /* Image zoom on hover — a photo growing under the cursor is movement. */
  .cv-tile-preview:hover img,
  .products-page .products-card-preview:hover>div:first-child {
    transform: none;
  }

  /* Deliberately NOT reset: .v2-pc:hover::before and .cs-card:hover::before
     (scaleX underline reveals). Setting those to none deletes the hover
     affordance rather than calming it. */
}
```

### Audit snippet — re-run before and after

Catches a hover transform that block A misses. Should print nothing but the two
`::before` rules and `.v2-card-static` (already `none`).

```python
import re
src = open("src/app/globals.css", encoding="utf-8").read()
covered = set("""card v2-pc v2-prod-card v2-stile v2-bridge-chip v2-card v2-nm-featured
case-study-card cs-card btn-primary btn-primary-v2 btn-secondary btn-outline
btn-cta-white hero-btn-primary hero-btn-video v2-nav-cta v2-btn-p v2-btn-s
services-toc-link hero-btn-arrow service-link cv-tile-preview
products-card-preview v2-card-static""".split())
for m in re.finditer(r'([^{}]*:hover[^{}]*)\{([^{}]*)\}', src):
    if re.search(r'\btransform\s*:', m.group(2)):
        sel = " ".join(m.group(1).split())
        if not (set(re.findall(r'\.([\w-]+)', sel)) & covered):
            print(src[:m.start()].count("\n") + 1, sel)
```

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
