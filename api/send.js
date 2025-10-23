import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Best Shop <noreply@bestshop.dz>',
            to,
            subject,
            html
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({ message: 'Failed to send email' });
        }

        return res.status(200).json({ message: 'Email sent successfully', data });
    } catch (error) {
        console.error('Email sending error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}