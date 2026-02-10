import React from 'react';
import { AGE_CATEGORIES } from '../age.config';
import type { AgeCategory } from '../types';
import { Tooltip } from './Tooltip';

interface AgeSelectorProps {
  selected: AgeCategory | null;
  onSelect: (category: AgeCategory | null) => void;
  disabled: boolean;
}

export const AgeSelector: React.FC<AgeSelectorProps> = ({ selected, onSelect, disabled }) => {
  return (
    <div className="bg-card/50 p-1 rounded-full border border-border flex flex-wrap justify-center gap-1">
      {AGE_CATEGORIES.map(cat => (
        <Tooltip key={cat.label} content={
          <div>
            <p className="font-bold">{cat.name}</p>
            <p className="text-xs mt-1">{cat.description}</p>
          </div>
        }>
            <button
            onClick={() => onSelect(selected === cat.label ? null : cat.label)}
            disabled={disabled}
            className={`px-3 py-1.5 text-sm font-bold rounded-full transition-colors duration-200 flex-1 whitespace-nowrap ${
                selected === cat.label ? 'bg-primary text-primary-foreground shadow-inner' : 'text-muted-foreground hover:bg-card'
            } disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500`}
            >
            {cat.label}
            </button>
        </Tooltip>
      ))}
    </div>
  );
};
