import type { DGItem } from '../../types';
import { normalizeItemName } from '../../utils';
import official from './prices-official.json' assert { type: 'json' };

const mapToDG = (items: any[]): DGItem[] => items.map(it => ({
  section: it.section || 'Miscellaneous',
  name: normalizeItemName(it.name),
  description: it.description || undefined,
  // Dark Ages uses pence (d) as base currency
  // The price string will be parsed by parsePriceToCents() when needed
  price: it.priceText || (typeof it.pricePence === 'number' ? `${it.pricePence}d` : 
         typeof it.priceCents === 'number' ? `$${(it.priceCents/100).toFixed(2)}` : undefined),
  sourceType: 'core',
} as DGItem));

export const ITEMS_FROM_PRICES: DGItem[] = mapToDG(official.items || []);
