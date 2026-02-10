import type { Nationality, ThemeConfig, Emotion, Theme, DecadeConfig, AttributeSet, Attribute, DamagedVeteranOption, Disorder, Profession, Department } from './types';
import { ATTRIBUTE_SCORE_DESCRIPTORS } from './attribute-descriptors';

const getDescriptorsForAttributes = (attributes: AttributeSet): string => {
    const descriptors: string[] = [];
    for (const attr of Object.keys(attributes) as Attribute[]) {
        const score = attributes[attr];
        const descriptor = ATTRIBUTE_SCORE_DESCRIPTORS[attr].find(d => score >= d.min && score <= d.max);
        if (descriptor) {
            descriptors.push(`- **${attr}:** ${descriptor.description}.`);
        }
    }
    return descriptors.join('\n');
}

// Departmental influence was removed for Call of Cthulhu portraits.


// --- Name Generation ---
export const getNameAndCodenamePrompt = (gender: string, characterConcept: string, nationality: Nationality, decadeConfig: DecadeConfig | undefined): string => {
    const decadeInfo = decadeConfig 
        ? `The codename should evoke the mood of the ${decadeConfig.displayName}. This was an era defined by: ${decadeConfig.prompt.politicsAndMood}`
        : "The codename should feel appropriate for the modern era.";

    return `Generate a single, plausible-sounding ${nationality} name and a clandestine codename for a ${gender} ${characterConcept}.
${decadeInfo}
The codename must be a single, memorable, all-caps word. It should be inspired by military, intelligence, or mythological terms, but should not be a common, overused one (e.g., VIPER, GHOST).
Provide the output in JSON format with two keys: "name" and "codename".

Example response:
{
  "name": "John Smith",
  "codename": "ARGUS"
}`;
};

export const getNamePrompt = (gender: string, characterConcept: string, nationality: Nationality): string => {
    return `Generate a single, plausible-sounding ${nationality} name for a ${gender} ${characterConcept}.
Provide the output in JSON format with one key: "name".

Example response:
{
  "name": "Jane Doe"
}`;
};

export const getCodenamePrompt = (characterConcept: string, decadeConfig: DecadeConfig | undefined): string => {
    const decadeInfo = decadeConfig 
        ? `The codename should evoke the mood of the ${decadeConfig.displayName}. This was an era defined by: ${decadeConfig.prompt.politicsAndMood}`
        : "The codename should feel appropriate for the modern era.";

    return `Generate a clandestine codename for a ${characterConcept}.
${decadeInfo}
The codename must be a single, memorable, all-caps word. It should be inspired by military, intelligence, or mythological terms, but should not be a common, overused one (e.g., VIPER, GHOST).
Provide the output in JSON format with one key: "codename".

Example response:
{
  "codename": "SPECTRE"
}`;
};

export const getEducationAndVitalsPrompt = (
    profession: Profession,
    department: Department | null
): string => {
    const context = department 
        ? `The individual is being considered for a role as a ${profession.name} within the ${department.name}.`
        : `The individual is being considered for a role as a ${profession.name}.`;

    return `You are generating core biographical details for a role-playing game character.
${context}

Provide a plausible educational background and a realistic starting age for this career.

**Instructions:**
1.  **Education:** Generate a concise educational history. This should include the type of degree and the name of a real-world university or institution appropriate for the profession and nationality (assume American unless specified).
2.  **Starting Age:** Determine a realistic age for someone to begin this career.
    -   There is an 80% chance the age should be between 21 and 24 (standard university graduate).
    -   There is a 10% chance the individual is a prodigy who started younger, between 18 and 20.
    -   There is a 10% chance the individual is a late-career changer, starting between 30 and 40.
3.  **JSON Output:** The final output MUST be ONLY a raw JSON object with two keys: "education" (a string) and "startingAge" (a number).

**Example Response for a 'Federal Agent' at the FBI:**
{
  "education": "B.A. in Criminology from the University of Virginia; J.D. from Georgetown University Law Center.",
  "startingAge": 26
}

**Example Response for a 'Computer Scientist' at the NSA:**
{
  "education": "B.S. in Computer Science from Carnegie Mellon University.",
  "startingAge": 22
}`;
};

// --- Portrait & Description Generation ---
export const getPhysicalDescriptionPrompt = (): string => {
    return `Analyze the provided full-body portrait of a character. Provide a brief, evocative physical description focusing on their build, posture, clothing, and overall demeanor. The description must be a single paragraph and no more than 250 characters.`;
};

