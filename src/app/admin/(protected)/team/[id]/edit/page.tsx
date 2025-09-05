import { TeamMemberForm } from '@/app/admin/(protected)/team/team-form';
import { getTeamMemberById } from '@/services/firestore';
import { notFound } from 'next/navigation';

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const member = await getTeamMemberById(params.id);

  if (!member) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Edit Team Member</h1>
      <TeamMemberForm member={member} />
    </div>
  );
}
