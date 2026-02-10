import type { Occupation } from '../../types';
import { SKILL_SPECIALIZATIONS } from '../../skill-specializations-data';

export const OCCUPATIONS: Occupation[] = [
    {
        name: 'Acrobat',
        description: 'Circus and music hall performers who make their living by feats of strength and skill—trapeze artists, tightrope walkers, strongmen and strongwomen, tumblers, and contortionists.',
        group: 'Entertainer',
        skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
        creditRatingRange: { min: 9, max: 20 },
        occupationalSkills: ['Charm', 'Climb', 'Fast Talk', 'First Aid', 'Jump', 'Psychology'],
        choiceGroups: [
            { count: 2, options: ['*'] }
        ],
        suggestedContacts: 'actors, performers, show people',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working Class**: Manual laborers, servants, factory workers, and others who earn their living through physical work. Limited education and resources, but often possess practical skills and community connections.'
    },
    {
        name: 'Adventuress',
        description: 'A woman who, by her public association with upper-class lovers and admirers, manages to gain power, respect, wealth, and sometimes reluctant approval from Victorian society.',
        group: 'Upper Class',
        skillPoints: 'EDU × 2 + (APP × 2 or INT × 2)',
        creditRatingRange: { min: 10, max: 80 },
        occupationalSkills: ['Charm', 'First Aid', 'Persuade', 'Psychology', 'Ride', 'Stealth'],
        choiceGroups: [
            { count: 1, options: SKILL_SPECIALIZATIONS['Art and Craft'] },
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'aristocrats, royalty, artists, actors, dramatists, playwrights',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Upper Class (temporarily)**: Wealth and privilege through patronage rather than birth. Enjoys aristocratic lifestyle and social connections, but status depends on maintaining powerful benefactors and can be quickly lost.'
    },
    {
        name: 'Alienist',
        description: 'Mental health care in this age is in its infancy. An investigator with this occupation is likely to be a medical doctor interested in "hysteria" or "nervous afflictions," perhaps employed in an insane asylum.',
        group: 'Professional',
        skillPoints: 'EDU × 2 + INT × 2',
        creditRatingRange: { min: 30, max: 80 },
        occupationalSkills: ['First Aid', 'Language (Latin)', 'Library Use', 'Medicine', 'Psychology', 'Science (Biology)', 'Science (Pharmacy)'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'alienists, coroners, hospital staff, patients and their relatives, pharmacists, police, other physicians',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle to Upper Class**: Educated professionals with university degrees and specialized training. Respected members of society with comfortable incomes and social standing. **Important**: Use Physician occupation template with Alienism skill as personal specialty. There is no Psychoanalysis skill in this era, but Alienism is identical in effect.'
    },
    {
        name: 'Antiquarian',
        description: 'Not as specialized as an archaeologist, may be anything from a distinguished antique seller to a book dealer, an amateur archaeologist, or museum curator.',
        group: 'Academic',
        skillPoints: 'EDU × 2 + INT × 2',
        creditRatingRange: { min: 10, max: 70 },
        occupationalSkills: ['Art and Craft (any)', 'Credit Rating', 'Library Use', 'Language (Other)', 'Persuade', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['Archaeology', 'History'] },
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'antique dealers, archaeologists, curators, Egyptologists, fences, historical societies, researchers, translators, universities, other antiquarians',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle to Upper Class**: Educated elite with substantial resources for collecting and research. Often independently wealthy or supported by institutions, with extensive scholarly and social networks.'
    },
    {
        name: 'Aristocrat',
        description: 'A person born to a titled family. May have responsibilities in military, government, or Church, or simply collect rents and vote in the House of Lords.',
        group: 'Upper Class',
        skillPoints: 'EDU × 2 + (APP × 2 or INT × 2)',
        creditRatingRange: { min: 50, max: 99 },
        occupationalSkills: ['Firearms (Rifle/Shotgun)', 'History', 'Language (Latin)', 'Language (Other)', 'Law', 'Persuade', 'Ride'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'Anglican bishops, employees, fellow "old boys" from school, high-ranking military officers, royalty, senior civil servants, servants, tenants, other aristocrats',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Upper Class**: Hereditary nobility with titles, vast estates, and enormous social influence. Born to privilege with extensive education, political power, and responsibility for managing large properties and dependents.'
    },
    {
        name: 'Artist',
        description: 'Creators of works ranging from paintings to sculptures. May be favored by upper classes as dandies or bon vivants, or exist as anarchic misanthropes devoted only to art.',
        group: 'Entertainer',
        skillPoints: 'EDU × 2 + (POW × 2 or INT × 2)',
        creditRatingRange: { min: 9, max: 50 },
        occupationalSkills: ['Art and Craft (any)', 'History', 'Language (Other)', 'Library Use', 'Persuade', 'Spot Hidden'],
        choiceGroups: [
            { count: 2, options: ['*'] }
        ],
        suggestedContacts: 'art dealers, clients, models, photographers, political radicals, Royal Academy members, other artists, "bohemians" (poets, actors, etc.)',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Any Class**: Artists can come from any social background, though success often depends on patronage. Working-class artists struggle for recognition, while those with upper-class connections enjoy greater opportunities and financial security.'
    },
    {
        name: 'Author',
        description: 'Writers of essays, poetry, novels, or plays. Following Sherlock Holmes\'s 1887 debut, many produce detective fiction. Science fiction blossoms in the 1890s thanks to H.G. Wells.',
        group: 'Academic',
        skillPoints: 'EDU × 4',
        creditRatingRange: { min: 9, max: 50 },
        occupationalSkills: ['Art and Craft (Writing)', 'History', 'Library Use', 'Persuade', 'Psychology'],
        choiceGroups: [
            { count: 1, options: ['Language (Other)', 'Language (Own)'] },
            { count: 2, options: ['*'] }
        ],
        suggestedContacts: '"bohemians" (actors, poets, etc.), journalists, political radicals, publishers, readers, other authors',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle Class (rarely Upper)**: Educated writers with literary aspirations. Success varies greatly—established authors enjoy comfortable middle-class life, while struggling writers may live in poverty despite their education and talent.'
    },
    {
        name: 'Blacksmith',
        description: 'The lynchpin of rural communities and essential for urban horse and carriage maintenance. In London, the expanding Underground provides new opportunities.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + STR × 2',
        creditRatingRange: { min: 1, max: 20 },
        occupationalSkills: ['Accounting', 'Animal Handling', 'Art and Craft (Blacksmithing)', 'Fighting (Brawl)', 'Mechanical Repair', 'Operate Heavy Machinery', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'businesspeople and other customers, landlords/publicans, the local community',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working Class**: Skilled craftsmen essential to community infrastructure. While working-class, successful blacksmiths can achieve modest prosperity and local respect through their indispensable trade skills.'
    },
    {
        name: 'Cabbie',
        description: 'Carriage drivers ubiquitous in London and indispensable for travel. Few know the city like a cabbie—every route, danger, and secret the streets hold.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + DEX × 2',
        creditRatingRange: { min: 9, max: 20 },
        occupationalSkills: ['Animal Handling', 'Drive Carriage', 'Jump', 'Mechanical Repair', 'Navigate', 'Persuade'],
        choiceGroups: [
            { count: 1, options: ['Fighting (Brawl)', 'Fighting (Whip)'] },
            { count: 1, options: ['Listen', 'Spot Hidden'] }
        ],
        suggestedContacts: 'repairmen and wheelwrights, regular customers, police officers, shop owners, other cab drivers',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working Class**: Urban laborers with specialized knowledge of city streets and transportation. Form extensive networks among themselves and observe all levels of society through their work. **Note (Pulp Cthulhu)**: Optionally replace one skill with Lore (London).'
    },
    {
        name: 'Clergy',
        description: 'Church ministers ranging from casual clergymen who collect parish funds while pursuing hobbies, to dedicated shepherds devoted to their flock\'s welfare.',
        group: 'Professional',
        skillPoints: 'EDU × 2 + (POW × 2 or INT × 2)',
        creditRatingRange: { min: 9, max: 60 },
        occupationalSkills: ['History', 'Language (Latin)', 'Library Use', 'Persuade', 'Psychology', 'Religion'],
        choiceGroups: [
            { count: 2, options: ['*'] }
        ],
        suggestedContacts: 'charitable organizations, local landowners, parishioners (all classes), reform societies, other clergy (curates, bishops, etc.)',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle Class (rarely Upper)**: Educated religious professionals with university training. Wealthier parishes are controlled by upper-class families, while rural clergy may live modestly but enjoy universal respect and access to all social levels.'
    },
    {
        name: 'Consulting Detective',
        description: 'Distinguished from inquiry agents by intellectual approach and upper-class clientele. Often guides police investigations or employs agents for legwork.',
        group: 'Investigative',
        skillPoints: 'EDU × 2 + INT × 2',
        creditRatingRange: { min: 20, max: 50 },
        occupationalSkills: ['Anthropology', 'Language (Other)', 'Law', 'Library Use', 'Psychology', 'Science (Chemistry)', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'booksellers and librarians, clients, inquiry agents, museum curators, police, scientists (amateurs and scholars)',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle to Upper Class**: Highly educated intellectual investigators serving wealthy clientele. Combine scholarly knowledge with deductive reasoning, often working independently or consulting for official authorities.'
    },
    {
        name: 'Craftspeople',
        description: 'Skilled workers creating goods or services: coopers, tailors, glassblowers, carpenters, bakers, jewelers, and countless others essential to Victorian commerce.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + DEX × 2',
        creditRatingRange: { min: 5, max: 50 },
        occupationalSkills: ['Accounting', 'Art and Craft (any)', 'Mechanical Repair', 'Natural World'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Persuade'] },
            { count: 1, options: ['Listen', 'Spot Hidden'] },
            { count: 2, options: ['*'] }
        ],
        suggestedContacts: 'clients, shopkeepers, suppliers, other craftspeople',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Lower to Middle Class**: Skilled artisans whose social status depends on their craft\'s prestige and business success. Ranges from struggling laborers to prosperous business owners serving upper-class clientele.'
    },
    {
        name: 'Criminal (Gonoph)',
        description: 'Generic street criminal ranging from lowly pickpockets to leg-breakers, fraudsters, and burglars. The life can be both rewarding and precarious.',
        group: 'Criminal',
        skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
        creditRatingRange: { min: 0, max: 65 },
        occupationalSkills: ['Disguise', 'Fighting (Brawl)', 'Locksmith', 'Sleight of Hand', 'Stealth', 'Spot Hidden', 'Survival (Street)'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk'] }
        ],
        suggestedContacts: 'crime lords, fences, gang members, pimps, policemen, pub landlords, sex workers, slum community, solicitors, other criminals',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working/Criminal Class**: Street-level criminals operating outside respectable society. While technically working-class, they exist in the shadow economy with connections to both the underworld and corrupt officials.'
    },
    {
        name: 'Housebreaker (Cracksman)',
        description: 'Professional housebreaker skilled with locks and safes, working with accomplices. May employ "snakesmen" (children) to gain entry or corrupt servants for inside jobs.',
        group: 'Criminal',
        skillPoints: 'DEX × 2 + INT × 2',
        creditRatingRange: { min: 5, max: 20 },
        occupationalSkills: ['Appraise', 'Climb', 'Mechanical Repair', 'Listen', 'Locksmith', 'Spot Hidden', 'Stealth'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'crime lords, fences, gang members, corrupt servants, other criminals',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working/Criminal Class**: Specialized burglars with technical skills for bypassing security. More sophisticated than street criminals but still operating outside legitimate society.'
    },
    {
        name: 'Footpad',
        description: 'A robber who works alone, carefully selecting victims for maximum return at minimum risk. Expert at stalking marks and identifying the perfect moment to strike.',
        group: 'Criminal',
        skillPoints: 'INT × 2 + STR × 2',
        creditRatingRange: { min: 0, max: 10 },
        occupationalSkills: ['Fighting (Brawl)', 'Intimidate', 'Listen', 'Persuade', 'Psychology', 'Spot Hidden', 'Stealth'],
        choiceGroups: [
            { count: 1, options: ['Navigate (Own City)', 'Track'] }
        ],
        suggestedContacts: 'local gang members, fences, corrupt police, underworld contacts',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working/Criminal Class**: Solitary predators who study their victims methodically. Operate with calculated violence and territorial knowledge, representing a more thoughtful approach to street crime.'
    },
    {
        name: 'Confidence Trickster (Magsman)',
        description: 'Con artist specializing in sleight of hand—fairground games, street cons, and elaborate schemes where marks are encouraged to bet against rigged outcomes.',
        group: 'Criminal',
        skillPoints: 'EDU × 2 + APP × 2',
        creditRatingRange: { min: 10, max: 30 },
        occupationalSkills: ['Art and Craft (Acting)', 'Fast Talk', 'Listen', 'Persuade', 'Psychology', 'Sleight of Hand', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'fairground workers, marks, accomplices, other con artists',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working/Criminal Class**: Street-level confidence tricksters using performance skills to deceive victims. Operate in public spaces and rely on quick wit and manual dexterity to avoid detection.'
    },
    {
        name: 'Swindler (Macer)',
        description: 'Higher-class swindler who creates debt through rigged games and compounds it through credit schemes, often moving in respectable social circles.',
        group: 'Criminal',
        skillPoints: 'EDU × 2 + APP × 2',
        creditRatingRange: { min: 20, max: 40 },
        occupationalSkills: ['Accounting', 'Art and Craft (Acting)', 'Charm', 'Fast Talk', 'Persuade', 'Psychology', 'Sleight of Hand'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'wealthy marks, gambling establishments, accomplices, corrupt officials',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working/Criminal Class**: Sophisticated swindlers who infiltrate higher social circles. Use refined manners and apparent respectability to bilk middle and upper-class victims through complex financial schemes.'
    },
    {
        name: 'Robber (Rampsman)',
        description: 'Violent robber resorting to opportunistic assault and robbery. Primarily territorial with strong local contacts, often recruited as muscle for gang jobs.',
        group: 'Criminal',
        skillPoints: 'STR × 2 + DEX × 2',
        creditRatingRange: { min: 0, max: 10 },
        occupationalSkills: ['Climb', 'Disguise', 'Fighting (Brawl)', 'Intimidate', 'Listen', 'Psychology', 'Spot Hidden', 'Stealth'],
        choiceGroups: [],
        suggestedContacts: 'local gangs, fences, corrupt police, neighborhood criminals',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working/Criminal Class**: Brutal street criminals who rely on violence and intimidation. Territorial in nature, they represent the most direct and dangerous form of street crime in Victorian cities.'
    },
    {
        name: 'Forger (Screever)',
        description: 'Specialist in fake documents and testimonials. May write begging letters to fool the wealthy, or draw street art while scouting potential marks.',
        group: 'Criminal',
        skillPoints: 'INT × 2 + DEX × 2',
        creditRatingRange: { min: 5, max: 30 },
        occupationalSkills: ['Art and Craft (Chalk Art)', 'Art and Craft (Forgery)', 'Listen', 'Natural World', 'Psychology', 'Sleight of Hand'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk'] },
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'document brokers, corrupt officials, street artists, other forgers',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working/Criminal Class**: Educated criminals using artistic and writing skills for fraud. Bridge the gap between street crime and white-collar deception, often targeting charitable impulses of the wealthy.'
    },
    {
        name: 'Con Artist (Shofulman)',
        description: 'Specialist in small-time swindles using counterfeit currency, employing sleight of hand to fool marks into thinking they received real money.',
        group: 'Criminal',
        skillPoints: 'EDU × 2 + APP × 2',
        creditRatingRange: { min: 10, max: 30 },
        occupationalSkills: ['Accounting', 'Appraise', 'Art and Craft (Forgery)', 'Fast Talk', 'Intimidate', 'Persuade', 'Psychology', 'Spot Hidden'],
        choiceGroups: [],
        suggestedContacts: 'counterfeiters, fences, corrupt merchants, other con artists',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working/Criminal Class**: Currency-focused swindlers exploiting merchant transactions. Require knowledge of legitimate business practices to successfully deceive shopkeepers and traders with counterfeit money.'
    },
    {
        name: 'Street Gang Member',
        description: 'Member of territorial criminal gangs, from child urchins stealing food to professional pickpockets operating in polite society as "swell mobs."',
        group: 'Criminal',
        skillPoints: 'INT × 2 + DEX × 2',
        creditRatingRange: { min: 0, max: 10 },
        occupationalSkills: ['Dodge', 'Fast Talk', 'Fighting (Brawl)', 'Intimidate', 'Listen', 'Sleight of Hand', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'gang members, fences, local community, corrupt police',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working/Criminal Class**: Organized criminal groups controlling territory and specializing in theft. Range from desperate street urchins to sophisticated pickpockets who can blend into middle-class society.'
    },
    {
        name: 'Swell Mob Member',
        description: 'Professional pickpocket specializing in polite society, using fashionable dress to move undetected among the well-to-do in respectable areas.',
        group: 'Criminal',
        skillPoints: 'INT × 2 + DEX × 2',
        creditRatingRange: { min: 5, max: 20 },
        occupationalSkills: ['Charm', 'Disguise', 'Fast Talk', 'Fighting (Brawl)', 'Intimidate', 'Sleight of Hand', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'fashion contacts, wealthy marks, gang members, fences',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working/Criminal Class**: Elite pickpockets who can pass for middle-class. Their success depends on understanding and mimicking respectable society while maintaining criminal skills and underworld connections.'
    },
    {
        name: 'Military Officer',
        description: 'Former or serving officers from aristocratic families or bored gentry, either on voluntary reserve or unwanted by the army. Upper-class investigators with military experience.',
        group: 'Professional',
        skillPoints: 'EDU × 2 + (POW × 2 or APP × 2)',
        creditRatingRange: { min: 40, max: 80 },
        occupationalSkills: ['Fighting (Sword)', 'Firearms (Handgun)', 'Navigate', 'Persuade', 'Psychology', 'Ride', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['Swim', '*'] }
        ],
        suggestedContacts: 'ex-comrades, colonial administrators, foreign dignitaries',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle (rarely) or Upper Class**: Military officers from privileged backgrounds with formal training and command experience. Most are aristocratic second sons or gentry with substantial social connections and authority.'
    },
    {
        name: 'Military Enlisted/NCO',
        description: 'Former enlisted men or non-commissioned officers from working-class backgrounds. Often receive poor care from the government and may end up disabled or destitute.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
        creditRatingRange: { min: 9, max: 30 },
        occupationalSkills: ['Fighting (Brawl)', 'Firearms (Rifle/Shotgun)', 'First Aid', 'Survival'],
        choiceGroups: [
            { count: 1, options: ['Climb', 'Swim'] },
            { count: 1, options: ['Navigate', 'Track'] },
            { count: 2, options: ['Artillery (Rocket)', 'Demolitions', 'Mechanical Repair', 'Spot Hidden', 'Ride'] }
        ],
        suggestedContacts: 'ex-comrades, publicans',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working Class**: Former soldiers from enlisted ranks with practical military skills but little support from the government. Often struggle with poverty and disability after service, relying on military connections for survival.'
    },
    {
        name: 'Explorer',
        description: 'Famous Victorians like Dr. Livingstone racing to discover new territories, archaeological treasures, or cross dangerous wilderness. The more dangerous, the more appealing.',
        group: 'Academic',
        skillPoints: 'EDU × 2 + (APP × 2 or STR × 2 or DEX × 2)',
        creditRatingRange: { min: 45, max: 90 },
        occupationalSkills: ['Firearms (Rifle/Shotgun)', 'First Aid', 'Navigate', 'Language (Other)'],
        choiceGroups: [
            { count: 1, options: ['Anthropology', 'Archaeology', 'Survival'] },
            { count: 1, options: ['Climb', 'Swim'] },
            { count: 1, options: ['Natural World', 'Track'] },
            { count: 1, options: ['Pilot (Boat)', 'Ride'] }
        ],
        suggestedContacts: 'foreign dignitaries or communities, British diplomats, traders, club members, wealthy patrons, missionary societies, newspapers, publishers',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle to Upper Class**: Adventurous scholars and daredevils with substantial financial backing. Combine academic credentials with physical courage, often enjoying public fame and wealthy patronage for their expeditions.'
    },
    {
        name: 'Gentleman/Woman',
        description: 'Wealthy enough not to work, from landed gentry or newly rich industrial families. Free to pursue eccentric interests or crusading causes with their time and resources.',
        group: 'Upper Class',
        skillPoints: 'EDU × 2 + APP × 2',
        creditRatingRange: { min: 40, max: 98 },
        occupationalSkills: ['Art and Craft (any)', 'Language (Other)', 'Language (Other)', 'Ride'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 3, options: ['*'] }
        ],
        suggestedContacts: 'charitable organizations, club members, social peers, socialites, their servants',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle or Upper Class**: Independently wealthy individuals free from the necessity of work. Upper-class gentry with inherited estates or middle-class beneficiaries of industrial fortunes, both enjoying extensive education and social freedom.'
    },
    {
        name: 'Inquiry Agent',
        description: 'Victorian private detectives doing footwork for detective agencies, police, or consulting detectives. Handle the practical investigative work: interviews, surveillance, research.',
        group: 'Investigative',
        skillPoints: 'EDU × 2 + (APP × 2 or INT × 2)',
        creditRatingRange: { min: 10, max: 40 },
        occupationalSkills: ['Accounting', 'Law', 'Library Use', 'Locksmith', 'Psychology'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] },
            { count: 1, options: ['Listen', 'Spot Hidden'] },
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'clients, police, the underworld community',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working to Middle Class**: Professional investigators serving various clients from detective agencies to private individuals. Bridge between respectable middle-class society and the criminal underworld they investigate.'
    },
    {
        name: 'Inventor',
        description: 'Victorian visionaries driven to create world-changing devices in their workshops, constantly applying for patents and pestering established scientists with their revolutionary claims.',
        group: 'Academic',
        skillPoints: 'EDU × 2 + INT × 2',
        creditRatingRange: { min: 10, max: 50 },
        occupationalSkills: ['Electrical Repair', 'Library Use', 'Mechanical Repair', 'Science (any)', 'Spot Hidden', 'Natural World', 'Operate Heavy Machinery'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'scientists, local societies, journalists, suppliers',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Any Class**: Obsessed innovators who may come from any background but risk their social standing through eccentric behavior. Upper-class inventors may be seen as embarrassing eccentrics by their peers. **Note**: This occupation may diminish an upper-class hero\'s standing in society.'
    },
    {
        name: 'Journalist',
        description: 'Writers for the hundreds of London newspapers and periodicals, ranging from muck-raking hacks to social crusaders and cultural critics centered around Fleet Street.',
        group: 'Professional',
        skillPoints: 'EDU × 2 + (APP × 2 or INT × 2)',
        creditRatingRange: { min: 9, max: 40 },
        occupationalSkills: ['Library Use', 'Listen', 'Language (Own)', 'Persuade'],
        choiceGroups: [
            { count: 1, options: ['Accounting', 'Law'] },
            { count: 1, options: ['Art and Craft (Photography)', 'History'] },
            { count: 1, options: ['Charm', 'Fast Talk'] },
            { count: 1, options: ['Psychology', 'Spot Hidden'] }
        ],
        suggestedContacts: 'high society or authority figures, news industry, police, street criminals',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle Class (a few Working)**: Educated writers for newspapers and magazines. While technically middle-class professionals, some beat reporters come from working-class backgrounds and can be rough-edged despite their literary work.'
    },
    {
        name: 'Laborer',
        description: 'Unskilled and semi-skilled workers including carters, construction workers, mill-workers, dockworkers, miners, and agricultural workers living hand-to-mouth.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
        creditRatingRange: { min: 1, max: 10 },
        occupationalSkills: ['Fighting (Brawl)', 'Intimidate'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk'] },
            { count: 1, options: ['Mechanical Repair', 'Natural World'] },
            { count: 3, options: ['Climb', 'Art and Craft (any)', 'Drive Carriage', 'Operate Heavy Machinery', 'Pilot (Boat)', 'Ride'] },
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'bartenders, other workers, supervisors, own community',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working Class**: The foundation of Victorian industrial society, performing essential but poorly paid physical labor. Live precariously with little job security, often forming tight community bonds for mutual support.'
    },
    {
        name: 'Chimney Sweep',
        description: 'Essential workers who remove soot from household chimneys. Gain unprecedented access to homes, with some acting as criminal spotters while others earn trust as honorable tradesmen.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
        creditRatingRange: { min: 10, max: 20 },
        occupationalSkills: ['Intimidate', 'Art and Craft (Sweep)'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk'] },
            { count: 1, options: ['Fighting (Brawl)'] },
            { count: 1, options: ['Mechanical Repair', 'Natural World'] },
            { count: 3, options: ['Climb', 'Art and Craft (any)', 'Drive Carriage', 'Operate Heavy Machinery', 'Pilot (Boat)', 'Ride'] },
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'homeowners, criminal gangs (as spotters), other tradesmen',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working Class**: Specialized laborers with unique access to private homes across all social classes. Some maintain strict honesty while others exploit their position for criminal intelligence, making them valuable but potentially dangerous contacts. **Note (Pulp Cthulhu)**: Chimney sweeps are rulers of the rooftops and seek to contain darker influences from the streets below.'
    },
    {
        name: 'Gravedigger',
        description: 'Workers in sprawling municipal cemeteries who know that the dead do not always rest in peace. Take pride in their knowledge of those buried under their care.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
        creditRatingRange: { min: 1, max: 10 },
        occupationalSkills: ['Intimidate', 'Fighting (Shovel)'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk'] },
            { count: 1, options: ['Mechanical Repair', 'Natural World'] },
            { count: 3, options: ['Climb', 'Art and Craft (any)', 'Drive Carriage', 'Operate Heavy Machinery', 'Pilot (Boat)', 'Ride'] },
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'funeral directors, cemetery visitors, local clergy, fellow workers',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working Class**: Manual laborers dealing with death daily in Victorian cemeteries. Develop intimate knowledge of local mortality and burial practices, often witnessing supernatural phenomena that others dismiss as imagination.'
    },
    {
        name: 'Sexton',
        description: 'Church workers performing varied duties from handyman to bellringer to gravedigger. Some take pride in their comprehensive knowledge of cemetery residents.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
        creditRatingRange: { min: 1, max: 10 },
        occupationalSkills: ['Intimidate'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk'] },
            { count: 1, options: ['Fighting (Shovel)', 'Art and Craft (Bellringing)'] },
            { count: 1, options: ['Mechanical Repair', 'Natural World'] },
            { count: 3, options: ['Climb', 'Art and Craft (any)', 'Drive Carriage', 'Operate Heavy Machinery', 'Pilot (Boat)', 'Ride'] },
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'clergy, parishioners, funeral directors, local community',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working Class**: Church maintenance workers combining religious service with practical labor. Bridge between sacred and secular worlds, often possessing both spiritual insight and intimate knowledge of community secrets.'
    },
    {
        name: 'Navvy',
        description: 'The ultimate manual laborers building canals and railways. Predominantly Irish workers drawn by higher wages, living in self-regulating shanty towns that move with the work.',
        group: 'Manual Labor',
        skillPoints: 'STR × 2 + (DEX × 2 or INT × 2)',
        creditRatingRange: { min: 5, max: 15 },
        occupationalSkills: ['Intimidate', 'Demolitions', 'Science (Engineering)'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk'] },
            { count: 1, options: ['Mechanical Repair', 'Natural World'] },
            { count: 1, options: ['Lore (Ireland, China, or other country)'] },
            { count: 2, options: ['Climb', ...SKILL_SPECIALIZATIONS['Art and Craft'], 'Drive Carriage', 'Operate Heavy Machinery', 'Pilot (Boat)', 'Ride'] },
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'fellow navvies, railway companies, local publicans, Irish community',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working Class**: Elite manual laborers with specialized skills in construction and explosives. Often Irish immigrants forming tight-knit, mobile communities that are self-governing but viewed with suspicion by locals due to their rough reputation.'
    },
    {
        name: 'Physician',
        description: 'Medical professionals ranging from general practitioners to specialists, dentists, and surgeons. Some serve as police surgeons or medical examiners for mysterious deaths.',
        group: 'Professional',
        skillPoints: 'EDU × 2 + INT × 2',
        creditRatingRange: { min: 30, max: 80 },
        occupationalSkills: ['First Aid', 'Language (Latin)', 'Library Use', 'Medicine', 'Psychology', 'Science (Biology)', 'Science (Pharmacy)'],
        choiceGroups: [
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'alienists, coroners, hospital staff, patients and their relatives, pharmacists, police, other physicians',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle to Upper Class**: Highly educated medical professionals with university training and substantial social standing. Harley Street practices serve the wealthy, while others work with police or in hospitals serving all classes.'
    },
    {
        name: 'Police Constable',
        description: 'Country constables and London bobbies walking foggy streets. Working-class officers with local knowledge and community connections, forming the backbone of Victorian policing.',
        group: 'Investigative',
        skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
        creditRatingRange: { min: 10, max: 60 },
        occupationalSkills: ['Fighting (Club)', 'First Aid', 'Law', 'Listen', 'Psychology', 'Stealth', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['Intimidate', 'Persuade'] }
        ],
        suggestedContacts: 'cab drivers, costermongers, crime victims, criminals, gutter-press journalists, informants, servants and householders on their beat, solicitors, serving and ex-police',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working to Middle Class**: Professional law enforcement officers maintaining public order. Constables are typically working-class with local connections, while senior ranks achieve middle-class respectability through their authority and steady income.'
    },
    {
        name: 'Police Detective',
        description: 'Members of the Criminal Investigation Department (CID) of Scotland Yard. Middle-class officers with investigative training and access to inside information.',
        group: 'Investigative',
        skillPoints: 'EDU × 2 + (STR × 2 or DEX × 2)',
        creditRatingRange: { min: 10, max: 60 },
        occupationalSkills: ['Fighting (Brawl)', 'Firearms (Handgun)', 'Law', 'Listen', 'Psychology', 'Stealth', 'Spot Hidden'],
        choiceGroups: [
            { count: 1, options: ['Intimidate', 'Persuade'] }
        ],
        suggestedContacts: 'cab drivers, costermongers, crime victims, criminals, gutter-press journalists, informants, servants and householders on their beat, solicitors, serving and ex-police',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working to Middle Class**: Specialized investigators with enhanced authority and training. Detectives typically achieve middle-class status through their education and investigative responsibilities, often having restrictions on sharing information with civilians.'
    },
    {
        name: 'Scientist',
        description: 'Researchers in fields from astronomy to weaponry, employed by government, universities, or industrialists. May be self-funded with contacts among the military and wealthy patrons.',
        group: 'Academic',
        skillPoints: 'EDU × 2 + (POW × 2 or INT × 2)',
        creditRatingRange: { min: 10, max: 50 },
        occupationalSkills: ['Electrical Repair', 'Language (Other)', 'Library Use', 'Mechanical Repair'],
        choiceGroups: [
            { count: 1, options: ['Fast Talk', 'Persuade'] },
            { count: 3, options: SKILL_SPECIALIZATIONS['Science'] }
        ],
        suggestedContacts: 'foreign powers, the military, the Royal Society, universities, wealthy patrons, other scientists',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Middle Class**: Educated researchers with specialized knowledge and institutional affiliations. Combine theoretical understanding with practical application, often serving government or industrial interests while maintaining scholarly independence.'
    },
    {
        name: 'Servant',
        description: 'Domestic workers including butlers, valets, maids, cooks, and gardeners. May be trusted confidants of wealthy families or manipulative figures extracting information from all classes.',
        group: 'Manual Labor',
        skillPoints: 'EDU × 2 + INT × 2',
        creditRatingRange: { min: 2, max: 30 },
        occupationalSkills: ['Art and Craft (Domestic Service)', 'Listen', 'Stealth'],
        choiceGroups: [
            { count: 1, options: ['Charm', 'Fast Talk'] },
            { count: 3, options: ['Accounting', 'Appraise', 'Drive Carriage', 'First Aid', 'Language (Other)', 'Mechanical Repair', 'Persuade', 'Psychology'] },
            { count: 1, options: ['*'] }
        ],
        suggestedContacts: 'police constables, relatives, shopkeepers, tradesmen, other servants',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Working Class (possibly Middle)**: Domestic employees whose status depends on their employer\'s wealth and their own position. Butlers to royalty achieve quasi-middle-class standing, while ordinary maids remain working-class despite intimate access to upper-class secrets.'
    },
    {
        name: 'Spy',
        description: 'Secret agents from Scotland Yard\'s Special Branch, foreign governments, or British colonial service. Operating in the era of the "Great Game" between Britain and Russia for Central Asian control.',
        group: 'Investigative',
        skillPoints: 'EDU × 2 + APP × 2',
        creditRatingRange: { min: 10, max: 70 },
        occupationalSkills: ['Disguise', 'Language (Other)', 'Navigate', 'Psychology', 'Spot Hidden', 'Stealth'],
        choiceGroups: [
            { count: 1, options: ['Fighting (Brawl)', 'Firearms (Handgun)', 'Firearms (Rifle/Shotgun)'] },
            { count: 1, options: ['Charm', 'Fast Talk', 'Intimidate', 'Persuade'] }
        ],
        suggestedContacts: 'local folk, own spymaster, government officials, other spies',
        source: "Cthulhu by Gaslight Investigator's Guide",
        special: '**Any Class**: Covert operatives who may come from any social background depending on their mission requirements. Their true social status is often hidden behind assumed identities, with access to resources and authority that transcend normal class boundaries.'
    }
];
// HMR test