export const getDistinguishingFeaturesPrompt = (description: string): string => {
    return `Based on the following physical description, identify **0 to 2** truly distinguishing features that a person would notice immediately. These should be out of the ordinary and memorable. Be highly selective; do not invent features if none are truly prominent.

For each feature you identify:
1.  Describe it in 2-3 words maximum.
// FIX: Changed "CHA" to "APP" to match the Attribute type definition.
2.  Assign it to the single most relevant core attribute from this list: "STR", "CON", "DEX", "INT", "POW", "APP".

Physical Description: "${description}"

The output MUST be a raw JSON array of objects. Each object must have a "feature" key (a string) and an "attribute" key (a string from the list above).

Example for two features:
[
  {
    "feature": "Thousand-yard stare",
    "attribute": "POW"
  },
  {
    "feature": "Weathered skin",
    "attribute": "CON"
  }
]

Example for one feature:
[
  {
    "feature": "Unwavering gaze",
    "attribute": "POW"
  }
]

Example for zero features:
[]`;
};

export const getPortraitPrompt = (
    characterConcept: string,
    gender: 'male' | 'female' | null,
    nationality: Nationality,
    career: string,
    archetypicalClothing: string,
    themeConfig: ThemeConfig,
    decadeConfig: DecadeConfig | undefined,
    attributes: AttributeSet | null,
    skillPackageDescriptor: string | null,
    damagedVeteranOption: DamagedVeteranOption | null,
    assignedDisorder: Disorder | null,
    age: number | null
): string => {
    const genderInstruction = gender ? `The character is ${gender}.` : `The gender is not specified; interpret freely.`;
    const ageInstruction = age ? `The character is approximately ${age} years old.` : 'The character\'s age is not specified.';
    const portraitPromptConfig = themeConfig?.portrait || {
        theme: "Lovecraftian investigation",
        setting: "era-appropriate investigative locales (dusty archives, rain-slick city streets, gaslit studies)",
        atmosphere: "unease and subtle dread; imply the uncanny without showing it; absolutely no monsters on-screen",
        visualStyle: "Period-true, painterly realism or period photography; restrained palette; chiaroscuro lighting; film grain appropriate to the era",
        additionalDetails: "The investigator's appearance reflects long nights of research and fieldwork; period details should be accurate and understated.",
    };

    const attributeSection = attributes ? `
**Visual Cues from Attributes:**
${getDescriptorsForAttributes(attributes)}` : '**Visual Cues:** Not specified.';

    const eraSection = decadeConfig ? `
**Operational Era: ${decadeConfig.displayName}**
-   **Art Style:** ${decadeConfig.prompt.artStyle}
-   **Political Mood & Atmosphere:** ${decadeConfig.prompt.politicsAndMood}
-   **Fashion & Appearance:** ${decadeConfig.prompt.fashion}. ${decadeConfig.prompt.looks}.
-   **Mannerisms & Posture:** ${decadeConfig.prompt.mannerisms}.
-   **Technology:** The investigator may be interacting with or surrounded by technology of the era: ${decadeConfig.prompt.technology}.
` : '**Era Specifics:** Not specified. Assume modern day.';

    const veteranProfileSection = damagedVeteranOption ? `
**Psychological Profile Addendum:**
- **Background Trauma:** ${damagedVeteranOption}.
- **Visual Interpretation:** ${
    (() => {
        switch (damagedVeteranOption) {
            case 'Extreme Violence': return "The agent's expression should carry a hint of barely suppressed rage or a hardened, detached look from witnessing extreme violence. They might have a small, faded scar on their face or hands.";
            case 'Captivity or Imprisonment': return "The agent should have a 'thousand-yard stare,' a look of someone who has endured prolonged helplessness. Their posture might be subtly defensive or withdrawn.";
            case 'Hard Experience': return "The agent looks older than their years, with a pragmatic and weary expression. Their eyes show the weight of difficult choices.";
            case 'Things Man Was Not Meant to Know': return `There is something subtly 'off' about the agent's eyes—a flicker of cosmic terror or manic insight. Their disorder, **${assignedDisorder?.name || 'an unknown affliction'}**, should be hinted at through a subtle physical manifestation (e.g., a nervous tic for anxiety, a haunted look for PTSD, clenched jaw for paranoia).`;
            default: return 'Not specified.';
        }
    })()
}` : '';

    const finalConcept = skillPackageDescriptor
        ? `A ${skillPackageDescriptor} who now works as a ${characterConcept}`
        : `A ${characterConcept}`;

    return `Generate a character portrait.
