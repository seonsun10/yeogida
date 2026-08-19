import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getDiscoverCategoryIcon } from '@/lib/discover-icons';
import type { SiteCategory } from '@/types/site';

export function DiscoverCategoryNav({
  categories,
  siteCounts,
}: {
  categories: SiteCategory[];
  siteCounts?: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = getDiscoverCategoryIcon(category.slug);
        const count = siteCounts?.[category.slug];
        return (
          <Link
            key={category.slug}
            href={`/discover/${category.slug}`}
            className="group block h-full rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Card className="h-full flex-row items-start gap-3.5 p-4 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-primary/30">
              <div
                aria-hidden
                className="flex size-11 shrink-0 items-center justify-center rounded-sm"
                style={{
                  backgroundColor: `${category.color}1a`,
                  color: category.color,
                }}
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold">{category.name}</h3>
                  <ArrowRight
                    aria-hidden
                    className="size-4 shrink-0 text-muted-foreground/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {category.description}
                </p>
                {typeof count === 'number' && (
                  <p className="mt-1 text-xs font-medium text-muted-foreground/70">
                    사이트 {count}개
                  </p>
                )}
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
