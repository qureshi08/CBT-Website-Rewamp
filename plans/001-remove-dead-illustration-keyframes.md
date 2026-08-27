# 001 — Delete the dead illustration keyframe block

- **Status**: DONE — executed 2026-08-27, 95 deletions / 0 insertions in
  `src/app/globals.css`
- **Commit**: 317d1c1 (planned against)
- **Severity**: HIGH
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file, ~95 lines deleted

## Outcome

Lines 5217–5311 deleted; the file went 6,376 → 6,281 lines. Verified:

| Check | Result |
| --- | --- |
| `grep -oE "@keyframes [A-Za-z0-9_-]+" … \| sort \| uniq -d` | empty (was nine names) |
| Each of the nine names | defined exactly once |
| CSS brace balance | 0, never negative |
| `npm run build` | compiles clean |
| `npm run test:spam` (canary) | 31/31 |
| Diff | 95 deletions, **zero insertions** |

The authored definitions are now live: `fadeUp` travels 28px, `scaleIn` starts
at `scale(.93)`, `pulse` is opacity-only. Feel check passed — the status dots no
longer scale, and the longer hero entrance travel was accepted as-is.

Estimates below were written before execution and are left unedited.

## Problem

`src/app/globals.css` defines **nine `@keyframes` twice**. CSS has no keyframe
scoping — the *last* definition in the stylesheet wins for every consumer in the
document. The second block (lines 5217–5311, headed
`/* ─── ILLUSTRATION KEYFRAMES ─── */`) silently overrides the first for the
whole site.

Duplicated names and where each pair lives:

| Name | Authored (live intent) | Overriding copy |
| --- | --- | --- |
| `barGrow` | `globals.css:757` | `globals.css:5218` |
| `drawLine` | `globals.css:735` | `globals.css:5228` |
| `fadeIn` | `globals.css:546` | `globals.css:5234` |
| `fadeUp` | `globals.css:534` | `globals.css:5240` |
| `scaleIn` | `globals.css:745` | `globals.css:5252` |
| `float` | `globals.css:701` | `globals.css:5264` |
| `floatB` | `globals.css:713` | `globals.css:5276` |
| `pulse` | `globals.css:609` | `globals.css:5288` |
| `marquee` | `globals.css:725` | `globals.css:5302` |

The overriding copies differ from the authored ones, so real values on the site
are not the values anyone wrote:

```css
/* src/app/globals.css:534 — authored, DEAD */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* src/app/globals.css:5240 — what actually runs */
@keyframes fadeUp {
  0%   { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

```css
/* src/app/globals.css:609 — authored, DEAD (opacity only) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}

/* src/app/globals.css:5288 — what actually runs (also scales) */
@keyframes pulse {
  0%, 100% { opacity: 1;   transform: scale(1); }
  50%      { opacity: 0.7; transform: scale(1.05); }
}
```

**The overriding block has no consumers of its own.** It was written for an
illustration component that has since been rewritten in Framer Motion:
`src/components/shared/Illustrations.tsx` contains zero `animation` declarations,
and no `.tsx` file anywhere references `float`, `floatB`, `barGrow`, `drawLine`,
`scaleIn`, `fadeUp` or `fadeIn` by name. The block is dead weight whose only
remaining effect is to override the live definitions.

Why it matters: the site's entry animations and its 13 inline status dots are
running values nobody chose, and anyone tuning the authored definitions at lines
534–780 sees no effect — a silent trap for future work.

## Target

Lines 5217–5311 of `src/app/globals.css` deleted in full. No other change. The
authored definitions at lines 534–780 become live.

Resulting behaviour changes (all intended):

| Consumer | Before | After |
| --- | --- | --- |
| `.animate-fade-up`, `.a-fadeUp-1…4`, `.v2-nm-*` | travels 15px | travels 28px |
| `.a-scaleIn` | scales from 0.90 | scales from 0.93 |
| 13 inline `pulse 2s infinite` status dots | opacity 1→0.7 **and** `scale(1)→scale(1.05)` | opacity 1→0.4, no scale |
| `.animate-fade-in` | no `from` keyframe | explicit `from { opacity: 0 }` |
| `marquee` | identical in both copies | unchanged |
| `float`, `floatB`, `barGrow`, `drawLine` | unused | unused |

The `pulse` change is the only one a visitor will notice. Opacity-only is what
the author wrote at line 609 and is the more restrained reading, which matches
this project's design register. If review prefers the scale, the correct fix is
to edit line 609 — **not** to restore the duplicate block.

## Repo conventions to follow

- All CSS lives in the single stylesheet `src/app/globals.css`; there is no
  other `.css` file in `src/`.
- Keyframes are grouped under banner comments in the
  `/* ─── NAME ─── */` style. The block being deleted is one such group,
  bounded by its banner at 5217 and the next banner at 5312.
- Exemplar of the section shape that survives: `globals.css:534–580`
  (`fadeUp` / `fadeIn` / `lineGrow`).

## Steps

1. Open `src/app/globals.css`.
2. Delete lines **5217 through 5311 inclusive** — from the line
   `/* ─── ILLUSTRATION KEYFRAMES ─── */` down to and including the blank line
   immediately before `/* ─── CASE STUDY DETAIL (Phase 0 design lock v2) ─── */`.
   The deletion must remove exactly nine `@keyframes` blocks: `barGrow`,
   `drawLine`, `fadeIn`, `fadeUp`, `scaleIn`, `float`, `floatB`, `pulse`,
   `marquee`.
3. Confirm the file now begins the next section directly:
   `/* ─── CASE STUDY DETAIL (Phase 0 design lock v2) ─── */` must be preceded by
   the closing `}` of the `@media (max-width: 560px)` `.footer-grid` rule and one
   blank line.
4. Do not add, rename, or edit any keyframe.

## Boundaries

- Do NOT touch `src/components/shared/Illustrations.tsx` — it is Framer Motion
  only and is unaffected.
- Do NOT edit the authored definitions at lines 534–780. This plan only deletes.
- Do NOT rename keyframes or introduce namespaced names.
- Do NOT add new dependencies.
- If the line range does not contain exactly the nine keyframes listed in step 2
  (drift since commit `317d1c1`), STOP and report instead of improvising.

## Verification

- **Mechanical**:
  - `npm run build` — must compile with no new errors.
  - `grep -oE "@keyframes [A-Za-z0-9_-]+" src/app/globals.css | sort | uniq -d`
    must print **nothing**. Before this change it prints nine names.
- **Feel check**: run `npm run dev` and load `/`.
  - The green status dot in the hero badge (`Hero.tsx:35`) must fade in and out
    on a 2s loop **without changing size**. Watch its edge against the pill
    background — it should not breathe.
  - Section entrances (`.a-fadeUp-1…4` in the hero) must travel visibly further
    than before. In DevTools → Animations, set playback to 10% and confirm the
    start offset is 28px, not 15px.
  - Load `/about`, `/contact` and `/cgap` and confirm their status dots behave
    identically to the homepage — all 13 share the one keyframe.
- **Done when**: the `uniq -d` command returns empty, the build passes, and no
  dot on any page scales.
