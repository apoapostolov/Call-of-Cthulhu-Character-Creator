import type { DGItem } from './types';

export interface EquipmentKit {
    name: string;
    items: string[]; // Array of item names
}

// FIX: Define base kits first to prevent self-referencing errors.
const BASE_KITS: EquipmentKit[] = [
    {
        name: 'FEDERAL AGENT',
        items: [
            'Agency Badge and Identification Card',
            'Medium Pistol',
            'Tactical Light or Weapon Light',
            'Handcuffs',
            'Kevlar Vest',
            'Windbreaker Jacket (Agency Printed)',
            'Tablet Computer or Smartphone', // Representing encrypted smartphone
            'Earpiece Communicator Set',
            'Small Evidence-Collection Kit',
            'Light Pistol', // Backup
            // Carried in vehicle, but can be taken
            'Light Rifle or Carbine',
            'Holographic Sight',
            'Shotgun (firing shot)',
            'Tactical Body Armor',
            'Kevlar Helmet',
            'Encrypted Laptop',
            'Individual First Aid Kit',
            'Small Fire Extinguisher (CO2)',
        ]
    },
    {
        name: 'SWAT TEAM',
        items: [
            'Agency Badge and Identification Card',
            'Light Rifle or Carbine', // Assault rifle/carbine
            'Targeting Laser',
            'Tactical Light or Weapon Light',
            'Shotgun (firing shot)', // semi-auto shotgun
            'Medium Pistol',
            'Large Knife or Combat Dagger', // Tactical knife
            'Flash-Bang Grenade (thrown)',
            'Tear Gas Grenade (thrown)',
            'CED Pistol',
            'Pepper Spray Can',
            'Battering Ram',
            'Halligan Forcible-Entry Tool',
            'Ballistic Shield',
            'Earpiece Communicator Set',
            'Flexible Cuffs',
            'Tactical Body Armor',
            'Vest with Agency Identification',
            'Knee and Elbow Pads',
            'Gloves',
            'Kevlar Helmet',
            'Fire-Retardant Balaclava',
            'Tinted Goggles',
            'Assault Webbing',
            'Hydration System (e.g., Camelbak)',
            'Ordinary Binoculars',
            'Large Flashlight',
            'Rappelling Harnesses and Equipment',
        ]
    },
    {
        name: 'SPECIAL OPERATOR',
        items: [
            'Dog Tags',
            'Light Rifle or Carbine', // Assault carbine
            'Holographic Sight',
            'Targeting Laser',
            'Sound Suppressor',
            'Medium Pistol',
            'Hand Grenade',
            'Smoke Grenade',
            'Flash-Bang Grenade (thrown)',
            'Large Knife or Combat Dagger',
            'Flexible Cuffs',
            'Tactical Body Armor',
            'Kevlar Helmet',
            'Tactical Light or Weapon Light',
            'Tinted Goggles',
            'Military-Grade Night Vision Goggles',
            'Earpiece Communicator Set',
            'Multi-Tool',
            'Compass',
            'Individual First Aid Kit',
            'Handheld GPS',
        ]
    },
    {
        name: 'POLICE OFFICER',
        items: [
            'Agency Badge and Identification Card',
            'Reinforced Kevlar Vest',
            'Duty Belt',
            'Medium Pistol',
            'Pepper Spray Can',
            'CED Pistol',
            'Club / Nightstick / Baton / Collapsible Baton',
            'Knife', // Folding knife
            'Handcuffs',
            'Large Flashlight',
            'Short-Range Walkie Talkie or Early-Generation Mobile Phone',
            'Pen and Pocket Notebook',
            'Light Pistol', // backup
            'Gloves',
            'Multi-Tool',
            'Hemostatic Gel',
            'Self-Applying Tourniquet',
        ]
    },
    {
        name: 'BODYGUARD',
        items: [
            'Medium Pistol',
            'Sound Suppressor',
            'Reinforced Kevlar Vest',
            'Earpiece Communicator Set',
            'Discreet Civilian Clothing',
            'Car or SUV (rented for a week)',
            'Individual First Aid Kit',
            'Large Flashlight',
        ]
    },
    {
        name: "INVESTIGATOR'S KIT",
        items: [
            'Small Evidence-Collection Kit',
            'Voice-Activated Recorder',
            'DSLR Camera',
            'Encrypted Laptop',
            'Tablet Computer or Smartphone',
            'Lockpick Kit',
            'Directional Microphone & Acoustic Software',
            'GPS Tracking Device',
            'Fiber Optic Scope',
            'Bug Detector',
            'Forged Passport or Identification Documents',
            'Large Flashlight',
            'Multi-Tool',
            'Pen and Pocket Notebook',
            'Gloves',
            'Individual First Aid Kit',
            'Burner Phone',
            'Ordinary Binoculars',
            'A Night or Two at a Cheap Motel',
            'Car or SUV (rented for a week)',
            'Light Pistol',
            'Pepper Spray Can',
        ]
    },
    {
        name: "SCIENTIST / MEDICAL KIT",
        items: [
            'First Responder Medical Kit',
            'HAZMAT Suit',
            'Gas Mask',
            'Personal Protective Equipment (PPE)',
            'Small Evidence-Collection Kit',
            'Encrypted Laptop',
            'Tablet Computer or Smartphone',
            'Hemostatic Gel',
            'Self-Applying Tourniquet',
            'Polypropylene Barrel Filled with Acid',
            'Geiger Counter',
            'Water and Soil Sampler',
            'Large Flashlight',
            'Multi-Tool',
            'Pen and Pocket Notebook',
            'Gloves',
            'Burner Phone',
            'Handheld GPS',
            'Lab Coat',
            'Tinted Goggles',
            'Decontamination Kit',
            'Scalpel Set',
            'Syringes',
        ]
    },
    {
        name: "INTELLIGENCE / COVERT OPS KIT",
        items: [
            'Encrypted Laptop',
            'Tablet Computer or Smartphone',
            'Burner Phone',
            'Earpiece Communicator Set',
            'Covert Comm Device',
            'GPS Tracking Device',
            'Bug Detector',
            'Forged Passport or Identification Documents',
            'Lockpick Kit',
            'Light Pistol',
            'Sound Suppressor',
            'Garrote',
            'Large Flashlight',
            'Pen and Pocket Notebook',
            'Multi-Tool',
            'Discreet Civilian Clothing',
            'Untraceable Funds',
            'Individual First Aid Kit',
            'Flexible Cuffs',
            'Covert Surveillance Kit',
            'Escape and Evasion Kit',
            'Kevlar Vest',
        ]
    },
    {
        name: "SOLDIER'S KIT",
        items: [
            'Light Rifle or Carbine',
            'Medium Pistol',
            'Large Knife or Combat Dagger',
            'Spear or Fixed Bayonet',
            'Hand Grenade',
            'Smoke Grenade',
            'Tactical Body Armor',
            'Kevlar Helmet',
            'Assault Webbing',
            'Military-Grade Night Vision Goggles',
            'Earpiece Communicator Set',
            'MREs (Meals, Ready-to-Eat)',
            'Dog Tags',
            'Combat Uniform',
            'Steel-Toe Boots',
            'Rucksack',
            'Hydration System (e.g., Camelbak)',
            'Individual First Aid Kit',
            'Self-Applying Tourniquet',
            'Multi-Tool',
            'Compass',
            'Entrenching Tool',
            'Poncho and Liner',
        ]
    },
    {
        name: "FIRST RESPONDER KIT",
        items: [
            'Halligan Forcible-Entry Tool',
            'Wood Axe',
            'Heavy-Duty Fire Extinguisher',
            'First Responder Medical Kit',
            'Rappelling Harnesses and Equipment',
            'Gas Mask',
            'HAZMAT Suit',
            'Short-Range Walkie Talkie or Early-Generation Mobile Phone',
            'Battering Ram',
            'Personal Protective Equipment (PPE)',
            'Large Flashlight',
            'Multi-Tool',
            'Gloves',
            'Individual First Aid Kit',
            'Hemostatic Gel',
            'Self-Applying Tourniquet',
            'Reinforced Kevlar Vest',
            'Compass',
            'Handheld GPS',
            'Steel-Toe Boots',
        ]
    },
    {
        name: "CRIMINAL'S KIT",
        items: [
            'Light Pistol',
            'Knife',
            'Baseball Bat or Rifle Butt',
            'Lockpick Kit',
            'Multi-Tool',
            'Flexible Cuffs',
            'Burner Phone',
            'Large Flashlight',
            'Gloves',
            'Discreet Civilian Clothing',
        ]
    },
    {
        name: "CORPORATE KIT",
        items: [
            'Encrypted Laptop',
            'Tablet Computer or Smartphone',
            'Burner Phone',
            'Pen and Pocket Notebook',
            'Forged Passport or Identification Documents',
            'Discreet Civilian Clothing',
            'Untraceable Funds',
            'Small Fire Extinguisher (CO2)',
            'A Week at a Fine Hotel',
            'Car or SUV (rented for a week)',
        ]
    },
    {
        name: "EOD KIT",
        items: [
            'Medium Pistol',
            'Light Rifle or Carbine',
            'Tactical Body Armor',
            'Kevlar Helmet',
            'Individual First Aid Kit',
            'Multi-Tool',
            'Fiber Optic Scope',
            'Rappelling Harnesses and Equipment',
            'SCUBA Gear',
            'Decontamination Kit',
            'Large Flashlight',
            'Gloves'
        ]
    },
];

// FIX: Define specialized kits that reference the base kits.
const SPECIALIZED_KITS: EquipmentKit[] = [
    {
        name: 'CIA SAD/SOG OPERATOR',
        items: [
            ...(BASE_KITS.find(k => k.name === 'SPECIAL OPERATOR')?.items ?? []),
            'Access to Classified Reporting'
        ]
    },
    {
        name: 'CIA SAD/PAG OFFICER',
        items: [
            ...(BASE_KITS.find(k => k.name === 'INTELLIGENCE / COVERT OPS KIT')?.items ?? []),
            'Access to Classified Reporting'
        ]
    },
    {
        name: 'EPA CID SPECIAL AGENT',
        items: [
            ...(BASE_KITS.find(k => k.name === 'FEDERAL AGENT')?.items ?? []),
            'Crowbar',
            'Hammer and Wrench',
            'Rebreather',
            'HAZMAT Suit, Level B',
            'Environmental Monitoring Kit',
            'Sewer Camera',
            'Photoionization Detector (PID)'
        ]
    }
];

// FIX: Combine base and specialized kits for the final export.
export const EQUIPMENT_KITS: EquipmentKit[] = [
    ...BASE_KITS,
    ...SPECIALIZED_KITS
];