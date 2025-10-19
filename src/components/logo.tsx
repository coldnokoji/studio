import Link from 'next/link';
import Image from 'next/image';
import logoImage from './ngologo.png';

export function Logo() {
  return (
    <Link href="/" aria-label="Shreyaskar Social Welfare Foundation Home">
      <div className="flex items-center gap-3 pl-2">
        <Image src={logoImage} alt="Shreyaskar Social Welfare Foundation Logo" width={280} />
        {/* <div className="flex flex-col text-left">
          <span className="text-lg font-bold text-foreground font-headline leading-tight">
            Shreyaskar
          </span>
          <span className="text-xs text-foreground/80 leading-tight">Social Welfare Foundation</span>
        </div> */}
      </div>
    </Link>
  );
}
