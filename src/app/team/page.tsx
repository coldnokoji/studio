import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getTeamMembers } from '@/services/firestore';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Our Team
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
              We are a group of dedicated individuals committed to making a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden text-center transition-transform hover:scale-105 hover:shadow-xl">
                 <div className="relative h-80 w-full">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill 
                      className="object-cover"
                      data-ai-hint={member.aiHint || 'person portrait'}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
              </Card>
            ))}
          </div>
          
          {teamMembers.length === 0 && (
            <div className="text-center text-foreground/70">
              <p>Our team is growing. Check back soon to meet the people driving our mission.</p>
            </div>
          )}

        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
