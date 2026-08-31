import { CategoryNav } from '@/components/CategoryNav';
import { HeroGuideCarousel } from '@/components/HeroGuideCarousel';
import { getDictionary } from '@/lib/dictionaries';
import { getAllGuides, resolveGuideForLocale } from '@/lib/guides';
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n';
import { getAllCategories, resolveCategoryForLocale } from '@/lib/services';

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
  const guides = getAllGuides()
    .slice(0, HERO_GUIDE_COUNT)
    .map((guide) => resolveGuideForLocale(guide, lang));

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="sr-only">{dict.homePage.heading}</h1>

      <section className="border-b bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
          <HeroGuideCarousel
            guides={guides}
            categories={resolvedCategories}
            lang={lang}
            dict={dict.homePage}
          />
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-16">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">
              {dict.homePage.categoriesHeading}
            </h2>
            <p className="text-sm text-muted-foreground">
              {dict.homePage.categoriesDescription}
            </p>
          </div>
          <CategoryNav categories={categories} lang={lang} />
        </section>
      </div>
    </div>
  );
}
