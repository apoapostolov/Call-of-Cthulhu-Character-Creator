import React from 'react';
import { useEraContext } from '../context/SourceContext';
import { ERAS } from '../eras/manifest';
import type { EraID } from '../types';

interface ErasModalProps {
  onClose: () => void;
}

export const ErasModal: React.FC<ErasModalProps> = ({ onClose }) => {
    const { selectedEra, setSelectedEra } = useEraContext();

    const handleSelectEra = (eraId: EraID) => {
        setSelectedEra(eraId);
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="eras-modal-title"
        >
            <div
                className="bg-card border-2 border-primary/50 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-border bg-cream-100 rounded-t-lg">
                    <h2 id="eras-modal-title" className="text-2xl font-bold font-lora text-primary">Manage Eras</h2>
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

                <div className="p-6 overflow-y-auto">
                    <p className="text-muted-foreground mb-6">Select which historical era to use. This will change the available content and visual theme of the application.</p>
                    
                    <div className="space-y-3">
                        {ERAS.map(era => {
                            const isSelected = selectedEra === era.id;

                            return (
                                <button
                                    key={era.id}
                                    onClick={() => handleSelectEra(era.id)}
                                    className={`w-full flex items-center text-left p-3 rounded-md border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-ring
                                        ${isSelected 
                                            ? 'bg-primary/10 border-primary' 
                                            : 'border-border hover:bg-background hover:border-secondary'
                                        }
                                    `}
                                    aria-pressed={isSelected}
                                >
                                    <div className="w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center border-primary/50">
                                        {isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                                    </div>
                                    <div className="flex-grow">
                                        <p className={`font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>{era.name}</p>
                                        <p className="text-xs text-muted-foreground italic mt-1">
                                            {era.publisher} &bull; {era.theme} &bull; {era.setting}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
