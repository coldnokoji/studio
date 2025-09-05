
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Logo } from '../logo';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export function Footer() {
  const pathname = usePathname();

  // Don't render footer for admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12 text-foreground">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm text-foreground/80 max-w-sm">
             A non-profit organization driven by the principle of "Seva Paramo Dharma" - service as the highest duty.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">What We Do</h3>
            <ul className="space-y-3">
              <li><Link href="/what-we-do/education" className="text-sm text-foreground/80 hover:text-primary">Education</Link></li>
              <li><Link href="/what-we-do/healthcare" className="text-sm text-foreground/80 hover:text-primary">Healthcare</Link></li>
              <li><Link href="/what-we-do/environment" className="text-sm text-foreground/80 hover:text-primary">Environment</Link></li>
              <li><Link href="/what-we-do/livelihood" className="text-sm text-foreground/80 hover:text-primary">Livelihood</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Get In Touch</h3>
             <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-foreground/80 hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-foreground/80 hover:text-primary">Contact</Link></li>
              <li><Link href="/donate" className="text-sm text-foreground/80 hover:text-primary">Donate</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-foreground/70">
              &copy; {new Date().getFullYear()} Shreyaskar Social Welfare Foundation. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="text-foreground/70 hover:text-primary">
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
