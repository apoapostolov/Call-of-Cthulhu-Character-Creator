import type { Talent } from '../../types';

export const TALENTS: Talent[] = [
  // Physical
  { name: 'Endurance', description: 'Gain a bonus die when making CON rolls (including to determine MOV rate for chases).', category: 'Physical', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Iron Liver', description: 'May spend 5 Luck points to avoid the effects of drinking excessive amounts of alcohol (negating penalty applied to skill rolls).', category: 'Physical', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Keen Hearing', description: 'Gain a bonus die to Listen rolls.', category: 'Physical', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Keen Vision', description: 'Gain a bonus die to Spot Hidden rolls.', category: 'Physical', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Night Vision', description: 'In darkness, reduce the difficulty level of Spot Hidden rolls and ignore penalty die for shooting in the dark.', category: 'Physical', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Quick Healer', description: 'Natural healing is increased to +3 hit points per day.', category: 'Physical', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Stout Constitution', description: 'May spend 10 Luck points to reduce poison or disease damage and their effects by half.', category: 'Physical', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Strong as an Ox', description: 'Gain a bonus die when making STR rolls.', category: 'Physical', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Tough', description: 'Soaks up damage; may spend 10 Luck points to shrug off up to 5 hit points worth of damage taken in one combat round.', category: 'Physical', sourceType: 'core', source: 'Down Darker Trails' },

  // Miscellaneous
  { name: 'Animal Empathy', description: 'Reduces difficulty by one level or gains bonus die (at the Keeper\'s discretion) when making Ride or Animal Handling rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Excellent Weapon', description: 'Starts game owning a high-quality weapon (if firearm, increase base range by 50%; if melee weapons may add +2 damage). The weapon is clearly an artisan production.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Gadget', description: 'Starts game with one weird science gadget (see Weird Science, Pulp Cthulhu).', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Gunsmith', description: 'Reduces difficulty by one level or gains bonus die (at the Keeper\'s discretion) when repairing or making firearms; able to clear firearm malfunctions (jams) in 1 round.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Handy', description: 'Reduces difficulty by one level or gains bonus die (at the Keeper\'s discretion) when making Mechanical Repair and Operate Heavy Machinery rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Hunter\'s Blood', description: 'May spend 10 Luck points to gain a bonus die when making Track, Rope Use, or Trap skill rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Lucky', description: 'Regains an additional +1D10 Luck points when Luck Recovery rolls are made.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Master of Disguise', description: 'May spend 10 Luck points to gain a bonus die to Disguise or Art/Craft (Acting) rolls; includes ventriloquism (able to throw voice over long distances so it appears that the sound is emanating from somewhere else). If someone is trying to detect the disguise then their Spot Hidden or Psychology roll\'s difficulty is raised to Hard.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Mythos Knowledge', description: 'Begins the game with a Cthulhu Mythos skill of 10 points.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Scary', description: 'Reduces difficulty by one level or gains bonus die (at the Keeper\'s discretion) to Intimidate rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Shadow', description: 'Reduces difficulty by one level or gains bonus die (at the Keeper\'s discretion) to Stealth rolls, and if currently unseen is able to make two surprise attacks before their location is discovered.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Smooth Talker', description: 'Gain a bonus die to Charm rolls.', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Weird Science', description: 'May build and repair weird science devices (see Weird Science, Pulp Cthulhu).', category: 'Miscellaneous', sourceType: 'core', source: 'Down Darker Trails' },

  // Mental
  { name: 'Arcane Insight', description: 'Halve the time required to learn spells and gains bonus die to spell casting rolls.', category: 'Mental', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Hardened', description: 'Ignores Sanity point loss from attacking other humans, viewing horrific injuries, or the deceased.', category: 'Mental', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Linguist', description: 'Able to determine what language is being spoken (or what is written); gains a bonus die to any Language roll.', category: 'Mental', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Lore', description: 'Has knowledge of a lore specialization skill (e.g. Dream Lore, Vampire Lore, Werewolf Lore, etc.). Note that occupational and/or personal interest skill points should be invested in this skill.', category: 'Mental', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Photographic Memory', description: 'Can remember many details; gains a bonus die when making Know rolls.', category: 'Mental', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Psychic Power', description: 'May choose one psychic power (Clairvoyance, Divination, Medium, Psychometry, or Telekinesis). Note that occupational and/or personal interest skill points should be invested in this skill.', category: 'Mental', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Quick Study', description: 'Halve the time required for Initial and Full Reading of Mythos tomes, as well as other books.', category: 'Mental', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Resilient', description: 'May spend Luck points to shrug off points of Sanity loss, on a one-for-one basis.', category: 'Mental', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Sharp Witted', description: 'Able to collate facts quickly; gain a bonus die when making Intelligence (but not Idea) rolls.', category: 'Mental', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Strong Willed', description: 'Gains a bonus die when making POW rolls.', category: 'Mental', sourceType: 'core', source: 'Down Darker Trails' },

  // Combat
  { name: 'Alert', description: 'Never surprised in combat.', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Ambidextrous Shooter', description: 'No penalty die on shots made with off-hand.', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Beady Eye', description: 'Does not suffer penalty die when aiming at a small target and may fire into melee without a penalty die.', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Fast Load', description: 'Choose a Firearm specialism; ignore penalty die for loading and firing in the same round.', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Fleet Footed', description: 'May spend 10 Luck to avoid being outnumbered in melee combat for one encounter.', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Heavy Hitter', description: 'May spend 10 Luck points to add an additional damage die when dealing melee damage (die type depends on the weapon).', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Nimble', description: 'Does not lose next action when diving for cover versus firearms.', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Outmaneuver', description: 'Considered to have one point higher Build when initiating a combat maneuver.', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Quick Draw', description: 'Does not need a readied firearm to gain +50 DEX when determining position in the DEX order.', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Quick Shot', description: 'May spend 10 Luck points to allow two handgun bullets to hit rather than one.', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
  { name: 'Rapid Attack', description: 'May spend 10 Luck points to gain one further melee attack in a single combat round.', category: 'Combat', sourceType: 'core', source: 'Down Darker Trails' },
];
