// pdf-form-fields.ts (Campfire Tales child-friendly sheet)
// Maps application data to the Scout Campfire Tales PDF form fields.
export const PDF_FIELD_MAP = {
  __config: {
    portraitPreference: 'headshot',
    sanityFrom: 'POW',
    skillFieldPrefix: 'skill_', // lower-case snake_case prefix for campfire PDF
    skillCheckSuffix: '_check', // checkbox suffix per skill
    skillHalfSuffix: '_half',
    skillFifthSuffix: '_fifth',
    // This sheet does not use the Art/Craft, Science, Pilot, Fighting specialization
    // slot system of the 1920s sheet; skills are flat-named.
    hasCustomSkills: true,       // signals the sheet uses skill_custom_{1..6}
    hasLowerDuplicate: true,     // signals dodge_lower + fighting_brawl_lower duplicate rows
    hasBadges: true,
    hasDistressAdversity: true,
    hasCoolAttribute: true,
  },

  // --- Identity ---
  characterName: 'investigator_name',
  pronouns: null,                   // No pronouns field on campfire sheet; gender not printed
  birthplace: null,
  residence: null,
  age: 'investigator_age',
  occupation: 'investigator_hobby', // Scouts call it "Hobby" not "Occupation"

  // --- Attributes (Characteristics) ---
  STR: 'characteristic_str',
  DEX: 'characteristic_dex',
  INT: 'characteristic_int',
  CON: 'characteristic_con',
  APP: 'characteristic_app',
  POW: 'characteristic_pow',
  SIZ: 'characteristic_siz',
  EDU: 'characteristic_edu',

  // --- Derived ---
  MOV: 'attribute_move',
  Build: 'attribute_build',
  DamageBonus: 'attribute_damage_bonus',
  currentHP: 'attribute_hit_point_current',
  maxHP: 'attribute_hit_point_max',
  currentMP: 'attribute_magic_points_current',
  maxMP: 'attribute_magic_points_max',
  currentSanity: 'attribute_cool', // Campfire uses "Cool" instead of Sanity
  maxSanity: null,
  startingLuck: 'attribute_luck_starting',
  currentLuck: 'attribute_luck_current',

  // --- Portrait ---
  portrait: 'investigator_portrait_af_image',

  // --- Background ---
  personalDescription: 'background_personal_description',
  trustedAdult: 'background_trusted_adult',
  home: 'background_home',
  traits: 'background_traits',
  obligations: 'background_obligations',
  fears: 'background_fears',
  campfireNotes1: 'background_campfire_notes_1',
  campfireNotes2: 'background_campfire_notes_2',

  // --- Resources / Gear ---
  gear1: 'resources_gear_posessions_1',
  gear2: 'resources_gear_posessions_2',

  // --- Associates ---
  associatesPrefix: 'associates', // associates_character_{1..6}_name, associates_player_{1..6}_name

  // --- Weapons (only 2 slots on campfire sheet) ---
  weapons: {
    count: 2,
    prefix: 'weapon_',              // weapon_{1..2}, weapon_{1..2}_name, weapon_{1..2}_damage, etc.
    skillField: '',                 // weapon_1 is the skill value itself (not weapon_1_regular)
    nameField: '_name',
    damageField: '_damage',
    attacksField: '_number_of_attacks',
    rangeField: '_range',
    ammoField: '_ammo',
    malfField: '_malfunction',
    halfField: '_half',
    fifthField: '_fifth',
  },

  // --- Skill name → PDF field suffix mapping ---
  // Maps app skill names (case-insensitive key) to the snake_case suffix
  // used in the campfire PDF field names.
  // The PDF fields are: skill_{suffix}, skill_{suffix}_half, skill_{suffix}_fifth, skill_{suffix}_check
  skillFieldMap: {
    'Charm': 'charm',
    'Climb': 'climb',
    'Dodge': 'dodge',               // also has dodge_lower duplicate rows
    'Fighting (Brawl)': 'fighting_brawl', // also has fighting_brawl_lower duplicate rows
    'First Aid': 'first_aid',
    'Cthulhu Mythos': 'cthulhu_mythos',
    'Family Credit Rating': 'family_credit_rtng',
    'Fast Talk': 'fast_talk',
    'Intimidate': 'intimidate',
    'Jump': 'jump',
    'Language (Other)': 'language_other',   // uses skill_language_other_name
    'Language (Own)': 'language_own',       // uses language_own_name for name
    'Language (Signals)': 'language_signals',
    'Library Use': 'library_use',
    'Listen': 'listen',
    'Natural World': 'natural_world',
    'Navigate': 'navigate',
    'Persuade': 'persuade',
    'Psychology': 'psychology',
    'Reassure': 'reassure',
    'Ride (Bicycle)': 'ride_bicycle',
    'Spot Hidden': 'spot_hidden',
    'Stealth': 'stealth',
    'Survival': 'survival',
    'Swim': 'swim',
    'Throw': 'throw',
    'Track': 'track',
  },

  // --- Custom skill slots ---
  customSkills: {
    count: 6,
    nameField: 'skill_custom_{n}_name',
    valueField: 'skill_custom_{n}',
    checkField: 'skill_custom_{n}_check',
  },

  // --- Conditions (Distress & Adversity checkboxes) ---
  conditions: {
    stressed: 'attribute_stressed',
    jumpy: 'attribute_jumpy',
    upset: 'attribute_upset',
    cold: 'attribute_cold',
    hunger: 'attribute_hunger',
    lost: 'attribute_lost',
    overburdened: 'attribute_overburdened',
    sore: 'attribute_sore',
    unconscious: 'attribute_unconscious',
    dying: 'attribute_dying',
  },

  // --- Badge checkboxes ---
  badges: {
    // Rank badges
    wayfarerEarned: 'badge_wayfarer_earned',
    wandererEarned: 'badge_wanderer_earned',
    wandererUsed: 'badge_wanderer_used',
    roverEarned: 'badge_rover_earned',
    roverUsed: 'badge_rover_used',
    rangerEarned: 'badge_ranger_earned',
    rangerUsed: 'badge_ranger_used',
    wardenEarned: 'badge_warden_earned',
    wardenUsed: 'badge_warden_used',
    // Ability badges
    animalFriendshipEarned: 'badge_animal_friendship_earned',
    animalFriendshipUsed: 'badge_animal_friendship_used',
    boatingEarned: 'badge_boating_earned',
    boatingUsed: 'badge_boating_used',
    campingEarned: 'badge_camping_earned',
    campingUsed: 'badge_camping_used',
    climbingEarned: 'badge_climbing_earned',
    climbingUsed: 'badge_climbing_used',
    craftingEarned: 'badge_crafting_earned',
    craftingUsed: 'badge_crafting_used',
    cyclingEarned: 'badge_cycling_earned',
    cyclingUsed: 'badge_cycling_used',
    firstAidEarned: 'badge_first_aid_earned',
    firstAidUsed: 'badge_first_aid_used',
    fishingEarned: 'badge_fishing_earned',
    fishingUsed: 'badge_fishing_used',
    hikingEarned: 'badge_hiking_earned',
    hikingUsed: 'badge_hiking_used',
    knotTyingEarned: 'badge_knot_tying_earned',
    knotTyingUsed: 'badge_knot_tying_used',
    natureEarned: 'badge_nature_earned',
    natureUsed: 'badge_nature_used',
    orienteeringEarned: 'badge_orienteering_earned',
    orienteeringUsed: 'badge_orienteering_used',
    photographyEarned: 'badge_photography_earned',
    photographyUsed: 'badge_photography_used',
    publicSpeakingEarned: 'badge_public_speaking_earned',
    publicSpeakingUsed: 'badge_public_speaking_used',
    radioEarned: 'badge_radio_earned',
    radioUsed: 'badge_radio_used',
    readingEarned: 'badge_reading_earned',
    readingUsed: 'badge_reading_used',
    signalsCodesEarned: 'badge_signals_&_codes_earned',
    signalsCodesUsed: 'badge_signals_&_codes_used',
    swimmingEarned: 'badge_swiming_earned',
    swimmingUsed: 'badge_swiming_used',
    weatherEarned: 'badge_weather_earned',
    weatherUsed: 'badge_weather_used',
    wildernessSurvivalEarned: 'badge_wilderness_survival_earned',
    wildernessSurvivalUsed: 'badge_wilderness_survival_used',
  },
};
