import { supabase } from '../lib/supabase.js';

let settings = {
    storeName: "Best Shop",
    email: "contact@bestshop.dz",
    phone: "+213 123 456 789",
    ccpAccount: "0012345678901234567890"
};

export default async function handler(req, res) {
    const { method } = req;

    // Public GET, authenticated PUT
    if (method === 'PUT' && !isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    switch (method) {
        case 'GET':
            return handleGetSettings(req, res);
        case 'PUT':
            return handleUpdateSettings(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
}

function isAuthenticated(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = Buffer.from(token, 'base64').toString('ascii');
        return decoded.includes('admin');
    } catch {
        return false;
    }
}

async function handleGetSettings(req, res) {
    try {
        // جلب الإعدادات من Supabase
        const { data: storedSettings, error } = await supabase
            .from('settings')
            .select('*')
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 means no rows
        
        const mergedSettings = { ...settings, ...storedSettings };
        return res.status(200).json(mergedSettings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return res.status(200).json(settings); // Fallback to default
    }
}

async function handleUpdateSettings(req, res) {
    try {
        const newSettings = req.body;
        
        // حفظ الإعدادات في Supabase
        const { data: updatedSettings, error } = await supabase
            .from('settings')
            .upsert([newSettings])
            .select()
            .single();

        if (error) throw error;
        
        settings = { ...settings, ...newSettings };
        return res.status(200).json(updatedSettings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}