
'use server';

import { sendDonationReceipt } from '@/services/email';
import { getDonations } from '@/services/firestore';
import type { Donation } from '@/lib/types';

export async function sendTestEmailAction(): Promise<{ success: boolean; error?: string, email?: string }> {
  const testRecipientEmail = process.env.RESEND_SIGNUP_EMAIL;

  if (!testRecipientEmail) {
    const errorMessage = "RESEND_SIGNUP_EMAIL is not set in your .env.local file. Cannot send test email.";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  // --- FIX: Use a real donation instead of a fake one ---
  // Get the most recent donation from the database.
  const allDonations = await getDonations();
  if (allDonations.length === 0) {
    const errorMessage = "No donations found in the database. Please make a real donation first to generate a test email.";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
  
  // Use the most recent donation as the sample.
  const sampleDonation = allDonations[0];
  
  // Override the email to send it to the admin's test email address.
  const donationForEmail: Donation = {
      ...sampleDonation,
      email: testRecipientEmail,
  };
  // --- End of Fix ---

  try {
    // The sendDonationReceipt function handles URL creation internally
    await sendDonationReceipt(donationForEmail);
    return { success: true, email: testRecipientEmail };
  } catch (error: any) {
    console.error('Failed to send test email:', error);
    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}
