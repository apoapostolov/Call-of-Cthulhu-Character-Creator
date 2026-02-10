import type { Occupation } from '../../types';
import { SKILL_SPECIALIZATIONS } from '../../skill-specializations-data';

export const OCCUPATIONS: Occupation[] = [
  // Confidence Trickster
  {
    name: 'Confidence Trickster',
    description: 'Traveling charlatans, medicine showmen, and confidence scammers who make a living off charm and trickery.',
    group: 'Criminal',
    skillPoints: 'EDU x 2 + APP x 2',
    creditRatingRange: { min: 10, max: 80 },
    occupationalSkills: ['Disguise', 'Dodge', 'Listen', 'Psychology', 'Sleight of Hand', 'Spot Hidden'],
    choiceGroups: [
      { count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
    ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Cowboy/Cowgirl
  {
    name: 'Cowboy/Cowgirl',
    description: 'Ranch hands and trail-riders who drive herds across the frontier and endure harsh conditions for meager pay.',
    group: 'Manual Labor',
    skillPoints: 'EDU x 2 + (STR x 2 or DEX x 2)',
    creditRatingRange: { min: 9, max: 20 },
    occupationalSkills: ['Dodge', 'Firearms (Handgun)', 'Firearms (Rifle/Shotgun)', 'First Aid', 'Jump', 'Natural World', 'Ride', 'Rope Use', 'Track'],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Craftsperson
  {
    name: 'Craftsperson',
    description: 'Skilled makers: blacksmiths, leather-workers, gunsmiths, furniture builders, and more.',
    group: 'Professional',
    skillPoints: 'EDU x 2 + DEX x 2',
    creditRatingRange: { min: 10, max: 70 },
    occupationalSkills: ['Accounting', 'Mechanical Repair', 'Persuade'],
    choiceGroups: [
      { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
      { count: 3, options: ['*'] }
    ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Dilettante/Greenhorn
  {
    name: 'Dilettante/Greenhorn',
    description: 'Wealthy Easterner with little real-world experience but a taste for adventure out West.',
    group: 'Dilettante',
    skillPoints: 'EDU x 2 + (APP x 2 or CON x 2)',
    creditRatingRange: { min: 50, max: 99 },
    occupationalSkills: ['Art and Craft', 'Listen', 'Other Language', 'Ride'],
    choiceGroups: [
      { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
      { count: 3, options: ['*'] }
    ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Doctor
  {
    name: 'Doctor',
    description: 'Small-town medical practitioner, dentist, or traveling healer tending a wide range of ailments.',
    group: 'Professional',
    skillPoints: 'EDU x 4',
    creditRatingRange: { min: 30, max: 80 },
    occupationalSkills: ['Accounting', 'First Aid', 'Medicine', 'Other Language (Latin)', 'Psychology', 'Science (Biology)', 'Science (Pharmacy)'],
    choiceGroups: [ { count: 1, options: ['*'] } ],
    special: 'Limited Sanity loss immunity (loses minimum possible for seeing blood and gore, or only half in the most extreme cases).',
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Entertainer
  {
    name: 'Entertainer',
    description: 'Actors, musicians, dancers, comedians—performers who navigate applause and danger alike across the frontier.',
    group: 'Entertainer',
    skillPoints: 'EDU x 2 + APP x 2',
    creditRatingRange: { min: 9, max: 60 },
    occupationalSkills: ['Disguise', 'Listen', 'Psychology'],
    choiceGroups: [
      { count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
      { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
      { count: 2, options: ['*'] }
    ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Expressman/Expresswoman
  {
    name: 'Expressman/Expresswoman',
    description: 'Teamsters, stage drivers, engineers, riverboat pilots—transporting goods, mail, and people across the West.',
    group: 'Professional',
    skillPoints: 'EDU x 2 + (CON x 2 or DEX x 2)',
    creditRatingRange: { min: 20, max: 60 },
    occupationalSkills: ['Accounting', 'Drive Wagon/Coach', 'Fast Talk', 'Firearms', 'Mechanical Repair', 'Natural World', 'Navigate', 'Ride'],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Farmer
  {
    name: 'Farmer',
    description: 'Sodbusters carving a living from the land through hard labor and perseverance.',
    group: 'Manual Labor',
    skillPoints: 'EDU x 2 + (STR x 2 or CON x 2)',
    creditRatingRange: { min: 9, max: 50 },
    occupationalSkills: ['Art and Craft (Farming)', 'Firearms (Rifle/Shotgun)', 'Drive Wagon/Coach', 'First Aid', 'Jump', 'Mechanical Repair', 'Natural World', 'Ride'],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Gambler
  {
    name: 'Gambler',
    description: 'A professional cardsharp, drifting from town to town seeking fortune and avoiding trouble.',
    group: 'Criminal',
    skillPoints: 'EDU x 2 + (POW x 2 or DEX x 2)',
    creditRatingRange: { min: 10, max: 60 },
    occupationalSkills: ['Accounting', 'Gambling', 'Listen', 'Psychology', 'Sleight of Hand', 'Spot Hidden'],
    choiceGroups: [ { count: 1, options: ['Charm', 'Fast Talk', 'Persuade'] }, { count: 1, options: ['*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Gunfighter
  {
    name: 'Gunfighter',
    description: 'Hired guns and deadly duelists, living by the speed of their draw and accuracy of their aim.',
    group: 'Criminal',
    skillPoints: 'EDU x 2 + DEX x 2',
    creditRatingRange: { min: 9, max: 70 },
    occupationalSkills: ['Fighting (Brawl)', 'Firearms (Handgun)', 'Firearms (Rifle/Shotgun)', 'Ride', 'Stealth', 'Spot Hidden', 'Track'],
    choiceGroups: [ { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Hobo/Drifter
  {
    name: 'Hobo/Drifter',
    description: 'Aimless wanderers doing odd jobs, carrying stories and secrets on dusty roads.',
    group: 'Manual Labor',
    skillPoints: 'EDU x 2 + (APP x 2 or DEX x 2 or STR x 2)',
    creditRatingRange: { min: 0, max: 6 },
    occupationalSkills: ['Climb', 'Fast Talk', 'Jump', 'Listen', 'Natural World', 'Navigate', 'Stealth'],
    choiceGroups: [ { count: 1, options: ['*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Journalist/Author
  {
    name: 'Journalist/Author',
    description: 'Crusading reporters and writers who document the West’s turmoil and triumphs.',
    group: 'Academic',
    skillPoints: 'EDU x 2 + INT x 2',
    creditRatingRange: { min: 9, max: 30 },
    occupationalSkills: ['History', 'Library Use', 'Psychology', 'Spot Hidden'],
    choiceGroups: [
      { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
      { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
      { count: 2, options: ['*'] }
    ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Lawman
  {
    name: 'Lawman',
    description: 'Marshals, sheriffs, Texas Rangers, Pinkertons—guardians of order in lawless lands.',
    group: 'Professional',
    skillPoints: 'EDU x 2 + (STR x 2 or DEX x 2)',
    creditRatingRange: { min: 20, max: 70 },
    occupationalSkills: ['Fighting (Brawl)', 'Firearms', 'Law', 'Psychology', 'Ride', 'Spot Hidden', 'Track'],
    choiceGroups: [ { count: 1, options: ['Intimidate', 'Persuade'] } ],
    special: 'Limited Sanity loss immunity (loses minimum possible for seeing blood and gore, or only half in the most extreme cases).',
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Lawyer/Judge
  {
    name: 'Lawyer/Judge',
    description: 'Attorneys and judges navigating frontier justice and high-stakes disputes.',
    group: 'Professional',
    skillPoints: 'EDU x 4',
    creditRatingRange: { min: 20, max: 80 },
    occupationalSkills: ['Accounting', 'Law', 'Library Use', 'Psychology'],
    choiceGroups: [
      { count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
      { count: 2, options: ['*'] }
    ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Man or Woman of God
  {
    name: 'Man or Woman of God',
    description: 'Preachers and spiritual leaders—sometimes righteous, sometimes fallen—who guide or confront the wicked.',
    group: 'Professional',
    skillPoints: 'EDU x 2 + APP x 2',
    creditRatingRange: { min: 9, max: 60 },
    occupationalSkills: ['History', 'Library Use', 'Listen', 'Occult', 'Other Language', 'Psychology'],
    choiceGroups: [ { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }, { count: 1, options: ['*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Merchant
  {
    name: 'Merchant',
    description: 'Owners and operators of frontier businesses: saloons, stores, banks, boarding houses, and more.',
    group: 'Professional',
    skillPoints: 'EDU x 2 + (APP x 2 or INT x 2)',
    creditRatingRange: { min: 20, max: 60 },
    occupationalSkills: ['Accounting', 'Appraise', 'Psychology', 'Spot Hidden'],
    choiceGroups: [ { count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }, { count: 2, options: ['*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Miner/Prospector
  {
    name: 'Miner/Prospector',
    description: 'Hardy souls seeking fortune in mines or riverbeds, risking life and limb for a strike.',
    group: 'Manual Labor',
    skillPoints: 'EDU x 2 + (STR x 2 or DEX x 2)',
    creditRatingRange: { min: 5, max: 60 },
    occupationalSkills: ['Climb', 'First Aid', 'Mechanical Repair', 'Natural World', 'Navigate', 'Science (Geology)', 'Spot Hidden'],
    choiceGroups: [ { count: 1, options: ['*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Outlaw
  {
    name: 'Outlaw',
    description: 'Robbers, rustlers, and renegades living by cunning and violence, from bank heists to train jobs.',
    group: 'Criminal',
    skillPoints: 'EDU x 2 + (APP x 2 or DEX x 2 or INT x 2)',
    creditRatingRange: { min: 6, max: 70 },
    occupationalSkills: ['Fighting', 'Firearms', 'Ride', 'Stealth', 'Spot Hidden'],
    choiceGroups: [
      { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
      { count: 1, options: ['Locksmith', 'Mechanical Repair'] },
      { count: 1, options: ['Psychology', 'Sleight of Hand'] }
    ],
    special: 'Limited Sanity loss immunity (loses minimum possible for seeing blood and gore, or only half in the most extreme cases).',
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Politician
  {
    name: 'Politician',
    description: 'Power brokers in frontier towns—mayors, councilors, and governors—pulling strings and shaping law.',
    group: 'Upper Class',
    skillPoints: 'EDU x 2 + (APP x 2 or INT x 2)',
    creditRatingRange: { min: 10, max: 99 },
    occupationalSkills: ['History', 'Law', 'Listen', 'Psychology', 'Charm', 'Persuade'],
    choiceGroups: [ { count: 2, options: ['*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Rancher
  {
    name: 'Rancher',
    description: 'Wealthy and influential landowners managing vast herds, men, and resources.',
    group: 'Upper Class',
    skillPoints: 'EDU x 2 + (STR x 2 or INT x 2)',
    creditRatingRange: { min: 50, max: 99 },
    occupationalSkills: ['Accounting', 'Law', 'Natural World', 'Persuade', 'Ride', 'Rope Use', 'Spot Hidden'],
    choiceGroups: [ { count: 1, options: ['*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Scholar/Teacher
  {
    name: 'Scholar/Teacher',
    description: 'Educators and lecturers bringing knowledge to rough and remote places.',
    group: 'Academic',
    skillPoints: 'EDU x 4',
    creditRatingRange: { min: 10, max: 50 },
    occupationalSkills: ['Library Use', 'Other Language', 'Psychology', 'Science'],
    choiceGroups: [ { count: 1, options: ['Persuade', 'Intimidate'] }, { count: 3, options: ['*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Scientist/Engineer
  {
    name: 'Scientist/Engineer',
    description: 'Inventors and experts—from chemists to bridge-builders—pushing the frontier of technology and science.',
    group: 'Academic',
    skillPoints: 'EDU x 4',
    creditRatingRange: { min: 20, max: 80 },
    occupationalSkills: ['History', 'Law', 'Library Use', 'Mechanical Repair', 'Operate Heavy Machinery'],
    choiceGroups: [ { count: 3, options: ['Science (Biology)', 'Science (Chemistry)', 'Science (Geology)', 'Science (Physics)', '*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Scout/Mountain Man or Woman
  {
    name: 'Scout/Mountain Man or Woman',
    description: 'Frontier pathfinders and trappers who read the land, live off it, and often know the tribes.',
    group: 'Investigative',
    skillPoints: 'EDU x 2 + (STR x 2 or DEX x 2 or CON x 2)',
    creditRatingRange: { min: 0, max: 20 },
    occupationalSkills: ['Firearms', 'First Aid', 'Natural World', 'Navigate', 'Ride', 'Stealth', 'Track', 'Trap'],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Soldier/Warrior
  {
    name: 'Soldier/Warrior',
    description: 'U.S. soldiers and American Indian warriors; veterans of the Indian Wars and frontier battles.',
    group: 'Professional',
    skillPoints: 'EDU x 2 + (STR x 2 or DEX x 2)',
    creditRatingRange: { min: 10, max: 70 },
    occupationalSkills: ['Climb', 'Fighting', 'Firearms (Rifle)', 'First Aid', 'Stealth', 'Throw'],
    choiceGroups: [ { count: 1, options: ['Mechanical Repair', 'Natural World'] }, { count: 1, options: ['*'] } ],
    special: 'Limited Sanity loss immunity (loses minimum possible for seeing blood and gore, or only half in the most extreme cases).',
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Unskilled Laborer
  {
    name: 'Unskilled Laborer',
    description: 'Workers of brawn: construction, rail, delivery, bartending, and heavy lifting across the frontier.',
    group: 'Manual Labor',
    skillPoints: 'EDU x 2 + STR x 2',
    creditRatingRange: { min: 5, max: 20 },
    occupationalSkills: ['Climb', 'Fighting (Brawl)', 'Jump', 'Natural World', 'Stealth', 'Throw'],
    choiceGroups: [ { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }, { count: 1, options: ['*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  },
  // Artist (legacy occupation retained)
  {
    name: 'Artist',
    description:
      'Painters, sculptors, illustrators, and photographers who chronicle the Old West—its stark landscapes, brutal conflicts, and everyday life. From Remington bronzes to studio portraits of cowboys and outlaws, artistry thrives amid dust and danger.',
    group: 'Entertainer',
    skillPoints: 'EDU x 2 + (DEX x 2 or POW x 2)',
    creditRatingRange: { min: 6, max: 60 },
    occupationalSkills: [
      'Art and Craft', // choose specializations via the UI
      'History',
      'Library Use',
      'Psychology',
      'Spot Hidden',
      'Sleight of Hand'
    ],
    choiceGroups: [ { count: 2, options: ['*'] } ],
    source: 'Down Darker Trails',
    eraId: 'western-1880s'
  }
];
