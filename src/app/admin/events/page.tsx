import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getPastEvents } from '@/services/firestore';
import { deleteEventAction } from '@/app/admin/events/actions';

export default async function AdminEventsPage() {
  const events = await getPastEvents();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <Button asChild>
          <Link href="/admin/events/new">Add New Event</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>
                {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{event.description}</p>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href={`/admin/events/${event.id}/edit`}>Edit</Link>
                </Button>
                <form action={deleteEventAction.bind(null, event.id)}>
                    <Button variant="destructive" type="submit">Delete</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
         {events.length === 0 && (
            <p>No events found. Add one to get started.</p>
        )}
      </div>
    </div>
  );
}
