import { supabase } from '../lib/supabase.js';
import { isAuthenticated } from './auth.js';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
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
        case 'DELETE':
            if (!isAuthenticated(req)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            return handleDeleteOrder(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
}

async function handleGetOrders(req, res) {
    try {
        const { status, limit = 50, offset = 0 } = req.query;
        
        let query = supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (status && status !== 'all') {
            query = query.eq('status', status);
        }

        if (limit) {
            query = query.range(offset, offset + parseInt(limit) - 1);
        }

        const { data: orders, error } = await query;

        if (error) throw error;
        return res.status(200).json(orders || []);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleCreateOrder(req, res) {
    try {
        const { 
            items, 
            customer_name, 
            customer_email, 
            customer_phone, 
            customer_address, 
            wilaya, 
            payment_method, 
            total,
            payment_proof 
        } = req.body;

        // Validation
        if (!items || !customer_name || !customer_phone || !customer_address || !wilaya || !payment_method || !total) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const { data: newOrder, error } = await supabase
            .from('orders')
            .insert([{
                items,
                customer_name,
                customer_email: customer_email || '',
                customer_phone,
                customer_address,
                wilaya,
                payment_method,
                total: parseFloat(total),
                payment_proof: payment_proof || null,
                status: payment_method === 'Cash on Delivery' ? 'pending' : 'pending_payment',
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
        
        const allowedStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

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

async function handleDeleteOrder(req, res) {
    try {
        const { id } = req.query;
        
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', id);

        if (error) throw error;
        
        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}