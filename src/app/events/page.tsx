'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { getPastEvents } from '@/services/firestore';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Event } from '@/lib/types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  },
};

export default function EventsPage() {
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  useEffect(() => {
    getPastEvents().then(setPastEvents);
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container py-16 sm:py-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              Our Events
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Stay tuned for our upcoming events and initiatives.
            </p>
          </motion.div>
          
          {pastEvents.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {pastEvents.map((event) => (
                <motion.div key={event.id} variants={itemVariants}>
                  <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-2xl h-full">
                    <div className="relative h-56 w-full">
                      <Image src={event.image} alt={event.title} fill className="object-cover" data-ai-hint={event.aiHint} />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-slate-800">{event.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 pt-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-slate-600">{event.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center text-slate-500 mt-8">
              <p>We are busy planning our first events. Check back soon for updates!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}