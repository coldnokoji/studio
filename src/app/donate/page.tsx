
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
import { toast as sonnerToast } from "sonner";


declare const Razorpay: any;

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

  async function onSubmit(values: z.infer<typeof donationSchema>) {
    try {
        const response = await fetch('/api/payment/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: values.amount * 100, // Amount in paise
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create payment order.');
        }

        const order = await response.json();
        
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Shreyaskar Social Welfare Foundation",
            description: "Donation to support our causes",
            order_id: order.id,
            handler: function (response: any) {
                // This function is called after a successful payment
                sonnerToast.success("Donation Successful!", { description: `Thank you for your generous contribution. Payment ID: ${response.razorpay_payment_id}`});
                // Here, you would typically verify the payment signature on your backend
                // and then trigger the certificate generation.
                console.log(response);
            },
            prefill: {
                name: values.name,
                email: values.email,
            },
            theme: {
                color: "#F97316" // This should match your brand orange
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();

    } catch (error) {
        console.error("Payment Error:", error);
        sonnerToast.error("Uh oh! Something went wrong.", { description: "There was a problem processing your donation. Please try again." });
    }
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
                All donations are processed securely by Razorpay. You will receive a tax-exemption certificate via email.
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
