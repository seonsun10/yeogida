import categoriesData from '@/data/categories.json';
import servicesData from '@/data/services.json';
import type { Category, Service } from '@/types/service';

const categories = categoriesData as Category[];
const services = servicesData as Service[];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getAllServices(): Service[] {
  return services;
}

export function getServicesByCategory(categorySlug: string): Service[] {
  return services.filter((service) => service.categorySlug === categorySlug);
}

export function getServiceBySlug(slug: string): Service | undefined {
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
