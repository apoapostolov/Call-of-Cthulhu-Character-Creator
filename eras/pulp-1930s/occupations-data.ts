import type { Occupation } from '../../types';
import { SKILL_SPECIALIZATIONS } from '../../skill-specializations-data';

// NOTE: Pulp inherits Classic 1920s occupations via manifest resolveOccs.
// Any entries here overwrite by name or add NEW ones. Include suggestedContacts for Dossier notes.
export const OCCUPATIONS: Occupation[] = [
	// New: Archeologist (Pulp-specific addition)
	{
		name: 'Archeologist',
		description: 'Scholar-adventurer who digs into lost sites and older truths—with a pickaxe and a passport.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 10, max: 40 },
		occupationalSkills: ['Appraise', 'Archaeology', 'History', 'Language (Other)', 'Library Use', 'Spot Hidden', 'Mechanical Repair'],
		choiceGroups: [
			{ count: 1, options: ['Navigate', ...SKILL_SPECIALIZATIONS['Science']] }
		],
		suggestedContacts: 'Well-heeled patrons, museum curators, and university departments that fund expeditions.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Aviator',
		description: 'Barnstormer or mail pilot turned daredevil. You live for the skies and the engine’s roar.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + DEX × 2',
		creditRatingRange: { min: 30, max: 60 },
		occupationalSkills: ['Accounting', 'Electrical Repair', 'Listen', 'Mechanical Repair', 'Navigate', 'Pilot (Aircraft)', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Keeps up with former military contacts, fellow pilots, trusted airfield mechanics, and the businessfolk who hire them.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Federal Agent',
		description: 'You are a G‑Man or T‑Man—federal law in a fedora—tracking interstate crime and stranger things besides.',
		group: 'Investigative',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 20, max: 40 },
		occupationalSkills: ['Drive Auto', 'Fighting (Brawl)', 'Firearms', 'Law', 'Persuade', 'Stealth', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Interagency ties across the federal alphabet, with cultivated sources in local law enforcement and the mob.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Gangster, Boss',
		description: 'A neighborhood kingpin with reach: rackets, unions, and friendly faces in city hall.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 60, max: 95 },
		occupationalSkills: ['Fighting', 'Firearms', 'Law', 'Listen', 'Psychology', 'Spot Hidden'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'Commands a network—from crews and union bosses to city hall, the courts, and local businesses in their community.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Hit Man/Woman',
		description: 'A professional killer: discreet, methodical, and expensive.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 30, max: 60 },
		occupationalSkills: ['Disguise', 'Electrical Repair', 'Fighting', 'Firearms', 'Locksmith', 'Mechanical Repair', 'Stealth', 'Psychology'],
		suggestedContacts: 'Few, mostly underworld—people prefer not to know them too well; reputation carries the rest.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Get‑Away Driver',
		description: 'Wheelman for hire—nerves of steel and a map in your head.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 9, max: 20 },
		occupationalSkills: ['Accounting', 'Drive Auto', 'Listen', 'Mechanical Repair', 'Navigate', 'Psychology'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Knows the streets, the clientele, and the cops who chase them—always a fast route or clean garage in mind.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Bank Robber',
		description: 'Planner and stick‑up artist who makes a living one vault at a time.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
		creditRatingRange: { min: 5, max: 75 },
		occupationalSkills: ['Drive Auto', 'Law', 'Psychology', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['Electrical Repair', 'Mechanical Repair'] },
			{ count: 1, options: ['Fighting', 'Firearms'] },
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['Drive Auto', 'Ride'] }
		],
		suggestedContacts: 'Connected to other gang members, freelancers for hire, and organized crime fixers.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Big Game Hunter',
		description: 'Professional safari guide who tracks and takes down dangerous beasts for clients or study.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 20, max: 50 },
		occupationalSkills: ['Firearms', 'Natural World', 'Navigate', 'Science (Biology)', 'Science (Botany)', 'Stealth', 'Track'],
		choiceGroups: [
			{ count: 1, options: ['Listen', 'Spot Hidden'] },
			{ count: 1, options: ['Language (Other)', 'Survival (Any)'] }
		],
		suggestedContacts: 'Has ties to foreign officials, game wardens, wealthy patrons, black‑market traders, and zoo owners.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Bounty Hunter',
		description: 'Freelance tracker who brings in skips and fugitives—alive is preferred.',
		group: 'Investigative',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Drive Auto', 'Law', 'Psychology', 'Track', 'Stealth'],
		choiceGroups: [
			{ count: 1, options: ['Electrical Repair', 'Mechanical Repair'] },
			{ count: 1, options: ['Fighting', 'Firearms'] },
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'Knows bail bondsmen, local cops, and a few reluctant criminal informants.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Bartender/Waitress',
		description: 'Keeper of the bar and a hundred local secrets, reading people as easily as drink orders.',
		group: 'Entertainer',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 8, max: 25 },
		occupationalSkills: ['Accounting', 'Fighting (Brawl)', 'Listen', 'Psychology', 'Spot Hidden'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Regulars from all walks, with occasional ties to organized crime.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Beat Cop',
		description: 'Uniformed officer on the street who knows the neighborhood and its secrets.',
		group: 'Investigative',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Fighting (Brawl)', 'Firearms', 'First Aid', 'Law', 'Psychology', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['Drive Auto', 'Ride'] }
		],
		suggestedContacts: 'Local businesses and residents, street‑level criminals, and the occasional connection in organized crime.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Boxer/Wrestler',
		description: 'Prize‑fighter or show wrestler—built for the ring and brawls besides.',
		group: 'Entertainer',
		skillPoints: 'EDU × 2 + STR × 2',
		creditRatingRange: { min: 9, max: 60 },
		occupationalSkills: ['Dodge', 'Fighting (Brawl)', 'Intimidate', 'Jump', 'Psychology', 'Spot Hidden'],
		choiceGroups: [
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Promoters, journalists, organized crime fixers, and professional trainers.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Butler',
		description: 'Head of the household staff—unflappable, discreet, and capable.',
		group: 'Upper Class',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 40 },
		occupationalSkills: ['First Aid', 'Listen', 'Language (Other)', 'Psychology', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['Accounting', 'Appraise'] },
			{ count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Other household staff, local businesses, and trusted suppliers.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Cat Burglar',
		description: 'Second‑story thief who prefers silk gloves over smashed glass.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + DEX × 2',
		creditRatingRange: { min: 5, max: 40 },
		occupationalSkills: ['Appraise', 'Climb', 'Listen', 'Locksmith', 'Sleight of Hand', 'Stealth', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['Electrical Repair', 'Mechanical Repair'] }
		],
		suggestedContacts: 'Fences and fellow burglars who know how to move goods quietly.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Cult Leader',
		description: 'Charismatic head of a dubious flock—money and devotion flow your way.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 30, max: 60 },
		occupationalSkills: ['Accounting', 'Occult', 'Psychology', 'Spot Hidden'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'A motley of ordinary followers, with the occasional wealthy or famous devotee.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Chauffeur',
		description: 'Professional driver and fixer—keeps the engine purring and the boss on schedule.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + DEX × 2',
		creditRatingRange: { min: 10, max: 40 },
		occupationalSkills: ['Drive Auto', 'Listen', 'Mechanical Repair', 'Navigate', 'Spot Hidden'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Successful business people, including criminals, and political representatives.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Confidence Trickster',
		description: 'Grifter and impersonator with a silver tongue and quick hands.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 10, max: 65 },
		occupationalSkills: ['Appraise', 'Art and Craft (Acting)', 'Listen', 'Psychology', 'Sleight of Hand'],
		choiceGroups: [
			{ count: 1, options: ['Law', 'Language (Other)'] },
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'Other con artists and freelance criminals willing to play along.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Criminal',
		description: 'Underworld operator—fence, fixer, bruiser, or sneak—depending on the job.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + (DEX × 2 or APP × 2)',
		creditRatingRange: { min: 5, max: 65 },
		occupationalSkills: ['Appraise', 'Psychology', 'Spot Hidden', 'Stealth'],
		choiceGroups: [
			{ count: 1, options: ['Art and Craft (Any)', 'Disguise'] },
			{ count: 1, options: ['Fighting', 'Firearms'] },
			{ count: 1, options: ['Locksmith', 'Mechanical Repair'] },
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate'] }
		],
		suggestedContacts: 'Mixes with other criminals, organized crime, crooked cops, private dicks, and street toughs.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Dilettante',
		description: 'Wealthy socialite who dabbles in dangerous hobbies and curious pursuits.',
		group: 'Upper Class',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 50, max: 99 },
		occupationalSkills: ['Firearms', 'Language (Other)', 'Ride'],
		choiceGroups: [
			{ count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 3, options: ['*'] }
		],
		suggestedContacts: 'Peers in high society, fraternal organizations, bohemian salons, and the idle rich at large.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Doctor of Medicine',
		description: 'Physician and healer versed in science and the mysteries of the human body.',
		group: 'Professional',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 30, max: 80 },
		occupationalSkills: ['First Aid', 'Language (Latin)', 'Medicine', 'Psychology', 'Science (Biology)', 'Science (Pharmacy)'],
		choiceGroups: [
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Other physicians and medical staff, grateful patients, and the occasional nervous coroner.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Drifter',
		description: 'A soul between places—resourceful, unnoticed, and everywhere.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + (APP × 2 or DEX × 2 or STR × 2)',
		creditRatingRange: { min: 0, max: 5 },
		occupationalSkills: ['Climb', 'Jump', 'Listen', 'Navigate', 'Stealth'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Other hobos, a few friendly railroad guards, and soft touches in many towns.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Elected Official',
		description: 'From city council to congress—power broker with a smile or a snarl.',
		group: 'Professional',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 50, max: 90 },
		occupationalSkills: ['Charm', 'History', 'Intimidate', 'Fast Talk', 'Listen', 'Language (Own)', 'Persuade', 'Psychology'],
		suggestedContacts: 'Political operatives, government officials, business leaders, foreign dignitaries, and occasionally organized crime.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Engineer',
		description: 'Builder, fixer, and problem‑solver—applies science to stubborn machinery.',
		group: 'Professional',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 30, max: 60 },
		occupationalSkills: ['Art and Craft (Technical Drawing)', 'Electrical Repair', 'Library Use', 'Mechanical Repair', 'Operate Heavy Machinery', 'Science (Chemistry)', 'Science (Physics)'],
		choiceGroups: [
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Business and military engineers, local government offices, and architects and draftsmen.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Entertainer',
		description: 'Stage, screen, or street—your act wins crowds and opens doors.',
		group: 'Entertainer',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 9, max: 70 },
		occupationalSkills: ['Disguise', 'Listen', 'Psychology'],
		choiceGroups: [
			{ count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Vaudeville and theater circuits, film industry folks, entertainment critics, and occasionally mob backers.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Exorcist',
		description: 'Religious specialist who confronts hauntings and possessions—real or imagined.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 25, max: 55 },
		occupationalSkills: ['Anthropology', 'History', 'Library Use', 'Listen', 'Occult', 'Language (Other)', 'Psychology'],
		choiceGroups: [
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Religious organizations and clergy of various faiths who call you when something is amiss.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Explorer',
		description: 'Seeker of lost cities and uncharted lands—sponsor’s darling or academic headache.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 2 + (APP × 2 or DEX × 2 or STR × 2)',
		creditRatingRange: { min: 55, max: 80 },
		occupationalSkills: ['Firearms', 'History', 'Jump', 'Natural World', 'Navigate', 'Language (Other)', 'Survival'],
		choiceGroups: [
			{ count: 1, options: ['Climb', 'Swim'] }
		],
		suggestedContacts: 'Major libraries, universities, museums, wealthy patrons, fellow explorers, foreign officials, and local tribespeople.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Gambler',
		description: 'Card sharp and dice artist—reads tells and stacks odds.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + (APP × 2 or DEX × 2)',
		creditRatingRange: { min: 8, max: 50 },
		occupationalSkills: ['Accounting', 'Art and Craft (Acting)', 'Listen', 'Psychology', 'Sleight of Hand', 'Spot Hidden'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'Bookies, organized crime figures, and the city’s shadowy nightlife.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},

	// Pulp overrides (same-name as Classic) to attach Suggested Contacts without marking as NEW
	{
		name: 'Artist',
		description: 'You create works that inspire, provoke, and reveal hidden truths, channeling your unique vision.',
		group: 'Entertainer',
		skillPoints: 'EDU × 2 + POW × 2 or DEX × 2',
		creditRatingRange: { min: 9, max: 50 },
		occupationalSkills: ['Language (Other)', 'Psychology', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
			{ count: 1, options: ['History', 'Natural World'] },
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Art galleries, critics, wealthy patrons, and the advertising industry.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Athlete',
		description: 'You have honed your body to the peak of physical performance, a master of movement and endurance.',
		group: 'Entertainer',
		skillPoints: 'EDU × 2 + DEX × 2 or STR × 2',
		creditRatingRange: { min: 9, max: 70 },
		occupationalSkills: ['Climb', 'Jump', 'Fighting (Brawl)', 'Ride', 'Swim', 'Throw'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Sports personalities, sports writers, and other media stars.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Author',
		description: 'You weave stories, real or imagined, to enlighten, entertain, or expose the shadows of the world.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Art and Craft (Writer)', 'History', 'Library Use', 'Language (Other)', 'Language (Own)', 'Psychology'],
		choiceGroups: [
			{ count: 1, options: ['Natural World', 'Occult'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Publishers, critics, and historians willing to debate your drafts and deadlines.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Librarian',
		description: 'You are a keeper of knowledge, navigating the labyrinthine world of books and records to find what is hidden.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 35 },
		occupationalSkills: ['Accounting', 'Library Use', 'Language (Other)', 'Language (Own)'],
		choiceGroups: [
			{ count: 4, options: ['*'] }
		],
		suggestedContacts: 'Booksellers, community groups, and specialist researchers.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Professor',
		description: 'You are a scholar and an educator, delving into your chosen field and occasionally finding more than you bargained for.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 20, max: 70 },
		occupationalSkills: ['Library Use', 'Language (Other)', 'Language (Own)', 'Psychology'],
		choiceGroups: [
			{ count: 4, options: ['*'] }
		],
		suggestedContacts: 'Scholars, universities, and libraries the world over.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Police Detective',
		description: 'You are an investigator of the darkest crimes, walking the mean streets to bring justice to the victims of human evil.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 2 + DEX × 2 or STR × 2',
		creditRatingRange: { min: 20, max: 50 },
		occupationalSkills: ['Firearms', 'Law', 'Listen', 'Psychology', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['Art and Craft (Acting)', 'Disguise'] },
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Law enforcement, street‑level crime, the coroner’s office, the judiciary, and organized crime.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Private Investigator',
		description: 'You work for hire, digging into secrets and lies that others would prefer to keep buried.',
		group: 'Investigative',
		skillPoints: 'EDU × 2 + DEX × 2 or STR × 2',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Art and Craft (Photography)', 'Disguise', 'Law', 'Library Use', 'Psychology', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Local law enforcement and a roster of clients—some you can even trust.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Soldier',
		description: 'You are a trained warrior, disciplined in the arts of combat and survival in the face of overwhelming odds.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + DEX × 2 or STR × 2',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Dodge', 'Fighting', 'Firearms', 'Stealth', 'Survival'],
		choiceGroups: [
			{ count: 1, options: ['Climb', 'Swim'] },
			{ count: 2, options: ['First Aid', 'Mechanical Repair', 'Language (Other)'] }
		],
		suggestedContacts: 'Military comrades and veterans’ associations that remember your name.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Tribe Member',
		description: 'You are part of a remote or traditional community, possessing ancient knowledge and skills to survive in the wild.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + DEX × 2 or STR × 2',
		creditRatingRange: { min: 0, max: 15 },
		occupationalSkills: ['Climb', 'Natural World', 'Listen', 'Occult', 'Spot Hidden', 'Swim'],
		choiceGroups: [
			{ count: 1, options: SKILL_SPECIALIZATIONS['Survival'] },
			{ count: 1, options: ['Fighting', 'Throw'] }
		],
		suggestedContacts: 'Fellow tribe members connected by kinship and tradition.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Zealot',
		description: 'You are driven by a fanatical belief, be it political, religious, or philosophical, that shapes your every action.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + APP × 2 or POW × 2',
		creditRatingRange: { min: 0, max: 30 },
		occupationalSkills: ['History', 'Psychology', 'Stealth'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 3, options: ['*'] }
		],
		suggestedContacts: 'Religious or fraternal groups and media outlets eager for fervor.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Gangster, Underling',
		description: 'Soldier for the mob—takes orders, keeps quiet, gets paid.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 9, max: 20 },
		occupationalSkills: ['Drive Auto', 'Fighting', 'Firearms', 'Psychology'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Street‑level criminals, local police, and businesses in the same ethnic neighborhood.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Gun Moll',
		description: 'Gangster’s companion who can hold her own when things turn ugly.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 10, max: 80 },
		occupationalSkills: ['Drive Auto', 'Listen', 'Stealth'],
		choiceGroups: [
			{ count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['Fighting (Brawl)', 'Firearms (Handgun)'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Knows gangsters, local cops, and small‑business owners along the strip.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Gentleman/Lady',
		description: 'Well‑born with means—educated, connected, and accustomed to deference.',
		group: 'Upper Class',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 40, max: 90 },
		occupationalSkills: ['Firearms (Rifle/Shotgun)', 'History', 'Navigate', 'Ride', 'Language (Other)'],
		choiceGroups: [
			{ count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'Upper classes and landed gentry, politicians, servants, and agricultural workers on their estates.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Hired Muscle',
		description: 'Paid to intimidate or injure—does both with efficiency.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + STR × 2',
		creditRatingRange: { min: 5, max: 30 },
		occupationalSkills: ['Drive Auto', 'Fighting', 'Firearms', 'Psychology', 'Stealth', 'Spot Hidden'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'Organized crime, rough cops on the beat, and local traders who know when to keep quiet.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Hobo',
		description: 'Lives by wit and motion—rides rails and hears things others miss.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + (APP × 2 or DEX × 2)',
		creditRatingRange: { min: 0, max: 5 },
		occupationalSkills: ['Climb', 'Jump', 'Listen', 'Navigate', 'Stealth'],
		choiceGroups: [
			{ count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
			{ count: 1, options: ['Locksmith', 'Sleight of Hand'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Other hobos, a few friendly railroad guards, and soft touches in numerous towns.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Hooker',
		description: 'Sex worker who navigates danger, discretion, and a loyal clientele.',
		group: 'Entertainer',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 5, max: 50 },
		occupationalSkills: ['Art and Craft (Any)', 'Dodge', 'Psychology', 'Sleight of Hand', 'Stealth'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Street scene, local police, organized crime handlers, and faithful regulars.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Itinerant Worker',
		description: 'Seasonal hand who can fix, harvest, and hustle a day’s wage anywhere.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 0, max: 10 },
		occupationalSkills: ['Art and Craft (Any)', 'Climb', 'Sleight of Hand', 'Mechanical Repair', 'Natural World', 'Navigate'],
		choiceGroups: [
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Hobos, drivers, farmers, and local sheriffs who know who’s hiring.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Investigative Journalist',
		description: 'Digging where the powerful would prefer you didn’t—print what they fear.',
		group: 'Investigative',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Art and Craft (Photography)', 'History', 'Library Use', 'Language (Own)', 'Psychology'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Newsrooms, politicians, and sources among both cops and crooks.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Laborer',
		description: 'Hard worker who moves earth, steel, and society forward—one shift at a time.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + DEX × 2 + STR × 2',
		creditRatingRange: { min: 5, max: 20 },
		occupationalSkills: ['Drive Auto', 'Electrical Repair', 'Fighting', 'First Aid', 'Mechanical Repair', 'Operate Heavy Machinery', 'Throw'],
		choiceGroups: [
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Other workers and supervisors within the trade.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Mechanic',
		description: 'Grease monkey with golden hands—if it’s broken, you’ll fix it.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 40 },
		occupationalSkills: ['Climb', 'Drive Auto', 'Electrical Repair', 'Mechanical Repair', 'Operate Heavy Machinery'],
		choiceGroups: [
			{ count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Union members and specialist trades who can source parts and know‑how.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Military Officer',
		description: 'Leader of troops—trained in command, logistics, and hard decisions.',
		group: 'Professional',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 20, max: 70 },
		occupationalSkills: ['Accounting', 'Firearms', 'Navigate', 'First Aid', 'Psychology'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Peers in the military and in federal government circles.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Missionary',
		description: 'Brings faith to the frontier—and finds doubts in the dark.',
		group: 'Professional',
		skillPoints: 'EDU × 2 + APP × 2',
		creditRatingRange: { min: 0, max: 30 },
		occupationalSkills: ['First Aid', 'Mechanical Repair', 'Medicine', 'Natural World'],
		choiceGroups: [
			{ count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Church hierarchy and foreign officials who regulate missionary work.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Musician',
		description: 'Performer and composer—plays the room as well as the instrument.',
		group: 'Entertainer',
		skillPoints: 'EDU × 2 + (APP × 2 or DEX × 2)',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Listen', 'Psychology'],
		choiceGroups: [
			{ count: 1, options: [...SKILL_SPECIALIZATIONS['Art and Craft']] },
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 4, options: ['*'] }
		],
		suggestedContacts: 'Club owners, the musicians’ union, mob fixers, and street‑level operators.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Nurse',
		description: 'Medical professional who keeps patients alive and doctors honest.',
		group: 'Professional',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['First Aid', 'Listen', 'Medicine', 'Psychology', 'Science (Biology)', 'Science (Chemistry)', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'Hospital workers, physicians, and community aid organizations.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Occultist',
		description: 'Scholar of arcana and secret fraternities—knows the rituals people shouldn’t.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 10, max: 80 },
		occupationalSkills: ['Anthropology', 'History', 'Library Use', 'Occult', 'Language (Other)', 'Science (Astronomy)'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Libraries, occult societies and fraternities, and fellow occultists of varying repute.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Parapsychologist',
		description: 'Researcher of the uncanny—tests claims, catalogs phenomena, and sometimes runs from it.',
		group: 'Academic',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Anthropology', 'Art and Craft (Photography)', 'History', 'Library Use', 'Occult', 'Language (Other)', 'Psychology'],
		choiceGroups: [
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Universities, parapsychological societies, and curious clients.',
		source: 'Pulp Cthulhu',
	},
	{
		name: 'Photographer',
		description: 'Captures truth on film—whether the subject likes it or not.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Art and Craft (Photography)', 'Psychology', 'Science (Chemistry)', 'Stealth', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Ad agencies, newspapers, and political organizations who need pictures now.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Priest',
		description: 'Cleric and counselor—keeper of souls and parish secrets.',
		group: 'Professional',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 60 },
		occupationalSkills: ['Accounting', 'History', 'Library Use', 'Listen', 'Language (Other)', 'Psychology'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Church hierarchy, local congregations, and community leaders who lean on your counsel.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Ranger',
		description: 'Back‑country law and rescue—survives where others do not.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 5, max: 20 },
		occupationalSkills: ['Firearms', 'First Aid', 'Listen', 'Natural World', 'Navigate', 'Spot Hidden', 'Survival (Any)', 'Track'],
		suggestedContacts: 'Local people, native folk, and back‑country traders.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Reporter',
		description: 'Beats the pavement and the deadline—gets the scoop no matter who says otherwise.',
		group: 'Investigative',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['History', 'Listen', 'Language (Own)', 'Psychology', 'Stealth', 'Spot Hidden'],
		choiceGroups: [
			{ count: 1, options: ['Art and Craft (Acting)'] },
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'News and media industries, political operatives, business execs, cops, crooks, and society high and low.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Sailor',
		description: 'Old salt or young deckhand—lives and works where the sea is a bossy partner.',
		group: 'Manual Labor',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Fighting', 'Firearms', 'First Aid', 'Navigate', 'Pilot (Boat)', 'Survival (Sea)', 'Swim'],
		choiceGroups: [
			{ count: 1, options: ['Electrical Repair', 'Mechanical Repair'] }
		],
		suggestedContacts: 'Navy men and veterans’ associations with a berth or a story to spare.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Scientist',
		description: 'Academic researcher whose curiosity and equations cut both ways.',
		group: 'Academic',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 9, max: 50 },
		occupationalSkills: ['Language (Other)', 'Language (Own)', 'Library Use', 'Spot Hidden'],
		choiceGroups: [
			{ count: 3, options: [...SKILL_SPECIALIZATIONS['Science']] }
		],
		suggestedContacts: 'Other scientists and academics, universities, and former employers or patrons.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Secretary',
		description: 'Office wizard—keeps schedules, shorthand, and the boss’s problems under control.',
		group: 'Professional',
		skillPoints: 'EDU × 2 + (DEX × 2 or APP × 2)',
		creditRatingRange: { min: 9, max: 30 },
		occupationalSkills: ['Accounting', 'Language (Own)', 'Psychology', 'Library Use'],
		choiceGroups: [
			{ count: 1, options: ['Art and Craft (Typing)', 'Art and Craft (Shorthand)'] },
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 1, options: ['*'] }
		],
		suggestedContacts: 'Other office workers and senior executives your firm deals with.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Spy',
		description: 'Undercover asset with a talent for lies, languages, and vanishing acts.',
		group: 'Investigative',
		skillPoints: 'EDU × 2 + (APP × 2 or DEX × 2)',
		creditRatingRange: { min: 20, max: 60 },
		occupationalSkills: ['Firearms', 'Listen', 'Language (Other)', 'Psychology', 'Sleight of Hand', 'Stealth'],
		choiceGroups: [
			{ count: 1, options: ['Art and Craft (Acting)', 'Disguise'] },
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'Usually only their handler; other connections are cultivated during deep cover.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Street Punk',
		description: 'Gutter‑raised scrapper with fast feet and faster fingers.',
		group: 'Criminal',
		skillPoints: 'EDU × 2 + (DEX × 2 or STR × 2)',
		creditRatingRange: { min: 3, max: 10 },
		occupationalSkills: ['Climb', 'Fighting', 'Firearms', 'Jump', 'Sleight of Hand', 'Stealth', 'Throw'],
		choiceGroups: [
			{ count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'Petty criminals, fences, the neighborhood gangster, and the local police who know your name.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Student/Intern',
		description: 'On the bottom rung but hungry—with access to labs, libraries, and mentors.',
		group: 'Academic',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 5, max: 10 },
		occupationalSkills: ['Language (Own)', 'Library Use', 'Listen'],
		choiceGroups: [
			{ count: 3, options: ['*'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Academics, other students, and for interns, business contacts within their placement.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Union Activist',
		description: 'Organizer and rabble‑rouser who takes on bosses and bad contracts.',
		group: 'Professional',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 5, max: 30 },
		occupationalSkills: ['Accounting', 'Fighting (Brawl)', 'Law', 'Listen', 'Operate Heavy Machinery', 'Psychology'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
		],
		suggestedContacts: 'Labor leaders, activists, political allies, and sometimes organized crime; in the 1920s, socialists and anarchists as well.',
		source: 'Pulp Cthulhu',
		isNew: true,
	},
	{
		name: 'Yogi',
		description: 'Scholar‑ascetic and spiritual adept—master of breath, body, and calm.',
		group: 'Lovecraftian',
		skillPoints: 'EDU × 4',
		creditRatingRange: { min: 6, max: 60 },
		occupationalSkills: ['First Aid', 'History', 'Natural World', 'Occult', 'Language (Other)'],
		choiceGroups: [
			{ count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
			{ count: 2, options: ['*'] }
		],
		suggestedContacts: 'Tribespeople, occult or spiritual fraternities, and wealthy patrons who seek enlightenment.',
		source: 'Pulp Cthulhu',
		isNew: true,
	}
];
