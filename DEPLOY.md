# Mobile Store - Deployment Guide

## 🚀 Deploy to Railway

### الخطوة 1: إنشاء حساب GitHub (إذا لم يكن لديك)
1. اذهب إلى [github.com](https://github.com)
2. أنشئ حساب جديد

### الخطوة 2: رفع المشروع على GitHub
```bash
# افتح Terminal في مجلد store
cd c:\Users\Elite\Desktop\store

# تهيئة Git
git init

# إضافة كل الملفات
git add .

# أول commit
git commit -m "Initial commit - Mobile Store"

# إنشاء repository على GitHub ثم:
git remote add origin https://github.com/USERNAME/mobile-store.git
git push -u origin main
```

### الخطوة 3: الربط مع Railway
1. اذهب إلى [railway.app](https://railway.app)
2. سجل دخول بحساب GitHub
3. اضغط "New Project"
4. اختر "Deploy from GitHub repo"
5. اختر مستودع `mobile-store`
6. Railway سيكتشف تلقائياً أنه مشروع Node.js

### الخطوة 4: إعدادات Railway
في لوحة Railway:
1. اذهب إلى Settings > General
2. Root Directory: `backend`
3. Start Command: `npm start`
4. اضغط "Generate Domain" للحصول على رابط

### ✅ انتهى!
ستحصل على رابط مثل: `https://mobile-store-production.up.railway.app`

---

## 📁 هيكل المشروع للنشر

```
store/
├── backend/           ← هذا يُنشر على Railway
│   ├── server.js
│   ├── package.json
│   ├── database.json
│   └── .gitignore
├── css/
├── js/
├── admin/
├── index.html
├── shop.html
└── ...
```

## 🔑 بيانات الدخول
- **Email:** admin@mobilestore.sa
- **Password:** admin123