**Character Concept:** ${finalConcept}.
**Specific Career:** ${career}.
**Archetypical Attire:** ${archetypicalClothing}. The investigator should be dressed in this manner, adapted for the specified operational era.
**Gender:** ${genderInstruction}
**Age:** ${ageInstruction}
**Nationality:** ${nationality}.
${attributeSection}
${veteranProfileSection}
${eraSection}
**Core Theme Instructions:**
- Theme: ${portraitPromptConfig.theme}
- Setting: ${portraitPromptConfig.setting}
- Atmosphere: ${portraitPromptConfig.atmosphere}
- Visual Style: ${portraitPromptConfig.visualStyle}
- Additional Details: ${portraitPromptConfig.additionalDetails}
**Final Interpretation:** The final image should be a single character, full-body portrait, with a 9:16 aspect ratio. The character should be dressed in attire suitable for their role and the specified era. Ensure the art style and mood from the era specifics are prioritized.`;
};

export const getHeadshotPrompt = (): string => {
    return `Your SOLE function is to provide JSON coordinates for a bounding box. Analyze the provided full-body portrait.
    
Your goal is to define a perfectly SQUARE (1:1 aspect ratio) bounding box for a classic head-and-shoulders ID badge or dossier photo.

CRITICAL INSTRUCTIONS:
1.  **SQUARE BOX:** The 'width' and 'height' values in your JSON output MUST be identical.
2.  **FRAMING:** The box must frame the character's full head and shoulders. Do NOT include the torso below the collarbones, the waist, or arms.
3.  **CENTERING:** The character's face (specifically the point between their eyes) must be at the EXACT center of the square you define.
4.  **COORDINATES:** Use normalized coordinates from 0.0 to 1.0, where (x:0, y:0) is the top-left corner.

The output MUST be ONLY the raw JSON object. Do not add any extra text, markdown, or explanations.

Example of a PERFECT response:
{
  "x": 0.3,
  "y": 0.05,
  "width": 0.4,
  "height": 0.4
}`;
};

export const getEmotionalPortraitPrompt = (emotion: Emotion): string => {
    return `Re-render this character portrait. ${emotion.prompt}. Keep the character's features, clothing, and art style identical, only changing the facial expression. The output image must maintain the same aspect ratio.`;
};

export const getTraitsPrompt = (
    characterConcept: string,
    gender: string,
    theme: Theme,
    themes: Record<string, ThemeConfig>
): string => {
    const themeTraitsDescription = themes[theme]?.traits?.promptDescription || "in a standard fantasy setting.";
    return `Generate a short list of character traits for a ${gender} ${characterConcept} ${themeTraitsDescription}.
Provide three distinct traits: one positive physical trait, one positive mental/social trait, and one defining negative trait or flaw.
The output MUST be ONLY a raw JSON object with three keys: "positivePhysical", "positiveMental", and "negative".

Example response:
{
  "positivePhysical": "Has a steady, unwavering gaze.",
  "positiveMental": "Incredibly resourceful and quick-thinking under pressure.",
  "negative": "A deep-seated paranoia that makes it difficult to trust others."
}`;
};

export const getCareerNarrativePrompt = (events: { year: number; detail: string; success: boolean }[]): string => {
  const eventList = events.map(e => `- Year ${e.year}: ${e.detail} (Outcome: ${e.success ? 'SUCCESS' : 'FAILURE'})`).join('\\n');
  return `An agent's career has been simulated. For each event below, write a **very brief (one or two sentences)**, evocative mental note or memory from the agent's perspective. These are fragmented thoughts, not a formal diary.

**Tone & Content Guidelines:**
1.  **Brevity:** Each memory must be very brief—no more than one or two sentences.
2.  **Variety is Key:** Do not use a repetitive sentence structure. Each memory must feel distinct. Avoid starting every memory the same way. **Do not explicitly mention the year in the memory itself** unless it's a critical, well-known historical event (e.g., 'Beirut, 1983'). The goal is to sound like a human's internal monologue, not a logbook.
3.  **Perspective:** Use a **first-person ("I remember the smell...")** perspective. **Do not use third-person ("he remembers...").** The memories must sound like personal, internal reflections.
4.  **Go Beyond the Event:** Don't just restate the event. Hint at the sensory details, the people involved, the emotional impact, or the long-term consequences.
    *   **Emotional Impact:** A success might be tinged with guilt over the cost. A failure could forge a grim new resolve.
5.  **Historical Context (25% Chance):** For each event, there is a 25% chance you must connect my experience to a real-world geopolitical or military event from that specific year. The career event (e.g., 'Deployed to active combat zone') should be interpreted *through the lens* of that historical event. The reference should be subtle but clear. For example, if the year is 1991 and the event is 'Deployed overseas', a memory could be "The sand got into everything. Tasted like oil and victory." instead of explicitly mentioning the Gulf War.

Return the response as a JSON object with a single key "narratives", which is an array of strings. The array must have exactly ${events.length} strings, corresponding to each event in order.

**Events to reflect on:**
${eventList}

**Example of NEW Response Style:**
{
  "narratives": [
    "The commendation felt hollow. All I could think about was who wasn't there to receive one.",
    "Six months undercover. I forgot which face was the real one. Came back with a new name for my nightmares.",
    "Signing the official report, knowing it was a lie... part of my soul stained with that ink.",
    "The day my daughter was born. For a moment, the world felt clean again. Just for a moment.",
    "The smell of old paper and ozone in that archive... I found something in the margins that shouldn't have been there.",
    "The static on the line... it wasn't random. It knew my name. I hung up and sat in silence for an hour.",
    "That man's face on the subway. I know what I saw. There was nothing there."
  ]
}`;
};

