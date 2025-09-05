import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Heart, Sprout, Briefcase } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';

const socialCauses = [
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Fostering knowledge and skills for a brighter future.',
    href: '/what-we-do/education',
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Promoting well-being and access to essential health services.',
    href: '/what-we-do/healthcare',
  },
  {
    icon: Sprout,
    title: 'Environment',
    description: 'Nurturing our planet through sustainable practices and conservation.',
    href: '/what-we-do/environment',
  },
  {
    icon: Briefcase,
    title: 'Livelihood',
    description: 'Creating opportunities for economic self-reliance and skill development.',
    href: '/what-we-do/livelihood',
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              What We Do
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
              Our work is centered around four key pillars to create a holistic and lasting impact.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {socialCauses.map((cause) => (
              <Link href={cause.href} key={cause.title} className="flex">
                <Card className="text-center w-full transition-transform hover:scale-105 hover:shadow-xl flex flex-col">
                  <CardContent className="p-6 flex flex-col items-center justify-center flex-grow">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <cause.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold">{cause.title}</h3>
                    <p className="mt-2 text-foreground/70 flex-grow">{cause.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
