import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" aria-label="Raise India Foundation Home">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-foreground font-headline truncate">
          Raise India Foundation
        </span>
      </div>
    </Link>
  );
}
