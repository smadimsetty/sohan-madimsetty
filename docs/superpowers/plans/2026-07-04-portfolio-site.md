# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the single-page, black-and-white portfolio site described in
`docs/superpowers/specs/2026-07-04-portfolio-site-design.md`, then push it to
GitHub and hand off to Netlify for deployment.

**Architecture:** Plain HTML/CSS/JS, no build step, no npm dependencies.
`index.html` holds all markup, `styles.css` all styling, `script.js` all
interactivity. Fonts load from Google Fonts CDN. Local verification uses
Python's built-in `http.server` (no install required) via the preview tool.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, CSS transitions),
vanilla JS (no framework), Space Grotesk (Google Font), git, GitHub (`gh`
CLI), Netlify (manual dashboard connection).

## Global Constraints

- No build tools, no npm/node dependencies shipped in the site itself —
  verbatim from spec: "Plain HTML/CSS/JS, no build step, no dependencies."
- Single typeface throughout: Space Grotesk, at varying weights — no second
  font family.
- Palette strictly white background (`#FFFFFF`) / black text (`#000000`),
  with black-at-low-opacity for hairlines only.
- Signature hover/focus behavior: interactive elements fully invert
  (black fill, white text) rather than using an accent color or underline.
- All motion respects `prefers-reduced-motion: reduce`.
- Keyboard accessible: visible focus states, modal is focus-trapped and
  Escape-closable, focus returns to the triggering control on close.
- No dates shown on any experience entry except none at all (dates were
  explicitly removed from the spec).
- Any action that touches GitHub (repo creation, push) requires explicit
  user confirmation before it runs — do not create remote repos or push
  without asking first.

---

### Task 1: Project scaffold — shell, fonts, top bar, hero

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `assets/profile.svg`
- Create: `.claude/launch.json`

**Interfaces:**
- Produces: `#homeBtn` (home/reset button), `#contactBtn` (contact button,
  not yet wired), `.hero-name` (name headline). These IDs/classes are
  consumed by every later task.
- Produces: CSS custom properties `--color-bg`, `--color-fg`,
  `--color-hairline`, `--font-display`, `--transition-fast`, used by all
  later CSS.
- Produces: `.claude/launch.json` config named `portfolio-static` (port
  5500), used by every later task's verification step.

- [ ] **Step 1: Create the placeholder avatar**

Create `assets/profile.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#000000"/>
  <text x="100" y="118" font-family="Space Grotesk, sans-serif" font-size="64" fill="#ffffff" text-anchor="middle">SM</text>
</svg>
```

This is a stand-in until the real photo is dropped in. To swap it later,
replace this file's contents with the real image (or add a new file and
update the `src` on `.home-photo` in `index.html`).

- [ ] **Step 2: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sohan Madimsetty</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="topbar">
    <button type="button" class="home-btn" id="homeBtn" aria-label="Reset to home">
      <img src="assets/profile.svg" alt="Sohan Madimsetty" class="home-photo">
    </button>
    <button type="button" class="contact-btn" id="contactBtn" aria-haspopup="dialog" aria-controls="contactModal">
      Contact
    </button>
  </header>

  <main>
    <h1 class="hero-name">Sohan Madimsetty</h1>
  </main>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create styles.css**

```css
:root {
  --color-bg: #ffffff;
  --color-fg: #000000;
  --color-hairline: rgba(0, 0, 0, 0.12);
  --font-display: 'Space Grotesk', sans-serif;
  --transition-fast: 200ms ease;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.4;
  padding: 24px;
}

a {
  color: inherit;
}

button {
  font-family: inherit;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home-btn {
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
  width: 48px;
  height: 48px;
  border: 1px solid var(--color-fg);
}

.home-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.contact-btn {
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.85rem;
  padding: 8px 16px;
  border: 1px solid var(--color-fg);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.contact-btn:hover,
.contact-btn:focus-visible {
  background: var(--color-fg);
  color: var(--color-bg);
}

.hero-name {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  margin: 64px 0 48px;
  letter-spacing: -0.02em;
}
```

- [ ] **Step 4: Create an empty script.js**

Create `script.js` with empty content (0 bytes) — later tasks fill it in.

- [ ] **Step 5: Create the preview launch config**

