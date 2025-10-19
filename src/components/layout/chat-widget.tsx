
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSiteSettings } from '@/services/firestore';
import { SiteSettings } from '@/lib/types';
import { useEffect, useState } from 'react';


// Using an inline SVG for the WhatsApp icon as it's not in lucide-react
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M16.75 13.96c.25.13.43.2.5.28.07.08.15.18.2.28.05.1.1.23.15.38s.08.3.1.48c.02.18.03.38.03.58 0 .2-.01.4-.04.6s-.08.38-.13.55c-.05.17-.12.33-.2.48s-.18.28-.3.4c-.12.12-.27.22-.45.3s-.38.15-.6.17c-.22.02-.45.02-.7 0-.23-.03-.5-.08-.78-.15-.28-.07-.58-.17-.9-.3-.32-.13-.65-.28-.98-.45-.33-.17-.65-.35-.95-.55-.3-.2-.58-.4-.83-.6s-.48-.4-.68-.58c-.2-.18-.38-.35-.5-.48-.12-.13-.23-.25-.3-.3s-.1-.1-.1-.1c-.15-.15-.28-.3-.4-.45-.12-.15-.22-.3-.3-.4s-.14-.2-.2-.3c-.04-.1-.08-.2-.1-.28s-.05-.15-.05-.2c0-.05.01-.1.01-.1s.03-.1.05-.15.05-.1.08-.15.08-.1.1-.15c.08-.07.18-.13.28-.18s.2-.08.3-.1c.1-.02.2-.02.28-.02.13 0 .25.02.38.05.13.03.25.08.35.13.1.05.2.1.3.15s.18.1.23.13c.05.03.1.05.1.05s.13.08.23.1.2.08.3.1c.1.02.18.03.25.03.07 0 .15-.01.2-.03s.1-.05.1-.05c.1-.03.18-.07.23-.1.05-.03.1-.08.1-.13s.03-.1.03-.13c0-.05-.01-.1-.01-.13s-.03-.08-.05-.1c-.02-.02-.05-.05-.08-.08s-.08-.05-.1-.05c-.05-.02-.1-.03-.13-.03-.03 0-.07 0-.1.01s-.05.01-.08.01c-.03.01-.05.01-.08.01-.1 0-.2-.02-.3-.05-.1-.03-.2-.07-.28-.13s-.15-.1-.2-.13c-.05-.03-.1-.07-.1-.1V12c0-.07.01-.13.04-.18s.07-.1.1-.13c.03-.03.07-.05.1-.08.03-.03.07-.04.1-.04.05 0 .1.01.15.03.05.02.1.05.15.08.05.03.1.07.15.1.05.03.1.07.13.1.03.03.07.07.1.1.03.04.07.08.1.13.03.05.07.1.1.15.03.05.07.1.1.13.02.02.03.02.03.02.1.08.18.15.25.2.07.05.13.1.18.1.05 0 .1-.01.13-.03.03-.02.07-.03.1-.05.03-.02.07-.03.1-.04.03-.01.07-.02.1-.02.03 0 .07 0 .1.01.03.01.07.02.1.04.05.03.1.07.15.1.05.04.1.08.15.1.05.03.1.07.13.1.03.03.07.07.1.1.02.02.03.03.03.03.1.1.18.18.23.23.05.05.1.1.1.13z M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.73 0 3.37-.44 4.8-1.22l3.43 1.22-1.23-3.35c.8-1.45 1.25-3.1 1.25-4.85C22 6.48 17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
  </svg>
);

export function ChatWidget() {
    const pathname = usePathname();
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        getSiteSettings().then(setSettings);
    }, []);

    // Don't render widget for admin routes
    if (pathname.startsWith('/admin') || !settings) {
        return null;
    }

  return (
    <Link
      href={`https://wa.me/${settings.contactWhatsApp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </Link>
  );
}
