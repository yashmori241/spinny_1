# SPINNY WEBSITE — COMPLETE PAGE-BY-PAGE UPGRADE PROMPT v2
# Based on: spinny10.vercel.app vs www.spinny.com comparison
# Focus: Color parity, UI depth, animations matching HOME page quality

---

## WHAT'S ALREADY WORKING (DO NOT BREAK)
- Purple brand palette (keep ALL existing Tailwind colors from tailwind.config.ts)
- Navbar with glassmorphism on scroll
- Homepage hero section with video + text
- Homepage featured cars grid with 3D tilt cards
- Homepage How It Works steps
- Why Spinny features section
- Stats section with count-up
- Testimonials + Popular Brands
- CTA Banner
- Footer
- All routing: /browse, /sell, /emi, /about, /car/[slug], /compare, /dashboard, /login
- EMI calculator logic
- Compare & Shortlist functionality
- Filter system on browse page

---

## GLOBAL FIXES (APPLY TO ALL PAGES FIRST)

### Color System Gaps
```
The homepage uses the purple brand correctly. Every other page is either:
(a) using plain white/gray backgrounds where brand-purple-wash should be
(b) missing gold (#C5A059) accent touches on key elements
(c) missing purple tints on icon containers, badges, stat blocks

FIX — enforce these CSS variables everywhere:
  --color-brand-purple: #5B2D86
  --color-brand-purple-dark: #3D1A6E
  --color-brand-purple-light: #7B4FAB
  --color-brand-purple-wash: #F0ECF7       ← use as alt section bg
  --color-brand-purple-tint: #E8DFF4       ← icon containers, highlights
  --color-gold: #C5A059                    ← prices, accents, dividers
  --color-gold-light: #E8C97A             ← hover gold states
  --color-surface: #FFFFFF
  --color-surface-2: #FAFAFA
  --color-text-primary: #1C1C1C
  --color-text-secondary: #6B6B6B
  --color-text-muted: #9B9B9B
  --color-border: #E8E8E8
  --color-border-purple: rgba(91,45,134,0.15)
```

### Animation System (apply to ALL pages, not just HOME)
Every page should use the SAME entrance animation as homepage:
```js
// STANDARD SECTION ENTRANCE — use on every page, every section
initial: { opacity: 0, y: 40 }
whileInView: { opacity: 1, y: 0 }
transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
viewport: { once: true, amount: 0.2 }

// STAGGER CHILDREN — for grids, lists, cards
staggerChildren: 0.06  // cards
staggerChildren: 0.08  // list items
staggerChildren: 0.1   // step cards (slower for effect)

// CARD HOVER LIFT — apply everywhere cards appear
whileHover: { y: -6, transition: { duration: 0.3, ease: 'easeOut' } }

// BUTTON HOVER — all primary buttons
whileHover: { scale: 1.03 }
whileTap: { scale: 0.97 }
```

### Scroll Progress Bar (GLOBAL — currently missing on sub-pages)
The 2px purple gradient progress bar at the top should appear on EVERY page,
not just homepage. Currently only rendered in homepage layout.
Move it to the root layout so it persists across all routes.

### Lenis Smooth Scroll
Currently only wrapping homepage. Wrap at root _app / layout level so ALL
pages benefit from lerp: 0.08 smooth scroll.

### Page Transition
Add a route-change fade transition between pages:
```js
// Wrap page content in AnimatePresence + motion.div
initial: { opacity: 0, y: 12 }
animate: { opacity: 1, y: 0 }
exit:    { opacity: 0, y: -8 }
transition: { duration: 0.35, ease: 'easeInOut' }
```

---

## PAGE 1: HOMEPAGE (/)

### What's Already Good
- Hero video background ✓
- 3D floating car canvas ✓
- Stagger text animation ✓
- Stats count-up ✓
- 3D tilt cards on featured cars ✓
- How It Works steps ✓

### Issues to Fix

#### A) HERO — Duplicate "HOW IT WORKS" Section
The homepage renders the "HOW IT WORKS" section TWICE back-to-back.
One is titled "A Simple Path to Your Dream Car." and the other "Four Simple Steps."
Remove the duplicate — keep only the first one with the 4-step animated cards.

#### B) STATS — Numbers Show "0" Until Scroll
Count-up animation is working but the numbers display as "0+" and "0" before
the animation triggers. Add a visibility guard so the stat block only renders
after IntersectionObserver fires.

Also: the stat "Point Inspection" label is missing the "200" prefix display.
Show "200" as the counted number (not 0 → 200, keep it simple: show 200 static
or count from 150 → 200 over 1.2s).

