'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchServices } from '@/lib/search';
import type { Service } from '@/types/service';

const VISIBLE_RESULTS = 6;

export function SearchBar({ services }: { services: Service[] }) {
  const router = useRouter();
  const listboxId = useId();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchServices(services, query);
  }, [services, query]);

  const isOpen = query.trim().length > 0;
  const activeOptionId =
    activeIndex >= 0 && activeIndex < results.length
      ? `${listboxId}-option-${activeIndex}`
      : undefined;

  // 화살표 키로 이동한 옵션이 스크롤 영역 밖에 있어도 항상 보이도록 강제로 스크롤한다.
  useEffect(() => {
    if (!activeOptionId) return;
    document
      .getElementById(activeOptionId)
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeOptionId]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === 'Enter') {
      if (activeIndex >= 0) {
        event.preventDefault();
        router.push(`/service/${results[activeIndex].slug}`);
      }
    } else if (event.key === 'Escape') {
      setQuery('');
      setActiveIndex(-1);
    }
  }

  return (
    <div className="relative w-full max-w-xl">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="찾는 서비스를 검색해보세요 (예: 야간 소아상담, 임대차 분쟁)"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        aria-label="서비스 검색"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={activeOptionId}
        autoComplete="off"
        className="h-13 rounded-full border-none bg-card pl-11 text-base shadow-lg shadow-primary/10 focus-visible:ring-3"
      />
      <p role="status" className="sr-only">
        {isOpen &&
          (results.length > 0
            ? `검색 결과 ${results.length}건`
            : '검색 결과가 없어요')}
      </p>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-xl border bg-popover shadow-lg">
          {results.length > 0 ? (
            <ul
              id={listboxId}
              role="listbox"
              aria-label="검색 결과"
              className="divide-y overflow-y-auto overscroll-contain"
              style={{ maxHeight: `${VISIBLE_RESULTS * 3.75}rem` }}
            >
              {results.map((service, index) => (
                <li key={service.id} role="presentation">
                  <Link
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    href={`/service/${service.slug}`}
                    tabIndex={-1}
                    className={`block px-4 py-3 hover:bg-accent ${
                      index === activeIndex ? 'bg-accent' : ''
                    }`}
                  >
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {service.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-muted-foreground">
              검색 결과가 없어요. 다른 검색어로 시도해보세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
