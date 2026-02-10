import type { EquipmentKit } from '../../types';

// Gaslight Era (1890s) equipment kits covering multiple occupations.
// Reflects Victorian technology, class distinctions, and imperial era weapons.
// Item names must match the aggregated ITEMS list (prices + weapons).

export const EQUIPMENT_KITS: EquipmentKit[] = [
	{
		name: 'CONSULTING DETECTIVE KIT',
		description: 'Scientific investigation tools for deductive reasoning and evidence analysis in the Holmesian tradition.',
		items: [
			'Magnifying Glass',
			'Chemistry Set, Portable',
			'Reference Books',
			'Notebook, Leather-bound',
			'Pen and Ink Set',
			'Lantern, Bull\'s Eye',
			'Matches',
			'Disguise Kit',
			'Measuring Tape',
			'Tweezers',
			'Evidence Bags',
			'Spare Evidence Bags',
			'Rope (50 feet)',
			'Pocket Watch',
			'Walking Stick',
			'Derringer .22 or .32'
		]
	},
	{
		name: 'POLICE CONSTABLE KIT',
		description: 'Victorian police equipment for beat patrol and criminal investigation.',
		items: [
			'Club, Small (truncheon)',
			'Backup Truncheon',
			'Police Whistle',
			'Handcuffs',
			'Evidence Bags',
			'Lantern, Bull\'s Eye',
			'Matches',
			'Notebook',
			'Pencil',
			'First Aid Kit',
			'Rain Cape',
			'Pocket Watch',
			'Spare Ammunition (box)',
			'Webley Revolver .455',
			'Webley Mk IV .38'
		]
	},
	{
		name: 'PHYSICIAN\'S BAG',
		description: 'Victorian medical equipment for house calls, surgery, and emergency treatment.',
		items: [
			'Medical Bag, Gladstone',
			'Stethoscope',
			'Surgical Instruments',
			'Bandages and Gauze',
			'Spare Bandages (multiple)',
			'Carbolic Acid (antiseptic)',
			'Laudanum',
			'Chloroform',
			'Thermometer',
			'Scissors, Medical',
			'Tweezers, Medical',
			'Notebook, Medical',
			'Medical Reference Book',
			'Pen and Ink Set',
			'Pocket Watch',
			'Derringer .22 or .32'
		]
	},
	{
		name: 'EXPLORER\'S EXPEDITION KIT',
		description: 'Imperial expedition gear for colonial exploration and scientific discovery.',
		items: [
			'Lee-Metford Rifle',
			'Webley Revolver .455',
			'Hunting Knife',
			'Machete',
			'Compass',
			'Sextant',
			'Telescope',
			'Binoculars',
			'Maps',
			'Notebook',
			'Specimen Cases',
			'Rope, Hemp (100 feet)',
			'Grappling Hook',
			'Tent',
			'Lantern, Storm',
			'Matches',
			'First Aid Kit',
			'Water Purification Tablets'
		]
	},
	{
		name: 'JOURNALIST\'S FIELD KIT',
		description: 'Victorian reporting equipment with photography and telegraph communication capability.',
		items: [
			'Notebook, Multiple',
			'Pen and Ink Set',
			'Pencils',
			'Camera, Box',
			'Photographic Plates',
			'Spare Plates (x5)',
			'Flash Powder',
			'Developing Chemicals (portable)',
			'Magnifying Glass',
			'Reference Books',
			'Telegraph Forms',
			'Telegraph Credit Tokens',
			'Pocket Watch',
			'Walking Stick',
			'Flashlight (oil)',
			'Lantern, Bull\'s Eye',
			'Derringer .22 or .32'
		]
	},
	{
		name: 'GENTLEMAN / LADY ADVENTURER KIT',
		description: 'Upper-class expedition equipment with finest weapons and luxury traveling accessories.',
		items: [
			'Hunting Rifle, Fine',
			'Webley Revolver .455',
			'Spare Ammunition (box)',
			'Sword Cane',
			'Binoculars, Quality',
			'Field Glasses Case',
			'Pocket Watch, Gold',
			'Compass, Brass',
			'Leather Travel Case',
			'Writing Set, Traveling',
			'Hip Flask, Silver',
			'Cigars, Fine',
			'Rope, Hemp (50 feet)',
			'Evening Dress',
			'Calling Cards',
			'Umbrella'
		]
	},
	{
		name: 'CRIMINAL\'S TOOLS',
		description: 'Victorian underworld equipment for burglary, assault, and criminal operations.',
		items: [
			'Lockpick Set',
			'Skeleton Keys',
			'Blackjack/Life Preserver',
			'Club, Small (truncheon)',
			'Brass Knuckles',
			'Crowbar',
			'Rope, Hemp (50 feet)',
			'Dark Lantern',
			'Matches',
			'Dark Clothing',
			'Gloves, Leather',
			'Bag, Canvas',
			'Whiskey Flask',
			'Chloroform (vial)',
			'Gag (cloth)',
			'Pocket Knife',
			'Derringer .22 or .32'
		]
	},
	{
		name: 'WORKING CLASS KIT',
		description: 'Basic Victorian necessities for laborers, servants, and craftspeople.',
		items: [
			'Tools, Trade-Specific (hammer, saw, wrench, nails, etc.)',
			'Lunch Pail',
			'Thermos Flask',
			'Pocket Knife',
			'Matches',
			'Handkerchief',
			'Flat Cap',
			'Work Clothes',
			'Boots, Sturdy',
			'Gloves, Work',
			'Tobacco Tin',
			'Spare Tobacco',
			'Club, Improvised',
			'Pocket Watch, Tin'
		]
	}
];