import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CategoryNav } from '@/components/CategoryNav';
import { HeroGuideCarousel } from '@/components/HeroGuideCarousel';
import { SearchBar } from '@/components/SearchBar';
import { getDictionary } from '@/lib/dictionaries';
import {
  getAllGuides,
  getGuideTranslation,
  resolveGuideForLocale,
} from '@/lib/guides';
import { DEFAULT_LOCALE, isLocale, localeHref } from '@/lib/i18n';
import {
  getAllCategories,
  getAllServices,
  resolveCategoryForLocale,
} from '@/lib/services';

const HERO_GUIDE_COUNT = 8;

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const dict = await getDictionary(lang);
  const categories = getAllCategories();
  const resolvedCategories = categories.map((category) =>
    resolveCategoryForLocale(category, lang),
  );
  const services = await getAllServices();
  const serviceCounts = services.reduce<Record<string, number>>(
    (counts, service) => {
      counts[service.categorySlug] = (counts[service.categorySlug] ?? 0) + 1;
      return counts;
    },
    {},
  );
  const heroGuides = getAllGuides()
    .slice(0, HERO_GUIDE_COUNT)
    .map((guide) => resolveGuideForLocale(guide, lang));
  const guides = getAllGuides()
    .filter((guide) => lang !== 'en' || getGuideTranslation(guide.slug))
    .slice(0, 4)
    .map((guide) => resolveGuideForLocale(guide, lang));

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="sr-only">{dict.homePage.heading}</h1>

      <section className="from-primary/10 via-primary/5 border-b bg-gradient-to-b to-transparent">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
          <HeroGuideCarousel
            guides={heroGuides}
            categories={resolvedCategories}
            lang={lang}
            dict={dict.homePage}
          />
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-10 sm:py-16">
        <section aria-label={dict.homePage.searchLabel} className="max-w-3xl">
          {lang === 'ko' ? (
            <SearchBar services={services} label={dict.homePage.searchLabel} />
          ) : (
            <p className="border-primary/40 text-muted-foreground border-l-2 pl-3 text-sm">
              {dict.search.koOnlyNotice}
            </p>
          )}
          <p className="text-muted-foreground mt-3 text-sm">
            {dict.homePage.totalServicesTemplate.replace(
              '{count}',
              services.length.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US'),
            )}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">
              {dict.homePage.categoriesHeading}
            </h2>
            <p className="text-muted-foreground text-sm">
              {dict.homePage.categoriesDescription}
            </p>
          </div>
          <CategoryNav
            categories={categories}
            lang={lang}
            serviceCounts={serviceCounts}
            serviceCountTemplate={dict.homePage.serviceCountTemplate}
          />
        </section>

        <section aria-labelledby="guides-heading" className="border-t pt-8">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="guides-heading" className="text-xl font-semibold">
                {dict.homePage.guidesHeading}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {dict.homePage.guidesDescription}
              </p>
            </div>
            <Link
              href={localeHref(lang, '/guides')}
              className="text-primary focus-visible:ring-ring inline-flex min-h-11 items-center gap-1 text-sm font-medium outline-none hover:underline focus-visible:rounded-sm focus-visible:ring-2"
            >
              {dict.homePage.viewAllGuides}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="divide-y border-y">
            {guides.map((guide) => {
              const category = resolvedCategories.find(
                (item) => item.slug === guide.categorySlug,
              );
              return (
                <li key={guide.slug}>
                  <Link
                    href={localeHref(lang, `/guides/${guide.slug}`)}
                    className="group focus-visible:ring-ring flex min-h-20 items-center justify-between gap-4 py-4 outline-none focus-visible:ring-2"
                  >
                    <span className="min-w-0">
                      {category && (
                        <span className="text-muted-foreground text-xs">
                          {category.name}
                        </span>
                      )}
                      <span className="group-hover:text-primary mt-1 block leading-snug font-medium">
                        {guide.title}
                      </span>
                      <span className="text-muted-foreground mt-1 line-clamp-2 block text-sm">
                        {guide.summary}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
