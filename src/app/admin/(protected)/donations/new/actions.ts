'use server';

import { revalidatePath } from 'next/cache';
import { saveDonation } from '@/services/firestore';
import type { Donation } from '@/lib/types';

interface ManualDonationInput {
  name: string;
  email: string;
  amount: number;
  txnid: string;
  isRecurring: boolean;
}

export async function saveManualDonationAction(data: ManualDonationInput) {
  const donationData: Omit<Donation, 'id' | 'createdAt'> = {
    ...data,
    status: 'success', // Manual entries are always considered successful
  };
  
  await saveDonation(donationData);
  
  revalidatePath('/admin/donations');
  revalidatePath('/admin/test-email');
}
