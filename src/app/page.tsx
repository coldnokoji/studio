import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  BookOpen,
  Heart,
  Briefcase,
  Globe,
  Sprout,
  Users,
} from 'lucide-react';

const impactStats = [
  { number: '1.8M', label: 'Lives Impacted' },
  { number: '50+', label: 'Projects Completed' },
  { number: '10K+', label: 'Volunteers' },
  { number: '20+', label: 'States Covered' },
];

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
    href: '/what-we-do/community',
  },
  {
    icon: Globe,
    title: 'Disaster Relief',
    description: 'Providing immediate support during natural calamities.',
    href: '/what-we-do/disaster-relief',
  },
];

const flagshipProjects = [
  {
    title: 'Project Vidya: Education for All',
    description:
      'Project Vidya is our flagship initiative aimed at providing quality education to children in rural and underserved areas. We establish learning centers, provide digital literacy programs, and offer scholarships to meritorious students to ensure that no child is left behind.',
    image: 'https://picsum.photos/600/400',
    aiHint: 'children studying',
    href: '/projects/vidya',
  },
  {
    title: 'Arogya: Health & Wellness Camps',
    description:
      "Through 'Arogya,' we organize regular health and wellness camps in remote villages, offering free medical check-ups, distributing essential medicines, and raising awareness about preventive healthcare. Our mobile medical units reach the most inaccessible areas.",
    image: 'https://picsum.photos/600/400',
    aiHint: 'medical camp',
    href: '/projects/arogya',
  },
];

const awards = [
  { src: 'https://picsum.photos/200/150', alt: 'Award 1', aiHint: 'award logo' },
  { src: 'https://picsum.photos/200/150', alt: 'Award 2', aiHint: 'award seal' },
  { src: 'https://picsum.photos/200/150', alt: 'Award 3', aiHint: 'trophy icon' },
  { src: 'https://picsum.photos/200/150', alt: 'Award 4', aiHint: 'recognition graphic' },
  { src: 'https://picsum.photos/200/150', alt: 'Award 5', aiHint: 'certificate logo' },
  { src: 'https://picsum.photos/200/150', alt: 'Award 6', aiHint: 'award ribbon' },
];

const mediaLogos = [
  { src: 'https://picsum.photos/200/100', alt: 'Media Logo 1', aiHint: 'newspaper logo' },
  { src: 'https://picsum.photos/200/100', alt: 'Media Logo 2', aiHint: 'news channel' },
  { src: 'https://picsum.photos/200/100', alt: 'Media Logo 3', aiHint: 'magazine logo' },
  { src: 'https://picsum.photos/200/100', alt: 'Media Logo 4', aiHint: 'online portal' },
];

const corporatePartners = [
  { src: 'https://picsum.photos/200/100', alt: 'Partner 1', aiHint: 'company logo' },
  { src: 'https://picsum.photos/200/100', alt: 'Partner 2', aiHint: 'corporate logo' },
  { src: 'https://picsum.photos/200/100', alt: 'Partner 3', aiHint: 'tech company' },
  { src: 'https://picsum.photos/200/100', alt: 'Partner 4', aiHint: 'bank logo' },
  { src: 'https://picsum.photos/200/100', alt: 'Partner 5', aiHint: 'business logo' },
  { src: 'https://picsum.photos/200/100', alt: 'Partner 6', aiHint: 'industry logo' },
];

const testimonials = [
  {
    quote: "Raise India Foundation is doing phenomenal work. Their dedication to community welfare is truly inspiring. I'm proud to be a supporter.",
    name: 'Priya Sharma',
    affiliation: 'Donor',
  },
  {
    quote: "Interning here was a life-changing experience. I got to see the real impact of our efforts on the ground. The team is passionate and welcoming.",
    name: 'Rahul Verma',
    affiliation: 'Intern',
  },
  {
    quote: "The transparency and commitment of this organization are commendable. You know exactly where your contribution is going and the difference it's making.",
    name: 'Anjali Mehta',
    affiliation: 'Supporter',
  },
];


export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] w-full">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="A group of smiling people from the community"
          fill
          className="object-cover"
          data-ai-hint="community service"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <div className="container px-4">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl font-headline">
              Empowering Communities, Inspiring Change
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg text-white/90 md:text-xl">
              Join Raise India Foundation in our mission to create a brighter future for everyone.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/donate">Donate Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="bg-background py-16 sm:py-24">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">{stat.number}</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 sm:py-24 bg-muted/50">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="https://picsum.photos/600/400"
                alt="Raise India Foundation Team"
                fill
                className="object-cover"
                data-ai-hint="team beneficiaries"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Who We Are</h2>
              <p className="text-lg text-foreground/80">
                Raise India Foundation is a non-profit organization dedicated to fostering sustainable development and social equity. We work at the grassroots level to empower communities through education, healthcare, and livelihood opportunities, striving to create a world where everyone can reach their full potential.
              </p>
              <Button asChild>
                <Link href="/about">Read More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Works Section */}
      <section className="py-16 sm:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            We focus on key areas to create a holistic and lasting impact on society.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="py-16 sm:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Flagship Projects</h2>
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
      
      {/* Awards & Recognition Section */}
      <section className="py-16 sm:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Awards & Recognition</h2>
          <div className="mt-12">
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {awards.map((award, index) => (
                  <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                    <div className="p-1">
                      <div className="relative h-40 flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                        <Image src={award.src} alt={award.alt} width={150} height={100} className="object-contain" data-ai-hint={award.aiHint} />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Media Coverage Section */}
      <section className="py-16 sm:py-24 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12">As Seen In The Media</h2>
          <div>
            <h3 className="text-2xl font-bold mb-6">Print Media</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
              {mediaLogos.map((logo, index) => (
                <div key={`print-${index}`} className="relative h-20 w-40">
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" data-ai-hint={logo.aiHint} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Digital Media</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {mediaLogos.map((logo, index) => (
                <div key={`digital-${index}`} className="relative h-20 w-40">
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" data-ai-hint={`${logo.aiHint} website`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Partners Section */}
      <section className="py-16 sm:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Esteemed Corporate Partners</h2>
          <div className="mt-12">
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {corporatePartners.map((partner, index) => (
                  <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/6">
                    <div className="p-1">
                      <div className="relative h-24 flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                        <Image src={partner.src} alt={partner.alt} width={150} height={60} className="object-contain" data-ai-hint={partner.aiHint} />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Donor's Testimonial Section */}
      <section className="py-16 sm:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">What Our Supporters Say</h2>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                        <blockquote className="text-lg italic text-foreground/80">
                          "{testimonial.quote}"
                        </blockquote>
                        <p className="mt-6 font-bold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-foreground/60">{testimonial.affiliation}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </>
  );
}
