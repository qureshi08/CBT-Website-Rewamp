# Animation improvement plans

> **ALL FIVE DONE as of 2026-08-28.** `0dd0730`, `e9f8cb5`, `54bb4dd`, `853db86`
> and 004. The top-five motion pass is complete; what remains is the
> [Not yet planned](#not-yet-planned) list below, none of it blocking.
>
> **If you touch motion from here, read this first.** Plan 004 replaced the
> blanket `prefers-reduced-motion` reset with an explicit list of every `:hover`
> rule that sets a transform. That list is exhaustive as of 004 and **rots the
> moment someone adds a hover lift** — anything not named animates at full
> duration for reduced-motion users, which is worse than the blanket reset it
> replaced. Re-run the audit snippet in
> [004](004-reduced-motion-real-coverage.md#audit-snippet--re-run-before-and-after)
> after adding any hover transform.
>
> **Anything needing `npm run build` must stop the dev server first** —
> `next build` and `next dev` share `.next`, and building underneath a live dev
> server corrupts it (this cost real time on 2026-08-27; symptom is "Jest worker
> encountered N child process exceptions", then 500s on every route). Check with
> `Get-NetTCPConnection -LocalPort 3000 -State Listen`.
>
> **A cold build can fail spuriously.** Static generation for `/`, `/partners`
> and `/products/ecl-calculator` timed out at 60s on the first build of
> 2026-08-28 and was clean on the next two. Those routes make several Supabase
> calls during data collection. Before treating a timeout as a regression, check
> whether the failing routes even touch the code you changed, then rebuild.

Produced by the `improve-animations` skill against commit `317d1c1`.
Each plan is self-contained: exact file paths, current-code excerpts, exact
target values, and a feel check. They can be executed by any agent, in the order
below.

The full audit found 11 findings plus 3 missed opportunities. These are the top
five by leverage (impact ÷ effort); the rest are listed under
[Not yet planned](#not-yet-planned).

## Plans

| # | Title | Severity | Category | Files | Status |
| --- | --- | --- | --- | --- | --- |
| [001](001-remove-dead-illustration-keyframes.md) | Delete the dead illustration keyframe block | HIGH | Cohesion | 1 | **DONE** |
| [002](002-add-press-feedback.md) | Deliver the press feedback the buttons already declare | MEDIUM | Physicality | 1 | **DONE** |
| [003](003-orbitlogos-css-rotation.md) | Move the hero orbit rotation from Framer Motion to CSS | HIGH | Performance | 2 | **DONE** |
| [004](004-reduced-motion-real-coverage.md) | Replace the blanket reduced-motion reset with real coverage | HIGH | Accessibility | 5 | **DONE** |
| [005](005-fix-scroll-reveal-observer.md) | Fix the scroll-reveal observer lifecycle | MEDIUM | Performance | 1 | **DONE** |

## Recommended execution order

**~~001~~ → ~~005~~ → ~~002~~ → ~~003~~ → ~~004~~**  —  all five complete

Rationale:

- **001 first, alone.** ✅ Done. It changed what nine keyframes actually do,
  site-wide. Landing it before anything else means every later plan is verified
  against the real values rather than the overridden ones. It was also the only
  plan whose effect could be mistaken for a regression introduced by a later
  plan. Note for the remaining plans: `fadeUp` now travels **28px** (not 15px)
  and `scaleIn` starts at **0.93** (not 0.9) — use these when reasoning about
  entrance timing.
- **005 next.** ✅ Done. One file, no interaction with anything else. Note for
  future work: the hook now scans the DOM **once per mount**, so any
  `.v2-reveal` element that renders after hydration (behind `Suspense`, a lazy
  import, or client state) will never reveal. Nothing in the app does that
  today — verified — but it is now a real constraint.
- **002** ✅ Done. Independent of all others. Note: `.hero-btn-secondary` and
  `.btn-cta-ghost` gained a `transform 0.15s` transition they previously
  lacked — the `:active` rules and those transitions are a matched pair, so
  removing either strands the other.
- **003 before 004.** ✅ Both done, and the ordering paid off exactly as
  intended: the hero orbit was already CSS by the time 004 ran, so it needed no
  `useReducedMotion` hook and no second media query. `will-change` was
  deliberately left off `.orbit-chip` — the browser promotes infinite transform
  animations on its own, so 24 explicit layers cost GPU memory for nothing.
- **004 needed reconciling before it could run.** Its hand-written hover list
  covered 13 of 27 rules. Because removing the blanket reset un-freezes
  everything not explicitly named, executing it as written would have given
  reduced-motion users *more* movement than before. The lesson generalises and
  is now written into `design-guidelines.md` §8 under
  "Migrating off the blanket reset".

## Dependencies

```
001 ──(independent)          ✅
005 ──(independent)          ✅
002 ──(independent)          ✅
003 ──→ 004                  ✅ → 004 is now unblocked
```

Plan 004 states this in its Boundaries: if 003 has not run, it must report rather
than fix `OrbitLogos.tsx` itself. That condition is now satisfied — 003 has run,
and `OrbitLogos.tsx` needs no further work for reduced motion.

## Verification shared across plans

Every plan's mechanical check assumes the current baseline:

- `npx tsc --noEmit` reports **18 pre-existing errors**. No plan may add to that
  count.
- `npm run build` compiles clean.
- `npm run test:spam` passes 31/31 and is unrelated to any of this work — it
  should stay green as a canary that nothing unexpected moved.

## Not yet planned

Remaining audit findings, in leverage order. Ask for a plan on any of these and
it will be written into this directory with the next number.

| Sev | Category | Location | Finding |
| --- | --- | --- | --- |
| MED | A11y | 66 `:hover` rules, 0 gated | No `@media (hover: hover)` anywhere — touch taps leave hover states stuck on mobile |
| MED | Perf | `globals.css:1012, 1071, 1167, 1208` | Four `transition: all` declarations |
| MED | Cohesion | `globals.css:88, 789` | `--ease` and `--ease-v2` are byte-identical `cubic-bezier(0.22, 1, 0.36, 1)`, plus 7 hand-typed copies |
| MED | Perf | 7 `useScrollReveal()` call sites | Each builds its own page-wide IntersectionObserver; the homepage runs five at once, all watching every `.v2-reveal`. Needs a singleton or a single mount point (partially mitigated by plan 005) |
| MED | Cohesion | `.reveal` vs `.v2-reveal` | Two complete scroll-reveal systems, different durations and distances, both live |
| MED | Perf | `globals.css:1820–1825` | Mobile nav sublist animates `max-height` + `padding` with a guessed `600px` ceiling |
| LOW | Physicality | `Illustrations.tsx:1265` | `initial={{ scale: 0 }}` — appears from nothing. Neutralised for reduced motion by 004; the default path still pops from zero |
| LOW | Duration | `globals.css:3155, 3292` | 500ms hover image zoom, roughly double the budget |

**Missed opportunities** (additive, not corrective):

- `/admin/submissions` rows pop open with no transition (`page.tsx:191`).
- The contact form hard-swaps its button label to "Sending…"
  (`ContactForm.tsx:295`) at the moment a user most wants feedback.

## Notes

- Nothing here touches `src/lib/security/`, the API routes, or any Supabase
  code. This is presentation only.
- Findings were vetted against the source at commit `317d1c1`; if plans are
  executed much later, re-run the `improve-animations reconcile` variant to
  refresh line references first.
