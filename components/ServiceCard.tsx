import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DEFAULT_CATEGORY_COLOR, getCategoryStyle } from '@/lib/category-style';
import { getCategoryBySlug } from '@/lib/services';
import type { Service } from '@/types/service';

export function ServiceCard({ service }: { service: Service }) {
  const category = getCategoryBySlug(service.categorySlug);
  const style = getCategoryStyle(service.categorySlug);

  return (
    <Link
      href={`/service/${service.slug}`}
      className="block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card
        className="h-full border-t-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        style={{ borderTopColor: category?.color ?? DEFAULT_CATEGORY_COLOR }}
      >
        {service.thumbnail && (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={service.thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            {category && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}
              >
                {category.name}
              </span>
            )}
            {service.badges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
          <h3 className="text-base font-semibold">{service.name}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{service.summary}</p>
          <p className="mt-2 text-xs text-muted-foreground/70">
            {service.hours}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
