import type { Metadata } from 'next';
import { DiscoverCategoryNav } from '@/components/discover/CategoryNav';
import { DiscoverSearchBar } from '@/components/discover/SearchBar';
import { DISCOVER_SITE_NAME, DISCOVER_SITE_TAGLINE } from '@/lib/discover-constants';
import { getAllSiteCategories, getAllSites } from '@/lib/sites';

// title.default를 layout에 두면 "가장 가까운 부모(root)"의 template로 감싸져
// "여기다 발견 | 여기다"처럼 이중 접미사가 붙는다 (Next.js title 해석 규칙).
// 홈 페이지는 absolute로 명시해 상위 template을 모두 무시하도록 한다.
export const metadata: Metadata = {
  title: { absolute: DISCOVER_SITE_NAME },
};

export default async function DiscoverHomePage() {
  const categories = getAllSiteCategories();
  const sites = await getAllSites();

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="sr-only">여기다 발견 — 분야를 가리지 않는 사이트 모음</h1>

      <section className="border-b border-border bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-20">
          <p className="text-sm font-medium text-primary">여기다 발견</p>
          <p className="max-w-xl text-lg font-semibold text-balance sm:text-2xl">
            {DISCOVER_SITE_TAGLINE}
          </p>
          <DiscoverSearchBar sites={sites} />
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-16">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">카테고리별로 둘러보기</h2>
            <p className="text-sm text-muted-foreground">
              분야별로 정리된 사이트를 한눈에 살펴보세요.
            </p>
          </div>
          {categories.length > 0 ? (
            <DiscoverCategoryNav categories={categories} />
          ) : (
            <p className="rounded-sm border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              아직 등록된 카테고리가 없어요. 곧 다양한 사이트로 채워질
              예정이에요.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
