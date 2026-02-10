import type { EraWealthData } from '../../types';

// Wealth data for Western (1880s)
export const WEALTH_DATA: EraWealthData = {
  levels: [
    { name: 'Penniless', minCR: 0, maxCR: 0, description: 'Destitute; relies on charity or odd jobs. Travel by foot or hitching a ride.', spendingLevel: () => 0.25, cash: () => 0.25, assets: () => 'None' },
    { name: 'Poor', minCR: 1, maxCR: 9, description: 'Bare means; sparse lodging and simple meals. Cheapest transport only.', spendingLevel: () => 1, cash: (cr) => cr * 0.5, assets: (cr) => cr * 5 },
    { name: 'Average', minCR: 10, maxCR: 49, description: 'Modest living; basic comforts and occasional indulgences.', spendingLevel: () => 5, cash: (cr) => cr * 1, assets: (cr) => cr * 25 },
    { name: 'Wealthy', minCR: 50, maxCR: 89, description: 'Comfortable holdings; possibly land, livestock, or a thriving business.', spendingLevel: () => 25, cash: (cr) => cr * 3, assets: (cr) => cr * 125 },
    { name: 'Rich', minCR: 90, maxCR: 98, description: 'Significant estates, multiple enterprises, and notable influence.', spendingLevel: () => 125, cash: (cr) => cr * 10, assets: (cr) => cr * 1000 },
    { name: 'Super Rich', minCR: 99, maxCR: 99, description: 'Fortunes measured against rail barons and magnates.', spendingLevel: () => 2500, cash: () => 25000, assets: () => 2500000 },
  ]
};
