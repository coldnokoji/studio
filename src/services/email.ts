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
            // IMPORTANT: For testing without a custom domain, use Resend's sandbox email.
            // Emails will be sent *from* this address.
            from: 'Shreyaskar Foundation <onboarding@resend.dev>',
            
            // For the sandbox to work, the 'to' address MUST be the same email you
            // used to sign up for your Resend account.
            to: donation.email,
            
            subject: 'Thank You for Your Donation!',
            react: DonationReceiptEmail({ donation }),
        });
        console.log(`Donation receipt sent to ${donation.email}`);
    } catch (error) {
        console.error("Error sending donation receipt:", error);
        // Note: This might fail if the 'to' email is not your verified Resend account email.
    }
}
