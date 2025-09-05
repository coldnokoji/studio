import { EventForm } from '@/app/admin/(protected)/events/event-form';
import { getEventById } from '@/services/firestore';
import { notFound } from 'next/navigation';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Edit Event</h1>
      <EventForm event={event} />
    </div>
  );
}
