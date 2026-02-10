// age.config.ts
import type { AgeCategory, Attribute } from './types';

export interface AgeCategoryConfig {
    label: AgeCategory;
    name: string;
    description: string;
    deductions: {
        pool: Array<'STR' | 'CON' | 'DEX' | 'SIZ'>;
        total: number;
    };
    appPenalty: number;
    eduPenalty: number;
    eduChecks: number;
    luckBonus: boolean;
}

export const AGE_CATEGORIES: AgeCategoryConfig[] = [
    {
        label: '15-19',
        name: 'Youth',
        description: 'Deduct 5 points from STR & SIZ, and 5 from EDU. Roll LUCK twice and take the higher value.',
        deductions: { pool: ['STR', 'SIZ'], total: 5 },
        appPenalty: 0,
        eduPenalty: 5,
        eduChecks: 0,
        luckBonus: true,
    },
    {
        label: '20-39',
        name: 'Prime of Life',
        description: 'Make one EDU improvement check.',
        deductions: { pool: [], total: 0 },
        appPenalty: 0,
        eduPenalty: 0,
        eduChecks: 1,
        luckBonus: false,
    },
    {
        label: '40-49',
        name: 'Middle Age',
        description: 'Make 2 EDU improvement checks. Deduct 5 points from STR, CON, or DEX. Reduce APP by 5.',
        deductions: { pool: ['STR', 'CON', 'DEX'], total: 5 },
        appPenalty: 5,
        eduPenalty: 0,
        eduChecks: 2,
        luckBonus: false,
    },
    {
        label: '50-59',
        name: 'Experienced',
        description: 'Make 3 EDU improvement checks. Deduct 10 points from STR, CON, or DEX. Reduce APP by 10.',
        deductions: { pool: ['STR', 'CON', 'DEX'], total: 10 },
        appPenalty: 10,
        eduPenalty: 0,
        eduChecks: 3,
        luckBonus: false,
    },
    {
        label: '60-69',
        name: 'Senior',
        description: 'Make 5 improvement checks for EDU. Deduct 20 points from STR, CON, or DEX. Reduce APP by 15.',
        deductions: { pool: ['STR', 'CON', 'DEX'], total: 20 },
        appPenalty: 15,
        eduPenalty: 0,
        eduChecks: 5,
        luckBonus: false,
    },
    {
        label: '70-79',
        name: 'Elder',
        description: 'Make 9 improvement checks for EDU. Deduct 40 points from STR, CON, or DEX. Reduce APP by 20.',
        deductions: { pool: ['STR', 'CON', 'DEX'], total: 40 },
        appPenalty: 20,
        eduPenalty: 0,
        eduChecks: 9,
        luckBonus: false,
    },
    {
        label: '80-89',
        name: 'Venerable',
        description: 'Make 17 improvement checks for EDU. Deduct 80 points from STR, CON, or DEX. Reduce APP by 25.',
        deductions: { pool: ['STR', 'CON', 'DEX'], total: 80 },
        appPenalty: 25,
        eduPenalty: 0,
        eduChecks: 17,
        luckBonus: false,
    },
];