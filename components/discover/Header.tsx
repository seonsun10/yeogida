import Link from 'next/link';
import { DiscoverCategoryPills } from '@/components/discover/CategoryPills';
import { DISCOVER_SITE_NAME } from '@/lib/discover-constants';
import type { SiteCategory } from '@/types/site';

export function DiscoverHeader({ categories }: { categories: SiteCategory[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/discover"
            className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight"
          >
            <span
              aria-hidden
              className="flex size-7 items-center justify-center rounded-sm bg-gradient-to-br from-primary to-primary/70 text-xs font-black text-primary-foreground"
            >
              발
            </span>
            <span>{DISCOVER_SITE_NAME}</span>
          </Link>
        </div>
        {categories.length > 0 && <DiscoverCategoryPills categories={categories} />}
      </div>
    </header>
  );
}
