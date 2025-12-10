/* =============================================
   MOBILE STORE - Backend Server
   Node.js + Express + JSON File Database
   ============================================= */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// JSON FILE DATABASE
// ============================================
const DB_FILE = path.join(__dirname, 'database.json');

// Initialize database
function initDB() {
    if (!fs.existsSync(DB_FILE)) {
        const defaultData = {
            brands: [
                { id: 1, name: 'Apple', name_en: 'Apple', logo: '🍎', active: 1 },
                { id: 2, name: 'Samsung', name_en: 'Samsung', logo: '📱', active: 1 },
                { id: 3, name: 'Xiaomi', name_en: 'Xiaomi', logo: '📱', active: 1 },
                { id: 4, name: 'Huawei', name_en: 'Huawei', logo: '📱', active: 1 },
                { id: 5, name: 'OPPO', name_en: 'OPPO', logo: '📱', active: 1 },
                { id: 6, name: 'Vivo', name_en: 'Vivo', logo: '📱', active: 1 },
                { id: 7, name: 'Realme', name_en: 'Realme', logo: '📱', active: 1 },
                { id: 8, name: 'OnePlus', name_en: 'OnePlus', logo: '📱', active: 1 },
                { id: 9, name: 'Honor', name_en: 'Honor', logo: '📱', active: 1 },
                { id: 10, name: 'Google', name_en: 'Google', logo: '📱', active: 1 }
            ],
            products: [
                {
                    id: 1,
                    name: 'آيفون 15 برو ماكس',
                    brand_id: 1,
                    price: 5499,
                    old_price: 5999,
                    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA?wid=400',
                    storage: '256GB',
                    ram: '8GB',
                    color: 'أسود تيتانيوم',
                    description: 'آيفون 15 برو ماكس مع شريحة A17 Pro',
                    in_stock: 1,
                    featured: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'سامسونج جالاكسي S24 ألترا',
                    brand_id: 2,
                    price: 4999,
                    old_price: 5299,
                    image: 'https://images.samsung.com/is/image/samsung/p6pim/ae/2401/gallery/ae-galaxy-s24-s928-sm-s928bztqmea-thumb-539573347?wid=400',
                    storage: '256GB',
                    ram: '12GB',
                    color: 'رمادي تيتانيوم',
                    description: 'سامسونج جالاكسي S24 ألترا مع Galaxy AI',
                    in_stock: 1,
                    featured: 1,
                    created_at: new Date().toISOString()
                },
                {
                    id: 3,
                    name: 'شاومي 14 ألترا',
                    brand_id: 3,
                    price: 3999,
                    old_price: null,
                    image: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1708420528.05498498.png?width=400',
                    storage: '512GB',
                    ram: '16GB',
                    color: 'أسود',
                    description: 'شاومي 14 ألترا مع كاميرا Leica',
                    in_stock: 1,
                    featured: 1,
                    created_at: new Date().toISOString()
                }
            ],
            admins: [
                { id: 1, email: 'admin@mobilestore.sa', password: 'admin123', name: 'محمد أحمد' }
            ]
        };
        fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf8');
        console.log('✅ Database initialized with default data');
    }
}

function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Initialize on startup
initDB();

// ============================================
// MIDDLEWARE
// ============================================
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // Serve frontend files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ============================================
// API ROUTES
// ============================================

// === AUTH ===
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const db = readDB();
    const admin = db.admins.find(a => a.email === email && a.password === password);

    if (admin) {
        res.json({ success: true, user: { id: admin.id, email: admin.email, name: admin.name } });
    } else {
        res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
    }
});

// === BRANDS ===
app.get('/api/brands', (req, res) => {
    const db = readDB();
    res.json(db.brands);
});

app.get('/api/brands/:id', (req, res) => {
    const db = readDB();
    const brand = db.brands.find(b => b.id === parseInt(req.params.id));
    if (brand) {
        res.json(brand);
    } else {
        res.status(404).json({ error: 'Brand not found' });
    }
});

