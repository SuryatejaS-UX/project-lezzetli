/**
 * LEZZETLI RESTAURANT — CORE APPLICATION LOGIC
 * High-performance vanilla JS powering interactions, theme switching, 
 * menu filtering, external booking handoff, and live opening hour calculations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenuFilters();
  initModals();
  initMobileNav();
  initScrollAnimations();
});

/* ==========================================================================
   1. THEME MANAGEMENT (LIGHT & DARK DUAL THEME)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const drawerThemeToggleBtn = document.getElementById('drawerThemeToggleBtn');
  
  // 1. Check localStorage or system preference
  const savedTheme = localStorage.getItem('lezzetli-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'dark'); // Default dark for luxury evening feel
  applyTheme(initialTheme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('lezzetli-theme', newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Evening Dining (Dark)' : 'Day Dining (Light)'} mode`);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (drawerThemeToggleBtn) drawerThemeToggleBtn.addEventListener('click', toggleTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcons = document.querySelectorAll('.theme-icon-slot');
  
  themeIcons.forEach(iconSlot => {
    if (theme === 'dark') {
      // Show Sun icon (to switch to light)
      iconSlot.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      // Show Moon icon (to switch to dark)
      iconSlot.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  });
}

/* ==========================================================================
   2. REAL-TIME STORE STATUS (DISABLED PER USER SPECIFICATION)
   ========================================================================== */
function initStoreStatus() {
  // Opening status badge completely removed per user request
}

/* ==========================================================================
   3. MENU DATA & INTERACTIVE FILTERING ENGINE
   ========================================================================== */
