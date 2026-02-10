import type { EquipmentKit } from '../../types';

// Modern (2000s) equipment kits covering multiple occupations.
// Reflects 21st century technology, digital tools, and modern weaponry.
// Modern occupations inherit from Classic 1920s, so these kits serve both eras.
// Item names must match the aggregated ITEMS list (prices + weapons).

export const EQUIPMENT_KITS: EquipmentKit[] = [
	{
		name: 'LAW ENFORCEMENT KIT',
		description: 'Complete modern police equipment including firearms, protective gear, and investigation tools.',
		items: [
			'Police Badge and ID Wallet',
			'Glock 17 9mm Auto',
			'Beretta M9',
			'Spare magazines (x3)',
			'12-gauge Shotgun (Pump)',
			'Handcuffs',
			'Flashlight, LED',
			'Radio, Walkie-Talkie',
			'First Aid Kit',
			'Bulletproof Vest',
			'Tactical Gloves',
			'Body Camera',
			'Binoculars',
			'Camera, Digital',
			'Voice Recorder',
			'Evidence Bags',
			'Laptop Computer',
			'Cellphone'
		]
	},
	{
		name: 'MILITARY / TACTICAL KIT',
		description: 'Full combat operator loadout for direct action and sustained field operations.',
		items: [
			'M16A2',
			'Beretta M9',
			'Spare magazines (x5)',
			'12-gauge Shotgun (semi-auto)',
			'Combat Knife',
			'Bulletproof Vest',
			'Tactical Helmet',
			'Night Vision Goggles',
			'Radio, Walkie-Talkie',
			'GPS Navigator',
			'Compass',
			'First Aid Kit',
			'Flashlight, LED',
			'Binoculars',
			'Backpack, Tactical',
			'Assault Webbing',
			'Hydration System (Camelbak)',
			'MREs (3 days)',
			'Entrenching Tool',
			'Poncho'
		]
	},
	{
		name: 'INVESTIGATIVE JOURNALIST KIT',
		description: 'Modern media equipment for investigative reporting and documentation.',
		items: [
			'Press Credentials',
			'Laptop Computer',
			'Camera, Digital',
			'Camera, Video',
			'Voice Recorder',
			'Cellphone',
			'GPS Navigator',
			'Binoculars',
			'Flashlight, LED',
			'Backpack',
			'Notebook',
			'USB Drive (multiple)',
			'Spare Batteries',
			'Portable Charger',
			'Portable Printer',
			'First Aid Kit',
			'.38 or 9mm Revolver'
		]
	},
	{
		name: 'MEDICAL PROFESSIONAL KIT',
		description: 'Modern emergency medical equipment for trauma response and clinical care.',
		items: [
			'First Aid Kit',
			'Medical Bag, Professional',
			'Portable Defibrillator (AED)',
			'Stethoscope',
			'Blood Pressure Cuff',
			'Pulse Oximeter',
			'Thermometer, Digital',
			'Surgical Gloves',
			'Surgical Mask',
			'Medical Scissors',
			'Trauma Shears',
			'IV Kit',
			'Oxygen Tank (portable)',
			'Emergency Blanket',
			'Flashlight, Penlight',
			'Cellphone',
			'Laptop Computer',
			'Reference Books, Medical'
		]
	},
	{
		name: 'HACKER / IT SPECIALIST KIT',
		description: 'Cutting-edge technology for digital infiltration, system analysis, and cybersecurity operations.',
		items: [
			'Laptop Computer (high-spec)',
			'Raspberry Pi',
			'Cellphone',
			'Smartphone',
			'USB Drive (multiple)',
			'External Hard Drive',
			'Wi-Fi Pineapple',
			'Network Tap',
			'RFID Cloner',
			'Lock Pick Gun (electronic)',
			'Portable Charger',
			'Cable Kit',
			'Multitool, Electronic',
			'Flashlight, LED',
			'Backpack',
			'Software Licenses',
			'.22 Pistol'
		]
	},
	{
		name: 'FIELD RESEARCHER KIT',
		description: 'Scientific field equipment for remote research, specimen collection, and environmental analysis.',
		items: [
			'Laptop Computer',
			'Camera, Digital',
			'Drone (small)',
			'GPS Navigator',
			'Satellite Phone',
			'Binoculars',
			'Compass',
			'First Aid Kit',
			'Flashlight, LED',
			'Backpack',
			'Notebook',
			'Sample Collection Kit',
			'Water Testing Kit',
			'Measuring Tape',
			'Portable Generator',
			'Cellphone',
			'Hunting Knife'
		]
	},
	{
		name: 'PRIVATE SECURITY KIT',
		description: 'Professional protection equipment for bodyguard and security contractor operations.',
		items: [
			'Glock 17 9mm Auto',
			'.38 or 9mm Revolver',
			'Spare Magazines (x3)',
			'Bulletproof Vest',
			'Handcuffs',
			'Zip Ties',
			'Flashlight, LED',
			'Radio, Walkie-Talkie',
			'Body Camera',
			'First Aid Kit',
			'Tactical Gloves',
			'Cellphone',
			'GPS Navigator',
			'Binoculars',
			'Camera, Digital',
			'Notepad',
			'Pepper Spray'
		]
	},
	{
		name: 'URBAN SURVIVAL KIT',
		description: 'Essential modern tools for street-level operations, self-reliance, and off-grid survival.',
		items: [
			'Cellphone',
			'Burner Phone',
			'Backpack',
			'Flashlight, LED',
			'Multitool',
			'Lockpick Set',
			'Duct Tape',
			'Rope, Nylon',
			'First Aid Kit',
			'Water Bottle',
			'Cash (emergency stash)',
			'Prepaid Credit Cards',
			'Fake ID Set',
			'Encrypted USB',
			'Baseball Bat',
			'Pocket Knife',
			'Pepper Spray'
		]
	}
];