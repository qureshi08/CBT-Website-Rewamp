# 002 — Deliver the press feedback the buttons already declare

- **Status**: DONE — executed 2026-08-27, `src/app/globals.css` only
  (51 insertions, 3 deletions)
- **Commit**: 317d1c1 (planned against)
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 1 file, ~10 rules added

## Outcome

Both steps applied as specified. All ten button selectors now carry a `:active`
rule *and* the `transform 0.15s` transition needed to animate it.

| Check | Result |
| --- | --- |
| `:active` rules in source | 26 lines (was 0) |
| All ten selectors | `:active` rule + `transform 0.15s` each |
| CSS brace balance | 0, never negative |
| Served stylesheet | all four rule groups delivered verbatim |
| Feel check | Passed — buttons push down and in, cards keep part of their lift |

Verified in the **served** CSS, not just the source:

```css
.btn-primary:active, … .v2-nav-cta:active          { transform: translateY(0)scale(.97) }
.btn-cta-ghost:active, .hero-btn-secondary:active  { transform: scale(.97) }
a:active .card, a:active .v2-pc, …                 { transform: translateY(-2px)scale(.99) }
@media (prefers-reduced-motion: reduce) { … }      { transform: none }
```

**Gotcha worth remembering: Turbopack served a stale CSS chunk** for several
minutes after the edit — same chunk hash, same byte count, zero `:active` rules,
and `touch`ing the file did not invalidate it. This looked exactly like Tailwind
stripping the rules. What settled it was appending a throwaway canary rule,
which forced a rebuild and made everything appear at once. The canary was then
removed and its absence confirmed in both source and served output.

If a CSS change appears not to apply during dev, check the served chunk's byte
count before concluding the CSS is wrong.

Estimates below were written before execution and are left unedited.

## Problem

`src/app/globals.css` contains **zero `:active` rules** in 6,376 lines
(`grep -c ":active" src/app/globals.css` → `0`). Nothing on the site responds to
being pressed.

This is not an oversight of intent — it is an unfinished implementation. Eight
selectors already declare a `transform` transition specifically sized for press
feedback (0.15s), and nothing ever sets a transform for it to animate:

```css
/* src/app/globals.css:225  — .btn-primary-v2 */
transition: background 0.2s var(--ease), transform 0.15s;
/* src/app/globals.css:291  — .btn-cta-white */
transition: background 0.2s, color 0.2s, transform 0.15s;
/* src/app/globals.css:315  — .btn-primary */
transition: background 0.2s var(--ease), transform 0.15s;
/* src/app/globals.css:338  — .btn-secondary */
transition: background 0.2s var(--ease), color 0.2s var(--ease), transform 0.15s;
/* src/app/globals.css:521  — .btn-outline */
transition: background 0.2s var(--ease), color 0.2s var(--ease), transform 0.15s;
/* src/app/globals.css:919  — .hero-btn-primary */
transition: background 0.2s var(--ease-v2), transform 0.15s;
/* src/app/globals.css:970  — .hero-btn-video */
transition: border-color 0.2s var(--ease-v2), transform 0.15s;
/* src/app/globals.css:1938 — .v2-nav-cta */
transition: background 0.2s var(--ease-v2), transform 0.15s;
```

The declared `transform 0.15s` is currently dead in all eight.

Why it matters: press feedback is the cheapest possible confirmation that a tap
registered. On touch — where there is no hover state to fall back on — its
absence is the difference between a button that feels wired up and one that
feels like a picture of a button. This site's primary conversion actions
(`hero-btn-primary`, `btn-primary`, `v2-nav-cta`) are all affected.

## Target

One press-feedback group, appended once at the end of the stylesheet.
`scale(0.97)` sits inside the 0.95–0.98 band that reads as pressure rather than
as an animation; `0.15s` is the duration the selectors already declare.

Seven of the ten buttons lift on hover with `transform: translateY(-1px)`
(`globals.css:322, 232, 345, 529, 299, 925, 976, 1943`). A bare `scale(0.97)` on
`:active` would **replace** that transform and make the button jump back down to
baseline before scaling — two competing movements in 150ms.

The press must therefore compose with the lift. Cancelling the lift *and*
scaling in is also the more physical reading: hovering raises the button toward
the cursor, pressing pushes it back down and in.

