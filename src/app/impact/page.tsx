import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getImpactStories } from '@/services/firestore';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { Target } from 'lucide-react';

const impactStats = [
    { number: '10,000+', label: 'Meals Served' },
    { number: '500+', label: 'Students Educated' },
    { number: '2,000+', label: 'Trees Planted' },
];

export default async function ImpactPage() {
  const stories = await getImpactStories();

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container py-16 sm:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              Our Impact
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Every contribution, big or small, creates a ripple of positive change. Here’s a glimpse of the lives we’ve touched together.
            </p>
          </div>
          
          <section className="bg-muted/50 py-16 sm:py-24 -mx-4 px-4 mb-16">
            <div className="container">
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl text-center mb-12">
                Our Progress by the Numbers
                </h2>
                <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                {impactStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center">
                        <Target className="h-10 w-10 text-brand-orange mb-2"/>
                        <p className="text-4xl font-bold text-slate-800 sm:text-5xl">{stat.number}</p>
                        <p className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-500">{stat.label}</p>
                    </div>
                ))}
                </div>
            </div>
          </section>

          <div className="space-y-20">
            {stories.map((story, index) => (
              <div key={story.id} className="grid items-center gap-12 md:grid-cols-2">
                <div className={`relative w-full h-[28rem] overflow-hidden rounded-2xl shadow-2xl ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                    data-ai-hint={story.aiHint || 'impact story'}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800">{story.title}</h3>
                   <blockquote className="text-lg text-slate-600 border-l-4 border-brand-yellow pl-4 italic">
                    "{story.quote}"
                  </blockquote>
                  <p className="text-slate-600">{story.story}</p>
                  <p className="font-bold text-slate-700">- {story.personName}</p>
                </div>
              </div>
            ))}
             {stories.length === 0 && (
                <div className="text-center text-slate-500 mt-8">
                    <p>We are just getting started! Check back soon to read about the lives we've changed.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
