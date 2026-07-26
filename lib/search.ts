import Fuse from 'fuse.js';
import type { Service } from '@/types/service';

const fuseOptions: ConstructorParameters<typeof Fuse<Service>>[1] = {
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'summary', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
};

export function createServiceSearchIndex(services: Service[]) {
  return new Fuse(services, fuseOptions);
}

export function searchServices(services: Service[], query: string): Service[] {
  if (!query.trim()) return services;
  const fuse = createServiceSearchIndex(services);
  return fuse.search(query).map((result) => result.item);
}
