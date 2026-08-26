import 'server-only';
import type { Locale } from '@/lib/i18n';

const dictionaries = {
  ko: () => import('@/dictionaries/ko.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['ko']>>;

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
