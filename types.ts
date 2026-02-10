// types.ts

// AI & UI Types
export type Nationality = string;
export type ExperienceLevel = 'New Recruit' | 'Experienced' | 'Veteran' | 'Legend';
export type DamagedVeteranOption = 'Extreme Violence' | 'Captivity or Imprisonment' | 'Hard Experience' | 'Things Man Was Not Meant to Know';
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type AgeCategory = '15-19' | '20-39' | '40-49' | '50-59' | '60-69' | '70-79' | '80-89';

export interface Emotion {
  name: string;
  prompt: string;
}

export interface CharacterTraits {
  positivePhysical: string;
  positiveMental: string;
  negative: string;
}

export interface DistinguishingFeatures {
  STR?: string;
  CON?: string;
  DEX?: string;
  INT?: string;
  POW?: string;
  APP?: string;
}

export interface WeightedNationality {
  name: string;
  weight: number;
}

export type Theme = string;

export interface ThemeConfig {
  displayName: string;
  themeClass: string;
  portrait: {
    theme: string;
    setting: string;
    atmosphere: string;
    visualStyle: string;
    additionalDetails: string;
  };
  name: {
    promptDescription: string;
  };
  traits?: {
    promptDescription: string;
  };
}

export interface DecadePromptConfig {
  artStyle: string;
  fashion: string;
  looks: string;
  mannerisms: string;
  politicsAndMood: string;
  technology: string;
}

export interface DecadeConfig {
  name: string;
  displayName: string;
  prompt: DecadePromptConfig;
}

export type Tab = 'stats' | 'skills' | 'gear' | 'dossier';

// FIX: Added missing types to resolve compilation errors across multiple files.
export interface SkillValue {
    name: string;
    value: number;
}

export interface Department {
    stub: string;
    name: string;
    agency: string;
    description: string;
    country: string;
    rank_order: number;
    yearOfEstablishment?: number;
    info: {
        powers_of_arrest: string;
        carry_of_weapon: string;
        access_to_funds: {
            maximum_request: string;
            access_protocol: string;
        };
        budget_and_restricted_items: string;
    };
    wikipedia_url: string;
    professions: string[];
    suggested_bonus_skills: string[];
    equipment: string[];
    ranks?: Record<string, string[]>;
    source: string;
    page: number;
    equipmentKit?: string[];
    infoId?: string;
    specialTrainings?: string[];
}

export interface SkillPackage {
    name: string;
    descriptor: string;
    skills: string[];
    choices?: string;
}

export interface Disorder {
    name: string;
    description: string;
    source: string;
    weight: number;
}


export interface EquipmentKit {
    name: string;
    items: string[];
    description?: string;
}

// Call of Cthulhu System-Specific Data Types
export type Attribute = 'STR' | 'CON' | 'DEX' | 'INT' | 'POW' | 'APP' | 'SIZ' | 'EDU' | 'LUCK';
export const ATTRIBUTES: Attribute[] = ['STR', 'CON', 'SIZ', 'DEX', 'APP', 'INT', 'POW', 'EDU'];

export interface AttributeSet {
  STR: number;
  CON: number;
  DEX: number;
  INT: number;
  POW: number;
  APP: number;
  SIZ: number;
  EDU: number;
  LUCK: number;
}

export interface DerivedAttributes {
    HP: number;
    MP: number;
    SAN: number;
    MOV: number;
    DamageBonus: string;
    Build: number;
}

export interface Skill {
  name: string;
  stub?: string; 
  shortName?: string;
  base: number;
  specialty?: boolean;
  description?: string;
  eraId?: EraID;
}

export type OccupationGroup = 'Lovecraftian' | 'War' | 'Crafts' | 'Academic' | 'Entertainer' | 'Manual Labor' | 'Investigative' | 'Professional' | 'Upper Class' | 'Criminal' | 'Dilettante';
// FIX: Added alias for ProfessionGroup.
export type ProfessionGroup = OccupationGroup;

