import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getCategoryStyle } from '@/lib/category-style';
import { getDictionary } from '@/lib/dictionaries';
import { getAllGuides, resolveGuideForLocale, type Guide } from '@/lib/guides';
import { DEFAULT_LOCALE, isLocale, localeHref } from '@/lib/i18n';
import { getAllCategories, resolveCategoryForLocale } from '@/lib/services';

type GuidesPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: GuidesPageProps): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const dict = await getDictionary(lang);
  return {
    title: dict.guides.metaTitle,
    description: dict.guides.metaDescription,
    alternates: {
      canonical: localeHref(lang, '/guides'),
    },
  };
}

export default async function GuidesPage({ params }: GuidesPageProps) {
  const { lang: rawLang } = await params;
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const dict = await getDictionary(lang);
  const guides = getAllGuides().map((guide) => resolveGuideForLocale(guide, lang));

  const guidesByCategory = new Map<string, Guide[]>();
  for (const guide of guides) {
    const list = guidesByCategory.get(guide.categorySlug) ?? [];
    list.push(guide);
    guidesByCategory.set(guide.categorySlug, list);
  }

  const sections = getAllCategories()
    .map((category) => ({
      category: resolveCategoryForLocale(category, lang),
      guides: guidesByCategory.get(category.slug) ?? [],
    }))
    .filter((section) => section.guides.length > 0);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{dict.guides.heading}</h1>
        <p className="text-muted-foreground">{dict.guides.description}</p>
        <p className="text-xs text-muted-foreground/70">
          {dict.guides.totalCountTemplate.replace('{count}', String(guides.length))}
        </p>
      </div>

      <nav
        aria-label={dict.guides.categoryNavLabel}
        className="flex flex-wrap gap-2 border-b pb-6"
      >
        {sections.map(({ category, guides: categoryGuides }) => (
          <a
            key={category.slug}
            href={`#category-${category.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            {category.name}
            <span className="text-xs text-muted-foreground/70">
              {categoryGuides.length}
            </span>
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-10">
        {sections.map(({ category, guides: categoryGuides }) => {
          const style = getCategoryStyle(category.slug);
          const Icon = style.icon;

          return (
            <section
              key={category.slug}
              id={`category-${category.slug}`}
              className="flex scroll-mt-20 flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-md ${style.chip}`}
                >
                  <Icon className="size-4" />
                </span>
                <h2 className="text-base font-semibold">{category.name}</h2>
                <span className="text-xs text-muted-foreground/70">
                  {dict.guides.countTemplate.replace(
                    '{count}',
                    String(categoryGuides.length),
                  )}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {categoryGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={localeHref(lang, `/guides/${guide.slug}`)}
                    className="group flex items-start justify-between gap-4 rounded-lg border p-4 outline-none transition-colors hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm leading-snug font-medium text-foreground">
                        {guide.title}
                      </h3>
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {guide.summary}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 pt-0.5 text-xs text-muted-foreground/70">
                      <span className="hidden sm:inline">
                        {guide.publishedAt}
                      </span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
