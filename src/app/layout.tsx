import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/sonner" // REMOVED: Unused 'OldToaster'
import { Poppins } from 'next/font/google';


export const metadata: Metadata = {
  title: 'Shreyaskar Social Welfare Foundation',
  description: 'सेवा परमो धर्मः - Service is the highest duty.',
};

// You already have this part correct!
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins', // This creates the CSS variable
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ADDED: The poppins.variable to the className
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      {/* REMOVED: The manual <head> and <link> tags for Google Fonts. next/font handles this. */}
      <body>
        <main className={cn(
          'min-h-screen bg-background font-sans antialiased', // UPDATED: font-body to font-sans
          'flex flex-col'
        )}>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
