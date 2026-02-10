import React from 'react';
import { MaleIcon } from '../icons/MaleIcon';
import { FemaleIcon } from '../icons/FemaleIcon';

interface GenderSelectorProps {
    gender: 'male' | 'female' | null;
    onGenderChange: (gender: 'male' | 'female' | null) => void;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({ gender, onGenderChange }) => {
    const handleGenderSelect = (selectedGender: 'male' | 'female') => {
        onGenderChange(gender === selectedGender ? null : selectedGender);
    };

    return (
        <div className="flex gap-4">
             <button
                onClick={() => handleGenderSelect('male')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                    gender === 'male' ? 'bg-secondary/30 border-secondary ring-2 ring-ring text-secondary-foreground' : 'bg-card border-border hover:border-secondary'
                }`}
            >
                <MaleIcon className="h-6 w-6" />
                <span className="font-bold">Male</span>
            </button>
             <button
                onClick={() => handleGenderSelect('female')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                    gender === 'female' ? 'bg-secondary/30 border-secondary ring-2 ring-ring text-secondary-foreground' : 'bg-card border-border hover:border-secondary'
                }`}
            >
                <FemaleIcon className="h-6 w-6" />
                <span className="font-bold">Female</span>
            </button>
        </div>
    );
};