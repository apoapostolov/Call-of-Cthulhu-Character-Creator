import React, { useState } from 'react';
import type { SkillPackage } from '../../types';
import { SkillPackageCard } from './SkillPackageCard';

interface QuickAssignModalProps {
  packages: SkillPackage[];
  onClose: () => void;
  onConfirm: (pkg: SkillPackage) => void;
}

export const QuickAssignModal: React.FC<QuickAssignModalProps> = ({ packages, onClose, onConfirm }) => {
    const [selectedPackage, setSelectedPackage] = useState<SkillPackage | null>(null);

    const handleConfirm = () => {
        if (selectedPackage) {
            onConfirm(selectedPackage);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-assign-title"
        >
            <div
                className="bg-card border-2 border-primary-700/50 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-border">
                    <h2 id="quick-assign-title" className="text-2xl font-bold font-lora text-primary-800">Quick Assign Skill Package</h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-ring"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="p-6 overflow-y-auto">
                    <p className="text-muted-foreground mb-6">Choose a background package to quickly assign bonus skill assignments. This will reset any assignments you've already made. Any remaining assignments can be made manually.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {packages.map(pkg => (
                            <SkillPackageCard
                                key={pkg.name}
                                pkg={pkg}
                                isSelected={selectedPackage?.name === pkg.name}
                                onSelect={() => setSelectedPackage(pkg)}
                            />
                        ))}
                    </div>
                </div>

                <footer className="p-4 bg-cream-200 border-t border-border flex justify-end gap-4 mt-auto">
                    <button onClick={onClose} className="bg-neutral-500 hover:bg-neutral-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Cancel</button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedPackage}
                        className="bg-primary-700 hover:bg-primary-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed"
                    >
                        Confirm Selection
                    </button>
                </footer>
            </div>
        </div>
    );
};