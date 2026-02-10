import { PRICES_OFFICIAL, type PriceItem as PriceItem1920s } from '../classic-1920s/prices-official';
import { PRICES_HOMEBREW } from '../classic-1920s/prices-homebrew';
import type { EraWealthData } from '../../types';

// Pulp 1930s wealth tiers per provided 1930s table
export const WEALTH_DATA: EraWealthData = {
  levels: [
    { name: 'Penniless', minCR: 0, maxCR: 0, description: 'Homeless or destitute; survives on charity or odd scraps. Travel by foot or stowing away.', spendingLevel: () => 0.50, cash: () => 0.50, assets: () => 'None' },
    { name: 'Poor', minCR: 1, maxCR: 9, description: 'Bare‑bones room and one meager meal a day. Cheapest transit only; any possessions are unreliable.', spendingLevel: () => 2, cash: (cr) => cr * 1, assets: (cr) => cr * 10 },
    { name: 'Average', minCR: 10, maxCR: 49, description: 'Comfortable living with three meals a day and occasional treats. Owns or rents a modest home or flat.', spendingLevel: () => 10, cash: (cr) => cr * 2, assets: (cr) => cr * 50 },
    { name: 'Wealthy', minCR: 50, maxCR: 89, description: 'Lives in luxury with domestic help. Likely owns a substantial home, perhaps a country retreat; travels first class.', spendingLevel: () => 50, cash: (cr) => cr * 5, assets: (cr) => cr * 500 },
    { name: 'Rich', minCR: 90, maxCR: 98, description: 'Opulent estates and multiple residences. Extensive staff and holdings; travels in the finest style at will.', spendingLevel: () => 250, cash: (cr) => cr * 20, assets: (cr) => cr * 2000 },
    { name: 'Super Rich', minCR: 99, maxCR: 99, description: 'Money no object. Among the wealthiest in the world with virtually unlimited means and influence.', spendingLevel: () => 5000, cash: () => 50000, assets: () => 5000000 },
  ]
};

// Inflation/deflation adjustment
// We position Pulp adventures around 1936 (post‑NIRA recovery, pulp peak),
// where general prices are ~18% below mid‑1920s levels.
const INFLATION_FACTOR_1936 = 0.82; // 1936 vs mid‑1920s baseline (for price lists only)

type PriceItem = PriceItem1920s;

function roundToNickel(cents: number): number {
  // Round to nearest 5 cents (nickel), common in period pricing
  return Math.round(cents / 5) * 5;
}

function formatCents(cents: number): string {
  if (cents < 100) {
    // Prefer cents symbol for sub‑dollar prices
    return `${cents}¢`;
  }
  return `$${(cents / 100).toFixed(2)}`;
}

function adjustCents(cents: number | null | undefined): number | null {
  if (typeof cents !== 'number' || !isFinite(cents)) return null;
  const adjusted = Math.max(1, Math.round(cents * INFLATION_FACTOR_1936));
  return roundToNickel(adjusted);
}

function parseDollarToCents(str: string): number | null {
  const m = str.match(/\$\s*([0-9]+(?:\.[0-9]{1,2})?)/);
  if (!m) return null;
  const num = parseFloat(m[1]);
  if (!isFinite(num)) return null;
  return Math.round(num * 100);
}

function parseCentToCents(str: string): number | null {
  const m = str.match(/([0-9]+)\s*¢/);
  if (!m) return null;
  const num = parseInt(m[1], 10);
  return isFinite(num) ? num : null;
}

function adjustPriceText(text: string | undefined, fallbackCents: number | null | undefined): { priceText?: string; priceCents?: number | null } {
  if (!text || !text.trim()) {
    const centsAdj = adjustCents(fallbackCents ?? null);
    return centsAdj != null ? { priceText: formatCents(centsAdj), priceCents: centsAdj } : {};
  }
  const s = text.trim();
  // Range like $9.95-$35.00
  const mRange = s.match(/\$?([0-9]+(?:\.[0-9]{1,2})?)\s*-\s*\$?([0-9]+(?:\.[0-9]{1,2})?)/);
  if (mRange) {
    const a = Math.round(parseFloat(mRange[1]) * 100);
    const b = Math.round(parseFloat(mRange[2]) * 100);
    if (isFinite(a) && isFinite(b)) {
      const aAdj = roundToNickel(Math.round(a * INFLATION_FACTOR_1936));
      const bAdj = roundToNickel(Math.round(b * INFLATION_FACTOR_1936));
      const low = Math.min(aAdj, bAdj);
      const high = Math.max(aAdj, bAdj);
      return { priceText: `${formatCents(low)}-${formatCents(high)}`, priceCents: null };
    }
  }
  // Pure dollars or dollars with cents
  const centsFromDollar = parseDollarToCents(s);
  if (centsFromDollar != null) {
    const adj = adjustCents(centsFromDollar);
    return adj != null ? { priceText: formatCents(adj), priceCents: adj } : {};
  }
  // Cents symbol
  const centsFromCent = parseCentToCents(s);
  if (centsFromCent != null) {
    const adj = adjustCents(centsFromCent);
    return adj != null ? { priceText: formatCents(adj), priceCents: adj } : {};
  }
  // Fallback to provided cents if present
  const centsAdj = adjustCents(fallbackCents ?? null);
  return centsAdj != null ? { priceText: formatCents(centsAdj), priceCents: centsAdj } : { priceText: s, priceCents: null };
}

function adjustItem(it: PriceItem1920s, isCultist: boolean): PriceItem {
  const adj = adjustPriceText(it.priceText, it.priceCents);
  return {
    section: it.section,
    name: it.name,
    description: it.description,
    ...adj,
    source: isCultist ? 'cultistarmoury.org' : it.source,
    url: it.url,
    sourceType: isCultist ? 'homebrew' : 'core',
    sourceName: isCultist ? 'cultistarmoury.com' : 'Call of Cthulhu 7th Edition Core Rulebook',
    sourcePage: null,
  };
}

export const PRICES_1930s_OFFICIAL: PriceItem[] = PRICES_OFFICIAL.map(it => adjustItem(it, false));
export const PRICES_1930s_CULTIST: PriceItem[] = PRICES_HOMEBREW.map(it => adjustItem(it, true));
