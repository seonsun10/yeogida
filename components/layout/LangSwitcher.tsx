'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeHref, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * rewrite된 한국어 경로가 /ko로 전달되는 경우도 있으므로 두 언어 접두사를
 * 먼저 제거한다. 내부 경로 /ko를 /en/ko로 연결하지 않는다.
 */
function pathForLocale(pathname: string, target: Locale): string {
  const withoutLocalePrefix =
    pathname.replace(/^\/(?:ko|en)(?=\/|$)/, '') || '/';
  return localeHref(target, withoutLocalePrefix);
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
      className={cn(
        'text-muted-foreground flex items-center gap-1 text-xs',
        className,
      )}
      aria-label={label}
    >
      {(['ko', 'en'] as const).map((target, index) => {
        const isActive = target === lang;
        const targetLabel = target === 'ko' ? '한국어' : 'English';
        return (
          <span key={target} className="flex items-center gap-1">
            {index > 0 && <span aria-hidden="true">·</span>}
            {isActive ? (
              <span
                aria-current="true"
                className="text-foreground font-semibold"
              >
                {targetLabel}
              </span>
            ) : (
              <Link
                href={pathForLocale(pathname, target)}
                className="hover:text-foreground underline underline-offset-2"
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
