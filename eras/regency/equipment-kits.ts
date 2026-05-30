import type { EquipmentKit } from '../../types';

const tonGentlemanItems = [
  'Tailcoat',
  'Morning Coat',
  'Top Hat',
  'Cravat',
  'Pocket Watch',
  'Walking Cane',
  "Men's Gloves (Leather)",
  'Calling Cards',
  'Writing Desk Set',
  'Field Glasses',
  'Travel Cloak',
  'Horse and Saddle',
  'Snuff Box',
  'Cane Sword',
];

const tonGentlewomanItems = [
  'Simple White Dress',
  'White Silk Handkerchief',
  "Women's Gloves (Fabric)",
  "Women's Walking Boots",
  'Bonnet',
  'Fan',
  'Reticule',
  'Shawl',
  'Parasol',
  'Silk Stockings (Pair)',
  'Calling Cards',
  'Writing Desk Set',
  'Field Glasses',
  'Pelisse',
  'Sewing Kit',
  'Hairpins',
];

const countryGentlemanItems = [
  'Riding Boots',
  'Riding Crop',
  'Tailcoat',
  'Top Hat',
  'Pocket Watch',
  'Horse and Saddle',
  'Field Glasses',
  'Travel Cloak',
  'Calling Cards',
  "Men's Gloves (Leather)",
  'Map Case',
  'Notebook',
  'Pen and Ink Set',
];

const countryGentlewomanItems = [
  'Riding Habit',
  'Riding Hat',
  'Gloves, Riding',
  'Horse and Saddle',
  'Field Glasses',
  'Fan',
  'Parasol',
  'Shawl',
  'Reticule',
  'Calling Cards',
  'Sewing Kit',
  'Hairpins',
  'Map Case',
  'Notebook',
];

const householdKitItems = [
  'Notebook',
  'Pen and Ink Set',
  'First Aid Kit',
  'Lantern',
  'Rope (50 feet)',
  'Compass',
  'Calling Cards',
  'Travel Cloak',
  'Field Glasses',
  'Writing Desk Set',
  'Matches',
];

const coachmanKitItems = [
  'Horse and Saddle',
  'Carriage Lanterns & Tack',
  'Rope (50 feet)',
  'Lantern',
  'Compass',
  'Map Case',
  'Pocket Watch',
  'Riding Crop',
  'Whip',
  'First Aid Kit',
  'Notebook',
  'Pen and Ink Set',
];

const scholarClergyKitItems = [
  'Book (Minerva Press)',
  'Encyclopedia (One Volume)',
  'Writing Desk Set',
  'Notebook',
  'Pen and Ink Set',
  'Compass',
  'Field Glasses',
  'First Aid Kit',
  'Travel Cloak',
  'Calling Cards',
  'Tea Service',
];

export const EQUIPMENT_KITS: EquipmentKit[] = [
  {
    name: 'GENTLEMAN OF THE TON KIT',
    description: 'A polished high-society gentleman kit with formal wear, calling cards, and travel necessities for drawing-room and ballroom life.',
    items: tonGentlemanItems,
  },
  {
    name: 'GENTLEWOMAN OF THE TON KIT',
    description: 'A polished high-society lady kit with visiting wear, fan, reticule, and the small essentials of Regency feminine fashion.',
    items: tonGentlewomanItems,
  },
  {
    name: 'COUNTRY GENTLEMAN KIT',
    description: 'A landed gentleman kit for riding, estate travel, and rural visits, balancing dignity with practical mobility.',
    items: countryGentlemanItems,
  },
  {
    name: 'COUNTRY GENTLEWOMAN KIT',
    description: 'A landed lady kit for riding, visits, and country-house life, with the accessories expected of a respectable household.',
    items: countryGentlewomanItems,
  },
  {
    name: 'ESTATE HOUSEHOLD KIT',
    description: 'A practical kit for stewards, valets, housekeepers, footmen, and trusted household staff who need to keep the house running.',
    items: householdKitItems,
  },
  {
    name: 'COACHMAN / GROOM KIT',
    description: 'A horse-handling and carriage kit for coachmen, grooms, and drivers who live around horses and road travel.',
    items: coachmanKitItems,
  },
  {
    name: 'SCHOLAR / CLERGY KIT',
    description: 'A respectful kit for scholars, clergymen, and cultivated investigators whose work depends on books, notes, and conversation.',
    items: scholarClergyKitItems,
  },
];
