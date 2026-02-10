import React, { useState } from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { Tooltip } from '../Tooltip';

interface ToolsOfTheTradeProps {
    onSetKit: (kitName: string) => void;
    activeKitName: string | null;
}

const toTitleCase = (s: string) => {
  const titled = s
    .toLowerCase()
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .replace(/\b(Of|And|Or)\b/g, (m) => m.toLowerCase());
  // Normalize possessive 's to lower-case to avoid "Director'S" artifacts
  return titled
    .replace(/'S\b/g, "'s")
    .replace(/\u2019S\b/g, "\u2019s");
};

const getDisplayName = (name: string): string => {
    switch (name) {
        case 'INTELLIGENCE / COVERT OPS KIT':
            return 'Intel/Covert Ops';
        case 'SCIENTIST / MEDICAL KIT':
            return 'Scientist/Medical';
        case 'CIA SAD/SOG OPERATOR':
            return 'CIA SAD/SOG';
        case 'EPA CID SPECIAL AGENT':
            return 'EPA CID Agent';
        default:
            // Title-case then normalize suffix capitalization
            const titled = toTitleCase(name.replace(/\s*\/\s*/g, ' / '));
            return titled
                .replace(/\s+Kit\b/i, ' Kit')
                .replace(/\s+Team\b/i, ' Team');
    }
};

export const ToolsOfTheTrade: React.FC<ToolsOfTheTradeProps> = ({ onSetKit, activeKitName }) => {
    const { aggregatedData } = useCharacterContext();
    const [isOpen, setIsOpen] = useState(!activeKitName);

    const availableKits = aggregatedData.EQUIPMENT_KITS
        .filter(kit => kit.items && kit.items.length > 0)
        .sort((a, b) => a.name.localeCompare(b.name));
    
    return (
        <div className="bg-cream-100 p-4 rounded-lg border-2 border-border shadow-inner">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold font-lora text-primary">Equipment Kits</h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-expanded={isOpen}
                >
                    {isOpen ? 'Hide' : 'Show'} Kits
                    <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </button>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0'}`}>
                <p className="text-muted-foreground text-center mb-4 text-sm">Quickly add a standard equipment kit to your inventory.</p>
                <div className="grid grid-cols-2 gap-2">
                    {availableKits.map(kit => {
                        const isActive = activeKitName === kit.name;
                        return (
                            <Tooltip key={kit.name} content={kit.description}>
                                <button 
                                    onClick={() => onSetKit(kit.name)} 
                                    className={`w-full font-bold py-2 px-3 rounded-lg shadow-md transition-all duration-300 ease-in-out text-sm text-center flex items-center justify-center whitespace-normal leading-tight min-h-[64px] border-b-4 uppercase
                                        ${isActive 
                                            ? 'bg-primary hover:bg-opacity-80 text-primary-foreground border-black/20 ring-2 ring-ring' 
                                            : 'bg-secondary hover:bg-opacity-80 text-secondary-foreground border-black/20'
                                        }
                                    `}
                                >
                                   {getDisplayName(kit.name)}
                                </button>
                            </Tooltip>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