export interface Occupation {
    name: string;
    description: string;
    group: OccupationGroup;
    skillPoints: string;
    creditRatingRange: { min: number; max: number };
    occupationalSkills: string[];
    eraId?: EraID;
    source?: string;
    page?: number;
    choiceGroups?: { count: number, options: string[] }[];
    ranks?: string[];
    bonds?: number;
    archetypicalClothing?: string;
    // Optional special rule/note to surface on Dossier (Tab 4)
    special?: string;
  // Pulp 1930s: attach a Suggested Contacts blurb (rendered as a Note on the Dossier tab)
  suggestedContacts?: string;
  // UI hint: when added by Pulp and not present in Classic, mark as NEW
  isNew?: boolean;
}
// FIX: Added alias for Profession.
export type Profession = Occupation;

// Bonds are not used in this Call of Cthulhu app.

export interface DGItem {
    section: string;
    name: string;
    shortName?: string;
    skill?: string;
    damage?: string;
    armorPiercing?: string;
    price?: string;
    range?: string;
    uses?: string;
    radius?: string;
    victimsPenalty?: string;
    baseRange?: string;
    lethality?: string;
    killRadius?: string;
    ammoCapacity?: string;
    description?: string;
    isRestricted?: boolean;
    sourceType?: 'core' | 'homebrew' | 'ai';
    sourceName?: string | null;
    sourcePage?: number | string | null;
    // Dark Ages specific properties
    impale?: boolean;
    hands?: string;
    length?: string;
    minStrDex?: string;
}

// Experience Packages (optional per era)
export interface ExperienceNote {
  name: string;
  description: string;
  source: string;
}

export interface ExperiencePackage {
  name: string;
  description: string;
  modifies?: {
    attributes?: Partial<Record<Attribute, string>>; // expressions or notes
    derived?: Partial<Record<'SAN' | 'HP' | 'MP' | 'MOV', string>>;
    skillBases?: Partial<Record<string, number>>;
    dob?: string; // instruction, e.g., 'adjust: civil-war-veteran'
    notes?: ExperienceNote[];
  };
  experiencePoints?: { total: number; eligibleSkills: string[] };
}

// Talents
export type TalentSourceType = 'core' | 'homebrew' | 'ai';
export interface Talent {
  name: string;
  description: string;
  category: 'Physical' | 'Miscellaneous' | 'Mental' | 'Combat';
  sourceType: TalentSourceType;
  source?: string | null;
  page?: number | string | null;
}

export interface SpecialTraining {
    name: string;
    basedOn: Attribute | string; 
    description: string;
    eraId?: EraID;
}

// Life Events (Dark Ages)
export type LifeEventSourceType = 'core' | 'homebrew' | 'ai-created';
export interface LifeEvent {
  roll: number; // 2d20 roll result (2-40)
  name: string;
  description: string;
  modifiers: {
    attributes?: Partial<Record<Attribute, number>>;
    derivedStats?: Partial<Record<'HP' | 'SAN' | 'MP' | 'MOV' | 'LUCK', number>>; // Derived stat modifiers
    skills?: Record<string, number>; // skill name -> modifier (+/-)
  };
  sourceType: LifeEventSourceType;
  source: string;
  page: number | string | null;
  special?: 'roll-twice'; // For roll 40: roll twice more
  requiresSpecialization?: string; // If present, user must select a specialization (e.g., "Science")
  selectedSpecialization?: string; // User's selected specialization for this event
}

// Archetypes (Pulp 1930s)
export interface ArchetypeTalentRules {
  limit?: number | null;
  required?: string[];
  suggested?: string[];
}

export interface ArchetypePool {
  total: number; // archetype points total
  eligibleSkills: string[]; // list of skill names, may include stubs like 'Fighting (any)' or 'Language Other (any)'
}

