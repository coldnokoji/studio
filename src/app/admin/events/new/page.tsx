import { EventForm } from '@/app/admin/events/event-form';

export default function NewEventPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Add New Event</h1>
      <EventForm />
    </div>
  );
}
