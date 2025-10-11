
'use server';

import { sendDonationReceipt } from '@/services/email';
import type { Donation } from '@/lib/types';

export async function sendTestEmailAction(): Promise<{ success: boolean; error?: string, email?: string }> {
  // IMPORTANT: For this test to work, the `to` email address must be the one
  // you used to sign up for your Resend account, as we are using the sandbox domain.
  // In a real scenario, this would be the donor's email.
  const testRecipientEmail = process.env.RESEND_SIGNUP_EMAIL;

  if (!testRecipientEmail) {
    const errorMessage = "RESEND_SIGNUP_EMAIL is not set in your .env.local file. Cannot send test email.";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }
  
  const sampleDonation: Donation = {
    id: 'test-donation-123',
    name: 'Test Donor',
    email: testRecipientEmail,
    amount: 500,
    txnid: 'TXN_TEST_123456789',
    status: 'success',
    isRecurring: false,
    createdAt: new Date().toISOString(),
  };

  try {
    await sendDonationReceipt(sampleDonation);
    return { success: true, email: testRecipientEmail };
  } catch (error: any) {
    console.error('Failed to send test email:', error);
    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}
