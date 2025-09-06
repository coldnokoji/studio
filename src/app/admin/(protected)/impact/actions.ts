'use server';

import { revalidatePath } from 'next/cache';
import { saveImpactStory, deleteImpactStory } from '@/services/firestore';
import type { ImpactStory } from '@/lib/types';

export async function saveImpactStoryAction(
  id: string | undefined,
  data: Omit<ImpactStory, 'id'>
) {
  await saveImpactStory(id, data);
  revalidatePath('/admin/impact');
  revalidatePath('/impact');
}

export async function deleteImpactStoryAction(id: string) {
  await deleteImpactStory(id);
  revalidatePath('/admin/impact');
  revalidatePath('/impact');
}
