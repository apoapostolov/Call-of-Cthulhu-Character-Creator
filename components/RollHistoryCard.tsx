import React from 'react';
import type { AttributeSet } from '../types';
import { ResetIcon } from './icons/ResetIcon';

const ATTRIBUTES: (keyof AttributeSet)[] = ['STR', 'CON', 'SIZ', 'DEX', 'APP', 'INT', 'POW', 'EDU', 'LUCK'];

interface RollHistoryCardProps {
  roll: AttributeSet;
  onRestore: () => void;
}

export const RollHistoryCard: React.FC<RollHistoryCardProps> = ({ roll, onRestore }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-between hover:border-secondary-600 transition-colors duration-300 shadow-sm">
      <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-4">
        {ATTRIBUTES.map(attr => (
          <div key={attr} className="text-sm">
            <span className="font-bold text-muted-foreground">{attr}: </span>
            <span className="text-foreground font-semibold">{roll[attr]}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onRestore}
        className="bg-primary hover:bg-opacity-80 text-primary-foreground font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-center w-full focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Restore this set of ability scores"
      >
        <ResetIcon className="mr-2 h-5 w-5" />
        Restore This Roll
      </button>
    </div>
  );
};