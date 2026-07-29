import categoriesData from '@/data/categories.json';
import { readServices } from '@/lib/admin-data';
import type { Category, Service } from '@/types/service';

const categories = categoriesData as Category[];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
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