Create `.claude/launch.json`:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "portfolio-static",
      "runtimeExecutable": "python",
      "runtimeArgs": ["-m", "http.server", "5500"],
      "port": 5500
    }
  ]
}
```

- [ ] **Step 6: Verify in browser**

Start the preview server named `portfolio-static`, navigate to it, and
confirm:
- Page title is "Sohan Madimsetty"
- A black circular avatar with white "SM" text appears top-left
- A "CONTACT" button (bordered, uppercase) appears top-right
- "Sohan Madimsetty" renders large and bold
- Computed `font-family` on `.hero-name` includes "Space Grotesk"
- No console errors

- [ ] **Step 7: Commit**

```bash
git add index.html styles.css script.js assets/profile.svg .claude/launch.json
git commit -m "Scaffold portfolio site shell, fonts, top bar, and hero"
```

---

### Task 2: Experience section markup + styles

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `.hero-name` block from Task 1 as the anchor point for insertion.
- Produces: `#experienceToggle`, `#experiencePanel` — consumed by Task 5's
  JS. `.disclosure`, `.disclosure-header`, `.disclosure-panel`,
  `.disclosure-icon` — reused by Task 3's Interests section.

- [ ] **Step 1: Add the Experience section to index.html**

Replace:
```html
  <main>
    <h1 class="hero-name">Sohan Madimsetty</h1>
  </main>
```
with:
```html
  <main>
    <h1 class="hero-name">Sohan Madimsetty</h1>

    <section class="disclosure" id="experienceSection">
      <button type="button" class="disclosure-header" id="experienceToggle" aria-expanded="false" aria-controls="experiencePanel">
        <span class="disclosure-label">Experience</span>
        <span class="disclosure-icon" aria-hidden="true">+</span>
      </button>
      <div class="disclosure-panel" id="experiencePanel" hidden>
        <ul class="entry-list">
          <li class="entry">
            <div class="entry-role">Lead Analyst — <a href="https://www.jnj.com" target="_blank" rel="noopener noreferrer" class="entry-link">Johnson &amp; Johnson</a></div>
            <div class="entry-nested">Senior Analyst</div>
          </li>
          <li class="entry">
            <div class="entry-role">Founder — <a href="https://www.instagram.com/allnightnyc/" target="_blank" rel="noopener noreferrer" class="entry-link">All Night NYC</a></div>
          </li>
          <li class="entry">
            <div class="entry-role">Finance Innovation &amp; Technology Intern — Marsh McLennan</div>
          </li>
          <li class="entry">
            <div class="entry-role">Internship — Cosmos</div>
          </li>
          <li class="entry">
            <div class="entry-role">Associate Teller — JPMorgan Chase</div>
          </li>
        </ul>
      </div>
    </section>
  </main>
```

- [ ] **Step 2: Append Experience styles to styles.css**

Append to the end of `styles.css`:

```css

.disclosure {
  border-top: 1px solid var(--color-hairline);
}

.disclosure:last-of-type {
  border-bottom: 1px solid var(--color-hairline);
}

.disclosure-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.disclosure-header:hover,
.disclosure-header:focus-visible {
  background: var(--color-fg);
  color: var(--color-bg);
}

.disclosure-icon {
  font-weight: 300;
  font-size: 1.4rem;
  transition: transform var(--transition-fast);
}

.disclosure-header[aria-expanded="true"] .disclosure-icon {
  transform: rotate(45deg);
}

.disclosure-panel {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height var(--transition-fast), opacity var(--transition-fast);
}

.disclosure-panel.is-open {
  max-height: 1000px;
  opacity: 1;
}

.entry-list {
  list-style: none;
  margin: 0;
  padding: 16px 0 32px;
}

.entry {
  padding: 12px 0;
}

.entry-role {
  font-weight: 400;
}

.entry-nested {
  font-weight: 300;
  font-size: 0.9rem;
  padding-left: 24px;
  margin-top: 4px;
  opacity: 0.75;
}

.entry-link {
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.entry-link:hover,
.entry-link:focus-visible {
  background: var(--color-fg);
  color: var(--color-bg);
}
```

- [ ] **Step 3: Verify in browser**

Reload the preview page. The panel is `hidden` (no JS wired yet), so
temporarily reveal it to check styling: run
`document.getElementById('experiencePanel').hidden = false` via the
preview eval tool, then screenshot. Confirm:
- "EXPERIENCE" header renders uppercase with a `+` on the right
- Five entries render, role text first then company name
- "Johnson & Johnson" is a link (underlined) pointing to `https://www.jnj.com`
- "Senior Analyst" renders indented, smaller, and lighter weight beneath
  the Johnson & Johnson entry
