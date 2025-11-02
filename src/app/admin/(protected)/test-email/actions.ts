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

  // --- UPDATED: Create a full sample donation ---
  // We use Omit<Donation, 'id'> to ensure all fields are included
  const sampleDonationData: Omit<Donation, 'id'> = {
    name: 'Jane Donor (Test)',
    email: testRecipientEmail,
    phone: '+91 9876543210',
    address: '123 Test Street, Admin City, 400001',
    pan: 'ABCDE1234F',
    purpose: 'Test Donation for Receipt',
    amount: 500.00,
    txnid: `TXN_TEST_${Date.now()}`, // Unique txnid
    status: 'success',
    isRecurring: false,
    donationDate: new Date().toISOString(), // Use the new field
    paymentMode: 'Test Payment',
  };

  try {
    // 1. Save the test donation to the database.
    // This now saves the *full* object.
    const newDonationId = await saveDonation(sampleDonationData);
    
    revalidatePath('/admin/donations');
    revalidatePath(`/donate/receipt/${sampleDonationData.txnid}`, 'page');
    revalidatePath(`/donate/certificate/${sampleDonationData.txnid}`, 'page');
    
    // The full record now matches the type
    const fullDonationRecord: Donation = {
        ...sampleDonationData,
        id: newDonationId, // This will be the txnid
    };

    // 2. Send the email receipt
    await sendDonationReceipt(fullDonationRecord);
    return { success: true, email: testRecipientEmail };
  } catch (error: any) {
    console.error('Failed to send test email:', error);
    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}