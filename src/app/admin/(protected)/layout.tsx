import Link from 'next/link';
import { Home, Award, Calendar, Users, Handshake, HeartHandshake, Newspaper, Image as ImageIcon, IndianRupee, Mail } from 'lucide-react';
import { Logo } from '@/components/logo';
import { SignOutButton } from '@/app/admin/sign-out-button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40 p-6 flex flex-col">
        <div className="mb-8">
            <Logo />
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
           <Link href="/admin/donations" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <IndianRupee className="h-4 w-4" />
            Donations
          </Link>
          <Link href="/admin/awards" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Award className="h-4 w-4" />
            Awards
          </Link>
           <Link href="/admin/gallery" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <ImageIcon className="h-4 w-4" />
            Gallery
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Calendar className="h-4 w-4" />
            Events
          </Link>
          <Link href="/admin/team" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Users className="h-4 w-4" />
            Team
          </Link>
          <Link href="/admin/news" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Newspaper className="h-4 w-4" />
            News
          </Link>
          <Link href="/admin/impact" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <HeartHandshake className="h-4 w-4" />
            Impact Stories
          </Link>
          <Link href="/admin/volunteers" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Handshake className="h-4 w-4" />
            Volunteers
          </Link>
          <Link href="/admin/test-email" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Mail className="h-4 w-4" />
            Test Email
          </Link>
        </nav>
        <div>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
