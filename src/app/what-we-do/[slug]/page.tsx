import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BookOpen, Heart, Sprout, Briefcase, Users, Globe } from 'lucide-react';
import { notFound } from 'next/navigation';

const programs = {
  education: {
    icon: BookOpen,
    title: 'Education',
    description: 'Our education programs focus on providing access to quality learning for children in underserved communities. We build schools, provide scholarships, and implement digital literacy projects to bridge the educational gap.',
    stats: [
      { number: '50,000+', label: 'Children Enrolled' },
      { number: '200+', label: 'Schools Supported' },
      { number: '5,000+', label: 'Scholarships Awarded' },
    ],
    images: [
      { src: 'https://picsum.photos/600/400', alt: 'Children in a classroom', aiHint: 'children classroom' },
      { src: 'https://picsum.photos/600/400', alt: 'Student receiving a scholarship', aiHint: 'student award' },
      { src: 'https://picsum.photos/600/400', alt: 'Digital literacy class', aiHint: 'computer class' },
    ],
  },
  healthcare: {
    icon: Heart,
    title: 'Healthcare',
    description: 'We believe that healthcare is a fundamental right. Our healthcare initiatives include mobile medical camps, free health check-ups, and awareness campaigns on sanitation and hygiene in remote and rural areas.',
    stats: [
      { number: '1.2M+', label: 'Patients Treated' },
      { number: '1,500+', label: 'Medical Camps Held' },
      { number: '50+', label: 'Mobile Medical Units' },
    ],
    images: [
      { src: 'https://picsum.photos/600/400', alt: 'Doctor examining a patient', aiHint: 'doctor patient' },
      { src: 'https://picsum.photos/600/400', alt: 'Mobile medical van', aiHint: 'medical van' },
      { src: 'https://picsum.photos/600/400', alt: 'Health awareness session', aiHint: 'community meeting' },
    ],
  },
   environment: {
    icon: Sprout,
    title: 'Environment',
    description: 'Our environment programs aim to promote sustainability and conserve natural resources. We organize large-scale tree plantation drives, conduct clean-up campaigns, and promote renewable energy sources in communities.',
    stats: [
      { number: '1M+', label: 'Trees Planted' },
      { number: '500+', label: 'Clean-Up Drives' },
      { number: '100+', label: 'Villages with Solar Power' },
    ],
    images: [
      { src: 'https://picsum.photos/600/400', alt: 'People planting trees', aiHint: 'planting trees' },
      { src: 'https://picsum.photos/600/400', alt: 'River clean-up drive', aiHint: 'river cleaning' },
      { src: 'https://picsum.photos/600/400', alt: 'Solar panels in a village', aiHint: 'solar panels' },
    ],
  },
  livelihood: {
    icon: Briefcase,
    title: 'Livelihood',
    description: 'We empower individuals by providing vocational training and skill development programs. Our goal is to create sustainable livelihood opportunities, especially for women and youth, to help them achieve economic independence.',
    stats: [
      { number: '25,000+', label: 'Youth Trained' },
      { number: '5,000+', label: 'Women Self-Help Groups' },
      { number: '80%', label: 'Placement Rate' },
    ],
     images: [
      { src: 'https://picsum.photos/600/400', alt: 'Woman in a tailoring class', aiHint: 'woman sewing' },
      { src: 'https://picsum.photos/600/400', alt: 'Students in a computer lab', aiHint: 'computer training' },
      { src: 'https://picsum.photos/600/400', alt: 'Group of artisans with their products', aiHint: 'local artisans' },
    ],
  },
  'community-building': {
    icon: Users,
    title: 'Community Building',
    description: 'We work to foster strong, resilient, and self-reliant communities. Our initiatives focus on infrastructure development, promoting social harmony, and empowering local governance.',
    stats: [
      { number: '100+', label: 'Community Centers Built' },
      { number: '1,000+', label: 'Community Leaders Trained' },
      { number: '50+', label: 'Model Villages Developed' },
    ],
     images: [
      { src: 'https://picsum.photos/600/400', alt: 'Community meeting', aiHint: 'village meeting' },
      { src: 'https://picsum.photos/600/400', alt: 'Inauguration of a community hall', aiHint: 'community center' },
      { src: 'https://picsum.photos/600/400', alt: 'Villagers working together', aiHint: 'community work' },
    ],
  },
  'disaster-relief': {
    icon: Globe,
    title: 'Disaster Relief',
    description: 'In times of natural calamities, we provide immediate relief and long-term rehabilitation support. Our teams are trained to respond quickly with food, shelter, medical aid, and other essentials to affected populations.',
    stats: [
      { number: '20+', label: 'Disasters Responded To' },
      { number: '500K+', label: 'People Assisted' },
      { number: '10,000+', label: 'Relief Kits Distributed' },
    ],
    images: [
      { src: 'https://picsum.photos/600/400', alt: 'Distributing food supplies', aiHint: 'food distribution' },
      { src: 'https://picsum.photos/600/400', alt: 'Temporary shelters', aiHint: 'relief camp' },
      { src: 'https://picsum.photos/600/400', alt: 'Medical team providing aid', aiHint: 'first aid' },
    ],
  }
};

type ProgramPageProps = {
  params: {
    slug: string;
  };
};

export default function ProgramPage({ params }: ProgramPageProps) {
  const program = programs[params.slug as keyof typeof programs];

  if (!program) {
    notFound();
  }

  return (
    <>
      <section className="relative h-80 w-full">
        <Image
          src={`https://picsum.photos/1920/600?${program.title.toLowerCase().replace(' ', '-')}`}
          alt={program.title}
          fill
          className="object-cover"
          data-ai-hint={`${program.title.toLowerCase()} program`}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {program.title}
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Approach
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              {program.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 sm:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
            Impact in Numbers
          </h2>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {program.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-primary sm:text-5xl">{stat.number}</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
            Gallery
          </h2>
          <Carousel className="w-full max-w-6xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {program.images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        data-ai-hint={image.aiHint}
                      />
                    </div>
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
