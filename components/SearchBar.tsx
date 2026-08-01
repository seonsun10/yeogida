'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchServices } from '@/lib/search';
import type { Service } from '@/types/service';

const VISIBLE_RESULTS = 6;

export function SearchBar({ services }: { services: Service[] }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchServices(services, query);
  }, [services, query]);

  return (
    <div className="relative w-full max-w-xl">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="찾는 서비스를 검색해보세요 (예: 야간 소아상담, 임대차 분쟁)"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="서비스 검색"
        className="h-13 rounded-full border-none bg-card pl-11 text-base shadow-lg shadow-primary/10 focus-visible:ring-3"
      />
      {query.trim() && (
        <div className="absolute z-10 mt-2 w-full rounded-xl border bg-popover shadow-lg">
          {results.length > 0 ? (
            <ul
              className="divide-y overflow-y-auto overscroll-contain"
              style={{ maxHeight: `${VISIBLE_RESULTS * 3.75}rem` }}
            >
              {results.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/service/${service.slug}`}
                    className="block px-4 py-3 hover:bg-accent"
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
