'use server';

import type { Donation } from '@/lib/types';
import { Resend } from 'resend';
import DonationReceiptEmail from '@/emails/DonationReceipt';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDonationReceipt(donation: Donation) {
    if (!process.env.RESEND_API_KEY) {
        console.log("RESEND_API_KEY is not set. Skipping email.");
        return;
    }

    try {
        await resend.emails.send({
            from: 'Shreyaskar Foundation <noreply@yourdomain.com>', // Replace with your verified Resend domain
            to: donation.email,
            subject: 'Thank You for Your Donation!',
            react: DonationReceiptEmail({ donation }),
        });
        console.log(`Donation receipt sent to ${donation.email}`);
    } catch (error) {
        console.error("Error sending donation receipt:", error);
    }
}
