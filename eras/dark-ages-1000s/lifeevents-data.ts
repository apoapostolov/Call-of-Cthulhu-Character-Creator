import type { LifeEvent } from '../../types';

// Dark Ages Life Events based on 2d20 roll (2-40)
// Source: Call of Cthulhu: Dark Ages 3e

export const LIFE_EVENTS: LifeEvent[] = [
  {
    roll: 2,
    name: 'Born with a Caul',
    description: 'Born with a veil of membrane, considered a sign of fortune and protection. You are blessed with extraordinary luck that has guided you through life\'s perils.',
    modifiers: {
      attributes: { LUCK: 10 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 3,
    name: 'Father was a Chapman',
    description: 'Your father was an itinerant trader who traveled from village to village. You learned the ways of persuasion but gained little social standing in feudal society.',
    modifiers: {
      skills: { 'Charm': 5, 'Status': -10 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 4,
    name: 'Had the Pox',
    description: 'You survived a severe illness that left you weakened. Smallpox, plague, or another disease ravaged your body but could not claim your life.',
    modifiers: {
      attributes: { CON: -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 5,
    name: 'Sold into Slavery',
    description: 'As a child, you were sold into servitude or captured by raiders. Years of hard labor built your physical strength before you gained freedom.',
    modifiers: {
      attributes: { STR: 5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 6,
    name: 'Father was a Merchant',
    description: 'Your father traded with foreign lands, exposing you to different cultures and languages. You learned to speak tongues beyond your native realm.',
    modifiers: {
      skills: { 'Language (Other)': 10 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 7,
    name: 'Run Down by a Horse',
    description: 'A frightening encounter with a galloping horse left you injured and wary. Your riding skills suffered, but you learned to move quickly out of harm\'s way.',
    modifiers: {
      skills: { 'Ride': -10, 'Dodge': 5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 8,
    name: 'Mauled by a Bear',
    description: 'You survived a terrifying bear attack but carry visible scars. Your appearance was permanently marred by claw marks and torn flesh.',
    modifiers: {
      attributes: { APP: -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 9,
    name: 'Family Crops Failed',
    description: 'Famine struck your family when harvests failed. You learned to spot hidden food sources and game, but hiding your desperation became difficult.',
    modifiers: {
      skills: { 'Spot Hidden': 10, 'Conceal': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 10,
    name: 'Village Pillaged by Vikings',
    description: 'Norse raiders descended upon your village with fire and steel. You learned to tend the wounded amid chaos but moving unseen became harder to master.',
    modifiers: {
      skills: { 'First Aid': 10, 'Stealth': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 11,
    name: 'Child of a Fairy Lover',
    description: 'Whispers say one of your parents consorted with the fae. You possess uncanny knowledge of the otherworld but struggle to understand mortal hearts.',
    modifiers: {
      skills: { 'Occult': 10, 'Insight': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 12,
    name: 'Kicked by a Mule',
    description: 'A stubborn mule\'s kick in your youth left you with a permanent limp. Your movement rate was permanently reduced by this childhood injury.',
    modifiers: {
      derivedStats: { MOV: -1 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 13,
    name: 'Father was a Troubled Craftsman',
    description: 'Your father was skilled but plagued by demons—drink, madness, or dark reputation. You learned his craft well but inherited his tarnished standing.',
    modifiers: {
      skills: { 'Art/Craft': 10, 'Status': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 14,
    name: 'Father was a Priest',
    description: 'Raised in the Church\'s shadow, you learned scripture and ritual. However, folk magic and pagan ways were forbidden and unknown to you.',
    modifiers: {
      skills: { 'Religion': 10, 'Occult': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 15,
    name: 'Injured in a Brawl',
    description: 'A tavern fight or street scuffle left you with damaged hands or joints. Your dexterity never fully recovered from the injuries sustained.',
    modifiers: {
      attributes: { DEX: -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 16,
    name: 'Parents Accused of Heresy',
    description: 'Your family was branded as heretics by the Church. Shunned by society, you found solace in nature and learned its secrets while your status plummeted.',
    modifiers: {
      skills: { 'Status': -10, 'Natural World': 5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 17,
    name: 'Father was a Woodsman',
    description: 'Your father lived apart from civilization, teaching you woodland survival. You know beast and plant but are clumsy with courtly words and deception.',
    modifiers: {
      skills: { 'Natural World': 10, 'Fast Talk': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 18,
    name: 'Lived Outside Long Period',
    description: 'Years spent sleeping rough—as an outcast, hermit, or wanderer—hardened your body against the elements and built your resilience.',
    modifiers: {
      attributes: { CON: 5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 19,
    name: 'Humors: Phlegmatic',
    description: 'Your temperament is dominated by phlegm—calm, thoughtful, and introspective. You read others well but struggle to move them with passionate arguments.',
    modifiers: {
      skills: { 'Insight': 10, 'Persuade': -10 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 20,
    name: 'Humors: Sanguine',
    description: 'Blood dominates your constitution—cheerful, sociable, and quick-tongued. You spin tales with ease but struggle to perceive others\' true intentions.',
    modifiers: {
      skills: { 'Fast Talk': 10, 'Insight': -10 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 21,
    name: 'Humors: Choleric',
    description: 'Yellow bile rules your nature—ambitious, decisive, and commanding. You persuade through force of will but rarely hear what others truly say.',
    modifiers: {
      skills: { 'Persuade': 10, 'Listen': -10 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 22,
    name: 'Humors: Melancholic',
    description: 'Black bile darkens your soul—creative, brooding, and artistic. Beauty flows from your hands, but jovial banter and quick lies escape you.',
    modifiers: {
      skills: { 'Art': 10, 'Fast Talk': -10 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 23,
    name: 'Lost Among the Elf Hills',
    description: 'As a child, you wandered into fairy mounds and returned changed. Time passed strangely there, and you emerged with heightened spiritual awareness.',
    modifiers: {
      attributes: { POW: 5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 24,
    name: 'Injured by Elf-Shot',
    description: 'Struck by a fairy arrow—an invisible malady that wasted your frame. You survived the supernatural affliction but never regained your full size.',
    modifiers: {
      attributes: { SIZ: -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 25,
    name: 'Abandoned in the Woods',
    description: 'Left to die in the wilderness, you survived through cunning and woodcraft. You can navigate any terrain but lost your ability to trust and persuade others.',
    modifiers: {
      skills: { 'Navigate': 10, 'Persuade': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 26,
    name: 'Raised in a Monastery',
    description: 'The Church took you in, surrounding you with books and learning. You can read Latin and Greek, but physical agility was never emphasized.',
    modifiers: {
      skills: { 'Library Use': 10, 'Dodge': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 27,
    name: 'Poorly Healed Wound',
    description: 'An old injury—from blade, fall, or disease—healed badly without proper care. Muscle and sinew never fully recovered, leaving you permanently weakened.',
    modifiers: {
      attributes: { STR: -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 28,
    name: 'Worked in Shipyards',
    description: 'Years of rope work, sail mending, and ship repair honed your fine motor skills. Your hands became quick and precise from constant maritime labor.',
    modifiers: {
      attributes: { DEX: 5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 29,
    name: 'Born Under Gibbous Moon',
    description: 'Born when the moon waned from full, considered an ill omen. Fortune has never smiled upon you, and misfortune follows in your shadow.',
    modifiers: {
      attributes: { LUCK: -10 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 30,
    name: 'Hit as a Child',
    description: 'Beaten regularly in youth, you learned to watch for danger but failed to develop keen perception. You dodge blows but miss what you should see.',
    modifiers: {
      skills: { 'Spot Hidden': -10, 'Dodge': 5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 31,
    name: 'Eldest Child',
    description: 'As the firstborn, you inherited family authority and standing. However, bearing this responsibility left little time to understand others\' inner thoughts.',
    modifiers: {
      skills: { 'Status': 10, 'Insight': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 32,
    name: 'Wolves Raided Farm',
    description: 'A wolf pack descended upon your family\'s livestock. Fleeing from snapping jaws and yellow eyes, you learned to run faster than you ever thought possible.',
    modifiers: {
      // MOV is a derived stat - bonus should be applied narratively
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 33,
    name: 'Apprenticed on a Ship',
    description: 'Taken to sea young, you learned to pilot vessels through storm and calm. Constant work at sea left you rough-mannered and lacking social grace.',
    modifiers: {
      skills: { 'Pilot (Boat)': 10, 'Charm': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 34,
    name: 'Youngest Child',
    description: 'Born last, you inherited nothing and had to fend for yourself. You learned to dodge trouble and move quickly, but family status was never yours to claim.',
    modifiers: {
      skills: { 'Dodge': 10, 'Status': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 35,
    name: 'Saw Parents Murdered',
    description: 'You witnessed your parents\' violent deaths, helpless to intervene. The trauma taught you to hide and move unseen, but healing became forever tainted by memory.',
    modifiers: {
      skills: { 'First Aid': -10, 'Stealth': 5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 36,
    name: 'Caught in Stampede',
    description: 'Trapped among panicked horses or cattle, you barely escaped being trampled. You learned to control mounts but driving teams became a terrifying prospect.',
    modifiers: {
      skills: { 'Ride': 10, 'Drive (Horses)': -5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 37,
    name: 'Born on Saint\'s Feast Day',
    description: 'Your birth coincided with a holy day, marking you as blessed. The Church believes divine favor rests upon you, granting spiritual fortitude.',
    modifiers: {
      attributes: { POW: 5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 38,
    name: 'Traveled in Arabia',
    description: 'You journeyed to the lands of Islam, studying at centers of learning. You gained knowledge of mathematics, medicine, or astronomy but grew distant from Christian doctrine.',
    modifiers: {
      skills: { 'Religion': -5 }
    },
    requiresSpecialization: 'Science',
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 39,
    name: 'Fell into Freezing River',
    description: 'Nearly drowned in icy waters, emerging deaf in one ear from the cold. Your hearing suffered permanently, but you became a strong swimmer from the ordeal.',
    modifiers: {
      skills: { 'Listen': -10, 'Swim': 5 }
    },
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null
  },
  {
    roll: 40,
    name: 'Twist of Fate',
    description: 'Your life has been marked by exceptional circumstances. Roll twice more on this table, experiencing multiple formative events (ignore further rolls of 40).',
    modifiers: {},
    sourceType: 'core',
    source: 'Call of Cthulhu: Dark Ages 3e',
    page: null,
    special: 'roll-twice'
  }
];