- "All Night NYC" is a link pointing to `https://www.instagram.com/allnightnyc/`
- No dates appear anywhere in the section

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add Experience section markup and styles"
```

---

### Task 3: Interests section markup + styles

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `.disclosure`, `.disclosure-header`, `.disclosure-panel`,
  `.disclosure-icon`, `.entry-link` from Task 2.
- Produces: `#interestsToggle`, `#interestsPanel` — consumed by Task 5's JS.

- [ ] **Step 1: Add the Interests section to index.html**

Replace:
```html
    </section>
  </main>
```
with:
```html
    </section>

    <section class="disclosure" id="interestsSection">
      <button type="button" class="disclosure-header" id="interestsToggle" aria-expanded="false" aria-controls="interestsPanel">
        <span class="disclosure-label">Interests</span>
        <span class="disclosure-icon" aria-hidden="true">+</span>
      </button>
      <div class="disclosure-panel" id="interestsPanel" hidden>
        <ul class="interest-list">
          <li>Tennis</li>
          <li>Pickleball</li>
          <li>Fitness enthusiast</li>
          <li>Competitive Catan</li>
          <li><a href="https://www.goodreads.com/user/show/189746033-sohan-madimsetty" target="_blank" rel="noopener noreferrer" class="entry-link">Reading</a></li>
          <li>Learning Hindi</li>
        </ul>
      </div>
    </section>
  </main>
```

(This matches the closing `</section>` of the Experience section from
Task 2, so the Interests section lands directly after it, still inside
`<main>`.)

- [ ] **Step 2: Append Interests styles to styles.css**

Append to the end of `styles.css`:

```css

.interest-list {
  list-style: none;
  margin: 0;
  padding: 16px 0 32px;
}

.interest-list li {
  display: inline;
}

.interest-list li:not(:last-child)::after {
  content: " \00b7 ";
}
```

- [ ] **Step 3: Verify in browser**

Reload the preview page. Temporarily reveal the panel via
`document.getElementById('interestsPanel').hidden = false` and screenshot.
Confirm:
- "INTERESTS" header renders uppercase with a `+`
- All six interests render inline, separated by a middle-dot (`·`)
- "Reading" is a link pointing to
  `https://www.goodreads.com/user/show/189746033-sohan-madimsetty`

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add Interests section markup and styles"
```

---

### Task 4: Contact modal markup + styles

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `#contactBtn` from Task 1 (`aria-controls="contactModal"`
  already points here).
- Produces: `#modalBackdrop`, `#contactModal`, `#modalCloseBtn` — consumed
  by Task 6's JS.

- [ ] **Step 1: Add the modal markup to index.html**

Replace:
```html
  <script src="script.js"></script>
```
with:
```html
  <div class="modal-backdrop" id="modalBackdrop" hidden>
    <div class="modal" id="contactModal" role="dialog" aria-modal="true" aria-labelledby="contactModalTitle">
      <button type="button" class="modal-close" id="modalCloseBtn" aria-label="Close contact info">&times;</button>
      <h2 id="contactModalTitle">Contact</h2>
      <ul class="contact-list">
        <li><span class="contact-label">Phone</span><a href="tel:+17325248928" class="entry-link">(732) 524-8928</a></li>
        <li><span class="contact-label">Email</span><a href="mailto:smadimsetty@gmail.com" class="entry-link">smadimsetty@gmail.com</a></li>
        <li><span class="contact-label">X</span><a href="https://x.com/SohanMad" target="_blank" rel="noopener noreferrer" class="entry-link">@SohanMad</a></li>
        <li><span class="contact-label">LinkedIn</span><a href="https://www.linkedin.com/in/sohan-madimsetty/" target="_blank" rel="noopener noreferrer" class="entry-link">sohan-madimsetty</a></li>
        <li><span class="contact-label">Instagram</span><a href="https://www.instagram.com/sohanmadimsetty/" target="_blank" rel="noopener noreferrer" class="entry-link">@sohanmadimsetty</a></li>
      </ul>
    </div>
  </div>

  <script src="script.js"></script>
```

Reusing the `.entry-link` class (defined in Task 2) applies the same
hover/focus invert signature to the contact links, so the "invert on
interaction" treatment is consistent across the whole site, not just the
Experience/Interests sections.

