import type { DGItem } from '../../types';
import { normalizeItemName } from '../../utils';
import { PRICES_OFFICIAL } from './prices-official';

const mapToDG = (items: any[]): DGItem[] => items.map(it => ({
  section: it.section || 'Miscellaneous',
  name: normalizeItemName(it.name),
  description: it.description || undefined,
  price: it.priceText || (typeof it.priceCents === 'number' ? `$${(it.priceCents/100).toFixed(2)}` : undefined),
  sourceType: it.sourceType || 'core',
  sourceName: it.sourceName || 'Call of Cthulhu 7th Edition Core Rulebook',
  sourcePage: it.sourcePage ?? null,
} as DGItem));

export const ITEMS_FROM_PRICES: DGItem[] = mapToDG(PRICES_OFFICIAL || []);
