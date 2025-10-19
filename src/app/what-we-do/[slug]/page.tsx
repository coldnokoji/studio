
'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BookOpen, Heart, Sprout, Briefcase } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { getSiteSettings } from '@/services/firestore';
import type { SiteSettings } from '@/lib/types';
import { useEffect, useState, use } from 'react';

const programsData = {
  education: {
    icon: BookOpen,
    title: 'Education',
    description: 'Our educational initiatives aim to unlock the potential of every child. We are focused on establishing learning centers, providing essential materials, and integrating digital tools to make learning accessible and engaging.',
    stats: [
      { number: '100+', label: 'Students We Aim to Reach Initially' },
      { number: '5', label: 'Community Learning Centers Planned' },
      { number: '1,000+', label: 'Books to be Distributed' },
    ],
  },
  healthcare: {
    icon: Heart,
    title: 'Healthcare',
    description: "We believe a healthy community is a strong community. Our healthcare goals include organizing free medical check-up camps, running awareness campaigns on preventive care, and ensuring basic health services reach the underserved.",
    stats: [
      { number: '500+', label: 'People We Plan to Serve' },
      { number: '10+', label: 'Health Camps to be Organized' },
      { number: '1,000+', label: 'Health Kits to be Distributed' },
    ],
  },
   environment: {
    icon: Sprout,
    title: 'Environment',
    description: 'Nurturing our planet is our collective responsibility. We are launching initiatives like tree plantation drives, promoting waste management, and raising awareness about sustainable living to protect our environment for future generations.',
    stats: [
      { number: '1,000+', label: 'Trees We Aim to Plant' },
      { number: '5+', label: 'Clean-Up Drives Planned' },
      { number: '10+', label: 'Villages in Our Awareness Campaign' },
    ],
  },
  livelihood: {
    icon: Briefcase,
    title: 'Livelihood',
    description: 'Empowering individuals with skills is key to self-reliance. Our livelihood programs will focus on providing vocational training and supporting local artisans and farmers, creating sustainable economic opportunities.',
    stats: [
      { number: '100+', label: 'Youth to be Trained' },
      { number: '10+', label: 'Skill Development Workshops' },
      { number: '50+', label: 'Families We Aim to Support' },
    ],
  }
};

type ProgramSlug = keyof typeof programsData;

type ProgramPageProps = {
  params: Promise<{
    slug: ProgramSlug;
  }>;
};

export default function ProgramPage({ params: paramsProp }: ProgramPageProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const params = use(paramsProp);
  const slug = params.slug;

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  const program = programsData[slug];

  if (!program) {
    notFound();
  }
  
  const programImages = settings ? {
    education: {
      hero: settings.programEducationHero,
      gallery: [settings.programEducationGallery1, settings.programEducationGallery2, settings.programEducationGallery3]
    },
    healthcare: {
      hero: settings.programHealthcareHero,
      gallery: [settings.programHealthcareGallery1, settings.programHealthcareGallery2, settings.programHealthcareGallery3]
    },
    environment: {
      hero: settings.programEnvironmentHero,
      gallery: [settings.programEnvironmentGallery1, settings.programEnvironmentGallery2, settings.programEnvironmentGallery3]
    },
    livelihood: {
      hero: settings.programLivelihoodHero,
      gallery: [settings.programLivelihoodGallery1, settings.programLivelihoodGallery2, settings.programLivelihoodGallery3]
    },
  } : null;

  const currentImages = programImages ? programImages[slug] : null;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container">
          <section className="w-full py-20 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
                {currentImages?.hero && (
                  <Image
                    src={currentImages.hero}
                    alt={program.title}
                    fill
                    className="object-cover"
                    data-ai-hint={`${slug} program`}
                  />
                )}
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    {program.title}
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    {program.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-muted/50 py-16 sm:py-24 -mx-4 px-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
              Our Initial Goals
            </h2>
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              {program.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold text-primary sm:text-5xl">{stat.number}</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wider text-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16 sm:py-24">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
              Gallery
            </h2>
            {currentImages && (
              <Carousel className="w-full max-w-6xl mx-auto" opts={{ loop: true }}>
                <CarouselContent>
                  {currentImages.gallery.map((imageSrc, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
                          <Image
                            src={imageSrc}
                            alt={`${program.title} gallery image ${index + 1}`}
                            fill
                            className="object-cover"
                            data-ai-hint={`${slug} community`}
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </section>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
