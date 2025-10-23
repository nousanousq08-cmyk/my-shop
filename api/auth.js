import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../lib/supabase.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { path } = req.query;
            
            switch (path) {
                case 'login':
                    return handleLogin(req, res);
                case 'forgot-password':
                    return handleForgotPassword(req, res);
                case 'reset-password':
                    return handleResetPassword(req, res);
                default:
                    return res.status(404).json({ message: 'Endpoint not found' });
            }
        
        default:
            res.setHeader('Allow', ['POST']);
            return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
}

async function handleLogin(req, res) {
    const { username, password } = req.body;

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { 
                userId: user.id, 
                username: user.username,
                role: user.role 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleForgotPassword(req, res) {
    const { email } = req.body;

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            // Don't reveal whether email exists
            return res.status(200).json({ message: 'If the email exists, a reset code has been sent' });
        }

        // Generate 6-digit reset code
        const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const resetCodeExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

        // Update user with reset code
        const { error: updateError } = await supabase
            .from('users')
            .update({
                reset_code: resetCode,
                reset_code_expiry: resetCodeExpiry.toISOString()
            })
            .eq('id', user.id);

        if (updateError) throw updateError;

        // Send email via Resend
        try {
            await fetch(`${req.headers.origin}/api/email/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: email,
                    subject: 'Password Reset Code - Best Shop',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #4f46e5;">Password Reset Request</h2>
                            <p>Your password reset code is: <strong>${resetCode}</strong></p>
                            <p>This code will expire in 30 minutes.</p>
                            <p>If you didn't request this reset, please ignore this email.</p>
                            <hr>
                            <p style="color: #6b7280; font-size: 12px;">Best Shop Team</p>
                        </div>
                    `
                })
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
        }

        return res.status(200).json({ message: 'If the email exists, a reset code has been sent' });
    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleResetPassword(req, res) {
    const { code, newPassword } = req.body;

    if (!code || !newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: 'Invalid reset code or password' });
    }

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('reset_code', code)
            .gt('reset_code_expiry', new Date().toISOString())
            .single();

        if (error || !user) {
            return res.status(400).json({ message: 'Invalid or expired reset code' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const { error: updateError } = await supabase
            .from('users')
            .update({
                password_hash: hashedPassword,
                reset_code: null,
                reset_code_expiry: null
            })
            .eq('id', user.id);

        if (updateError) throw updateError;

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Middleware for authentication
export function isAuthenticated(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.role === 'admin';
    } catch {
        return false;
    }
}