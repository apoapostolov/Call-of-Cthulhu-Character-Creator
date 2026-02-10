import type { DecadeConfig } from './types';

export const DECADES: DecadeConfig[] = [
    {
        name: '2020s',
        displayName: 'The 2020s',
        prompt: {
            artStyle: "Crisp, hyper-realistic digital photography. High-definition, often with a clean, slightly desaturated, cinematic color grade.",
            fashion: "Practical & comfortable. Athleisure, tech-wear, tailored casual (slim-fit jeans, quality hoodies), face masks. Professional wear is relaxed, often seen through a webcam.",
            looks: "Natural hair textures are common. For men, well-groomed beards or clean-shaven looks. For women, a mix of natural makeup and bold, expressive styles.",
            mannerisms: "Often seen looking at a smartphone. A sense of weariness or 'Zoom fatigue'. Socially conscious, but also digitally detached. A general air of anxiety.",
            politicsAndMood: "A mood of global crisis, political polarization, social upheaval, and widespread misinformation. A tangible sense of anxiety and uncertainty about the future.",
            technology: "Sleek smartphones, wireless earbuds, laptops, ubiquitous smart devices. Technology is seamlessly integrated into daily life."
        },
    },
    {
        name: '2010s',
        displayName: 'The 2010s',
        prompt: {
            artStyle: "Cinematic, clean, high-definition digital art, emulating the look of modern blockbuster films and high-end TV series.",
            fashion: "Slim-fit everything. Skinny jeans, tailored suits, v-neck t-shirts. Hipster aesthetics (plaid shirts, beanies). Early decade had brighter colors, late decade was more minimalist.",
            looks: "For men, undercuts, groomed beards. For women, long, styled hair, 'Instagram-ready' makeup with defined eyebrows.",
            mannerisms: "The 'selfie' pose. Constantly checking a smartphone. A cultivated air of detached cool or earnest sincerity.",
            politicsAndMood: "Post-recession optimism giving way to rising populism and social media-fueled activism. A sense of technological acceleration and corporate-like globalism.",
            technology: "The rise of the iPhone and Android smartphones. Tablets, sleek laptops. Social media becomes dominant."
        },
    },
    {
        name: '2000s',
        displayName: 'The 2000s',
        prompt: {
            artStyle: "Resembles early 2000s action thrillers like the Bourne series; slightly desaturated, gritty, with a high-contrast digital look. Handheld camera feel.",
            fashion: "Post-9/11 practicality. Boot-cut jeans, polo shirts, cargo pants. Early decade had more nu-metal/skater influences. Bulky tactical gear for professionals.",
            looks: "For men, spiky hair, goatees. For women, straightened hair with layers, thinner eyebrows. A more casual, less polished look than later decades.",
            mannerisms: "Less phone-centric. A more direct, less ironic communication style. A sense of heightened alert and seriousness in professional settings.",
            politicsAndMood: "Defined by the September 11th attacks and the subsequent War on Terror. A mood of heightened security, patriotism, fear, and a burgeoning surveillance state.",
            technology: "Chunky flip phones and candy bar phones (Nokia). Bulky CRT monitors and early LCD screens. Dial-up and early broadband internet. The iPod."
        },
    },
    {
        name: '1990s',
        displayName: 'The 1990s',
        prompt: {
            artStyle: "Mimic the look of 90s film stock (e.g., Kodak Gold), slightly grainy with a cooler color temperature. Think The X-Files or Silence of the Lambs.",
            fashion: "Anti-fashion. Grunge (flannels, ripped jeans, band t-shirts). Corporate casual (pleated khakis, oversized blazers). For federal agents, boxy, ill-fitting suits with wide ties.",
            looks: "For men, 'curtains' hairstyle or short and messy. For women, 'The Rachel' haircut, or simple, less-styled looks. Minimalist makeup.",
            mannerisms: "A cynical, detached posture. Slouching. Eye-rolling. An air of ironic detachment and skepticism towards authority.",
            politicsAndMood: "Post-Cold War ennui. A mood of anti-government suspicion, paranoia about conspiracies, and a general sense of cynical apathy. The dot-com boom brought underlying optimism.",
            technology: "Beepers, chunky brick-like cell phones (if any). Desktop computers with beige towers running Windows 95. The sound of a dial-up modem."
        },
    },
    {
        name: '1980s',
        displayName: 'The 1980s',
        prompt: {
            artStyle: "Emulate 80s film stock, which could be high-gloss and vibrant like a blockbuster, or gritty and neon-lit like a noir thriller. A slight softness to the focus.",
// FIX: Corrected fashion description to be more accurate and distinct from 'looks'.
            fashion: "Power dressing. Suits with large shoulder pads for both genders. Bold, often neon, colors. For casual wear, high-waisted jeans ('mom jeans'), Members Only jackets, polo shirts with popped collars, and sweatshirts.",
// FIX: Corrected a copy-paste error and provided an accurate 'looks' description for the 1980s.
            looks: "For men, mustaches, mullets, or clean-cut 'yuppie' styles. For women, big, voluminous hair (perms, teased bangs) and bold makeup with bright colors (blue eyeshadow, strong blush).",
            mannerisms: "Confident, often arrogant posture. Direct eye contact. A sense of ambition and materialism. Smoking is more common in professional settings.",
            politicsAndMood: "Height of the Cold War. A mood of capitalist excess, consumerism, and nuclear dread. A belief in American exceptionalism juxtaposed with deep-seated paranoia about Soviet influence.",
            technology: "Walkman cassette players. Car phones (if wealthy). Early personal computers are rare. VCRs. Technology is clunky, beige, and utilitarian."
        },
    },
    {
        name: '1970s',
        displayName: 'The 1970s',
        prompt: {
            artStyle: "Emulate 1970s film photography (e.g., Ektachrome) with warm, desaturated tones, distinct film grain, and lens flares. Inspired by paranoid thrillers like 'Three Days of the Condor'.",
            fashion: "Earth tones (brown, orange, green, yellow). Wide lapels, bell-bottom pants, turtlenecks under jackets. Polyester leisure suits. For women, flowing dresses and high-waisted jeans.",
// FIX: Added the missing 'looks' property to conform to the DecadePromptConfig type.
            looks: "Longer hair for men, with prominent sideburns and mustaches. For women, feathered hair or afros. A more natural, less 'made-up' look.",
            mannerisms: "A more relaxed, often slouched posture. A world-weary and cynical attitude. Less formal than previous decades. Constant smoking in offices.",
            politicsAndMood: "Post-Watergate and Vietnam disillusionment. A mood of deep institutional distrust, paranoia, and societal decay. A feeling that the system is broken.",
            technology: "Rotary phones or push-button landlines. Typewriters are standard. Mainframe computers exist but are inaccessible to individuals. Reel-to-reel tape recorders."
        },
    },
    {
        name: '1960s',
        displayName: 'The 1960s',
        prompt: {
            artStyle: "A clean, sharp look reminiscent of classic spy thrillers or Technicolor films. Early 60s are more formal (like 'Mad Men'), late 60s can be more psychedelic and chaotic.",
            fashion: "Early 60s: Sharp, tailored suits, skinny ties, fedoras for men. Pencil skirts and beehive hairstyles for women. Late 60s: More casual, influenced by counter-culture.",
            looks: "Clean-shaven, short, neatly parted hair for men. For women, bouffant and bob hairstyles with winged eyeliner.",
            mannerisms: "Formal and composed posture. A sense of professional decorum. More rigid social roles. Smoking and drinking in the office is commonplace.",
            politicsAndMood: "The peak of the Cold War. A mood of modernist optimism and technological progress hiding a dark underbelly of espionage, secret wars, and social turmoil. JFK's 'Camelot' gives way to assassination and unrest.",
            technology: "Electromechanical devices. Rotary phones. Typewriters. Microfilm readers. Transistor radios. Technology is analog and substantial."
        },
    },
    {
        name: '1950s',
        displayName: 'The 1950s',
        prompt: {
            artStyle: "Black and white film noir aesthetic. High-contrast, dramatic shadows, inspired by classic detective films and early television dramas. A sense of post-war grit.",
            fashion: "Conservative and formal. Men wear dark, single-breasted suits, often with a fedora or trilby hat and a trench coat. Women wear structured dresses, pencil skirts, and gloves.",
            looks: "For men, short, neat hairstyles like crew cuts or slicked-back hair. Clean-shaven is the norm. For women, meticulously coiffed short hair (e.g., Italian cut, pin curls) and bold red lipstick.",
            mannerisms: "A formal, somewhat rigid posture. A general air of seriousness and conformity. Smoking cigarettes is extremely common in all professional and social settings.",
            politicsAndMood: "The height of the Cold War and the Red Scare. A mood of intense paranoia, anti-communist hysteria (McCarthyism), and nuclear anxiety, hidden beneath a veneer of wholesome suburban prosperity and conformity.",
            technology: "Heavy, black Bakelite rotary phones. Teletype machines for communication. Bulky, room-sized vacuum tube computers are the pinnacle of technology. Microfilm is used for records. Cars are large with prominent tailfins."
        },
    },
];