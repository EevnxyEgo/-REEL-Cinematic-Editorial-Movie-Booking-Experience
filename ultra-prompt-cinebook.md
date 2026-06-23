# ULTRA-PROMPT — "REEL" : Cinematic Editorial Movie Booking Experience

> Paste seluruh isi blok ini ke Claude Code sebagai pesan pertama di sebuah folder kosong.

---

## 0. ROLE & MISSION

You are a **world-class senior frontend engineer + art director** building a portfolio-grade, award-worthy movie booking web app called **"REEL"**. Treat this like a Awwwards "Site of the Day" submission, not a class assignment. Quality bar: every screen should look intentional, editorial, and expensive. Prioritize taste, restraint, typographic craft, and buttery micro-interactions over feature-bloat.

Work autonomously and end-to-end: plan, scaffold, build, wire data, test, and self-review. Do not stop to ask trivial questions — make strong opinionated decisions and document them. Only pause if a true blocker appears (e.g. missing API key).

---

## 1. NON-NEGOTIABLE ART DIRECTION

**Concept:** *1970s cinematic editorial print magazine, rebuilt for the web.* Think vintage film festival programme + Criterion Collection booklet + high-fashion editorial spread. Modern execution, retro soul.

**Strict visual rules — follow exactly:**
- **Palette ONLY:** muted cream/bone background (`#F4EDE2`-ish), deep burgundy/oxblood red (`#6E1A23`-ish) as the single accent, dark charcoal (`#1F1B18`-ish) for text. Add one warm off-black and one faded sepia for depth. NOTHING else.
- **Typography:** bold high-contrast **serif display** for movie titles and headlines (e.g. *Playfair Display*, *Fraunces*, *DM Serif Display*, or *Libre Caslon*). Clean **grotesque/mono** for UI labels, times, metadata (e.g. *Space Grotesk*, *Archivo*, or a mono for showtimes). Huge type scale contrast — titles should be dramatic.
- **Layout:** asymmetric editorial grid. Generous negative space. Visible baseline/column structure. A signature **split-screen**: LEFT = large grainy film-poster preview; RIGHT = minimalist **text-only** showtime selection grid (times as typographic list, not buttons-in-boxes).
- **Texture:** subtle film grain overlay, paper grain on the cream, soft halftone/duotone treatment on posters (burgundy duotone). Hairline rules (1px) like a print magazine.
- **FORBIDDEN (do not generate):** neon purple/blue gradients, glassmorphism blur cards, 3D glowing tickets, generic dark SaaS dashboard look, emoji-as-icon, drop-shadow-heavy "tech" cards, rounded-2xl-everything. If a default looks like a bootstrap template, redesign it.

**Motion language ("High" interactivity):**
- Smooth page/section transitions (curtain-wipe or film-cut feel, not slide-fade clichés).
- Micro-interactions everywhere: magnetic hover on poster, kinetic type on title hover, animated hairline underlines, number tickers for price, staggered reveal of showtimes, custom cursor near the poster, seat-pick spring feedback.
- Respect `prefers-reduced-motion` — provide a calm fallback.
- 60fps. Use transform/opacity only. No janky layout-thrashing animations.

---

## 2. TECH STACK (use the best, modern, current)

- **Framework:** Next.js (App Router, TypeScript) OR Vite + React + TS — pick Next.js for SSR + TMDB fetching. Confirm the current stable version before scaffolding (check docs).
- **Styling:** **Tailwind CSS** (latest). Define the full palette + type scale + grain as design tokens in the Tailwind config / CSS variables. No inline magic numbers — tokens only.
- **Animation:** Framer Motion (or `motion`) for orchestration; CSS for grain/texture. Consider Lenis for smooth scroll.
- **Icons:** a single tasteful line-icon set (lucide), used sparingly.
- **State:** lightweight — React state/context or Zustand. No Redux.
- **Data:** **TMDB API** for real movies (now playing, posters, backdrops, runtime, genres, trailers via TMDB videos endpoint). Read key from `.env.local` as `TMDB_API_KEY`. If no key is present, fall back gracefully to a bundled local JSON of ~8 curated films so the app ALWAYS runs. Never hard-crash on missing key.
- **Quality:** ESLint + Prettier + strict TS. Accessible (WCAG AA): focus states, keyboard nav for seats & showtimes, aria labels, semantic landmarks.

---

