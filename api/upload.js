import { supabase } from '../lib/supabase.js';
import { isAuthenticated } from './auth.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    if (!isAuthenticated(req)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const { file, fileName, folder = 'products' } = req.body;

        if (!file || !fileName) {
            return res.status(400).json({ message: 'Missing file data' });
        }

        // Convert base64 to buffer
        const fileBuffer = Buffer.from(file.split(',')[1], 'base64');
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('product-media')
            .upload(`${folder}/${Date.now()}_${fileName}`, fileBuffer, {
                contentType: getMimeType(fileName),
                upsert: false
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('product-media')
            .getPublicUrl(data.path);

        return res.status(200).json({ 
            url: publicUrl,
            path: data.path 
        });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ message: 'Upload failed' });
    }
}

function getMimeType(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'mp4': 'video/mp4',
        'mov': 'video/quicktime',
        'avi': 'video/x-msvideo'
    };
    return mimeTypes[ext] || 'application/octet-stream';
}