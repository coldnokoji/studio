import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getTeamMembers } from '@/services/firestore';
import { deleteTeamMemberAction } from '@/app/admin/team/actions';

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Team</h1>
        <Button asChild>
          <Link href="/admin/team/new">Add New Member</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href={`/admin/team/${member.id}/edit`}>Edit</Link>
                </Button>
                <form action={deleteTeamMemberAction.bind(null, member.id)}>
                    <Button variant="destructive" type="submit">Delete</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
        {members.length === 0 && (
            <p>No team members found. Add one to get started.</p>
        )}
      </div>
    </div>
  );
}