## 3. FEATURE SCOPE (build all)

1. **Landing / Now Playing** — editorial hero with one featured film (huge serif title, duotone backdrop, grain), then an asymmetric grid/list of now-playing films from TMDB.
2. **Movie Detail** — split-screen: left grainy poster (duotone burgundy) with subtle parallax; right column = title, year, runtime, genres as a typographic metadata block, synopsis set like a magazine pull-quote, **trailer** (embed in a tasteful modal/lightbox, paper-framed).
3. **Showtime + Date selection** — minimalist text-only grid: horizontal date strip (editorial, e.g. "THU 26 / FRI 27"), times as a kinetic typographic list with hairline separators. Selecting animates an underline + moves focus.
4. **Seat selection** — print-blueprint aesthetic seat map (think architectural floor-plan, not video-game). Screen arc at top. Hairline seats; selected = burgundy fill with spring feedback; taken = sepia hatch. Keyboard navigable. Live count + animated price ticker.
5. **Checkout summary + E-TICKET with QR code** — generate a real scannable QR (encode booking JSON) rendered as a perforated editorial ticket stub. Printable. Subtle entrance animation.
6. **Dark / Light mode toggle** — but BOTH themes stay in the cream/burgundy/charcoal world: "Light" = cream paper; "Dark" = deep charcoal "midnight screening" with cream ink and burgundy accent. Persist choice. Animate the swap as a film-exposure transition.
7. **Reset / start-over** flow that gracefully returns home.

---

## 4. USE EVERYTHING AVAILABLE (skills, plugins, MCP, tools)

Actively leverage your full toolset — don't work blind:
- **Skills:** read and apply any relevant skill files before building (e.g. `frontend-design` for design tokens/constraints; web-artifact/React build skills if present). Read the SKILL.md first, then follow it.
- **Plugins:** if a design/engineering plugin is available (design-critique, accessibility-review, code-review, design-system, ui-copy/ux-copy), invoke it: critique your own screens, run an a11y pass, review your diff before finishing.
- **MCP / connectors:** if a browser/preview or screenshot MCP is connected, use it to render the running app, take screenshots, visually inspect, and iterate until it matches the art direction. If a registry/search for connectors exists and something would help (e.g. fetching fonts/assets), check it.
- **Web access:** verify current versions of Next.js / Tailwind / Framer Motion and the correct TMDB endpoints from official docs before coding. Don't rely on memory for version-specific syntax.
- **Self-review loop:** after building, act as a ruthless art director — screenshot, list what looks "templated/cheap", and fix it. Repeat at least twice.

If a tool/skill/plugin you expect isn't available, note it and proceed with the best manual equivalent.

---

## 5. PROJECT QUALITY & DELIVERABLES

- Clean, typed, componentized architecture. Sensible folders (`/components`, `/lib`, `/app`, `/data`, `/styles`). Reusable design primitives (Tag, Rule, Ticker, GrainOverlay, DuotoneImage).
- All copy is tasteful and on-brand (editorial, confident, sparse) — write real microcopy, no lorem ipsum in final UI.
- Performance: optimized images (next/image), lazy-loaded trailer, no layout shift.
- A polished **README.md**: project pitch, screenshots, design rationale, how to add a TMDB key, how to run, and a short "design system" section (palette, type, motion principles).
- A `.env.example` with `TMDB_API_KEY=`.
- Graceful empty/error/loading states, each designed (skeletons should look editorial — animated hairlines, not grey blobs).
- Commit in logical steps with clear messages.

---

## 6. EXECUTION PLAN (follow this order)

1. Restate your understanding + final design decisions (palette hexes, font choices, motion principles) in 6-8 bullets.
2. Read relevant SKILL files; confirm current stack versions via docs.
3. Scaffold project + Tailwind tokens + global grain/paper styles + theme system.
4. Build the design primitives + data layer (TMDB fetch + local fallback JSON).
5. Build screens in order: Now Playing → Detail+Trailer → Showtime/Date → Seats → Checkout/E-ticket(QR). Wire shared booking state.
6. Add motion layer + custom cursor + reduced-motion fallback.
7. Self-review with screenshots + a11y + code-review plugins; fix everything that looks cheap. Repeat ≥2×.
8. Write README + .env.example. Final summary of what was built and how to run.

**Begin now.** Start with step 1 (your design decisions), then proceed autonomously through the whole plan without waiting for further confirmation.