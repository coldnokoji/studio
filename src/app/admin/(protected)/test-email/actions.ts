
'use server';

import { sendDonationReceipt } from '@/services/email';
import type { Donation } from '@/lib/types';

export async function sendTestEmailAction(): Promise<{ success: boolean; error?: string, email?: string }> {
  const testRecipientEmail = process.env.RESEND_SIGNUP_EMAIL;

  if (!testRecipientEmail) {
    const errorMessage = "RESEND_SIGNUP_EMAIL is not set in your .env.local file. Cannot send test email.";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  // Create a perfect, hardcoded sample donation object for testing.
  // This avoids any issues with database entries and guarantees the data is correct.
  const sampleDonation: Donation = {
    id: 'test-id-123',
    name: 'Jane Donor',
    email: testRecipientEmail, // Always send the test to the admin's email.
    amount: 500.00,
    txnid: 'TXN_TEST_123456789',
    status: 'success',
    isRecurring: false,
    createdAt: new Date().toISOString(),
  };

  try {
    // The sendDonationReceipt function handles URL creation internally.
    await sendDonationReceipt(sampleDonation);
    return { success: true, email: testRecipientEmail };
  } catch (error: any) {
    console.error('Failed to send test email:', error);
    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}