const MENU_ITEMS = [
  {
    id: 'sultan-kebab',
    name: 'Sultan Kebab Platter',
    category: 'grills',
    price: '€14.99',
    rawPrice: 14.99,
    description: 'Our signature feast: 5 succulent marinated charcoal meats served with crisp salad, clay oven naan, and renowned garlic and chili toum.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    tags: ['Signature', 'Charcoal'],
    isSpicy: true,
    isVeg: false,
    isSignature: true,
    pairing: 'Pairs perfectly with Garlic Toum & Fresh Mint',
    customizable: true,
    salads: ['Crisp Lettuce', 'Sliced Red Onions', 'Pickled Red Cabbage', 'Pickled Green Peppers'],
    sauces: ['Signature Garlic Toum', 'Fiery House Chilli', 'Mix Garlic & Chilli Sauce', 'Cool Mint Yoghurt'],
    addons: [
      { name: 'Fresh Clay Oven Naan', price: 3.00 },
      { name: 'Garlic & Coriander Naan', price: 3.50 },
      { name: 'Chilli Naan', price: 3.50 },
      { name: 'Masala Fries Portion', price: 3.95 }
    ]
  },
  {
    id: 'hyderabadi-biryani',
    name: 'Hyderabadi Dum Chicken Biryani',
    category: 'biryani',
    price: '€13.99',
    rawPrice: 13.99,
    description: 'Authentic slow-dum cooked long-grain fragrant basmati rice layered with tender saffron chicken, caramelized onions, kewra water, and whole roasted spices.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    tags: ['Customer Favorite', 'Authentic Desi'],
    isSpicy: true,
    isVeg: false,
    isSignature: true,
    pairing: 'Served with cool cucumber raita & mirchi ka salan',
    customizable: false
  },
  {
    id: 'chicken-shawarma-large',
    name: 'Chicken Shawarma Gyro Wrap',
    category: 'grills',
    price: '€11.99',
    rawPrice: 11.99,
    description: 'Slow-roasted spit-carved spiced chicken thighs rolled in fresh flatbread with homemade pickles, crispy fries, and rich creamy garlic sauce.',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80',
    tags: ['Bestseller'],
    isSpicy: false,
    isVeg: false,
    isSignature: false,
    pairing: 'Pairs with Masala Fries & Pickled Turnips',
    customizable: true,
    salads: ['Crisp Lettuce', 'Sliced Red Onions', 'Pickled Red Cabbage', 'Pickled Green Peppers'],
    sauces: ['Signature Garlic Toum', 'Fiery House Chilli', 'Mix Garlic & Chilli Sauce', 'Cool Mint Yoghurt'],
    addons: [
      { name: 'Plain Clay Oven Naan', price: 3.00 },
      { name: 'Garlic & Coriander Naan', price: 3.50 },
      { name: 'Chilli Naan', price: 3.50 },
      { name: 'Masala Fries Portion', price: 3.95 }
    ]
  },
  {
    id: 'saag-paneer',
    name: 'Artisanal Saag Paneer',
    category: 'curries',
    price: '€12.99',
    rawPrice: 12.99,
    description: 'Freshly pressed golden paneer cubes slow-simmered in a rich, spiced creamed spinach puree infused with ginger, garlic, and freshly toasted garam masala.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetarian', 'Customer Review 5/5'],
    isSpicy: false,
    isVeg: true,
    isSignature: true,
    pairing: 'Best enjoyed with Butter Tandoori Naan',
    customizable: false
  },
  {
    id: 'chicken-tikka-masala',
    name: 'Tandoori Chicken Tikka Masala',
    category: 'curries',
    price: '€13.49',
    rawPrice: 13.49,
    description: 'Smoky clay-oven roasted chicken breast chunks bathed in an aromatic, velvety tomato, fenugreek, and butter cream sauce.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    tags: ['Mild / Medium'],
    isSpicy: false,
    isVeg: false,
    isSignature: false,
    pairing: 'Complements fragrant Jeera Basmati Rice',
    customizable: false
  },
  {
    id: 'lamb-doner-gyro',
    name: 'Lamb Doner Gyro Wrap',
    category: 'grills',
    price: '€11.99',
    rawPrice: 11.99,
    description: 'Seasoned spiced lamb shavings wrapped in warm fluffy flatbread with crunchy Mediterranean salad, fresh tomatoes, and house signature sauces.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    tags: ['Takeaway Classic'],
    isSpicy: false,
    isVeg: false,
    isSignature: false,
    pairing: 'Served with signature house chili sauce',
    customizable: true,
    salads: ['Crisp Lettuce', 'Sliced Red Onions', 'Pickled Red Cabbage', 'Pickled Green Peppers'],
    sauces: ['Signature Garlic Toum', 'Fiery House Chilli', 'Mix Garlic & Chilli Sauce', 'Cool Mint Yoghurt'],
    addons: [
      { name: 'Plain Clay Oven Naan', price: 3.00 },
      { name: 'Garlic & Coriander Naan', price: 3.50 },
      { name: 'Chilli Naan', price: 3.50 },
      { name: 'Masala Fries Portion', price: 3.95 }
    ]
  },
  {
    id: 'mix-kebab-large',
    name: 'Mix Kebab Grand Platter',
    category: 'grills',
    price: '€14.99',
    rawPrice: 14.99,
    description: 'A generous combination of chicken shawarma, grilled lamb shish, and tender doner meat over spiced rice or chips with fresh naan.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    tags: ['Chef Special'],
    isSpicy: true,
    isVeg: false,
    isSignature: true,
    pairing: 'Includes garlic toum, chili salsa & salad',
    customizable: true,
    salads: ['Crisp Lettuce', 'Sliced Red Onions', 'Pickled Red Cabbage', 'Pickled Green Peppers'],
    sauces: ['Signature Garlic Toum', 'Fiery House Chilli', 'Mix Garlic & Chilli Sauce', 'Cool Mint Yoghurt'],
    addons: [
      { name: 'Plain Clay Oven Naan', price: 3.00 },
      { name: 'Garlic & Coriander Naan', price: 3.50 },
      { name: 'Chilli Naan', price: 3.50 },
      { name: 'Masala Fries Portion', price: 3.95 }
    ]
  },
  {
    id: 'peri-peri-wings',
    name: 'Charcoal Peri Peri Wings (6 Pcs)',
    category: 'starters',
    price: '€7.99',
    rawPrice: 7.99,
    description: 'Crispy fire-grilled chicken wings marinated for 24 hours in our fiery zesty peri-peri glaze. (Free on takeaway orders over €30!)',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    tags: ['Offer Deal', 'Spicy'],
    isSpicy: true,
    isVeg: false,
    isSignature: false,
    pairing: 'Cool dip & lime wedge',
    customizable: false
  },
  {
    id: 'garlic-coriander-naan',
    name: 'Fresh Garlic & Coriander Naan',
    category: 'tandoor',
    price: '€3.50',
    rawPrice: 3.50,
    description: 'Traditional leavened dough slapped onto clay tandoor walls, baked golden and brushed with clarified ghee, crushed garlic, and fresh herbs.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    tags: ['Tandoor Baked', 'Vegetarian'],
    isSpicy: false,
    isVeg: true,
    isSignature: false,
    pairing: 'Essential companion to any curry or grill',
    customizable: false
  },
  {
    id: 'lamb-seekh-kebab',
    name: 'Charcoal Lamb Seekh Kebabs',
    category: 'grills',
    price: '€13.99',
    rawPrice: 13.99,
    description: 'Minced Irish lamb blended with chopped mint, coriander, roasted cumin, and green chilies, threaded on skewers and fire-roasted over coals.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    tags: ['Smoky Charcoal'],
    isSpicy: true,
    isVeg: false,
    isSignature: true,
    pairing: 'Served with sliced red onion & mint raita',
    customizable: true,
    salads: ['Crisp Lettuce', 'Sliced Red Onions', 'Pickled Red Cabbage', 'Pickled Green Peppers'],
    sauces: ['Signature Garlic Toum', 'Fiery House Chilli', 'Mix Garlic & Chilli Sauce', 'Cool Mint Yoghurt'],
    addons: [
      { name: 'Plain Clay Oven Naan', price: 3.00 },
      { name: 'Garlic & Coriander Naan', price: 3.50 },
      { name: 'Chilli Naan', price: 3.50 },
      { name: 'Masala Fries Portion', price: 3.95 }
    ]
  },
  {
    id: 'butter-chicken',
    name: 'Old Delhi Butter Chicken (Murgh Makhani)',
    category: 'curries',
    price: '€13.99',
    rawPrice: 13.99,
    description: 'Succulent tandoori-seared chicken morsels simmered in a silken, mild tomato-cashew reduction perfumed with roasted kasuri methi.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    tags: ['Family Favorite'],
    isSpicy: false,
    isVeg: false,
    isSignature: false,
    pairing: 'Pairs deliciously with Peshwari or Garlic Naan',
    customizable: false
  },
  {
    id: 'falafel-mezze-platter',
    name: 'Crispy Falafel & Hummus Mezze',
    category: 'starters',
    price: '€9.99',
    rawPrice: 9.99,
    description: 'House-ground chickpea and fresh herb falafels fried crisp, served atop silky tahini hummus, kalamata olives, and warm toasted pita.',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegan', 'Vegetarian'],
    isSpicy: false,
    isVeg: true,
    isSignature: false,
    pairing: 'Extra Virgin Olive Oil & Zaatar',
    customizable: false
  },
  {
    id: 'tandoori-half-chicken',
    name: 'Tandoori Half Chicken Sizzler',
    category: 'tandoor',
    price: '€12.99',
    rawPrice: 12.99,
    description: 'Bone-in tender half chicken steeped in mustard oil, Kashmiri chili, and ginger-garlic yogurt, roasted in the tandoor and served on a sizzling hot plate.',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    tags: ['Sizzler Special'],
    isSpicy: true,
    isVeg: false,
    isSignature: true,
    pairing: 'Served with grilled bell peppers & charred lemon',
    customizable: false
  },
  {
    id: 'dal-makhani',
    name: 'Slow-Simmered Dal Makhani',
    category: 'curries',
    price: '€11.50',
    rawPrice: 11.50,
    description: 'Whole black urad lentils and kidney beans slow-simmered overnight with fresh tomatoes, cream, and churned butter for an incomparable velvety finish.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetarian', 'Slow Cooked'],
    isSpicy: false,
    isVeg: true,
    isSignature: false,
    pairing: 'Best served with steaming Jeera Rice',
    customizable: false
  }
];

