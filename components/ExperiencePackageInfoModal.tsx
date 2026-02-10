import React from 'react';
import type { ExperiencePackage } from '../types';

interface Props {
  pkg: ExperiencePackage;
  onClose: () => void;
}

export const ExperiencePackageInfoModal: React.FC<Props> = ({ pkg, onClose }) => {
  const prettyDob = (dob: string | undefined) => {
    if (!dob) return undefined;
    const s = String(dob).trim();
    if (/^adjust:\s*civil-war-veteran$/i.test(s)) {
      return 'Adjust age to fit service in the American Civil War (1861–1865); assume the investigator was at least 17 years old by 1861.';
    }
    return s;
  };
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="xp-modal-title"
    >
      <div
        className="bg-card border-2 border-primary-700/50 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-border bg-cream-100 rounded-t-lg">
          <h2 id="xp-modal-title" className="text-2xl font-bold font-lora text-primary">{pkg.name}</h2>
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
          <p className="italic mb-6 col-span-1 md:col-span-2">{pkg.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-4">
              {/* Details: hide if there is nothing to show (we intentionally omit Experience Points here
                  since the pool size is communicated above Eligible Skills) */}
              {(() => {
                const details: React.ReactNode[] = [];
                // Add future non-XP details here, e.g., source, prerequisites, etc.
                return details.length > 0 ? (
                  <div>
                    <h3 className="font-bold text-lg text-primary-800 mb-2">Details</h3>
                    <ul className="list-disc list-inside space-y-1">{details}</ul>
                  </div>
                ) : null;
              })()}

              {pkg.modifies?.notes && pkg.modifies.notes.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-primary-800 mb-2 border-b border-border pb-1">Notes</h3>
                  <div className="space-y-3">
                    {pkg.modifies.notes.map(n => (
                      <div key={n.name}>
                        <h4 className="font-semibold text-foreground">{n.name}</h4>
                        <p className="text-sm text-muted-foreground">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {(() => {
                const rows: { label: string; value: string }[] = [];
                if (pkg.modifies?.attributes) {
                  const parts = Object.entries(pkg.modifies.attributes).map(([k, v]) => `${k}: ${v}`);
                  if (parts.length) rows.push({ label: 'Attributes', value: parts.join('; ') });
                }
                if (pkg.modifies?.derived) {
                  const parts = Object.entries(pkg.modifies.derived).map(([k, v]) => `${k}: ${v}`);
                  if (parts.length) rows.push({ label: 'Derived', value: parts.join('; ') });
                }
                if (pkg.modifies?.dob) {
                  rows.push({ label: 'DOB', value: prettyDob(pkg.modifies.dob) || pkg.modifies.dob });
                }
                return rows.length ? (
                  <div>
                    <h3 className="font-bold text-lg text-primary-800 mb-2">Modifies</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {rows.map(r => (
                        <li key={r.label}><span className="font-semibold">{r.label}:</span> <span className="text-muted-foreground">{r.value}</span></li>
                      ))}
                    </ul>
                  </div>
                ) : null;
              })()}

              {pkg.experiencePoints?.eligibleSkills?.length ? (
                <div>
                  <h3 className="font-bold text-lg text-primary-800 mb-2">
                    {`Spend ${pkg.experiencePoints?.total ?? 0} points among these skills:`}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 columns-2">
                    {pkg.experiencePoints.eligibleSkills.map((s) => (
                      <li key={s} className="whitespace-nowrap">{s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <footer className="p-4 bg-cream-100 border-t border-border mt-auto flex justify-end items-center text-sm rounded-b-lg">
          <div className="text-muted-foreground text-right whitespace-nowrap"></div>
        </footer>
      </div>
    </div>
  );
};

