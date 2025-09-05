
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { getPastEvents } from '@/services/firestore';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';

export default async function EventsPage() {
  const pastEvents = await getPastEvents();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Past Events
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
              A look back at our impactful events and initiatives.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <Card key={event.id} className="flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
                <div className="relative h-56 w-full">
                  <Image src={event.image} alt={event.title} fill className="object-cover" data-ai-hint={event.aiHint} />
                </div>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 pt-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
