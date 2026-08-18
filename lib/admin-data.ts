import fs from 'node:fs/promises';
import path from 'node:path';
import type { Category, Service } from '@/types/service';
import type { Site, SiteCategory } from '@/types/site';

export const SERVICES_PATH = path.join(process.cwd(), 'data', 'services.json');
export const CATEGORIES_PATH = path.join(
  process.cwd(),
  'data',
  'categories.json',
);
export const SITES_PATH = path.join(process.cwd(), 'data', 'sites.json');
export const SITE_CATEGORIES_PATH = path.join(
  process.cwd(),
  'data',
  'site-categories.json',
);

export async function readServices(): Promise<Service[]> {
  const raw = await fs.readFile(SERVICES_PATH, 'utf-8');
  return JSON.parse(raw) as Service[];
}

export async function readServiceBySlug(
  slug: string,
): Promise<Service | undefined> {
  const services = await readServices();
  return services.find((service) => service.slug === slug);
}

export async function readCategories(): Promise<Category[]> {
  const raw = await fs.readFile(CATEGORIES_PATH, 'utf-8');
  return JSON.parse(raw) as Category[];
}

export async function readSites(): Promise<Site[]> {
  const raw = await fs.readFile(SITES_PATH, 'utf-8');
  return JSON.parse(raw) as Site[];
}

export async function readSiteBySlug(slug: string): Promise<Site | undefined> {
  const sites = await readSites();
  return sites.find((site) => site.slug === slug);
}

export async function readSiteCategories(): Promise<SiteCategory[]> {
  const raw = await fs.readFile(SITE_CATEGORIES_PATH, 'utf-8');
  return JSON.parse(raw) as SiteCategory[];
}
