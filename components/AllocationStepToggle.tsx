import React from 'react';

interface AllocationStepToggleProps {
    step: number;
    onToggle: () => void;
}

export const AllocationStepToggle: React.FC<AllocationStepToggleProps> = ({ step, onToggle }) => (
    <div className="flex items-center gap-3 text-sm flex-shrink-0">
        <span className="font-bold text-gray-400">Points per Click:</span>
        <span className={`font-bold ${step === 1 ? 'text-green-300' : 'text-gray-500'}`}>1</span>
        <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800/50 focus:ring-green-500 ${step === 5 ? 'bg-green-600' : 'bg-gray-600'}`}
            aria-label="Toggle allocation step"
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${step === 5 ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className={`font-bold ${step === 5 ? 'text-green-300' : 'text-gray-500'}`}>5</span>
    </div>
);
