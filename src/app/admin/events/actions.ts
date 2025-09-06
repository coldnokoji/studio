'use server';

import { revalidatePath } from 'next/cache';
import { saveEvent, deleteEvent } from '@/services/firestore';
import type { Event } from '@/lib/types';

export async function saveEventAction(
  id: string | undefined,
  data: Omit<Event, 'id'>
) {
  await saveEvent(id, data);
  revalidatePath('/admin/events');
  revalidatePath('/events');
}

export async function deleteEventAction(id: string) {
  await deleteEvent(id);
  revalidatePath('/admin/events');
  revalidatePath('/events');
}
