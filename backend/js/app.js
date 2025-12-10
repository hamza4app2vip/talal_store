/* =============================================
   MAIN APPLICATION - Arabic Smartphone Store
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderScroll();
    initSearchOverlay();
});

/* ─────────────────────────────────────────────
   MOBILE MENU
   ───────────────────────────────────────────── */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navDrawer = document.querySelector('.nav-drawer');
    const navOverlay = document.querySelector('.nav-drawer-overlay');
    const navClose = document.querySelector('.nav-drawer-close');

    if (!menuToggle || !navDrawer) return;

    function openMenu() {
        navDrawer.classList.add('active');
        navOverlay?.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeMenu() {
        navDrawer.classList.remove('active');
        navOverlay?.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    menuToggle.addEventListener('click', openMenu);
    navClose?.addEventListener('click', closeMenu);
    navOverlay?.addEventListener('click', closeMenu);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navDrawer.classList.contains('active')) {
            closeMenu();
        }
    });
}

/* ─────────────────────────────────────────────
   HEADER SCROLL EFFECT
   ───────────────────────────────────────────── */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 10) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ─────────────────────────────────────────────
   LANGUAGE TOGGLE
   ───────────────────────────────────────────── */
function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-toggle-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;

            // Update active state
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle body class for RTL/LTR
            if (lang === 'en') {
                document.body.classList.add('lang-en');
                document.documentElement.setAttribute('lang', 'en');
                document.documentElement.setAttribute('dir', 'ltr');
            } else {
                document.body.classList.remove('lang-en');
                document.documentElement.setAttribute('lang', 'ar');
                document.documentElement.setAttribute('dir', 'rtl');
            }

            // Store preference
            localStorage.setItem('preferred-lang', lang);
        });
    });

    // Load saved preference
    const savedLang = localStorage.getItem('preferred-lang');
    if (savedLang) {
        const savedBtn = document.querySelector(`.lang-toggle-btn[data-lang="${savedLang}"]`);
        savedBtn?.click();
    }
}

/* ─────────────────────────────────────────────
   SEARCH OVERLAY
   ───────────────────────────────────────────── */
function initSearchOverlay() {
    const searchBtn = document.querySelector('.header-search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-overlay-close');
    const searchInput = document.querySelector('.search-overlay-input');

    if (!searchBtn || !searchOverlay) return;

    function openSearch() {
        searchOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
        searchInput?.focus();
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    searchBtn.addEventListener('click', openSearch);
    searchClose?.addEventListener('click', closeSearch);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });
}

/* ─────────────────────────────────────────────
   UTILITY FUNCTIONS
   ───────────────────────────────────────────── */

// Format price with currency
function formatPrice(price, currency = 'ر.س') {
    return `${price.toLocaleString('ar-SA')} ${currency}`;
}

// Format price in English
function formatPriceEn(price, currency = 'SAR') {
    return `${currency} ${price.toLocaleString('en-US')}`;
}

// Add to cart (placeholder)
function addToCart(productId) {
    console.log('Added to cart:', productId);

    // Update cart badge
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        const currentCount = parseInt(cartBadge.textContent) || 0;
        cartBadge.textContent = currentCount + 1;
    }

    // Show feedback
    showToast('تمت الإضافة للسلة');
}

// Show toast notification
function showToast(message, duration = 3000) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    background-color: #1A1A1A;
    color: #FFFFFF;
    border-radius: 8px;
    font-size: 14px;
    z-index: 9999;
    animation: fadeIn 0.3s ease;
  `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Add CSS animations for toast
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes fadeOut {
    from { opacity: 1; transform: translateX(-50%) translateY(0); }
    to { opacity: 0; transform: translateX(-50%) translateY(20px); }
  }
`;
document.head.appendChild(toastStyles);
