'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Dictionary } from '@/lib/dictionaries';

const FREE_ONLY_PARAM = 'free';
const HOURS24_PARAM = 'hours24';

export function FilterBar({ dict }: { dict: Dictionary['filterBar'] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const freeOnly = searchParams.get(FREE_ONLY_PARAM) === '1';
  const hours24Only = searchParams.get(HOURS24_PARAM) === '1';

  function toggleParam(key: string, active: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    if (active) {
      params.delete(key);
    } else {
      params.set(key, '1');
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => toggleParam(FREE_ONLY_PARAM, freeOnly)}
        aria-pressed={freeOnly}
        className={`focus-visible:ring-ring inline-flex min-h-11 items-center rounded-lg border px-3 text-sm transition-colors outline-none focus-visible:ring-2 ${freeOnly ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
      >
        {dict.freeOnly}
      </button>
      <button
        type="button"
        onClick={() => toggleParam(HOURS24_PARAM, hours24Only)}
        aria-pressed={hours24Only}
        className={`focus-visible:ring-ring inline-flex min-h-11 items-center rounded-lg border px-3 text-sm transition-colors outline-none focus-visible:ring-2 ${hours24Only ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
      >
        {dict.hours24Only}
      </button>
    </div>
  );
}
