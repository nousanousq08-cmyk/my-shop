import { supabase } from '../lib/supabase.js';
import { isAuthenticated } from './auth.js';

export default async function handler(req, res) {
    const { method } = req;

    // Public GET, authenticated other methods
    if (method !== 'GET' && !isAuthenticated(req)) {
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

async function handleGetProducts(req, res) {
    try {
        const { search, limit = 50, offset = 0 } = req.query;
        
        let query = supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (search) {
            query = query.ilike('title', `%${search}%`);
        }

        if (limit) {
            query = query.range(offset, offset + parseInt(limit) - 1);
        }

        const { data: products, error } = await query;

        if (error) throw error;
        return res.status(200).json(products || []);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleCreateProduct(req, res) {
    try {
        const { title, price, discount, stock, colors, sizes, description, media = [] } = req.body;
        
        // Validation
        if (!title || !price || price < 0) {
            return res.status(400).json({ message: 'Invalid product data' });
        }

        const { data: newProduct, error } = await supabase
            .from('products')
            .insert([{
                title,
                price: parseFloat(price),
                discount: discount ? parseFloat(discount) : null,
                stock: parseInt(stock) || 0,
                colors: colors || '',
                sizes: sizes || '',
                description: description || '',
                media: media,
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
        const { title, price, discount, stock, colors, sizes, description, media } = req.body;
        
        const { data: updatedProduct, error } = await supabase
            .from('products')
            .update({
                title,
                price: parseFloat(price),
                discount: discount ? parseFloat(discount) : null,
                stock: parseInt(stock) || 0,
                colors: colors || '',
                sizes: sizes || '',
                description: description || '',
                media: media || []
            })
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
        
        // First get product to delete media from storage
        const { data: product, error: fetchError } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        // Delete media files from storage
        if (product.media && Array.isArray(product.media)) {
            for (const mediaItem of product.media) {
                if (mediaItem.url) {
                    const filePath = mediaItem.url.split('/product-media/')[1];
                    if (filePath) {
                        await supabase.storage
                            .from('product-media')
                            .remove([filePath]);
                    }
                }
            }
        }
        
        // Delete product from database
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