/* =============================================
   UI COMPONENTS - Arabic Smartphone Store
   ============================================= */

/* ─────────────────────────────────────────────
   TABS COMPONENT
   ───────────────────────────────────────────── */
function initTabs(container) {
    const tabContainer = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!tabContainer) return;

    const tabBtns = tabContainer.querySelectorAll('.tab-btn');
    const tabContents = tabContainer.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.tab;

            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

/* ─────────────────────────────────────────────
   IMAGE GALLERY
   ───────────────────────────────────────────── */
function initImageGallery(container) {
    const gallery = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!gallery) return;

    const mainImage = gallery.querySelector('.product-main-image img');
    const thumbnails = gallery.querySelectorAll('.product-thumb');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const newSrc = thumb.dataset.src || thumb.querySelector('img').src;

            // Update main image
            mainImage.src = newSrc;

            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let currentIndex = 0;

    const mainImageContainer = gallery.querySelector('.product-main-image');

    mainImageContainer?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mainImageContainer?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        const threshold = 50;

        if (Math.abs(diff) < threshold) return;

        if (diff > 0) {
            // Swipe left - next image (RTL: previous)
            currentIndex = Math.min(currentIndex + 1, thumbnails.length - 1);
        } else {
            // Swipe right - previous image (RTL: next)
            currentIndex = Math.max(currentIndex - 1, 0);
        }

        thumbnails[currentIndex]?.click();
    }
}

/* ─────────────────────────────────────────────
   FILTER BOTTOM SHEET
   ───────────────────────────────────────────── */
function initFilterSheet() {
    const filterBtn = document.querySelector('.filter-btn');
    const filterSheet = document.querySelector('.filter-sheet');
    const filterOverlay = document.querySelector('.filter-sheet-overlay');
    const closeBtn = filterSheet?.querySelector('.filter-sheet-close');
    const applyBtn = filterSheet?.querySelector('.filter-apply-btn');
    const resetBtn = filterSheet?.querySelector('.filter-reset-btn');

    if (!filterBtn || !filterSheet) return;

    function openSheet() {
        filterSheet.classList.add('active');
        filterOverlay?.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeSheet() {
        filterSheet.classList.remove('active');
        filterOverlay?.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    filterBtn.addEventListener('click', openSheet);
    closeBtn?.addEventListener('click', closeSheet);
    filterOverlay?.addEventListener('click', closeSheet);
    applyBtn?.addEventListener('click', () => {
        // Apply filters logic here
        closeSheet();
    });
    resetBtn?.addEventListener('click', () => {
        // Reset all filter inputs
        filterSheet.querySelectorAll('input').forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
        filterSheet.querySelectorAll('.pill').forEach(pill => {
            pill.classList.remove('active');
        });
    });
}

/* ─────────────────────────────────────────────
   COLOR PICKER
   ───────────────────────────────────────────── */
function initColorPicker(container) {
    const colorContainer = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!colorContainer) return;

    const colorOptions = colorContainer.querySelectorAll('.color-option');

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');

            // Trigger change event
            const event = new CustomEvent('colorchange', {
                detail: { color: option.dataset.color }
            });
            colorContainer.dispatchEvent(event);
        });
    });
}

/* ─────────────────────────────────────────────
   QUANTITY SELECTOR
   ───────────────────────────────────────────── */
function initQuantitySelector(container) {
    const selector = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!selector) return;

    const minusBtn = selector.querySelector('.qty-minus');
    const plusBtn = selector.querySelector('.qty-plus');
    const input = selector.querySelector('.qty-input');

    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || 99;

    minusBtn?.addEventListener('click', () => {
        const currentVal = parseInt(input.value) || 1;
        if (currentVal > min) {
            input.value = currentVal - 1;
            input.dispatchEvent(new Event('change'));
        }
    });

    plusBtn?.addEventListener('click', () => {
        const currentVal = parseInt(input.value) || 1;
        if (currentVal < max) {
            input.value = currentVal + 1;
            input.dispatchEvent(new Event('change'));
        }
    });

    input?.addEventListener('change', () => {
        let val = parseInt(input.value) || min;
        val = Math.min(Math.max(val, min), max);
        input.value = val;
    });
}

/* ─────────────────────────────────────────────
   PILLS SELECTOR
   ───────────────────────────────────────────── */
function initPillSelector(container, options = {}) {
    const pillContainer = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!pillContainer) return;

    const pills = pillContainer.querySelectorAll('.pill');
    const multiSelect = options.multiSelect || false;

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            if (multiSelect) {
                pill.classList.toggle('active');
            } else {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            }

            // Trigger change event
            const activePills = [...pillContainer.querySelectorAll('.pill.active')];
            const event = new CustomEvent('pillchange', {
                detail: {
                    selected: activePills.map(p => p.dataset.value || p.textContent)
                }
            });
            pillContainer.dispatchEvent(event);
        });
    });
}

/* ─────────────────────────────────────────────
   STAR RATING
   ───────────────────────────────────────────── */
function createStarRating(rating, maxStars = 5) {
    const container = document.createElement('div');
    container.className = 'rating-stars';

    for (let i = 1; i <= maxStars; i++) {
        const star = document.createElement('span');
        star.className = `rating-star ${i <= rating ? 'filled' : ''}`;
        star.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>`;
        container.appendChild(star);
    }

    return container;
}

/* ─────────────────────────────────────────────
   INITIALIZE ALL COMPONENTS
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    // Auto-init tabs
    document.querySelectorAll('.tabs').forEach(initTabs);

    // Auto-init image galleries
    document.querySelectorAll('.product-gallery').forEach(initImageGallery);

    // Auto-init filter sheet
    initFilterSheet();

    // Auto-init color pickers
    document.querySelectorAll('.color-options').forEach(initColorPicker);

    // Auto-init quantity selectors
    document.querySelectorAll('.qty-selector').forEach(initQuantitySelector);

    // Auto-init pill selectors
    document.querySelectorAll('.pills-group').forEach(el => initPillSelector(el));
});
