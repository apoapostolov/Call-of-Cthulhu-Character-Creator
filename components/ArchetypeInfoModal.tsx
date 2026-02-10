import React from 'react';
import type { Archetype } from '../types';

export const ArchetypeInfoModal: React.FC<{ archetype: Archetype; onClose: () => void }> = ({ archetype, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="archetype-modal-title"
    >
      <div
        className="bg-card border-2 border-primary-700/50 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-border bg-cream-100 rounded-t-lg">
          <h2 id="archetype-modal-title" className="text-2xl font-bold font-lora text-primary">{archetype.name}</h2>
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
          <p className="italic mb-6 col-span-1 md:col-span-2">{archetype.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-primary-800 mb-2">Details</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Core Characteristic:</strong> {archetype.coreCharacteristics.join(' or ')}</li>
                  <li><strong>Archetype Points:</strong> {archetype.pool.total}</li>
                  {archetype.talentRules?.limit != null && (
                    <li><strong>Talent Limit:</strong> {archetype.talentRules.limit}</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary-800 mb-2">Eligible Skills</h3>
                <ul className="list-disc list-inside space-y-1 columns-2">
                  {archetype.pool.eligibleSkills.map((s, i) => (
                    <li key={`${s}-${i}`} className="whitespace-nowrap">{s}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              {archetype.suggestedOccupations?.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-primary-800 mb-2">Suggested Occupations</h3>
                  <ul className="list-disc list-inside space-y-1 columns-2">
                    {archetype.suggestedOccupations.map((o, i) => (
                      <li key={`${o}-${i}`} className="whitespace-nowrap">{o}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <footer className="p-4 bg-cream-100 border-t border-border mt-auto flex justify-end items-center text-sm rounded-b-lg">
          <div className="text-muted-foreground text-right whitespace-nowrap">
            {archetype.source && (
              <span>
                {archetype.source}{archetype.page && `, p. ${archetype.page}`}
              </span>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};