- [ ] **Step 2: Append modal styles to styles.css**

Append to the end of `styles.css`:

```css

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-backdrop[hidden] {
  display: none;
}

.modal {
  background: var(--color-bg);
  color: var(--color-fg);
  border: 1px solid var(--color-fg);
  padding: 32px;
  max-width: 360px;
  width: 100%;
  position: relative;
  transform: scale(0.96);
  opacity: 0;
  animation: modal-in var(--transition-fast) forwards;
}

@keyframes modal-in {
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 1.5rem;
  line-height: 1;
}

.contact-list {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
}

.contact-list li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-hairline);
}

.contact-label {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  opacity: 0.6;
}
```

- [ ] **Step 3: Verify in browser**

Reload the preview page. Temporarily reveal the modal via
`document.getElementById('modalBackdrop').hidden = false` and screenshot.
Confirm:
- A centered white card with a black border appears over a dimmed backdrop
- Phone, Email, X, LinkedIn, Instagram rows all render with correct labels
  and values
- An `×` close button appears top-right of the card

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add Contact modal markup and styles"
```

---

### Task 5: JS — Experience/Interests disclosure behavior

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: `#experienceToggle`/`#experiencePanel` (Task 2),
  `#interestsToggle`/`#interestsPanel` (Task 3), `.is-open` CSS class
  (Task 2).
- Produces: `setDisclosureState(toggle, panel, open)` function and
  `experience` / `interests` objects (each `{ toggle, panel }`) — both
  consumed by Task 7's home/reset handler.

- [ ] **Step 1: Write the disclosure logic**

Write `script.js`:

```javascript
function setupDisclosure(toggleId, panelId) {
  const toggle = document.getElementById(toggleId);
  const panel = document.getElementById(panelId);

  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.contains('is-open');
    setDisclosureState(toggle, panel, !isOpen);
  });

  return { toggle, panel };
}

function setDisclosureState(toggle, panel, open) {
  if (open) {
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('is-open'));
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    panel.addEventListener('transitionend', function handler() {
      panel.hidden = true;
      panel.removeEventListener('transitionend', handler);
    });
  }
}

const experience = setupDisclosure('experienceToggle', 'experiencePanel');
const interests = setupDisclosure('interestsToggle', 'interestsPanel');
```

- [ ] **Step 2: Verify in browser**

