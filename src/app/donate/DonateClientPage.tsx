'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { HandHeart, IndianRupee, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { toast as sonnerToast } from "sonner";
import { cn } from '@/lib/utils';
import { submitPayuForm } from '@/lib/payu';

// Import components for new fields
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DonateClientPage() {
  const searchParams = useSearchParams();

  // --- EXISTING FIELDS ---
  const [amount, setAmount] = useState<number | string>(500);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  // const [isRecurring, setIsRecurring] = useState(false); // REMOVED
  const [isLoading, setIsLoading] = useState(false);

  // --- NEW FIELDS TO ADD ---
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pan, setPan] = useState('');
  const [purpose, setPurpose] = useState(''); // This will be 'productinfo'
  const [frequency, setFrequency] = useState('ONETIME'); // New state for donation frequency

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

    // --- VALIDATE NEW FIELDS ---
    if (!name || !email || !phone || !address || !pan || !purpose) {
      sonnerToast.error("Information Missing", { description: "Please fill in all required fields." });
      setIsLoading(false);
      return;
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan.toUpperCase())) {
      sonnerToast.error("Invalid PAN", {
        description: "Please enter a valid 10-digit PAN number.",
      });
      setIsLoading(false);
      return;
    }
    // --- END VALIDATION ---

    try {
      const res = await fetch('/api/payment/payu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: donationAmount,
          name,
          email,
          isRecurring: frequency !== 'ONETIME', // Set isRecurring based on frequency
          frequency, // Pass frequency to API
          // --- PASS NEW DATA ---
          phone,
          address,
          pan: pan.toUpperCase(),
          purpose,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      submitPayuForm(data); // This is your existing correct logic

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

                {/* --- UPDATED FORM LAYOUT --- */}

                <div className="space-y-2">
                  <Label htmlFor='name'>Full Name</Label>
                  <Input id='name' type='text' placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor='email'>Email Address</Label>
                    <Input id='email' type='email' placeholder='your@email.com' value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input id='phone' type='tel' placeholder='10-digit number' value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={isLoading} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor='address'>Address</Label>
                  <Textarea id='address' placeholder='Your full address (for 80G receipt)' value={address} onChange={(e) => setAddress(e.target.value)} required disabled={isLoading} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor='pan'>PAN Number</Label>
                    <Input id='pan' type='text' placeholder='ABCDE1234F' value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} required disabled={isLoading} maxLength={10} />
                    <p className="text-xs text-muted-foreground">Required for 80G receipt.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor='purpose'>Purpose of Donation</Label>
                    <Select onValueChange={setPurpose} value={purpose} required disabled={isLoading}>
                      <SelectTrigger id="purpose">
                        <SelectValue placeholder="Select a purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Donation">General Donation</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Health & Nutrition">Health & Nutrition</SelectItem>
                        <SelectItem value="Women Empowerment">Women Empowerment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* --- END UPDATED LAYOUT --- */}


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
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="amount" type="number" placeholder="Or enter a custom amount" value={amount} onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : '')} className="pl-10" required min="1" disabled={isLoading} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Donation Frequency</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {['ONETIME', 'MONTHLY', 'QUARTERLY', 'YEARLY'].map((freq) => (
                      <Button
                        key={freq}
                        type="button"
                        variant="outline"
                        onClick={() => setFrequency(freq)}
                        className={cn(
                          frequency === freq && 'bg-brand-yellow/30 border-brand-orange text-brand-orange font-semibold',
                          "text-xs sm:text-sm px-2"
                        )}
                      >
                        {freq === 'ONETIME' ? 'One-time' : freq.charAt(0) + freq.slice(1).toLowerCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-brand-yellow text-slate-900 hover:bg-brand-orange h-12 text-lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : `Donate ${frequency === 'ONETIME' ? 'Now' : frequency.charAt(0) + frequency.slice(1).toLowerCase()}`}
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