'use server';

import { revalidatePath } from 'next/cache';
import { deleteVolunteerApplication } from '@/services/firestore';

export async function deleteVolunteerApplicationAction(id: string) {
  await deleteVolunteerApplication(id);
  revalidatePath('/admin/volunteers');
}
