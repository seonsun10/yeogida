import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getDiscoverCategoryIcon } from '@/lib/discover-icons';
import { getSiteCategoryBySlug } from '@/lib/sites';
import type { Site } from '@/types/site';

export function SiteCard({
  site,
  hideCategoryBadge = false,
}: {
  site: Site;
  hideCategoryBadge?: boolean;
}) {
  const category = getSiteCategoryBySlug(site.categorySlug);
  const Icon = getDiscoverCategoryIcon(site.categorySlug);
  const accentColor = category?.color ?? 'var(--primary)';

  return (
    <Link
      href={`/discover/site/${site.slug}`}
      className="group block h-full rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full py-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:ring-primary/30">
        <div
          className="relative -mt-px aspect-[2.4/1] w-full shrink-0 overflow-hidden rounded-t-sm"
          style={{
            backgroundImage: `linear-gradient(135deg, ${accentColor}33, ${accentColor}0d)`,
          }}
        >
          {site.thumbnail ? (
            <Image
              src={site.thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Icon
                aria-hidden
                className="size-9 transition-transform duration-200 group-hover:scale-110"
                style={{ color: accentColor }}
                strokeWidth={1.75}
              />
            </div>
          )}
        </div>
        <CardHeader className="pt-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {category && !hideCategoryBadge && (
              <Badge variant="secondary">{category.name}</Badge>
            )}
            {site.badges.map((badge) => (
              <Badge key={badge} variant="outline">
                {badge}
              </Badge>
            ))}
          </div>
          <h3 className="flex items-center gap-1 text-base font-semibold">
            {site.name}
            <ArrowUpRight
              aria-hidden
              className="size-4 shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
            />
          </h3>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {site.summary}
          </p>
          <p className="mt-2 text-xs text-muted-foreground/70">{site.source}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
