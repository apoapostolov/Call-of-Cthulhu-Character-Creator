import React from 'react';
import type { Attribute } from '../types';

interface Props {
  options: Attribute[];
  selected: Attribute | null;
  onSelect: (attr: Attribute) => void;
  onClose: () => void;
}

export const ArchetypeCoreChoiceModal: React.FC<Props> = ({ options, selected, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg p-5 w-full max-w-md shadow-xl">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-primary">Choose Core Characteristic</h3>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground">✕</button>
        </div>
        <div className="space-y-2">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2 p-2 rounded-md border border-border hover:border-primary cursor-pointer">
              <input
                type="radio"
                name="core-characteristic"
                value={opt}
                checked={selected === opt}
                onChange={() => { onSelect(opt); onClose(); }}
              />
              <span className="font-semibold">{opt}</span>
            </label>
          ))}
        </div>
        {/* Auto-close on selection; no explicit Confirm button needed */}
      </div>
    </div>
  );
};