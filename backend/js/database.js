/* =============================================
   PRODUCT DATABASE - Using localStorage
   ============================================= */

const ProductDB = {
    STORAGE_KEY: 'store_products',
    BRANDS_KEY: 'store_brands',

    // الماركات الافتراضية
    defaultBrands: [
        { id: 1, name: 'Apple', nameEn: 'Apple', logo: '🍎', active: true },
        { id: 2, name: 'Samsung', nameEn: 'Samsung', logo: '📱', active: true },
        { id: 3, name: 'Xiaomi', nameEn: 'Xiaomi', logo: '📱', active: true },
        { id: 4, name: 'Huawei', nameEn: 'Huawei', logo: '📱', active: true },
        { id: 5, name: 'OPPO', nameEn: 'OPPO', logo: '📱', active: true },
        { id: 6, name: 'Vivo', nameEn: 'Vivo', logo: '📱', active: true },
        { id: 7, name: 'Realme', nameEn: 'Realme', logo: '📱', active: true },
        { id: 8, name: 'OnePlus', nameEn: 'OnePlus', logo: '📱', active: true },
        { id: 9, name: 'Honor', nameEn: 'Honor', logo: '📱', active: true },
        { id: 10, name: 'Google', nameEn: 'Google', logo: '📱', active: true }
    ],

    // المنتجات الافتراضية
    defaultProducts: [
        {
            id: 1,
            name: 'آيفون 15 برو ماكس',
            brandId: 1,
            price: 5499,
            oldPrice: 5999,
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA?wid=400',
            storage: '256GB',
            ram: '8GB',
            color: 'أسود تيتانيوم',
            description: 'آيفون 15 برو ماكس مع شريحة A17 Pro الجديدة',
            specs: { screen: '6.7 بوصة', battery: '4422 mAh', camera: '48 MP' },
            inStock: true,
            featured: true,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            name: 'سامسونج جالاكسي S24 ألترا',
            brandId: 2,
            price: 4999,
            oldPrice: 5299,
            image: 'https://images.samsung.com/is/image/samsung/p6pim/ae/2401/gallery/ae-galaxy-s24-s928-sm-s928bztqmea-thumb-539573347?wid=400',
            storage: '256GB',
            ram: '12GB',
            color: 'رمادي تيتانيوم',
            description: 'سامسونج جالاكسي S24 ألترا مع Galaxy AI',
            specs: { screen: '6.8 بوصة', battery: '5000 mAh', camera: '200 MP' },
            inStock: true,
            featured: true,
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            name: 'شاومي 14 ألترا',
            brandId: 3,
            price: 3999,
            oldPrice: null,
            image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1708420528.05498498.png?width=400',
            storage: '512GB',
            ram: '16GB',
            color: 'أسود',
            description: 'شاومي 14 ألترا مع كاميرا Leica',
            specs: { screen: '6.73 بوصة', battery: '5300 mAh', camera: '50 MP Leica' },
            inStock: true,
            featured: true,
            createdAt: new Date().toISOString()
        }
    ],

    // تهيئة قاعدة البيانات
    init() {
        if (!localStorage.getItem(this.BRANDS_KEY)) {
            localStorage.setItem(this.BRANDS_KEY, JSON.stringify(this.defaultBrands));
        }
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.defaultProducts));
        }
    },

    // ============ المنتجات ============

    // جلب كل المنتجات
    getAllProducts() {
        this.init();
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },

    // جلب منتج بالـ ID
    getProductById(id) {
        const products = this.getAllProducts();
        return products.find(p => p.id === parseInt(id));
    },

    // جلب منتجات ماركة معينة
    getProductsByBrand(brandId) {
        const products = this.getAllProducts();
        return products.filter(p => p.brandId === parseInt(brandId));
    },

    // جلب المنتجات المميزة
    getFeaturedProducts() {
        const products = this.getAllProducts();
        return products.filter(p => p.featured);
    },

    // إضافة منتج جديد
    addProduct(product) {
        const products = this.getAllProducts();
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = {
            ...product,
            id: newId,
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
        return newProduct;
    },

    // تحديث منتج
    updateProduct(id, updates) {
        const products = this.getAllProducts();
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
            return products[index];
        }
        return null;
    },

    // حذف منتج
    deleteProduct(id) {
        let products = this.getAllProducts();
        products = products.filter(p => p.id !== parseInt(id));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
        return true;
    },

    // ============ الماركات ============

    // جلب كل الماركات
    getAllBrands() {
        this.init();
        return JSON.parse(localStorage.getItem(this.BRANDS_KEY)) || [];
    },

    // جلب ماركة بالـ ID
    getBrandById(id) {
        const brands = this.getAllBrands();
        return brands.find(b => b.id === parseInt(id));
    },

    // إضافة ماركة جديدة
    addBrand(brand) {
        const brands = this.getAllBrands();
        const newId = brands.length > 0 ? Math.max(...brands.map(b => b.id)) + 1 : 1;
        const newBrand = { ...brand, id: newId, active: true };
        brands.push(newBrand);
        localStorage.setItem(this.BRANDS_KEY, JSON.stringify(brands));
        return newBrand;
    },

    // حذف ماركة
    deleteBrand(id) {
        let brands = this.getAllBrands();
        brands = brands.filter(b => b.id !== parseInt(id));
        localStorage.setItem(this.BRANDS_KEY, JSON.stringify(brands));
        return true;
    },

    // ============ إحصائيات ============

    getStats() {
        const products = this.getAllProducts();
        const brands = this.getAllBrands();
        return {
            totalProducts: products.length,
            totalBrands: brands.length,
            inStock: products.filter(p => p.inStock).length,
            outOfStock: products.filter(p => !p.inStock).length,
            featured: products.filter(p => p.featured).length
        };
    },

    // ============ تصدير/استيراد ============

    exportData() {
        return JSON.stringify({
            products: this.getAllProducts(),
            brands: this.getAllBrands(),
            exportedAt: new Date().toISOString()
        }, null, 2);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.products) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.products));
            }
            if (data.brands) {
                localStorage.setItem(this.BRANDS_KEY, JSON.stringify(data.brands));
            }
            return true;
        } catch (e) {
            console.error('Import error:', e);
            return false;
        }
    },

    // إعادة تعيين للبيانات الافتراضية
    resetToDefaults() {
        localStorage.setItem(this.BRANDS_KEY, JSON.stringify(this.defaultBrands));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.defaultProducts));
    }
};

// تهيئة عند التحميل
ProductDB.init();

// تصدير للاستخدام العام
window.ProductDB = ProductDB;
