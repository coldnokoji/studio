import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const awards = [
  {
    title: 'NGO of the Year',
    issuer: 'National CSR Network',
    year: '2023',
    image: 'https://picsum.photos/400/300',
    aiHint: 'award trophy',
  },
  {
    title: 'Excellence in Social Impact',
    issuer: 'India Philanthropy Forum',
    year: '2022',
    image: 'https://picsum.photos/400/300',
    aiHint: 'award certificate',
  },
  {
    title: 'Top-Rated Non-Profit',
    issuer: 'Charity Watch',
    year: '2022',
    image: 'https://picsum.photos/400/300',
    aiHint: 'award seal',
  },
  {
    title: 'Green Initiative Award',
    issuer: 'Ministry of Environment',
    year: '2021',
    image: 'https://picsum.photos/400/300',
    aiHint: 'award plaque',
  },
];

export default function AwardsPage() {
  return (
    <div className="container py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Awards & Recognition
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          We are humbled and honored by the recognition of our work.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {awards.map((award) => (
          <Card key={award.title} className="flex flex-col items-center text-center overflow-hidden transition-transform hover:scale-105 hover:shadow-xl md:flex-row md:text-left">
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
    </div>
  );
}
