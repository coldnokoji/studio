'use client';

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getTeamMembers } from '@/services/firestore';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { TeamMember } from '@/lib/types';

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

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    getTeamMembers().then(setTeamMembers);
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
              Our Team
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              We are a group of dedicated individuals committed to making a difference.
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={itemVariants}>
                <Card className="overflow-hidden text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-2xl">
                   <div className="relative h-80 w-full">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        className="object-cover"
                        data-ai-hint={member.aiHint || 'person portrait'}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-slate-800">{member.name}</CardTitle>
                      <CardDescription className="text-brand-teal-dark font-medium">{member.role}</CardDescription>
                    </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {teamMembers.length === 0 && (
            <div className="text-center text-slate-500 mt-8">
              <p>Our team is growing. Check back soon to meet the people driving our mission.</p>
            </div>
          )}

        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}