import type { Archetype } from '../../types';

// NOTE: Initial seed of archetypes based on provided 1930s list; pages are null for now.
// Pool: 100 points for eligible skills per archetype per spec.

export const ARCHETYPES: Archetype[] = [
  {
    name: 'Adventurer',
    description: 'Yearns for excitement and challenge, shuns mundane routine in favor of daring exploits.',
    coreCharacteristics: ['DEX', 'APP'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Climb', 'Diving', 'Drive Auto', 'First Aid', 'Fighting (any)', 'Firearms (any)', 'Jump',
        'Language (Other) (any)', 'Mechanical Repair', 'Pilot (any)', 'Ride', 'Stealth', 'Survival (any)', 'Swim'
      ]
    },
    suggestedOccupations: ['Actor', 'Archaeologist', 'Athlete', 'Aviator', 'Bank Robber', 'Big Game Hunter', 'Cat Burglar', 'Dilettante', 'Drifter', 'Gambler', 'Gangster', 'Hobo', 'Investigative Journalist', 'Missionary', 'Nurse', 'Photographer', 'Ranger', 'Sailor', 'Soldier', 'Tribe Member'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Beefcake',
    description: 'Muscular and formidable; handles problems with physical prowess.',
    coreCharacteristics: ['STR'],
    pool: {
      total: 100,
      eligibleSkills: ['Climb', 'Fighting (Brawl)', 'Intimidate', 'Listen', 'Mechanical Repair', 'Psychology', 'Swim', 'Throw']
    },
    suggestedOccupations: ['Athlete', 'Beat Cop', 'Bounty Hunter', 'Boxer', 'Entertainer', 'Gangster', 'Hired Muscle', 'Hobo', 'Itinerant Worker', 'Laborer', 'Mechanic', 'Sailor', 'Soldier', 'Street Punk', 'Tribe Member'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Bon Vivant',
    description: 'Lives well and in the moment, the center of attention and friend to all.',
    coreCharacteristics: ['SIZ'],
    pool: {
      total: 100,
      eligibleSkills: ['Appraise', 'Art and Craft (any)', 'Charm', 'Fast Talk', 'Language (Other) (any)', 'Listen', 'Spot Hidden', 'Psychology']
    },
    suggestedOccupations: ['Actor', 'Artist', 'Butler', 'Confidence Trickster', 'Cult Leader', 'Dilettante', 'Elected Official', 'Entertainer', 'Gambler', 'Gun Moll', 'Gentleman/Lady', 'Military Officer', 'Musician', 'Priest', 'Professor', 'Zealot'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Cold Blooded',
    description: 'A rationalist capable of just about anything; ruthless and premeditated, following a stark view of humanity.',
    coreCharacteristics: ['INT'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Art and Craft (Acting)', 'Disguise', 'Fighting (any)', 'Firearms (any)', 'First Aid', 'History', 'Intimidate', 'Law', 'Listen', 'Mechanical Repair', 'Psychology', 'Stealth', 'Survival (any)', 'Track'
      ]
    },
    suggestedOccupations: ['Bank Robber', 'Beat Cop', 'Bounty Hunter', 'Cult Leader', 'Drifter', 'Exorcist', 'Federal Agent', 'Gangster', 'Gun Moll', 'Hired Muscle', 'Hit Man', 'Professor', 'Reporter', 'Soldier', 'Street Punk', 'Tribe Member', 'Zealot'],
    talentRules: { limit: 2, required: ['Hardened'] },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Dreamer',
    description: 'An idealist or visionary who follows their own path, looking beyond mundane realities.',
    coreCharacteristics: ['POW'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Art and Craft (any)', 'Charm', 'History', 'Language (Other) (any)', 'Library Use', 'Listen', 'Natural World', 'Occult'
      ]
    },
    suggestedOccupations: ['Artist', 'Author', 'Bartender/Waitress', 'Priest', 'Cult Leader', 'Dilettante', 'Drifter', 'Elected Official', 'Gambler', 'Gentleman/Lady', 'Hobo', 'Hooker', 'Librarian', 'Musician', 'Nurse', 'Occultist', 'Professor', 'Secretary', 'Student', 'Tribe Member'],
    talentRules: { limit: 2, suggested: ['Strong Willed'] },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Egghead',
    description: 'Practical and hands-on analyst and tinkerer who loves understanding how things work.',
    coreCharacteristics: ['INT', 'EDU'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Anthropology', 'Appraise', 'Computer Use', 'Electrical Repair', 'Language (Other) (any)', 'Library Use', 'Mechanical Repair', 'Operate Heavy Machinery', 'Science (any)'
      ]
    },
    suggestedOccupations: ['Butler', 'Cult Leader', 'Doctor of Medicine', 'Engineer', 'Gentleman/Lady', 'Investigative Journalist', 'Mechanic', 'Priest', 'Scientist'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Explorer',
    description: 'Strong-willed seeker of what lies beyond the horizon, at one with nature, restless and brave.',
    coreCharacteristics: ['DEX', 'POW'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Animal Handling', 'Anthropology', 'Archaeology', 'Climb', 'Fighting (Brawl)', 'First Aid', 'Jump', 'Language (Other) (any)', 'Natural World', 'Navigate', 'Pilot (any)', 'Ride', 'Stealth', 'Survival (any)', 'Track'
      ]
    },
    suggestedOccupations: ['Agency Detective', 'Archaeologist', 'Big Game Hunter', 'Bounty Hunter', 'Dilettante', 'Explorer', 'Get-Away Driver', 'Gun Moll', 'Itinerant Worker', 'Investigative Journalist', 'Missionary', 'Photographer', 'Ranger', 'Sailor', 'Soldier', 'Tribe Member'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Femme Fatale',
    description: 'Alluring and cunning manipulator who draws others into their web to achieve their goals.',
    coreCharacteristics: ['APP', 'INT'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Art and Craft (Acting)', 'Appraise', 'Charm', 'Disguise', 'Drive Auto', 'Fast Talk', 'Fighting (Brawl)', 'Firearms (Handgun)', 'Listen', 'Psychology', 'Sleight of Hand', 'Stealth'
      ]
    },
    suggestedOccupations: ['Actor', 'Agency Detective', 'Author', 'Cat Burglar', 'Confidence Trickster', 'Dilettante', 'Elected Official', 'Entertainer', 'Federal Agent', 'Gangster', 'Gun Moll', 'Hit Man', 'Hooker', 'Investigative Journalist', 'Musician', 'Nurse', 'Private Investigator', 'Reporter', 'Spy', 'Zealot'],
    talentRules: { limit: 2, suggested: ['Smooth Talker'] },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Grease Monkey',
    description: 'Practically minded maker and fixer; can do attitude for inventions, machines, and devices.',
    coreCharacteristics: ['INT'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Appraise', 'Art and Craft (any)', 'Fighting (Brawl)', 'Drive Auto', 'Electrical Repair', 'Locksmith', 'Mechanical Repair', 'Operate Heavy Machinery', 'Spot Hidden', 'Throw'
      ]
    },
    suggestedOccupations: ['Bartender/Waitress', 'Butler', 'Cat Burglar', 'Chauffeur', 'Drifter', 'Engineer', 'Get-Away Driver', 'Hobo', 'Itinerant Worker', 'Mechanic', 'Sailor', 'Soldier', 'Student', 'Union Activist'],
    talentRules: { limit: 2, suggested: ['Weird Science'] },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Hard Boiled',
    description: 'Tough, streetwise, and pragmatic; uses any tools necessary and may crack a few skulls.',
    coreCharacteristics: ['CON'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Art and Craft (any)', 'Fighting (Brawl)', 'Firearms (any)', 'Drive Auto', 'Fast Talk', 'Intimidate', 'Law', 'Listen', 'Locksmith', 'Sleight of Hand', 'Spot Hidden', 'Stealth', 'Throw'
      ]
    },
    suggestedOccupations: ['Agency Detective', 'Bank Robber', 'Beat Cop', 'Bounty Hunter', 'Boxer', 'Gangster', 'Gun Moll', 'Laborer', 'Police Detective', 'Private Investigator', 'Ranger', 'Union Activist'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Harlequin',
    description: 'Magnetic manipulator who prefers others to do their bidding; chaotic and flamboyant.',
    coreCharacteristics: ['APP'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Art and Craft (Acting)', 'Charm', 'Climb', 'Disguise', 'Fast Talk', 'Jump', 'Language (Other) (any)', 'Listen', 'Persuade', 'Psychology', 'Sleight of Hand', 'Stealth'
      ]
    },
    suggestedOccupations: ['Actor', 'Agency Detective', 'Artist', 'Bartender/Waitress', 'Confidence Trickster', 'Cult Leader', 'Dilettante', 'Elected Official', 'Entertainer', 'Gambler', 'Gentleman/Lady', 'Musician', 'Reporter', 'Secretary', 'Union Activist', 'Zealot'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Hunter',
    description: 'Calm and calculated pursuer; relentless in chasing prey and mastering the environment.',
    coreCharacteristics: ['INT', 'CON'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Animal Handling', 'Fighting (any)', 'Firearms (Handgun)', 'Firearms (Rifle/Shotgun)', 'First Aid', 'Listen', 'Natural World', 'Navigate', 'Spot Hidden', 'Stealth', 'Survival (any)', 'Swim', 'Track'
      ]
    },
    suggestedOccupations: ['Agency Detective', 'Bank Robber', 'Beat Cop', 'Bounty Hunter', 'Boxer', 'Gangster', 'Gun Moll', 'Laborer', 'Police Detective', 'Private Investigator', 'Ranger', 'Union Activist'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Mystic',
    description: 'Seeker of hidden truths and the unseen; taps into supernatural powers with caution.',
    coreCharacteristics: ['POW'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Art and Craft (any)', 'Science (Astronomy)', 'Disguise', 'History', 'Hypnosis', 'Language (Other) (any)', 'Natural World', 'Occult', 'Psychology', 'Sleight of Hand', 'Stealth'
      ]
    },
    suggestedOccupations: ['Artist', 'Cult Leader', 'Dilettante', 'Exorcist', 'Entertainer', 'Occultist', 'Parapsychologist', 'Tribe Member'],
    talentRules: { limit: 2, required: ['Psychic'] },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Outsider',
    description: 'Stands apart from society; often on a journey and uses distinct or alien knowledge.',
    coreCharacteristics: ['INT', 'CON'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Art and Craft (any)', 'Animal Handling', 'Fighting (any)', 'First Aid', 'Intimidate', 'Language (Other) (any)', 'Listen', 'Medicine', 'Navigate', 'Stealth', 'Survival (any)', 'Track'
      ]
    },
    suggestedOccupations: ['Artist', 'Drifter', 'Explorer', 'Hired Muscle', 'Itinerant Worker', 'Laborer', 'Nurse', 'Occultist', 'Ranger', 'Tribe Member'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Rogue',
    description: 'Non-conformist who delights in skirting laws and confounding others with stunts.',
    coreCharacteristics: ['DEX', 'APP'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Appraise', 'Art and Craft (any)', 'Charm', 'Disguise', 'Fast Talk', 'Law', 'Locksmith', 'Psychology', 'Read Lips', 'Spot Hidden', 'Stealth'
      ]
    },
    suggestedOccupations: ['Artist', 'Bank Robber', 'Cat Burglar', 'Confidence Trickster', 'Dilettante', 'Entertainer', 'Gambler', 'Get-Away Driver', 'Spy', 'Student'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Scholar',
    description: 'Seeker of knowledge content in libraries; uses intelligence and analysis to understand.',
    coreCharacteristics: ['EDU'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Accounting', 'Anthropology', 'Cryptography', 'History', 'Language (Other) (any)', 'Library Use', 'Medicine', 'Natural World', 'Occult', 'Science (any)'
      ]
    },
    suggestedOccupations: ['Archaeologist', 'Author', 'Doctor of Medicine', 'Librarian', 'Parapsychologist', 'Professor', 'Scientist'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Seeker',
    description: 'Driven puzzle-solver who uses intelligence and reasoning to uncover mysteries.',
    coreCharacteristics: ['INT'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Accounting', 'Appraise', 'Disguise', 'History', 'Law', 'Library Use', 'Listen', 'Occult', 'Psychology', 'Science (any)', 'Spot Hidden', 'Stealth'
      ]
    },
    suggestedOccupations: ['Agency Detective', 'Author', 'Beat Cop', 'Federal Agent', 'Investigative Journalist', 'Occultist', 'Parapsychologist', 'Police Detective', 'Reporter', 'Spy', 'Student'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Sidekick',
    description: 'Younger, steadfast helper who is resourceful and loyal; often learning from a mentor.',
    coreCharacteristics: ['DEX', 'CON'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Animal Handling', 'Climb', 'Electrical Repair', 'Fast Talk', 'First Aid', 'Jump', 'Library Use', 'Listen', 'Navigate', 'Art and Craft (Photography)', 'Science (any)', 'Stealth', 'Track'
      ]
    },
    suggestedOccupations: ['Author', 'Bartender/Waitress', 'Beat Cop', 'Butler', 'Chauffeur', 'Doctor of Medicine', 'Federal Agent', 'Get-Away Driver', 'Gun Moll', 'Hobo', 'Hooker', 'Laborer', 'Librarian', 'Nurse', 'Photographer', 'Scientist', 'Secretary', 'Street Punk', 'Student', 'Tribe Member'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Steadfast',
    description: 'Morally righteous protector who fights with honor and for justice.',
    coreCharacteristics: ['CON'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Accounting', 'Drive Auto', 'Fighting (any)', 'Firearms (Handgun)', 'First Aid', 'History', 'Intimidate', 'Law', 'Natural World', 'Navigate', 'Persuade', 'Psychology', 'Ride', 'Spot Hidden', 'Survival (any)'
      ]
    },
    suggestedOccupations: ['Athlete', 'Beat Cop', 'Butler', 'Priest', 'Chauffeur', 'Doctor of Medicine', 'Elected Official', 'Exorcist', 'Federal Agent', 'Gentleman/Lady', 'Missionary', 'Nurse', 'Police Detective', 'Private Detective', 'Reporter', 'Sailor', 'Soldier', 'Tribe Member'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Swashbuckler',
    description: 'Gallant and heroic romantic who fights fairly, favoring action over firearms.',
    coreCharacteristics: ['DEX', 'APP'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Art and Craft (any)', 'Charm', 'Climb', 'Fighting (any)', 'Jump', 'Language (Other) (any)', 'Mechanical Repair', 'Navigate', 'Pilot (any)', 'Stealth', 'Swim', 'Throw'
      ]
    },
    suggestedOccupations: ['Actor', 'Artist', 'Aviator', 'Big Game Hunter', 'Bounty Hunter', 'Dilettante', 'Entertainer', 'Gentleman/Lady', 'Investigative Journalist', 'Military Officer', 'Missionary', 'Private Detective', 'Ranger', 'Sailor', 'Soldier', 'Spy'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Thrill Seeker',
    description: 'Daredevil drawn to danger and high stakes; risk-taker who seeks adrenaline rushes.',
    coreCharacteristics: ['DEX', 'POW'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Art and Craft (any)', 'Charm', 'Climb', 'Diving', 'Drive Auto', 'Fast Talk', 'Jump', 'Mechanical Repair', 'Navigate', 'Pilot (any)', 'Ride', 'Stealth', 'Survival (any)', 'Swim', 'Throw'
      ]
    },
    suggestedOccupations: ['Actor', 'Athlete', 'Aviator', 'Bank Robber', 'Bounty Hunter', 'Cat Burglar', 'Dilettante', 'Entertainer', 'Explorer', 'Gambler', 'Gangster', 'Get-Away Driver', 'Gun Moll', 'Gentleman/Lady', 'Hooker', 'Investigative Journalist', 'Missionary', 'Musician', 'Occultist', 'Parapsychologist', 'Ranger', 'Sailor', 'Soldier', 'Spy', 'Union Activist', 'Zealot'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
  {
    name: 'Two-Fisted',
    description: 'Storehouse of energy—strong, tough, and direct; resolves disputes with fists.',
    coreCharacteristics: ['STR', 'SIZ'],
    pool: {
      total: 100,
      eligibleSkills: [
        'Drive Auto', 'Fighting (Brawl)', 'Firearms (any)', 'Intimidate', 'Listen', 'Mechanical Repair', 'Spot Hidden', 'Swim', 'Throw'
      ]
    },
    suggestedOccupations: ['Agency Detective', 'Bank Robber', 'Beat Cop', 'Boxer', 'Gangster', 'Gun Moll', 'Hired Muscle', 'Hit Man', 'Hooker', 'Laborer', 'Mechanic', 'Nurse', 'Police Detective', 'Ranger', 'Reporter', 'Sailor', 'Soldier', 'Street Punk', 'Tribe Member', 'Union Activist'],
    talentRules: { limit: 2 },
    source: 'Pulp Cthulhu',
    page: null,
  },
];
