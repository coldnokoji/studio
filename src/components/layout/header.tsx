'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, HandHeart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Logo } from '@/components/logo';

const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/what-we-do', label: 'What We Do' },
  { href: '/impact', label: 'Our Impact' },
  { href: '/news', label: 'News' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/contact', label: 'Contact Us' },
];

export function Header() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
      <div className="container flex h-20 items-center justify-between">
        <div className="mr-4">
          <Logo />
        </div>
        
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-orange"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="bg-brand-yellow text-slate-900 hover:bg-brand-orange transition-all hover:scale-105">
            <Link href="/donate">
              Donate
              <HandHeart className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-full flex-col p-6">
                <div className="mb-8">
                  <SheetClose asChild>
                    <Logo />
                  </SheetClose>
                </div>
                <nav className="flex flex-col items-start gap-6">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-slate-700 transition-colors hover:text-brand-orange"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto">
                    <SheetClose asChild>
                      <Button asChild className="w-full bg-brand-yellow text-slate-900 hover:bg-brand-orange">
                        <Link href="/donate">
                          Donate
                          <HandHeart className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
