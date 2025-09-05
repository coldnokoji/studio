
import Image from 'next/image';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAwards } from '@/services/firestore';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';

export default async function AwardsPage() {
  const awards = await getAwards();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Awards & Recognition
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
              As a new organization, we are focused on our work and look forward to future accolades.
            </p>
          </div>
          {awards.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {awards.map((award) => (
                <Card key={award.id} className="flex flex-col items-center overflow-hidden text-center transition-transform hover:scale-105 hover:shadow-xl md:flex-row md:text-left">
                  <div className="relative h-56 w-full md:h-full md:w-2/5">
                    <Image src={award.image} alt={award.title} fill className="object-cover" data-ai-hint={award.aiHint} />
                  </div>
                  <div className="flex flex-col justify-center p-6">
                      <CardHeader>
                          <CardTitle>{award.title}</CardTitle>
                          <CardDescription className="pt-1">
                              {award.issuer} - {award.year}
                          </CardDescription>
                      </CardHeader>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
