// AUTO-GENERATED from in-repo spec to avoid JSON/MD at runtime
export type PriceItem = {
  section: string;
  name: string;
  description?: string;
  priceText?: string;
  priceCents?: number | null;
  source?: string;
  url?: string;
  sourceType?: 'core' | 'homebrew' | 'ai';
  sourceName?: string | null;
  sourcePage?: number | string | null;
};

const S_CORE = 'Down Darker Trails';

export const PRICES_OFFICIAL: PriceItem[] = [
  // Clothing
  { section: 'Clothing', name: 'Belt', priceText: '75¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Boots', priceText: '$3.00 to $20.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Boots, custom-made "cowboy"', priceText: '$15.00 to $25.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Buffalo robe', priceText: '$10.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Cartridge belt', priceText: '$1.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Cloth overcoat', priceText: '$8.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Cloth vest', priceText: '$1.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Dress', priceText: '$2.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Fur overcoat', priceText: '$15.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Hat', priceText: '$2.00 to $15.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Leather vest', priceText: '$3.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Linen duster', priceText: '$2.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Shirt', priceText: '50¢ to $2.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Stetson hat, "boss"', priceText: '$5.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Suit', priceText: '$12.50 to $25.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Suspenders', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Spurs', priceText: '15¢ to $10.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Shoes', priceText: '$2.50+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Clothing', name: 'Trousers', priceText: '$1.50+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Communication
  { section: 'Communication', name: 'Letter (½ oz.)', priceText: '3¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Communication', name: 'Newspaper', priceText: '1¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Communication', name: 'Package, mail', priceText: '1¢ per oz.', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Communication', name: 'Package, rail', priceText: '8¢ per lb.', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Communication', name: 'Telegram', priceText: '5¢ per word', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Entertainment
  { section: 'Entertainment', name: 'Banjo', priceText: '$7.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Beer, glass', priceText: '5¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Beer, keg', priceText: '$2.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Book, hardback', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'British ale, cask', priceText: '$20.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Cigar', priceText: '1¢+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Cigarette papers (100)', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Dice (pair)', priceText: '10¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Dice (loaded pair)', priceText: '$5.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Guitar', priceText: '$5.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Harmonica', priceText: '25¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Newspaper subscription, per year', priceText: '$3.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Paperback novel', priceText: '10¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Playing cards', priceText: '25¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Playing cards, marked deck', priceText: '$1.25', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Tobacco, tin, plug, or twist', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Violin/fiddle', priceText: '$9.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Whiskey, shot', priceText: '10¢+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Entertainment', name: 'Whiskey, bottle', priceText: '$2.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Lodging and Dining
  { section: 'Lodging and Dining', name: 'Bath', priceText: '25¢ to $5.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging and Dining', name: 'Bath, clean water', priceText: '$2.00 to $5.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging and Dining', name: 'Bunk, floor, or flophouse, per night', priceText: '25¢ to $1.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging and Dining', name: 'Hotel, per night', priceText: '$1.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging and Dining', name: 'Hotel meals, best quality', priceText: '$2.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging and Dining', name: 'Meal, poor to average quality', priceText: '$3.50', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging and Dining', name: 'Room, per week', priceText: '25¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging and Dining', name: 'Room & board, per week', priceText: '25¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging and Dining', name: 'Shave & haircut', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging and Dining', name: 'Stable fees, per night', priceText: '$1.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Medical Equipment
  { section: 'Medical Equipment', name: "Doctor's bag w/instruments", priceText: '$25.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Medical Equipment', name: 'Laudanum (4 oz.)', priceText: '35¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Outdoor and Travel Gear
  { section: 'Outdoor and Travel Gear', name: 'Bacon (10 lbs.)', priceText: '60¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Bedroll', priceText: '$4.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Binoculars', priceText: '$10.00 to $25.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Blanket', priceText: '$3.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Box of matches', priceText: '10¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Canteen', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Coffee (2 lbs.)', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Coffee pot', priceText: '$1.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Compass', priceText: '$2.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Flour (50 lb. sack)', priceText: '$4.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: "Gentleman's toilet set", priceText: '$1.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Kettle, brass (4 gallon)', priceText: '$3.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Oil lamp', priceText: '$1.50', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Parasol, silk', priceText: '$1.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Sugar, (1 lb.)', priceText: '10¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Tent, 1-man', priceText: '$5.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Tent, 3-man', priceText: '$9.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Trail rations, 1 week', priceText: '$1.50', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Trap, wolf', priceText: '$2.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Trap, bear', priceText: '$10.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Trunk, traveling (small-medium)', priceText: '$4.00 to $10.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor and Travel Gear', name: 'Trunk, traveling (large)', priceText: '$10.00 to $25.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Tools
  { section: 'Tools', name: 'Axe', priceText: '$1.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: "Blacksmith's tools", priceText: '$15.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Blasting caps, dozen', priceText: '$1.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Dynamite, stick', priceText: '25¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Electronic detonator', priceText: '$5.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Fuse, per yard', priceText: '5¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Hammer', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Hatchet', priceText: '75¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Kerosene (1 gallon)', priceText: '$3.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Lantern', priceText: '80¢+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Nitroglycerine (1 oz.)', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Pick', priceText: '75¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Pocketknife', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Rope, per yard', priceText: '5¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Spyglass', priceText: '$10.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Shovel', priceText: '50¢', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Animals & Transportation - Animals
  { section: 'Animals', name: 'Burro', priceText: '$30.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Animals', name: 'Horse, draft', priceText: '$60.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Animals', name: 'Horse, saddle', priceText: '$75.00 to $100.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Animals', name: 'Mule', priceText: '$50.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Animals', name: 'Ox', priceText: '$30.00 to $70.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Animals', name: 'Pony', priceText: '$30.00 to $60.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Animals', name: 'Cattle, calf', priceText: '$2.00 to $4.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Animals', name: 'Cattle, steer', priceText: '$7.00 to $12.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Animals', name: 'Sheep', priceText: '$5.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Animals & Transportation - Vehicles & Equipment
  { section: 'Vehicles & Equipment', name: 'Saddlebags', priceText: '$3.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Vehicles & Equipment', name: 'Saddle, bridle, and blanket', priceText: '$30.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Vehicles & Equipment', name: 'Buggy, 2-person', priceText: '$50.00 to $175.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Vehicles & Equipment', name: 'Surrey, 4-person', priceText: '$10.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Vehicles & Equipment', name: 'Single harness', priceText: '$25.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Vehicles & Equipment', name: 'Double harness', priceText: '$40.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Vehicles & Equipment', name: 'Heavy wagon, 4,000 lbs.', priceText: '$35.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Vehicles & Equipment', name: 'Light wagon, 1,500 lbs.', priceText: 'Varies', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Vehicles & Equipment', name: 'Stagecoach (6 horses, not included)', priceText: '$1,200.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Travel Fares
  { section: 'Travel Fares', name: 'Stagecoach, local travel', priceText: '15¢ per mile', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Travel Fares', name: 'Stagecoach, travel', priceText: '$3.00 per 50 miles', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Travel Fares', name: 'Stagecoach, St. Louis to San Francisco', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Travel Fares', name: 'Train fare, Omaha to Sacramento', priceText: '$75.00 to $100.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Travel Fares', name: 'Ship fare, New York to San Francisco', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Miscellaneous
  { section: 'Miscellaneous', name: 'Eyeglasses', priceText: '$2.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Gold (1 oz.), Black Hills price', priceText: '$20.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Gold (1 oz.), New York price', priceText: '$17.50', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Gold bar', priceText: '$3,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Gun holster', priceText: '$1.00 to $5.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Land patent from US Government', priceText: '$1,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Lockable cashbox', priceText: '$1.35', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Pocket watch & chain', priceText: '$1.00 to $10.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Safe', priceText: '$13.00 to $85.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Small printing press', priceText: '$45.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Typewriter', priceText: '$34.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Underground mine (small), sale price', priceText: '$4,000.00 to $25,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Underground mine (major), sale price', priceText: '$100,000.00 to $400,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Miscellaneous', name: 'Cattle, at stockyard', priceText: '$30.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
];

