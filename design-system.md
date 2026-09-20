# Lezzetli Design System & Developer Specification

**Product Name:** Lezzetli — Authentic Middle Eastern Charcoal Grills & Desi Cuisine  
**Physical Restaurant:** Unit 3, Limerick Lane, Newbridge, Co. Kildare, Ireland (045 494056)  
**Online Platform:** Interactive Single-Page Application (HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript)  
**Production URL:** `https://project-lezzetli-git-main-surya-fab2.vercel.app`  
**GitHub Repository:** `https://github.com/SuryatejaS-UX/project-lezzetli.git`  
**Design Version:** 2.5 (High-Contrast AAA Light Mode, Native Mobile Bottom Sheets, Gesture Dismiss)

---

## 1. Cultural Design Philosophy & Visual Tone

Lezzetli bridges centuries-old Mughal and Ottoman hospitality with contemporary Irish dining speed:

1. **The Spice Palette:** Natural culinary hues—saffron gold, charred charcoal embers, roasted cardamom, fresh coriander herbal green, and tandoori crimson.
2. **Dual-Theme Dining:**
   - **Evening Dining (`data-theme="dark"` — Default):** Deep charcoal night surfaces (`#0E0C0A`) with radiant golden hour glows and ember-warm accents.
   - **Day Dining (`data-theme="light"`):** Crisp sandalwood cream (`#FDFBF7`) and kheer ivory with rich burnished mustard gold (`#B27B23`) and high-contrast white card pills.
3. **Typography Fusion:** Sculpted, regal classical serifs (`Cinzel` & `Playfair Display`) paired with crisp geometric sans-serifs (`Outfit` & `Plus Jakarta Sans`) for effortless mobile legibility.
4. **Mobile-First Touch Ergonomics:** Fluid bottom sheets, 44px+ touch targets, grab handle pills, and swipe-to-dismiss gestures mimicking native iOS and Android apps.

---

## 2. Design Tokens & CSS Variables

