import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { getCategoryStyle } from '@/lib/category-style';
import { localeHref, type Locale } from '@/lib/i18n';
import { resolveCategoryForLocale } from '@/lib/services';
import type { Category } from '@/types/service';

export function CategoryNav({
  categories,
  lang,
}: {
  categories: Category[];
  lang: Locale;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((rawCategory) => {
        const category = resolveCategoryForLocale(rawCategory, lang);
        const style = getCategoryStyle(category.slug);
        const Icon = style.icon;
        return (
          <Link
            key={category.slug}
            href={localeHref(lang, `/category/${category.slug}`)}
            className="block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Card className="h-full flex-row items-center gap-3 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${style.chip}`}
              >
                <Icon className="size-5" />
              </div>
              <div className="flex min-w-0 flex-col gap-0.5">
                <h3 className="text-base font-semibold">{category.name}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
