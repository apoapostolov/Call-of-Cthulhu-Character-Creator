import type { EraWealthData } from '../../types';

export const WEALTH_DATA: EraWealthData = {
  levels: [
    {
      name: 'Penniless',
      minCR: 0,
      maxCR: 0,
      description: 'No fixed home or possessions beyond worn clothing; the scout depends on charity, friends, or the state.',
      spendingLevel: () => 0,
      cash: () => 0,
      assets: () => 'None',
    },
    {
      name: 'Poor',
      minCR: 1,
      maxCR: 15,
      description: 'Basic or overcrowded home life, hand-me-down clothes, and only a few small pocket items.',
      spendingLevel: () => 0.05,
      cash: () => 0.25,
      assets: () => 5,
    },
    {
      name: 'Average',
      minCR: 16,
      maxCR: 85,
      description: 'Comfortable home life, school supplies, a bicycle, and small ordinary possessions.',
      spendingLevel: () => 0.25,
      cash: () => 1,
      assets: () => 50,
    },
    {
      name: 'Wealthy',
      minCR: 86,
      maxCR: 99,
      description: 'A large comfortable house, family car, some domestic help, nice clothes, and prized possessions.',
      spendingLevel: () => 1,
      cash: () => 10,
      assets: () => 500,
    },
    {
      name: 'Rich',
      minCR: 100,
      maxCR: 100,
      description: 'Private-school wealth, staff, influence, expensive pocket money, and obvious family privilege.',
      spendingLevel: () => 10,
      cash: () => 50,
      assets: () => 5000,
    },
  ],
};

