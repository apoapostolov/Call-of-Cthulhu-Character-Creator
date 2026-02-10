import type { Talent } from '../../types';

// Pulp Cthulhu 1930s Talents
export const TALENTS: Talent[] = [
  // Physical (Table 3)
  { name: 'Keen Vision', description: 'Gain a bonus die to Spot Hidden rolls.', category: 'Physical', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Quick Healer', description: 'Natural healing is increased to +3 hit points per day.', category: 'Physical', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Night Vision', description: 'In darkness, reduce the difficulty level of Spot Hidden rolls and ignore the penalty die for shooting in the dark.', category: 'Physical', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Endurance', description: 'Gain a bonus die when making CON rolls (including to determine MOV rate for chases).', category: 'Physical', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Power Lifter', description: 'Gain a bonus die when making STR rolls to lift objects or people.', category: 'Physical', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Iron Liver', description: 'May spend 5 Luck to avoid the effects of drinking excessive amounts of alcohol (negating any penalty applied to skill rolls).', category: 'Physical', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Stout Constitution', description: 'May spend 10 Luck to reduce poison or disease damage and effects by half.', category: 'Physical', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Tough Guy', description: 'Soaks up damage; may spend 10 Luck points to shrug off up to 5 hit points worth of damage taken in one combat round.', category: 'Physical', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Keen Hearing', description: 'Gain a bonus die to Listen rolls.', category: 'Physical', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Smooth Talker', description: 'Gain a bonus die to Charm rolls.', category: 'Physical', sourceType: 'core', source: 'Pulp Cthulhu' },

  // Mental (Table 4)
  { name: 'Hardened', description: 'Ignores Sanity point loss from attacking other humans, viewing horrific injuries, or the deceased.', category: 'Mental', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Resilient', description: 'May spend Luck points to shrug off points of Sanity loss, on a one-for-one basis.', category: 'Mental', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Strong Willed', description: 'Gains a bonus die when making POW rolls.', category: 'Mental', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Quick Study', description: 'Halve the time required for Initial and Full Reading of Mythos tomes, as well as other books.', category: 'Mental', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Linguist', description: 'Able to determine what language is being spoken (or what is written); gains a bonus die to Language rolls.', category: 'Mental', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Arcane Insight', description: 'Halve the time required to learn spells and gain a bonus die to spell casting rolls.', category: 'Mental', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Photographic Memory', description: 'Can remember many details; gains a bonus die when making Know rolls.', category: 'Mental', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Lore', description: 'Has knowledge of a lore specialization skill (e.g., Dream Lore, Vampire Lore, Werewolf Lore, etc.). Note that occupational and/or personal interest skill points should be invested in this skill.', category: 'Mental', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Psychic Power', description: 'May choose one psychic power (Clairvoyance, Divination, Medium, Psychometry, or Telekinesis). Note that occupational and/or personal interest skill points should be invested in this skill.', category: 'Mental', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Sharp Witted', description: 'Able to collate facts quickly; gain a bonus die when making Intelligence (but not Idea) rolls.', category: 'Mental', sourceType: 'core', source: 'Pulp Cthulhu' },

  // Combat (Table 5)
  { name: 'Alert', description: 'Never surprised in combat.', category: 'Combat', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Heavy Hitter', description: 'May spend 10 Luck points to add an additional damage die when dealing out melee combat (die type depends on the weapon being used, e.g., 1D3 for unarmed combat, 1D6 for a sword, etc.).', category: 'Combat', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Fast Load', description: 'Choose a Firearm specialism; ignore the penalty die for loading and firing in the same round.', category: 'Combat', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Nimble', description: 'Does not lose next action when “diving for cover” versus firearms.', category: 'Combat', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Beady Eye', description: 'Does not suffer the penalty die when “aiming” at a small target (Build −2), and may also fire into melee without a penalty die.', category: 'Combat', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Outmaneuver', description: 'Character is considered to have one point higher Build when initiating a combat maneuver, reducing the likelihood of suffering a penalty on their Fighting roll.', category: 'Combat', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Rapid Attack', description: 'May spend 10 Luck points to gain one further melee attack in a single combat round.', category: 'Combat', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Fleet Footed', description: 'May spend 10 Luck to avoid being “outnumbered” in melee combat for one combat encounter.', category: 'Combat', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Quick Draw', description: 'Does not need to have their firearm “readied” to gain +50 DEX when determining position in the DEX order for combat.', category: 'Combat', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Rapid Fire', description: 'Ignores the penalty die for multiple handgun shots.', category: 'Combat', sourceType: 'core', source: 'Pulp Cthulhu' },

  // Miscellaneous (Table 6)
  { name: 'Scary', description: 'Reduces difficulty by one level or gains a bonus die (at the Keeper’s discretion) to Intimidate rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Gadget', description: 'Starts game with one weird science gadget (see Weird Science).', category: 'Miscellaneous', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Lucky', description: 'Regains an additional +1D10 Luck points when Luck Recovery rolls are made.', category: 'Miscellaneous', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Mythos Knowledge', description: 'Begins the game with a Cthulhu Mythos skill of 10 points.', category: 'Miscellaneous', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Weird Science', description: 'May build and repair weird science devices.', category: 'Miscellaneous', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Shadow', description: 'Reduces difficulty by one level or gains a bonus die (at the Keeper’s discretion) to Stealth rolls, and if currently unseen is able to make two surprise attacks before their location is discovered.', category: 'Miscellaneous', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Handy', description: 'Reduces difficulty by one level or gains a bonus die (at the Keeper’s discretion) when making Electrical Repair, Mechanical Repair, and Operate Heavy Machinery rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Animal Companion', description: 'Starts game with a faithful animal companion (e.g., dog, cat, parrot) and gains a bonus die when making Animal Handling rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Master of Disguise', description: 'May spend 10 Luck points to gain a bonus die to Disguise or Art/Craft (Acting) rolls; includes ventriloquism. Note that if someone is trying to detect the disguise, their Spot Hidden or Psychology roll’s difficulty is raised to Hard.', category: 'Miscellaneous', sourceType: 'core', source: 'Pulp Cthulhu' },
  { name: 'Resourceful', description: 'Always seems to have what they need to hand; may spend 10 Luck points (rather than make a Luck roll) to find a certain useful piece of equipment in their current location.', category: 'Miscellaneous', sourceType: 'core', source: 'Pulp Cthulhu' },
];
