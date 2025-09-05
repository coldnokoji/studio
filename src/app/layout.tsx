import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster as OldToaster } from '@/components/ui/toaster';
import { Toaster } from "@/components/ui/sonner"
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Raise India Foundation',
  description: 'Empowering Communities, Inspiring Change',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('flex min-h-screen flex-col bg-background font-body antialiased')}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
            <OldToaster />
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
