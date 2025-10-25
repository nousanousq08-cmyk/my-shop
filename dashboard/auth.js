 // 🔗 روابط APIs المصادقة
const API_BASE_URL = 'https://apkogwpcpshvttuqcuxy.supabase.co'; 
const API_AUTH_LOGIN = 'https://apkogwpcpshvttuqcuxy.supabase.co/api/auth/login'; // أو الرابط الكامل
const API_FORGOT_PASSWORD = 'https://apkogwpcpshvttuqcuxy.supabase.co/api/auth/forgot-password';
const API_RESET_PASSWORD = 'https://apkogwpcpshvttuqcuxy.supabase.co/api/auth/reset-password';


 // Authentication management
document.addEventListener('DOMContentLoaded', function() {
    setupAuthEventListeners();



    

    
    // Check if already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
        window.location.href = 'index.html';
    }
});

function setupAuthEventListeners() {
    // Login form
    document.getElementById('loginFormElement').addEventListener('submit', login);
    
    // Forgot password form
    document.getElementById('forgotPasswordFormElement').addEventListener('submit', forgotPassword);
    
    // Reset password form
    document.getElementById('resetPasswordFormElement').addEventListener('submit', resetPassword);
}

// 🔥 دالة تسجيل الدخول المحسنة
async function login(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // التحقق من المدخلات الأساسية
    if (!username || !password) {
        showMessage('Please enter both username and password', 'error');
        return;
    }

    try {
        // 🔥 استخدام Supabase للمصادقة
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: username.trim(),
                password: password 
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // حفظ token في localStorage
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', JSON.stringify(data.user));
            
            showMessage('Login successful! Redirecting...', 'success');
            
            // التوجيه إلى Dashboard بعد تسجيل الدخول الناجح
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showMessage(data.message || 'Login failed. Please check your credentials.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
    }
}

// 🔥 دالة استعادة كلمة المرور
async function forgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    if (!email) {
        showMessage('Please enter your email address', 'error');
        return;
    }

    try {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email.trim() })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showMessage('Reset code has been sent to your email!', 'success');
            showResetPassword();
        } else {
            showMessage(data.message || 'Failed to send reset code. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        showMessage('Network error. Please try again.', 'error');
    }
}

// 🔥 دالة إعادة تعيين كلمة المرور
async function resetPassword(e) {
    e.preventDefault();
    
    const code = document.getElementById('resetCode').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // التحقق من كلمات المرور
    if (newPassword !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    if (!code) {
        showMessage('Please enter the reset code', 'error');
        return;
    }

    try {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                code: code.trim(),
                newPassword: newPassword 
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showMessage('Password reset successfully! You can now login with your new password.', 'success');
            showLogin();
            document.getElementById('resetPasswordFormElement').reset();
        } else {
            showMessage(data.message || 'Failed to reset password. Please check the reset code.', 'error');
        }
    } catch (error) {
        console.error('Reset password error:', error);
        showMessage('Network error. Please try again.', 'error');
    }
}

// دوال تبديل النماذج
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
    document.getElementById('resetPasswordForm').classList.add('hidden');
    hideMessage();
    
    // إعادة تعيين النماذج
    document.getElementById('loginFormElement').reset();
}

function showForgotPassword() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('forgotPasswordForm').classList.remove('hidden');
    document.getElementById('resetPasswordForm').classList.add('hidden');
    hideMessage();
    
    document.getElementById('forgotPasswordFormElement').reset();
}

function showResetPassword() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
    document.getElementById('resetPasswordForm').classList.remove('hidden');
    hideMessage();
}

// 🔥 دالة التحقق من المصادقة المحسنة
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || !user) {
        // إذا لم يكن هناك token، توجيه إلى صفحة التسجيل
        window.location.href = 'auth.html';
        return false;
    }
    
    try {
        const userData = JSON.parse(user);
        // تحديث ترحيب المستخدم في Dashboard
        const welcomeElement = document.getElementById('adminWelcome');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome, ${userData.username || 'Admin'}`;
        }
        
        return true;
    } catch (error) {
        console.error('Error parsing user data:', error);
        // إذا كانت البيانات تالفة، إعادة التوجيه للتسجيل
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = 'auth.html';
        return false;
    }
}

// 🔥 دالة تسجيل الخروج المحسنة
function logout() {
    // تأكيد تسجيل الخروج
    if (confirm('Are you sure you want to logout?')) {
        // مسح بيانات المصادقة
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('language');
        
        // توجيه إلى صفحة التسجيل
        window.location.href = 'auth.html';
    }
}

// دوال عرض الرسائل
function showMessage(message, type) {
    const messageElement = document.getElementById('authMessage');
    messageElement.textContent = message;
    messageElement.className = type + ' fade-in';
    messageElement.classList.remove('hidden');
    
    // إخفاء الرسائل التلقائية بعد 5 ثوانٍ
    if (type === 'success') {
        setTimeout(() => {
            hideMessage();
        }, 5000);
    }
}

function hideMessage() {
    document.getElementById('authMessage').classList.add('hidden');
}

// 🔥 إضافة تأثيرات CSS للرسائل
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .auth-form {
        transition: all 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);

// تصدير الدوال للاستخدام في الملفات الأخرى
window.checkAuth = checkAuth;
window.logout = logout;