export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'ko';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * 기본 로케일(ko)은 rewrite로만 내부 처리되고 브라우저 주소창은 접두사 없는
 * URL을 그대로 보여준다(proxy.ts 참고) — 그래서 ko는 접두사를 붙이지 않는다.
 */
export function localeHref(lang: Locale, path: string): string {
  if (lang === DEFAULT_LOCALE) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}
