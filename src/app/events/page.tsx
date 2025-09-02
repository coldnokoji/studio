import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const pastEvents = [
  {
    title: 'Annual Gala 2023',
    date: 'December 15, 2023',
    description: 'A night of celebration and fundraising, where we showcased our year\'s achievements and honored our most dedicated supporters and volunteers.',
    image: 'https://picsum.photos/600/400',
    aiHint: 'gala event',
  },
  {
    title: 'Community Health Camp',
    date: 'October 2-4, 2023',
    description: 'A 3-day health camp providing free medical check-ups, consultations, and medicines to over 2,000 people in remote villages.',
    image: 'https://picsum.photos/600/400',
    aiHint: 'medical camp',
  },
  {
    title: 'Nationwide Tree Plantation Drive',
    date: 'August 15, 2023',
    description: 'In celebration of Independence Day, we organized a massive tree plantation drive across 10 states, planting over 100,000 saplings.',
    image: 'https://picsum.photos/600/400',
    aiHint: 'people planting trees',
  },
  {
    title: 'Youth Skill Development Workshop',
    date: 'June 5-10, 2023',
    description: 'A week-long workshop focused on empowering young adults with digital literacy and vocational skills for better livelihood opportunities.',
    image: 'https://picsum.photos/600/400',
    aiHint: 'students workshop',
  },
];

export default function EventsPage() {
  return (
    <div className="container py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Past Events
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          A look back at our impactful events and initiatives.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pastEvents.map((event) => (
          <Card key={event.title} className="flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
            <div className="relative h-56 w-full">
              <Image src={event.image} alt={event.title} fill className="object-cover" data-ai-hint={event.aiHint} />
            </div>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {event.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-foreground/80">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
