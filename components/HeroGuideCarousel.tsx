'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_CATEGORY_COLOR, getCategoryStyle } from '@/lib/category-style';
import type { Guide } from '@/lib/guides';
import type { Category } from '@/types/service';

const SETTLE_DELAY_MS = 120;

export function HeroGuideCarousel({
  guides,
  categories,
}: {
  guides: Guide[];
  categories: Category[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeExtIndex, setActiveExtIndex] = useState(1);

  // 앞뒤에 첫/마지막 슬라이드를 하나씩 복제해두면, 경계에서 스크롤이 끝난 뒤
  // 애니메이션 없이 반대쪽 실제 슬라이드로 순간이동시켜 무한 루프처럼 보이게 만들 수 있다.
  const items = useMemo(
    () =>
      guides.length > 1
        ? [guides[guides.length - 1], ...guides, guides[0]]
        : guides,
    [guides],
  );
  const length = guides.length;
  const realIndex = ((activeExtIndex - 1) % length + length) % length;

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = el.clientWidth;
  }, []);

  const scrollToExt = (extIndex: number, smooth = true) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({
      left: extIndex * el.clientWidth,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActiveExtIndex(idx);

    if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    settleTimeoutRef.current = setTimeout(() => {
      if (idx === 0) {
        el.scrollLeft = length * el.clientWidth;
        setActiveExtIndex(length);
      } else if (idx === length + 1) {
        el.scrollLeft = el.clientWidth;
        setActiveExtIndex(1);
      }
    }, SETTLE_DELAY_MS);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          {items.map((guide, i) => {
            const style = getCategoryStyle(guide.categorySlug);
            const category = categories.find(
              (c) => c.slug === guide.categorySlug,
            );
            const color = category?.color ?? DEFAULT_CATEGORY_COLOR;
            const Icon = style.icon;
            return (
              <Link
                key={`${guide.slug}-${i}`}
                href={`/guides/${guide.slug}`}
                className="relative flex min-h-[320px] w-full shrink-0 snap-start flex-col items-center justify-center gap-3 px-6 py-12 text-center outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:min-h-[380px] sm:px-10"
              >
                <Icon
                  className="pointer-events-none absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
                  style={{ color }}
                />
                <span
                  className={`relative inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}
                >
                  <Icon className="size-3" />
                  {category?.name}
                </span>
                <h2 className="relative line-clamp-2 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  {guide.title}
                </h2>
                <p className="relative line-clamp-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                  {guide.summary}
                </p>
                <span className="relative mt-2 inline-flex h-9 w-fit items-center gap-1 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/80">
                  자세히 보기 →
                </span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="이전 가이드"
          onClick={() => scrollToExt(activeExtIndex - 1)}
          className="absolute top-1/2 left-0 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 backdrop-blur transition-colors duration-200 hover:bg-accent sm:flex"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="다음 가이드"
          onClick={() => scrollToExt(activeExtIndex + 1)}
          className="absolute top-1/2 right-0 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 backdrop-blur transition-colors duration-200 hover:bg-accent sm:flex"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {guides.map((guide, index) => (
          <button
            key={guide.slug}
            type="button"
            aria-label={`${index + 1}번째 가이드로 이동`}
            aria-current={index === realIndex}
            onClick={() => scrollToExt(index + 1)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              index === realIndex
                ? 'w-6 bg-primary'
                : 'w-1.5 bg-muted hover:bg-muted-foreground/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
