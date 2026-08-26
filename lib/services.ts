import categoriesData from '@/data/categories.json';
import { readServices } from '@/lib/admin-data';
import type { Locale } from '@/lib/i18n';
import type { Category, Service } from '@/types/service';

const categories = categoriesData as Category[];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

/** 로케일에 맞는 표시용 카테고리 객체를 만든다 — resolveServiceForLocale과 동일한 패턴. */
export function resolveCategoryForLocale(category: Category, lang: Locale): Category {
  if (lang !== 'en') return category;
  const translation = category.i18n?.en;
  if (!translation) return category;

  return {
    ...category,
    name: translation.name,
    description: translation.description,
  };
}

export async function getAllServices(): Promise<Service[]> {
  return readServices();
}

export async function getServicesByCategory(
  categorySlug: string,
): Promise<Service[]> {
  const services = await readServices();
  return services.filter((service) => service.categorySlug === categorySlug);
}

export async function getServiceBySlug(
  slug: string,
): Promise<Service | undefined> {
  const services = await readServices();
  return services.find((service) => service.slug === slug);
}

/**
 * 로케일에 맞는 표시용 서비스 객체를 만든다. en 로케일이고 번역(i18n.en, 공식이든
 * 사람이 옮긴 것이든)이 있을 때만 name/summary/description/hours를 대체하고,
 * 없으면 원본(한국어)을 그대로 반환한다 — 얇은 중복 페이지를 만들지 않기 위해
 * 번역 없는 서비스의 /en 라우트는 애초에 정적 생성하지 않는다(호출부 참고).
 * 색인 허용 여부(robots.ts/sitemap.ts)는 이 함수와 별개로 i18n.en.official만 본다.
 */
export function resolveServiceForLocale(service: Service, lang: Locale): Service {
  if (lang !== 'en') return service;
  const translation = service.i18n?.en;
  if (!translation) return service;

  return {
    ...service,
    name: translation.name,
    summary: translation.summary,
    description: translation.description,
    hours: translation.hours ?? service.hours,
  };
}

export type ServiceFilter = {
  cost?: Service['cost'];
  badge?: string;
};

export function filterServices(
  list: Service[],
  { cost, badge }: ServiceFilter,
): Service[] {
  return list.filter((service) => {
    if (cost && service.cost !== cost) return false;
    if (badge && !service.badges.includes(badge)) return false;
    return true;
  });
}
