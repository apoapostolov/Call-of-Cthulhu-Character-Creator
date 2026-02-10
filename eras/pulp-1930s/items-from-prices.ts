import type { DGItem } from '../../types';
import { normalizeItemName } from '../../utils';
import { PRICES_1930s_OFFICIAL, PRICES_1930s_CULTIST } from './prices-data';

const mapToDG = (items: any[], defaultSourceType: 'core' | 'homebrew'): DGItem[] => items.map(it => ({
  section: it.section || 'Miscellaneous',
  name: normalizeItemName(it.name),
  description: it.description || undefined,
  price: it.priceText || (typeof it.priceCents === 'number' ? `$${(it.priceCents/100).toFixed(2)}` : undefined),
  sourceType: it.sourceType || defaultSourceType,
  sourceName: it.sourceName || (defaultSourceType === 'homebrew' ? 'cultistarmoury.com' : 'Call of Cthulhu 7th Edition Core Rulebook'),
  sourcePage: it.sourcePage ?? null,
} as DGItem));

export const ITEMS_FROM_PRICES: DGItem[] = [
  ...mapToDG(PRICES_1930s_OFFICIAL || [], 'core'),
  ...mapToDG(PRICES_1930s_CULTIST || [], 'homebrew'),
];
