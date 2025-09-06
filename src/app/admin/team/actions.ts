'use server';

import { revalidatePath } from 'next/cache';
import { saveTeamMember, deleteTeamMember } from '@/services/firestore';
import type { TeamMember } from '@/lib/types';

export async function saveTeamMemberAction(
  id: string | undefined,
  data: Omit<TeamMember, 'id'>
) {
  await saveTeamMember(id, data);
  revalidatePath('/admin/team');
  revalidatePath('/team');
  revalidatePath('/');
}

export async function deleteTeamMemberAction(id: string) {
  await deleteTeamMember(id);
  revalidatePath('/admin/team');
  revalidatePath('/team');
  revalidatePath('/');
}
