'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveVolunteerApplication, getSiteSettings } from '@/services/firestore';
import { toast as sonnerToast } from "sonner";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { motion } from 'framer-motion';
import { HandHeart, BookOpen, Heart, Sprout, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { SiteSettings } from '@/lib/types';


const volunteerRoles = [
  {
    icon: BookOpen,
    title: "Teaching Assistant",
    description: "Assist in our community learning centers, helping children with their studies and fostering a love for learning."
  },
  {
    icon: Heart,
    title: "Health Camp Support",
    description: "Help organize and run our health check-up camps, from registration to distributing health kits."
  },
  {
    icon: Sprout,
    title: "Green Initiative Champion",
    description: "Participate in tree plantation drives, clean-up events, and help spread awareness about environmental conservation."
  },
  {
    icon: Briefcase,
    title: "Event Volunteer",
    description: "Be the backbone of our events, helping with logistics, coordination, and ensuring everything runs smoothly."
  }
];


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  areaOfInterest: z.string({ required_error: "Please select an area of interest." }),
  availability: z.string().min(5, { message: "Please tell us about your availability." }),
});

export default function GetInvolvedPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  
  useEffect(() => {
    async function fetchSettings() {
        const siteSettings = await getSiteSettings();
        setSettings(siteSettings);
    }
    fetchSettings();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", availability: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await saveVolunteerApplication(values);
      sonnerToast.success("Application Sent!", { description: "Thank you for your interest! We will get in touch with you soon." });
      form.reset();
    } catch (error) {
      sonnerToast.error("Uh oh! Something went wrong.", { description: "There was a problem with your request. Please try again." });
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container py-16 sm:py-24">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              Get Involved
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Your time and skills are valuable to us. Join our team of passionate volunteers and be a part of the change.
            </p>
          </motion.div>

          <section className="mb-24">
             <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl text-center mb-12">Volunteer Roles</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {volunteerRoles.map(role => (
                     <Card key={role.title} className="text-center h-full">
                         <CardHeader>
                             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-orange">
                                <role.icon className="h-8 w-8" />
                            </div>
                             <CardTitle className="pt-4">{role.title}</CardTitle>
                         </CardHeader>
                         <CardContent>
                             <p className="text-slate-600">{role.description}</p>
                         </CardContent>
                     </Card>
                ))}
             </div>
          </section>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                    Ready to Make a Difference?
                  </h2>
                  <p className="text-lg text-slate-600">
                    Fill out the form below to express your interest. Our team will review your application and contact you with potential opportunities that match your skills and passion. We're excited to have you on board!
                  </p>
                  <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg">
                     {settings?.getInvolvedVolunteer && (
                        <Image 
                            src={settings.getInvolvedVolunteer}
                            alt="Happy volunteers working together" 
                            fill 
                            className="object-cover" 
                            data-ai-hint="happy volunteers"/>
                     )}
                  </div>
              </div>
              <Card className="p-8 shadow-xl">
                 <CardHeader className="p-0 mb-6">
                    <CardTitle>Volunteer Sign-up Form</CardTitle>
                 </CardHeader>
                 <CardContent className="p-0">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
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
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Phone Number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="areaOfInterest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Area of Interest</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an area" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Education">Education</SelectItem>
                                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                                  <SelectItem value="Environment">Environment</SelectItem>
                                  <SelectItem value="Livelihood">Livelihood</SelectItem>
                                  <SelectItem value="Events">Events / General</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="availability"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Availability</FormLabel>
                              <FormControl>
                                <Textarea placeholder="e.g., Weekends, Evenings after 6 PM" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-brand-yellow text-slate-900 hover:bg-brand-orange">
                          {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </form>
                    </Form>
                 </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
