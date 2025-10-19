import { supabase } from '../lib/supabase.js';

let wilayas = {
    "Algiers": 400,
    "Oran": 500,
    "Constantine": 600
};

export default async function handler(req, res) {
    const { method } = req;

    // Public GET, authenticated other methods
    if (method !== 'GET' && !isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    switch (method) {
        case 'GET':
            return handleGetWilayas(req, res);
        case 'POST':
            return handleAddWilaya(req, res);
        case 'PUT':
            return handleUpdateWilaya(req, res);
        case 'DELETE':
            return handleDeleteWilaya(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
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

async function handleGetWilayas(req, res) {
    try {
        // جلب البيانات من Supabase
        const { data: storedWilayas, error } = await supabase
            .from('wilayas')
            .select('*');

        if (error && error.code !== 'PGRST116') throw error;
        
        // دمج البيانات مع الافتراضية
        const mergedWilayas = { ...wilayas };
        if (storedWilayas) {
            storedWilayas.forEach(item => {
                mergedWilayas[item.name] = item.fee;
            });
        }
        
        return res.status(200).json(mergedWilayas);
    } catch (error) {
        console.error('Error fetching wilayas:', error);
        return res.status(200).json(wilayas); // Fallback
    }
}

async function handleAddWilaya(req, res) {
    try {
        const { wilaya, fee } = req.body;
        
        const { error } = await supabase
            .from('wilayas')
            .insert([{ name: wilaya, fee: fee }]);

        if (error) throw error;
        
        wilayas[wilaya] = fee;
        return res.status(201).json(wilayas);
    } catch (error) {
        console.error('Error adding wilaya:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleUpdateWilaya(req, res) {
    try {
        const { wilaya, fee } = req.body;
        
        const { error } = await supabase
            .from('wilayas')
            .update({ fee: fee })
            .eq('name', wilaya);

        if (error) throw error;
        
        wilayas[wilaya] = fee;
        return res.status(200).json(wilayas);
    } catch (error) {
        console.error('Error updating wilaya:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleDeleteWilaya(req, res) {
    try {
        const { wilaya } = req.body;
        
        const { error } = await supabase
            .from('wilayas')
            .delete()
            .eq('name', wilaya);

        if (error) throw error;
        
        delete wilayas[wilaya];
        return res.status(200).json(wilayas);
    } catch (error) {
        console.error('Error deleting wilaya:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}