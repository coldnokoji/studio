'use server';

import { revalidatePath } from 'next/cache';
import { saveDonation as saveDonationToDb } from '@/services/firestore';
import type { Donation } from '@/lib/types';

export async function saveDonation(donationData: Omit<Donation, 'id' | 'createdAt'>) {
    try {
        await saveDonationToDb(donationData);
        revalidatePath('/admin/donations');
    } catch (error) {
        console.error("Failed to save donation from client-side action", error);
        // We don't throw here, as this is a best-effort save from the client.
        // The webhook is the source of truth.
    }
}
