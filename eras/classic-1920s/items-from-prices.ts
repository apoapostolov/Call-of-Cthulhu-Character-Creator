import type { DGItem } from '../../types';
import { normalizeItemName } from '../../utils';
import { PRICES_CULTIST as PRICES_HOMEBREW, PRICES_OFFICIAL } from './prices-data';

function mapToDG(items: any[], defaultSourceType: 'homebrew' | 'core' | 'ai') : DGItem[] {
  return items.map((it) => ({
    section: it.section || 'Miscellaneous',
    name: normalizeItemName(it.name),
    description: it.description || undefined,
    price: it.priceText || (typeof it.priceCents === 'number' ? `$${(it.priceCents/100).toFixed(2)}` : undefined),
    sourceType: it.sourceType || defaultSourceType,
    sourceName: it.sourceName || (defaultSourceType === 'homebrew' ? 'cultistarmoury.com' : 'Call of Cthulhu 7th Edition Core Rulebook'),
    sourcePage: it.sourcePage ?? null,
  } as DGItem));
}

export const ITEMS_FROM_PRICES: DGItem[] = [
  ...mapToDG(PRICES_OFFICIAL || [], 'core'),
  ...mapToDG(PRICES_HOMEBREW || [], 'homebrew'),
];
