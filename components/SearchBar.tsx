'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { searchServices } from '@/lib/search';
import type { Service } from '@/types/service';

const MAX_RESULTS = 6;

export function SearchBar({ services }: { services: Service[] }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchServices(services, query).slice(0, MAX_RESULTS);
  }, [services, query]);

  return (
    <div className="relative w-full max-w-xl">
      <Input
        type="search"
        placeholder="찾는 서비스를 검색해보세요 (예: 야간 소아상담, 임대차 분쟁)"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="서비스 검색"
      />
      {query.trim() && (
        <div className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
          {results.length > 0 ? (
            <ul className="divide-y">
              {results.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/service/${service.slug}`}
                    className="block px-4 py-3 hover:bg-zinc-50"
                  >
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-xs text-zinc-500">{service.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-zinc-500">
              검색 결과가 없어요. 다른 검색어로 시도해보세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
