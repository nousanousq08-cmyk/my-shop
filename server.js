import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.static('client'));
app.use(express.static('dashboard'));

// API Routes
app.use('/api/auth', (await import('./api/auth.js')).default);
app.use('/api/products', (await import('./api/products.js')).default);
app.use('/api/orders', (await import('./api/orders.js')).default);
app.use('/api/settings', (await import('./api/settings.js')).default);
app.use('/api/wilayas', (await import('./api/wilayas.js')).default);

// Serve client app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Serve dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard', 'auth.html'));
});

app.get('/dashboard/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Client: http://localhost:${PORT}`);
    console.log(`Dashboard: http://localhost:${PORT}/dashboard`);
});