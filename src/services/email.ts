// src/services/email.ts

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

  // --- FIX: Use Netlify's URL, your .env URL, or fallback to localhost ---
  const baseUrl = process.env.DEPLOY_PRIME_URL || 
                  process.env.NEXT_PUBLIC_BASE_URL || 
                  'http://localhost:3000';

  try {
    await resend.emails.send({
      from: 'Shreyaskar Foundation <onboarding@resend.dev>', // TODO: Change this to your "from" email
      to: donation.email,
      subject: 'Thank You for Your Donation!',
      
      // Pass all props, INCLUDING the baseUrl
      react: DonationReceiptEmail({
        ...donation,
        baseUrl: baseUrl, // <-- ADD THIS PROP
      }),
    });
    console.log(`Donation receipt sent to ${donation.email}`);
  } catch (error) {
    console.error("Error sending donation receipt:", error);
  }
}