function initMenuFilters() {
  const menuGrid = document.getElementById('menuGrid');
  const categoryButtons = document.querySelectorAll('.category-tab-btn');
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('menuSearchInput');
  const resultsCounter = document.getElementById('menuResultsCount');

  let activeCategory = 'all';
  let activeDietary = 'all';
  let searchQuery = '';

  function renderMenu() {
    if (!menuGrid) return;

    const filtered = MENU_ITEMS.filter(item => {
      // Category Match
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Dietary Match
      let matchesDietary = true;
      if (activeDietary === 'veg') matchesDietary = item.isVeg;
      if (activeDietary === 'spicy') matchesDietary = item.isSpicy;
      if (activeDietary === 'signature') matchesDietary = item.isSignature;

      // Search Match
      const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                            item.description.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesDietary && matchesSearch;
    });

    // Update Counter
    if (resultsCounter) {
      resultsCounter.textContent = `Showing ${filtered.length} dish${filtered.length === 1 ? '' : 'es'}`;
    }

    if (filtered.length === 0) {
      menuGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <h3 style="font-family: var(--font-display); color: var(--text-primary); margin-bottom: 0.5rem;">No dishes found matching your selection</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Try clearing your filters or searching for something else.</p>
          <button id="resetFiltersBtn" class="btn btn-gold btn-sm">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          activeDietary = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          categoryButtons.forEach(b => b.classList.toggle('active', b.dataset.category === 'all'));
          filterPills.forEach(p => p.classList.toggle('active', p.dataset.dietary === 'all'));
          renderMenu();
        });
      }
      return;
    }

    menuGrid.innerHTML = filtered.map(item => {
      // Calculate total in cart for this dish across all variations
      const itemsForDish = Object.values(orderCart).filter(ci => ci.dishId === item.id);
      const inCartQty = itemsForDish.reduce((sum, ci) => sum + ci.qty, 0);

      return `
      <article class="dish-card" data-id="${item.id}">
        <div class="dish-card-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="dish-price-badge">${item.price}</div>
          <div class="dish-tag-badges">
            ${item.isVeg ? `
              <span class="badge-tag badge-veg">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 4 13a8 8 0 0 1 8-8c5.5 0 8 2.5 8 8a7 7 0 0 1-7 7z"/><path d="M11 20c0-4 2-7 6-9"/></svg>
                <span>Veg</span>
              </span>
            ` : ''}
            ${item.isSpicy ? `
              <span class="badge-tag badge-spicy">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6c0-2-2-4-4-4-1 2-2 3-4 4-4 2-7 6-7 10 0 4 3 6 7 6s9-3 9-9c0-3-1-5-1-7z"/></svg>
                <span>Spicy</span>
              </span>
            ` : ''}
            ${item.isSignature ? `
              <span class="badge-tag badge-gold">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>Signature</span>
              </span>
            ` : ''}
          </div>
        </div>
        <div class="dish-card-body">
          <div class="dish-card-header">
            <h3 class="dish-name">${item.name}</h3>
          </div>
          <p class="dish-desc">${item.description}</p>
          <div class="dish-card-footer">
            <span class="dish-pairing">${item.pairing}</span>
            <div class="dish-action-slot">
              ${item.customizable ? `
                <button type="button" class="dish-add-btn dish-customize-btn" data-id="${item.id}" aria-label="Customize ${item.name}">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  <span>${inCartQty > 0 ? `Add (${inCartQty})` : 'Customize'}</span>
                </button>
              ` : (inCartQty > 0 ? `
                <div class="dish-qty-stepper" data-id="${item.id}">
                  <button type="button" class="stepper-btn btn-stepper-minus" data-id="${item.id}" aria-label="Decrease ${item.name} quantity">−</button>
                  <span class="stepper-count">${inCartQty}</span>
                  <button type="button" class="stepper-btn btn-stepper-plus" data-id="${item.id}" aria-label="Increase ${item.name} quantity">+</button>
                </div>
              ` : `
                <button type="button" class="dish-add-btn" data-id="${item.id}" aria-label="Add ${item.name} to order bag">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  <span>Add</span>
                </button>
              `)}
            </div>
          </div>
        </div>
      </article>
      `;
    }).join('');

    // Attach click listeners to new buttons & steppers
    attachDishCardListeners();
  }

  // Category Tab Click
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'all';
      renderMenu();
    });
  });

  // Dietary Pill Click
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeDietary = pill.dataset.dietary || 'all';
      renderMenu();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderMenu();
    });
  }

  // Initial render
  renderMenu();
}

/* ==========================================================================
   3B. ORDER SERVICE STATE & CART MANAGEMENT
   ========================================================================== */
const orderState = {
  fulfillment: 'collection', // 'collection' or 'delivery'
  storeName: 'Lezzetli Newbridge',
  storeAddress: 'Unit 3, Limerick Lane, Newbridge, Co. Kildare, W12 R274',
  hasConfirmedMode: false
};

const orderCart = {};
let pendingOrderAction = null;

// Customizer Working State
let currentCustomizingItem = null;
let customizerQty = 1;
let selectedSalads = [];
let selectedSauce = '';
let selectedAddons = [];

function handleDishAction(dishId) {
  const item = MENU_ITEMS.find(m => m.id === dishId);
  if (!item) return;

  if (!orderState.hasConfirmedMode) {
    openServiceModeModal(() => handleDishAction(dishId));
    return;
  }

  if (item.customizable) {
    openItemCustomizer(item);
  } else {
    addToCartSimple(item);
  }
}

function addToCartSimple(item) {
  const lineId = item.id;
  if (!orderCart[lineId]) {
    orderCart[lineId] = {
      lineId: lineId,
      dishId: item.id,
      name: item.name,
      unitPrice: item.rawPrice,
      rawPrice: item.rawPrice,
      priceFormatted: item.price,
      qty: 1,
      image: item.image,
      modifiers: []
    };
    showToast(`Added "${item.name}" to your order bag`);
  } else {
    orderCart[lineId].qty += 1;
  }

  syncCartUI();
}

function updateCartLineQty(lineId, delta) {
  if (!orderCart[lineId]) return;

  orderCart[lineId].qty += delta;
  if (orderCart[lineId].qty <= 0) {
    const itemName = orderCart[lineId].name;
    delete orderCart[lineId];
    showToast(`Removed "${itemName}" from your order bag`);
  }

  syncCartUI();
}

function getCartTotals() {
  const items = Object.values(orderCart);
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
  const discount = subtotal * 0.20; // 20% online discount
  const total = Math.max(0, subtotal - discount);

  return { totalCount, subtotal, discount, total, items };
}

