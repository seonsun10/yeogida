'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { DiscoverCategoryIcon } from '@/lib/discover-icons';
import type { SiteCategory } from '@/types/site';

const INITIAL_VISIBLE_COUNT = 6;

export function DiscoverCategoryNav({
  categories,
  siteCounts,
}: {
  categories: SiteCategory[];
  siteCounts?: Record<string, number>;
}) {
  const [showAll, setShowAll] = useState(false);
  const hasMore = categories.length > INITIAL_VISIBLE_COUNT;
  const visibleCategories =
    showAll || !hasMore
      ? categories
      : categories.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCategories.map((category) => {
          const count = siteCounts?.[category.slug];
          return (
            <Link
              key={category.slug}
              href={`/discover/${category.slug}`}
              className="group focus-visible:ring-ring/50 block h-full rounded-sm outline-none focus-visible:ring-3"
            >
              <Card className="group-hover:ring-primary/30 h-full flex-row items-start gap-3.5 p-4 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                <div
                  aria-hidden
                  className="flex size-11 shrink-0 items-center justify-center rounded-sm"
                  style={{
                    backgroundColor: `${category.color}1a`,
                    color: category.color,
                  }}
                >
                  <DiscoverCategoryIcon
                    categorySlug={category.slug}
                    className="size-5"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold">{category.name}</h3>
                    <ArrowRight
                      aria-hidden
                      className="text-muted-foreground/40 group-hover:text-primary size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {category.description}
                  </p>
                  {typeof count === 'number' && (
                    <p className="text-muted-foreground/70 mt-1 text-xs font-medium">
                      사이트 {count}개
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
      {hasMore && !showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="border-border text-muted-foreground hover:border-primary/40 hover:text-foreground focus-visible:ring-ring/50 inline-flex w-fit items-center gap-1 self-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-3"
        >
          카테고리 더보기 ({categories.length - INITIAL_VISIBLE_COUNT}개)
          <ChevronDown aria-hidden className="size-4" />
        </button>
      )}
    </div>
  );
}
