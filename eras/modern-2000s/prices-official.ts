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

const S_CORE = 'Call of Cthulhu 7th Edition Core Rulebook';

export const PRICES_OFFICIAL: PriceItem[] = [
  // Men's Clothing
  { section: "Men's Clothing", name: 'Tailored Silk Suit', priceText: '$1,000+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Wool Pinstripe Suit', priceText: '$350.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Rayon-blend 2-piece Suit', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Leather Bomber Jacket', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Trench-Coat, Leather', priceText: '$250.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Baggy Jogging Suit', priceText: '$50.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Oversized Twill Shirt', priceText: '$35.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Double-Pleated Pants', priceText: '$36.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Crew Neck Cotton Sweater', priceText: '$35.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Jeans', priceText: '$40.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Leather Docksider Shoes', priceText: '$50.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Cross-Trainer Shoes', priceText: '$100.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Silk Tie', priceText: '$35.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Thermal Underwear', priceText: '$15.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Nylon Swim Trunks', priceText: '$15.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Pocket Vest', priceText: '$60.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Good Hiking Boots', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Men's Clothing", name: 'Bulletproof Vest', priceText: '$600.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Women's Clothing
  { section: "Women's Clothing", name: 'Designer Dress, worn once', priceText: '$500.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Fine Silk Side-Drape Dress', priceText: '$400.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Acrylic 2-Piece Dress', priceText: '$150.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Woven Rayon Coat Dress', priceText: '$90.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Leather Motorcycle Jacket', priceText: '$260.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Wool-blend Swing Coat', priceText: '$190.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Dacron Pleat-front Pants', priceText: '$25.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Stonewashed Jeans', priceText: '$35.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Button Polo Sweater', priceText: '$35.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Fashion Print Challis Skirt', priceText: '$50.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Fashion Pumps', priceText: '$100.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Fashion Boots', priceText: '$160.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Good Hiking Boots', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Spandex Bicycle Shorts', priceText: '$20.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Pocket Vest', priceText: '$60.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: "Women's Clothing", name: 'Bulletproof Vest', priceText: '$600.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Electronics
  { section: 'Electronics', name: 'CB Radio w/Police Scanner', priceText: '$90.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Electronics', name: 'Three-band Walkie-Talkie', priceText: '$35.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Electronics', name: 'Radar Scanner', priceText: '$40.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Electronics', name: '35mm SLR Digital Camera', priceText: '$450.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Electronics', name: 'Pocket One-Use Camera', priceText: '$10.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Electronics', name: 'Metal Detector', priceText: '$240.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Electronics', name: 'Geiger Counter', priceText: '$70.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Electronics', name: 'Night Vision Goggles', priceText: '$600.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Computers
  { section: 'Computers', name: 'Cheap PC System', priceText: '$100.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Computers', name: 'Good PC System', priceText: '$1,500.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Computers', name: 'Laptop', priceText: '$400.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Computers', name: 'Good Laptop', priceText: '$1,300.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Computers', name: 'Tablet', priceText: '$400.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Computers', name: 'Email Monitoring Software', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Communications
  { section: 'Communications', name: 'Local Telephone Service', priceText: '$20.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Communications', name: 'Cordless Phone', priceText: '$50.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Communications', name: 'Cell Phone', priceText: '$50.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Communications', name: 'Smart Phone', priceText: '$99.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Tents and Campers
  { section: 'Tents and Campers', name: '3-Room Family Tent', priceText: '$300.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tents and Campers', name: '3 Person Geodesic Tent', priceText: '$120.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tents and Campers', name: 'Winnebago RV', priceText: '$120,000.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tents and Campers', name: 'Electrical Generator', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Tools
  { section: 'Tools', name: "Welder's Kit", priceText: '$400.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: 'Lock-Picking Tools', priceText: '$90.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: '60-gallon Air Compressor', priceText: '$600.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Tools', name: "Mechanic's Tool Chest", priceText: '$500.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Security Equipment
  { section: 'Security Equipment', name: 'Motion Detector Alarm Set', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Security Equipment', name: 'Wireless Perimeter Alarm', priceText: '$260.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Security Equipment', name: 'Telephonic Voice Changer', priceText: '$60.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Security Equipment', name: 'Pen Camcorder', priceText: '$250.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Security Equipment', name: 'Telephone Bug Detector', priceText: '$400.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Security Equipment', name: 'Bug Sweep Kit', priceText: '$900.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Security Equipment', name: 'Body Worn Spy Camera', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Security Equipment', name: 'Covert Digital Recorder', priceText: '$300.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Security Equipment', name: 'Listening Device', priceText: '$200.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Motor Vehicles
  { section: 'Motor Vehicles', name: 'BMW Motorcycle', priceText: '$23,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Motor Vehicles', name: 'Ducati Motorcycle', priceText: '$13,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Motor Vehicles', name: 'Rolls Royce Ghost Sedan', priceText: '$260,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Motor Vehicles', name: 'Aston Martin DB9', priceText: '$200,500.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Motor Vehicles', name: 'Cadillac SUV', priceText: '$62,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Motor Vehicles', name: 'BMW 1 Series', priceText: '$38,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Motor Vehicles', name: 'Corvette (Convertible)', priceText: '$54,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Motor Vehicles', name: 'Dodge SUV', priceText: '$33,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Motor Vehicles', name: 'Toyota Prius', priceText: '$27,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Motor Vehicles', name: 'Ford Focus', priceText: '$16,500.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Lodging
  { section: 'Lodging', name: 'Economy Motel', priceText: '$40.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging', name: 'Average Hotel', priceText: '$90.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging', name: 'Good Hotel', priceText: '$200.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging', name: 'Grand Hotel', priceText: '$600.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging', name: "House (Year's rent)", priceText: '$20,000.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging', name: "Apartment (Week's rent)", priceText: '$350.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Lodging', name: 'Per week (with Service)', priceText: '$500.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Medical Equipment
  { section: 'Medical Equipment', name: 'Medical Case', priceText: '$100.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Medical Equipment', name: 'Disposable Respirator', priceText: '$30.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Medical Equipment', name: 'Complete First Aid Kit', priceText: '$60.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Medical Equipment', name: 'Emergency Burn Kit', priceText: '$160.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Medical Equipment', name: 'Portable Oxygen Unit', priceText: '$70.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Outdoor & Travel Gear
  { section: 'Outdoor & Travel Gear', name: '4-Person Cook Set', priceText: '$25.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Propane Camp Stove', priceText: '$60.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Portable Chemical Toilet', priceText: '$110.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Poly/Cotton Sleeping Bag', priceText: '$30.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Polar Sleeping Bag', priceText: '$200.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: '6-watt Fluorescent Lamp', priceText: '$30.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Stabilized Binoculars', priceText: '$1,300.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: '"Survival" Knife', priceText: '$65.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Swiss Army Knife', priceText: '$30.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Machete, Cheap', priceText: '$20.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: '10.5mm Dry Rope (50m)', priceText: '$250.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'G.P.S. Handheld', priceText: '$260.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Climbing Gear (1 person)', priceText: '$2,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Touring Kayak (1 person)', priceText: '$1,000.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Scuba Gear, Good', priceText: '$2,500.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Outdoor & Travel Gear', name: 'Signal Gun', priceText: '$100.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Travel - Air Travel
  { section: 'Travel - Air Travel', name: 'Ticket Price (10 miles)', priceText: '$1.40–$9.80', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Travel - Air Travel', name: 'International (100 Miles)', priceText: '$22.00–$28.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Travel - Train Fares
  { section: 'Travel - Train Fares', name: '50 Miles', priceText: '$6.25', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Travel - Train Fares', name: '100 Miles', priceText: '$12.50', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Travel - Train Fares', name: '500 Miles', priceText: '$62.50', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Travel - Sea Voyage
  { section: 'Travel - Sea Voyage (U.S. / England)', name: 'First Class (one way)', priceText: '$3,500+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Travel - Sea Voyage (U.S. / England)', name: 'Standard Class (one way)', priceText: '$1,600+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Travel - Sea Voyage (U.S. / England)', name: 'Freight', priceText: '$1,400+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Ammunition & Weapons - Firearm Ammunition
  { section: 'Firearm Ammunition', name: '.22 Long Rifle (500)', priceText: '$21.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '.220 Swift (50)', priceText: '$24.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '.25 Automatic (50)', priceText: '$15.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '.30 Carbine (50)', priceText: '$15.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '.30-06 Rifle (50)', priceText: '$15.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '.357 Magnum (50)', priceText: '$22.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '.38 Special (50)', priceText: '$17.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '5.56mm (50)', priceText: '$24.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '9mm Parabellum (50)', priceText: '$12.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '.44 Magnum (50)', priceText: '$39.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '.45 Automatic (100)', priceText: '$23.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '10-Gauge Shell (25)', priceText: '$40.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '12-Gauge Shell (25)', priceText: '$30.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '16-Gauge Shell (25)', priceText: '$26.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Firearm Ammunition', name: '20-Gauge Shell (25)', priceText: '$28.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },

  // Ammunition & Weapons - Combat Equipment
  { section: 'Combat Equipment', name: 'Illegal Suppressor (Pistol)', priceText: '$1,000.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: 'Laser Gunsight', priceText: '$300.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: 'Optic Scope', priceText: '$200.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: 'Hand-Held Taser', priceText: '$50.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: 'Stun Baton', priceText: '$65.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: 'Pepper Spray', priceText: '$16.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: 'Aluminum Knuckles', priceText: '$20.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: 'Crossbow, Compound', priceText: '$600.00+', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: '12 Crossbow Quarrels', priceText: '$38.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: 'Blowdart Pen (with darts)', priceText: '$35.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: 'Bandolier', priceText: '$60.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
  { section: 'Combat Equipment', name: 'Nunchaku', priceText: '$25.00', sourceType: 'core', sourceName: S_CORE, sourcePage: null },
];

