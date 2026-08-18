import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { SiteCategory } from '@/types/site';

export function DiscoverCategoryNav({
  categories,
}: {
  categories: SiteCategory[];
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/discover/${category.slug}`}
          className="block h-full rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Card className="h-full flex-row items-center gap-3 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30">
            <div
              aria-hidden
              className="flex size-10 shrink-0 items-center justify-center rounded-sm text-sm font-bold"
              style={{
                backgroundColor: `${category.color}1a`,
                color: category.color,
              }}
            >
              {category.name.slice(0, 1)}
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <h3 className="text-base font-semibold">{category.name}</h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
