import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
    const { method } = req;

    // Simple authentication check
    if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    switch (method) {
        case 'GET':
            return handleGetProducts(req, res);
        case 'POST':
            return handleCreateProduct(req, res);
        case 'PUT':
            return handleUpdateProduct(req, res);
        case 'DELETE':
            return handleDeleteProduct(req, res);
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

async function handleGetProducts(req, res) {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return res.status(200).json(products || []);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleCreateProduct(req, res) {
    try {
        const productData = req.body;
        
        const { data: newProduct, error } = await supabase
            .from('products')
            .insert([{
                ...productData,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleUpdateProduct(req, res) {
    try {
        const { id } = req.query;
        const productData = req.body;
        
        const { data: updatedProduct, error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleDeleteProduct(req, res) {
    try {
        const { id } = req.query;
        
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
        
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}