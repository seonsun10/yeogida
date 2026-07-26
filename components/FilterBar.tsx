'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

const FREE_ONLY_PARAM = 'free';
const HOURS24_PARAM = 'hours24';

export function FilterBar() {
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
      >
        <Badge variant={freeOnly ? 'default' : 'outline'}>무료만</Badge>
      </button>
      <button
        type="button"
        onClick={() => toggleParam(HOURS24_PARAM, hours24Only)}
        aria-pressed={hours24Only}
      >
        <Badge variant={hours24Only ? 'default' : 'outline'}>24시간만</Badge>
      </button>
    </div>
  );
}
