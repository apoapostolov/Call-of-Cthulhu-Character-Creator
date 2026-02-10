import type { Occupation } from '../../types';
import { SKILL_SPECIALIZATIONS } from '../../skill-specializations-data';

export const OCCUPATIONS: Occupation[] = [
    {
        name: 'Beggar',
        description: 'You devote your life to begging food and salable items from passersby.',
        group: 'Manual Labor',
        eraId: 'dark-ages-1000s',
        skillPoints: 'POW × 2 + APP × 2',
        creditRatingRange: { min: 0, max: 10 },
        occupationalSkills: ['Art and Craft (Acting)', 'Insight', 'Sleight of Hand'],
        choiceGroups: [
            { count: 1, options: ['Listen', 'Spot Hidden'] },
            { count: 2, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Cleric',
        description: 'You are the child of a rich man, or a brilliant peasant boy who caught the notice of a man of the Church. You received a formal religious education in a bishopric or a monastery. Now you are a secretary, an administrator, a jurist, or an architect at the service of a count or a bishop.',
        group: 'Crafts',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 2 + (POW × 2 or APP × 2)',
        creditRatingRange: { min: 9, max: 99 },
        occupationalSkills: ['Charm', 'Library Use', 'Persuade', 'Other Language (Latin)', 'Own Kingdom', 'Read and Write (Latin)', 'Religion'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Craftsperson',
        description: 'You might be a smith, a baker, or a weaver. Choose your craft. You live in a village community or in a city.',
        group: 'Manual Labor',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
        creditRatingRange: { min: 9, max: 60 },
        occupationalSkills: ['Accounting', 'Charm', 'Fast Talk', 'Insight', 'Natural World', 'Own Kingdom'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft (Dark Ages)'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Farmer (Free)',
        description: 'You are the salt of the earth, a well-to-do farmer or colonist. Society depends on your crops, and you work like a horse.',
        group: 'Manual Labor',
        eraId: 'dark-ages-1000s',
        skillPoints: 'STR × 2 + CON × 2',
        creditRatingRange: { min: 9, max: 30 },
        occupationalSkills: ['Animal Handling', 'Drive Horses or Oxen', 'Listen', 'Natural World', 'Navigate', 'Track'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft (Dark Ages)'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Guard',
        description: 'You work in a cathedral city for the burgrave or the bishop. In times of peace, you have little to do but practice with your weapons and keep in shape.',
        group: 'War',
        eraId: 'dark-ages-1000s',
        skillPoints: 'STR × 2 + DEX × 2',
        creditRatingRange: { min: 9, max: 30 },
    occupationalSkills: ['Fighting (Brawl)', 'Fighting (Spear)', 'Listen', 'Own Kingdom', 'Ride Horse', 'Spot Hidden', 'Throw'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Healer',
        description: 'To foreigners, you look like a villager, but villagers know better: your mentor granted you powers of the invisible world. Now villagers come to your hut for a cure or a potion, or for advice about love or birthing a child, the promise of rain, and the evil eye. Be wary of the ever-suspicious village priest!',
        group: 'Crafts',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 4 or POW × 4',
        creditRatingRange: { min: 9, max: 45 },
        occupationalSkills: ['Art and Craft (Potions)', 'First Aid', 'Insight', 'Natural World', 'Occult'],
        choiceGroups: [
            { count: 1, options: ['Listen', 'Spot Hidden'] },
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Hermit',
        description: 'You are an outcast, a drifter, a person plagued by dreams and visions. You grasp at strange clues and bewildering notions. You either hide in the woods or mountains, or live in a secret community.',
        group: 'Lovecraftian',
        eraId: 'dark-ages-1000s',
        skillPoints: 'POW × 4',
        creditRatingRange: { min: 0, max: 30 },
        occupationalSkills: ['Insight', 'Natural World', 'Occult', 'Persuade', 'Religion', 'Stealth'],
        choiceGroups: [
            { count: 1, options: ['Listen', 'Spot Hidden'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Household Officer',
        description: 'You serve your lord in his urban palace or his castrum (military building). Select one of the following functions: steward, headman of the stables, or keeper of order. You spend much of your day bullying lesser servants to do their work.',
        group: 'Crafts',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 2 + POW × 2',
        creditRatingRange: { min: 9, max: 65 },
        occupationalSkills: ['Animal Handling', 'Fast Talk', 'Insight', 'Listen', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft (Dark Ages)'] },
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Juggler',
        description: 'You\'re witty and articulate, dress gaily, and you love to get attention. You might be adept with chansons de geste (songs of heroic deeds)—your heroes are Roland, Charlemagne and Alexander the Great—you play a musical instrument, recite poetry and stories that everybody already knows, and are maybe proficient at tumbling, juggling, rope walking, or some other entertaining craft.',
        group: 'Entertainer',
        eraId: 'dark-ages-1000s',
        skillPoints: 'DEX × 2 + (APP × 2 or POW × 2)',
        creditRatingRange: { min: 0, max: 65 },
        occupationalSkills: ['Charm', 'Fast Talk', 'Insight', 'Own Kingdom', 'Persuade'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft (Dark Ages)'] },
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Mercenary',
        description: 'As a mercenary you fight for the highest bidder and then scavenge battlefields for trophies. As a brigand, you may have been the victim of some natural catastrophe or some heinous injustice that changed your life forever. Now you hide deep in the woods and rob traveling monks or traders.',
        group: 'War',
        eraId: 'dark-ages-1000s',
        skillPoints: 'CON × 2 + STR × 2',
        creditRatingRange: { min: 0, max: 20 },
        occupationalSkills: ['Fighting (Brawl)', 'Natural World', 'Navigate', 'Track', 'Stealth', 'Throw'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Fighting (Dark Ages)'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Merchant',
        description: 'You live in a city or on the outskirts of a cathedral city. You make a living from accounts and agents. You import wine, exotic spices, and silks from heathen countries and sell them to arrogant nobles. If you\'re not a Christian, you\'re allowed to be a moneychanger and a moneylender.',
        group: 'Crafts',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 9, max: 65 },
        occupationalSkills: ['Accounting', 'Charm', 'Fast Talk', 'Other Kingdoms', 'Other Language', 'Read and Write'],
        choiceGroups: [
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Monk',
        description: 'You live in a monastery, in silence and prayer, leading a simple life. When you don\'t pray or sing, you perform domestic tasks, or copy arcane manuscripts from the monastery\'s library. As a member of your order, you are not allowed to own private property but if you leave the monastery with special permission, you can always count on the hospitality and charity of other monasteries.',
        group: 'Crafts',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 9, max: 45 },
        occupationalSkills: ['Library Use', 'Listen', 'Other Language (Latin)', 'Religion', 'Read and Write (Latin)'],
        choiceGroups: [
            { count: 1, options: [...SKILL_SPECIALIZATIONS['Art and Craft (Dark Ages)'], 'Science (Alchemy)', 'Science (Astronomy)', 'Science (Mathematics)'] },
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Pilgrim',
        description: 'You live by the charity of other people. You accomplish a pilgrimage to a holy place, such as Rome, a monastery, or a cathedral city housing holy relics. You have your own reasons to be a pilgrim, maybe for the expiation of some crime, the wish to elevate your soul, or simply the desire for adventure in its noblest sense.',
        group: 'Lovecraftian',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 2 + POW × 2',
        creditRatingRange: { min: 0, max: 45 },
        occupationalSkills: ['Charm', 'Natural World', 'Navigate', 'Other Language', 'Own Kingdom', 'Religion', 'Stealth'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Priest',
        description: 'You\'re on a mission from the Church to enlighten laymen and women in the ways of God. You could be an acolyte, an exorcist, or a fully-fledged priest who is bound to a parish and collects the tithe from the farmers, most of which goes to your greedy lord.',
        group: 'Crafts',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 2 + INT × 2',
        creditRatingRange: { min: 9, max: 99 },
        occupationalSkills: ['Insight', 'Other Language (Latin)', 'Occult', 'Persuade', 'Religion'],
        choiceGroups: [
            { count: 3, options: ['*'] }
        ]
    },
    {
        name: 'Sailor',
        description: 'You\'re skilled with sails, boats, and ships, and know tides, the wind, and the stars. You have seen Hamburg, Venice, or Constantinople. Life is glorious, except for storms, pirates, and the terrors of the deep.',
        group: 'Manual Labor',
        eraId: 'dark-ages-1000s',
        skillPoints: 'DEX × 2 + CON × 2',
        creditRatingRange: { min: 0, max: 30 },
        occupationalSkills: ['Climb', 'Fast Talk', 'Natural World', 'Navigate', 'Other Kingdoms', 'Pilot (Boat)'],
        choiceGroups: [
            { count: 2, options: ['*'] }
        ]
    },
    {
        name: 'Scholar',
        description: 'You belong to a monastic or cathedral school. You are the recipient and the dispenser of godly knowledge. You spend your time reading classical authors, writing manuals, and teaching. When you don\'t teach, you may be involved in political intrigues for some good cause.',
        group: 'Academic',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 9, max: 45 },
        occupationalSkills: ['Library Use', 'Occult', 'Other Language (Latin)', 'Own Kingdom', 'Persuade', 'Read and Write (Latin)'],
        choiceGroups: [
            { count: 1, options: ['Science (Alchemy)', 'Science (Astronomy)', 'Science (Mathematics)'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Sergeant',
        description: 'You are employed by a lord or a monastery to supervise the administration of the domain. Your main task is to collect tax money and dues in kind.',
        group: 'War',
        eraId: 'dark-ages-1000s',
        skillPoints: 'STR × 2 + POW × 2',
        creditRatingRange: { min: 9, max: 75 },
        occupationalSkills: ['Accounting', 'Charm', 'Insight', 'Read and Write', 'Spot Hidden', 'Stealth'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Fighting (Dark Ages)'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Small Trader',
        description: 'You own a few pack animals or a small boat. You circuit inland, up river, or along the coast for the benefit of your master. You know a lot about that route and its particular dangers.',
        group: 'Crafts',
        eraId: 'dark-ages-1000s',
        skillPoints: 'INT × 2 + CON × 2',
        creditRatingRange: { min: 9, max: 45 },
        occupationalSkills: ['Charm', 'Fast Talk', 'Insight', 'Own Kingdom', 'Navigate'],
        choiceGroups: [
            { count: 1, options: ['Drive Horses or Oxen', 'Pilot (Boat)'] },
            { count: 1, options: ['Other Language (Greek)', 'Other Language (Arabic)', 'Other Language (Norse)', 'Other Language (Germanic)'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Warrior (Free)',
        description: 'You are a professional warrior; a bold freelance adventurer, or in the employ of a warlord. Your proudest possessions are a horse, your weapon, and your chain mail armor.',
        group: 'War',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 2 + STR × 2',
        creditRatingRange: { min: 9, max: 65 },
    occupationalSkills: ['Fighting (Brawl)', 'Natural World', 'Own Kingdom', 'Ride Horse', 'Track'],
        choiceGroups: [
            { count: 2, options: SKILL_SPECIALIZATIONS['Fighting (Dark Ages)'] },
            { count: 1, options: ['*'] }
        ]
    },
    {
        name: 'Woodsman',
        description: 'As a woodsman you exploit the forest: you might be a hunter, a honey gatherer, or a woodcutter who produces charcoal. If a fisherman, you live in a fishing community by a lake or by the sea.',
        group: 'Manual Labor',
        eraId: 'dark-ages-1000s',
        skillPoints: 'EDU × 2 + INT × 2',
        creditRatingRange: { min: 0, max: 25 },
        occupationalSkills: ['Natural World', 'Navigate', 'Throw'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft (Dark Ages)'] },
            { count: 1, options: ['Listen', 'Spot Hidden'] },
            { count: 1, options: ['Pilot (Boat)', 'Track'] },
            { count: 1, options: ['Swim', 'Stealth'] },
            { count: 1, options: ['*'] }
        ]
    }
];
