# Portfolio Site Design — Sohan Madimsetty

## Overview
A single-page, black-and-white, minimalist personal portfolio site. Built with
plain HTML/CSS/JS (no framework, no build step) and deployed via git to
Netlify.

## Stack & File Structure
```
index.html
styles.css
script.js
assets/
  profile.jpg   (placeholder — user drops their photo in here)
```
No dependencies, no build tooling. Opens directly in a browser or deploys
as-is to Netlify.

## Typography
Single typeface used throughout: **Space Grotesk** (Google Font), at varying
weights and sizes to carry the hierarchy:
- Name (hero): bold, large
- Section headers (EXPERIENCE / INTERESTS): medium weight, letter-spaced,
  uppercase
- Experience/interest entries: regular weight
- Nested items (Senior Analyst): light weight, smaller size, indented

No secondary typeface — deliberately kept to one family for simplicity per
the brief.

## Color
- Background: pure white (`#FFFFFF`)
- Text: pure black (`#000000`)
- Dividers/hairlines: black at low opacity (e.g. `rgba(0,0,0,0.1)`) — not a
  separate color, stays within the black/white constraint
- **Signature interaction**: hovering or focusing any interactive row fully
  inverts it — black fill, white text — rather than an underline or accent
  color. This is the one deliberate visual flourish, and it embodies the
  black/white constraint rather than working around it.

## Layout (top to bottom)

```
┌──────────────────────────────────────────────────────────┐
│ [photo]                                       CONTACT     │
│                                                            │
│         SOHAN MADIMSETTY                                  │
│                                                            │
│  EXPERIENCE                                          +    │
│  ────────────────────────────────────────────────────     │
│    Lead Analyst — Johnson & Johnson                     + │
│       └ Senior Analyst  (always visible, no click)         │
│    Founder — All Night NYC                    [links out] │
│    Finance Innovation & Technology Intern — Marsh McLennan │
│    Internship — Cosmos                                    │
│    Associate Teller — JPMorgan Chase                       │
│                                                            │
│  INTERESTS                                           +    │
│  ────────────────────────────────────────────────────     │
│    Tennis · Pickleball · Fitness enthusiast ·              │
│    Competitive Catan · Reading [links out] · Learning Hindi│
└──────────────────────────────────────────────────────────┘
```

### Top-left: photo / home control
A circular/square photo (`assets/profile.jpg`, placeholder until the user
supplies the real image). Wrapped in a click target that acts as "home":
clicking it collapses the Experience and Interests accordions, closes the
contact modal if open, and scrolls the page back to the top. This is a reset
action, not a page navigation (the site is single-page).

### Top-right: CONTACT button
Opens a centered modal overlay with a dimmed backdrop, containing:
- Phone: `(732) 524-8928`
- Email: `smadimsetty@gmail.com`
- X (Twitter): `https://x.com/SohanMad`
- LinkedIn: `https://www.linkedin.com/in/sohan-madimsetty/`
- Instagram: `https://www.instagram.com/sohanmadimsetty/`

Closes via an `×` button, clicking the dimmed backdrop, or pressing Escape.

### Hero
"SOHAN MADIMSETTY" set large and bold in Space Grotesk.

### EXPERIENCE (top-level disclosure)
Clicking the "EXPERIENCE" row toggles a `+`/`×` glyph (rotates 45° between
states) and expands/collapses the list of entries beneath it. Entries, in
order, role first then company:

1. **Lead Analyst — Johnson & Johnson** — the company name text is a link out
   to `https://www.jnj.com`. Directly beneath, always visible (no separate
   toggle, no click required): **Senior Analyst**, indented and in a lighter
   weight, representing the earlier role at the same company.
2. **Founder — All Night NYC** — company name links out to
   `https://www.instagram.com/allnightnyc/`.
3. **Finance Innovation & Technology Intern — Marsh McLennan** — static text,
   no link.
4. **Internship — Cosmos** — static text, no link.
5. **Associate Teller — JPMorgan Chase** — static text, no link.

No dates are shown on any entry.

### INTERESTS (top-level disclosure)
Same disclosure pattern as EXPERIENCE. Expands to reveal:
- Tennis
- Pickleball
- Fitness enthusiast
- Competitive Catan
- Reading — links out to
  `https://www.goodreads.com/user/show/189746033-sohan-madimsetty`
- Learning Hindi

## Interaction Summary
- Photo (top-left): home/reset control (not a link to another page)
- EXPERIENCE / INTERESTS rows: click to expand/collapse via `+`/`×` toggle
- Johnson & Johnson: company name is a link (opens jnj.com in a new tab);
  Senior Analyst sub-line is always visible beneath it, no toggle needed
- All Night NYC: company name is a link (opens Instagram in a new tab)
- Reading: links out to Goodreads in a new tab
- CONTACT button: opens/closes centered modal

## Motion
Subtle only:
- Accordion expand/collapse: height + opacity transition, ~200ms ease
- `+`/`×` toggle glyph: rotates 45°
- Contact modal: fades and scales in slightly on open

All motion respects `prefers-reduced-motion` (reduced/removed when set).

## Accessibility & Quality Floor
- Responsive down to mobile widths
- Visible keyboard focus states on all interactive elements (photo/home
  control, EXPERIENCE/INTERESTS toggles, links, contact button, modal close)
- Contact modal is keyboard-operable (Escape closes it, focus is trapped
  while open, focus returns to the CONTACT button on close)
- `prefers-reduced-motion` respected throughout

## Deployment
- Git repository initialized locally
- New GitHub repository created (via `gh` CLI, with explicit user
  confirmation before any push)
- Connected to Netlify for continuous deployment on push to the main branch

## Out of Scope
- No CMS, no backend, no analytics
- No dark mode toggle (white background / black text only, per user
  decision)
- No additional pages/routes — everything lives on the single page
