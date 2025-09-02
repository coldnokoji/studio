import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Heart, Sprout, Briefcase, Users, Globe } from 'lucide-react';

const socialCauses = [
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Providing quality education to underprivileged children.',
    href: '/what-we-do/education',
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Offering accessible healthcare services to remote communities.',
    href: '/what-we-do/healthcare',
  },
  {
    icon: Sprout,
    title: 'Environment',
    description: 'Promoting sustainable practices and environmental conservation.',
    href: '/what-we-do/environment',
  },
  {
    icon: Briefcase,
    title: 'Livelihood',
    description: 'Empowering individuals with skill development for a better future.',
    href: '/what-we-do/livelihood',
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Fostering strong and self-reliant communities.',
    href: '/what-we-do/community-building',
  },
  {
    icon: Globe,
    title: 'Disaster Relief',
    description: 'Providing immediate support during natural calamities.',
    href: '/what-we-do/disaster-relief',
  },
];

export default function WhatWeDoPage() {
  return (
    <div className="container py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          What We Do
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          We focus on key areas to create a holistic and lasting impact on society.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}
