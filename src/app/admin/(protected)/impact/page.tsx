import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getImpactStories } from '@/services/firestore';
import { deleteImpactStoryAction } from '@/app/admin/(protected)/impact/actions';

export default async function AdminImpactStoriesPage() {
  const stories = await getImpactStories();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Impact Stories</h1>
        <Button asChild>
          <Link href="/admin/impact/new">Add New Story</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {stories.map((story) => (
          <Card key={story.id}>
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
              <CardDescription>By {story.personName}</CardDescription>
            </CardHeader>
            <CardContent>
               <p className="mb-4 italic">"{story.quote}"</p>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href={`/admin/impact/${story.id}/edit`}>Edit</Link>
                </Button>
                <form action={deleteImpactStoryAction.bind(null, story.id)}>
                    <Button variant="destructive" type="submit">Delete</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
        {stories.length === 0 && (
            <p>No impact stories found. Add one to get started.</p>
        )}
      </div>
    </div>
  );
}
