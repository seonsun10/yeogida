import siteCategoriesData from '@/data/site-categories.json';
import { readSites } from '@/lib/admin-data';
import type { Site, SiteCategory } from '@/types/site';

const siteCategories = siteCategoriesData as SiteCategory[];

export function getAllSiteCategories(): SiteCategory[] {
  return siteCategories;
}

export function getSiteCategoryBySlug(slug: string): SiteCategory | undefined {
  return siteCategories.find((category) => category.slug === slug);
}

export async function getAllSites(): Promise<Site[]> {
  return readSites();
}

export async function getSitesByCategory(categorySlug: string): Promise<Site[]> {
  const sites = await readSites();
  return sites.filter((site) => site.categorySlug === categorySlug);
}

export async function getSiteBySlug(slug: string): Promise<Site | undefined> {
  const sites = await readSites();
  return sites.find((site) => site.slug === slug);
}

export type SiteFilter = {
  badge?: string;
};

export function filterSites(list: Site[], { badge }: SiteFilter): Site[] {
  return list.filter((site) => {
    if (badge && !site.badges.includes(badge)) return false;
    return true;
  });
}
