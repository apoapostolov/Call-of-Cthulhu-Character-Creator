/**
 * Era AI skill-distribution guidance + credit-rating floor heuristics.
 * Extracted from useCharacter (pure, no React).
 */
import type { Occupation } from '../types';
import type { SkillDistributionAnalysis } from '../lib/ai/skill-distribution';

export type SkillPoolKey = 'occupational' | 'personal' | 'experience' | 'archetype';

export type EraSkillDistributionProfile = {
  activePools: SkillPoolKey[];
  utilitySkills: string[];
  guidance: string[];
};

export const getEraSkillDistributionProfile = (
  eraId: string,
  isCampfireEra: boolean,
): EraSkillDistributionProfile => {
  if (isCampfireEra) {
    return {
      activePools: ['occupational'],
      utilitySkills: [
        'Spot Hidden', 'Listen', 'First Aid', 'Library Use', 'Psychology', 'Stealth',
        'Dodge', 'Climb', 'Jump', 'Throw', 'Family Credit Rating', 'Reassure', 'Fighting',
      ],
      guidance: [
        'There is no Personal Interest pool in Campfire Tales; spend only the scout hobby point pool.',
        'Treat the investigator as a child scout: age-appropriate, teamwork-oriented, curious, outdoors-capable, and not an adult professional.',
        'Family Credit Rating should reflect family lifestyle rather than personal income.',
        'Cool replaces Sanity in the sheet language, and Reassure is a kid-scale emotional support skill.',
      ],
    };
  }

  const basePools: SkillPoolKey[] = ['occupational', 'personal'];
  const commonUtility = [
    'Spot Hidden', 'Listen', 'First Aid', 'Library Use', 'Psychology', 'Stealth',
    'Dodge', 'Climb', 'Jump', 'Throw', 'Credit Rating', 'Fighting', 'Firearms',
  ];
  const eraProfiles: Record<string, EraSkillDistributionProfile> = {
    'pulp-1930s': {
      activePools: ['archetype', ...basePools],
      utilitySkills: [...commonUtility, 'Intimidate', 'Fast Talk'],
      guidance: [
        'Pulp investigators may be broader, more action-capable, and a little more heroic than Classic investigators.',
        'Use archetype points for cinematic strengths while keeping occupation and personal pools distinct.',
        'Combat, chase, and daring physical skills are more acceptable here than in Classic play.',
      ],
    },
    'gaslight-1890s': {
      activePools: basePools,
      utilitySkills: [...commonUtility, 'Ride', 'Natural World'],
      guidance: [
        'Account for Victorian social class, etiquette, empire, early forensic practice, and slower communications.',
        'Credit Rating, social skills, languages, riding, and academic skills often carry more setting weight.',
        'Avoid modern technical assumptions and prefer period-appropriate transport and research methods.',
      ],
    },
    regency: {
      activePools: basePools,
      utilitySkills: [
        ...commonUtility, 'Etiquette', 'Ride', 'Dancing', 'Natural Philosophy',
        'Drive Carriage/Cart', 'Fashion', 'Gaming', 'Religion', 'Reassure',
        'Pilot (Boat)', 'Accounting', 'Persuade', 'Appraise',
      ],
      guidance: [
        'Treat the era as Regency England, roughly 1811-1820, with the Prince Regent, the London Season, country houses, balls, assemblies, chaperones, and strict social rank.',
        'Account for inherited status, patronage, household service, militia and officer culture, coaching travel, letters, and the constraints of polite society.',
        'Credit Rating, etiquette, social skills, riding, dancing, carriage travel, and scholarly or polite-accomplishment skills often carry more setting weight than modern technical skills.',
        'Avoid modern technology, modern women\'s autonomy assumptions, and modern transportation or communications. Keep the character plausibly situated in a horse-drawn, paper-letter world.',
      ],
    },
    'dark-ages-1000s': {
      activePools: ['occupational', 'personal', 'experience'],
      utilitySkills: [
        'Spot Hidden', 'Listen', 'First Aid', 'Natural World', 'Track', 'Dodge',
        'Climb', 'Jump', 'Throw', 'Fighting', 'Ride', 'Survival',
      ],
      guidance: [
        'Use medieval literacy, status, oral culture, travel limits, religious life, and practical survival as major context.',
        'Experience packages may represent life events and should stay distinct from occupation and personal points.',
        'Favor period skills such as fighting, riding, natural world, track, survival, craft, and social standing where plausible.',
      ],
    },
    'western-1880s': {
      activePools: basePools,
      utilitySkills: [
        'Spot Hidden', 'Listen', 'First Aid', 'Natural World', 'Track', 'Navigate',
        'Ride', 'Dodge', 'Fighting', 'Firearms', 'Credit Rating', 'Fast Talk',
      ],
      guidance: [
        'Favor frontier plausibility: riding, firearms, tracking, survival, social grit, and practical trades matter.',
        'Keep technology, medicine, law, travel, and communications appropriate to the 1870s American West.',
        'Credit Rating should reflect frontier status and available resources rather than modern wealth.',
      ],
    },
    'modern-2020s': {
      activePools: basePools,
      utilitySkills: [...commonUtility, 'Computer Use', 'Drive Auto', 'Science'],
      guidance: [
        'Modern investigators can plausibly use digital research, contemporary professions, vehicles, phones, and modern medicine.',
        'Balance online research and technical skills with practical field survival and social investigation.',
        'Combat assumptions should reflect modern legality, training, and access.',
      ],
    },
    'modern-2000s': {
      activePools: basePools,
      utilitySkills: [...commonUtility, 'Computer Use', 'Drive Auto', 'Science'],
      guidance: [
        'Modern investigators can plausibly use digital research, contemporary professions, vehicles, phones, and modern medicine.',
        'Balance online research and technical skills with practical field survival and social investigation.',
        'Combat assumptions should reflect modern legality, training, and access.',
      ],
    },
  };

  return eraProfiles[eraId] || {
    activePools: basePools,
    utilitySkills: commonUtility,
    guidance: [
      'Use Classic Call of Cthulhu 1920s assumptions: ordinary adult investigators, grounded competence, and period-appropriate limits.',
      'Separate occupational expertise from personal interests, and keep Credit Rating plausible for the profession and lifestyle.',
      'Favor investigation, social, practical, and survival coverage before obscure filler.',
    ],
  };
};

