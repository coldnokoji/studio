
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  Heart,
  Briefcase,
  Sprout,
} from 'lucide-react';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
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
    description: 'Nurturing our planet through sustainable practices.',
    href: '/what-we-do/environment',
  },
  {
    icon: Briefcase,
    title: 'Livelihood',
    description: 'Creating opportunities for economic self-reliance.',
    href: '/what-we-do/livelihood',
  },
];

const flagshipProjects = [
  {
    title: 'Project Gyan: Spreading the Light of Education',
    description:
      'Our foundational project, Gyan, aims to establish community learning centers to provide quality education and digital literacy, ensuring every child has the opportunity to learn and grow.',
    image: 'https://picsum.photos/600/400',
    aiHint: 'children studying',
    href: '/what-we-do/education',
  },
  {
    title: 'Arogya: A Step Towards Community Health',
    description:
      "Through 'Arogya,' we plan to organize regular health check-up camps and awareness sessions in underserved areas, focusing on preventive care and promoting a healthy lifestyle for all.",
    image: 'https://picsum.photos/600/400',
    aiHint: 'medical camp',
    href: '/what-we-do/healthcare',
  },
];


export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0">
              <Image
                src="https://picsum.photos/1920/1080"
                alt="A group of smiling people from the community"
                fill
                className="object-cover brightness-50"
                data-ai-hint="community service"
                priority
              />
          </div>
          <div className="relative z-10 container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white font-headline">
                  सेवा परमो धर्मः
                </h1>
                <p className="mx-auto max-w-[700px] text-lg text-gray-200 md:text-xl">
                  Join Shreyaskar Social Welfare Foundation in our mission to build a better, kinder world.
                </p>
              <div className="mx-auto lg:mx-0">
                <Button size="lg" asChild>
                  <Link href="/donate">Donate Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="https://picsum.photos/600/400"
                  alt="Shreyaskar Social Welfare Foundation Team"
                  fill
                  className="object-cover"
                  data-ai-hint="team beneficiaries"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Who We Are</h2>
                <p className="text-lg text-foreground/80">
                  Shreyaskar Social Welfare Foundation is a newly established non-profit organization driven by the principle of "Seva Paramo Dharma" - service as the highest duty. We are committed to fostering positive change by focusing on the core pillars of a thriving society: Education, Healthcare, Environment, and Livelihood. Our journey is just beginning, and we invite you to be a part of it.
                </p>
                <Button asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Works Section */}
        <section className="py-16 sm:py-24 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What We Do</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
              Our work is centered around four key pillars to create a holistic and lasting impact.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {socialCauses.map((cause) => (
                <Card key={cause.title} className="text-center transition-transform hover:scale-105 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <cause.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold">{cause.title}</h3>
                    <p className="mt-2 text-foreground/70">{cause.description}</p>
                    <Button variant="link" asChild className="mt-4">
                      <Link href={cause.href}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Current Projects Section */}
        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Foundational Projects</h2>
            </div>
            <div className="space-y-20">
              {flagshipProjects.map((project, index) => (
                <div key={project.title} className="grid items-center gap-12 md:grid-cols-2">
                  <div className={`relative h-96 w-full overflow-hidden rounded-lg shadow-lg ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      data-ai-hint={project.aiHint}
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-lg text-foreground/80">{project.description}</p>
                    <Button asChild>
                      <Link href={project.href}>Read More</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Donor's Testimonial Section */}
        <section className="py-16 sm:py-24 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">Words of Encouragement</h2>
            <TestimonialCarousel />
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
