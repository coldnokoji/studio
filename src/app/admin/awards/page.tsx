import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getAwards } from '@/services/firestore';
import { deleteAwardAction } from '@/app/admin/awards/actions';

export default async function AdminAwardsPage() {
  const awards = await getAwards();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Awards</h1>
        <Button asChild>
          <Link href="/admin/awards/new">Add New Award</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {awards.map((award) => (
          <Card key={award.id}>
            <CardHeader>
              <CardTitle>{award.title}</CardTitle>
              <CardDescription>{award.issuer} - {award.year}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href={`/admin/awards/${award.id}/edit`}>Edit</Link>
                </Button>
                <form action={deleteAwardAction.bind(null, award.id)}>
                    <Button variant="destructive" type="submit">Delete</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
        {awards.length === 0 && (
            <p>No awards found. Add one to get started.</p>
        )}
      </div>
    </div>
  );
}