function syncCartUI() {
  const { totalCount, subtotal } = getCartTotals();

  // 1. Update In-Card Steppers / Buttons
  document.querySelectorAll('.dish-card').forEach(card => {
    const dishId = card.dataset.id;
    const actionSlot = card.querySelector('.dish-action-slot');
    if (!actionSlot) return;

    const item = MENU_ITEMS.find(m => m.id === dishId);
    if (!item) return;

    const itemsForDish = Object.values(orderCart).filter(ci => ci.dishId === dishId);
    const inCartQty = itemsForDish.reduce((sum, ci) => sum + ci.qty, 0);

    if (item.customizable) {
      actionSlot.innerHTML = `
        <button type="button" class="dish-add-btn dish-customize-btn" data-id="${dishId}" aria-label="Customize ${item.name}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>${inCartQty > 0 ? `Add (${inCartQty})` : 'Customize'}</span>
        </button>
      `;
    } else if (inCartQty > 0) {
      actionSlot.innerHTML = `
        <div class="dish-qty-stepper" data-id="${dishId}">
          <button type="button" class="stepper-btn btn-stepper-minus" data-id="${dishId}" aria-label="Decrease quantity">−</button>
          <span class="stepper-count">${inCartQty}</span>
          <button type="button" class="stepper-btn btn-stepper-plus" data-id="${dishId}" aria-label="Increase quantity">+</button>
        </div>
      `;
    } else {
      actionSlot.innerHTML = `
        <button type="button" class="dish-add-btn" data-id="${dishId}" aria-label="Add ${item.name} to order bag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Add</span>
        </button>
      `;
    }
  });

  // Re-attach card button listeners
  attachDishCardListeners();

  // 2. Update Floating Order Tray
  const floatingTray = document.getElementById('floatingOrderTray');
  const trayBadge = document.getElementById('trayBadgeCount');
  const trayTotal = document.getElementById('trayTotalAmount');

  if (floatingTray) {
    if (totalCount > 0) {
      floatingTray.classList.add('active');
      if (trayBadge) trayBadge.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      if (trayTotal) trayTotal.textContent = `€${subtotal.toFixed(2)}`;
    } else {
      floatingTray.classList.remove('active');
    }
  }

  // 3. Mirror live cart count to Header, Mobile Dock badge and Drawer count pill
  const headerOrderBtnText = document.querySelector('.site-header .trigger-order-now span');
  if (headerOrderBtnText) {
    headerOrderBtnText.textContent = totalCount > 0 ? `Order (${totalCount})` : 'Order Online';
  }

  const dockBadge = document.getElementById('dockBadgeCount');
  if (dockBadge) {
    if (totalCount > 0) {
      dockBadge.style.display = 'inline-flex';
      dockBadge.textContent = totalCount;
    } else {
      dockBadge.style.display = 'none';
    }
  }

  const drawerCountPill = document.getElementById('orderDrawerCountPill');
  if (drawerCountPill) {
    drawerCountPill.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
  }

  // 4. Update Order Drawer Content
  renderOrderModalCart();
}

function attachDishCardListeners() {
  const addBtns = document.querySelectorAll('.dish-add-btn');
  addBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      handleDishAction(btn.dataset.id);
    };
  });

  const plusBtns = document.querySelectorAll('.dish-card .btn-stepper-plus');
  plusBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      handleDishAction(btn.dataset.id);
    };
  });

  const minusBtns = document.querySelectorAll('.dish-card .btn-stepper-minus');
  minusBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      updateCartLineQty(btn.dataset.id, -1);
    };
  });
}

/* ==========================================================================
   3C. SERVICE MODE MODAL (COLLECT VS. DELIVERY)
   ========================================================================== */
function openServiceModeModal(actionAfterConfirm = null) {
  pendingOrderAction = actionAfterConfirm;
  const modal = document.getElementById('serviceModeModal');
  if (modal) {
    openModal(modal);
  }
}

