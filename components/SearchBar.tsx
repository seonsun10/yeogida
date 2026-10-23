'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchServices } from '@/lib/search';
import type { Service } from '@/types/service';

const VISIBLE_RESULTS = 6;

export function SearchBar({
  services,
  label,
}: {
  services: Service[];
  label?: string;
}) {
  const router = useRouter();
  const listboxId = useId();
  const inputId = useId();
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
    if (!isOpen) return;

    if (event.key === 'ArrowDown' && results.length > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp' && results.length > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === 'Enter') {
      const selectedIndex = activeIndex >= 0 ? activeIndex : 0;
      if (results[selectedIndex]) {
        event.preventDefault();
        router.push(`/service/${results[selectedIndex].slug}`);
      }
    } else if (event.key === 'Escape') {
      setQuery('');
      setActiveIndex(-1);
    }
  }

  return (
    <div className="relative z-10 w-full max-w-2xl">
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
        <Input
          id={inputId}
          type="search"
          placeholder="예: 야간 약국, 법률 상담, 월세 지원"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          aria-label={label ?? '서비스 검색'}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={results.length > 0 ? listboxId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={activeOptionId}
          autoComplete="off"
          className="bg-background h-12 rounded-lg border pl-11 text-base shadow-none focus-visible:ring-2"
        />
      </div>
      <p role="status" className="sr-only">
        {isOpen &&
          (results.length > 0
            ? `검색 결과 ${results.length}건`
            : '검색 결과가 없어요')}
      </p>
      {isOpen && (
        <div className="bg-popover absolute mt-2 w-full rounded-lg border shadow-md">
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
                    className={`hover:bg-accent block px-4 py-3 ${
                      index === activeIndex ? 'bg-accent' : ''
                    }`}
                  >
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {service.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground px-4 py-3 text-sm">
              검색 결과가 없어요. 다른 검색어로 시도해보세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
