import React, { useState } from 'react';
import type { Department } from '../types';
import { INFORMATION_DATA } from '../information-data';
import { MarkdownDisplay } from './MarkdownDisplay';

interface DepartmentInfoModalProps {
  department: Department | null;
  onClose: () => void;
}

export const DepartmentInfoModal: React.FC<DepartmentInfoModalProps> = ({ department, onClose }) => {
  const [activeTab, setActiveTab] = useState('summary');

  if (!department) return null;
  
  const info = department.infoId ? INFORMATION_DATA[department.infoId] : null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="department-modal-title"
    >
      <div
        className="bg-card border-2 border-primary/50 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="department-modal-title" className="text-2xl font-bold font-lora text-primary">{department.name}</h2>
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
        
        <div className="flex-shrink-0 border-b border-border px-4">
            <nav className="flex space-x-4">
                <button 
                    onClick={() => setActiveTab('summary')}
                    className={`py-3 px-1 border-b-2 font-semibold transition-colors duration-200 ${activeTab === 'summary' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                    Summary
                </button>
                {info && (
                    <button 
                        onClick={() => setActiveTab('details')}
                        className={`py-3 px-1 border-b-2 font-semibold transition-colors duration-200 ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                    >
                        Dossier
                    </button>
                )}
            </nav>
        </div>

        <div className="p-6 overflow-y-auto text-foreground">
            {activeTab === 'summary' && (
                <>
                    <p className="italic mb-6">{department.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-lg text-primary mb-2">Details</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Country:</strong> {department.country}</li>
                                    {department.yearOfEstablishment && <li><strong>Established:</strong> {department.yearOfEstablishment}</li>}
                                    <li><strong>Arrest Powers:</strong> {department.info.powers_of_arrest}</li>
                                    <li><strong>Weapon Carry:</strong> {department.info.carry_of_weapon}</li>
                                </ul>
                            </div>
                            {department.professions.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-lg text-primary mb-2">Eligible Professions</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {department.professions.map(prof => (
                                            <span key={prof} className="bg-cream-100 text-primary text-sm font-medium px-3 py-1 rounded-full border border-border">
                                                {prof}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="space-y-4">
                             <div>
                                <h3 className="font-bold text-lg text-primary mb-2">Access & Budget</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Max Funds Request:</strong> {department.info.access_to_funds.maximum_request}</li>
                                    <li><strong>Access Protocol:</strong> {department.info.access_to_funds.access_protocol}</li>
                                    <li className="pt-2"><strong className="block">Budget & Restricted Items:</strong> {department.info.budget_and_restricted_items}</li>
                                </ul>
                            </div>
                            {department.suggested_bonus_skills.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-lg text-primary mb-2">Suggested Bonus Skills</h3>
                                     <p className="text-sm">{department.suggested_bonus_skills.join(', ')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
             {activeTab === 'details' && info && (
                <div>
                    <p className="text-base italic text-muted-foreground">{info.short}</p>
                    <hr className="my-6 border-border" />
                    <div className="prose prose-sm prose-p:text-foreground prose-headings:text-primary max-w-none">
                        <MarkdownDisplay text={info.long} />
                    </div>
                </div>
            )}
        </div>
        <footer className="p-4 bg-cream-100 border-t border-border mt-auto flex justify-between items-center text-sm">
            <a href={department.wikipedia_url} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                Wikipedia
            </a>
            <div className="text-muted-foreground text-right whitespace-nowrap">
                {department.source && (
                    <span>
                        {department.source}{department.page && `, p. ${department.page}`}
                    </span>
                )}
            </div>
        </footer>
      </div>
    </div>
  );
};
