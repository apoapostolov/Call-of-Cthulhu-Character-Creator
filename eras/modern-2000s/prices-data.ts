import type { EraWealthData } from '../../types';

export const WEALTH_DATA: EraWealthData = {
  levels: [
    { name: 'Penniless', minCR: 0, maxCR: 0, description: 'Homeless or destitute; reliant on shelters and charity. Travel by foot or public aid.', spendingLevel: () => 10, cash: () => 10, assets: () => 'None' },
    { name: 'Poor', minCR: 1, maxCR: 9, description: 'Subsidized or minimal housing and basic meals. Cheapest public transit; possessions are few and fragile.', spendingLevel: () => 40, cash: (cr) => cr * 20, assets: (cr) => cr * 1000 },
    { name: 'Average', minCR: 10, maxCR: 49, description: 'Comfortable life: reliable housing, daily meals, and occasional extras. Owns or finances a dependable car.', spendingLevel: () => 200, cash: (cr) => cr * 40, assets: (cr) => cr * 10000 },
    { name: 'Wealthy', minCR: 50, maxCR: 89, description: 'High-end living with domestic help. Multiple quality properties or a primary home plus vacation getaways.', spendingLevel: () => 1000, cash: (cr) => cr * 100, assets: (cr) => cr * 40000 },
    { name: 'Rich', minCR: 90, maxCR: 98, description: 'Lavish estates and numerous residences. Significant investments and staff; first-class travel as standard.', spendingLevel: () => 5000, cash: (cr) => cr * 200, assets: (cr) => cr * 200000 },
    { name: 'Super Rich', minCR: 99, maxCR: 99, description: 'Wealth on a global scale. Private staff, jets, and unparalleled access; money rarely limits decisions.', spendingLevel: () => 100000, cash: () => 50000, assets: () => '500M+' },
  ]
};
