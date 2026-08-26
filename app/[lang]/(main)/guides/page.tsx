import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getCategoryStyle } from '@/lib/category-style';
import { getAllCategories } from '@/lib/services';
import { getAllGuides, type Guide } from '@/lib/guides';

export const metadata: Metadata = {
  title: '가이드',
  description: '상황별로 어떤 서비스를 먼저 써야 하는지 정리한 여기다의 실전 가이드',
  alternates: {
    canonical: '/guides',
  },
};

export default function GuidesPage() {
  const guides = getAllGuides();

  const guidesByCategory = new Map<string, Guide[]>();
  for (const guide of guides) {
    const list = guidesByCategory.get(guide.categorySlug) ?? [];
    list.push(guide);
    guidesByCategory.set(guide.categorySlug, list);
  }

  const sections = getAllCategories()
    .map((category) => ({
      category,
      guides: guidesByCategory.get(category.slug) ?? [],
    }))
    .filter((section) => section.guides.length > 0);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">가이드</h1>
        <p className="text-muted-foreground">
          급한 상황에서 어떤 서비스부터 확인해야 하는지, 여기다가 등록한 서비스를
          엮어서 순서대로 정리했습니다.
        </p>
        <p className="text-xs text-muted-foreground/70">
          총 {guides.length}개 가이드
        </p>
      </div>

      <nav
        aria-label="카테고리 바로가기"
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
                  {categoryGuides.length}개
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {categoryGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
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
