'use server';

import { revalidatePath } from 'next/cache';
import { saveAward, deleteAward } from '@/services/firestore';
import type { Award } from '@/lib/types';

export async function saveAwardAction(
  id: string | undefined,
  data: Omit<Award, 'id'>
) {
  await saveAward(id, data);
  revalidatePath('/admin/awards');
  revalidatePath('/awards');
}

export async function deleteAwardAction(id: string) {
  await deleteAward(id);
  revalidatePath('/admin/awards');
  revalidatePath('/awards');
}
