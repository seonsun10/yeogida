'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * usePathname()은 브라우저 주소창 그대로의 경로를 반환한다(ko는 proxy.ts가
 * rewrite로만 처리해 접두사가 안 붙고, en은 실제로 /en 접두사가 붙는다).
 * 그래서 여기서 문자열 치환만으로 상대 로케일 경로를 안전하게 계산할 수 있다.
 */
function pathForLocale(pathname: string, target: Locale): string {
  const withoutEnPrefix = pathname.replace(/^\/en(\/|$)/, '/');
  if (target === 'ko') return withoutEnPrefix;
  return withoutEnPrefix === '/' ? '/en' : `/en${withoutEnPrefix}`;
}

export function LangSwitcher({
  lang,
  label,
  className,
}: {
  lang: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn('flex items-center gap-1 text-xs text-muted-foreground', className)}
      aria-label={label}
    >
      {(['ko', 'en'] as const).map((target, index) => {
        const isActive = target === lang;
        const targetLabel = target === 'ko' ? '한국어' : 'English';
        return (
          <span key={target} className="flex items-center gap-1">
            {index > 0 && <span aria-hidden="true">·</span>}
            {isActive ? (
              <span aria-current="true" className="font-semibold text-foreground">
                {targetLabel}
              </span>
            ) : (
              <Link
                href={pathForLocale(pathname, target)}
                className="underline underline-offset-2 hover:text-foreground"
              >
                {targetLabel}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
