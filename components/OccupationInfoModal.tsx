import React, { useMemo } from 'react';
import type { Occupation } from '../types';
import { useCharacterContext } from '../context/CharacterContext';

interface OccupationInfoModalProps {
  occupation: Occupation | null;
  onClose: () => void;
}

const formatChoiceOptions = (options: string[]): string => {
    if (options[0] === '*') {
        return 'Any Skill';
    }
    if (options.length > 6) {
        return `${options.slice(0, 6).join(', ')}, and more...`;
    }
    return options.join(', ');
};


export const OccupationInfoModal: React.FC<OccupationInfoModalProps> = ({ occupation, onClose }) => {
  if (!occupation) return null;
  const { aggregatedData } = useCharacterContext();

  const recommendedKits = useMemo(() => {
    const name = occupation.name.toLowerCase();
    const group = occupation.group;
    const pick = (kitName: string) => aggregatedData.EQUIPMENT_KITS.find(k => k.name.toLowerCase() === kitName.toLowerCase());
    const picks: string[] = [];
    // Core classic kits
    if (name.includes('doctor') || name.includes('physician') || name.includes('medicine') || name.includes('nurse')) picks.push("DOCTOR'S BAG");
    if (name.includes('police') || name.includes('detective') || name.includes('constable')) picks.push('POLICE CONSTABLE KIT');
    if (name.includes('soldier') || name.includes('military') || name.includes('marine')) picks.push("SOLDIER'S FIELD KIT");
    if (name.includes('journalist') || name.includes('author') || name.includes('reporter')) picks.push("JOURNALIST'S KIT");
    if (name.includes('explorer') || name.includes('archaeologist') || name.includes('antiquarian') || name.includes('expedition')) picks.push("EXPLORER'S EXPEDITION KIT");
    if (name.includes('criminal') || name.includes('thief') || name.includes('gang')) picks.push("CRIMINAL'S TOOLS");
    if (name.includes('engineer') || name.includes('mechanic') || name.includes('driver')) picks.push('ENGINEER / MECHANIC KIT');

    // New Pulp 1930s kits (mapped to at least two occupations each)
    // G‑MAN RAID KIT: Federal Agent, Police Detective, Private Investigator
    if (name.includes('federal') || name.includes('agent') || name.includes('police detective') || name === 'private investigator') picks.push('G‑MAN RAID KIT');
    // MOBSTER'S GO‑BAG: Gangster, Boss; Gangster, Underling; Hired Muscle; Gun Moll; Bank Robber; Hit Man; Get‑Away Driver
    if (name.includes('gangster') || name.includes('mob') || name.includes('hired muscle') || name.includes('gun moll') || name.includes('bank robber') || name.includes('hit man') || name.includes('hit woman') || name.includes('get‑away driver') || name.includes('get-away driver')) picks.push("MOBSTER'S GO‑BAG");
    // BURGLAR'S NIGHT KIT: Cat Burglar, Criminal, Confidence Trickster
    if (name.includes('cat burglar') || name.includes('confidence trickster') || (name.includes('criminal') && !picks.includes("CRIMINAL'S TOOLS"))) picks.push("BURGLAR'S NIGHT KIT");
    // GET‑AWAY DRIVER KIT: Get‑Away Driver, Chauffeur, Mechanic
    if (name.includes('get‑away driver') || name.includes('get-away driver') || name.includes('chauffeur') || name.includes('mechanic')) picks.push('GET‑AWAY DRIVER KIT');
    // SAFARI HUNTER KIT: Big Game Hunter, Explorer, Gentleman/Lady
    if (name.includes('big game hunter') || name.includes('explorer') || name.includes('gentleman') || name.includes('lady')) picks.push('SAFARI HUNTER KIT');
    // SEAFARER’S DUFFEL: Sailor, Gambler (boat)
    if (name.includes('sailor') || name.includes('seafarer') || name.includes('gambler')) picks.push('SEAFARER’S DUFFEL');
    // PRESS PHOTOGRAPHER KIT: Investigative Journalist, Photographer, Reporter
    if (name.includes('photographer') || name.includes('investigative journalist') || name.includes('reporter')) picks.push('PRESS PHOTOGRAPHER KIT');
    // OCCULT INVESTIGATOR KIT: Occultist, Exorcist, Parapsychologist, Priest, Zealot
    if (name.includes('occultist') || name.includes('exorcist') || name.includes('parapsychologist') || name.includes('priest') || name.includes('zealot')) picks.push('OCCULT INVESTIGATOR KIT');
    // Fallbacks by group
    if (picks.length === 0) {
      if (group === 'Investigative' || group === 'Lovecraftian' || group === 'Academic' || group === 'Professional') picks.push("INVESTIGATOR'S FIELD KIT");
    }
    // De-dupe and keep only kits that exist
    const uniquePicks = picks.filter((v, i, a) => a.indexOf(v) === i);
    return uniquePicks
      .map(n => pick(n))
      .filter((k): k is NonNullable<ReturnType<typeof pick>> => !!k)
      .slice(0, 3);
  }, [occupation, aggregatedData.EQUIPMENT_KITS]);

  const prettyKit = (s: string) =>
    s
      .toLowerCase()
      .replace(/\b([a-z])/g, (m) => m.toUpperCase())
      .replace(/\s*\/\s*/g, ' / ');

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="occupation-modal-title"
    >
      <div
        className="bg-card border-2 border-primary-700/50 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-border bg-cream-100 rounded-t-lg">
          <h2 id="occupation-modal-title" className="text-2xl font-bold font-lora text-primary">{occupation.name}</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-foreground transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="p-6 overflow-y-auto text-foreground">
            <p className="italic mb-6 col-span-1 md:col-span-2">{occupation.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-lg text-primary-800 mb-2">Details</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Skill Points:</strong> {occupation.skillPoints}</li>
                            <li><strong>Credit Rating:</strong> {occupation.creditRatingRange.min}-{occupation.creditRatingRange.max}</li>
                        </ul>
                    </div>
                    {recommendedKits.length > 0 && (
                      <div>
                        <h3 className="font-bold text-lg text-primary-800 mb-2">Recommended Equipment Kits</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {recommendedKits.map(kit => (
                            <li key={kit.name} title={kit.description}>{prettyKit(kit.name)}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
                <div className="space-y-4">
                    {occupation.occupationalSkills.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg text-primary-800 mb-2">Occupational Skills</h3>
                            <ul className="list-disc list-inside space-y-1 columns-2">
                                {occupation.occupationalSkills.map((skill, index) => <li key={`${skill}-${index}`} className="whitespace-nowrap">{skill}</li>)}
                            </ul>
                        </div>
                    )}
                    {occupation.choiceGroups && occupation.choiceGroups.length > 0 && (
                        <div>
                            <h3 className="font-bold text-lg text-primary-800 mb-2 mt-4">Occupational Skill Picks</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                {occupation.choiceGroups.map((group, index) => (
                                    <li key={index}>
                                        Choose {group.count} from: <span className="italic text-muted-foreground">{formatChoiceOptions(group.options)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <footer className="p-4 bg-cream-100 border-t border-border mt-auto flex justify-end items-center text-sm rounded-b-lg">
            <div className="text-muted-foreground text-right whitespace-nowrap">
                {occupation.source && (
                    <span>
                        {occupation.source}{occupation.page && `, p. ${occupation.page}`}
                    </span>
                )}
            </div>
        </footer>
      </div>
    </div>
  );
};
