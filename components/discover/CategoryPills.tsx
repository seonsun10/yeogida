'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { SiteCategory } from '@/types/site';

export function DiscoverCategoryPills({
  categories,
}: {
  categories: SiteCategory[];
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="카테고리"
      className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1"
    >
      {categories.map((category) => {
        const href = `/discover/${category.slug}`;
        const isActive = pathname === href;
        return (
          <Link
            key={category.slug}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'border-transparent bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
