# Convergent Business Technologies — Design Guidelines

> This document is the single source of truth for all visual and UX decisions
> across **every CBT product**, not just the marketing website. Reference it in
> every Claude Code session.
>
> Sections 1–5 and 7–9 (brand, colour, type, spacing, components, imagery,
> motion, accessibility) are product-agnostic — apply them as written to any new
> CBT web product. Section 6 is website-specific page notes; section 10 describes
> this repository's layout. Both are illustrative rather than binding elsewhere.
>
> Where a rule here carries a reason, the reason travels with it. Keep them
> together when copying into a new project — a rule without its rationale gets
> overridden by the first person who disagrees with it.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| **Company Name** | Convergent Business Technologies |
| **Abbreviation** | CBT |
| **Sector** | Data, Cloud & AI Consultancy |
| **Brand Personality** | Approachable, modern, expert, forward-thinking |
| **Tone of Voice** | Confident but accessible. No jargon overload. Smart without being cold. |

### Target Audiences
1. **Enterprise & SME clients** — Business owners seeking data transformation, cloud migration, or AI adoption
2. **Startup partners** — Early-stage companies adopting AI for the first time
3. **Potential partners** — Other businesses or consultancies exploring collaboration
4. **Graduate talent** — Fresh university graduates seeking industry experience (dedicated section/page)

---

## 2. Color System

All colors defined as CSS custom properties. Use these tokens exclusively — never hardcode hex values.

```css
:root {
  /* Primary */
  --color-primary:        #00994D;  /* CBT Green — main brand color */
  --color-primary-light:  #00C060;  /* Hover states, highlights */
  --color-primary-dark:   #007A3D;  /* Active states, depth */
  --color-primary-muted:  #E6F5ED;  /* Backgrounds, tinted sections */

  /* Neutrals */
  --color-white:          #FFFFFF;
  --color-surface:        #F7F8F7;  /* Page background alternative */
  --color-border:         #E2E8E4;  /* Subtle dividers */
  --color-text-muted:     #6B7280;  /* Secondary text, captions */
  --color-text-body:      #374151;  /* Body copy */
  --color-text-heading:   #111827;  /* Headings, titles */

  /* Semantic */
  --color-success:        #00994D;  /* Reuse primary */
  --color-warning:        #F59E0B;
  --color-error:          #EF4444;
  --color-info:           #3B82F6;
}
```

### Color Usage Rules
- **Primary green** → CTAs, active nav items, badges, icon accents, section dividers
- **White** → Card backgrounds, hero sections, clean content areas
- **Grey (`--color-text-muted`, `--color-text-body`)** → All body text and supporting copy
- **`--color-primary-muted`** → Tinted section backgrounds (e.g. testimonials, feature callouts)
- **Never** use primary green as a large background for body text — contrast ratio must pass WCAG AA

---

## 3. Typography

### Font Families

```css
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'DM Sans', 'Helvetica Neue', sans-serif;
  --font-mono:    'JetBrains Mono', 'Courier New', monospace;
}
```

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

### Type Scale

```css
:root {
  --text-xs:   0.75rem;   /* 12px — labels, legal */
  --text-sm:   0.875rem;  /* 14px — captions, metadata */
  --text-base: 1rem;      /* 16px — body default */
  --text-lg:   1.125rem;  /* 18px — lead paragraphs */
  --text-xl:   1.25rem;   /* 20px — card titles */
  --text-2xl:  1.5rem;    /* 24px — section subtitles */
  --text-3xl:  1.875rem;  /* 30px — section headings */
  --text-4xl:  2.25rem;   /* 36px — page titles */
  --text-5xl:  3rem;      /* 48px — hero headings */
  --text-6xl:  3.75rem;   /* 60px — large hero display */
}
```

### Typography Rules
- **H1–H3** → `var(--font-heading)`, weight 700, color `--color-text-heading`
- **H4–H6** → `var(--font-heading)`, weight 600
- **Body, UI labels, nav** → `var(--font-body)`
- **Code snippets, tech specs** → `var(--font-mono)`
- **Line height**: headings `1.2`, body `1.65`, captions `1.4`
- **Letter spacing**: headings `-0.02em`, body `0`, uppercase labels `0.08em`

---

## 4. Spacing & Layout

### Spacing Scale

```css
:root {
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
}
```

### Layout

```css
:root {
  --container-max:   1200px;
  --container-wide:  1440px;
  --container-prose: 720px;   /* Blog/article content */
  --container-px:    var(--space-6);  /* Horizontal padding on mobile */

  --section-py:      var(--space-20); /* Standard section vertical padding */
  --section-py-lg:   var(--space-24); /* Hero and major sections */
}
```

