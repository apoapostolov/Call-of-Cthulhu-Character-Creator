import type { EquipmentKit } from '../../types';

// Western 1870s multi-occupation kits. Item names must match ITEMS (prices + weapons).
export const EQUIPMENT_KITS: EquipmentKit[] = [
	{
		name: "LAWMAN'S POSSE KIT",
		description: 'Complete law enforcement equipment for frontier justice, including arrest capability and trail survival.',
		items: [
			'Sheriff Badge (or Marshal/Ranger)',
			'Stetson hat, "boss"',
			'Linen duster',
			'Boots',
			'Gun holster',
			'Cartridge belt',
			'.45 Colt Peacemaker',
			'12‑gauge Shotgun heavy shot (or slug)',
			'Handcuffs',
			'Rope (50 feet/lasso)',
			'Lantern',
			'Box of matches',
			'Canteen',
			'Compass',
			'Pocket watch & chain',
			'Spare ammunition (box)'
		]
	},
	{
		name: 'OUTLAW / GUNFIGHTER KIT',
		description: 'Gunslinger’s essentials: quick-draw iron, a trusty long gun, and vice for the road.',
		items: [
			'Gun holster',
			'Cartridge belt',
			'.44 Colt Army',
			".44–40 Winchester ’73 Rifle (or Carbine)",
			'Pocketknife',
			'Lantern',
			'Box of matches',
			'Whiskey, bottle',
			'Playing cards, marked deck',
			'Cigar'
		]
	},
	{
		name: 'RANCHER / COWHAND KIT',
		description: 'Complete ranch work equipment for wrangling livestock and surviving the range.',
		items: [
			'Stetson hat, "boss"',
			'Boots',
			'Spurs',
			'Saddlebags',
			'Bedroll',
			'Canteen',
			'Mess kit',
			'Rope, per yard',
			'Lasso',
			'Bowie Knife',
			'.36 Colt Navy',
			".44–40 Winchester Carbine",
			'Branding iron',
			'Saddle repair kit',
			'Spare horseshoes (set)'
		]
	},
	{
		name: "DOCTOR / UNDERTAKER'S BAG",
		description: 'Comprehensive frontier medical equipment for surgery, treatment, and house calls.',
		items: [
			"Doctor's bag w/instruments",
			'Bandages (multiple rolls)',
			'Splint (wooden)',
			'Scissors (medical)',
			'Forceps',
			'Scalpel',
			'Needle and thread (surgical)',
			'Laudanum (4 oz.)',
			'Whiskey (medicinal, bottle)',
			'Eyeglasses',
			'Oil lamp',
			'Box of matches',
			'Pocket watch & chain',
			'Trunk, traveling (small-medium)',
			'.31 Colt Pocket'
		]
	},
	{
		name: 'PROSPECTOR / MINER KIT',
		description: 'Complete mining and prospecting equipment for striking gold and surviving the wilderness.',
		items: [
			'Pick',
			'Shovel',
			'Gold pan',
			'Assay kit',
			'Lantern',
			'Box of matches',
			'Bedroll',
			'Tent, 1-man',
			'Canteen',
			'Trail rations, 1 week',
			'Coffee (2 lbs.)',
			'Coffee pot',
			'Spyglass',
			'Saddlebags',
			'Mule',
			'Pocketknife',
			'Bowie Knife'
		]
	},
	{
		name: 'PREACHER / SCHOOLTEACHER KIT',
		description: 'Educational and ministerial equipment for frontier teaching and preaching circuits.',
		items: [
			'Bible (or religious text)',
			'Book, hardback',
			'Paperback novel',
			'Slate and chalk',
			'Circuit map',
			'Eyeglasses',
			'Typewriter',
			'Oil lamp',
			'Box of matches',
			'Suit',
			'Pocket watch & chain',
			'Parasol, silk',
			'Canteen',
			'Saddlebags',
			'Bowie Knife'
		]
	},
	{
		name: 'JOURNALIST / AUTHOR KIT',
		description: 'Field reporting equipment for frontier journalism and documentation.',
		items: [
			'Typewriter',
			'Extra notebooks (3)',
			'Newspaper subscription, per year',
			'Eyeglasses',
			'Pocket watch & chain',
			'Spare pencils (box)',
			'Ink bottles (2)',
			'Oil lamp',
			'Lantern',
			'Box of matches',
			'Binoculars',
			'Bedroll',
			'Canteen',
			'Saddlebags',
			'Rope (50 feet)',
			'.32 Smith & Wesson Model 2'
		]
	},
	{
		name: 'GAMBLER / CONFIDENCE TRICKSTER KIT',
		description: 'Con artist equipment including disguises, gaming tools, and quick escape capability.',
		items: [
			'Playing cards',
			'Playing cards, marked deck',
			'Spare deck of cards',
			'Dice (pair)',
			'Disguise kit (mustache, spectacles, etc.)',
			'False documents',
			'Cigar',
			'Whiskey, bottle',
			'Pocket watch & chain',
			'Suit',
			'Lockable cashbox',
			'Tobacco, tin, plug, or twist',
			'Saddlebags',
			'Rope (50 feet)',
			'.44 Derringer'
		]
	}
];