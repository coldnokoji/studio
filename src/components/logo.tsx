import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" aria-label="Shreyaskar Social Welfare Foundation Home">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12">
            <Image src="/ngologo.jpeg" alt="Shreyaskar Social Welfare Foundation Logo" fill className="object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-foreground font-headline leading-tight">
            Shreyaskar
          </span>
          <span className="text-xs text-foreground/80 leading-tight">Social Welfare Foundation</span>
        </div>
      </div>
    </Link>
  );
}
