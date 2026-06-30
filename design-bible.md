# Design Bible — paulgray.co Marketing Site

> **Scope:** This document captures the complete visual language, component system, and design decisions for the personal/marketing website at paulgray.co. It is the source of truth for any future redesign or new page on that site.
>
> This is a separate site and separate design system from the swim coaching site (Vortex Flow Performance). Do not cross-contaminate these systems.

---

## Brand Identity

### Name & Logo Treatment
- **Display name:** Paul Gray
- **Logo mark:** `paul://` — written in JetBrains Mono (monospace). The protocol syntax (`://`) is intentional; it signals a tech/developer identity and sets a slightly irreverent, internet-native tone.
- **Domain:** paulgray.co
- **Tagline:** *Digital Strategist for Creative Online Businesses*

### Voice & Tone
- Conversational but credible
- Anti-algorithm, anti-corporate — leans toward authentic connection over metrics
- Specific quote from site: *"I believe in building genuine relationships over chasing metrics."*
- Avoids buzzword overload; prefers plain language

---

## Color System

### Light Mode
| Token | Value | Usage |
|---|---|---|
| `--accent` | `#c55043` | Primary CTA, links, logo, hover states |
| `--alternate` | `#6943A4` | Secondary accent, subtitles, dividers |
| `--font-color` | `#2A2B2A` | All body text |
| `--background` | `linear-gradient(135deg, #FAF0EF 0%, #F4F2F9 100%)` | Page background (fixed attachment) |
| `--background-solid` | `#F4F2F9` | Card and button surfaces |
| `--white` | `#ffffff` | Input backgrounds, surface overrides |
| `--shadow-light` | `rgba(255, 255, 255, 0.8)` | Neumorphic highlight shadow |
| `--shadow-dark` | `rgba(106, 67, 164, 0.15)` | Neumorphic depth shadow (purple-tinted) |

### Dark Mode
| Token | Value | Usage |
|---|---|---|
| `--accent` | `#e74c3c` | Primary CTA (warmer red in dark) |
| `--alternate` | `#9b59b6` | Secondary accent |
| `--font-color` | `#e8e8e8` | Body text |
| `--background` | `linear-gradient(135deg, #1a1a1a 0%, #2d1b69 100%)` | Page background |
| `--background-solid` | `#2d1b69` | Card surfaces |
| `--white` | `#2c2c2c` | Input surfaces in dark |
| `--shadow-light` | `rgba(255, 255, 255, 0.05)` | Subtle highlight |
| `--shadow-dark` | `rgba(0, 0, 0, 0.4)` | Depth shadow |

### Dark Mode Implementation
Dark mode is toggled via a `[data-theme="dark"]` attribute on `<html>`. Users can manually toggle; OS preference is respected as the default. Preference is stored in `localStorage` under the key `theme`.

```css
/* Light mode = default (:root) */
/* Dark mode = [data-theme="dark"] selector */
```

---

## Typography

### Font Stack
| Role | Family | Weights | Notes |
|---|---|---|---|
| Body / UI | `JetBrains Mono` | 400, 700 | Monospace — the deliberate inversion (mono for body, sans for headings) is the typographic signature of this site |
| Headings | `Inter` | 400, 600, 700 | Clean, modern sans |

!!! note "Typography reversal"
    Using a monospace font for body copy and sans-serif for headings is an unconventional choice that reinforces the `paul://` developer identity. This is intentional and distinctive. Do not reverse it in future iterations without reconsidering the entire brand position.

### Font Loading
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### Scale (approximate)
- `h1`: `clamp(2rem, 5vw, 3.5rem)` — Inter 700
- `h2`: typically `2rem–2.5rem` — Inter 700
- `h3`: `1.3rem–1.5rem` — Inter 700
- Body: `1rem` — JetBrains Mono 400, line-height `1.6`
- Logo mark: `1.2rem` — JetBrains Mono 700

---

## Design Pattern: Neumorphism

The site uses a **neumorphic** design system throughout. This is the defining aesthetic choice — soft, extruded surfaces that appear to push out from or press into the background.

### How it works
Neumorphism creates depth through dual box-shadows: one light (highlight) and one dark (shadow), both in the same hue as the background. The result is a soft, tactile appearance.

### Core Component: `.neuro-card`
```css
.neuro-card {
    background: var(--background-solid);
    border-radius: 20px;
    box-shadow: 
        8px 8px 16px var(--shadow-dark),
        -8px -8px 16px var(--shadow-light);
    padding: 2rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Hover: deeper shadow, slight lift */
.neuro-card:hover {
    box-shadow: 
        12px 12px 24px var(--shadow-dark),
        -12px -12px 24px var(--shadow-light);
    transform: translateY(-2px);
}
```

### Core Component: `.neuro-button`
```css
.neuro-button {
    background: var(--accent);
    color: var(--white);
    border-radius: 12px;
    padding: 0.8rem 2rem;
    box-shadow: 
        4px 4px 8px rgba(197, 80, 67, 0.3),
        -2px -2px 8px rgba(255, 255, 255, 0.8);
    /* Shimmer effect on hover via ::before pseudo-element */
}
```

### Inset variant (pressed/active)
Used on the theme toggle button when active:
```css
box-shadow: 
    inset 2px 2px 4px var(--shadow-dark),
    inset -2px -2px 4px var(--shadow-light);
```

!!! warning "Neumorphism contrast caution"
    Neumorphic designs can fail WCAG contrast requirements. If interactive elements or text are placed on neumorphic surfaces, verify contrast ratios. The current site does not have a formal accessibility audit on all contrast pairings.

---

## Navigation

