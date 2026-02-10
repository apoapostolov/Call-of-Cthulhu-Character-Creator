import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

interface TabButtonProps {
    isActive: boolean;
    isCompleted: boolean;
    onClick: () => void;
    children: React.ReactNode;
    shouldGlow?: boolean;
    isDisabled?: boolean;
}

export const TabButton: React.FC<TabButtonProps> = ({ isActive, isCompleted, onClick, children, isDisabled, shouldGlow }) => (
    <button
        onClick={onClick}
        disabled={isDisabled}
        className={`relative flex items-center justify-center py-3 px-4 sm:px-6 font-bold text-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:z-10 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-neutral-300 border-b-4
            ${isActive
                ? 'bg-card text-primary border-primary shadow-inner'
                : isCompleted
                ? 'bg-accent text-accent-foreground border-primary/40 hover:bg-primary hover:border-primary'
                : 'bg-secondary text-secondary-foreground border-primary/20 hover:bg-accent hover:border-primary/50'
            }
            ${shouldGlow ? 'animate-pulse' : ''}
        `}
        role="tab"
        aria-selected={isActive}
    >
        {isCompleted && !isActive && <CheckIcon className="h-5 w-5 mr-2 text-accent-foreground" />}
        {children}
    </button>
);
