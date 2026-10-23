import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getCategoryStyle } from '@/lib/category-style';
import { DEFAULT_LOCALE, localeHref, type Locale } from '@/lib/i18n';
import { getServiceBadgeName } from '@/lib/service-badges';
import { getCategoryBySlug, resolveCategoryForLocale } from '@/lib/services';
import type { Dictionary } from '@/lib/dictionaries';
import type { Service } from '@/types/service';

export function ServiceCard({
  service,
  hideCategoryBadge = false,
  lang = DEFAULT_LOCALE,
  dict,
}: {
  service: Service;
  hideCategoryBadge?: boolean;
  lang?: Locale;
  dict: Dictionary['service'];
}) {
  const rawCategory = getCategoryBySlug(service.categorySlug);
  const category = rawCategory
    ? resolveCategoryForLocale(rawCategory, lang)
    : undefined;
  const style = getCategoryStyle(service.categorySlug);

  return (
    <Link
      href={localeHref(lang, `/service/${service.slug}`)}
      className="focus-visible:ring-ring/50 block h-full rounded-xl outline-none focus-visible:ring-3"
    >
      <Card className="hover:border-primary/40 hover:bg-muted/10 h-full rounded-lg border shadow-none ring-0 transition-colors">
        {service.thumbnail && (
          <div className="relative -mt-4 aspect-video w-full overflow-hidden rounded-t-xl">
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
            {category && !hideCategoryBadge && (
              <span
                className={`inline-flex h-5 items-center rounded-full px-2 text-xs font-medium ${style.badge}`}
              >
                {category.name}
              </span>
            )}
            {service.badges
              .filter((badge) => badge !== '무료')
              .map((badge) => (
                <Badge key={badge} variant="secondary">
                  {getServiceBadgeName(badge, lang)}
                </Badge>
              ))}
          </div>
          <h3 className="text-base font-semibold">{service.name}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{service.summary}</p>
          <p className="text-muted-foreground mt-2 text-xs">{service.hours}</p>
          <div className="mt-3 flex flex-col gap-1 border-t pt-3 text-xs">
            <p className="truncate text-muted-foreground">
              {dict.source} · {service.source}
            </p>
            <p>
              <span className="text-muted-foreground">{dict.cost} · </span>
              <span className="font-medium">
                {service.cost === 'free' ? dict.costFree : dict.costPaid}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
