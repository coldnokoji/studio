import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <section>
      <div className="relative h-[calc(100vh-4rem)] w-full">
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
              Join Raise India Foundation in our mission to create a brighter future for everyone through education, healthcare, and environmental stewardship.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/donate">Donate Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
