import fs from 'node:fs/promises';
import prettier from 'prettier';
import { SERVICES_PATH } from '@/lib/admin-data';
import type { Service } from '@/types/service';

export async function writeServices(services: Service[]): Promise<void> {
  const formatted = await prettier.format(JSON.stringify(services), {
    filepath: SERVICES_PATH,
  });
  await fs.writeFile(SERVICES_PATH, formatted);
}