### Grid System
- **Desktop**: 12-column grid, `gap: var(--space-8)`
- **Tablet**: 8-column grid
- **Mobile**: 4-column / single column stack
- **Card grids**: typically `repeat(auto-fit, minmax(300px, 1fr))`

### Breakpoints

```css
/* Mobile first */
--bp-sm:  640px;
--bp-md:  768px;
--bp-lg:  1024px;
--bp-xl:  1280px;
--bp-2xl: 1536px;
```

---

## 5. Component Patterns

### Buttons

```css
/* Primary CTA */
.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-8);
  border-radius: 6px;
  border: 2px solid transparent;
  transition: background 0.2s ease, transform 0.15s ease;
}
.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}

/* Secondary / Outlined */
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  /* same padding/font as primary */
}
.btn-secondary:hover {
  background: var(--color-primary-muted);
}

/* Ghost / Text */
.btn-ghost {
  background: transparent;
  color: var(--color-text-body);
  border: none;
  text-decoration: underline;
  text-underline-offset: 3px;
}
```

### Cards

```css
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--space-8);
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.card:hover {
  box-shadow: 0 8px 24px rgba(0, 153, 77, 0.12);
  transform: translateY(-2px);
}
```

### Navigation

- **Desktop**: Fixed top nav, white background with subtle bottom border, logo left, links center/right
- **Mobile**: Hamburger menu, full-screen slide-in drawer
- Active link: `color: var(--color-primary)`, with a `2px` underline accent
- Nav font: `var(--font-body)`, weight 500, `var(--text-sm)`

### Forms (Contact / Lead Capture)

```css
.input {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-base);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 153, 77, 0.15);
  outline: none;
}
```

### Section Dividers / Accents
- Use a `3px` solid `--color-primary` left border on pull quotes and highlighted stats
- Thin `1px var(--color-border)` horizontal rules between sections
- Tinted section backgrounds (`--color-primary-muted` or `--color-surface`) to visually separate content blocks

---

## 6. Page-Specific Notes

### All Pages — Shared
- Sticky top navigation
- Footer with: logo, nav links, social links, contact CTA, copyright
- Consistent section padding using `--section-py`

### Home / Hero
- Large hero with headline in `--font-heading`, subheadline in `--font-body`
- Primary CTA button + secondary "Learn more" link
- Trust indicators (logos, stats, or short social proof)

### Services Page
- Card grid layout (3 columns desktop, 1 mobile)
- Each card: icon, title, short description, "Learn more" link in green

### Testimonials / Case Studies
- Tinted `--color-primary-muted` background section
- Quote mark accent in primary green
- Client name + company in muted text below

### Training Program Page
- Clearly differentiated visually from the commercial services pages
- Audience: graduates — use warmer, encouraging tone
- Highlight program outcomes, application CTA

### Contact / Lead Capture
- Clean, spacious form layout
- Minimal fields: Name, Email, Company, Message, Service interest (dropdown)
- Form submission feedback state (success/error)

---

## 7. Imagery & Iconography

- **Photography style**: Real people, diverse teams, tech environments — avoid generic stock photos
- **Illustrations**: Flat, geometric, green-accented if used
- **Icons**: Use [Lucide Icons](https://lucide.dev) — consistent stroke width (`1.5px`), sized at `20px` or `24px`
- **Image aspect ratios**: Hero `16:9`, team photos `1:1`, case study covers `3:2`

---

## 8. Motion & Interaction

> The register is **professional and restrained**. Motion here exists to explain
> a change, confirm an action, or prevent something jarring — never to decorate.
> If a visitor notices the animation rather than the result, it is too much.

### Motion tokens

```css
:root {
  /* Easing */
  --ease:              cubic-bezier(0.22, 1, 0.36, 1);   /* the default — a strong ease-out */
  --transition-spring: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); /* overshoots; use sparingly */

  /* Durations */
  --transition-fast:   0.15s ease;   /* press feedback */
  --transition-base:   0.2s ease;    /* hover, colour */
  --transition-slow:   0.35s ease;   /* larger surfaces */
}
```

Use `var(--ease)` for anything entering, exiting, or moving. The built-in CSS
easings (`ease`, `ease-out`) are too weak to read as deliberate — reserve bare
`ease` for colour and hover, where there is no movement to shape.

### Choosing an easing

| Situation | Easing |
| --- | --- |
| Entering or exiting | `var(--ease)` — starts fast, feels responsive |
| Moving or morphing on screen | a strong ease-in-out |
| Hover, colour change | `ease` |
| Constant motion (marquee, progress) | `linear` |
| Gesture-driven, interruptible | a spring, not a duration |

**`ease-in` on UI is always wrong.** It starts slow, delaying the exact moment
the user is watching. There is no `ease-in` anywhere in this codebase; keep it
that way.

### Duration budget

**UI animations stay under 300ms.** Anything longer reads as lag, not polish.

| Element | Duration |
| --- | --- |
| Press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing / explanatory | Can be longer |

### Should it animate at all?

Frequency decides. This is the first question, before easing or duration:

| How often the user sees it | Decision |
| --- | --- |
| 100+ times/day (keyboard shortcuts, command palettes) | **No animation. Ever.** |
| Tens of times/day (hover, list navigation) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, success, celebration) | Delight is allowed |

