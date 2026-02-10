import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { EraID } from '../types';

interface EraContextType {
    selectedEra: EraID;
    setSelectedEra: (era: EraID) => void;
}

const EraContext = createContext<EraContextType | null>(null);

const getInitialEra = (): EraID => {
    try {
        const item = window.localStorage.getItem('selectedEra');
        if (item) {
            // Back-compat: migrate old era ids
            if (item === 'classic-1920s-pulp') return 'pulp-1930s' as EraID;
            return item as EraID;
        }
    } catch (error) {
        console.error("Error reading era from localStorage", error);
    }
    return 'classic-1920s'; // Default
};

export const EraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedEra, setSelectedEraState] = useState<EraID>(getInitialEra);

    useEffect(() => {
        try {
            window.localStorage.setItem('selectedEra', selectedEra);
        } catch (error) {
            console.error("Error writing era to localStorage", error);
        }
    }, [selectedEra]);
    
    const value = useMemo(() => ({
        selectedEra: selectedEra,
        setSelectedEra: setSelectedEraState
    }), [selectedEra]);

    return (
        <EraContext.Provider value={value}>
            {children}
        </EraContext.Provider>
    );
};

export const useEraContext = () => {
    const context = useContext(EraContext);
    if (!context) {
        throw new Error('useEraContext must be used within a EraProvider');
    }
    return context;
};
