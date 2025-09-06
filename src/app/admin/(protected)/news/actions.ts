'use server';

import { revalidatePath } from 'next/cache';
import { saveNewsArticle, deleteNewsArticle } from '@/services/firestore';
import type { NewsArticle } from '@/lib/types';

export async function saveNewsArticleAction(
  id: string | undefined,
  data: Omit<NewsArticle, 'id' | 'createdAt'>
) {
  await saveNewsArticle(id, data);
  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath(`/news/${id}`);
}

export async function deleteNewsArticleAction(id: string) {
  await deleteNewsArticle(id);
  revalidatePath('/admin/news');
  revalidatePath('/news');
}
