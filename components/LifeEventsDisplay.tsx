import React, { useState } from 'react';
import type { LifeEvent, LifeEventSourceType } from '../types';
import { DiceIcon } from './icons/DiceIcon';
import { Tooltip } from './Tooltip';
import { StarIcon } from './icons/StarIcon';
import { WrenchIcon } from './icons/WrenchIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface LifeEventsDisplayProps {
  rolledEvents: LifeEvent[];
  onRollEvents: () => void;
  eventCount: number;
  onSpecializationSelect?: (eventIndex: number, skillName: string, specialization: string) => void;
}

const getSourceIcon = (sourceType: LifeEventSourceType) => {
  switch (sourceType) {
    case 'core':
      return <StarIcon className="w-3 h-3 text-primary" />;
    case 'homebrew':
      return <WrenchIcon className="w-3 h-3 text-accent" />;
    case 'ai-created':
      return <SparklesIcon className="w-3 h-3 text-info" />;
    default:
      return null;
  }
};

const truncateDescription = (text: string, maxLength: number = 200): string => {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '…';
};

export const LifeEventsDisplay: React.FC<LifeEventsDisplayProps> = ({
  rolledEvents,
  onRollEvents,
  eventCount,
  onSpecializationSelect
}) => {
  const [specializationSelections, setSpecializationSelections] = useState<Record<number, string>>({});

  const formatModifier = (value: number): string => {
    return value > 0 ? `+${value}` : `${value}`;
  };

  const getModifiersList = (event: LifeEvent, eventIndex: number): string[] => {
    const modifiers: string[] = [];
    
    if (event.modifiers.attributes) {
      Object.entries(event.modifiers.attributes).forEach(([attr, value]) => {
        if (value !== undefined) {
          modifiers.push(`**${attr} ${formatModifier(value)}**`);
        }
      });
    }
    
    if (event.modifiers.derivedStats) {
      Object.entries(event.modifiers.derivedStats).forEach(([stat, value]) => {
        if (value !== undefined) {
          modifiers.push(`**${stat} ${formatModifier(value)}**`);
        }
      });
    }
    
    if (event.modifiers.skills) {
      Object.entries(event.modifiers.skills).forEach(([skill, value]) => {
        modifiers.push(`**${skill} ${formatModifier(value)}**`);
      });
    }
    
    // Add selected specialization modifier
    if (event.requiresSpecialization && event.selectedSpecialization) {
      modifiers.push(`**${event.requiresSpecialization} (${event.selectedSpecialization}) +10**`);
    }
    
    return modifiers;
  };

  const handleSpecializationChange = (eventIndex: number, skillName: string, specialization: string) => {
    setSpecializationSelections(prev => ({ ...prev, [eventIndex]: specialization }));
    if (onSpecializationSelect) {
      onSpecializationSelect(eventIndex, skillName, specialization);
    }
  };

  // Common science specializations for Dark Ages
  const scienceSpecializations = [
    'Astronomy',
    'Mathematics',
    'Medicine',
    'Alchemy',
    'Natural Philosophy',
    'Herbalism'
  ];

  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold font-lora text-primary">Your Life</h3>
          <p className="text-sm text-muted-foreground">
            {eventCount} life {eventCount === 1 ? 'event' : 'events'} based on your age
          </p>
        </div>
        <button
          onClick={onRollEvents}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-semibold"
          aria-label="Roll Life Events"
        >
          <DiceIcon className="w-5 h-5" />
          ASK FATE
        </button>
      </div>

      {rolledEvents.length > 0 && (
        <div className="space-y-3">
          {rolledEvents.map((event, index) => {
            const modifiersList = getModifiersList(event, index);
            const truncatedDesc = truncateDescription(event.description);
            
            return (
              <div
                key={`${event.roll}-${index}`}
                className="bg-card/50 p-3 rounded-md border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Tooltip content={`Source: ${event.source || 'Unknown'}`}>
                      <span className="inline-flex items-center">
                        {getSourceIcon(event.sourceType)}
                      </span>
                    </Tooltip>
                    <h4 className="font-bold text-foreground">{event.name}</h4>
                  </div>
                </div>
                
                <p
                  className="text-sm text-muted-foreground mb-2 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: truncatedDesc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                  }}
                />
                
                {/* Specialization selector */}
                {event.requiresSpecialization && (
                  <div className="mb-3">
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Select {event.requiresSpecialization} Specialization (+10):
                    </label>
                    <select
                      className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      value={event.selectedSpecialization || ''}
                      onChange={(e) => handleSpecializationChange(index, event.requiresSpecialization!, e.target.value)}
                    >
                      <option value="">-- Choose Specialization --</option>
                      {scienceSpecializations.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                {modifiersList.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {modifiersList.map((mod, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-[#2596be]/10 text-[#2596be] border border-[#2596be]/30"
                        dangerouslySetInnerHTML={{
                          __html: mod.replace(/\*\*(.*?)\*\*/g, '$1')
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {event.special === 'roll-twice' && (
                  <div className="mt-2 text-xs italic text-warning">
                    Special: This event triggers two additional life event rolls
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
