import { CategoryNav } from '@/components/CategoryNav';
import { HeroGuideCarousel } from '@/components/HeroGuideCarousel';
import { getAllGuides } from '@/lib/guides';
import { getAllCategories } from '@/lib/services';

const HERO_GUIDE_COUNT = 8;

export default async function Home() {
  const categories = getAllCategories();
  const guides = getAllGuides().slice(0, HERO_GUIDE_COUNT);

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="sr-only">
        검색해도 잘 안 나오는, 진짜 도움되는 서비스 — 여기다
      </h1>

      <section className="border-b bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
          <HeroGuideCarousel guides={guides} categories={categories} />
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-16">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">카테고리별로 둘러보기</h2>
            <p className="text-sm text-muted-foreground">
              건강부터 교통까지, 여기다가 정리한 서비스를 카테고리별로 한눈에
              살펴보세요.
            </p>
          </div>
          <CategoryNav categories={categories} />
        </section>
      </div>
    </div>
  );
}
