import type { Metadata } from 'next';
import { DiscoverCategoryNav } from '@/components/discover/CategoryNav';
import { DiscoverSearchBar } from '@/components/discover/SearchBar';
import { SiteCard } from '@/components/discover/SiteCard';
import { DISCOVER_SITE_NAME, DISCOVER_SITE_TAGLINE } from '@/lib/discover-constants';
import { getAllSiteCategories, getAllSites } from '@/lib/sites';

const FEATURED_SITE_COUNT = 6;

// title.default를 layout에 두면 "가장 가까운 부모(root)"의 template로 감싸져
// "여기다 발견 | 여기다"처럼 이중 접미사가 붙는다 (Next.js title 해석 규칙).
// 홈 페이지는 absolute로 명시해 상위 template을 모두 무시하도록 한다.
export const metadata: Metadata = {
  title: { absolute: DISCOVER_SITE_NAME },
};

export default async function DiscoverHomePage() {
  const categories = getAllSiteCategories();
  const sites = await getAllSites();

  const siteCounts = sites.reduce<Record<string, number>>((acc, site) => {
    acc[site.categorySlug] = (acc[site.categorySlug] ?? 0) + 1;
    return acc;
  }, {});

  const featuredSites = sites.slice(0, FEATURED_SITE_COUNT);

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="sr-only">여기다 발견 — 분야를 가리지 않는 사이트 모음</h1>

      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--primary)_0%,transparent_60%)] opacity-[0.09]"
        />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            여기다 발견
          </p>
          <p className="max-w-xl text-2xl font-bold text-balance sm:text-4xl">
            {DISCOVER_SITE_TAGLINE}
          </p>
          <DiscoverSearchBar sites={sites} />
          {sites.length > 0 && (
            <p className="text-sm text-muted-foreground">
              사이트 <span className="font-semibold text-foreground">{sites.length}</span>개
              · 카테고리 <span className="font-semibold text-foreground">{categories.length}</span>개
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-16">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">카테고리별로 둘러보기</h2>
            <p className="text-sm text-muted-foreground">
              분야별로 정리된 사이트를 한눈에 살펴보세요.
            </p>
          </div>
          {categories.length > 0 ? (
            <DiscoverCategoryNav categories={categories} siteCounts={siteCounts} />
          ) : (
            <p className="rounded-sm border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              아직 등록된 카테고리가 없어요. 곧 다양한 사이트로 채워질
              예정이에요.
            </p>
          )}
        </section>

        {featuredSites.length > 0 && (
          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">지금 둘러보기 좋은 사이트</h2>
              <p className="text-sm text-muted-foreground">
                여러 카테고리에서 골라본 사이트들이에요.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredSites.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
