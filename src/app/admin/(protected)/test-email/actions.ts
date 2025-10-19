
'use server';

import { sendDonationReceipt } from '@/services/email';
import { saveDonation } from '@/services/firestore';
import type { Donation } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function sendTestEmailAction(): Promise<{ success: boolean; error?: string, email?: string }> {
  const testRecipientEmail = process.env.RESEND_SIGNUP_EMAIL;

  if (!testRecipientEmail) {
    const errorMessage = "RESEND_SIGNUP_EMAIL is not set in your .env.local file. Cannot send test email.";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  // Create a perfect, hardcoded sample donation object for testing.
  const sampleDonationData: Omit<Donation, 'id' | 'createdAt'> = {
    name: 'Jane Donor (Test)',
    email: testRecipientEmail, // Always send the test to the admin's email.
    amount: 500.00,
    txnid: 'TXN_TEST_123456789',
    status: 'success',
    isRecurring: false,
  };

  try {
    // 1. Save the test donation to the database. This ensures the pages will find it.
    const newDonationId = await saveDonation(sampleDonationData);
    
    // Revalidate paths that might show donation data
    revalidatePath('/admin/donations');
    revalidatePath(`/donate/receipt/${sampleDonationData.txnid}`, 'page');
    revalidatePath(`/donate/certificate/${sampleDonationData.txnid}`, 'page');
    
    const fullDonationRecord: Donation = {
        ...sampleDonationData,
        id: newDonationId,
        createdAt: new Date().toISOString()
    };

    // 2. Send the email receipt, which now has a valid record to link to.
    await sendDonationReceipt(fullDonationRecord);
    return { success: true, email: testRecipientEmail };
  } catch (error: any) {
    console.error('Failed to send test email:', error);
    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}