export interface Archetype {
  name: string;
  description: string;
  coreCharacteristics: Attribute[]; // one or more allowed; if multiple, user chooses one in a modal
  pool: ArchetypePool;
  suggestedOccupations: string[];
  talentRules?: ArchetypeTalentRules;
  source: string; // e.g., 'Pulp Cthulhu'
  page?: number | string | null;
}

// Data Loading Types
export type EraID = string;

export interface Era {
    id: EraID;
    name:string;
    isDefault?: boolean;
    publisher?: string;
    theme?: string;
    setting?: string;
}

export interface WealthLevel {
  name: string;
  minCR: number;
  maxCR: number;
  description: string;
  spendingLevel: (cr: number) => number;
  cash: (cr: number) => number;
  assets: (cr: number) => number | 'None' | '500M+';
  barter?: string; // Dark Ages: describes barter difficulty modifier
}

export interface EraWealthData {
  levels: WealthLevel[];
}

// Save System Types
export interface CharacterSaveData {
  version: string; // Save format version for future-proofing
  era: string;
  timestamp: number;
  
  // Core attributes
  baseAttributes: AttributeSet | null;
  modifiedAttributes: AttributeSet | null;
  selectedOccupation: Occupation | null;
  rollHistory: AttributeSet[];
  
  // Age system
  selectedAgeCategory: AgeCategory | null;
  ageDeductions: { required: number; applied: Record<string, number> };
  persistentAgeDeductions: Record<string, number>;
  eduImprovementRolls: number[];
  youthLuckApplied: boolean;
  originalBaseLuck: number | null;
  
  // Equipment
  activeKitName: string | null;
  kitInventory: DGItem[];
  inventory: DGItem[];
  wealth: { dailyCash: number; totalCash: number; assets: number } | null;
  purchaseLedger: Record<string, number>;
  
  // Skills
  skillPointAssignments: Record<string, { occupational: number; personal: number; experience?: number; archetype?: number }>;
  userCreatedSkills: Skill[];
  activeSkillPool: 'archetype' | 'occupational' | 'personal' | 'experience';
  occupationSkillChoices: Record<number, string[]>;
  
  // Experience
  selectedExperiencePackage: ExperiencePackage | null;
  experienceSanPenalty: number;
  experienceRollCache: Record<string, { sanPenalty?: number }>;
  experienceNotes: ExperienceNote[];
  experienceEligibleSkills: Set<string>;
  persistedExperiencePackageKey: string | null;
  occupationNotes: ExperienceNote[];
  
  // Pulp/Archetype
  selectedArchetype: Archetype | null;
  archetypeEligibleSkills: Set<string>;
  archetypePoints: { total: number; spent: number; remaining: number; formula: string; calculation: string } | null;
  archetypeCoreChoice: Attribute | null;
  coreCharacteristicRolls: Partial<Record<Attribute, number>>;
  originalCoreBaseValues: Partial<Record<Attribute, number>>;
  
  // Optional rules
  optionalRules: Record<string, boolean>;
  pulpRulesEnabled: boolean;
  selectedTalents: string[];
  
  // Life events
  rolledLifeEvents: any[];
  lifeEventModifiers: {
    attributes: Partial<Record<Attribute, number>>;
    derivedStats: Partial<Record<'HP' | 'SAN' | 'MP' | 'MOV' | 'LUCK', number>>;
    skills: Record<string, number>;
  };
  
  // AI-generated data
  ai: {
    name: string;
    codename: string;
    age: string;
    dob: string;
    gender: string;
    nationality: Nationality;
    distinguishingFeatures: string;
    beliefs: string;
    traits: string;
    backstory: string;
    portrait: string;
    personality: string;
  };
}

export interface SaveSlot {
  characterName: string;
  customName?: string;
  era: string;
  timestamp: number;
  data: CharacterSaveData;
}

// FIX: Added placeholder types to resolve compilation errors in utility files.
export type SystemClass = any;
export type SystemRace = any;

