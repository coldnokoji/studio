'use server';

import { revalidatePath } from 'next/cache';
import { saveGalleryImage, deleteGalleryImage } from '@/services/firestore';
import type { GalleryImage } from '@/lib/types';

export async function saveGalleryImageAction(
  id: string | undefined,
  data: Omit<GalleryImage, 'id'>
) {
  await saveGalleryImage(id, data);
  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
}

export async function deleteGalleryImageAction(id: string) {
  await deleteGalleryImage(id);
  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
}