app.post('/api/brands', (req, res) => {
    const db = readDB();
    const { name, name_en, logo } = req.body;
    const newId = db.brands.length > 0 ? Math.max(...db.brands.map(b => b.id)) + 1 : 1;
    const newBrand = { id: newId, name, name_en, logo, active: 1 };
    db.brands.push(newBrand);
    writeDB(db);
    res.json(newBrand);
});

app.put('/api/brands/:id', (req, res) => {
    const db = readDB();
    const index = db.brands.findIndex(b => b.id === parseInt(req.params.id));
    if (index !== -1) {
        db.brands[index] = { ...db.brands[index], ...req.body };
        writeDB(db);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Brand not found' });
    }
});

app.delete('/api/brands/:id', (req, res) => {
    const db = readDB();
    db.brands = db.brands.filter(b => b.id !== parseInt(req.params.id));
    writeDB(db);
    res.json({ success: true });
});

// === PRODUCTS ===
app.get('/api/products', (req, res) => {
    const db = readDB();
    let products = [...db.products];
    const { brand_id, in_stock, featured, search } = req.query;

    if (brand_id) {
        products = products.filter(p => p.brand_id === parseInt(brand_id));
    }
    if (in_stock !== undefined) {
        products = products.filter(p => p.in_stock === (in_stock === 'true' ? 1 : 0));
    }
    if (featured !== undefined) {
        products = products.filter(p => p.featured === (featured === 'true' ? 1 : 0));
    }
    if (search) {
        products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Sort by created_at descending
    products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const db = readDB();
    const product = db.products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.post('/api/products', (req, res) => {
    const db = readDB();
    const newId = db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) + 1 : 1;
    const newProduct = {
        id: newId,
        name: req.body.name,
        brand_id: req.body.brand_id,
        price: req.body.price,
        old_price: req.body.old_price || null,
        image: req.body.image,
        storage: req.body.storage,
        ram: req.body.ram,
        color: req.body.color,
        description: req.body.description,
        in_stock: req.body.in_stock ? 1 : 0,
        featured: req.body.featured ? 1 : 0,
        created_at: new Date().toISOString()
    };
    db.products.push(newProduct);
    writeDB(db);
    res.json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
    const db = readDB();
    const index = db.products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        db.products[index] = {
            ...db.products[index],
            name: req.body.name,
            brand_id: req.body.brand_id,
            price: req.body.price,
            old_price: req.body.old_price || null,
            image: req.body.image,
            storage: req.body.storage,
            ram: req.body.ram,
            color: req.body.color,
            description: req.body.description,
            in_stock: req.body.in_stock ? 1 : 0,
            featured: req.body.featured ? 1 : 0
        };
        writeDB(db);
        res.json(db.products[index]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.delete('/api/products/:id', (req, res) => {
    const db = readDB();
    db.products = db.products.filter(p => p.id !== parseInt(req.params.id));
    writeDB(db);
    res.json({ success: true });
});

// === STATS ===
app.get('/api/stats', (req, res) => {
    const db = readDB();
    res.json({
        totalProducts: db.products.length,
        totalBrands: db.brands.length,
        inStock: db.products.filter(p => p.in_stock === 1).length,
        outOfStock: db.products.filter(p => p.in_stock === 0).length,
        featured: db.products.filter(p => p.featured === 1).length
    });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║     🏪 موبايل ستور - Backend Server       ║
╠════════════════════════════════════════════╣
║  Server running at:                         ║
║  → http://localhost:${PORT}                    ║
║                                             ║
║  Admin Login:                               ║
║  → Email: admin@mobilestore.sa              ║
║  → Password: admin123                       ║
║                                             ║
║  Frontend: http://localhost:${PORT}/index.html ║
║  Admin: http://localhost:${PORT}/admin/        ║
╚════════════════════════════════════════════╝
    `);
});
