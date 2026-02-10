import type { EraWealthData } from '../../types';

// Dark Ages Wealth System
// Based on Status (not Credit Rating) - represents feudal hierarchy position
// Note: Dark Ages uses pence (d) as base currency
// - 240d = £1 (one pound)
// - 12d = 1 shilling (s)
// - Status replaces Credit Rating
// - Barter represents difficulty modifier for social interactions/trade
// - Total Cash represents immediately available liquid wealth (1/10 of total)
// - Assets represent stored wealth (9/10 of total)
// - Internal format: "cents" directly represent pence (no division needed in display)

export const WEALTH_DATA: EraWealthData = {
  levels: [
    { 
      name: 'Penniless', 
      minCR: 0, 
      maxCR: 0, 
      description: 'Homeless, outcast, or destitute. Survives on charity, begging, or scraps. No social standing in the feudal hierarchy.',
      spendingLevel: () => 4, // 4d per day
      cash: () => 0, // No cash available
      assets: () => 0, // None
      barter: 'Increase difficulty by one level (or penalty die)'
    },
    { 
      name: 'Poor', 
      minCR: 1, 
      maxCR: 9, 
      description: 'Serf, peasant, or day laborer. Lives in basic shelter with minimal possessions. Little to no social mobility.',
      spendingLevel: () => 2, // 2d per day
      cash: (status) => status * 1, // Status x 1d (1d-9d)
      assets: (status) => status * 9, // Status x 9d (9d-81d)
      barter: 'Increase difficulty by one level (or penalty die)'
    },
    { 
      name: 'Average', 
      minCR: 10, 
      maxCR: 49, 
      description: 'Freeman, craftsperson, or small merchant. Owns modest dwelling and tools of trade. Some respect in local community.',
      spendingLevel: () => 4, // 4d per day
      cash: (status) => status * 4.5, // Status x 4.5d (45d-220.5d)
      assets: (status) => status * 40.5, // Status x 40.5d (405d-1984.5d)
      barter: 'Regular'
    },
    { 
      name: 'Wealthy', 
      minCR: 50, 
      maxCR: 89, 
      description: 'Minor noble, wealthy merchant, or high-ranking cleric. Owns land, livestock, and has servants. Significant local influence.',
      spendingLevel: () => 8, // 8d per day
      cash: (status) => status * 50, // Status x 50d (2500d-4450d)
      assets: (status) => status * 450, // Status x 450d (22,500d-40,050d)
      barter: 'Regular'
    },
    { 
      name: 'Lordly', 
      minCR: 90, 
      maxCR: 98, 
      description: 'Major noble, bishop, or royal official. Commands estates, vassals, and extensive resources. Political power and dynastic connections.',
      spendingLevel: () => 16, // 16d per day
      cash: (status) => status * 200, // Status x 200d (18,000d-19,600d)
      assets: (status) => status * 1800, // Status x 1800d (162,000d-176,400d)
      barter: 'Regular'
    },
    { 
      name: 'Imperial', 
      minCR: 99, 
      maxCR: 99, 
      description: 'King, emperor, or pope. Virtually unlimited resources and absolute authority within domain. Shapes the fate of kingdoms.',
      spendingLevel: () => 32, // 32d per day
      cash: () => 19700, // 19,700d
      assets: () => 177300, // 177,300d
      barter: 'Lower difficulty by one level (or bonus die)'
    },
  ]
};

