import type { Talent } from '../../types';

// Cthulhu by Gaslight Talents
export const TALENTS: Talent[] = [
  // Physical Talents (Table 11)
  { name: 'Endurance', description: 'Gain a bonus die when making CON rolls (including to determine MOV rate for chases).', category: 'Physical', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Iron Liver', description: 'May spend 5 Luck points to avoid the effects of drinking excessive amounts of alcohol (negating any penalty applied to skill rolls).', category: 'Physical', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Keen Hearing', description: 'Gain a bonus die to Listen rolls.', category: 'Physical', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Keen Vision', description: 'Gain a bonus die to Spot Hidden rolls.', category: 'Physical', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Night Vision', description: 'In darkness, reduce the difficulty level of Spot Hidden rolls and ignore the penalty die for shooting in the dark.', category: 'Physical', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Power Lifter', description: 'Gain a bonus die when making STR rolls to lift objects or people.', category: 'Physical', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Quick Healer', description: 'Natural healing is increased to +3 hit points per day.', category: 'Physical', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Shadow', description: 'Reduce difficulty by one level or gains a bonus die (at the Keeper\'s discretion) to Stealth rolls, and, if currently unseen, can make two surprise attacks.', category: 'Physical', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Stout Constitution', description: 'May spend 10 Luck points to reduce poison or disease damage and effects by half.', category: 'Physical', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Tough Guy', description: 'Soaks up damage; may spend 10 Luck points to shrug off up to 5 hit points worth of damage taken in one combat round.', category: 'Physical', sourceType: 'core', source: 'Cthulhu by Gaslight' },

  // Mental Talents (Table 12)
  { name: 'Arcane Insight', description: 'Halve the time required to learn spells; gains bonus die to spell-casting rolls.', category: 'Mental', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Hardened', description: 'Ignores Sanity point loss from attacking other humans, viewing horrific injuries, or the deceased.', category: 'Mental', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Linguist', description: 'Able to determine the language being spoken (or written); gains a bonus die to any Language roll.', category: 'Mental', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Lore', description: 'Has knowledge of a lore specialization skill (e.g., Dream Lore, Vampire Lore, Werewolf Lore, etc.). Both occupational and personal interest skill points can be invested in this skill.', category: 'Mental', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Photographic Memory', description: 'Can remember many details; gains a bonus die when making Know rolls.', category: 'Mental', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Psychic Power', description: 'May choose one psychic power: Clairvoyance, Divination, Medium, Psychometry, or Telekinesis. Both occupational and personal interest skill points can be invested in this skill.', category: 'Mental', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Quick Study', description: 'Halve the time required for Initial and Full Reading of Mythos tomes, and other books.', category: 'Mental', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Resilient', description: 'May spend Luck points to shrug off points of Sanity loss, on a one-for-one basis.', category: 'Mental', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Sharp Witted', description: 'Able to collate facts quickly; gain a bonus die when making Intelligence (but not Idea) rolls.', category: 'Mental', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Strong Willed', description: 'Gain a bonus die when making POW rolls.', category: 'Mental', sourceType: 'core', source: 'Cthulhu by Gaslight' },

  // Combat Talents (Table 13)
  { name: 'Alert', description: 'Never surprised in combat.', category: 'Combat', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Beady Eye', description: 'Does not suffer penalty die when "aiming" at a small target (Build −2); may fire into melee without a penalty die.', category: 'Combat', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Fast Load', description: 'Choose a Firearm specialism; ignore penalty die for loading and firing in the same round.', category: 'Combat', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Fleet Footed', description: 'May spend 10 Luck points to avoid being "outnumbered" in melee combat for one combat encounter.', category: 'Combat', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Heavy Hitter', description: 'May spend 10 Luck points to add an additional damage die when dealing melee combat (die type depends on the weapon used, e.g., 1D3 for unarmed combat, 1D6 for a sword, etc.).', category: 'Combat', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Nimble', description: 'Does not lose next action when "diving for cover" versus firearms.', category: 'Combat', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Outmaneuver', description: 'Considered to have a one-point higher Build when initiating a combat maneuver (e.g., Build 1 becomes Build 2 when comparing the hero to the target, reducing the likelihood of a penalty on their Fighting roll).', category: 'Combat', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Quick Draw', description: 'Does not need to have their firearm "readied" to gain +50 DEX when determining position in the DEX order for combat.', category: 'Combat', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Rapid Attack', description: 'May spend 10 Luck points to gain one further melee attack in a single combat round.', category: 'Combat', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Rapid Fire', description: 'Ignores penalty die for multiple handgun shots.', category: 'Combat', sourceType: 'core', source: 'Cthulhu by Gaslight' },

  // Miscellaneous Talents (Table 14)
  { name: 'Animal Empathy', description: 'Reduce difficulty by one level or gain a bonus die (at the Keeper\'s discretion) when making Ride or Animal Handling rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Etiquette', description: 'Makes a good impression; gains a bonus die when making a Credit Rating roll.', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Excellent Weapon', description: 'Starts the game owning a high-quality artisan weapon; if a firearm, increase base range by 50%; if a melee weapon, gains +2 damage.', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Gadget', description: 'Starts the game with one weird science gadget (see Weird Science, Pulp Cthulhu, page 86).', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Handy', description: 'Reduce difficulty by one level or gains bonus die (at the Keeper\'s discretion) when making Electrical Repair, Mechanical Repair, and Operate Heavy Machinery rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Lucky', description: 'Regains an additional +1D10 Luck points when making Luck Recovery rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Master of Disguise', description: 'May spend 10 Luck points to gain a bonus die to Disguise and Art/Craft (Acting) rolls; includes ventriloquism (able to throw voice over distances so it appears the sound is emanating from somewhere else). Note that if someone is trying to detect the disguise, their Spot Hidden or Psychology roll\'s difficulty increases to Hard.', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Mythos Knowledge', description: 'Starts the game with a Cthulhu Mythos skill of 10 points.', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Resourceful', description: 'Always seem to have what they need to hand; may spend 10 Luck points (rather than make a Luck roll) to find a certain useful item.', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Scary', description: 'Reduces difficulty by one level or gains bonus die (at the Keeper\'s discretion) to Intimidate rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Smooth Talker', description: 'Gain a bonus die to Charm rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
  { name: 'Weird Science', description: 'May build and repair weird science devices (see Weird Science, Pulp Cthulhu, page 86).', category: 'Miscellaneous', sourceType: 'core', source: 'Cthulhu by Gaslight' },
];