import { supabase } from '../lib/supabase.js';
import { isAuthenticated } from './auth.js';

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

async function handleGetSettings(req, res) {
    try {
        const { data: settings, error } = await supabase
            .from('settings')
            .select('*')
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        
        // Return default settings if none found
        const defaultSettings = {
            store_name: "Best Shop",
            email: "contact@bestshop.dz",
            phone: "+213 123 456 789",
            ccp_number: "0012345678",
            ccp_key: "90",
            rip: "0012345678901234567890"
        };

        return res.status(200).json(settings || defaultSettings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleUpdateSettings(req, res) {
    try {
        const { store_name, email, phone, ccp_number, ccp_key, rip } = req.body;
        
        // Validation
        if (ccp_number && (!/^\d{10}$/.test(ccp_number))) {
            return res.status(400).json({ message: 'CCP number must be 10 digits' });
        }
        if (ccp_key && (!/^\d{2}$/.test(ccp_key))) {
            return res.status(400).json({ message: 'CCP key must be 2 digits' });
        }
        if (rip && (!/^\d{20}$/.test(rip))) {
            return res.status(400).json({ message: 'RIP must be 20 digits' });
        }
        if (email && !isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const settingsData = {
            store_name: store_name || '',
            email: email || '',
            phone: phone || '',
            ccp_number: ccp_number || '',
            ccp_key: ccp_key || '',
            rip: rip || ''
        };

        // Upsert settings (always update the first record)
        const { data: updatedSettings, error } = await supabase
            .from('settings')
            .upsert([settingsData])
            .select()
            .single();

        if (error) throw error;
        
        return res.status(200).json(updatedSettings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}