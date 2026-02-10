import React from 'react';
import type { ExperiencePackage } from '../types';

interface ExperiencePackageModalProps {
  packages: ExperiencePackage[];
  onSelect: (pkg: ExperiencePackage) => void;
  onClose: () => void;
  onSkip?: () => void;
}

export const ExperiencePackageModal: React.FC<ExperiencePackageModalProps> = ({ packages, onSelect, onClose, onSkip }) => {
  if (!packages || packages.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full mx-4">
        <div className="p-5 border-b border-border">
          <h2 className="text-2xl font-lora font-bold text-primary">Select Experience Package</h2>
          <p className="text-muted-foreground mt-1">Some eras include life experience packages. Choose one to apply before allocating skills.</p>
        </div>
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-border">
          {packages.map((pkg) => (
            <button
              key={pkg.name}
              onClick={() => onSelect(pkg)}
              className="w-full text-left p-4 hover:bg-accent/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div>
                  <div className="font-semibold text-foreground">{pkg.name}</div>
                  {pkg.description && (
                    <div className="text-sm text-muted-foreground mt-1">{pkg.description}</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="p-4 flex items-center justify-end gap-3 border-t border-border">
          {onSkip && (
            <button
              onClick={onSkip}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-opacity-80"
            >
              Skip
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-muted text-foreground hover:bg-muted/80"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