### Structure
```
paul://                    [logo — links to index.html]
Work | Work With Me | Portfolio | Resume    [right-aligned links]
[🌙 theme toggle]          [circular neuro-button]
```

### Behaviour
- Sticky (`position: sticky; top: 0`) with `backdrop-filter: blur(10px)`
- Background: `rgba(244, 242, 249, 0.8)` light / `rgba(45, 27, 105, 0.8)` dark
- Active page: marked with `aria-current="page"`, styled `color: var(--accent); font-weight: 600`
- Nav links have animated underline on hover (`::after` pseudo-element, width `0 → 100%`)

### Theme Toggle
- Round button (`width: 40px; height: 40px; border-radius: 50%`)
- Icon: 🌙 (light mode) → ☀️ (dark mode)
- Stores preference in `localStorage`

---

## Page Layouts

### Home (index.html)
```
[NAV]
[HERO] — profile image + h1 + subtitle + description
[WORK GRID] — 2-column auto-fit cards
[EMAIL SIGNUP] — max-width 500px neuro-card
[FOOTER]
```

### Portfolio (pages/portfolio.html)
```
[NAV]
[PAGE HERO] — full-width text hero, no profile image
[E-COMMERCE SECTION] — featured + compact project cards
[VIDEO SECTION] — featured + compact project cards
[MARKETING SECTION]
[CTA SECTION]
[FOOTER]
```

**Project card variants:**
- **Featured** (`.project-card.featured`): large, expandable case study with image, challenge/solution/results, skill tags, CTAs
- **Compact** (`.project-card.compact`): smaller, single-column layout with thumbnail and brief description

**Note:** The `expand-toggle` button and `.case-study-details` in featured cards are currently `display: none` — the full case study content is always visible. The toggle was removed but the markup was preserved.

### Work With Me (pages/work-with-me.html)
```
[NAV]
[PAGE HERO] — image + h1 + subtitle + description
[SERVICES GRID] — 3 columns: Strategic Marketing, Video Production, Technical Optimization
[PROCESS GRID] — 4 steps: Discovery, Solution Design, Implementation, Growth
[TESTIMONIALS] — currently display: none (placeholder content)
[CTA SECTION]
[FOOTER]
```

### Resume (pages/resume.html)
Standard resume layout with neuro-card sections for each resume category.

---

## CSS Architecture

### Single shared stylesheet
`main.css` handles all global styles. Per-page styles are embedded in `<style>` tags within each page's `<head>`.

!!! note "Architecture debt"
    This is the main architectural issue with the current codebase. Having per-page `<style>` blocks makes global changes harder and creates specificity conflicts. Future work: extract all page-specific styles into `main.css` or page-specific linked CSS files.

### URL structure
```
/              → index.html
/pages/        → portfolio.html, work-with-me.html, resume.html, resume-casual.html
```

Clean URLs are handled via Netlify `_redirects`:
```
/work-with-me  →  /pages/work-with-me.html  200
/portfolio     →  /pages/portfolio.html       200
```

### Custom Properties Scope
All tokens defined in `:root`. Dark mode tokens override via `[data-theme="dark"]` attribute selector on `<html>`.

---

## Animation & Motion

### Global animations
```css
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0);    }
}

/* Applied to: .hero, .work-box, .signup-card */
/* Stagger: .work-box:nth-child(2) { animation-delay: 0.2s; } */
```

### Interaction micro-animations
- Cards: `transform: translateY(-2px)` on hover
- Buttons: `transform: translateY(-1px)` on hover, `translateY(1px)` on active
- Profile image: `transform: scale(1.05)` on hover
- Nav links: underline width `0 → 100%` on hover

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

---

## Image Handling

All images hosted on **Cloudinary** (account: `dr6ncein2`).

| Image | Cloudinary URL |
|---|---|
| Profile photo | `v1755639415/Paul_-_Profile_Pic_iuzzfz.webp` |
| Work With Me image | `v1756936432/paul_-_work_with_me_image_sjhia6.webp` |
| the vibe. logo | `v1756936254/the_vibe_-_CRT_Logo_gf6wmz.webp` |
| Jackie M Shop | `v1759485101/jackie_m_shop_qmm0at.png` |
| Jackie M Website | `v1759485100/Jackie_M_Homepage_oa8qws.jpg` |

Base URL: `https://res.cloudinary.com/dr6ncein2/image/upload/`

Cloudinary transformations can be appended in the URL path, e.g. `w_800,f_auto,q_auto/` for auto-optimized responsive images.

---

## Component Reference

### Skill Tags
```css
.skill-tag {
    background: var(--accent);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
}
```

### Metric highlights (portfolio)
```css
.metric {
    color: var(--accent);
    font-size: 1.5rem;
    font-weight: 700;
}
```

### Step numbers (process section)
```css
.step-number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent);
    font-family: var(--font-heading); /* Inter, not mono */
}
```

---

## Known Issues & Technical Debt

| Issue | Location | Priority |
|---|---|---|
| PostHog key is placeholder `YOUR_POSTHOG_KEY` | All HTML files | High — analytics not actually tracking |
| Per-page `<style>` blocks embedded in HTML | All pages | Medium — maintenance headache |
| Testimonials section hidden (`display: none`) | work-with-me.html | Low — placeholder content, restore when real testimonials available |
| `onclick="toggleTheme()"` inline handler | All pages | Low — legacy pattern, should use addEventListener |
| `will-change` applied too broadly | main.css | Low — minor perf cost |
| ConvertKit form has no active script | index.html | High — email signup not functional |
| `resume-casual.html` exists but not linked in nav | pages/ | Low — purpose unclear |

