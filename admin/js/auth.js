/* =============================================
   ADMIN AUTHENTICATION SYSTEM
   ============================================= */

const AdminAuth = {
    // بيانات المدير الافتراضية
    credentials: {
        email: 'admin@mobilestore.sa',
        password: 'admin123'
    },

    // مفتاح التخزين
    STORAGE_KEY: 'admin_session',

    // تسجيل الدخول
    login(email, password) {
        if (email === this.credentials.email && password === this.credentials.password) {
            const session = {
                loggedIn: true,
                email: email,
                name: 'محمد أحمد',
                role: 'مدير النظام',
                loginTime: new Date().toISOString()
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
            return { success: true, message: 'تم تسجيل الدخول بنجاح' };
        }
        return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
    },

    // تسجيل الخروج
    logout() {
        localStorage.removeItem(this.STORAGE_KEY);
        window.location.href = 'index.html';
    },

    // التحقق من الجلسة
    isLoggedIn() {
        const session = localStorage.getItem(this.STORAGE_KEY);
        if (session) {
            try {
                const data = JSON.parse(session);
                return data.loggedIn === true;
            } catch {
                return false;
            }
        }
        return false;
    },

    // الحصول على بيانات الجلسة
    getSession() {
        const session = localStorage.getItem(this.STORAGE_KEY);
        if (session) {
            try {
                return JSON.parse(session);
            } catch {
                return null;
            }
        }
        return null;
    },

    // حماية الصفحة - تحويل إلى صفحة تسجيل الدخول إذا لم يكن مسجلاً
    protectPage() {
        if (!this.isLoggedIn()) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    },

    // تهيئة صفحة تسجيل الدخول
    initLoginPage() {
        // إذا كان مسجلاً بالفعل، انتقل للوحة التحكم
        if (this.isLoggedIn()) {
            window.location.href = 'dashboard.html';
            return;
        }

        const form = document.getElementById('login-form');
        const errorMsg = document.getElementById('login-error');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const email = form.querySelector('input[type="email"]').value;
                const password = form.querySelector('input[type="password"]').value;

                const result = this.login(email, password);

                if (result.success) {
                    window.location.href = 'dashboard.html';
                } else {
                    if (errorMsg) {
                        errorMsg.textContent = result.message;
                        errorMsg.style.display = 'block';
                    } else {
                        alert(result.message);
                    }
                }
            });
        }
    },

    // تهيئة صفحات لوحة التحكم
    initDashboard() {
        if (!this.protectPage()) return;

        const session = this.getSession();

        // تحديث اسم المستخدم في الشريط الجانبي
        const userNameEl = document.querySelector('.sidebar-user-name');
        const userRoleEl = document.querySelector('.sidebar-user-role');
        const userAvatarEl = document.querySelector('.sidebar-user-avatar');

        if (userNameEl && session) userNameEl.textContent = session.name;
        if (userRoleEl && session) userRoleEl.textContent = session.role;
        if (userAvatarEl && session) userAvatarEl.textContent = session.name.charAt(0);

        // إضافة زر تسجيل الخروج
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                    this.logout();
                }
            });
        }
    }
};

// تصدير للاستخدام العام
window.AdminAuth = AdminAuth;
