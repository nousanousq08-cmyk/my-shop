const users = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@bestshop.dz',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        resetCode: null,
        resetCodeExpiry: null
    }
];

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

    // Simple authentication (in production, use proper password hashing)
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Simple password check (in production, use bcrypt)
    if (password !== 'password') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${user.username}`).toString('base64');
    
    return res.status(200).json({
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
}

async function handleForgotPassword(req, res) {
    const { email } = req.body;

    const user = users.find(u => u.email === email);
    
    if (!user) {
        // Don't reveal whether email exists
        return res.status(200).json({ message: 'If the email exists, a reset code has been sent' });
    }

    // Generate reset code (in production, send actual email)
    const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    user.resetCode = resetCode;
    user.resetCodeExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes

    console.log(`Reset code for ${email}: ${resetCode}`); // In production, send via email

    return res.status(200).json({ message: 'If the email exists, a reset code has been sent' });
}

async function handleResetPassword(req, res) {
    const { code, newPassword } = req.body;

    const user = users.find(u => u.resetCode === code && u.resetCodeExpiry > Date.now());
    
    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    // Update password (in production, hash the password)
    user.password = newPassword; // In production, hash this
    user.resetCode = null;
    user.resetCodeExpiry = null;

    return res.status(200).json({ message: 'Password reset successfully' });
}