The strongest fix for a motion problem is very often to **delete the animation**.

### Physicality

- **Never `scale(0)`.** Nothing in the real world appears from nothing. Enter
  from `scale(0.9–0.97)` with `opacity: 0`.
- **Popovers, dropdowns and tooltips scale from their trigger**, not from centre
  — set `transform-origin` to the trigger. Modals are the exception: they are
  centred by nature, so `transform-origin: center` is correct there.
- **Press feedback is required on every button.** `transform: scale(0.97)` on
  `:active` with `transition: transform 0.15s`. Keep it in the 0.95–0.98 band —
  felt more than seen.
- **Compose press with hover.** If an element lifts on hover
  (`translateY(-1px)`), its press state must be `translateY(0) scale(0.97)`, not
  a bare `scale()` — otherwise it drops to baseline *and* scales, which reads as
  two competing movements. Larger surfaces like cards take a gentler
  `translateY(-2px) scale(0.99)`; 0.97 on a card lurches.

### Interruptibility

CSS **transitions** retarget from wherever they are; **keyframes** restart from
zero. Anything triggered rapidly or reversible mid-motion — toggles, drags,
expand/collapse, stacking toasts — must use transitions or springs, never
keyframes.

### Performance

- **Animate `transform` and `opacity` only.** `width`, `height`, `margin`,
  `padding`, `top` and `left` trigger layout and paint on every frame.
- **`transition: all` is always a defect** — it animates properties you did not
  intend, off the GPU.
- **Prefer CSS over JS for predetermined motion.** A linear, infinite,
  non-interactive rotation belongs in `@keyframes`, where the compositor owns it
  and the tab can idle. Reach for a JS animation library only for gesture-driven
  or state-dependent motion.
- Keep transition-time `filter: blur()` under 20px — expensive, especially in
  Safari.

### Scroll reveals

Sections fade up on entry via `IntersectionObserver`, using a class toggle
(`.v2-reveal` → `.v2-in`) rather than a JS-driven animation. Two rules:

1. **Unobserve once revealed.** A one-shot animation should not keep firing its
   callback on every scroll past.
2. **Give the effect a dependency array.** Without one it rebuilds the observer
   on every render. But note the trade-off: pinning it to a single scan means
   any element that renders *after* hydration — behind `Suspense`, a lazy
   import, or client state — will never reveal. If reveals ever need to cover
   late-rendering content, that scan has to be re-run deliberately.

### Reduced motion

**Reduced motion means less movement, not no feedback.** Drop position changes
and decorative loops; keep opacity, colour and border transitions so the
interface still confirms what the user did.

Do **not** use the blanket reset that circulates widely:

