import type { Era, EraID } from '../types';
import type { EraData } from './load-era';
import { getCachedEraData, loadEraData, loadEraDataMap } from './load-era';

export type { EraData };
export { loadEraData, loadEraDataMap, getCachedEraData } from './load-era';

// --- Single Source of Truth for available eras (metadata only — no era data imports) ---
export const ERAS: Era[] = [
  { id: 'classic-1920s', name: 'Classic 1920s', isDefault: true, publisher: 'Chaosium', theme: 'Lovecraftian Horror', setting: 'Roaring Twenties' },
  { id: 'pulp-1930s', name: 'Pulp 1930s', publisher: 'Chaosium', theme: 'Action-Adventure Horror', setting: 'Pulp Cthulhu' },
  { id: 'modern-2000s', name: 'Modern Day', publisher: 'Chaosium', theme: 'Modern Horror', setting: 'Present Day' },
  { id: 'gaslight-1890s', name: 'Gaslight 1890s', publisher: 'Chaosium', theme: 'Victorian Horror', setting: 'Cthulhu by Gaslight' },
  { id: 'western-1880s', name: 'Western 1870s', publisher: 'Chaosium', theme: 'Weird West Horror', setting: 'Down Darker Trails' },
  { id: 'dark-ages-1000s', name: 'Dark Ages 1000s', publisher: 'Chaosium', theme: 'Medieval Horror', setting: 'Cthulhu Dark Ages' },
  { id: 'regency', name: 'Regency Cthulhu', publisher: 'Chaosium', theme: 'Regency Horror', setting: 'Regency England' },
  { id: 'campfire-tales', name: 'Campfire Tales', publisher: 'Chaosium', theme: 'Kid Scout Mystery Horror', setting: 'Westhaven Scout Adventures' },
];

export const ERA_IDS = ERAS.map(s => s.id) as EraID[];

/**
 * Back-compat snapshot of loaded era data.
 * Prefer `loadEraData(id)` / `await loadEraDataMap(ids)`.
 *
 * Populated entries appear only after that era has been loaded at least once.
 * For tests, call `await loadEraDataMap(ERA_IDS)` (or specific ids) first.
 */
export const thirdPartyData: Record<string, EraData> = new Proxy(
  {} as Record<string, EraData>,
  {
    get(_target, prop: string | symbol) {
      if (typeof prop !== 'string') return undefined;
      return getCachedEraData(prop as EraID) || undefined;
    },
    has(_target, prop: string | symbol) {
      if (typeof prop !== 'string') return false;
      return getCachedEraData(prop as EraID) != null;
    },
    ownKeys() {
      return ERA_IDS.filter(id => getCachedEraData(id) != null);
    },
    getOwnPropertyDescriptor(_target, prop: string | symbol) {
      if (typeof prop !== 'string') return undefined;
      const value = getCachedEraData(prop as EraID);
      if (!value) return undefined;
      return { configurable: true, enumerable: true, value };
    },
  },
);