Reload the preview page (this removes any manual `hidden` overrides from
earlier tasks' testing). Click `#experienceToggle`:
- Confirm `aria-expanded` becomes `"true"`
- Confirm the panel becomes visible (no longer `hidden`) and the five
  entries are readable in a page snapshot
- Confirm the `+` glyph visually rotates to look like `×`

Click `#experienceToggle` again:
- Confirm `aria-expanded` becomes `"false"`
- Wait for the transition, then confirm the panel's `hidden` attribute is
  restored

Repeat both checks for `#interestsToggle` / `#interestsPanel`.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Wire up Experience/Interests disclosure toggles"
```

---

### Task 6: JS — Contact modal open/close, focus trap, Escape

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: `#contactBtn` (Task 1), `#modalBackdrop`, `#contactModal`,
  `#modalCloseBtn` (Task 4).
- Produces: `openModal()`, `closeModal()` functions — consumed by Task 7's
  home/reset handler.

- [ ] **Step 1: Append modal logic to script.js**

Append to the end of `script.js`:

```javascript

const contactBtn = document.getElementById('contactBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const contactModal = document.getElementById('contactModal');

function openModal() {
  modalBackdrop.hidden = false;
  modalCloseBtn.focus();
  document.addEventListener('keydown', handleModalKeydown);
}

function closeModal() {
  modalBackdrop.hidden = true;
  document.removeEventListener('keydown', handleModalKeydown);
  contactBtn.focus();
}

function handleModalKeydown(e) {
  if (e.key === 'Escape') {
    closeModal();
    return;
  }
  if (e.key === 'Tab') {
    const focusable = contactModal.querySelectorAll('a, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

contactBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});
```

- [ ] **Step 2: Verify in browser**

Reload the preview page. Click `#contactBtn`:
- Confirm `#modalBackdrop` is no longer `hidden`
- Confirm `document.activeElement` is `#modalCloseBtn`

Dispatch an Escape keydown (e.g. via the eval tool:
`document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}))`):
- Confirm `#modalBackdrop` becomes `hidden` again
- Confirm `document.activeElement` is `#contactBtn`

Re-open the modal, then dispatch a click event whose target is
`#modalBackdrop` itself (not the inner `.modal` card):
- Confirm the modal closes

Re-open the modal and click `#modalCloseBtn` directly:
- Confirm the modal closes and focus returns to `#contactBtn`

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Wire up Contact modal open/close, focus trap, and Escape handling"
```

---

### Task 7: JS — Home/reset behavior

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: `setDisclosureState` + `experience`/`interests` (Task 5),
  `closeModal` (Task 6), `#homeBtn` (Task 1).

- [ ] **Step 1: Append the home/reset handler to script.js**

Append to the end of `script.js`:

```javascript

const homeBtn = document.getElementById('homeBtn');
homeBtn.addEventListener('click', () => {
  setDisclosureState(experience.toggle, experience.panel, false);
  setDisclosureState(interests.toggle, interests.panel, false);
  closeModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

- [ ] **Step 2: Verify in browser**

Reload the preview page. Expand both Experience and Interests, open the
Contact modal, and scroll the page down. Click `#homeBtn`:
- Confirm both `#experiencePanel` and `#interestsPanel` end up `hidden`
  with `aria-expanded="false"` on their toggles
- Confirm `#modalBackdrop` is `hidden`
- Confirm `window.scrollY` returns to `0`

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Wire up home/reset button behavior"
```

---

### Task 8: Responsive + reduced-motion pass

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: all selectors defined in Tasks 1–4 (`.hero-name`,
  `.contact-list li`, and the global `*` transition/animation rule apply
  site-wide).

- [ ] **Step 1: Append responsive and reduced-motion rules to styles.css**

Append to the end of `styles.css`:

```css

@media (max-width: 480px) {
  body {
    padding: 16px;
  }

  .hero-name {
    margin: 40px 0 32px;
  }

  .contact-list li {
    flex-direction: column;
    gap: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.001ms !important;
    animation-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 2: Verify at mobile width**

Resize the preview viewport to 375×812 (mobile preset). Reload. Confirm:
- `document.documentElement.scrollWidth <= window.innerWidth` (no
  horizontal overflow)
- The hero name, Experience/Interests headers, and Contact button all
  remain readable and don't overlap
- Open the Contact modal at this width and confirm each contact row stacks
  label-above-value instead of side-by-side, and the modal card fits
  within the viewport without horizontal scrolling

- [ ] **Step 3: Verify reduced-motion rule is present**

Confirm the `@media (prefers-reduced-motion: reduce)` block exists in
`styles.css` and that it targets `*` with `transition-duration` and
`animation-duration` overrides (this is a static code check — most
preview tooling can't emulate `prefers-reduced-motion`, so this step
confirms the rule is in place rather than exercising it live).

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Add responsive mobile layout and reduced-motion support"
```

---

### Task 9: Push to GitHub and hand off to Netlify

**Files:** none (deployment only)

**Interfaces:** none — this task ships what Tasks 1–8 produced.

- [ ] **Step 1: Confirm repo details with the user**

Before creating anything on GitHub, ask the user:
- What should the repository be named?
- Should it be public or private?

Do not proceed to Step 2 until the user has answered.

- [ ] **Step 2: Create the GitHub repository and push**

Using the name/visibility from Step 1 (example uses `portfolio` and
`--public`; substitute the user's actual answer):

```bash
gh repo create portfolio --public --source=. --remote=origin --push
```

This creates the remote repo, adds it as `origin`, and pushes the current
`master`/`main` branch in one step. Confirm the command's output shows a
successful push before continuing.

- [ ] **Step 3: Verify on GitHub**

```bash
gh repo view --web
```

Confirm the repository opens in the browser and shows all committed files
(`index.html`, `styles.css`, `script.js`, `assets/profile.svg`,
`.claude/launch.json`, and the `docs/` folder).

- [ ] **Step 4: Hand off Netlify connection instructions to the user**

Netlify's git-based deploy requires OAuth account linking that can't be
scripted from here. Tell the user:
1. Go to https://app.netlify.com and log in
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub" and authorize Netlify if prompted
4. Select the repository created in Step 2
5. Leave build command blank and publish directory as `/` (root) — this
   is a static site with no build step
6. Click "Deploy" — Netlify will auto-redeploy on every push to the
   default branch from now on
