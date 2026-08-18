import Fuse from 'fuse.js';
import type { Site } from '@/types/site';

const fuseOptions: ConstructorParameters<typeof Fuse<Site>>[1] = {
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'summary', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
};

export function createSiteSearchIndex(sites: Site[]) {
  return new Fuse(sites, fuseOptions);
}

export function searchSites(sites: Site[], query: string): Site[] {
  if (!query.trim()) return sites;
  const fuse = createSiteSearchIndex(sites);
  return fuse.search(query).map((result) => result.item);
}