```css
/* target — add to the end of src/app/globals.css */

/* ─── PRESS FEEDBACK ─── */
/* The `transform 0.15s` already declared on these selectors exists for this
   rule. Keep the two in sync — removing one strands the other. */

/* Buttons that lift on hover: press cancels the lift and pushes in. */
.btn-primary:active,
.btn-primary-v2:active,
.btn-secondary:active,
.btn-outline:active,
.btn-cta-white:active,
.hero-btn-primary:active,
.hero-btn-video:active,
.v2-nav-cta:active {
  transform: translateY(0) scale(0.97);
}

/* Buttons with no hover lift: press scales only. */
.btn-cta-ghost:active,
.hero-btn-secondary:active {
  transform: scale(0.97);
}

/* Cards travel further on hover (-4px), so their press keeps part of the lift
   and scales less — a card is a larger surface and 0.97 reads as a lurch. */
a:active .card,
a:active .v2-pc,
a:active .v2-prod-card {
  transform: translateY(-2px) scale(0.99);
}

@media (prefers-reduced-motion: reduce) {

  .btn-primary:active,
  .btn-primary-v2:active,
  .btn-secondary:active,
  .btn-outline:active,
  .btn-cta-white:active,
  .btn-cta-ghost:active,
  .hero-btn-primary:active,
  .hero-btn-secondary:active,
  .hero-btn-video:active,
  .v2-nav-cta:active,
  a:active .card,
  a:active .v2-pc,
  a:active .v2-prod-card {
    transform: none;
  }
}
```

Two selectors — `.btn-cta-ghost` (`globals.css:2733`,
`transition: color 0.2s;`) and `.hero-btn-secondary` (`globals.css:938`,
`transition: color 0.2s, border-color 0.2s;`) — do not currently declare a
transform transition. They must be given one so their press animates rather than
snapping. See step 3.

## Repo conventions to follow

- All CSS lives in `src/app/globals.css`; there is no other stylesheet in `src/`.
- Sections are introduced by a banner comment in the form `/* ─── NAME ─── */`.
  Exemplar: `/* ─── CARDS ─── */` at `globals.css:377`.
- Easing tokens are `--ease` and `--ease-v2` (both
  `cubic-bezier(0.22, 1, 0.36, 1)`). Press feedback uses the *duration* already
  declared (0.15s) and needs no new token.
- Button rules live in the `@layer components` block that spans roughly
  `globals.css:210–530`. The `.hero-btn-*` and `.v2-*` rules live outside it,
  from ~`globals.css:900` onward.

## Steps

1. Open `src/app/globals.css`.
2. Confirm each of the eight selectors listed in **Problem** still carries
   `transform 0.15s` at the stated line. If any does not, STOP and report.
3. Add `transform 0.15s` to the two selectors that lack it, so their press
   transition is animated rather than instant:
   - `src/app/globals.css:938` (`.hero-btn-secondary`) — change
     `transition: color 0.2s, border-color 0.2s;` to
     `transition: color 0.2s, border-color 0.2s, transform 0.15s;`
   - `src/app/globals.css:2733` (`.btn-cta-ghost`) — change
     `transition: color 0.2s;` to
     `transition: color 0.2s, transform 0.15s;`
4. Append the **entire** `/* ─── PRESS FEEDBACK ─── */` group from **Target**
   verbatim to the end of `src/app/globals.css`. Placing it last guarantees it
   wins over the `:hover` transforms it must compose with, without needing
   `!important`.
5. Do not change any `:hover` rule.

## Boundaries

- Do NOT add `:active` styling to nav links, footer links, form inputs, or
  anything not in the selector list above. Text links do not take press feedback
  in this design.
- Do NOT use `!important`.
- Do NOT change hover transforms, box-shadows, colours, or durations.
- Do NOT introduce a new easing token or duration scale — that is plan 003's
  neighbouring concern and out of scope here.
- Do NOT add new dependencies.
- If a selector named above does not exist in the file (drift since commit
  `317d1c1`), omit it from the group and report which ones were omitted.

## Verification

- **Mechanical**:
  - `npm run build` — must compile with no new errors.
  - `grep -c ":active" src/app/globals.css` must return **12 or more** (it
    returns `0` before this change).
- **Feel check**: run `npm run dev`.
  - On `/`, press and hold the hero's primary CTA
    ("Let's talk about your data challenge"). It must shrink slightly and stay
    shrunk while held, then spring back on release. The shrink must be felt more
    than seen — if it reads as an animation, it is too large.
  - Press a case-study card on `/case-studies`. It must dip *without* losing its
    hover lift — the card should not jump down to baseline and back.
  - Open DevTools → Rendering → **Emulate CSS prefers-reduced-motion: reduce**
    and repeat both. Nothing should move; hover colour changes must still occur.
  - In device emulation with touch enabled, tap the nav CTA. The press state must
    appear on touch, not only on mouse.
  - DevTools → Animations at 10% playback: the press must complete in ~150ms and
    must not overshoot or bounce.
- **Done when**: all ten button selectors visibly depress on press, cards
  compose press with hover rather than replacing it, and reduced-motion disables
  the movement while leaving colour feedback intact.
