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

const footerLinkSections = [
    {
        title: 'What We Do',
        links: [
            { href: '/what-we-do/education', label: 'Education' },
            { href: '/what-we-do/healthcare', label: 'Healthcare' },
            { href: '/what-we-do/environment', label: 'Environment' },
            { href: '/what-we-do/livelihood', label: 'Livelihood' },
        ]
    },
    {
        title: 'About Us',
        links: [
            { href: '/about', label: 'Our Story' },
            { href: '/team', label: 'Our Team' },
            { href: '/impact', label: 'Our Impact' },
            { href: '/gallery', label: 'Gallery' },
            { href: '/news', label: 'News' },
            { href: '/legal', label: 'Transparency' },
        ]
    },
    {
        title: 'Get Involved',
        links: [
            { href: '/get-involved', label: 'Volunteer' },
            { href: '/donate', label: 'Donate' },
            { href: '/contact', label: 'Contact Us' },
        ]
    }
]

export function Footer() {
  const pathname = usePathname();

  // Don't render footer for admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12 text-foreground">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Logo */}
          <div className="transform scale-150">
            <Logo />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-foreground/70 transition-colors hover:text-primary"
              >
                <social.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-lg border-b border-border"></div>

          {/* Navigation Links Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl text-center">
            {footerLinkSections.map((section) => (
                <div key={section.title} className="flex flex-col items-center">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">{section.title}</h3>
                    <ul className="space-y-3">
                        {section.links.map(link => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-sm text-foreground/80 hover:text-primary">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="pt-8 text-xs text-foreground/70">
            &copy; {new Date().getFullYear()} Shreyaskar Social Welfare Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
