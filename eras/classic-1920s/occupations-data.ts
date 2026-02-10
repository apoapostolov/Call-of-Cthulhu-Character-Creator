import type { Occupation } from '../../types';
import { SKILL_SPECIALIZATIONS } from '../../skill-specializations-data';

export const OCCUPATIONS: Occupation[] = [
    {
        name: 'Antiquarian',
        description: 'You study, collect, and trade in ancient items, sifting history from myth and recognizing the value of the past.',
        group: 'Lovecraftian',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 30, max: 70 },
        occupationalSkills: ['Appraise', 'History', 'Library Use', 'Language (Other)', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 1, options: ['*'] }
        ]
    },
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
        ]
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
        ]
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
        ]
    },
    {
        name: 'Clergy, Member of the',
        description: 'You are a spiritual guide, offering solace and wisdom while confronting the crises of faith in a dark world.',
        group: 'Professional',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 9, max: 60 },
        occupationalSkills: ['Accounting', 'History', 'Library Use', 'Listen', 'Language (Other)', 'Psychology'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Criminal',
        description: 'You live outside the law, thriving in the underworld through cunning, force, or specialized illicit skills.',
        group: 'Criminal',
        skillPoints: 'EDU × 2 + DEX × 2 or STR × 2',
        creditRatingRange: { min: 5, max: 65 },
        occupationalSkills: ['Psychology', 'Spot Hidden', 'Stealth'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 4, options: ['Appraise', 'Disguise', 'Fighting', 'Firearms', 'Locksmith', 'Mechanical Repair', 'Sleight of Hand'] }
        ]
    },
    {
        name: 'Dilettante',
        description: 'Born to wealth and leisure, you pursue esoteric hobbies and interests with the passion of a true amateur.',
        group: 'Lovecraftian',
        skillPoints: 'EDU × 2 + APP × 2',
        creditRatingRange: { min: 50, max: 99 },
        occupationalSkills: ['Firearms', 'Language (Other)', 'Ride'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 3, options: ['*'] }
        ]
    },
    {
        name: 'Doctor of Medicine',
        description: 'You are a healer and a scientist, confronting the ailments of the body and the creeping horrors that afflict the mind.',
        group: 'Lovecraftian',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 30, max: 80 },
        occupationalSkills: ['First Aid', 'Language (Latin)', 'Medicine', 'Psychology', 'Science (Biology)', 'Science (Pharmacy)'],
        choiceGroups: [
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Drifter',
        description: 'You are a person of no fixed address, moving through the forgotten spaces of society, seeing things others miss.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + APP × 2 or DEX × 2 or STR × 2',
        creditRatingRange: { min: 0, max: 5 },
        occupationalSkills: ['Climb', 'Jump', 'Listen', 'Navigate', 'Stealth'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Engineer',
        description: 'You understand how the world is built, and more importantly, how it can be taken apart and put back together.',
        group: 'Professional',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 30, max: 60 },
        occupationalSkills: ['Art and Craft (Technical Drawing)', 'Electrical Repair', 'Library Use', 'Mechanical Repair', 'Operate Heavy Machinery', 'Science (Engineering)', 'Science (Physics)'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Entertainer',
        description: 'You are a performer, captivating audiences and wearing masks both on and off the stage.',
        group: 'Entertainer',
        skillPoints: 'EDU × 2 + APP × 2',
        creditRatingRange: { min: 9, max: 70 },
        occupationalSkills: ['Art and Craft (Acting)', 'Disguise', 'Listen', 'Psychology'],
        choiceGroups: [
            { count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Farmer',
        description: 'You work the land, understanding the cycles of nature and the hard realities of life and death.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + DEX × 2 or STR × 2',
        creditRatingRange: { min: 9, max: 30 },
        occupationalSkills: ['Art and Craft (Farming)', 'Drive Auto', 'Mechanical Repair', 'Natural World', 'Operate Heavy Machinery', 'Track'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Journalist',
        description: 'You chase the truth, no matter how dangerous or unbelievable, armed with a pen and a healthy dose of skepticism.',
        group: 'Lovecraftian',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 9, max: 30 },
        occupationalSkills: ['Art and Craft (Photography)', 'History', 'Library Use', 'Language (Own)', 'Psychology'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Lawyer',
        description: 'You are an advocate and a manipulator of the law, finding loopholes and uncovering truths in equal measure.',
        group: 'Professional',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 30, max: 80 },
        occupationalSkills: ['Accounting', 'Law', 'Library Use', 'Psychology'],
        choiceGroups: [
            { count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 2, options: ['*'] }
        ]
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
        ]
    },
    {
        name: 'Military Officer',
        description: 'You are a leader of soldiers, trained in strategy, logistics, and the grim realities of command.',
        group: 'Professional',
        skillPoints: 'EDU × 2 + DEX × 2 or STR × 2',
        creditRatingRange: { min: 20, max: 70 },
        occupationalSkills: ['Accounting', 'Firearms', 'Navigate', 'Psychology', 'Survival'],
        choiceGroups: [
            { count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Missionary',
        description: 'You travel to foreign lands to spread your faith, often finding things that test it to its very limits.',
        group: 'Professional',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 0, max: 30 },
        occupationalSkills: ['First Aid', 'Mechanical Repair', 'Medicine', 'Natural World'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Musician',
        description: 'You are a master of sound and emotion, playing tunes that can soothe souls or stir them to madness.',
        group: 'Entertainer',
        skillPoints: 'EDU × 2 + DEX × 2 or POW × 2',
        creditRatingRange: { min: 9, max: 30 },
        occupationalSkills: ['Listen', 'Psychology'],
        choiceGroups: [
            { count: 1, options: [...SKILL_SPECIALIZATIONS['Art and Craft']] }, // "Art/Craft (instrument)"
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 4, options: ['*'] }
        ]
    },
    {
        name: 'Parapsychologist',
        description: 'You are a researcher of the bizarre and the uncanny, seeking scientific explanations for the supernatural.',
        group: 'Academic',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 9, max: 30 },
        occupationalSkills: ['Anthropology', 'Art and Craft (Photography)', 'History', 'Library Use', 'Occult', 'Language (Other)', 'Psychology'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Pilot',
        description: 'You are a master of the skies, navigating by instruments and instinct through storms both natural and unnatural.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + DEX × 2',
        creditRatingRange: { min: 20, max: 70 },
        occupationalSkills: ['Electrical Repair', 'Mechanical Repair', 'Navigate', 'Operate Heavy Machinery', 'Pilot (Aircraft (Fixed Wing))', 'Science (Astronomy)'],
        choiceGroups: [
            { count: 2, options: ['*'] }
        ]
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
        ]
    },
    {
        name: 'Police Officer',
        description: 'You walk the beat, a guardian of the peace who confronts the violence and chaos that lurks beneath society\'s surface.',
        group: 'Investigative',
        skillPoints: 'EDU × 2 + DEX × 2 or STR × 2',
        creditRatingRange: { min: 9, max: 30 },
        occupationalSkills: ['Fighting (Brawl)', 'Firearms', 'First Aid', 'Law', 'Psychology', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 1, options: ['Drive Auto', 'Ride'] }
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
    }
];