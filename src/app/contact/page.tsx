'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { saveContactMessage } from '@/services/firestore';
import { Phone, Mail, MapPin } from 'lucide-react';
import { toast as sonnerToast } from "sonner";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { motion, Variants } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must be less than 500 characters." }),
});

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

export default function ContactUsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await saveContactMessage(values);
      sonnerToast.success("Message Sent!", { description: "Thank you for contacting us. We will get back to you shortly." });
      form.reset();
    } catch (error) {
      sonnerToast.error("Uh oh! Something went wrong.", { description: "There was a problem with your request. Please try again." });
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="py-20 sm:py-28">
          <div className="container">
            <motion.div 
              variants={fadeInVariants}
              initial="initial"
              whileInView="inView"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
                Contact Us
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                We'd love to hear from you. Get in touch with us.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              <motion.div 
                variants={fadeInVariants}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-slate-800">Get in Touch</h2>
                  <div className="space-y-4 text-slate-600">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-brand-orange mt-1 flex-shrink-0" />
                      <span>123 Social Welfare Avenue<br/>Mumbai, 400001, India</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="h-6 w-6 text-brand-orange flex-shrink-0" />
                      <a href="tel:+911234567890" className="hover:text-brand-orange">+91 123 456 7890</a>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="h-6 w-6 text-brand-orange flex-shrink-0" />
                      <a href="mailto:contact@shreyaskar.org" className="hover:text-brand-orange">contact@shreyaskar.org</a>
                    </div>
                  </div>
                </div>
                <div className="h-96 w-full rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://maps.google.com/maps?width=100%25&height=100%25&hl=en&q=Mumbai,%20India&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of our location"
                  ></iframe>
                </div>
              </motion.div>
              <motion.div 
                variants={fadeInVariants}
                initial="initial"
                whileInView="inView"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold mb-4 text-slate-800">Send us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your Message" rows={5} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={form.formState.isSubmitting} className="bg-brand-yellow text-slate-900 hover:bg-brand-orange">
                      {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}