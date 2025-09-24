'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HandHeart, IndianRupee, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { toast as sonnerToast } from "sonner";
import { cn } from '@/lib/utils';
import { submitPayuForm } from '@/lib/payu';

export default function DonatePage() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');

    const [amount, setAmount] = useState<number | string>(500);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const status = searchParams.get('status');
        const txnid = searchParams.get('txnid');

        if (status === 'success') {
          sonnerToast.success("Donation Successful!", { 
            description: `Thank you for your generous support. Your Transaction ID is ${txnid}.`
          });
        } else if (status === 'failure') {
           sonnerToast.error("Donation Failed", { 
            description: `Your donation attempt failed. If any amount was debited, it will be refunded. Transaction ID: ${txnid}.` 
           });
        } else if (status === 'cancelled') {
             sonnerToast.warning("Donation Cancelled", {
                description: "You cancelled the donation process. You can try again anytime."
             })
        }
    }, [searchParams]);


  const handleDonation = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const donationAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (!donationAmount || donationAmount < 1) {
        sonnerToast.error("Invalid Amount", { description: "Minimum donation amount is ₹1." });
        setIsLoading(false);
        return;
    }
     if (!name || !email) {
        sonnerToast.error("Information Missing", { description: "Please provide your name and email." });
        setIsLoading(false);
        return;
    }

    try {
      const res = await fetch('/api/payment/payu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: donationAmount, name, email }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      
      // The data contains all form fields required by PayU
      // We'll use a helper function to create and submit the form
      submitPayuForm(data);

    } catch (error: any) {
      console.error(error);
      sonnerToast.error("Something went wrong", { description: error.message || "Could not initiate donation. Please try again." });
      setIsLoading(false);
    }
  };

  const presetAmounts = [250, 500, 1000, 2500, 5000];

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
                Your contribution helps us build a better tomorrow. All donations are tax-exempt under 80G.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDonation} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor='name'>Full Name</Label>
                    <Input id='name' type='text' placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor='email'>Email Address</Label>
                    <Input id='email' type='email' placeholder='your@email.com' value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
                    <p className="text-xs text-muted-foreground">Your donation receipt will be sent here.</p>
                </div>
                <div className="space-y-2">
                  <Label>Select an amount (INR)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {presetAmounts.map(preset => (
                      <Button key={preset} variant="outline" type="button" onClick={() => setAmount(preset)} className={cn(amount === preset && 'bg-brand-yellow/30 border-brand-orange')}>
                         ₹{preset}
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                    <Input id="amount" type="number" placeholder="Or enter a custom amount" value={amount} onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : '')} className="pl-10" required min="1" disabled={isLoading} />
                  </div>
                </div>
                
                 <Button type="submit" className="w-full bg-brand-yellow text-slate-900 hover:bg-brand-orange h-12 text-lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : `Donate Now`}
                 </Button>
              </form>
            </CardContent>
            <CardFooter>
                 <p className="mt-4 text-center text-xs text-muted-foreground">
                    You will be redirected to PayU, our secure payment partner, to complete the donation.
                </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
