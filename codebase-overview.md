# Codebase Overview — paulgray.co Marketing Site

> **Last reviewed:** June 2026
>
> This document covers the technical architecture, integrations, infrastructure, and decisions behind the paulgray.co marketing website. It is separate from the swim coaching site (Vortex Flow Performance / paulgray.coach).

---

## Site Purpose

paulgray.co is Paul's personal/professional presence for the **marketing and digital strategy business**. It covers:

- Who Paul is and what he does (home page)
- Services: Strategic Marketing, Video Production, Technical Optimization
- Portfolio: Jackie M Shopify store, Jackie M website, Street Food Journeys video series, and others
- Resume (formal and casual versions)
- Email list signup
- Community link ("the vibe.")

This site is **not** the swim coaching site. Keep these two presences completely separate in branding, design, and content.

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| HTML | Vanilla HTML5 | No templating engine |
| CSS | Vanilla CSS with custom properties | Neumorphic design system |
| JavaScript | Vanilla ES6 classes | No framework |
| Hosting | Netlify (free tier) | Via GitHub repo |
| Images | Cloudinary | CDN-hosted, webp format |
| Email marketing | Kit (formerly ConvertKit) | Form ID: 7506268, UID: a0f30b2ab6 |
| Analytics | PostHog | Key is currently a placeholder — not active |
| DNS/Domain | paulgray.co | Check registrar for current setup |

---

## File Structure

```
paulgray.co/
├── index.html              # Home page
├── main.css                # Shared stylesheet (all pages link to this)
├── main.js                 # Shared JavaScript (ThemeManager, Analytics, etc.)
├── build.sh                # Netlify build script (copies to dist/)
├── _redirects              # Netlify URL rewriting rules
├── favicon.ico
├── apple-touch-icon.png
├── favicon-32x32.png
├── favicon-16x16.png
├── site.webmanifest
└── pages/
    ├── portfolio.html
    ├── work-with-me.html
    ├── resume.html
    └── resume-casual.html   # Informal version — currently unlinked
```

!!! note "Per-page styles"
    Each page in `pages/` has page-specific CSS embedded in a `<style>` block inside its `<head>`. This is architectural debt — ideally these would be in `main.css` or separate linked files.

---

## URL Routing

Managed via Netlify `_redirects` file:

```
/work-with-me  →  /pages/work-with-me.html  (200 rewrite)
/portfolio     →  /pages/portfolio.html       (200 rewrite)
/* → /index.html (404 fallback)
```

**Clean URLs that work:**
- `paulgray.co/work-with-me`
- `paulgray.co/portfolio`

**Pages without clean URLs:**
- `/pages/resume.html` — no clean redirect defined
- `/pages/resume-casual.html` — no clean redirect defined

**To add:** If adding more pages, always add a `_redirects` entry.

---

## Build Process

`build.sh` is a minimal script for Netlify:

```bash
mkdir -p dist
cp -r * dist/
rm -rf dist/dist
rm -f dist/build.sh
```

The site has **no build tool, bundler, or transpiler**. Everything is deployed as-is. This is intentional — it keeps the stack simple and the build fast.

**Netlify build settings:**
- Build command: `bash build.sh` (or can be left blank for direct deploy)
- Publish directory: `dist/` (if using build.sh) or `.` (if deploying root directly)

---

## JavaScript Architecture

`main.js` is structured as ES6 classes, each instantiated on `DOMContentLoaded`:

