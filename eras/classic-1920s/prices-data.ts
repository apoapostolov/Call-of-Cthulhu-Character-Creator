import type { EraWealthData } from '../../types';
import { PRICES_OFFICIAL as RAW_OFFICIAL } from './prices-official';
import { PRICES_HOMEBREW as RAW_HOMEBREW } from './prices-homebrew';

// Normalize sources: rename any Cultist source to 'cultistarmoury.org'
const normalizeSource = (arr: any[]) => arr.map(it => {
  const isCultist = it.source && /cultist/i.test(String(it.source));
  return {
    ...it,
    source: isCultist ? 'cultistarmoury.org' : it.source,
    sourceType: isCultist ? 'homebrew' : 'core',
    sourceName: isCultist ? 'cultistarmoury.com' : 'Call of Cthulhu 7th Edition Core Rulebook',
    sourcePage: null,
  };
});

export const PRICES_OFFICIAL = normalizeSource(RAW_OFFICIAL);
export const PRICES_CULTIST = normalizeSource(RAW_HOMEBREW);

export const WEALTH_DATA: EraWealthData = {
  levels: [
    { name: 'Penniless', minCR: 0, maxCR: 0, description: 'Homeless or destitute; survives on charity or odd scraps. Travel by foot or stowing away.', spendingLevel: () => 0.50, cash: () => 0.50, assets: () => 'None' },
    { name: 'Poor', minCR: 1, maxCR: 9, description: 'Bare‑bones room and one meager meal a day. Cheapest transit only; any possessions are unreliable.', spendingLevel: () => 2, cash: (cr) => cr * 1, assets: (cr) => cr * 10 },
    { name: 'Average', minCR: 10, maxCR: 49, description: 'Comfortable living with three meals a day and occasional treats. Owns or rents a modest home or flat.', spendingLevel: () => 10, cash: (cr) => cr * 2, assets: (cr) => cr * 50 },
    { name: 'Wealthy', minCR: 50, maxCR: 89, description: 'Lives in luxury with domestic help. Likely owns a substantial home, perhaps a country retreat; travels first class.', spendingLevel: () => 50, cash: (cr) => cr * 5, assets: (cr) => cr * 500 },
    { name: 'Rich', minCR: 90, maxCR: 98, description: 'Opulent estates and multiple residences. Extensive staff and holdings; travels in the finest style at will.', spendingLevel: () => 250, cash: (cr) => cr * 20, assets: (cr) => cr * 2000 },
    { name: 'Super Rich', minCR: 99, maxCR: 99, description: 'Money no object. Among the wealthiest in the world with virtually unlimited means and influence.', spendingLevel: () => 500, cash: () => 10000, assets: () => 1000000 }, // Extrapolated
  ]
};
