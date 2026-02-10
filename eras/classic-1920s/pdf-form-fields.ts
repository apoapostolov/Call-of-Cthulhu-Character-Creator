// pdf-form-fields.ts (Classic 1920s CoC sheet)
// Use this mapping when filling the 1920s sheet via the legacy PDF field config path.
export const PDF_FIELD_MAP = {
  // --- Config / rules ---
    __config: {
      portraitPreference: 'headshot', // prefer 1:1 headshot portrait
      sanityFrom: 'POW', // Starting Sanity equals POW
      skillFieldPrefix: 'Skill_', // Skill_{Name} numeric fields
      skillCheckSuffix: '_Chk', // optional checkbox suffix per skill
      skillHalfSuffix: '_half',
      skillFifthSuffix: '_fifth',
      // Art/Craft specialization name target and candidate numeric fields
      artCraft: {
      nameField: 'SkillDef_ArtCraft1',
      nameField2: 'SkillDef_ArtCraft2',
      valueFields: ['Skill_ArtCraft1', 'Skill_ArtCraft2'],
      },
    },

  // --- Identity ---
  characterName: 'Investigators_Name',
  pronouns: 'Pronouns',
  birthplace: 'Birthplace',
  residence: 'Residence',
  age: 'Age',
  occupation: 'Occupation',

  // --- Attributes ---
  STR: 'STR', DEX: 'DEX', INT: 'INT', CON: 'CON', APP: 'APP', POW: 'POW', SIZ: 'SIZ', EDU: 'EDU',

  // --- Derived ---
  MOV: 'MOV', Build: 'Build', DamageBonus: 'DamageBonus',
  currentHP: 'CurrentHP',
  currentSanity: 'CurrentSanity',
  maxSanity: 'MaxSanity',

  // --- Portrait ---
  portrait: 'Portrait',
};
