
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HandHeart, IndianRupee, QrCode } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import Image from 'next/image';

// IMPORTANT: Replace this with the actual path to your QR code image in the /public directory
const aadharCardImage = '/aadhar_card.jpg';

export default function DonatePage() {
  const upiId = 'shreyaskar.foundation@upi'; // IMPORTANT: Replace with your actual UPI ID

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId);
    // You might want to add a toast notification here to confirm the copy
    alert('UPI ID copied to clipboard!');
  };

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
                Your contribution helps us build a better tomorrow. You can donate directly using UPI.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-slate-700">Scan to Pay</h3>
                <div className="relative mx-auto h-64 w-64 rounded-lg border-4 border-brand-yellow p-2 shadow-inner">
                  {/*
                    How to add your QR Code:
                    1. Generate a QR code from your UPI app (Google Pay, PhonePe, etc.).
                    2. Save the image as 'upi-qrcode.png' (or any other name).
                    3. Place the image inside the /public folder of your project.
                    4. Update the 'qrCodeImagePath' variable above to match the filename (e.g., '/upi-qrcode.png').
                  */}
                  <Image
                    src={aadharCardImage}
                    alt="UPI QR Code for donation"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-slate-700">Or use our UPI ID</h3>
                <div
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-100 p-3 text-lg font-mono text-slate-800 transition-colors hover:bg-slate-200"
                  onClick={copyToClipboard}
                  title="Click to copy UPI ID"
                >
                  <span>{upiId}</span>
                </div>
              </div>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Donations made through UPI are secure. Please mention "Donation" in the payment note. For a tax-exemption certificate, please contact us with your transaction details.
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