export const deriveMinimumCreditRating = (
  occupation: Occupation,
  description: string,
  analysis?: SkillDistributionAnalysis,
) => {
  const text = [
    occupation.name,
    occupation.group,
    occupation.description,
    description,
    analysis?.summary || '',
    ...(analysis?.themes || []),
    ...(analysis?.cautions || []),
    analysis?.literacyNotes || '',
  ].join(' ').toLowerCase();

  const wealthy = /\b(wealthy|rich|luxury|luxurious|aristocrat|noble|heiress|banker|financier|executive|ceo|industrialist|socialite|elite|upper class|landed|lord|lady|millionaire|moneyed|well-to-do)\b/.test(text);
  const comfortable = /\b(comfortable|respectable|established|successful|professional|well paid|well-paid|well off|middle class|well-connected|prestigious|senior|partner|director|owner)\b/.test(text);
  const poor = /\b(poor|penniless|homeless|drifter|beggar|destitute|working class|laborer|manual labor|servant|maid|tenant|pauper|impoverished|down on (his|her|their) luck|struggling)\b/.test(text);
  const lowStatus = occupation.group === 'Manual Labor' || occupation.group === 'Criminal';
  const upperClass = occupation.group === 'Upper Class' || occupation.group === 'Dilettante';
  const ordinaryProfessional = [
    'Academic', 'Professional', 'Investigative', 'Entertainer', 'Crafts', 'War', 'Lovecraftian',
  ].includes(occupation.group);
  const min = occupation.creditRatingRange.min;
  const max = occupation.creditRatingRange.max;
  const clamp = (value: number) => Math.max(min, Math.min(max, value));

  let target = min;
  if (wealthy || upperClass) {
    target = clamp(min + 20);
  } else if (comfortable || ordinaryProfessional) {
    target = clamp(min + 10);
  } else if (poor || lowStatus) {
    target = clamp(min + 5);
  } else {
    target = clamp(min + 8);
  }

  if (occupation.group === 'Upper Class' || occupation.group === 'Dilettante') {
    target = Math.max(target, clamp(min + Math.min(25, Math.max(10, Math.round((max - min) * 0.4)))));
  }

  if (wealthy && !poor) {
    target = Math.max(target, clamp(Math.min(max, Math.max(min + 15, 50))));
  }

  return target;
};
