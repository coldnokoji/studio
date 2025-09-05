import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HandHeart } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';

export default function DonatePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-16 sm:py-24">
          <Card className="w-full max-w-lg text-center">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HandHeart className="h-8 w-8" />
              </div>
              <CardTitle className="mt-4 text-3xl">Make a Donation</CardTitle>
              <CardDescription>
                Your contribution makes a difference. Thank you for your support.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-foreground/80">
                You are being redirected to our secure external donation portal. Please click the button below to proceed.
              </p>
              <Button size="lg" asChild>
                <Link href="https://www.giveindia.org/" target="_blank" rel="noopener noreferrer">
                  Proceed to Donation Portal
                </Link>
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                By clicking, you will leave our website.
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
