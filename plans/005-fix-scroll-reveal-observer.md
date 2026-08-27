# 005 — Fix the scroll-reveal observer lifecycle

- **Status**: TODO
- **Commit**: 317d1c1
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file, ~10 lines

## Problem

`useScrollReveal` in `src/components/home/Hero.tsx:9–18` drives `.v2-reveal`
entrances on 20 files across 12 pages. It has two defects:

```tsx
/* src/components/home/Hero.tsx:9 — current */
export function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".v2-reveal");
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("v2-in"); });
        }, { threshold: 0.1 });
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    });
}
```

**1. No dependency array.** The `useEffect` call ends `});` — there is no second
argument. React therefore re-runs it after **every render** of whichever
component called the hook: the observer is disconnected, a new one constructed,
and every `.v2-reveal` element on the page re-queried and re-observed. Of the
seven callers, `ServicesGrid` (`ServicesGrid.tsx:33`) holds two stateful hooks,
so each of its state changes rebuilds a whole-page observer.

**2. Elements are never unobserved.** Once an element intersects and gets
`v2-in`, it stays under observation and keeps firing the callback on every
subsequent scroll across its boundary, re-adding a class it already has. The
sibling implementation gets this right — `ScrollRevealInit.tsx:31` calls
`observer.unobserve(entry.target)` immediately after adding the class.

These compound because the hook is called **seven times** across the codebase —
`Hero.tsx:28`, `ServicesGrid.tsx:33`, `Differentiators.tsx:23`,
`CaseStudiesFeatured.tsx:16`, `CredentialsBar.tsx:19`, `AboutTheFirm.tsx:29` and
`ClientReveal.tsx:10` — and each call queries `document` globally rather than
its own subtree. The homepage mounts five of them
(`src/app/(public)/page.tsx:114–133`), so it runs **five independent observers,
each watching every `.v2-reveal` element on the page**, all racing to add the
same class.

This plan fixes the two lifecycle defects, which is where the repeated work
comes from. The five-observers-per-page duplication is a separate architectural
change (a module-level singleton, or moving the hook to one mount point) and is
listed in `plans/README.md` under *Not yet planned* — the `:not(.v2-in)` guard
added here reduces its cost but does not remove it.

Why it matters: this is invisible to the eye but it is repeated main-thread work
on every page that uses reveals, for a one-shot animation. It is also a ~10-line
fix.

## Target

```tsx
/* target — src/components/home/Hero.tsx:9 */
export function useScrollReveal() {
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("v2-in");
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.1 },
        );

        document
            .querySelectorAll(".v2-reveal:not(.v2-in)")
            .forEach((el) => io.observe(el));

        return () => io.disconnect();
    }, []);
}
```

Three changes: the `[]` dependency array, `io.unobserve()` after the class is
added, and `:not(.v2-in)` on the selector so a re-mount does not re-observe
elements that have already revealed.

## Repo conventions to follow

- `src/components/shared/ScrollRevealInit.tsx` is the exemplar — it is the same
  pattern done correctly, including `unobserve` at line 31 and the
  `:not(.visible)` guard at line 38. Match its shape.
- `useScrollReveal` is exported from `Hero.tsx` and consumed by
  `src/components/shared/ClientReveal.tsx`, which 12 pages mount. Its signature
  must not change.
- The project uses 4-space indentation in `src/components/home/`.

## Steps

1. Open `src/components/home/Hero.tsx`.
2. Replace the body of `useScrollReveal` (lines 10–17) with the **Target** block
   verbatim, keeping the exported function name and its empty parameter list.
3. Confirm `useEffect` now closes with `}, []);` and not `});`.
4. Change nothing else in `Hero.tsx`.

## Boundaries

- Do NOT change the `.v2-reveal` / `.v2-in` class names, the `0.1` threshold, or
  any CSS.
- Do NOT move `useScrollReveal` to another file, and do NOT change its export —
  `ClientReveal.tsx` imports it from `@/components/home/Hero`.
- Do NOT touch `src/components/shared/ScrollRevealInit.tsx`; unifying the two
  reveal systems is a separate, deliberately deferred finding.
- Do NOT attempt to deduplicate the seven `useScrollReveal()` call sites or make
  the observer a module-level singleton. That is a deliberately separate change;
  removing call sites here risks leaving sections permanently invisible.
- Do NOT add a `rootMargin` or otherwise retune when elements trigger — this is
  a lifecycle fix, not a timing change.
- Do NOT add new dependencies.
- If `Hero.tsx:9–18` does not match the excerpt in **Problem** (drift since
  commit `317d1c1`), STOP and report.

## Verification

- **Mechanical**:
  - `npx tsc --noEmit` — 18 pre-existing errors expected; no new ones.
  - `npm run build` — must compile clean.
  - `grep -n "}, \[\]);" src/components/home/Hero.tsx` must match inside
    `useScrollReveal`.
- **Feel check**: run `npm run dev`.
  - Load `/` and scroll the full page. Every `.v2-reveal` section must still fade
    up exactly once, at the same point as before. Nothing may stay invisible —
    an element stuck at `opacity: 0` means the observer never ran.
  - Scroll back up and down repeatedly past a revealed section. It must **not**
    re-animate.
  - In DevTools → Performance, record 10s sitting still on `/`. Compare against
    a recording taken before the change: the periodic 3s spikes caused by
    `FlipWords` re-rendering `Hero` must no longer carry observer setup work.
  - Check three other pages that mount `<ClientReveal />` (for example
    `/services`, `/about`, `/case-studies`) and confirm reveals still fire on
    each — the `:not(.v2-in)` guard must not suppress a first reveal after
    client-side navigation.
- **Done when**: reveals fire once per element per page load, no element remains
  hidden, and the observer is constructed exactly once per mount.
