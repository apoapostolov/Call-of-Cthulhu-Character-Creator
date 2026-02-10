import type { Occupation } from '../../types';

export const OCCUPATIONS: Occupation[] = [
    {
        name: 'Hacker',
        description: 'You are a master of the digital realm, navigating networks and code to uncover secrets or cause chaos.',
        group: 'Professional',
        eraId: 'modern-2000s',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 10, max: 70 },
        occupationalSkills: ['Computer Use', 'Electrical Repair', 'Electronics', 'Library Use', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 2, options: ['*'] }
        ]
    }
];