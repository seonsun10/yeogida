import fs from 'node:fs/promises';
import path from 'node:path';
import type { Service } from '@/types/service';

export const SERVICES_PATH = path.join(process.cwd(), 'data', 'services.json');

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
