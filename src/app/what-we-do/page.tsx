'use client';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Heart, Sprout, Briefcase } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { motion, Variants } from 'framer-motion';

const socialCauses = [
  { icon: BookOpen, title: 'Education', description: 'Fostering knowledge and skills for a brighter future.', href: '/what-we-do/education' },
  { icon: Heart, title: 'Healthcare', description: 'Promoting well-being and access to essential health services.', href: '/what-we-do/healthcare' },
  { icon: Sprout, title: 'Environment', description: 'Nurturing our planet through sustainable practices and conservation.', href: '/what-we-do/environment' },
  { icon: Briefcase, title: 'Livelihood', description: 'Creating opportunities for economic self-reliance and skill development.', href: '/what-we-do/livelihood' },
];

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

export default function WhatWeDoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container py-16 sm:py-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              What We Do
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Our work is centered around four key pillars to create a holistic and lasting impact.
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2"
          >
            {socialCauses.map((cause) => (
              <motion.div key={cause.title} variants={itemVariants} className="h-full">
                <Link href={cause.href} className="h-full flex">
                  <Card className="group relative text-center h-full w-full overflow-hidden rounded-2xl border-2 border-transparent transition-all duration-300 hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-white h-full rounded-[14px] p-1">
                      <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10 text-brand-teal-dark transition-transform duration-300 group-hover:scale-110">
                          <cause.icon className="h-8 w-8" />
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-slate-800">{cause.title}</h3>
                        <p className="mt-2 text-slate-600 flex-grow">{cause.description}</p>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}