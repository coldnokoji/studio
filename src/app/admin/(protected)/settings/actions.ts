'use server';

import { revalidatePath } from 'next/cache';
import { saveSiteSettings } from '@/services/firestore';
import type { SiteSettings } from '@/lib/types';

export async function saveSiteSettingsAction(data: SiteSettings) {
  await saveSiteSettings(data);
  // Revalidate all pages that use these settings
  revalidatePath('/admin/settings');
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/get-involved');
}
