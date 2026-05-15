# Temenu Oluwanifemi — Developer Portfolio

A high-performance, interactive developer portfolio built with SvelteKit and Tailwind CSS.

**Live →** https://your-portfolio.vercel.app  
**Repo →** https://github.com/your-username/portfolio

---

## Tech Stack

- **SvelteKit** (Svelte 5 with runes) + TypeScript
- **Tailwind CSS v4** with `@tailwindcss/vite`
- **Lucide Svelte** for icons
- **@fontsource-variable** for self-hosted variable fonts (Inter + JetBrains Mono)
- **Formspree** for contact form submissions
- **Vercel** for deployment via `@sveltejs/adapter-auto`

---

## Setup

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install
npm run dev
```

Open `http://localhost:5173`.

**Contact form:** Sign up free at [formspree.io](https://formspree.io), create a form, and replace `YOUR_FORM_ID` in `src/lib/components/sections/Contact.svelte`.

**Resume:** Drop your PDF as `static/resume.pdf`.

**Project images:** Add screenshots to `static/projects/hawkeye.png` etc.

---

## Architecture

A **single-page SvelteKit application** with scroll-based section navigation. No client-side routing — all sections live on one page and the nav smooth-scrolls between them.

```
src/
├── lib/
│   ├── components/
│   │   ├── sections/        # Page sections: Hero, Projects, About, Contact
│   │   ├── Nav.svelte       # Sticky navigation with mobile drawer
│   │   ├── CommandPalette.svelte  # ⌘K command palette
│   │   └── ScrollToTop.svelte
│   ├── data/                # Content: profile.ts, projects.ts, skills.ts
│   ├── stores/              # Svelte stores: commandPalette open state
│   └── utils/               # Custom Svelte actions: reveal.ts
└── routes/
    ├── +layout.svelte       # Root layout: fonts, SEO, global keyboard shortcut
    └── +page.svelte         # Home page: composes all sections
```

---

## Animation Decisions

**Scroll reveals** use the `IntersectionObserver` API via a custom Svelte action (`use:reveal`). Elements start invisible and slide up when they enter the viewport. IntersectionObserver fires off the main thread — far cheaper than a `scroll` event listener that fires hundreds of times per second.

**Hero entrance** uses Svelte's built-in `fly` transition with staggered delays (0ms, 100ms, 200ms…). Each element starts with `y: 40, opacity: 0` and animates to its natural position, creating a cascading reveal on first load.

**Command palette** uses Svelte's `fade` and `fly` transitions: backdrop fades in, panel flies down. Exit reverses both.

**Card interactions** use CSS `transform` only (`translateY`, `scale`) — GPU-accelerated via the compositor thread, never triggering layout recalculation.

**Staggered project cards** use the `delay` parameter on the reveal action: each card gets `delay: i * 80ms` so they cascade in from left to right.

---

## Performance Optimizations

- **IntersectionObserver** instead of scroll listeners for viewport detection
- **`loading="lazy"` + `decoding="async"`** on all project images — browser defers off-screen image loading
- **Variable fonts** — a single font file covers every weight; no multiple HTTP requests per weight
- **Individual icon imports** — only the icons used are bundled (tree-shakable)
- **SvelteKit code splitting** — automatic per-route in production
- **`adapter-auto`** — detects Vercel at build time and outputs an edge-optimised bundle
- **CSS-only animations** — no animation library; GPU-composited `transform` and `opacity` only

---

## Accessibility

- **Skip navigation link** — visually hidden, visible on focus, jumps keyboard users past the nav
- **Visible focus indicators** — custom cyan `focus-visible` ring on all interactive elements; hidden for mouse users via `:focus:not(:focus-visible)`
- **`aria-label`** on every icon-only button (GitHub link, LinkedIn link, email, hamburger, scroll-to-top)
- **Semantic HTML** — `<header>`, `<main id="main-content">`, `<nav>`, `<section>`, `<article>`, `<footer>` throughout
- **`prefers-reduced-motion`** — the reveal action checks `window.matchMedia('(prefers-reduced-motion: reduce)')` on mount and skips all transitions if the user has opted out
- **Form labels** — every input and textarea has an associated `<label>` with matching `for`/`id`

---

## Trade-offs

**Single page vs multi-route.** Chose single page for portfolio simplicity and seamless scroll feel. Multi-route would allow distinct `<title>` per section and proper browser history, but adds routing complexity with no meaningful UX gain for a portfolio.

**Formspree vs SvelteKit server actions.** Formspree avoids any backend setup on a static deployment. A proper implementation would use a SvelteKit `+page.server.ts` action with Resend or Nodemailer — better for rate limiting, spam protection, and avoiding exposing the endpoint in client JS.

**CSS animations vs GSAP.** Kept the project library-free using Svelte's transitions and CSS. GSAP would enable richer timeline-based sequences but adds ~30KB. For a portfolio's animation needs, native CSS + IntersectionObserver is sufficient.

**No CMS.** Content lives in TypeScript data files (`projects.ts`, `skills.ts`, `profile.ts`). A headless CMS (Sanity, Contentful) would let non-developers edit content without touching code, but is significant overkill for a personal portfolio.