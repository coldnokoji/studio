import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Logo } from '@/components/logo';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12 text-foreground">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Visit Us</h3>
            <p className="text-sm text-foreground/80">123 Philanthropy Lane<br/>New Delhi, 110001, India</p>
            
            <h3 className="mt-6 mb-4 text-sm font-bold uppercase tracking-wider">Email Us</h3>
            <a href="mailto:contact@raiseindia.org" className="text-sm text-foreground/80 hover:text-primary">contact@raiseindia.org</a>
            
            <h3 className="mt-6 mb-4 text-sm font-bold uppercase tracking-wider">Call Us</h3>
            <a href="tel:+911234567890" className="text-sm text-foreground/80 hover:text-primary">+91 123 456 7890</a>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">About Us</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">About Raise India Foundation</Link></li>
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">Director's Message</Link></li>
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">Legal/Statutory Documents</Link></li>
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">Awards & Recognition</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">What We Do</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">Education</Link></li>
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">Healthcare</Link></li>
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">Environment</Link></li>
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">Livelihood</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Past Events</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">Annual Gala 2023</Link></li>
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">Community Health Camp</Link></li>
              <li><Link href="#" className="text-sm text-foreground/80 hover:text-primary">Tree Plantation Drive</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-foreground/70">
              &copy; {new Date().getFullYear()} Raise India Foundation. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} aria-label={social.name} className="text-foreground/70 hover:text-primary">
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
