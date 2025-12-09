/* =============================================
   MOCK DATA - Arabic Smartphone Store
   ============================================= */

const BRANDS = [
    { id: 1, name: 'Apple', nameEn: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 2, name: 'Samsung', nameEn: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { id: 3, name: 'Xiaomi', nameEn: 'Xiaomi', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg' },
    { id: 4, name: 'Huawei', nameEn: 'Huawei', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Huawei_Logo.svg' },
    { id: 5, name: 'Oppo', nameEn: 'OPPO', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/OPPO_LOGO_2019.svg' },
    { id: 6, name: 'Vivo', nameEn: 'Vivo', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Vivo_logo_2019.svg' },
    { id: 7, name: 'Realme', nameEn: 'Realme', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Realme_logo.svg' },
    { id: 8, name: 'OnePlus', nameEn: 'OnePlus', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/OnePlus_logo.svg' }
];

const CATEGORIES = [
    { id: 1, name: 'هواتف رائدة', nameEn: 'Flagship', icon: 'star' },
    { id: 2, name: 'هواتف متوسطة', nameEn: 'Mid-Range', icon: 'smartphone' },
    { id: 3, name: 'هواتف اقتصادية', nameEn: 'Budget', icon: 'wallet' },
    { id: 4, name: 'للألعاب', nameEn: 'Gaming', icon: 'gamepad' },
    { id: 5, name: 'للتصوير', nameEn: 'Camera', icon: 'camera' }
];

const PRODUCTS = [
    {
        id: 1,
        name: 'آيفون 15 برو ماكس',
        nameEn: 'iPhone 15 Pro Max',
        brandId: 1,
        categoryId: 1,
        price: 5499,
        oldPrice: 5999,
        rating: 4.9,
        reviewCount: 234,
        specs: { ram: '8GB', storage: '256GB', camera: '48MP', battery: '4422mAh', display: '6.7"', os: 'iOS 17' },
        colors: ['#1C1C1E', '#F5F5F7', '#4A4A4C', '#3B3B3D'],
        inStock: true,
        badge: 'جديد',
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA?wid=400'
    },
    {
        id: 2,
        name: 'سامسونج جالاكسي S24 ألترا',
        nameEn: 'Samsung Galaxy S24 Ultra',
        brandId: 2,
        categoryId: 1,
        price: 4999,
        oldPrice: 5299,
        rating: 4.8,
        reviewCount: 189,
        specs: { ram: '12GB', storage: '256GB', camera: '200MP', battery: '5000mAh', display: '6.8"', os: 'Android 14' },
        colors: ['#1A1A1A', '#E0E0E0', '#8B7355', '#6B5B95'],
        inStock: true,
        badge: 'الأكثر مبيعاً',
        image: 'https://images.samsung.com/is/image/samsung/p6pim/ae/2401/gallery/ae-galaxy-s24-s928-sm-s928bztqmea-thumb-539573347'
    },
    {
        id: 3,
        name: 'شاومي 14 ألترا',
        nameEn: 'Xiaomi 14 Ultra',
        brandId: 3,
        categoryId: 1,
        price: 4299,
        oldPrice: null,
        rating: 4.7,
        reviewCount: 67,
        specs: { ram: '16GB', storage: '512GB', camera: '50MP Leica', battery: '5300mAh', display: '6.73"', os: 'Android 14' },
        colors: ['#000000', '#FFFFFF'],
        inStock: true,
        badge: null,
        image: 'https://i02.appmifile.com/324_operator_sg/11/01/2024/7a6d7d2a8cd8e3b6e1f6e0d3.png'
    },
    {
        id: 4,
        name: 'هواوي ميت 60 برو',
        nameEn: 'Huawei Mate 60 Pro',
        brandId: 4,
        categoryId: 1,
        price: 4599,
        oldPrice: 4899,
        rating: 4.6,
        reviewCount: 45,
        specs: { ram: '12GB', storage: '512GB', camera: '48MP', battery: '5000mAh', display: '6.82"', os: 'HarmonyOS 4' },
        colors: ['#1A1A1A', '#F5F5DC', '#006400'],
        inStock: true,
        badge: null,
        image: 'https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/mate60-pro/img/kv/mate60pro-kv.png'
    },
    {
        id: 5,
        name: 'آيفون 15',
        nameEn: 'iPhone 15',
        brandId: 1,
        categoryId: 2,
        price: 3699,
        oldPrice: null,
        rating: 4.7,
        reviewCount: 156,
        specs: { ram: '6GB', storage: '128GB', camera: '48MP', battery: '3349mAh', display: '6.1"', os: 'iOS 17' },
        colors: ['#F2F2F7', '#FFC0CB', '#FFFF00', '#90EE90', '#87CEEB'],
        inStock: true,
        badge: null,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch?wid=400'
    },
    {
        id: 6,
        name: 'سامسونج جالاكسي A54',
        nameEn: 'Samsung Galaxy A54',
        brandId: 2,
        categoryId: 2,
        price: 1699,
        oldPrice: 1899,
        rating: 4.5,
        reviewCount: 312,
        specs: { ram: '8GB', storage: '256GB', camera: '50MP', battery: '5000mAh', display: '6.4"', os: 'Android 14' },
        colors: ['#000000', '#FFFFFF', '#90EE90', '#DDA0DD'],
        inStock: true,
        badge: 'خصم 10%',
        image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-a546ezkcmea/gallery/levant-galaxy-a54-5g-sm-a546-sm-a546ezkcmea-thumb-535309228'
    },
    {
        id: 7,
        name: 'ريلمي GT 5 برو',
        nameEn: 'Realme GT 5 Pro',
        brandId: 7,
        categoryId: 4,
        price: 2299,
        oldPrice: null,
        rating: 4.6,
        reviewCount: 78,
        specs: { ram: '16GB', storage: '256GB', camera: '50MP', battery: '5400mAh', display: '6.78"', os: 'Android 14' },
        colors: ['#1A1A1A', '#4169E1'],
        inStock: true,
        badge: 'للألعاب',
        image: 'https://image01.realme.net/general/20231207/1701943444490.png'
    },
    {
        id: 8,
        name: 'شاومي ريدمي نوت 13 برو',
        nameEn: 'Xiaomi Redmi Note 13 Pro',
        brandId: 3,
        categoryId: 3,
        price: 1199,
        oldPrice: null,
        rating: 4.4,
        reviewCount: 421,
        specs: { ram: '8GB', storage: '256GB', camera: '200MP', battery: '5100mAh', display: '6.67"', os: 'Android 13' },
        colors: ['#000000', '#6B5B95', '#87CEEB'],
        inStock: true,
        badge: 'الأفضل قيمة',
        image: 'https://i02.appmifile.com/399_operator_sg/10/10/2023/f9c6c9d1b8c9e3d7e2f7a0b4.png'
    }
];

const REVIEWS = [
    {
        id: 1,
        author: 'أحمد محمد',
        avatar: 'أ',
        rating: 5,
        text: 'أفضل متجر تعاملت معه، التوصيل سريع والمنتجات أصلية 100%',
        verified: true,
        date: '2024-01-15'
    },
    {
        id: 2,
        author: 'سارة عبدالله',
        avatar: 'س',
        rating: 5,
        text: 'خدمة عملاء ممتازة وضمان حقيقي. شكراً لكم',
        verified: true,
        date: '2024-01-12'
    },
    {
        id: 3,
        author: 'محمد الغامدي',
        avatar: 'م',
        rating: 4,
        text: 'أسعار منافسة جداً مقارنة بالمتاجر الأخرى',
        verified: true,
        date: '2024-01-10'
    },
    {
        id: 4,
        author: 'نورة السعيد',
        avatar: 'ن',
        rating: 5,
        text: 'استبدلت جهازي القديم وحصلت على خصم ممتاز',
        verified: true,
        date: '2024-01-08'
    },
    {
        id: 5,
        author: 'خالد العتيبي',
        avatar: 'خ',
        rating: 5,
        text: 'صيانة سريعة وقطع غيار أصلية. أنصح بهم بشدة',
        verified: true,
        date: '2024-01-05'
    },
    {
        id: 6,
        author: 'فاطمة الزهراني',
        avatar: 'ف',
        rating: 4,
        text: 'تجربة شراء مميزة والدفع بالأقساط سهّل علي كثير',
        verified: true,
        date: '2024-01-03'
    }
];

const BLOG_POSTS = [
    {
        id: 1,
        title: 'أفضل 5 هواتف للتصوير في 2024',
        excerpt: 'تعرف على أفضل الهواتف الذكية للتصوير الاحترافي هذا العام',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
        date: '2024-01-20'
    },
    {
        id: 2,
        title: 'نصائح للحفاظ على بطارية هاتفك',
        excerpt: '10 نصائح بسيطة لإطالة عمر بطارية هاتفك الذكي',
        image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400',
        date: '2024-01-18'
    },
    {
        id: 3,
        title: 'كيف تختار هاتفك التالي؟',
        excerpt: 'دليل شامل لاختيار الهاتف المناسب لاحتياجاتك وميزانيتك',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        date: '2024-01-15'
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRANDS, CATEGORIES, PRODUCTS, REVIEWS, BLOG_POSTS };
}