```css
/* ANTI-PATTERN — do not use */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

It fails three ways: it strips comprehension-aiding feedback along with the
movement; `0.01ms` on an *infinite* animation does not stop it but runs it as
fast as the browser allows; and it cannot touch JavaScript-driven motion at all,
so any library animation ignores the preference entirely.

Instead, target deliberately:

```css
@media (prefers-reduced-motion: reduce) {
  /* Decorative loops stop outright. */
  .marquee { animation: none; }

  /* Reveals keep the fade, drop the travel. */
  .reveal { transform: none; transition: opacity 0.2s ease; }

  /* Hover and press lifts flatten; colour feedback survives. */
  .card:hover, .btn-primary:active { transform: none; }
}
```

And gate JS motion in the component itself — with `useReducedMotion()` if the
animation library provides it, or `matchMedia("(prefers-reduced-motion: reduce)")`
otherwise. **A CSS media query cannot stop a JS tween.**

#### The SSR trap

**Never branch rendered output directly on the preference in a server-rendered
app.** The preference does not exist on the server, so the two renders disagree
and React throws a hydration error — and does not patch up the subtree.

Framer Motion's `useReducedMotion()` reads a module-level ref that is `null`
during SSR and is populated *synchronously during the first client render*. So
`return reduced ? <A/> : <B/>` emits `B` on the server and `A` on the client's
hydration pass for exactly the users the branch is meant to serve.

The fix is to make the first client render agree with the server, then switch:

```tsx
export function useReducedMotionSafe(): boolean {
  const preference = useReducedMotion();
  const [reduced, setReduced] = useState(false);   // false on server AND first client render
  useIsomorphicLayoutEffect(() => {
    if (preference) setReduced(true);
  }, [preference]);
  return reduced;
}
```

A layout effect rather than `useEffect` so the swap happens before paint. The
cost is one committed-but-unpainted frame of the default tree; the alternative
is a console error and an unhydrated component.

The same trap applies to any client-only signal used during render — viewport
width, `localStorage`, `matchMedia`, time of day. If it cannot be known on the
server, it cannot decide the first render.

#### Migrating off the blanket reset

If a project already ships the anti-pattern, replacing it is not a safe
refactor, and the failure mode is counter-intuitive.

**The blanket reset freezes everything. A targeted list only freezes what it
names.** So the moment you delete the blanket, every hover lift, transition and
loop you did *not* enumerate stops being frozen and starts animating at full
duration. A partial migration leaves reduced-motion users with **more** visible
movement than before you started — you will have regressed the exact people the
change is for, while the diff reads like an accessibility improvement.

Enumerate exhaustively, mechanically, before deleting anything:

```python
# every :hover rule that sets a transform — each one needs a home in the block
import re
src = open("globals.css", encoding="utf-8").read()
for m in re.finditer(r'([^{}]*:hover[^{}]*)\{([^{}]*)\}', src):
    if re.search(r'\btransform\s*:', m.group(2)):
        print(src[:m.start()].count("\n") + 1, " ".join(m.group(1).split()))
```

On this codebase that found 27 rules where a hand-written list had 13.

Three things that bite during the migration:

- **A catch-all does not rescue you.** `*:hover { transform: none }` has
  specificity 0-1-0 and loses to every `.class:hover` at 0-2-0. Making it win
  requires `!important`, which then fights every future override. Enumerate
  instead, and leave a comment saying the list must grow with the codebase —
  it is the one part of this that rots.
- **Do not flatten an affordance to nothing.** A `::before { transform:
  scaleX(1) }` underline that grows on hover is a *state indicator*, not
  decoration. Setting it to `none` deletes the hover feedback rather than
  calming it, which is worse for everyone. Reduce travel; don't remove meaning.
- **Keyframe arrays are sequences, not endpoints.** An animation target like
  `opacity: [0.25, 0.5, 0.25]` has no well-defined resting value at duration 0.
  The reduced branch must name a scalar explicitly — usually the array's first
  value, or the visually complete state.

Also gate hover motion for touch, which fires false hovers on tap:

```css
@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(-4px); }
}
```

### Cohesion

- Curves and durations live as **shared tokens**. Several hand-typed
  `cubic-bezier()` values that almost match is a defect, not a style.
- **Never define the same `@keyframes` name twice.** CSS has no keyframe
  scoping — the last definition in the stylesheet silently wins for the whole
  document, and the earlier one becomes dead code that looks live.
- Group entrances use a **30–80ms stagger**. Stagger is decorative and must
  never delay interaction.
- Only interactive elements get hover states. A card that is not clickable must
  not hover — it misleads. Either wrap it in a link or strip the effect.

---

## 9. Accessibility

- All text must meet **WCAG AA** contrast ratio (4.5:1 for body, 3:1 for large text)
- All interactive elements must be keyboard-navigable with visible `:focus` styles
- Images must have descriptive `alt` attributes
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Form inputs must have associated `<label>` elements

---

## 10. Code Conventions (for Claude Code)

```
/src
  /components
    /ui          ← Buttons, inputs, cards (reusable primitives)
    /layout      ← Navbar, Footer, Section wrappers
    /sections    ← Hero, Services, Testimonials, etc.
  /pages         ← Home, Services, Training, Contact
  /styles
    globals.css  ← CSS variables (all tokens above go here)
    reset.css
  /assets
    /images
    /icons
```

- **CSS variables** defined in `globals.css`, imported globally
- **Component naming**: PascalCase for components, kebab-case for CSS classes
- **No hardcoded colors or spacing** — always reference CSS variables
- **Mobile-first CSS**: write base styles for mobile, use `min-width` media queries to scale up

---

*Last updated: 2026-08-28 — Convergent Business Technologies*

*Section 8 (Motion & Interaction) was rewritten on 2026-08-27 following a full
motion audit of the website, and extended on 2026-08-28 with "Migrating off the
blanket reset" after executing that migration. The rules there are drawn from
what the audit found in production code and from what the migration cost, not
from theory — including the reduced-motion anti-pattern, which this document
previously recommended.*
