# Convergent Business Technologies — Design Guidelines

> This document is the single source of truth for all visual and UX decisions when building the CBT website. Reference it in every Claude Code session.

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

```css
:root {
  --transition-fast:   0.15s ease;
  --transition-base:   0.2s ease;
  --transition-slow:   0.35s ease;
  --transition-spring: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

- **Page load**: Staggered fade-up on hero elements (`opacity 0 → 1`, `translateY 20px → 0`)
- **Scroll reveals**: Subtle fade-in on section entry (use `IntersectionObserver`)
- **Hover states**: All interactive elements must have visible hover transitions
- **No autoplay video or aggressive animations** — respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

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

*Last updated: 2026 — Convergent Business Technologies*
