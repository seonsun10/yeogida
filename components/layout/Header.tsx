import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { getAllCategories } from '@/lib/services';
import { HeaderNav } from './HeaderNav';

export function Header() {
  const categories = getAllCategories();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
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
          <Link
            href="/discover"
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="hidden sm:inline">민간 사이트 모음 보러가기</span>
            <span className="sm:hidden">민간 사이트</span>
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
        <HeaderNav categories={categories} />
      </div>
    </header>
  );
}