// Bonds removed for Call of Cthulhu adaptation.


// Career Dossier Generation
export const getBackstoryPrompt = (
    characterName: string,
    characterConcept: string,
    gender: 'male' | 'female' | null,
    nationality: Nationality
): string => {
    return `You are a bureaucratic archivist for a clandestine organization. Write a detailed professional dossier for the following individual, who is being considered for recruitment into the highly secretive "Delta Green" program.
**Subject Details:**
- **Name:** ${characterName}
- **Nationality:** ${nationality}
- **Profession:** ${characterConcept}
- **Gender:** ${gender || 'Not specified'}

**Dossier Writing Instructions:**
1.  **Format:** Write in a clinical, detached, "just the facts" tone suitable for a classified government document. Use short, declarative sentences. Use Markdown to bold key entities, locations, or operation names (e.g., **Operation ARCHANGEL**).
2.  **Content Arc:**
    -   **Early Life & Education:** Briefly mention relevant details from their upbringing or university education.
    -   **Service History:** Detail their professional career. Mention key assignments, promotions, and notable successes.
    -   **The "Incident":** Describe a pivotal and traumatic event where the subject encountered something inexplicable or horrifying (the "Unnatural"). This is the event that brought them to Delta Green's attention. Be specific but professional.
    -   **Psychological Evaluation Summary:** Conclude with a brief summary of their psychological state post-incident. Mention resilience but also potential trauma-related issues like paranoia, obsession, or detachment.
3.  **Output:** The output must be a single long string with paragraphs separated by double newlines (\\n\\n).`;
};

export const getInjuryReportPrompt = (injuries: { detail: string, outcome: any }[]): string => {
    const injuryList = injuries.map(inj => {
      let effect = '';
      if (inj.outcome.attributeDelta) {
        const [attr, val] = Object.entries(inj.outcome.attributeDelta)[0] as [string, number];
        effect = `Resulting in a permanent loss of ${val * -1} ${attr}.`;
      } else if (inj.outcome.maxHpDelta) {
        effect = `Resulting in a permanent reduction of ${inj.outcome.maxHpDelta * -1} maximum HP.`;
      }
      return `- Incident: ${inj.detail}. ${effect}`;
    }).join('\\n');
  
    const rulesForMechanicalEffects = `
**Rules for Mechanical Effects:**
1.  **Format:** The effect must be a concise string, 100 characters maximum.
2.  **Attribute Loss:** For attribute loss, use the format "-X [ATTRIBUTE]". E.g., "-1 CON".
3.  **Skill Penalties:** For skill penalties, use "-Y% to [Skill] tests". E.g., "-20% to Athletics tests".
4.  **Action Limitations:** Use clear, simple language for limitations. E.g., "Cannot run", "Suffers from a persistent cough", "Experiences phantom pains in stressful situations (-1 WP)".
5.  **Plausibility:** The mechanical effect must be a plausible consequence of the described injury. A leg injury affects DEX or STR, a head injury affects INT or POW.`;

    return `You are writing a medical summary for a role-playing game character's file. Your goal is to provide a long-form report, a short summary, and a concise game mechanic based on the character's permanent injuries.

**Incident Log:**
${injuryList}

**Task:**
Based on the incident log, generate a JSON object with three keys: "report", "shortDescription", and "mechanicalEffect".

1.  **"report" (string):** A detailed, consolidated medical report. Describe the injuries, visible signs, and daily life impact in a clinical tone. Use Markdown to **bold** key phrases.
2.  **"shortDescription" (string):** A very brief, narrative summary of the injuries. Maximum 250 characters.
3.  **"mechanicalEffect" (string):** A concise game mechanic representing the injury's penalty, following the rules below.

${rulesForMechanicalEffects}

The output MUST be ONLY a raw JSON object.

**Example Response:**
{
  "report": "Subject sustained a **shattered left kneecap** during an altercation... Walks with a **noticeable, stiff-legged limp**. Cannot run or climb effectively...",
  "shortDescription": "A permanently damaged left knee causes a significant limp and prevents strenuous leg-based activities like running or climbing.",
  "mechanicalEffect": "-2 DEX, cannot perform the Run action."
}`;
};