function initServiceModeModal() {
  const btnCollect = document.getElementById('btnSelectCollect');
  const btnDelivery = document.getElementById('btnSelectDelivery');
  const btnConfirm = document.getElementById('btnConfirmServiceMode');
  const closeBtn = document.getElementById('serviceModeCloseBtn');

  if (btnCollect && btnDelivery) {
    btnCollect.onclick = () => {
      btnCollect.classList.add('active');
      btnDelivery.classList.remove('active');
      orderState.fulfillment = 'collection';
    };
    btnDelivery.onclick = () => {
      btnDelivery.classList.add('active');
      btnCollect.classList.remove('active');
      orderState.fulfillment = 'delivery';
    };
  }

  if (btnConfirm) {
    btnConfirm.onclick = () => {
      orderState.hasConfirmedMode = true;
      closeAllModals();
      syncDrawerFulfillmentTabs();
      showToast(`Ordering via ${orderState.fulfillment === 'collection' ? 'Collection (Newbridge Store)' : 'Home Delivery'}`);
      if (typeof pendingOrderAction === 'function') {
        const action = pendingOrderAction;
        pendingOrderAction = null;
        action();
      } else {
        const menuEl = document.getElementById('menu');
        if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }

  if (closeBtn) {
    closeBtn.onclick = () => closeAllModals();
  }
}

function syncDrawerFulfillmentTabs() {
  const tabCol = document.getElementById('tabCollection');
  const tabDel = document.getElementById('tabDelivery');
  if (tabCol && tabDel) {
    if (orderState.fulfillment === 'delivery') {
      tabDel.classList.add('active');
      tabDel.setAttribute('aria-selected', 'true');
      tabCol.classList.remove('active');
      tabCol.setAttribute('aria-selected', 'false');
    } else {
      tabCol.classList.add('active');
      tabCol.setAttribute('aria-selected', 'true');
      tabDel.classList.remove('active');
      tabDel.setAttribute('aria-selected', 'false');
    }
  }
}

/* ==========================================================================
   3D. ITEM CUSTOMIZATION MODAL (SALADS, SAUCES & ADD-ONS)
   ========================================================================== */
function openItemCustomizer(item) {
  currentCustomizingItem = item;
  customizerQty = 1;
  // Default selections: first 2 salads, first sauce, no addons
  selectedSalads = (item.salads && item.salads.length > 0) ? item.salads.slice(0, 2) : [];
  selectedSauce = (item.sauces && item.sauces.length > 0) ? item.sauces[0] : '';
  selectedAddons = [];

  const modal = document.getElementById('itemCustomizerModal');
  const imgEl = document.getElementById('customizerItemImage');
  const nameEl = document.getElementById('customizerItemName');
  const descEl = document.getElementById('customizerItemDesc');
  const basePriceEl = document.getElementById('customizerBasePrice');

  if (imgEl) imgEl.src = item.image;
  if (nameEl) nameEl.textContent = item.name;
  if (descEl) descEl.textContent = item.description;
  if (basePriceEl) basePriceEl.textContent = item.price;

  renderCustomizerOptions();
  updateCustomizerFooter();
  openModal(modal);
}

function renderCustomizerOptions() {
  if (!currentCustomizingItem) return;

  // 1. Salads (Checkbox style, up to 4)
  const saladsList = document.getElementById('saladOptionsList');
  if (saladsList && currentCustomizingItem.salads) {
    saladsList.innerHTML = currentCustomizingItem.salads.map(salad => {
      const isSelected = selectedSalads.includes(salad);
      return `
        <button type="button" class="mod-card ${isSelected ? 'selected' : ''}" data-salad="${salad}">
          <div class="mod-card-label">
            <span class="mod-card-icon">${isSelected ? '✓' : ''}</span>
            <span>${salad}</span>
          </div>
        </button>
      `;
    }).join('');

    saladsList.querySelectorAll('.mod-card').forEach(card => {
      card.onclick = () => {
        const salad = card.dataset.salad;
        if (selectedSalads.includes(salad)) {
          selectedSalads = selectedSalads.filter(s => s !== salad);
        } else {
          if (selectedSalads.length >= 4) {
            showToast('You can choose up to 4 fresh salads');
            return;
          }
          selectedSalads.push(salad);
        }
        renderCustomizerOptions();
      };
    });
  }

  // 2. Sauces (Radio style, select 1)
  const saucesList = document.getElementById('sauceOptionsList');
  if (saucesList && currentCustomizingItem.sauces) {
    saucesList.innerHTML = currentCustomizingItem.sauces.map(sauce => {
      const isSelected = selectedSauce === sauce;
      return `
        <button type="button" class="mod-card is-radio ${isSelected ? 'selected' : ''}" data-sauce="${sauce}">
          <div class="mod-card-label">
            <span class="mod-card-icon">${isSelected ? '●' : ''}</span>
            <span>${sauce}</span>
          </div>
        </button>
      `;
    }).join('');

    saucesList.querySelectorAll('.mod-card').forEach(card => {
      card.onclick = () => {
        selectedSauce = card.dataset.sauce;
        renderCustomizerOptions();
      };
    });
  }

  // 3. Add-ons (Checkbox style with price)
  const addonsList = document.getElementById('addonOptionsList');
  if (addonsList && currentCustomizingItem.addons) {
    addonsList.innerHTML = currentCustomizingItem.addons.map(addon => {
      const isSelected = selectedAddons.some(a => a.name === addon.name);
      return `
        <button type="button" class="mod-card ${isSelected ? 'selected' : ''}" data-addon="${addon.name}">
          <div class="mod-card-label">
            <span class="mod-card-icon">${isSelected ? '✓' : ''}</span>
            <span>${addon.name}</span>
          </div>
          <span class="mod-card-price">+€${addon.price.toFixed(2)}</span>
        </button>
      `;
    }).join('');

    addonsList.querySelectorAll('.mod-card').forEach(card => {
      card.onclick = () => {
        const addonName = card.dataset.addon;
        const addonObj = currentCustomizingItem.addons.find(a => a.name === addonName);
        if (!addonObj) return;

        if (selectedAddons.some(a => a.name === addonName)) {
          selectedAddons = selectedAddons.filter(a => a.name !== addonName);
        } else {
          selectedAddons.push(addonObj);
        }
        renderCustomizerOptions();
        updateCustomizerFooter();
      };
    });
  }
}

function updateCustomizerFooter() {
  if (!currentCustomizingItem) return;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitTotal = currentCustomizingItem.rawPrice + addonsTotal;
  const grandTotal = unitTotal * customizerQty;

  const qtyDisplay = document.getElementById('customizerQtyDisplay');
  const priceDisplay = document.getElementById('customizerFinalPrice');
  if (qtyDisplay) qtyDisplay.textContent = customizerQty;
  if (priceDisplay) priceDisplay.textContent = `€${grandTotal.toFixed(2)}`;
}

function initCustomizerEvents() {
  const minusBtn = document.getElementById('customizerQtyMinus');
  const plusBtn = document.getElementById('customizerQtyPlus');
  const addBtn = document.getElementById('customizerAddToBagBtn');
  const closeBtn = document.getElementById('itemCustomizerCloseBtn');

  if (minusBtn) {
    minusBtn.onclick = () => {
      if (customizerQty > 1) {
        customizerQty -= 1;
        updateCustomizerFooter();
      }
    };
  }

  if (plusBtn) {
    plusBtn.onclick = () => {
      customizerQty += 1;
      updateCustomizerFooter();
    };
  }

  if (addBtn) {
    addBtn.onclick = () => {
      if (!currentCustomizingItem) return;
      if (!selectedSauce && currentCustomizingItem.sauces && currentCustomizingItem.sauces.length > 0) {
        showToast('Please select a house sauce');
        return;
      }

      const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
      const unitPrice = currentCustomizingItem.rawPrice + addonsTotal;

      const modifiers = [];
      if (selectedSalads.length > 0) {
        modifiers.push(`Salads: ${selectedSalads.join(', ')}`);
      }
      if (selectedSauce) {
        modifiers.push(`Sauce: ${selectedSauce}`);
      }
      selectedAddons.forEach(a => {
        modifiers.push(`+ ${a.name}`);
      });

      // Construct unique line item key based on chosen modifiers
      const modKey = `${currentCustomizingItem.id}_${selectedSalads.slice().sort().join('-')}_${selectedSauce}_${selectedAddons.map(a => a.name).sort().join('-')}`;

      if (orderCart[modKey]) {
        orderCart[modKey].qty += customizerQty;
      } else {
        orderCart[modKey] = {
          lineId: modKey,
          dishId: currentCustomizingItem.id,
          name: currentCustomizingItem.name,
          unitPrice: unitPrice,
          rawPrice: unitPrice,
          priceFormatted: `€${unitPrice.toFixed(2)}`,
          qty: customizerQty,
          image: currentCustomizingItem.image,
          modifiers: modifiers
        };
      }

      showToast(`Added ${customizerQty}x "${currentCustomizingItem.name}" to your bag`);
      closeAllModals();
      syncCartUI();
    };
  }

  if (closeBtn) {
    closeBtn.onclick = () => closeAllModals();
  }
}

/* ==========================================================================
   4. MODALS, CART DRAWER & TABLE RESERVATIONS
   ========================================================================== */
function initModals() {
  const reservationModal = document.getElementById('reservationModal');
  const orderDrawer = document.getElementById('orderDrawer');
  const closeButtons = document.querySelectorAll('.modal-close-btn, .cart-drawer-close-btn, .modal-backdrop, .cart-drawer-backdrop');

  // Initialize service mode & customizer modals
  initServiceModeModal();
  initCustomizerEvents();

  // Triggers for Reservation Modal
  const bookTableButtons = document.querySelectorAll('.trigger-book-table');
  bookTableButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(reservationModal);
    });
  });

  // Triggers for Online Takeaway Order Drawer
  const orderNowButtons = document.querySelectorAll('.trigger-order-now');
  orderNowButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!orderState.hasConfirmedMode) {
        openServiceModeModal(() => openOrderModal());
      } else {
        openOrderModal();
      }
    });
  });

  // Close handlers
  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close-btn') || btn.classList.contains('cart-drawer-close-btn')) {
        closeAllModals();
      }
    });
  });

  // Prevent closing when clicking inside modal window or drawer panel
  const modalPanels = document.querySelectorAll('.modal-window, .cart-drawer-panel');
  modalPanels.forEach(panel => {
    panel.addEventListener('click', e => e.stopPropagation());
  });

  // Mobile bottom sheet drag handle tap & swipe-down dismiss
  const dragHandles = document.querySelectorAll('.drawer-drag-handle');
  dragHandles.forEach(handle => {
    handle.setAttribute('role', 'button');
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('aria-label', 'Dismiss sheet');
    handle.title = 'Tap or drag down to dismiss';
    
    // Tap to dismiss
    handle.addEventListener('click', () => closeAllModals());

    // Keyboard dismiss
    handle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeAllModals();
      }
    });

    // Touch swipe down gesture dismiss
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

  // ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // Direct Table Reservation Submission
  const externalBookingForm = document.getElementById('externalBookingForm');
  if (externalBookingForm) {
    externalBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const partySize = document.getElementById('resPartySize').value;
      const resDate = document.getElementById('resDate').value;
      const resTime = document.getElementById('resTime').value;
      const resName = document.getElementById('resName').value;
      const resPhone = document.getElementById('resPhone').value;

      showToast(`Reservation request received for ${partySize} guests! Our host will phone ${resPhone} to confirm.`);
      closeAllModals();
      externalBookingForm.reset();
    });
  }

  // Fulfillment Toggle in Order Drawer
  const fulfillmentBtns = document.querySelectorAll('.fulfillment-segmented .seg-btn');
  fulfillmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fulfillmentBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      orderState.fulfillment = btn.dataset.type || 'collection';
      renderOrderModalCart();
    });
  });

  // Floating Order Tray View & Checkout
  const floatingOrderTray = document.getElementById('floatingOrderTray');
  const trayViewOrderBtn = document.getElementById('trayViewOrderBtn');

  if (floatingOrderTray) {
    floatingOrderTray.addEventListener('click', (e) => {
      e.preventDefault();
      openOrderModal();
    });
  }

  if (trayViewOrderBtn) {
    trayViewOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openOrderModal();
    });
  }
}

