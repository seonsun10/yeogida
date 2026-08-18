import fs from 'node:fs/promises';
import prettier from 'prettier';
import {
  CATEGORIES_PATH,
  SERVICES_PATH,
  SITE_CATEGORIES_PATH,
  SITES_PATH,
} from '@/lib/admin-data';
import type { Category, Service } from '@/types/service';
import type { Site, SiteCategory } from '@/types/site';

export async function writeServices(services: Service[]): Promise<void> {
  const formatted = await prettier.format(JSON.stringify(services), {
    filepath: SERVICES_PATH,
  });
  await fs.writeFile(SERVICES_PATH, formatted);
}

export async function writeCategories(categories: Category[]): Promise<void> {
  const formatted = await prettier.format(JSON.stringify(categories), {
    filepath: CATEGORIES_PATH,
  });
  await fs.writeFile(CATEGORIES_PATH, formatted);
}

export async function writeSites(sites: Site[]): Promise<void> {
  const formatted = await prettier.format(JSON.stringify(sites), {
    filepath: SITES_PATH,
  });
  await fs.writeFile(SITES_PATH, formatted);
}

export async function writeSiteCategories(
  categories: SiteCategory[],
): Promise<void> {
  const formatted = await prettier.format(JSON.stringify(categories), {
    filepath: SITE_CATEGORIES_PATH,
  });
  await fs.writeFile(SITE_CATEGORIES_PATH, formatted);
}
