---
name: Nocturne Cinema
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#af8782'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#e50914'
  on-primary-container: '#fff7f6'
  inverse-primary: '#c0000c'
  secondary: '#fff9ef'
  on-secondary: '#3a3000'
  secondary-container: '#ffdb3c'
  on-secondary-container: '#725f00'
  tertiary: '#c6c4df'
  on-tertiary: '#2f2e43'
  tertiary-container: '#717088'
  on-tertiary-container: '#fbf7ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930007'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#e2e0fc'
  tertiary-fixed-dim: '#c6c4df'
  on-tertiary-fixed: '#1a1a2e'
  on-tertiary-fixed-variant: '#45455b'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 80px
---

## Brand & Style
The design system is engineered for a high-end, immersive cinematic experience. The brand personality is prestigious, mysterious, and focused, aiming to replicate the sensation of a darkened theater where the content is the protagonist. The target audience includes film enthusiasts and luxury-seekers who value a seamless, premium booking journey.

The design style is **Dark Glassmorphism**. It utilizes deep, layered backgrounds with frosted-glass overlays to create a sense of physical depth. Subtle light leaks and glow effects mimic the projection of light in a theater, ensuring the interface feels alive and atmospheric rather than flat. High-contrast imagery is prioritized, with UI elements acting as elegant framing for vibrant movie posters and trailers.

## Colors
The palette is rooted in deep, light-absorbing tones to minimize eye strain and maximize the pop of media content.

- **Primary (Cinema Red):** Reserved for critical actions like "Book Now," "Pay," and live status indicators. It represents the iconic theater curtain.
- **Secondary (Vibrant Gold):** Used for loyalty programs, VIP seat selection, ratings, and "exclusive" labels.
- **Neutral / Backgrounds:** The foundation is `#121212` (Deep Charcoal) for the base layer, with `#1A1A2E` (Midnight Navy) used for elevated surfaces like cards and navigation bars to provide a subtle, cool-toned depth.
- **Accents:** High-opacity white is used for primary text, while muted greys are used for secondary information to maintain visual hierarchy.

## Typography
The typography system balances the "Big Screen" impact of **Montserrat** with the functional clarity of **Inter**. 

**Headlines** use Montserrat with heavy weights (Bold/ExtraBold) to evoke the feeling of movie titles and marquee signage. Display sizes should utilize slight negative letter-spacing to feel tight and professional. 

**Body Text** and **Labels** rely on Inter for its exceptional legibility in dark mode. For meta-data (like duration, genre, or rating), labels use uppercase styling with increased letter spacing to create a distinct, modern "data" aesthetic.

## Layout & Spacing
The layout follows a **Fluid Grid** model designed for high-impact visual browsing. 

- **Desktop:** A 12-column grid with generous 80px side margins to keep the focus central. Movie carousels should break the grid slightly, bleeding to the edge of the screen to suggest an endless library.
- **Mobile:** A 4-column grid with 16px margins.
- **Rhythm:** Spacing follows a 4px/8px baseline. Use `lg` (40px) or `xl` (64px) spacing between major sections (e.g., "Trending" vs "Coming Soon") to give content "room to breathe," mimicking the spaciousness of a premium lobby.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional heavy shadows.

1.  **Level 0 (Base):** Deep Charcoal (#121212).
2.  **Level 1 (Cards/Panels):** Midnight Navy (#1A1A2E) with a subtle 1px inner border (10% opacity white) to define edges without losing the dark aesthetic.
3.  **Level 2 (Modals/Overlays):** 60% opacity Navy with a 20px backdrop blur. This "glass" effect allows the movie posters behind to stay visible but unintrusive.
4.  **Lighting:** Interactive elements (like the selected seat or primary button) should feature a subtle "glow" (outer shadow with 15px blur) in the primary red or gold color to simulate a neon or screen-lit effect.

## Shapes
The shape language is **Rounded**, striking a balance between modern technology and organic comfort.

- **Standard Elements:** Buttons, inputs, and small cards use a 0.5rem (8px) radius.
- **Movie Posters:** Use `rounded-lg` (16px) to soften the large rectangular blocks of imagery.
- **Selection Indicators:** (e.g., Seat selection) should be perfectly circular to represent the physical form of theater seating.
- **Interactive Triggers:** Search bars and pill-tags use `rounded-xl` for a friendlier, modern feel.

## Components
- **Primary Buttons:** Solid Cinema Red (#E50914) with white bold text. On hover, add a subtle red outer glow.
- **Movie Cards:** Vertical aspect ratio (2:3). Features a gradient overlay at the bottom to ensure title legibility over posters.
- **Seat Grid:** 
    - *Available:* Outlined grey circles. 
    - *Selected:* Solid Red with a subtle glow. 
    - *VIP:* Outlined Gold. 
    - *Occupied:* Low-opacity muted grey.
- **Hero Carousel:** Full-bleed background imagery with a heavy bottom-to-top black gradient. Text is left-aligned with a large "Play Trailer" secondary button (Glass style).
- **Location Selector:** A top-bar pill component using the Glassmorphism style, featuring a subtle "Map Pin" icon in Gold.
- **Input Fields:** Dark background (#121212) with a 1px border that glows Cinema Red when focused.