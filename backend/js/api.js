/* =============================================
   API CLIENT - Connects Frontend to Backend
   ============================================= */

// Auto-detect API base URL (works for both local and deployed)
const API_BASE = window.location.origin + '/api';

const API = {
    // ============ PRODUCTS ============
    async getAllProducts(filters = {}) {
        const params = new URLSearchParams();
        if (filters.brand_id) params.append('brand_id', filters.brand_id);
        if (filters.in_stock !== undefined) params.append('in_stock', filters.in_stock);
        if (filters.featured !== undefined) params.append('featured', filters.featured);
        if (filters.search) params.append('search', filters.search);

        const url = `${API_BASE}/products${params.toString() ? '?' + params.toString() : ''}`;
        const res = await fetch(url);
        const products = await res.json();

        // Convert snake_case to camelCase for frontend compatibility
        return products.map(p => ({
            id: p.id,
            name: p.name,
            brandId: p.brand_id,
            price: p.price,
            oldPrice: p.old_price,
            image: p.image,
            storage: p.storage,
            ram: p.ram,
            color: p.color,
            description: p.description,
            inStock: p.in_stock === 1,
            featured: p.featured === 1,
            createdAt: p.created_at
        }));
    },

    async getProductById(id) {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) return null;
        const p = await res.json();
        return {
            id: p.id,
            name: p.name,
            brandId: p.brand_id,
            price: p.price,
            oldPrice: p.old_price,
            image: p.image,
            storage: p.storage,
            ram: p.ram,
            color: p.color,
            description: p.description,
            inStock: p.in_stock === 1,
            featured: p.featured === 1,
            createdAt: p.created_at
        };
    },

    async addProduct(product) {
        const res = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: product.name,
                brand_id: product.brandId,
                price: product.price,
                old_price: product.oldPrice,
                image: product.image,
                storage: product.storage,
                ram: product.ram,
                color: product.color,
                description: product.description,
                in_stock: product.inStock,
                featured: product.featured
            })
        });
        return await res.json();
    },

    async updateProduct(id, product) {
        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: product.name,
                brand_id: product.brandId,
                price: product.price,
                old_price: product.oldPrice,
                image: product.image,
                storage: product.storage,
                ram: product.ram,
                color: product.color,
                description: product.description,
                in_stock: product.inStock,
                featured: product.featured
            })
        });
        return await res.json();
    },

    async deleteProduct(id) {
        await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
        return true;
    },

    // ============ BRANDS ============
    async getAllBrands() {
        const res = await fetch(`${API_BASE}/brands`);
        const brands = await res.json();
        return brands.map(b => ({
            id: b.id,
            name: b.name,
            nameEn: b.name_en,
            logo: b.logo,
            active: b.active === 1
        }));
    },

    async addBrand(brand) {
        const res = await fetch(`${API_BASE}/brands`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: brand.name,
                name_en: brand.nameEn,
                logo: brand.logo
            })
        });
        return await res.json();
    },

    async deleteBrand(id) {
        await fetch(`${API_BASE}/brands/${id}`, { method: 'DELETE' });
        return true;
    },

    // ============ AUTH ============
    async login(email, password) {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return await res.json();
    },

    // ============ STATS ============
    async getStats() {
        const res = await fetch(`${API_BASE}/stats`);
        return await res.json();
    },

    // ============ UPLOAD ============
    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            body: formData
        });
        return await res.json();
    }
};

// Make available globally
window.API = API;
