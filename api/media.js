import { supabase } from '../../lib/supabase.js';
import { isAuthenticated } from '../auth.js';

export default async function handler(req, res) {
    if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'POST':
            return handleAddMedia(req, res, id);
        case 'DELETE':
            const { mediaId } = req.query;
            return handleDeleteMedia(req, res, id, mediaId);
        default:
            res.setHeader('Allow', ['POST', 'DELETE']);
            return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
}

async function handleAddMedia(req, res, productId) {
    try {
        // In a real implementation, you would handle file upload here
        // This is a simplified version
        const { url, type, description } = req.body;

        if (!url || !type) {
            return res.status(400).json({ message: 'Missing media data' });
        }

        // Get current product
        const { data: product, error: fetchError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        if (fetchError) throw fetchError;

        const newMediaItem = {
            id: Date.now().toString(),
            url,
            type,
            description: description || '',
            isPrimary: product.media.length === 0 // First media is primary
        };

        const updatedMedia = [...product.media, newMediaItem];

        // Update product with new media
        const { data: updatedProduct, error } = await supabase
            .from('products')
            .update({ media: updatedMedia })
            .eq('id', productId)
            .select()
            .single();

        if (error) throw error;

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error adding media:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleDeleteMedia(req, res, productId, mediaId) {
    try {
        // Get current product
        const { data: product, error: fetchError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        if (fetchError) throw fetchError;

        // Find media item to delete
        const mediaItem = product.media.find(m => m.id === mediaId);
        if (!mediaItem) {
            return res.status(404).json({ message: 'Media not found' });
        }

        // Delete file from storage
        if (mediaItem.url) {
            const filePath = mediaItem.url.split('/product-media/')[1];
            if (filePath) {
                await supabase.storage
                    .from('product-media')
                    .remove([filePath]);
            }
        }

        // Remove media from array
        const updatedMedia = product.media.filter(m => m.id !== mediaId);

        // Update product
        const { data: updatedProduct, error } = await supabase
            .from('products')
            .update({ media: updatedMedia })
            .eq('id', productId)
            .select()
            .single();

        if (error) throw error;

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error deleting media:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}