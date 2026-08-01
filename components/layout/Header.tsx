import Image from 'next/image';
import Link from 'next/link';
import { getAllCategories } from '@/lib/services';
import { HeaderNav } from './HeaderNav';

export function Header() {
  const categories = getAllCategories();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 text-lg font-bold tracking-tight"
        >
          <Image
            src="/yeogida.png"
            alt=""
            width={512}
            height={652}
            priority
            className="h-8 w-auto"
          />
          <span>
            여기<span className="text-primary">다</span>
          </span>
        </Link>
        <HeaderNav categories={categories} />
      </div>
    </header>
  );
}
