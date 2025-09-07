'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { motion, Variants } from 'framer-motion';

// Define the animation as a typed Variants object
const fadeInVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  inView: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut'
    }
  }
};

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

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="w-full py-20 lg:py-32">
          <div className="container">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl"
                >
                  <Image
                    src="/ngologo.jpeg"
                    alt="Shreyaskar Social Welfare Foundation Logo"
                    fill
                    className="object-contain p-4"
                  />
                </motion.div>
                <motion.div 
                  variants={fadeInVariants}
                  initial="initial"
                  whileInView="inView"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex flex-col justify-center space-y-4 text-center lg:text-left"
                >
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
                      About Shreyaskar
                    </h1>
                    <p className="max-w-[600px] text-slate-600 md:text-xl lg:text-2xl">
                      Laying the groundwork for a compassionate and self-reliant society through dedicated service.
                    </p>
                  </div>
                </motion.div>
              </div>
          </div>
        </section>
        
        <WaveDivider />

        <section className="py-16 sm:py-24 bg-muted/50">
            <div className="container max-w-5xl mx-auto">
              <div className="space-y-12">
                <motion.div 
                  variants={fadeInVariants}
                  initial="initial"
                  whileInView="inView"
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-center"
                >
                  <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                    Our Mission & Vision
                  </h2>
                </motion.div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <motion.div 
                    variants={fadeInVariants}
                    initial="initial"
                    whileInView="inView"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Card className="h-full rounded-2xl shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-brand-teal-dark">Our Mission</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          To empower communities by fostering sustainable development in education, healthcare, environment, and livelihood. We are dedicated to creating a foundation of opportunity for every individual to lead a life of dignity and purpose.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div 
                     variants={fadeInVariants}
                     initial="initial"
                     whileInView="inView"
                     viewport={{ once: true, amount: 0.3 }}
                  >
                    <Card className="h-full rounded-2xl shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-brand-teal-dark">Our Vision</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          We envision a self-reliant and compassionate India, where all citizens have the resources and opportunities they need to thrive, contributing to a society built on the principles of service, equality, and justice.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
        </section>

        <div style={{ transform: 'scaleY(-1)' }}><WaveDivider /></div>
        
        <section className="py-16 sm:py-24">
          <div className="container grid items-center gap-12 md:grid-cols-2 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative h-[28rem] w-full overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="https://picsum.photos/seed/founder/800/1000"
                alt="Founder of Shreyaskar Social Welfare Foundation"
                fill
                className="object-cover"
                data-ai-hint="founder portrait"
              />
            </motion.div>
            <motion.div 
              variants={fadeInVariants}
              initial="initial"
              whileInView="inView"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Founder's Message</h2>
              <blockquote className="text-lg text-slate-600 border-l-4 border-brand-yellow pl-4 italic">
                "With a firm belief in 'Seva Paramo Dharma' - service as our highest duty - we have embarked on this journey. Shreyaskar is born from a desire to create tangible change from the ground up. Every small step we take today is a seed planted for a better tomorrow. I invite you to join us in nurturing these seeds of hope and building a brighter future together."
              </blockquote>
              <p className="font-bold text-slate-700">- Founder's Name</p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
