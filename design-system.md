# Lezzetli Design System & Token Specification

**Brand Identity:** Lezzetli — Middle Eastern Charcoal Grills & Authentic Desi Cuisine  
**Location:** Unit 3, Limerick Lane, Newbridge, Co. Kildare, Ireland  
**Aesthetic Core:** Warm Luxury Mughal & Ottoman Heritage blended with Contemporary Irish Hospitality  
**Modes Supported:** Dual Theme — Day Dining (Ivory & Saffron Gold) and Evening Dining (Moody Charcoal & Glowing Embers)

---

## 1. Cultural Design Philosophy: "The Indian & Middle Eastern Feel"

To evoke an authentic, premium Indian and Middle Eastern dining ambiance:
1. **The Spice Palette:** Drawing colors directly from culinary staples—saffron threads, turmeric, scorched black cardamom, charred grill charcoal, and tandoori clay.
2. **Atmospheric Lighting:** Evening mode utilizes deep warm charcoals (`#0E0C0A`) with subtle radial gradients evoking glowing embers and tandoor warmth. Light mode utilizes opulent ivory (`#FDFBF7`) and warm sandalwood tones.
3. **Regal Typography:** Sculpted, classical serifs (`Cinzel` and `Playfair Display`) paired with clean modern geometric sans-serifs (`Outfit` / `Plus Jakarta Sans`) to bridge historical dining heritage with effortless mobile readability.
4. **Subtle Sacred Geometry & Arabesque Filigree:** Delicate ornamental dividers, arch motifs (Mehrab curves), and brass/gold accents that feel authentic without overwhelming modern UI clarity.

---

## 2. Design Tokens

### 2.1 Color Tokens

#### Evening Dining (Dark Theme — Default)
```css
:root[data-theme="dark"] {
  /* Surface & Backgrounds */
  --bg-primary: #0E0C0A;          /* Deepest Ember Charcoal */
  --bg-secondary: #171310;        /* Warm Clove Surface */
  --bg-tertiary: #221C17;         /* Elevated Card Surface */
  --bg-glass: rgba(23, 19, 16, 0.85); /* Frost Glass */

  /* Text & Content */
  --text-primary: #FBF8F3;        /* Warm Basmati Ivory */
  --text-secondary: #C8BDB2;      /* Muted Cardamom */
  --text-muted: #8F8377;          /* Subdued Sand */

  /* Brand Accents */
  --gold-primary: #D49A3D;        /* Royal Saffron Gold */
  --gold-hover: #E7AB4D;          /* Radiant Golden Hour */
  --gold-subtle: rgba(212, 154, 61, 0.15); /* Gold Sheen */
  --tandoori-accent: #C84B31;     /* Tandoori Crimson Flare */
  --herbal-green: #3D785D;        /* Fresh Mint / Coriander (Veg) */
  --chili-red: #D63031;           /* Spicy Tag */

  /* Borders & Shadows */
  --border-subtle: rgba(212, 154, 61, 0.2);
  --border-card: rgba(255, 255, 255, 0.08);
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 16px 36px rgba(0, 0, 0, 0.55);
  --glow-gold: 0 0 24px rgba(212, 154, 61, 0.25);
}
```

#### Day Dining (Light Theme)
```css
:root[data-theme="light"] {
  /* Surface & Backgrounds */
  --bg-primary: #FDFBF7;          /* Sandalwood Cream */
  --bg-secondary: #F6F1E7;        /* Soft Kheer Ivory */
  --bg-tertiary: #FFFFFF;         /* Crisp White Card */
  --bg-glass: rgba(253, 251, 247, 0.88);

  /* Text & Content */
  --text-primary: #1C1713;        /* Dark Roasted Coffee */
  --text-secondary: #5E5247;      /* Warm Earth */
  --text-muted: #8E8175;          /* Muted Bark */

  /* Brand Accents */
  --gold-primary: #B27B23;        /* Rich Mustard Gold */
  --gold-hover: #9E6B18;          /* Burnished Brass */
  --gold-subtle: rgba(178, 123, 35, 0.12);
  --tandoori-accent: #B83B22;     /* Terracotta Red */
  --herbal-green: #2B664B;        /* Emerald Sage */
  --chili-red: #C0292B;           /* Chili Pepper */

  /* Borders & Shadows */
  --border-subtle: rgba(178, 123, 35, 0.25);
  --border-card: rgba(0, 0, 0, 0.07);
  --shadow-sm: 0 4px 16px rgba(45, 30, 15, 0.08);
  --shadow-lg: 0 16px 36px rgba(45, 30, 15, 0.14);
  --glow-gold: 0 0 20px rgba(178, 123, 35, 0.2);
}
```

---

## 2. Typography Scale

*   **Primary Display:** `'Cinzel', 'Playfair Display', Georgia, serif`
*   **Body & Interface:** `'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif`

| Token | Size | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--font-display-hero` | 3.5rem (56px) | 1.15 | 700 / 600 | Main Hero Headline |
| `--font-display-h1` | 2.5rem (40px) | 1.2 | 600 | Section Headers (Menu, Dine-In) |
| `--font-display-h2` | 1.875rem (30px) | 1.25 | 600 | Card & Feature Titles |
| `--font-display-h3` | 1.25rem (20px) | 1.3 | 600 | Item Names, Sub-sections |
| `--font-body-lg` | 1.125rem (18px) | 1.6 | 400 | Hero Lead & Story Introductions |
| `--font-body-md` | 1rem (16px) | 1.55 | 400 / 500 | General Content, Item Descriptions |
| `--font-caption` | 0.875rem (14px) | 1.4 | 500 / 600 | Badges, Timestamps, Microcopy |
| `--font-price` | 1.25rem (20px) | 1.2 | 700 | Food Item Pricing |

---

## 3. Motion & Transition Tokens

```css
:root {
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 180ms;
  --duration-normal: 320ms;
  --duration-slow: 550ms;
  --transition-theme: background-color 400ms ease, color 400ms ease, border-color 400ms ease;
}
```

---

## 4. Key Interaction Architecture

1. **External Table Booking Handoff Modal:** Pre-conditions guests with sitting times, group policies (phone for 8+), and Newbridge parking before launching the external reservation platform.
2. **Decoupled Menu Discovery:** Allows frictionless browsing across 6 culinary categories with dietary tags and clear pricing, connecting to Flipdish when the customer is ready to order.
3. **Live Store Status Engine:** Dynamic badge reflecting actual collection (from 4pm) and delivery (from 4:30pm) operating hours.
4. **Mobile Bottom Navigation Dock:** Persistent thumb-reach bar (`Menu`, `Book Table ↗`, `Call`, `Order`).
