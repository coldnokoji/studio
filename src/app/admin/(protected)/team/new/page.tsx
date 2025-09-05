import { TeamMemberForm } from '@/app/admin/(protected)/team/team-form';

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Add New Team Member</h1>
      <TeamMemberForm />
    </div>
  );
}
