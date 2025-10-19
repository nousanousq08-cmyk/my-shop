import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // Check authentication for GET requests from dashboard
            if (req.headers.authorization && !isAuthenticated(req)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            return handleGetOrders(req, res);
        case 'POST':
            return handleCreateOrder(req, res);
        case 'PUT':
            if (!isAuthenticated(req)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            return handleUpdateOrder(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
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

async function handleGetOrders(req, res) {
    try {
        const { data: orders, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return res.status(200).json(orders || []);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleCreateOrder(req, res) {
    try {
        let orderData;
        
        if (req.headers['content-type']?.includes('multipart/form-data')) {
            // Handle file upload (simplified - في الإنتاج تحتاج لمعالجة الملفات)
            orderData = JSON.parse(req.body.orderData);
        } else {
            orderData = req.body;
        }
        
        const { data: newOrder, error } = await supabase
            .from('orders')
            .insert([{
                ...orderData,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;
        return res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleUpdateOrder(req, res) {
    try {
        const { id } = req.query;
        const { status } = req.body;
        
        const { data: updatedOrder, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        return res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}