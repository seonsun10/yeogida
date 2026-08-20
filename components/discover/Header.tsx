import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { DiscoverCategoryPills } from '@/components/discover/CategoryPills';
import type { SiteCategory } from '@/types/site';

export function DiscoverHeader({ categories }: { categories: SiteCategory[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/discover"
            className="flex shrink-0 items-center gap-1.5 text-lg font-bold tracking-tight"
          >
            <Image
              src="/discover-logo.png"
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
            href="/"
            className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="hidden sm:inline">공공 서비스 보러가기</span>
            <span className="sm:hidden">공공 서비스</span>
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
        {categories.length > 0 && <DiscoverCategoryPills categories={categories} />}
      </div>
    </header>
  );
}