| Class | Responsibility |
|---|---|
| `ThemeManager` | Dark/light mode toggle, localStorage persistence, OS preference detection |
| `SmoothScroller` | Smooth scroll for `#` anchor links with 80px header offset |
| `PerformanceOptimizer` | IntersectionObserver lazy load, link prefetch on hover, slow connection detection |
| `Analytics` | PostHog event tracking (page view, scroll depth, form interactions) |
| `AccessibilityEnhancer` | Skip link, live region, aria labels for ConvertKit inputs |
| `ErrorHandler` | Global error catching, ConvertKit fallback form (triggers after 5s if CK hasn't loaded) |

Global export: `window.PaulGrayWebsite` exposes all classes.
Legacy function: `toggleTheme()` is defined globally for backward compatibility with inline `onclick` handlers.

### Theme toggle detail
```javascript
// OS preference is checked on load
// Manual toggle stores in localStorage
// localStorage value overrides OS preference
localStorage.setItem('theme', 'dark' | 'light')
```

---

## Third-Party Integrations

### Cloudinary
- **Account:** `dr6ncein2`
- **Purpose:** Image hosting and CDN delivery
- **Format:** All images converted to `.webp` for size
- **Base URL:** `https://res.cloudinary.com/dr6ncein2/image/upload/`
- All images reference Cloudinary URLs directly in `src` attributes — no local image files

**Adding a new image:**
1. Upload to Cloudinary dashboard
2. Copy the version string + filename (e.g. `v1759485101/new_image_abc123.webp`)
3. Use as `https://res.cloudinary.com/dr6ncein2/image/upload/v.../filename.webp`
4. Optionally add transformation params: `w_800,f_auto,q_auto/` before the version string

### Kit (ConvertKit)
- **Form ID:** `7506268`
- **Form UID:** `a0f30b2ab6`
- **Action URL:** `https://app.convertkit.com/forms/7506268/subscriptions`
- **Fields:** `fields[first_name]`, `email_address`
- **Embedded form element:** `data-sv-form="7506268" data-uid="a0f30b2ab6"`

!!! warning "ConvertKit script not loading"
    The ConvertKit embed script was removed from `index.html` (comment: "ConvertKit Script removed - using direct email contact"). The form markup remains but will not submit without the script. The `ErrorHandler` class has a fallback that creates a direct `action=""` form after 5 seconds — but this only works if Kit's endpoint accepts unauthenticated POST requests.

    **Action needed:** Either re-add the Kit embed script, replace with a Netlify Form, or wire up the existing form to `https://app.convertkit.com/forms/7506268/subscriptions` with `method="POST"` directly.

### PostHog Analytics
- **Key:** `YOUR_POSTHOG_KEY` (placeholder — analytics are not active)
- **Host:** `https://app.posthog.com`
- **Events tracked in code:** `theme_changed`, `page_view`, `navigation_click`, `newsletter_signup_attempt`, `form_field_focus`, `page_engagement` (scroll depth + time on page), `javascript_error`, `convertkit_fallback_used`

!!! warning "PostHog not configured"
    The PostHog key is a placeholder. No analytics data is currently being collected. Replace `YOUR_POSTHOG_KEY` with the actual project API key from the PostHog dashboard.

---

## Key Content & Projects

### Portfolio items

**Jackie M Shopify Store** (`shop.jackiem.com.au`)
- Complete Shopify theme design and build
- $20,000+ revenue in year one
- 35% returning customer rate
- Mobile-first (60%+ mobile traffic)
- Skills: Shopify Development, E-commerce Strategy, UX Design, CRO, SEO, Payment Integration

**Jackie M Business Website** (`jackiem.com.au`)
- Custom website for Sydney Malaysian food personality
- Recipes, cooking classes, culinary expertise
- Skills: Web Design, Front-end Development, Responsive Design, SEO

**Street Food Journeys: Sydney Food Documentary Series**
- YouTube food documentary series
- Content about Sydney's diverse food scene

### Services offered (via this site)
1. **Strategic Marketing** — brand positioning, content strategy, customer journey, community building
2. **Video Production** — brand storytelling, product demo, educational series, social optimisation
3. **Technical Optimization** — web performance, SEO, CRO, analytics setup

### Community project
- **"the vibe."** — independent community, away from Big Tech algorithms
- Link: `link.paulgray.co/vibe`
- Positioned as: *"space free of algorithms, free of Big Tech control"*

---

## Contact Details (as of last review)

| Type | Value |
|---|---|
| Primary email | paul@paulgray.co |
| Resume email | paulgspeaks@gmail.com |
| Phone | 0493 427 092 |
| Domain | paulgray.co |
| Location | Sydney, NSW |

---

## Open Items / To-Do

| Item | Priority | Notes |
|---|---|---|
| Fix PostHog key | High | Replace `YOUR_POSTHOG_KEY` with real key |
| Fix email signup | High | Re-add Kit script or switch to Netlify Forms |
| Add clean URL for /resume | Medium | Add to `_redirects` |
| Add real testimonials | Medium | Section exists in work-with-me.html but hidden |
| Audit WCAG contrast | Medium | Neumorphic surfaces can fail contrast checks |
| Extract per-page styles to main.css | Low | Maintenance improvement |
| Clarify `resume-casual.html` purpose | Low | Currently unlinked — is it needed? |
| Replace `onclick` inline handlers | Low | Move to addEventListener in main.js |

---

## Relationship to Other Sites

| Site | Domain | Purpose | Stack | Hosting |
|---|---|---|---|---|
| Marketing/personal | paulgray.co | Digital strategy business | HTML/CSS/JS | Netlify |
| Swim coaching | paulgray.coach (TBC) | Swim teaching business | HTML/CSS/JS | Netlify |
| Private knowledge base | Cloudflare Pages (private) | PASS / Obsidian | MkDocs + Material | Cloudflare Pages + Access |

These sites share a domain owner but have **completely separate design systems, audiences, and purposes**. Never merge or cross-link them unless strategically intentional.

