

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Heart, Briefcase, Sprout } from 'lucide-react';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { getTeamMembers, getSiteSettings } from '@/services/firestore';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { TeamMember, SiteSettings } from '@/lib/types';


const WaveDivider = () => (
  <div className="bg-transparent">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-24">
      <path
        d="M0,50 C150,150 350,-50 500,50 C650,150 850,-50 1000,50 C1150,150 1300,-50 1440,50 L1440,100 L0,100 Z"
        className="fill-muted/50"
      ></path>
    </svg>
  </div>
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const socialCauses = [
    { icon: BookOpen, title: 'Education', description: 'Fostering knowledge and skills for a brighter future.', href: '/what-we-do/education' },
    { icon: Heart, title: 'Healthcare', description: 'Promoting well-being and access to essential health services.', href: '/what-we-do/healthcare' },
    { icon: Sprout, title: 'Environment', description: 'Nurturing our planet through sustainable practices.', href: '/what-we-do/environment' },
    { icon: Briefcase, title: 'Livelihood', description: 'Creating opportunities for economic self-reliance.', href: '/what-we-do/livelihood' },
];

export default function Home() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function fetchData() {
        const members = (await getTeamMembers()).slice(0, 3);
        setTeamMembers(members);
        const siteSettings = await getSiteSettings();
        setSettings(siteSettings);
    }
    fetchData();
  }, []);

  const fadeInAnimation: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        ease: 'easeInOut',
        duration: 0.8,
      },
    }),
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <section className="relative w-full h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
           {settings?.homeHeroVideoUrl && (
            <video
                src={settings.homeHeroVideoUrl}
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.5]"
            />
           )}
          <div className="relative z-10 container px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-black/20 backdrop-blur-md p-8 md:p-12 rounded-2xl"
            >
              <div className="flex flex-col items-center space-y-6">
                <motion.h1
                  variants={fadeInAnimation}
                  initial="initial"
                  animate="animate"
                  custom={1}
                  className="pt-2 text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-yellow bg-clip-text text-transparent font-headline"
                >
                  सेवा परमो धर्मः
                </motion.h1>
                <motion.p
                  variants={fadeInAnimation}
                  initial="initial"
                  animate="animate"
                  custom={2}
                  className="mx-auto max-w-[700px] text-lg text-gray-100 md:text-xl"
                >
                  Join Shreyaskar Social Welfare Foundation in our mission to build a better, kinder world.
                </motion.p>
                <motion.div
                  variants={fadeInAnimation}
                  initial="initial"
                  animate="animate"
                  custom={3}
                >
                  <Button size="lg" asChild className="bg-brand-yellow text-slate-900 hover:bg-brand-orange transition-transform hover:scale-105">
                    <Link href="/donate">Donate Now</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-20 sm:py-28 overflow-hidden">
          <div className="container max-w-6xl mx-auto">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-2xl"
              >
                {settings?.homeHeroCommunity && (
                  <Image
                    src={settings.homeHeroCommunity}
                    alt="A happy group of volunteers"
                    fill
                    className="object-cover"
                    data-ai-hint="happy volunteers community"
                  />
                )}
              </motion.div>
              <motion.div
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 0.8, ease: 'easeOut' }}
                 className="space-y-4 text-center lg:text-left"
              >
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Who We Are</h2>
                {settings?.homeIntro && (
                  <p className="text-lg text-slate-600">
                    {settings.homeIntro}
                  </p>
                )}
                <Button asChild className="bg-brand-yellow text-slate-900 hover:bg-brand-orange">
                  <Link href="/about" aria-label="Learn more about us">Learn More</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <WaveDivider />

        {/* Our Works Section */}
        <section className="py-20 sm:py-28 bg-muted/50">
          <div className="container max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">What We Do</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Our work is centered around four key pillars to create a holistic and lasting impact.
            </p>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {socialCauses.map((cause) => (
                <motion.div key={cause.title} variants={itemVariants} className="h-full">
                   <Card className="group relative text-center h-full overflow-hidden rounded-2xl border-2 border-transparent transition-all duration-300 hover:shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow via-brand-orange to-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-white h-full rounded-[14px] p-1">
                          <CardContent className="p-6 flex flex-col items-center h-full">
                              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-orange transition-transform duration-300 group-hover:scale-110">
                                <cause.icon className="h-8 w-8" />
                              </div>
                              <h3 className="mt-6 text-xl font-bold text-slate-800">{cause.title}</h3>
                              <p className="mt-2 text-slate-600 flex-grow">{cause.description}</p>
                              <Button variant="link" asChild className="mt-4 text-brand-orange group-hover:text-slate-800 transition-colors">
                                <Link href={cause.href}>Read More</Link>
                              </Button>
                          </CardContent>
                      </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        <div style={{ transform: 'scaleY(-1)' }}><WaveDivider /></div>

        <WaveDivider />
        <section className="py-20 sm:py-28 bg-muted/50">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="container"
            >
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl text-center mb-12">Words of Encouragement</h2>
                <TestimonialCarousel />
            </motion.div>
        </section>

      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
