import type { EquipmentKit } from '../../types';
import { EQUIPMENT_KITS as CLASSIC_1920S_KITS } from '../classic-1920s/equipment-kits';

// Pulp 1930s reuses the 8 Classic 1920s kits and adds 8 more tailored to common 1930s roles.
// Item names must match the aggregated ITEMS list for the era (1920s items with 1936 inflation).

const NEW_PULP_1930S_KITS: EquipmentKit[] = [
	{
		name: 'G‑MAN RAID KIT',
		description: 'Complete federal law enforcement equipment for raids and investigations, including backup weapon and evidence collection capability.',
		items: [
			'Federal Badge',
			'Handcuffs',
			'Police Whistle',
			'Field Message Notebook',
			'Notepad (spare)',
			'Evidence Bags',
			'Photography Camera',
			'Portable Typewriter',
			'Compass',
			'Binoculars',
			'Lantern',
			'Flashlight (handheld)',
			'Rope (50 feet)',
			'First Aid Kit',
			'Map Case',
			'Canteen',
			'Folding Pocket Knife',
			'.38 or 9mm Revolver',
			'.45 Automatic (backup)'
		]
	},
	{
		name: "MOBSTER'S GO‑BAG",
		description: 'Comprehensive underworld equipment including intimidation tools, crime implements, and getaway essentials.',
		items: [
			'Brass Knuckles',
			'Blackjack',
			'2-Blade Pocket Knife',
			'Utility Knife',
			'Lockpick Set',
			'Disguise Kit (basic)',
			'Leather Gloves',
			'Dark Clothing',
			'Rope (50 feet)',
			'Canvas Backpack',
			'Binoculars',
			'Compass',
			'Lantern',
			'Canteen',
			'Cash Bundle (untraceable)',
			'Playing Cards (marked)',
			'.32 or 7.65mm Revolver',
			'.45 Tommy Gun'
		]
	},
	{
		name: "BURGLAR'S NIGHT KIT",
		description: 'Professional second-story job equipment with fine tools, climbing gear, and concealable weapons.',
		items: [
			'Jewelers 48 Piece Tool Set',
			"Watchmaker's Tool Kit",
			'Tool Outfit (20 tools)',
			'Lockpick Set',
			'Glass Cutter',
			'Crowbar',
			'Light Chain (per foot)',
			'Rope (100 feet)',
			'Grappling Hook',
			'Dark Clothing',
			'Leather Gloves',
			'Lantern (dark)',
			'Flashlight (small)',
			'Canvas Backpack',
			'Binoculars',
			'Folding Pocket Knife',
			'.22 Short Automatic'
		]
	},
	{
		name: 'GET‑AWAY DRIVER KIT',
		description: 'Complete automotive escape equipment including repair tools, navigation, and vehicle modification capability.',
		items: [
			'Tool Outfit (20 tools)',
			'Hand Drill (plus 8 bits)',
			'Rotary Tool Grinder',
			'Tire Iron',
			'Bolt Cutters',
			'Wire Cutters',
			'Padlock',
			'Rope (50 feet)',
			'Light Chain (per foot)',
			'Jerry Can (fuel)',
			'Road Atlas',
			'Spare License Plates',
			'Lantern',
			'Compass',
			'Map Case',
			'Field Message Notebook',
			'Folding Pocket Knife',
			'.32 or 7.65mm Automatic'
		]
	},
	{
		name: 'SAFARI HUNTER KIT',
		description: 'Complete safari expedition gear for dangerous game hunting and extended wilderness survival.',
		items: [
			'Canvas Rucksack',
			'Canvas Tent',
			'Canvas Bedroll',
			'Sleeping Mat',
			'Camping Stove',
			'Camp Lantern',
			'Camp Axe',
			'Machete',
			'Hunting Knife',
			'Compass',
			'Binoculars',
			'Map Case',
			'Canteen',
			'Water Purification Tablets',
			'Mess Kit',
			'Folding Shovel',
			'First Aid Kit',
			'Snake Bite Kit',
			'Bowie Knife',
			'.30-06 Bolt-Action Rifle'
		]
	},
	{
		name: 'SEAFARER\'S DUFFEL',
		description: 'Complete maritime equipment for deck work, navigation, and sea survival with weatherproof protection.',
		items: [
			'Canvas Duffel Bag',
			'Oilskin Coat',
			'Waterproof Bag',
			'Rope (100 feet, hemp)',
			'Grappling Hook',
			'Marlinspike',
			'Fishing Line and Hooks',
			'Maritime Charts',
			'Lantern (storm)',
			'Light Chain (per foot)',
			'Compass',
			'Binoculars',
			'Canteen',
			'Mess Kit',
			'Folding Pocket Knife',
			'Bowie Knife',
			'.38 or 9mm Revolver'
		]
	},
	{
		name: 'PRESS PHOTOGRAPHER KIT',
		description: 'Professional photojournalism equipment with documentation tools, spare supplies, and field mobility.',
		items: [
			'Photography Camera',
			'Spare Film (10 rolls)',
			'Flashbulbs (box)',
			'Press Pass',
			'Portable Typewriter',
			'Leather Bound Journal',
			'Notepad (multiple)',
			'Fountain Pen',
			'Reference Guide (press)',
			'Lantern',
			'Flashlight (handheld)',
			'Canvas Backpack',
			'Map Case',
			'First Aid Kit',
			'Folding Pocket Knife',
			'.25 Derringer (1B)'
		]
	},
	{
		name: 'OCCULT INVESTIGATOR KIT',
		description: 'Specialized equipment for supernatural investigations including protective symbols, research tools, and defensive items.',
		items: [
			'Leather Bound Journal',
			'Fountain Pen',
			'Occult Reference Book',
			'Magnifying Glass',
			'Religious Symbols (cross, pentagram, etc.)',
			'Holy Water (vial)',
			'Salt (bag, 5 lbs)',
			'Iron Nails (box)',
			'Chalk (white and red)',
			'Lantern',
			'Compass',
			'Binoculars',
			'Map Case',
			'Canteen',
			'Mess Kit',
			'Rope (50 feet)',
			'First Aid Kit',
			'Folding Pocket Knife',
			'.25 Derringer (1B)'
		]
	}
];

export const EQUIPMENT_KITS: EquipmentKit[] = [
	...CLASSIC_1920S_KITS,
	...NEW_PULP_1930S_KITS,
];