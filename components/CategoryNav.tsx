import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { localeHref, type Locale } from '@/lib/i18n';
import { resolveCategoryForLocale } from '@/lib/services';
import type { Category } from '@/types/service';

export function CategoryNav({
  categories,
  lang,
  serviceCounts,
  serviceCountTemplate,
}: {
  categories: Category[];
  lang: Locale;
  serviceCounts: Record<string, number>;
  serviceCountTemplate: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((rawCategory) => {
        const category = resolveCategoryForLocale(rawCategory, lang);
        const count = serviceCounts[category.slug] ?? 0;
        return (
          <Link
            key={category.slug}
            href={localeHref(lang, `/category/${category.slug}`)}
            className="focus-visible:ring-ring block h-full rounded-lg outline-none focus-visible:ring-2"
          >
            <Card className="hover:border-primary/40 hover:bg-muted/20 h-full flex-row items-start gap-3 rounded-lg border p-4 shadow-none ring-0 transition-colors">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="text-base font-semibold">{category.name}</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                  {category.description}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {serviceCountTemplate.replace('{count}', String(count))}
                </p>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="text-muted-foreground mt-1 size-4 shrink-0"
              />
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
