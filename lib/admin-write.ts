import fs from 'node:fs/promises';
import prettier from 'prettier';
import { CATEGORIES_PATH, SERVICES_PATH } from '@/lib/admin-data';
import type { Category, Service } from '@/types/service';

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