All tokens are defined in [`css/styles.css`](file:///c:/Users/Surya%20Teja%20S/OneDrive/Documents/Projects/project%20lezzetli/css/styles.css) on `:root[data-theme="dark"]` and `[data-theme="light"]`.

### 2.1 Color Tokens

```css
/* ==========================================================================
   DARK THEME (Evening Dining — Default)
   ========================================================================== */
:root, [data-theme="dark"] {
  /* Surfaces & Backgrounds */
  --bg-primary: #0E0C0A;               /* Deepest Ember Charcoal */
  --bg-secondary: #171310;             /* Warm Clove / Card Base */
  --bg-tertiary: #221C17;              /* Elevated Layer Surface */
  --bg-card: #1A1512;                  /* Dish & Modal Card Background */
  --bg-glass: rgba(23, 19, 16, 0.88);  /* Frosted Glass (Navbar & Floating Tray) */

  /* Text & Content */
  --text-primary: #FBF8F3;             /* Warm Basmati Ivory */
  --text-secondary: #C8BDB2;           /* Muted Cardamom */
  --text-muted: #8F8377;               /* Subdued Sand */

  /* Brand Accents */
  --gold-primary: #D49A3D;             /* Royal Saffron Gold */
  --gold-hover: #E7AB4D;               /* Radiant Golden Hour */
  --gold-light: #F4C47A;               /* Shimmer Gold */
  --gold-subtle: rgba(212, 154, 61, 0.15); /* Gold Sheen Layer */
  --gold-border: rgba(212, 154, 61, 0.28); /* Gold Outline */
  --tandoori-accent: #C84B31;          /* Tandoori Crimson Flare */
  --herbal-green: #2ED573;             /* Vegetarian Indicator */
  --chili-red: #FF4757;                /* Spicy Tag Indicator */

  /* Borders & Shadows */
  --border-subtle: rgba(212, 154, 61, 0.2);
  --border-card: rgba(255, 255, 255, 0.08);
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.35);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.65);
  --glow-gold: 0 0 24px rgba(212, 154, 61, 0.25);
}

/* ==========================================================================
   LIGHT THEME (Day Dining — High Contrast AAA)
   ========================================================================== */
[data-theme="light"] {
  /* Surfaces & Backgrounds */
  --bg-primary: #FDFBF7;               /* Sandalwood Cream */
  --bg-secondary: #F6F1E7;             /* Soft Kheer Ivory */
  --bg-tertiary: #FAF6F0;              /* Card Elevation */
  --bg-card: #FFFFFF;                  /* Crisp White Surfaces */
  --bg-glass: rgba(253, 251, 247, 0.92);

  /* Text & Content */
  --text-primary: #1C1713;             /* Dark Roasted Coffee (19.5:1 Contrast) */
  --text-secondary: #584C42;           /* Warm Earth */
  --text-muted: #8E8175;               /* Muted Bark */

  /* Brand Accents */
  --gold-primary: #B27B23;             /* Rich Mustard Gold */
  --gold-hover: #966518;               /* Burnished Brass */
  --gold-light: #D49A3D;               /* Warm Honey */
  --gold-subtle: rgba(178, 123, 35, 0.12);
  --gold-border: rgba(178, 123, 35, 0.3);
  --tandoori-accent: #B83B22;          /* Terracotta Red */
  --herbal-green: #157330;             /* Forest Green (Veg) */
  --chili-red: #C0292B;                /* Chili Pepper */

  /* Borders & Shadows */
  --border-subtle: rgba(178, 123, 35, 0.25);
  --border-card: rgba(0, 0, 0, 0.08);
  --shadow-sm: 0 4px 14px rgba(45, 30, 15, 0.08);
  --shadow-md: 0 8px 24px rgba(45, 30, 15, 0.12);
  --shadow-lg: 0 16px 36px rgba(45, 30, 15, 0.16);
  --glow-gold: 0 0 20px rgba(178, 123, 35, 0.18);
}
```

---

### 2.2 Typography Scale & Font Pairings

```css
:root {
  --font-display: 'Cinzel', 'Playfair Display', Georgia, serif;
  --font-sans: 'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif;
}
```

| Type Token | Font Family | Size (Desktop) | Size (Mobile) | Line Height | Weight | Application |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Display (`Cinzel`) | `3.75rem` (60px) | `2.4rem` (38px) | `1.15` | `700` | Main Hero Headline |
| **H1 Section** | Display (`Cinzel`) | `2.5rem` (40px) | `1.85rem` (30px) | `1.2` | `600` | Menu & Story Section Headers |
| **H2 Card** | Display (`Cinzel`) | `1.75rem` (28px) | `1.4rem` (22px) | `1.25` | `600` | Feature & Drawer Titles |
| **H3 Item** | Display (`Cinzel`) | `1.25rem` (20px) | `1.1rem` (18px) | `1.3` | `600` | Dish Card Names, Modal Headers |
| **Body Large** | Sans (`Outfit`) | `1.125rem` (18px) | `1rem` (16px) | `1.6` | `400` | Hero Subtitles, Story Intro |
| **Body Regular**| Sans (`Outfit`) | `1rem` (16px) | `0.9375rem` (15px) | `1.55` | `400` | Dish Descriptions, Field Inputs |
| **Body Small** | Sans (`Outfit`) | `0.875rem` (14px) | `0.8125rem` (13px) | `1.45` | `500` | Modifiers, Timestamps, Notes |
| **Badge / Pill**| Sans (`Outfit`) | `0.75rem` (12px) | `0.7rem` (11px) | `1` | `700` | Dietary tags, Bag count pills |
| **Price Tag** | Sans (`Outfit`) | `1.15rem` (18px) | `1.05rem` (17px) | `1` | `800` | Dish & Cart Item Pricing |

---

### 2.3 Radii & Elevation Tokens

```css
:root {
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 999px;
  --radius-modal: 24px 24px 0 0; /* Bottom Sheet Radius on Mobile */
}
```

---

### 2.4 Motion & Transition Tokens

```css
:root {
  --duration-fast: 160ms;
  --duration-normal: 300ms;
  --duration-slow: 480ms;
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-theme: background-color 350ms ease, color 350ms ease, border-color 350ms ease;
}
```

---

## 3. Layout Grid & Responsive Breakpoints

| Breakpoint | Target Devices | Layout Behavior |
| :--- | :--- | :--- |
| **Desktop (`> 1024px`)** | Laptops, Monitors | Fixed top navigation, 3-column menu grid, 480px–500px slide-in right drawers, centered modal dialogs with top-right `✕` buttons. |
| **Tablet (`640px – 1024px`)** | iPads, Tablets | 2-column menu grid, floating order tray docked above bottom, responsive drawers. |
| **Mobile (`<= 640px`)** | Smartphones (360px – 430px) | Full-width single column, edge-to-edge category scroll, sticky bottom dock, **all modals render as native bottom sheets with drag handles and zero close icons**. |

---

## 4. Component Architecture & Developer Reference

### 4.1 Dish Card (`.dish-card`)

```html
<article class="dish-card" data-category="kebabs">
  <div class="dish-card-media">
    <img src="https://images.unsplash.com/..." alt="Sultan Kebab Platter" class="dish-card-img" loading="lazy" />
    <span class="dish-dietary-badge veg">HALAL</span>
    <span class="dish-price-badge">€14.99</span>
  </div>
  <div class="dish-card-content">
    <h3 class="dish-card-title">Sultan Kebab Platter</h3>
    <p class="dish-card-desc">Charcoal-grilled lamb kofte, chicken shish, and tender doner served with freshly baked naan.</p>
    <div class="dish-card-actions">
      <button class="btn btn-sm btn-primary trigger-customizer" data-dish-id="sultan-kebab">
        Customize
      </button>
    </div>
  </div>
</article>
```

#### Key Developer Rules:
- **Price Tag Clarity:** In Light mode (`[data-theme="light"]`), `.dish-price-badge` must ALWAYS use `background: #FFFFFF !important`, `color: #110C0A !important`, and `border: 1.5px solid #B27B23 !important` to ensure `19.5:1 AAA` contrast against bright food photos.
- **Image Reveal:** Lazy images include `.img-lazy-reveal` transitioning opacity on load.

---

### 4.2 Category Navigation Carousel (`.menu-categories-scroll`)

```html
<div class="menu-categories-wrapper">
  <div class="menu-categories-scroll" role="tablist" aria-label="Menu Categories">
    <button class="category-tab-btn active" role="tab" aria-selected="true" data-category="all">
      <span class="tab-icon">✨</span> All Specialties
    </button>
    <button class="category-tab-btn" role="tab" aria-selected="false" data-category="kebabs">
      <span class="tab-icon">🍢</span> Charcoal Kebabs
    </button>
    <!-- Additional categories -->
  </div>
</div>
```

#### Key Developer Rules:
- **Scrollbar Elimination:** Native scrollbars are suppressed (`scrollbar-width: none; -ms-overflow-style: none; ::-webkit-scrollbar { display: none; }`).
- **Mobile Edge-to-Edge Bleed:** Uses `margin-inline: -1.25rem; padding-inline: 1.25rem;` so users can swipe smoothly to the screen edges.
- **No Halo Artifacts:** Active state uses a single clean `1.5px solid var(--gold-primary)` border without redundant layered box-shadows.

---

### 4.3 Mobile Bottom Sheet System (`.modal-backdrop` & `.modal-window`)

On mobile (`@media (max-width: 640px)`), every modal window transitions into a bottom sheet docking to the bottom of the screen:

```
+------------------------------------+
|            Dimmed Backdrop         |
|                                    |
+------------------------------------+
|        [====== DRAG HANDLE ======] |  <-- 48x5px grab pill (Tap / Pull down)
|  [Dish Img]  Dish Title    €14.99  |  <-- Full width (No 'X' close button)
|  Item description...               |
+------------------------------------+
|  1. Choose Fresh Salads (Max 4)    |
|  [X] Crisp Lettuce                 |
|  [ ] Pickled Cabbage               |
|                                    |
|  2. Choose House Sauce *           |
|  (o) Signature Garlic Toum         |
+------------------------------------+
| [- 1 +]    [Add to Bag • €14.99]   |  <-- Sticky Bottom Action Bar
+------------------------------------+
```

#### CSS Rules for Mobile Bottom Sheets:

```css
@media (max-width: 640px) {
  /* 1. Backdrop alignment */
  .modal-backdrop {
    align-items: flex-end !important;
    justify-content: center !important;
    padding: 0 !important;
  }

  /* 2. Window container */
  .modal-window,
  .service-mode-window,
  .item-customizer-window {
    width: 100% !important;
    max-width: 100% !important;
    max-height: 88vh !important;
    margin: 0 !important;
    border-radius: 24px 24px 0 0 !important;
    border-top: 1.5px solid var(--gold-border) !important;
    transform: translateY(100%) scale(1) !important;
    transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1) !important;
  }

  .modal-backdrop.active .modal-window {
    transform: translateY(0) scale(1) !important;
  }

  /* 3. Close Button Removal on Mobile */
  .modal-window .modal-close-btn,
  .cart-drawer-panel .cart-drawer-close-btn {
    display: none !important;
  }

  /* 4. Touch Drag Handle */
  .modal-window .drawer-drag-handle,
  .cart-drawer-panel .drawer-drag-handle {
    display: block !important;
    width: 48px !important;
    height: 5px !important;
    border-radius: 999px !important;
    background: rgba(255, 255, 255, 0.35) !important;
    margin: 0.75rem auto 0.45rem !important;
    cursor: pointer !important;
    position: relative !important;
  }

  /* 40px+ Expanded Touch Zone for Easy Tapping */
  .modal-window .drawer-drag-handle::before,
  .cart-drawer-panel .drawer-drag-handle::before {
    content: '' !important;
    position: absolute !important;
    top: -12px !important;
    bottom: -12px !important;
    left: -24px !important;
    right: -24px !important;
  }
}
```

---

### 4.4 Dismissal Gestures in JavaScript

In [`js/app.js`](file:///c:/Users/Surya%20Teja%20S/OneDrive/Documents/Projects/project%20lezzetli/js/app.js), bottom sheets support 4 simultaneous dismissal methods:

1. **Handle Tap:** Clicking/tapping `.drawer-drag-handle` calls `closeAllModals()`.
2. **Touch Swipe-Down:** Swiping down by `> 35px` on the handle triggers `closeAllModals()`.
3. **Backdrop Click:** Clicking outside the sheet container closes the modal.
4. **Keyboard Accessibility:** Pressing <kbd>Esc</kbd> or <kbd>Enter</kbd>/<kbd>Space</kbd> on the handle dismisses the modal.

```javascript
// Bottom sheet handle interaction
const dragHandles = document.querySelectorAll('.drawer-drag-handle');
dragHandles.forEach(handle => {
  handle.setAttribute('role', 'button');
  handle.setAttribute('tabindex', '0');
  handle.setAttribute('aria-label', 'Dismiss sheet');
  
  // Tap / Click dismiss
  handle.addEventListener('click', () => closeAllModals());

  // Keyboard dismiss
  handle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeAllModals();
    }
  });

  // Touch swipe-down gesture
  let touchStartY = 0;
  let touchEndY = 0;

  handle.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  handle.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      touchEndY = e.touches[0].clientY;
    }
  }, { passive: true });

  handle.addEventListener('touchend', () => {
    if (touchEndY > 0 && touchEndY - touchStartY > 35) {
      closeAllModals();
    }
    touchStartY = 0;
    touchEndY = 0;
  });
});
```

---

### 4.5 Service Mode Selector Modal (`#serviceModeModal`)

Coordinates customer fulfillment mode before entering the order flow:

- **Collection Option:** 15–20 mins prep, €1.00 min spend, in-restaurant pickup at Limerick Lane.
- **Home Delivery Option:** 35–45 mins prep, €12.00 min spend, €3.00 delivery fee.
- **Storage:** Stored in `orderState.fulfillment` ('collection' | 'delivery') and `orderState.hasConfirmedMode = true`.

---

### 4.6 Item Customizer Modal (`#itemCustomizerModal`)

Allows granular dish personalization before adding to bag:

- **Section 1: Fresh Salads (Multi-select, Max 4):**
  - Crisp Lettuce, Sliced Red Onions, Pickled Red Cabbage, Pickled Green Peppers, Fresh Tomatoes, Cucumber Rounds.
- **Section 2: House Sauce (Single-select, Required):**
  - Signature Garlic Toum, Fiery House Chilli, Mix Garlic & Chilli, Cool Mint Yogurt, Tahini, No Sauce.
- **Section 3: Extra Add-ons (Checkbox with Price):**
  - Extra Grilled Meat (+€3.50), Feta Cheese Crumbles (+€1.50), Clay Oven Naan (+€2.00), Hummus Pot (+€2.50).
- **Sticky Footer Action:** Stepper (`-` `qty` `+`) and dynamic `Add to Bag • €XX.XX` button.

---

### 4.7 Order Bag Drawer (`#orderDrawer`) & Cart Calculation Engine

A slide-over right panel (480px on desktop) and bottom sheet (88vh on mobile):

- **Line Item Key Generator:** Unique hash based on modifiers:
  ```javascript
  const modKey = `${dishId}_${salads.sort().join('-')}_${sauce}_${addons.sort().join('-')}`;
  ```
- **Fulfillment Segmented Control:** Allows instant switching between Collection & Delivery directly in the bag.
- **Promo Code Engine:**
  - Code `LEZZETLI10` applies a **10% discount** on food subtotal.
- **Fee Matrix:**
  - Subtotal = Sum of (Item Unit Price × Quantity)
  - Delivery Fee = €3.00 (if delivery selected)
  - Packaging / Service Fee = €0.75
  - Discount = Subtotal × 10% (if promo valid)
  - Final Total = Subtotal - Discount + Delivery Fee + Packaging Fee

---

### 4.8 Persistent Floating Order Summary Tray (`.floating-order-tray`)

- Appears automatically when `totalCartCount > 0`.
- Docked at bottom-center of the screen on desktop (`bottom: 24px`) and above the mobile navigation bar (`bottom: 84px`).
- Shows total quantity pill, subtotal, and "View Bag" CTA.

---

### 4.9 Table Reservation Drawer (`#reservationModal`)

Replaces legacy external redirect dialogs with an integrated reservation form:
- Number of Guests: 1 to 8+ guests.
- Date picker with minimum today's date restriction.
- Preferred time slot dropdown (5:00 PM to 10:30 PM).
- Contact details (Name and Irish mobile phone format `08X...`).
- Instant phone call fallback link (`tel:045494056`) for parties larger than 8.

---

## 5. Accessibility (a11y) & UX Checklist

1. **Color Contrast:**
   - Dark theme basmati ivory on charcoal: **15.2:1** (Exceeds WCAG AAA).
   - Light theme dark coffee on white card: **19.5:1** (Exceeds WCAG AAA).
   - Price tags in light mode: White pill with dark coffee text: **19.5:1**.
2. **Touch Targets:** Minimum 44×44px interactive area for all buttons, tabs, quantity steppers, and drag handles.
3. **Semantic Hierarchy:** Single `<h1>` on page, nested `<h2>` and `<h3>` tags with explicit IDs matching `aria-labelledby`.
4. **Modal Dialog Attributes:** Every modal container utilizes `role="dialog"`, `aria-modal="true"`, and traps focus.
5. **No External Framework Dependencies:** Built with pure native Web APIs for sub-50ms interaction response.

---

## 6. Deployment & CI/CD Guide

- **Platform:** Vercel (Hobby Tier).
- **Trigger:** Automated on `git push origin main`.
- **Git Author Requirement:** Commits must be authored by the verified repository owner:
  ```bash
  git config user.name "SuryatejaS-UX"
  git config user.email "suryateja.shankapally@gmail.com"
  ```
- **Local Testing:** Open `index.html` directly in browser or run `npx serve ./` on port 3000.
