// attribute-descriptors.ts
import { Attribute } from './types';

export interface AttributeScoreDescriptor {
  min: number;
  max: number;
  description: string;
}

export const ATTRIBUTE_SCORE_DESCRIPTORS: Record<Attribute, AttributeScoreDescriptor[]> = {
  // Percentile-based ranges for Call of Cthulhu (1–99)
  STR: [
    { min: 1, max: 15, description: 'visibly frail, with a gaunt and emaciated frame' },
    { min: 16, max: 25, description: 'a slight, wiry build, showing clear physical strain under load' },
    { min: 26, max: 35, description: 'a lean build with little muscle definition' },
    { min: 36, max: 45, description: 'an average, unremarkable physique' },
    { min: 46, max: 55, description: 'looks capable, with a reasonably fit body' },
    { min: 56, max: 65, description: 'a solid, well-toned build, suggesting regular physical activity' },
    { min: 66, max: 75, description: 'broad-shouldered and athletic, with visible muscle' },
    { min: 76, max: 85, description: 'a powerful, imposing build, with a strong grip and confident posture' },
    { min: 86, max: 99, description: 'an intensely muscular, almost intimidating physique, like a professional athlete or soldier' },
  ],
  CON: [
    { min: 1, max: 15, description: 'a sickly, fragile appearance, with shallow breathing and pale skin' },
    { min: 16, max: 25, description: 'looks perpetually exhausted, with dark circles under their eyes' },
    { min: 26, max: 35, description: 'a thin, vulnerable look, often appearing winded or tired' },
    { min: 36, max: 45, description: 'seems to have low stamina, easily flushed or out of breath' },
    { min: 46, max: 55, description: 'appears to be in average health, with normal vitality' },
    { min: 56, max: 65, description: 'a hardy, resilient appearance, quick to recover' },
    { min: 66, max: 75, description: 'a robust and energetic presence, with steady stamina' },
    { min: 76, max: 85, description: 'an unyielding, tough-as-nails look, showing great endurance' },
    { min: 86, max: 99, description: 'an aura of incredible vitality, seemingly tireless and immune to hardship' },
  ],
  DEX: [
    { min: 1, max: 15, description: 'stiff, awkward, and clumsy movements' },
    { min: 16, max: 25, description: 'fidgety and uncoordinated, with a slight tremor in their hands' },
    { min: 26, max: 35, description: 'a bit heavy-footed, lacking in grace' },
    { min: 36, max: 45, description: 'moves with average coordination' },
    { min: 46, max: 55, description: 'steady hands and a balanced, controlled posture' },
    { min: 56, max: 65, description: 'quick, efficient movements and a poised stance' },
    { min: 66, max: 75, description: 'light on their feet, with excellent reflexes and a sense of coiled readiness' },
    { min: 76, max: 85, description: 'agile and precise, with an almost dancer-like grace' },
    { min: 86, max: 99, description: 'moves with fluid, economical grace; a blur of controlled motion' },
  ],
  INT: [
    { min: 1, max: 15, description: 'a dull, vacant expression, slow to react' },
    { min: 16, max: 25, description: 'a confused, unfocused gaze, often missing details' },
    { min: 26, max: 35, description: 'a plain, simple expression, seems to be a follower' },
    { min: 36, max: 45, description: 'a practical, grounded look, but not intellectually curious' },
    { min: 46, max: 55, description: 'an alert, observant expression, taking in their surroundings' },
    { min: 56, max: 65, description: 'a thoughtful, calculating gaze, clearly analyzing the situation' },
    { min: 66, max: 75, description: 'sharp, perceptive eyes that miss nothing' },
    { min: 76, max: 85, description: 'a scholarly, analytical demeanor, with an intense focus' },
    { min: 86, max: 99, description: 'a piercing, genius-level gaze that seems to see right through things' },
  ],
  POW: [
    { min: 1, max: 15, description: 'a broken, haunted look; completely detached and unresponsive' },
    { min: 16, max: 25, description: 'nervous, shifty eyes; looks easily startled and overwhelmed' },
    { min: 26, max: 35, description: 'a weak, uncertain presence; seems hesitant and lacking in confidence' },
    { min: 36, max: 45, description: 'appears stressed and mentally fatigued' },
    { min: 46, max: 55, description: 'a calm, steady demeanor; mentally composed' },
    { min: 56, max: 65, description: 'a focused, determined expression; not easily shaken' },
    { min: 66, max: 75, description: 'an unflinching, resolute gaze; exudes a quiet confidence' },
    { min: 76, max: 85, description: 'an aura of intense mental fortitude; seems unshakable under pressure' },
    { min: 86, max: 99, description: 'a commanding, almost palpable willpower; an intimidatingly strong presence' },
  ],
  // Appearance (APP)
  APP: [
    { min: 1, max: 15, description: 'an unsettling, repellent aura; inspires immediate distrust' },
    { min: 16, max: 25, description: 'awkward and withdrawn, avoids eye contact and social interaction' },
    { min: 26, max: 35, description: 'an unremarkable, forgettable face and a bland personality' },
    { min: 36, max: 45, description: 'seems reserved and difficult to get to know' },
    { min: 46, max: 55, description: 'a polite, professional demeanor; approachable but not memorable' },
    { min: 56, max: 65, description: 'an engaging and friendly expression; easily makes conversation' },
    { min: 66, max: 75, description: 'a confident, trustworthy smile; naturally puts people at ease' },
    { min: 76, max: 85, description: 'a commanding presence that naturally draws attention and respect' },
    { min: 86, max: 99, description: 'an exceptionally charismatic and persuasive aura; a natural leader who inspires loyalty' },
  ],
  // Size (SIZ)
  SIZ: [
    { min: 1, max: 15, description: 'very small and slight of frame; clothes hang loosely' },
    { min: 16, max: 25, description: 'slender build and short stature; moves around others easily' },
    { min: 26, max: 35, description: 'lean and compact; takes up little space' },
    { min: 36, max: 45, description: 'average height and build; physically unassuming' },
    { min: 46, max: 55, description: 'a touch broader or taller than average; quietly solid' },
    { min: 56, max: 65, description: 'broad-shouldered or notably tall; presence fills a room' },
    { min: 66, max: 75, description: 'imposing stature; heavy-set or very tall with a long reach' },
    { min: 76, max: 85, description: 'large and powerful frame; casts a long shadow' },
    { min: 86, max: 99, description: 'massive or towering; an unmistakably formidable physique' },
  ],
  // Education (EDU)
  EDU: [
    { min: 1, max: 15, description: 'rudimentary schooling; struggles with formal texts and academic references' },
    { min: 16, max: 25, description: 'basic education; practical knowledge outweighs book learning' },
    { min: 26, max: 35, description: 'some schooling or vocational training; functional literacy in the field' },
    { min: 36, max: 45, description: 'high-school level education; a working grasp of common subjects' },
    { min: 46, max: 55, description: 'college exposure or equivalent; comfortable with research and note-taking' },
    { min: 56, max: 65, description: 'university-educated; conversant in professional terminology' },
    { min: 66, max: 75, description: 'advanced study or specialist certification; methodical and well-read' },
    { min: 76, max: 85, description: 'postgraduate caliber; writes and reasons with academic precision' },
    { min: 86, max: 99, description: 'scholarly authority; encyclopedic knowledge and disciplined thought' },
  ],
  // Luck (LUCK)
  LUCK: [
    { min: 1, max: 15, description: 'seems cursed by mischance; small setbacks accumulate' },
    { min: 16, max: 25, description: 'often on the wrong side of coincidence' },
    { min: 26, max: 35, description: 'fortunes rarely favor them; plans require extra effort' },
    { min: 36, max: 45, description: 'ordinary fortune; nothing unusually good or bad' },
    { min: 46, max: 55, description: 'luck breaks even; occasional small favors from fate' },
    { min: 56, max: 65, description: 'frequently in the right place at the right time' },
    { min: 66, max: 75, description: 'fortunate trends; narrow escapes and timely discoveries' },
    { min: 76, max: 85, description: 'noticeably lucky; serendipity seems to walk with them' },
    { min: 86, max: 99, description: 'blessed by improbable turns; doors open when least expected' },
  ],
};

export const BOND_STRENGTH_DESCRIPTORS: AttributeScoreDescriptor[] = [];
