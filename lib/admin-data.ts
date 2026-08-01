import fs from 'node:fs/promises';
import path from 'node:path';
import type { Category, Service } from '@/types/service';

export const SERVICES_PATH = path.join(process.cwd(), 'data', 'services.json');
export const CATEGORIES_PATH = path.join(
  process.cwd(),
  'data',
  'categories.json',
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
