import Image from 'next/image';
import Link from 'next/link';
import { DiscoverCategoryPills } from '@/components/discover/CategoryPills';
import type { SiteCategory } from '@/types/site';

export function DiscoverHeader({ categories }: { categories: SiteCategory[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
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
        </div>
        {categories.length > 0 && <DiscoverCategoryPills categories={categories} />}
      </div>
    </header>
  );
}
