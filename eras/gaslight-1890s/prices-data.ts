import type { EraWealthData } from '../../types';

// Gaslight (1890s) — UK pre-decimal currency table
// Units are in pounds sterling (£). Shillings/pence converted to decimal pounds.
// Source mapping (per docs):
// - Penniless: Cash 5s (0.25), Assets: Hand-to-Mouth (treated as None), Spending Level: 1d (~0.004166...)
// - Poor (CR 1–9): Cash CR×1, Assets CR×10, Spending Level: 5s (0.25)
// - Average (CR 10–49): Cash CR×10, Assets CR×100, Spending Level: £2/10s (2.5)
// - Wealthy (CR 50–89): Cash CR×12, Assets CR×100, Spending Level: £15
// - Rich (CR 90–98): Cash CR×50, Assets CR×500, Spending Level: £50
// - Super Rich (CR 99): Cash £10,000+, Assets £1,000,000+, Spending Level: £250
export const WEALTH_DATA: EraWealthData = {
	levels: [
		{
			name: 'Penniless',
			minCR: 0,
			maxCR: 0,
			description:
				'Destitute; survives day-to-day (hand-to-mouth). Lodgings uncertain; travel on foot or by charity.',
			spendingLevel: () => 1 / 240, // 1d (one penny) ≈ £0.004166...
			cash: () => 0.25, // 5 shillings = £0.25
			assets: () => 'None',
		},
		{
			name: 'Poor',
			minCR: 1,
			maxCR: 9,
			description:
				'Modest means; a simple room and basic meals. Cheapest public conveyances when necessary.',
			spendingLevel: () => 0.25, // 5s
			cash: (cr) => cr * 1,
			assets: (cr) => cr * 10,
		},
		{
			name: 'Average',
			minCR: 10,
			maxCR: 49,
			description:
				'Comfortable lodging and regular meals; occasional indulgences. Maintains modest property or savings.',
			spendingLevel: () => 2.5, // £2/10s
			cash: (cr) => cr * 10,
			assets: (cr) => cr * 100,
		},
		{
			name: 'Wealthy',
			minCR: 50,
			maxCR: 89,
			description:
				'Lives in comfort with domestic help; likely owns a substantial townhouse or country home; travels first class.',
			spendingLevel: () => 15,
			cash: (cr) => cr * 12,
			assets: (cr) => cr * 100,
		},
		{
			name: 'Rich',
			minCR: 90,
			maxCR: 98,
			description:
				'Opulent estates and multiple residences; extensive staff and investments; travels in the finest style.',
			spendingLevel: () => 50,
			cash: (cr) => cr * 50,
			assets: (cr) => cr * 500,
		},
		{
			name: 'Super Rich',
			minCR: 99,
			maxCR: 99,
			description:
				'Money no object. Among the wealthiest in the Empire with virtually unlimited means and influence.',
			spendingLevel: () => 250,
			cash: () => 10000, // £10,000+
			assets: () => 1000000, // £1,000,000+
		},
	],
};