// Accessibility: Focus Management & Keyboard Trap
let activeModalTrigger = null;
let activeTrapKeydownHandler = null;

function openModal(modalEl) {
  if (!modalEl) return;
  activeModalTrigger = document.activeElement;
  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';

  const focusable = modalEl.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  if (focusable.length > 0) {
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    setTimeout(() => firstFocusable.focus(), 60);

    if (activeTrapKeydownHandler) {
      modalEl.removeEventListener('keydown', activeTrapKeydownHandler);
    }

    activeTrapKeydownHandler = function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };

    modalEl.addEventListener('keydown', activeTrapKeydownHandler);
  }
}

function openOrderModal() {
  const orderDrawer = document.getElementById('orderDrawer');
  syncDrawerFulfillmentTabs();
  renderOrderModalCart();
  openModal(orderDrawer);
}

function renderOrderModalCart() {
  const { totalCount, subtotal, discount, total, items } = getCartTotals();
  const cartList = document.getElementById('orderCartItemsList');
  const costBreakdown = document.getElementById('orderCostBreakdown');
  const subtotalEl = document.getElementById('breakdownSubtotal');
  const discountEl = document.getElementById('breakdownDiscount');
  const totalEl = document.getElementById('breakdownTotal');
  const checkoutBtn = document.getElementById('orderModalCheckoutBtn');
  const orderModalTitle = document.getElementById('orderModalTitle');

  if (!cartList) return;

  if (totalCount === 0) {
    cartList.innerHTML = `
      <div class="cart-empty-message">
        <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.35rem;">Your order bag is empty</p>
        <p style="font-size: 0.8125rem; color: var(--text-muted);">Explore our menu to add sizzling charcoal grills, kebabs, and curries.</p>
        <button type="button" class="btn btn-outline-gold btn-sm" id="emptyCartBrowseBtn" style="margin-top: 0.85rem;">Browse Menu</button>
      </div>
    `;
    if (costBreakdown) costBreakdown.style.display = 'none';
    if (orderModalTitle) orderModalTitle.textContent = 'Your Bag';
    const drawerCountPill = document.getElementById('orderDrawerCountPill');
    if (drawerCountPill) drawerCountPill.textContent = '0 items';

    if (checkoutBtn) {
      checkoutBtn.innerHTML = `
        <span class="checkout-btn-text">Explore Menu</span>
        <svg class="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      `;
      checkoutBtn.onclick = (e) => {
        e.preventDefault();
        closeAllModals();
        const menuSec = document.getElementById('menu');
        if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
      };
    }

    const emptyBrowseBtn = document.getElementById('emptyCartBrowseBtn');
    if (emptyBrowseBtn) {
      emptyBrowseBtn.onclick = () => {
        closeAllModals();
        const menuSec = document.getElementById('menu');
        if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
      };
    }
  } else {
    if (costBreakdown) costBreakdown.style.display = 'flex';
    if (orderModalTitle) orderModalTitle.textContent = 'Your Bag';
    const drawerCountPill = document.getElementById('orderDrawerCountPill');
    if (drawerCountPill) drawerCountPill.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;

    cartList.innerHTML = items.map(item => `
      <div class="cart-item-row" data-line-id="${item.lineId}">
        <div class="cart-item-meta">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-unit">${item.priceFormatted} each</span>
          ${item.modifiers && item.modifiers.length > 0 ? `
            <div class="cart-item-modifiers">
              ${item.modifiers.map(m => `<span class="cart-mod-pill">${m}</span>`).join('')}
            </div>
          ` : ''}
        </div>
        <div class="cart-item-actions">
          <div class="dish-qty-stepper">
            <button type="button" class="stepper-btn modal-stepper-minus" data-line-id="${item.lineId}" aria-label="Decrease quantity">−</button>
            <span class="stepper-count">${item.qty}</span>
            <button type="button" class="stepper-btn modal-stepper-plus" data-line-id="${item.lineId}" aria-label="Increase quantity">+</button>
          </div>
          <span class="cart-item-total">€${(item.unitPrice * item.qty).toFixed(2)}</span>
        </div>
      </div>
    `).join('');

    if (subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-€${discount.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `€${total.toFixed(2)}`;

    // Update Checkout Button (Routing directly to verified Flipdish order endpoint)
    if (checkoutBtn) {
      checkoutBtn.innerHTML = `
        <span class="checkout-btn-text">Checkout</span>
        <span class="checkout-btn-divider" aria-hidden="true">•</span>
        <span class="checkout-btn-price">€${total.toFixed(2)}</span>
        <svg class="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      `;
      checkoutBtn.onclick = (e) => {
        e.preventDefault();
        const flipdishUrl = orderState.fulfillment === 'delivery'
          ? 'https://www.lezzetli.ie/order#/restaurant/40933/delivery'
          : 'https://www.lezzetli.ie/order#/restaurant/40933/collection/68471';
        const modeText = orderState.fulfillment === 'delivery' ? 'Home Delivery' : 'Collection (Newbridge)';
        showToast(`Redirecting to secure ${modeText} checkout on Flipdish...`);
        setTimeout(() => {
          window.open(flipdishUrl, '_blank', 'noopener,noreferrer');
        }, 500);
      };
    }

    // Modal Stepper Listeners
    cartList.querySelectorAll('.modal-stepper-plus').forEach(btn => {
      btn.onclick = () => updateCartLineQty(btn.dataset.lineId, 1);
    });
    cartList.querySelectorAll('.modal-stepper-minus').forEach(btn => {
      btn.onclick = () => updateCartLineQty(btn.dataset.lineId, -1);
    });
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop, .cart-drawer-backdrop').forEach(m => {
    m.classList.remove('active');
    if (activeTrapKeydownHandler) {
      m.removeEventListener('keydown', activeTrapKeydownHandler);
    }
  });
  activeTrapKeydownHandler = null;
  document.body.style.overflow = '';

  // Restore focus to original triggering element (WCAG 2.4.3)
  if (activeModalTrigger && typeof activeModalTrigger.focus === 'function') {
    activeModalTrigger.focus();
    activeModalTrigger = null;
  }
}

/* ==========================================================================
   5. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const navToggle = document.getElementById('mobileNavToggle');
  const navDrawer = document.getElementById('mobileNavDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  let drawerTrapHandler = null;

  function openDrawer() {
    if (navDrawer) {
      navDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (navToggle) navToggle.setAttribute('aria-expanded', 'true');

      const focusable = navDrawer.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        setTimeout(() => first.focus(), 60);

        drawerTrapHandler = function(e) {
          if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        };
        navDrawer.addEventListener('keydown', drawerTrapHandler);
      }
    }
  }

  function closeDrawer() {
    if (navDrawer) {
      navDrawer.classList.remove('active');
      document.body.style.overflow = '';
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
      if (drawerTrapHandler) {
        navDrawer.removeEventListener('keydown', drawerTrapHandler);
        drawerTrapHandler = null;
      }
    }
  }

  if (navToggle) navToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  if (navDrawer) {
    navDrawer.addEventListener('click', (e) => {
      if (e.target === navDrawer) closeDrawer();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer && navDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   6. RESPONSIVE TOAST NOTIFICATIONS & SWIPE-TO-DISMISS (TOP-RIGHT / TOP-SLIDE)
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('lezzetliToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lezzetliToast';
    toast.className = 'lezzetli-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <div class="toast-icon-slot" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <div class="toast-message-text" id="toastMessageText"></div>
      <button type="button" class="toast-dismiss-btn" id="toastDismissBtn" aria-label="Dismiss alert">✕</button>
    `;
    document.body.appendChild(toast);

    // Attach Swipe / Slide Left or Right to Dismiss Gestures
    initToastSwipeGestures(toast);

    // Close button click handler
    const dismissBtn = toast.querySelector('#toastDismissBtn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissToast(toast);
      });
    }
  }

  // Update text
  const textEl = toast.querySelector('#toastMessageText');
  if (textEl) textEl.textContent = message;

  // Reset classes and inline transforms
  toast.classList.remove('slide-out-left', 'slide-out-right', 'is-dragging');
  toast.style.transform = '';
  toast.style.opacity = '';

  // Trigger entrance transition
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  // Auto-dismiss after 3.5s
  scheduleToastAutoDismiss(toast, 3500);
}

let toastAutoDismissTimer = null;

function scheduleToastAutoDismiss(toast, duration) {
  clearTimeout(toastAutoDismissTimer);
  toastAutoDismissTimer = setTimeout(() => {
    dismissToast(toast);
  }, duration);
}

function dismissToast(toast, direction = null) {
  clearTimeout(toastAutoDismissTimer);
  if (!toast) return;

  if (direction === 'left') {
    toast.classList.add('slide-out-left');
  } else if (direction === 'right') {
    toast.classList.add('slide-out-right');
  } else {
    toast.classList.remove('visible');
  }

  setTimeout(() => {
    toast.classList.remove('visible', 'slide-out-left', 'slide-out-right', 'is-dragging');
    toast.style.transform = '';
    toast.style.opacity = '';
  }, 320);
}

function initToastSwipeGestures(toast) {
  let startX = 0;
  let currentDeltaX = 0;
  let isDragging = false;
  let startTime = 0;

  // Touch Events for Mobile
  toast.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    currentDeltaX = 0;
    isDragging = true;
    startTime = Date.now();
    clearTimeout(toastAutoDismissTimer);
  }, { passive: true });

  toast.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const clientX = e.touches[0].clientX;
    currentDeltaX = clientX - startX;

    // Apply immediate transform and dynamic opacity fade
    toast.classList.add('is-dragging');
    toast.style.transform = `translateX(${currentDeltaX}px)`;
    const opacityFactor = Math.max(0.15, 1 - Math.abs(currentDeltaX) / 180);
    toast.style.opacity = `${opacityFactor}`;
  }, { passive: true });

  const handleTouchEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    toast.classList.remove('is-dragging');

    const elapsed = Date.now() - startTime;
    const velocity = Math.abs(currentDeltaX) / Math.max(1, elapsed);

    // Trigger dismiss if pulled past 55px or flicked quickly (> 0.35 px/ms)
    if (Math.abs(currentDeltaX) > 55 || velocity > 0.35) {
      dismissToast(toast, currentDeltaX < 0 ? 'left' : 'right');
    } else {
      // Snap back smoothly
      toast.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease';
      toast.style.transform = '';
      toast.style.opacity = '';
      setTimeout(() => {
        toast.style.transition = '';
        scheduleToastAutoDismiss(toast, 3000);
      }, 250);
    }
  };

  toast.addEventListener('touchend', handleTouchEnd);
  toast.addEventListener('touchcancel', handleTouchEnd);

  // Mouse / Pointer Drag Support for Desktop & Hybrid Devices
  let isPointerDown = false;
  toast.addEventListener('pointerdown', (e) => {
    if (e.target.closest('#toastDismissBtn')) return;
    isPointerDown = true;
    startX = e.clientX;
    currentDeltaX = 0;
    startTime = Date.now();
    clearTimeout(toastAutoDismissTimer);
    try {
      toast.setPointerCapture(e.pointerId);
    } catch (_) {}
  });

  toast.addEventListener('pointermove', (e) => {
    if (!isPointerDown) return;
    currentDeltaX = e.clientX - startX;
    toast.classList.add('is-dragging');
    toast.style.transform = `translateX(${currentDeltaX}px)`;
    const opacityFactor = Math.max(0.15, 1 - Math.abs(currentDeltaX) / 180);
    toast.style.opacity = `${opacityFactor}`;
  });

  const handlePointerUp = (e) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    toast.classList.remove('is-dragging');
    try {
      toast.releasePointerCapture(e.pointerId);
    } catch (_) {}

    const elapsed = Date.now() - startTime;
    const velocity = Math.abs(currentDeltaX) / Math.max(1, elapsed);

    if (Math.abs(currentDeltaX) > 55 || velocity > 0.35) {
      dismissToast(toast, currentDeltaX < 0 ? 'left' : 'right');
    } else {
      toast.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease';
      toast.style.transform = '';
      toast.style.opacity = '';
      setTimeout(() => {
        toast.style.transition = '';
        scheduleToastAutoDismiss(toast, 3000);
      }, 250);
    }
  };

  toast.addEventListener('pointerup', handlePointerUp);
  toast.addEventListener('pointercancel', handlePointerUp);

  // Pause on hover for desktop users
  toast.addEventListener('mouseenter', () => {
    if (!isDragging && !isPointerDown) clearTimeout(toastAutoDismissTimer);
  });
  toast.addEventListener('mouseleave', () => {
    if (!isDragging && !isPointerDown && toast.classList.contains('visible')) {
      scheduleToastAutoDismiss(toast, 2500);
    }
  });
}

/* ==========================================================================
   7. SCROLL MOTION & LAZY REVEAL SYSTEM (IMPECCABLE MOTION)
   ========================================================================== */
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Target key page elements for scroll-driven reveals
  const revealSelectors = [
    '.section-header',
    '.pillar-card',
    '.dinein-content',
    '.dinein-cta-card',
    '.review-card',
    '.story-media-card',
    '.story-content',
    '.app-download-card',
    '.visit-info-card',
    '.map-frame-wrapper',
    '.footer-top-grid'
  ];

  const targetElements = document.querySelectorAll(revealSelectors.join(', '));

  // Stagger siblings in grids for natural cascading
  const pillarCards = document.querySelectorAll('.pillars-grid .pillar-card');
  pillarCards.forEach((card, idx) => {
    card.classList.add('stagger-item');
    card.setAttribute('data-stagger', idx);
  });

  const reviewCards = document.querySelectorAll('.reviews-grid .review-card');
  reviewCards.forEach((card, idx) => {
    card.classList.add('stagger-item');
    card.setAttribute('data-stagger', idx);
  });

  if (prefersReducedMotion) {
    targetElements.forEach(el => el.classList.add('is-revealed'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    targetElements.forEach(el => {
      if (!el.classList.contains('stagger-item')) {
        el.classList.add('reveal-on-scroll');
      }
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers without IntersectionObserver
    targetElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 2. Scroll Progress Bar & Header Elevation
  const progressBar = document.getElementById('scrollProgressBar');
  const siteHeader = document.getElementById('siteHeader');

  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar width
        if (progressBar && scrollHeight > 0) {
          const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
          progressBar.style.width = `${progress}%`;
        }

        // Header elevation on scroll
        if (siteHeader) {
          if (scrollTop > 30) {
            siteHeader.classList.add('scrolled');
          } else {
            siteHeader.classList.remove('scrolled');
          }
        }

        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // 3. Lazy Image Smooth Progressive Reveal
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.classList.add('img-lazy-reveal');
    if (img.complete) {
      img.classList.add('img-loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('img-loaded');
      }, { once: true });
    }
  });
}

