'use server';

import { revalidatePath } from 'next/cache';
import { saveSiteSettings } from '@/services/firestore';
import type { SiteSettings } from '@/lib/types';

export async function saveSiteSettingsAction(data: SiteSettings) {
  await saveSiteSettings(data);
  // Revalidate all pages that might use these settings
  revalidatePath('/admin/settings', 'page');
  revalidatePath('/', 'page');
  revalidatePath('/about', 'page');
  revalidatePath('/contact', 'page');
  revalidatePath('/get-involved', 'page');
  revalidatePath('/what-we-do/[slug]', 'page');
  revalidatePath('/donate/certificate/[txnid]', 'page');
}
