import React from 'react';
import type { Department } from '../types';
import { QuestionIcon } from './icons/QuestionIcon';
import { CheckIcon } from './icons/CheckIcon';

interface DepartmentCardProps {
    department: Department;
    isSelected: boolean;
    onSelect: () => void;
    onShowInfo: () => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, isSelected, onSelect, onShowInfo }) => {
    const borderClasses = isSelected 
        ? 'border-primary ring-2 ring-ring' 
        : 'border-border hover:border-primary';
        
    return (
        <div className={`relative w-full bg-card rounded-lg border-2 transition-all duration-200 ${borderClasses} flex flex-col shadow-sm`}>
            <div className="flex-grow">
                <button
                    onClick={onSelect}
                    className="w-full h-full text-left p-4"
                    aria-pressed={isSelected}
                >
                    <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold font-lora text-lg text-primary">{department.name}</h4>
                        <button
                            onClick={(e) => { e.stopPropagation(); onShowInfo(); }}
                            className="text-neutral-400 hover:text-primary transition-colors p-1 -m-1"
                            aria-label="Show department details"
                        >
                            <QuestionIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="text-sm text-foreground/80 mt-2 line-clamp-4">{department.description}</p>
                </button>
            </div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-background p-1 rounded-full pointer-events-none">
                 <div className={`w-8 h-8 rounded-full border-2 grid place-items-center transition-all ${isSelected ? 'border-primary' : 'border-border'}`}>
                    {isSelected && <CheckIcon className="w-5 h-5 text-primary" />}
                </div>
            </div>
        </div>
    );
};