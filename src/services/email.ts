'use server';

import type { Donation } from '@/lib/types';
import { Resend } from 'resend';
import DonationReceiptEmail from '@/emails/DonationReceipt';
import { getSiteSettings } from './firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDonationReceipt(donation: Donation) {
    if (!process.env.RESEND_API_KEY) {
        console.log("RESEND_API_KEY is not set. Skipping email.");
        return;
    }
    
    // Fetch the latest site settings to use in the email
    const settings = await getSiteSettings();
    
    // Construct the full URLs here on the server
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const receiptUrl = `${baseUrl}/donate/receipt/${donation.txnid}`;
    const certificateUrl = `${baseUrl}/donate/certificate/${donation.txnid}`;

    try {
        await resend.emails.send({
            from: 'Shreyaskar Foundation <onboarding@resend.dev>',
            to: donation.email,
            subject: 'Thank You for Your Donation!',
            // Pass the full URLs and settings as props to the email component
            react: DonationReceiptEmail({ donation, settings, receiptUrl, certificateUrl }),
        });
        console.log(`Donation receipt sent to ${donation.email}`);
    } catch (error) {
        console.error("Error sending donation receipt:", error);
    }
}
