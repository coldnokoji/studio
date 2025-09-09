
'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HandHeart, IndianRupee } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';

const donationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  amount: z.coerce.number().min(10, { message: "Donation amount must be at least ₹10." }),
});

export default function DonatePage() {
  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: 100,
    },
  });

  // This is where you would handle the payment gateway integration.
  // For example, on submit, you would create an order with Razorpay on the server,
  // then open the Razorpay checkout with the order details.
  async function onSubmit(values: z.infer<typeof donationSchema>) {
    console.log("Form values:", values);
    alert(`Thank you for your donation of ₹${values.amount}, ${values.name}!\n\nA developer would now integrate Razorpay checkout here.`);
    
    // Developer Integration Steps:
    // 1. Make a call to a serverless function to create a Razorpay order.
    // 2. Receive the order_id from the server.
    // 3. Initialize Razorpay checkout with your Key ID, the order_id, and user details.
    // 4. Handle success and failure callbacks from Razorpay.
    // 5. On success, redirect to a thank you page and trigger certificate generation on the backend.
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/50">
        <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-16 sm:py-24">
          <Card className="w-full max-w-lg shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-orange">
                <HandHeart className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4 text-3xl font-bold text-slate-800">Make a Donation</CardTitle>
              <CardDescription className="text-slate-600">
                Your contribution helps us build a better tomorrow. Thank you for your support.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donation Amount</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input type="number" placeholder="Enter Amount" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full bg-brand-yellow text-slate-900 hover:bg-brand-orange" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Processing..." : "Proceed to Donate"}
                  </Button>
                </form>
              </Form>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                All donations are processed securely. You will receive a tax-exemption certificate via email.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