#### C) FEATURED CARS — Section Background
Section currently white. Should be brand-purple-wash (#F0ECF7) with ambient
radial glow:
```css
background: radial-gradient(ellipse at center, rgba(91,45,134,0.07) 0%, transparent 70%),
            #F0ECF7;
```

#### D) WHY SPINNY — Icon Colors
Icon containers are currently a flat gray. Change to:
```css
background: var(--color-brand-purple-tint);   /* #E8DFF4 */
color: var(--color-brand-purple);              /* icon color */
```
On hover: icon rotates 8deg with spring, background shimmer sweep
(linear-gradient shimmer left to right, 0.6s).

#### E) TESTIMONIALS — Avatar Initials Background
Avatar circles (RS, PM, AP) should use brand-purple gradient:
```css
background: linear-gradient(135deg, #7B4FAB, #3D1A6E);
color: white;
```
Currently they look like plain gray circles.

#### F) POPULAR BRANDS — Letter Circles
Brand letter circles (S, H, T, etc.) should match the gold/purple accent:
```css
/* Default */
background: var(--color-brand-purple-tint);
color: var(--color-brand-purple);

/* Hover state (whole card) */
background: var(--color-brand-purple);
color: white;
/* Letter circle on hover */
background: rgba(255,255,255,0.15);
color: white;
```

#### G) FOOTER GRADIENT FADE
Add an 80px gradient fade FROM the last section INTO the footer:
```css
/* Pseudo-element on footer */
&::before {
  content: '';
  position: absolute;
  top: -80px;
  left: 0; right: 0;
  height: 80px;
  background: linear-gradient(to bottom, transparent, #1C1C1C);
  pointer-events: none;
}
```

#### H) HERO BOTTOM TICKER — Gold Diamonds
Diamond separators (◆) should be gold (#C5A059), not purple or white.
Currently showing as white. Fix the color on the ◆ character spans.

---

## PAGE 2: BROWSE PAGE (/browse)

### Current State
Page shows "Loading..." and then renders cards. Major issues:
- No page header / hero strip
- Filter sidebar styling is flat/unstyled
- Card grid missing all the 3D tilt effects from homepage
- No entrance animations on cards
- No skeleton loading state
- No results count display
- "Load More" button is plain

### Required Changes

#### A) PAGE HEADER STRIP
Add a slim hero strip at the top (below navbar):
```
Background: linear-gradient(135deg, #3D1A6E 0%, #5B2D86 100%)
Height: clamp(140px, 18vw, 200px)
Content (centered left):
  - Eyebrow: "BROWSE COLLECTION" (tracking-[0.18em], text-xs, gold color)
  - H1: "Find Your Perfect Car." (white, font-size: clamp(28px, 4vw, 48px))
  - Subtext: "10,000+ certified pre-owned cars. Verified & delivered." (white/70%)
Padding: clamp(48px, 6vw, 80px) from top, clamp(20px, 5vw, 80px) horizontal
```

#### B) FILTER BAR / SIDEBAR
Filters currently look unstyled. Apply:
```css
/* Filter container */
background: white;
border: 1px solid var(--color-border-purple);
border-radius: 16px;
padding: clamp(20px, 2.5vw, 28px);
box-shadow: 0 2px 12px rgba(91,45,134,0.06);

/* Filter section headings */
font-size: 11px;
letter-spacing: 0.14em;
text-transform: uppercase;
color: var(--color-text-secondary);
margin-bottom: 12px;

/* Filter chips / buttons (active) */
background: var(--color-brand-purple);
color: white;
border-radius: 999px;
padding: 6px 14px;

/* Filter chips (inactive) */
background: var(--color-brand-purple-tint);
color: var(--color-brand-purple);
border: 1px solid var(--color-border-purple);
```

#### C) RESULTS COUNT + SORT BAR
Add above the card grid:
```
Left: "Showing 142 cars" (text-sm, text-secondary)
Right: Sort dropdown styled with purple border-focus

Background: transparent
Border-bottom: 1px solid var(--color-border)
Padding-bottom: clamp(16px, 2vw, 24px)
Margin-bottom: clamp(20px, 2.5vw, 32px)
```

#### D) CAR CARDS — FULL 3D TILT SYSTEM
Apply IDENTICAL card treatment as homepage featured cars:

```js
// 3D Tilt on mouse move
onMouseMove: (e) => {
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width   // 0 to 1
  const y = (e.clientY - rect.top) / rect.height    // 0 to 1
  const rotateX = (y - 0.5) * -16  // -8 to +8 deg
  const rotateY = (x - 0.5) * 16   // -8 to +8 deg
  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
  specularOverlay.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
}

onMouseLeave: () => {
  card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)'
  card.style.transition = 'transform 0.5s ease-out'
}
```

Card shadow states:
```css
/* Default */
box-shadow: 0 2px 12px rgba(91,45,134,0.08);
border-radius: 16px;
border: 1px solid var(--color-border);

/* Hover */
box-shadow: 0 16px 48px rgba(91,45,134,0.22);
border-color: var(--color-border-purple);
```

Card image container:
```css
aspect-ratio: 16/9;
overflow: hidden;
border-radius: 12px 12px 0 0;

/* Bottom image gradient overlay */
&::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(28,28,28,0.6) 0%, transparent 50%);
}

/* Image scale on card hover */
img { transition: transform 0.4s ease; }
card:hover img { transform: scale(1.07) translateY(-6px); }
```

Badges:
```css
/* Verified badge */
backdrop-filter: blur(8px);
background: rgba(91,45,134,0.75);
color: white;
border: 1px solid rgba(255,255,255,0.2);
padding: 4px 10px;
border-radius: 999px;
font-size: 11px;
letter-spacing: 0.06em;

/* Trending badge */
background: #C5A059;
color: #1C1C1C;
font-weight: 700;
padding: 4px 10px;
border-radius: 999px;
```

"Book Now" ghost button (slides up on card hover):
```css
/* Hidden state */
transform: translateY(20px);
opacity: 0;
transition: all 0.3s ease;

/* Card:hover state */
transform: translateY(0);
opacity: 1;

/* Style */
width: 100%;
margin-top: 16px;
border: 1.5px solid var(--color-brand-purple);
color: var(--color-brand-purple);
border-radius: 999px;
padding: 10px 0;
font-size: 13px;
letter-spacing: 0.06em;

/* Hover on button itself */
background: var(--color-brand-purple);
color: white;
```

Price styling (currently plain):
```css
/* Price number */
font-size: clamp(18px, 1.8vw, 22px);
font-weight: 700;
color: var(--color-brand-purple-dark);

/* "Price" label */
font-size: 11px;
text-transform: uppercase;
letter-spacing: 0.1em;
color: var(--color-text-secondary);

/* EMI line */
color: var(--color-gold);    ← make EMI gold, not muted gray
font-size: 12px;
```

#### E) CARD ENTRANCE ANIMATION
```js
// Stagger as grid enters viewport
<motion.div
  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
>
```

#### F) SKELETON LOADING STATE
Replace the "Loading..." text with a proper skeleton:
```
Show 6 card skeletons in the grid
Each skeleton:
  - Gray shimmer block (aspect-ratio: 16/9) for image
  - Gray shimmer lines for title, specs, price
  - Shimmer animation: background-position 0% → 100% over 1.4s infinite
  - Color: linear-gradient(90deg, #f0ecf7 25%, #e8dff4 50%, #f0ecf7 75%)
```

#### G) LOAD MORE BUTTON
```css
margin-top: clamp(48px, 6vw, 72px);
display: flex;
justify-content: center;

button {
  min-width: 200px;
  padding: 14px 32px;
  border-radius: 999px;
  background: var(--color-brand-purple);
  color: white;
  font-size: 14px;
  letter-spacing: 0.06em;
  border: none;
  box-shadow: 0 4px 20px rgba(91,45,134,0.25);
  transition: all 0.3s ease;
}

button:hover {
  background: var(--color-brand-purple-dark);
  box-shadow: 0 8px 32px rgba(91,45,134,0.35);
  transform: translateY(-2px);
}
```

#### H) ACTIVE FILTER TAGS ROW
Above results, show applied filters as removable tags:
```css
display: flex;
flex-wrap: wrap;
gap: 8px;
margin-bottom: 20px;

tag {
  background: var(--color-brand-purple);
  color: white;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  /* × close icon on right */
}

tag:hover {
  background: var(--color-brand-purple-dark);
}
```

---

## PAGE 3: CAR DETAIL PAGE (/car/[slug])

### Current State
Basic 2-column layout. Images work. Specs listed. EMI shown. Issues:
- No breadcrumb styling
- Image gallery has no 3D tilt
- Thumbnails are plain boxes
- Spec cards are flat list items, not styled cards
- No "Similar Cars" section below
- Right column CTAs are basic buttons
- No page entrance animations

### Required Changes

#### A) BREADCRUMB
```css
padding: clamp(16px, 2vw, 24px) 0;
font-size: 13px;
color: var(--color-text-muted);

/* Active crumb */
color: var(--color-text-primary);
font-weight: 500;

/* Separator */
color: var(--color-brand-purple-light);
margin: 0 8px;

/* Breadcrumb row entrance */
motion: fade in, y: 20 → 0, 0.4s
```

#### B) MAIN IMAGE — 3D TILT VIEWER
```js
// Same tilt system as browse cards but softer: ±6deg
onMouseMove: tilt perspective(1000px) rotateX/Y ±6deg

// Specular highlight overlay (pointer-events: none)
position: absolute, inset: 0
background: radial-gradient(circle at {x}% {y}%, rgba(255,255,255,0.1) 0%, transparent 55%)
mix-blend-mode: screen

// Image transition on thumbnail click
animate: { opacity: [0, 1], scale: [0.97, 1.0] }
transition: { duration: 0.35, ease: 'easeOut' }
```

Main image container:
```css
border-radius: 20px;
overflow: hidden;
border: 1px solid var(--color-border-purple);
box-shadow: 0 8px 40px rgba(91,45,134,0.12);
```

#### C) THUMBNAIL STRIP
```css
margin-top: clamp(12px, 1.5vw, 20px);
gap: clamp(8px, 1vw, 14px);
display: flex;

thumbnail {
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.25s ease;
  opacity: 0.65;
}

thumbnail:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

thumbnail.active {
  border-color: var(--color-brand-purple);
  box-shadow: 0 0 0 3px rgba(91,45,134,0.25);
  opacity: 1;
  transform: scale(1.05);
}
```

#### D) CAR TITLE BLOCK (Right Column)
```css
/* Make/Model eyebrow */
font-size: 12px;
text-transform: uppercase;
letter-spacing: 0.14em;
color: var(--color-brand-purple-light);
margin-bottom: 8px;

/* Car name */
font-size: clamp(22px, 3vw, 34px);
font-weight: 700;
color: var(--color-text-primary);
line-height: 1.15;
letter-spacing: -0.02em;

/* Year · Fuel · KM row */
display: flex;
gap: 16px;
margin-top: 12px;
font-size: 13px;
color: var(--color-text-secondary);

/* Each spec chip */
background: var(--color-brand-purple-tint);
padding: 4px 12px;
border-radius: 999px;
color: var(--color-brand-purple);
font-size: 12px;
```

#### E) PRICE BLOCK
```css
/* "Price" label */
font-size: 11px;
letter-spacing: 0.12em;
text-transform: uppercase;
color: var(--color-text-muted);
margin-bottom: 4px;

/* Price number */
font-size: clamp(28px, 4vw, 40px);
font-weight: 800;
background: linear-gradient(90deg, #3D1A6E, #5B2D86);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* EMI line */
font-size: 14px;
color: var(--color-gold);
margin-top: 6px;

/* Divider above price */
margin: 20px 0;
height: 1px;
background: linear-gradient(90deg, transparent, #E8E8E8 20%, #E8E8E8 80%, transparent);
```

#### F) SPEC CARDS GRID
Replace plain list with a proper grid of spec cards:
```css
/* Grid */
display: grid;
grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
gap: 16px;
margin-top: clamp(24px, 3vw, 36px);

/* Each spec card */
background: var(--color-brand-purple-wash);
border: 1px solid var(--color-border-purple);
border-radius: 14px;
padding: 16px 20px;
transition: all 0.25s ease;

/* Spec label */
font-size: 11px;
text-transform: uppercase;
letter-spacing: 0.1em;
color: var(--color-text-muted);
margin-bottom: 8px;

/* Spec value */
font-size: 16px;
font-weight: 600;
color: var(--color-text-primary);

/* Icon (small, brand-purple) */
font-size: 18px;
color: var(--color-brand-purple);
margin-bottom: 8px;

/* Hover */
background: var(--color-brand-purple-tint);
border-color: var(--color-brand-purple);
transform: translateY(-2px);
box-shadow: 0 4px 16px rgba(91,45,134,0.1);
```

#### G) CTA BUTTONS (Right Column)
```css
/* Primary: "Book Test Drive" */
width: 100%;
padding: 16px 0;
border-radius: 14px;
background: linear-gradient(135deg, #5B2D86, #3D1A6E);
color: white;
font-size: 15px;
font-weight: 600;
letter-spacing: 0.04em;
box-shadow: 0 6px 24px rgba(91,45,134,0.3);
transition: all 0.3s ease;

hover {
  box-shadow: 0 10px 36px rgba(91,45,134,0.4);
  transform: translateY(-2px);
}

/* Secondary: "Add to Shortlist" */
width: 100%;
padding: 14px 0;
border-radius: 14px;
border: 1.5px solid var(--color-brand-purple);
color: var(--color-brand-purple);
background: transparent;
font-size: 15px;
font-weight: 500;

hover {
  background: var(--color-brand-purple-wash);
}

/* "Compare" ghost button */
width: 100%;
padding: 12px 0;
border-radius: 14px;
border: 1px solid var(--color-border);
color: var(--color-text-secondary);
font-size: 14px;

hover {
  border-color: var(--color-brand-purple);
  color: var(--color-brand-purple);
}
```

#### H) SPINNY ASSURED BADGE BLOCK
Add a reassurance block below CTAs:
```
Background: var(--color-brand-purple-wash)
Border: 1px solid var(--color-border-purple)
Border-radius: 14px
Padding: 20px
Display: flex, gap: 12px

Icon: purple shield (✓)
Title: "Spinny Assured®" (brand-purple, font-weight: 700)
Lines: "200-Point Inspection · 5-Day Money Back · 3-Year Warranty"
(font-size: 12px, color: text-secondary, line-height: 1.8)
```

#### I) SIMILAR CARS SECTION (Add This — Currently Missing)
After the main detail layout, add a "Similar Cars" section:
```css
margin-top: clamp(64px, 8vw, 112px);
padding-top: clamp(48px, 6vw, 80px);
border-top: 1px solid var(--color-border);

/* Section heading */
Eyebrow: "YOU MAY ALSO LIKE"
H2: "Similar Cars"

/* Card grid — same 3D tilt cards as browse page */
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: clamp(20px, 2.5vw, 32px);

/* Show 3 cards (or 4 on wider screens) */
```
Animate section in with standard entrance animation.

#### J) PAGE ENTRANCE ANIMATIONS
```js
// Left column (images): slide in from left
initial: { opacity: 0, x: -40 }
animate: { opacity: 1, x: 0 }
transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }

// Right column (details): slide in from right
initial: { opacity: 0, x: 40 }
animate: { opacity: 1, x: 0 }
transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
```

---

## PAGE 4: SELL YOUR CAR (/sell)

### Current State
Likely a basic form page. Needs full redesign treatment.

### Required Changes

#### A) PAGE HERO STRIP
```
Background: linear-gradient(135deg, #1C1C1C 0%, #3D1A6E 100%)
  with subtle dot-grid texture overlay (radial-gradient dots, very faint)
Height: clamp(200px, 25vw, 300px)
Content:
  Eyebrow: "SELL YOUR CAR" (gold, tracking-[0.18em], text-xs)
  H1: "Get The Best Price For Your Car." (white)
  Subtext: "Instant quote. Free evaluation. Same-day payment." (white/70%)
  Selling points row: 3 chips (✓ Instant Quote  ✓ Free Pickup  ✓ Zero Hassle)
    chip style: border: 1px solid rgba(197,160,89,0.4); color: gold; border-radius: 999px; padding: 4px 14px
```

#### B) STEP INDICATOR
Add a 3-step progress indicator at the top of the form:
```
Step 1: Car Details     Step 2: Condition      Step 3: Get Quote
─────────────────────────────────────────────────────────────────
Active step: purple filled circle + label
Completed step: gold checkmark circle + label  
Inactive: gray circle + label
Connector line: dashed, animates to solid when step complete
```

#### C) FORM CARD STYLING
```css
/* Form wrapper card */
background: white;
border-radius: 24px;
border: 1px solid var(--color-border-purple);
box-shadow: 0 8px 48px rgba(91,45,134,0.1);
padding: clamp(32px, 4vw, 56px);
max-width: 680px;
margin: 0 auto;

/* Form section headings */
font-size: 18px;
font-weight: 600;
color: var(--color-text-primary);
margin-bottom: 24px;
padding-bottom: 16px;
border-bottom: 1px solid var(--color-border);

/* Input fields */
border: 1.5px solid var(--color-border);
border-radius: 12px;
padding: 14px 16px;
font-size: 15px;
transition: border-color 0.2s ease, box-shadow 0.2s ease;

focus {
  border-color: var(--color-brand-purple);
  box-shadow: 0 0 0 3px rgba(91,45,134,0.12);
  outline: none;
}

/* Select dropdowns: same style as inputs */

/* Label */
font-size: 12px;
font-weight: 500;
letter-spacing: 0.06em;
text-transform: uppercase;
color: var(--color-text-secondary);
margin-bottom: 8px;

/* Submit button */
Same as detail page primary CTA: full-width, gradient purple, 16px padding
```

#### D) WHY SELL ON SPINNY — RIGHT COLUMN
On desktop: 2-column layout (form left, benefits right).
Benefits column:
```
Background: var(--color-brand-purple-wash)
Border-radius: 20px
Padding: clamp(28px, 3vw, 40px)
Sticky: position sticky, top: 100px

Items (with purple icons):
  💰 Instant Quote — "Get your car's value in 60 seconds"
  🚗 Free Pickup — "We come to your doorstep, no extra charge"
  ✓ Zero Paperwork — "We handle RC, insurance, everything"
  💳 Same-Day Payment — "Guaranteed transfer same day you sell"

Each item:
  Icon container: 40px, border-radius: 10px, bg: brand-purple-tint, color: brand-purple
  Title: font-weight: 600, font-size: 15px
  Body: font-size: 13px, color: text-secondary, line-height: 1.7
  Gap between items: 20px
```

#### E) TRUST BAR (Below Form)
```
Centered row of 3 stats:
  "₹50 Cr+" | "Cars Sold" | "Happy Sellers"
  "2 Lakhs+" | "Customers" | "Across India"
  "30 Min"   | "Quote Time" | "Industry Fastest"

Each stat:
  Number: gradient text (purple → gold), font-size: 28px, font-weight: 800
  Label: text-muted, font-size: 12px, uppercase, letter-spacing: 0.1em
```

---

## PAGE 5: EMI CALCULATOR (/emi)

### Current State
Calculator with basic inputs and output. Needs visual treatment.

### Required Changes

#### A) PAGE HEADER
```
Background: var(--color-brand-purple-wash)
Border-bottom: 1px solid var(--color-border-purple)
Padding: clamp(48px, 6vw, 80px) clamp(20px, 5vw, 80px)

Eyebrow: "EMI CALCULATOR" (brand-purple, tracking-[0.18em])
H1: "Plan Your Car Purchase." (text-primary, clamp(28px, 4vw, 48px))
Subtext: "Calculate your monthly EMI instantly and plan your budget."
```

#### B) CALCULATOR CARD
```css
background: white;
border-radius: 24px;
border: 1px solid var(--color-border-purple);
box-shadow: 0 8px 48px rgba(91,45,134,0.1);
padding: clamp(32px, 4vw, 48px);
max-width: 800px;
margin: 0 auto;
```

#### C) INPUT SLIDERS
Replace plain number inputs with styled range sliders:
```css
/* Slider track */
-webkit-appearance: none;
height: 6px;
border-radius: 999px;
background: linear-gradient(to right, #5B2D86 0%, #5B2D86 var(--value)%, #E8DFF4 var(--value)%);

/* Slider thumb */
width: 22px; height: 22px;
border-radius: 50%;
background: white;
border: 3px solid var(--color-brand-purple);
box-shadow: 0 2px 8px rgba(91,45,134,0.25);
cursor: pointer;

/* Value display bubble */
background: var(--color-brand-purple);
color: white;
border-radius: 8px;
padding: 4px 10px;
font-size: 13px;
font-weight: 600;
/* shown above thumb */
```

Each slider row:
```
Label row: label left, value display right
Slider (full width)
Min/Max labels: small, text-muted, space-between
Gap between slider rows: 28px
```

#### D) EMI RESULT DISPLAY
```css
/* Result card (right side on desktop, below on mobile) */
background: linear-gradient(135deg, #3D1A6E 0%, #5B2D86 60%, #7B4FAB 100%);
border-radius: 20px;
padding: clamp(28px, 3vw, 40px);
color: white;
position: sticky;
top: 100px;

/* Monthly EMI label */
font-size: 12px;
text-transform: uppercase;
letter-spacing: 0.14em;
opacity: 0.7;
margin-bottom: 8px;

/* EMI amount */
font-size: clamp(36px, 5vw, 56px);
font-weight: 800;
color: var(--color-gold);
line-height: 1;

/* Breakdown items */
margin-top: 28px;
display: flex;
flex-direction: column;
gap: 14px;
border-top: 1px solid rgba(255,255,255,0.12);
padding-top: 20px;

/* Each breakdown row */
display: flex;
justify-content: space-between;
font-size: 14px;
opacity: 0.85;

/* Animate EMI change: number morphs smoothly */
transition: all 0.4s ease;
/* or use Framer Motion AnimatePresence on the number */

/* CTA inside result card */
margin-top: 24px;
background: white;
color: var(--color-brand-purple);
border-radius: 12px;
padding: 14px;
text-align: center;
font-weight: 600;
font-size: 14px;
cursor: pointer;
transition: all 0.2s ease;
hover: { background: var(--color-gold); color: #1C1C1C; }
```

#### E) AMORTIZATION TABLE (Add This)
Below the calculator, add a year-by-year breakdown table:
```css
margin-top: clamp(40px, 5vw, 64px);

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: var(--color-brand-purple-wash);
  color: var(--color-brand-purple);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 12px 16px;
}

/* Alternating rows */
tr:nth-child(even) { background: var(--color-brand-purple-wash); }

td {
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid var(--color-border);
}

/* Principal paid: colored bar behind number */
.principal-cell::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  height: 3px;
  width: var(--pct);
  background: var(--color-brand-purple);
  border-radius: 0 0 0 0;
}
```

---

## PAGE 6: ABOUT US (/about)

### Current State
Likely a plain content page. Needs editorial treatment.

### Required Changes

#### A) HERO — EDITORIAL BANNER
```
Background: #1C1C1C (near-black)
  Layered: subtle noise texture + radial purple glow (bottom-left)
Height: clamp(300px, 35vw, 480px)
Content:
  Eyebrow: "OUR STORY" (gold, tracking wide)
  H1: "Redefining How India Buys Cars." (white, large, letter-spacing: -0.02em)
  Sub: "Built on trust, transparency, and genuine love for cars." (white/65%)
Visual: Large abstract car silhouette (CSS or SVG) right side, very faint purple
```

#### B) MISSION STATEMENT BLOCK
```
Background: var(--color-brand-purple)
Color: white
Padding: clamp(64px, 8vw, 112px) clamp(20px, 5vw, 80px)
Max-width: 800px, centered
Text: large italic quote font, line-height: 1.5
Font-size: clamp(22px, 3vw, 36px)
"We started Spinny with one belief: every Indian deserves to own their
dream car without compromise."
Gold quotation marks: font-size: 80px, opacity: 0.3
```

#### C) STATS ROW
Same as homepage stats but on white background:
```
4 stats: Founded Year, Cities, Cars Sold, Customer Rating
Same count-up animation, gradient text numbers
Background: white, padding: clamp(48px, 6vw, 80px)
Dividers between stats: 1px solid border
```

#### D) TEAM / VALUES SECTION
```
Eyebrow: "WHY WE EXIST"
H2: "Our Core Values."
4 value cards in 2×2 grid (same as Why Spinny cards on homepage):
  - icon container: brand-purple-tint, 56px, border-radius: 14px
  - hover: lift + icon rotation + shimmer
  - cards: gap: clamp(24px, 3vw, 40px)
```

#### E) TIMELINE / JOURNEY SECTION
Animated vertical timeline:
```
Container: max-width: 680px, centered

Each milestone:
  Year: font-size: 32px, font-weight: 800, gradient text
  Title: font-size: 18px, font-weight: 600, margin-bottom: 8px
  Body: font-size: 14px, color: text-secondary, line-height: 1.72

Connector: 2px solid brand-purple, animated height 0→100% as section scrolls in
Dot: 14px circle, brand-purple fill, ring of rgba(91,45,134,0.2)
Gap between milestones: 40px

Animate: each milestone staggers in from right (x: 40→0, opacity: 0→1)
```

---

## PAGE 7: COMPARE PAGE (/compare)

### Required Changes

#### A) PAGE HEADER
```
Same header strip as Browse: purple gradient bg
Eyebrow: "COMPARE CARS"
H1: "Side By Side."
Subtext: "Compare up to 3 cars at once."
```

#### B) CAR SLOTS (Currently Plain)
Car slot cards for adding cars:
```css
/* Empty slot */
border: 2px dashed var(--color-brand-purple-light);
border-radius: 20px;
background: var(--color-brand-purple-wash);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 40px;
cursor: pointer;
transition: all 0.25s ease;

/* "+" icon */
width: 48px; height: 48px;
border-radius: 50%;
background: var(--color-brand-purple);
color: white;
font-size: 24px;

hover {
  background: var(--color-brand-purple-tint);
  border-color: var(--color-brand-purple);
  transform: scale(1.02);
}

/* Filled slot */
border: 1px solid var(--color-border-purple);
background: white;
border-radius: 20px;
/* car image top, details below */
/* "Remove" button: top-right, × icon, brand-purple */
```

#### C) COMPARISON TABLE
```css
/* Row headers (spec names) */
background: var(--color-brand-purple-wash);
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.08em;
color: var(--color-brand-purple);
padding: 14px 20px;

/* Data cells */
padding: 14px 20px;
font-size: 14px;
text-align: center;
border-bottom: 1px solid var(--color-border);

/* Highlight winning value */
font-weight: 700;
color: var(--color-brand-purple);
/* small "BEST" badge: brand-purple, white text, 999px radius */

/* Alternating row bg */
tr:nth-child(even) td { background: rgba(240,236,247,0.5); }

/* Entrance: fade in from below, stagger rows */
```

---

## PAGE 8: DASHBOARD / SHORTLIST (/dashboard)

### Required Changes

#### A) PAGE HEADER
```
Eyebrow: "MY SHORTLIST"
H1: "Your Saved Cars." (if logged in) or "Sign In to View Your Shortlist." (if not)
Background: var(--color-brand-purple-wash)
```

#### B) EMPTY STATE
When shortlist is empty:
```
Centered content:
  Icon: large car illustration (SVG, purple outline, ~120px)
  H2: "No Cars Saved Yet." (font-size: 24px)
  Body: "Browse our collection and shortlist the cars you love."
  CTA: "Browse Cars" (brand-purple button, full treatment)

Animate: fade + scale from 0.9→1, 0.5s
```

#### C) SHORTLISTED CARD GRID
Same 3D tilt cards as browse page.
Add a "Remove from Shortlist" button:
```css
/* Appears on hover (top-right of card) */
position: absolute;
top: 12px; right: 12px;
width: 32px; height: 32px;
border-radius: 50%;
background: rgba(255,255,255,0.9);
backdrop-filter: blur(4px);
border: 1px solid rgba(91,45,134,0.2);
color: var(--color-brand-purple);
/* × icon inside */

hover { background: #fee; color: #e53; }
```

---

## PAGE 9: LOGIN PAGE (/login)

### Required Changes

#### A) SPLIT LAYOUT
```
Left half (desktop):
  Background: linear-gradient(135deg, #1C1C1C 0%, #3D1A6E 100%)
  Large abstract car graphic / logo mark
  Quote: "India's Most Trusted Car Platform"
  Stats: 2L+ customers, 200-point inspection
  Color: white

Right half:
  Background: white
  Centered form card (no outer card — just the form itself on white)
  Max-width: 400px, margin: auto
```

#### B) FORM STYLING
```css
/* Input fields */
Same treatment as Sell page: 1.5px border, border-radius: 12px, focus: purple glow

/* "Sign In" button */
Full-width, gradient purple, border-radius: 14px, 16px padding, font-weight: 600

/* "Continue with Google" */
border: 1.5px solid var(--color-border);
border-radius: 14px;
padding: 14px;
full-width;
hover: border-color: brand-purple, bg: brand-purple-wash

/* Divider "OR" */
color: text-muted
sides: 1px solid border, flex: 1
```

#### C) BRAND TOUCH
Below the form title:
```
Eyebrow: "WELCOME BACK" (brand-purple, tracking wide)
Title: "Sign in to Spinny" (text-primary, font-size: 28px)
Body: "Access your shortlist, bookings and purchase history."
```

---

## ANIMATION CONSISTENCY CHECKLIST
Apply to EVERY page, no exceptions:

```
✓ Page route transition: fade + y:12 → 0, 0.35s
✓ Section entrance: opacity 0→1, y:40→0, 0.7s, ease [0.22,1,0.36,1]
✓ Card grid stagger: 0.06s per card
✓ Heading stagger: words y:60→0, 0.08s per word  
✓ Button hover: scale 1.03, translateY -2px
✓ Button tap: scale 0.97
✓ Card hover lift: translateY -6px, shadow deepens
✓ Image hover: scale 1.07, translateY -6px
✓ Icon hover: rotate 8deg, spring physics
✓ Link hover: underline scaleX 0→1 from center
✓ All touch devices: disable 3D tilt, keep hover lifts
✓ prefers-reduced-motion: disable transforms, keep opacity only
✓ Scroll progress bar: visible on ALL pages
✓ Smooth scroll (Lenis): active on ALL pages
```

---

## COLOR USAGE CHECKLIST
Apply to EVERY page:

```
Section backgrounds (alternating):
  Page 1: white
  Section 2: brand-purple-wash (#F0ECF7)
  Section 3: white
  Section 4: brand-purple-dark (#3D1A6E) for CTA banners
  (never two brand-purple-wash sections back to back)

Text colors:
  H1, H2: #1C1C1C (text-primary) on light, white on dark
  Body: #6B6B6B (text-secondary), max-width: 60ch, line-height: 1.72
  Eyebrows: #7B4FAB (brand-purple-light) on light, #C5A059 (gold) on dark
  Price numbers: gradient #3D1A6E → #5B2D86
  EMI numbers: #C5A059 (gold)
  Muted/labels: #9B9B9B

Accent touches (use sparingly):
  Gold (#C5A059): prices, EMI, diamond dividers, premium badges, key stats
  Purple (#5B2D86): primary buttons, active states, icons, borders on focus
  Purple-light (#7B4FAB): secondary text, eyebrows, hover states
  Purple-wash (#F0ECF7): card backgrounds, icon containers, alt sections
  Purple-tint (#E8DFF4): icon containers, hover backgrounds, spec chips
```

---

## FINAL NOTES

1. **DO NOT change** any existing color hex values in tailwind.config.ts
2. **DO NOT break** filters, routing, EMI calculation logic, compare/shortlist
3. Test all changes at: 320px · 768px · 1280px · 1600px
4. The 3D tilt effect (onMouseMove perspective) must be gated:
   `if ('ontouchstart' in window) return; // skip on mobile`
5. All count-up animations must only trigger ONCE per scroll session
6. Three.js hero canvas: still optional, lowest priority. If causing
   performance issues, replace with CSS float animation on a PNG.
7. Priority order for implementation:
   - Browse page (most visited, most impactful)
   - Car detail page (conversion-critical)
   - Sell page (second revenue page)
   - EMI calculator (tool page)
   - About, Compare, Dashboard, Login (lower traffic)
