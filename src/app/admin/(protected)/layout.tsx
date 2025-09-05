import Link from 'next/link';
import { Home, Award, Calendar } from 'lucide-react';
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
          <Link href="/admin">
              <Logo />
          </Link>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/admin/awards" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Award className="h-4 w-4" />
            Awards
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Calendar className="h-4 w-4" />
            Events
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
