import type { EquipmentKit } from '../../types';

// Dark Ages (1000s) equipment kits covering multiple occupations.
// Most commoners carried basic self-defense weapons; armor was rare and expensive.
// Warriors had both personal and professional weapons; finest arms were status symbols.
// Item names must match the aggregated ITEMS list (prices + weapons).

export const EQUIPMENT_KITS: EquipmentKit[] = [
	{
		name: 'WARRIOR KIT',
		description: 'Professional warrior gear—chainmail, sword, shield, horse, and battle provisions.',
		items: [
			'Chainmail',
			'Helm',
			'Kite',
			'Sword, Long',
			'Spear, Short',
			'Knife, Large',
			'Fine scabbard',
			'Horse, War Steed',
			'Boots, leather',
			'Cloak, long (superior)',
			'Water skin',
			'Rope, fiber (30 ft.)',
			'Whetstone',
			'Blanket, woolen'
		]
	},
	{
		name: 'MERCENARY / SERGEANT KIT',
		description: 'Battle-hardened field gear—boiled leather, great axe, long spear, and campaign supplies.',
		items: [
			'Leather, Boiled',
			'Axe, Great',
			'Spear, Long',
			'Round, Wooden',
			'Knife, Large',
			'Rope, fiber (30 ft.)',
			'Traveler\'s pack',
			'Water skin',
			'Light (resin torch, oil, or candle)',
			'Flintstone and iron',
			'Blanket, woolen',
			'Sickle, hand axe, pick axe, spade'
		]
	},
	{
		name: 'GUARD / HOUSEHOLD OFFICER KIT',
		description: 'City watch and household defense—heavy quilted leather, buckler, mace, and patrol provisions.',
		items: [
			'Leather, Heavy Quilted',
			'Buckler',
			'Mace',
			'Spear, Short',
			'Knife, Small',
			'Boots, leather',
			'Cloak, hooded',
			'Light (resin torch, oil, or candle)',
			'Flintstone and iron',
			'Water skin',
			'Horn, drinking',
			'Rope, creeper (30 ft.)'
		]
	},
	{
		name: 'SCHOLAR / CLERIC KIT',
		description: 'Learning and administration—scriptorium tools, hooded robes, oak boards, and clerical travel gear.',
		items: [
			'Boards (2 oak or beech)',
			'Parchment (4 sheets)',
			'Ink, iron gall (1 oz.)',
			'Pen',
			'Robe, hooded',
			'Cloak, hooded',
			'Boots, leather',
			'Staff',
			'Knife, Small',
			'Light (resin torch, oil, or candle)',
			'Flintstone and iron',
			'Water skin',
			'Sack'
		]
	},
	{
		name: 'MONK / PILGRIM KIT',
		description: 'Simple travel gear for holy journeys—humble robes, walking staff, minimal provisions, and charity faith.',
		items: [
			'Robe, hooded',
			'Blanket, felt',
			'Staff',
			'Sack',
			'Water skin',
			'Light (resin torch, oil, or candle)',
			'Flintstone and iron',
			'Shoes, leather',
			'Boards (2 oak or beech)',
			'Pen',
			'Chalk (1 oz.)',
			'Knife, Small'
		]
	},
	{
		name: 'MERCHANT / TRADER KIT',
		description: 'Commerce essentials—tally sticks for accounting, two-wheeled cart, mule, and self-defense for trade routes.',
		items: [
			'Tally sticks (used for accounting)',
			'Two-wheeled cart',
			'Mule',
			'Rope, fiber (30 ft.)',
			'Sack',
			'Traveler\'s pack',
			'Cloak, short (superior)',
			'Boots, leather',
			'Knife, Large',
			'Club',
			'Light (resin torch, oil, or candle)',
			'Flintstone and iron',
			'Water skin'
		]
	},
	{
		name: 'HEALER / WOODSMAN KIT',
		description: 'Forest craft and healing—leech kit, mortar and pestle, herb gathering tools, and wilderness survival gear.',
		items: [
			'Leech\'s kit',
			'Mortar and pestle',
			'Knife, Large',
			'Knife, Small',
			'Sickle, hand axe, pick axe, spade',
			'Rope, fiber (30 ft.)',
			'Sack',
			'Water skin',
			'Light (resin torch, oil, or candle)',
			'Flintstone and iron',
			'Blanket, woolen',
			'Cloak, hooded',
			'Shoes, leather'
		]
	},
	{
		name: 'FARMER / CRAFTSPERSON KIT',
		description: 'Work tools and modest living—trade implements, ox for plowing, and daily necessities for peasant life.',
		items: [
			'Set of tools',
			'Ox',
			'Sickle, hand axe, pick axe, spade',
			'Rope, fiber (30 ft.)',
			'Bucket, wooden',
			'Sack',
			'Tunic, short woolen',
			'Leggings',
			'Shoes, leather',
			'Knife, Small',
			'Club',
			'Blanket, felt',
			'Water skin',
			'Pot, crockery',
			'Mug, wooden'
		]
	}
];