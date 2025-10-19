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

async function login(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('adminToken', data.token);
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            const error = await response.json();
            showMessage(error.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Network error. Please try again.', 'error');
    }
}

async function forgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    try {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            showMessage('Reset code sent to your email!', 'success');
            showResetPassword();
        } else {
            const error = await response.json();
            showMessage(error.message || 'Failed to send reset code', 'error');
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        showMessage('Network error. Please try again.', 'error');
    }
}

async function resetPassword(e) {
    e.preventDefault();
    
    const code = document.getElementById('resetCode').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, newPassword })
        });
        
        if (response.ok) {
            showMessage('Password reset successfully! You can now login.', 'success');
            showLogin();
            document.getElementById('resetPasswordFormElement').reset();
        } else {
            const error = await response.json();
            showMessage(error.message || 'Failed to reset password', 'error');
        }
    } catch (error) {
        console.error('Reset password error:', error);
        showMessage('Network error. Please try again.', 'error');
    }
}

function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
    document.getElementById('resetPasswordForm').classList.add('hidden');
    hideMessage();
}

function showForgotPassword() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('forgotPasswordForm').classList.remove('hidden');
    document.getElementById('resetPasswordForm').classList.add('hidden');
    hideMessage();
}

function showResetPassword() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
    document.getElementById('resetPasswordForm').classList.remove('hidden');
    hideMessage();
}

function showMessage(message, type) {
    const messageElement = document.getElementById('authMessage');
    messageElement.textContent = message;
    messageElement.className = type;
    messageElement.classList.remove('hidden');
}

function hideMessage() {
    document.getElementById('authMessage').classList.add('hidden');
}