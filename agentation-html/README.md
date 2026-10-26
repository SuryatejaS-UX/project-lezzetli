# 🎯 Agentation for HTML (`agentation.js`)

> A simple, lightweight, zero-dependency visual element annotation and commenting tool for HTML web applications — inspired by [benjitaylor/agentation](https://github.com/benjitaylor/agentation), but built specifically for **standard HTML/CSS/JavaScript websites**, static prototypes, and modern frontend frameworks without requiring React or complex bundlers.

---

## 🌟 Why Agentation for HTML?

AI coding assistants like **Antigravity**, **Claude Code**, **Cursor**, and **Gemini** are exceptionally proficient at fixing code, but describing visual bugs using text alone often leads to ambiguity:
- ❌ *"The blue button in the top right has the wrong border color."*
- ❌ *"Increase padding on the cards in the middle of the screen."*

**Agentation for HTML** bridges the visual-to-code gap:
1. Open your rendered HTML page in any browser.
2. Click **Comment** (or press <kbd>Alt + C</kbd>).
3. Click any visual element to inspect it and attach feedback.
4. Categorize your note (🎨 **Style**, 🐛 **Bug**, ✍️ **Copy**, 📐 **Layout**, 💡 **Idea**).
5. Click **Copy for AI** (or press <kbd>Ctrl + Shift + C</kbd>).
6. Paste the generated Markdown directly into your AI chat prompt!

The AI agent gets exact CSS selectors, element hierarchies, computed styles snapshot, and your explicit instructions.

---

## 📁 Package Contents

```
agentation-html/
├── agentation.js          # Core library (Vanilla JS + Encapsulated Shadow DOM)
├── demo.html              # Standalone interactive showcase testbed
├── README.md              # Main overview & quick start guide
├── INTEGRATION_GUIDE.md   # Step-by-step guides for Next.js, Vite, Plain HTML, DevTools & Tampermonkey
├── bookmarklet.js         # Single-click browser bookmarklet for ANY website
├── userscript.js          # Tampermonkey script for automatic injection on all localhost apps
└── package.json           # Standalone package metadata
```

---

## ⚡ Quick Start

### 1. Drop into any HTML page
Add a single script tag before `</body>`:

```html
<script src="path/to/agentation.js"></script>
```

When you include `agentation.js`, it stays completely hidden by default so it never interferes with your design or presentation. Simply press <kbd>Alt + H</kbd> (or <kbd>Alt + \</kbd>) to reveal the floating toolbar dock and the "Show Agentation" pill at the bottom-right!

### 2. Run the Demo
Double-click `demo.html` in your file explorer or serve it via any static server to test commenting on interactive cards, navigation bars, form inputs, and tables!

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Description |
| :--- | :--- |
| <kbd>Alt + H</kbd> (or <kbd>Option + H</kbd> / <kbd>Alt + \</kbd>) | **Toggle Agentation Visibility** — Shows/Hides toolbar dock, pins, and bottom-right pill (Hidden by default) |
| <kbd>Alt + C</kbd> (or <kbd>Option + C</kbd>) | Toggle **Inspect / Comment Mode** (automatically un-hides tool if hidden) |
| <kbd>Esc</kbd> | Cancel inspection / Close active popovers & drawers |
| <kbd>Ctrl + Shift + C</kbd> (or <kbd>⌘ + Shift + C</kbd>) | **Copy AI-Ready Markdown** to clipboard |
| <kbd>Ctrl + Enter</kbd> (or <kbd>⌘ + Enter</kbd>) | Save feedback note in popover |

---

## ✨ Features

- **Hidden by Default on Screen (<kbd>Alt + H</kbd>)**: Zero screen clutter on page load. The tool remains entirely hidden until you trigger it with <kbd>Alt + H</kbd> (or <kbd>Option + H</kbd>), revealing both the floating toolbar dock and the "Show Agentation" pill in the bottom right. Pressing <kbd>Alt + H</kbd> or clicking the close button hides it again instantly for clean snapshots and recordings.
- **Print & PDF Safe**: Automatically hides during browser printing or PDF saving (`@media print`).
- **Encapsulated Shadow DOM**: Zero CSS collisions with host websites. Your page styles cannot distort the toolbar, and Agentation will never affect your page styles.
- **Smart Selector Generator**: Automatically generates clean, high-specificity CSS selectors (`header > div.ds-header-right > button#theme-toggle`).
- **DOM Hierarchy Breadcrumbs**: Click parent tags directly in the comment popover if you accidentally clicked an inner icon or text span.
- **Persistent Visual Pins**: Numbered markers stay attached to their DOM elements even while scrolling or resizing the viewport.
- **Side-Over Review Drawer**: Search, filter, edit, and jump to elements with a spotlight focus animation.
- **LocalStorage Persistence**: Comments stay saved across browser refreshes.
- **AI-Optimized Markdown**: Outputs clean, structured Markdown ready for instant grepping and code editing by Antigravity or Cursor.

---

## 📋 Example Copied Output for AI Coding Agents

```markdown
# Visual UI Feedback for AI Coding Agent

> **Source Page**: [Sutra Design System — Living Component Library](http://localhost:3000/design-system/index.html)
> **Viewport**: 1440 × 900 | **Date**: 10/18/2026, 7:30:00 PM
> **Total Annotations**: 2

---

### [1] `button#ds-theme-toggle.ds-btn-icon`

- **Feedback / User Intent**:
  > Border is too faint in light mode. Change border to 1px solid var(--border-neutral-strong) and add smooth background hover transition.
- **Type**: 🎨 Style
- **CSS Selector**: `button#ds-theme-toggle.ds-btn-icon`
- **HTML Tag**: `<button>`
- **ID**: `#ds-theme-toggle`
- **Classes**: `ds-btn-icon`
- **Rendered Dimensions**: 36px × 36px
- **Computed Styles Snapshot**:
  - `display`: `flex`
  - `background-color`: `rgba(0, 0, 0, 0)`
  - `border`: `1px solid rgba(226, 232, 240, 0.6)`
  - `color`: `rgb(30, 41, 59)`
  - `border-radius`: `8px`
- **Element Snippet**:
  ```html
  <button class="ds-btn-icon" id="ds-theme-toggle" aria-label="Toggle Light and Dark Mode">...</button>
  ```

---

### Instructions for AI Agent
1. Review each annotation above with its exact CSS selector and user request.
2. Search the codebase for the selector, element ID, or class names.
3. Implement the requested UI/style/copy fixes accurately while preserving existing functionality.
```

---

## 📖 Additional Documentation

- For integration instructions across **Next.js, Vite, Vue, Svelte, Django, Chrome DevTools Snippets, and Tampermonkey**, see [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md).
- For bookmarklet setup, see [bookmarklet.js](bookmarklet.js).
- For Tampermonkey localhost auto-injection, see [userscript.js](userscript.js).
