import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
// FIX: Replaced SourceID with EraID to match the exported type from types.ts.
import type { EraID } from '../types';
import { SHEET_CONFIG as DG_SHEET_CONFIG } from '../eras/sheet-config';

export type SheetSourceType = 'internal' | 'external' | 'self-hosted';

interface SheetContextType {
    sourceType: SheetSourceType;
    setSourceType: (type: SheetSourceType) => void;
    // FIX: Replaced SourceID with EraID.
    externalUrls: Partial<Record<EraID, { defaultSheet: string }>>;
    // FIX: Replaced SourceID with EraID.
    setExternalUrl: (sourceId: EraID, type: 'defaultSheet', url: string) => void;
    selfHostedUrl: string;
    setSelfHostedUrl: (url: string) => void;
    // FIX: Replaced SourceID with EraID.
    getSheetPath: (sourceId: EraID, isSpellcaster: boolean, sheetConfig: any) => string;
}

// FIX: Replaced SourceID with EraID.
const DEFAULT_EXTERNAL_URLS: Partial<Record<EraID, { defaultSheet: string }>> = {
    'classic-1920s': {
        defaultSheet: 'https://cdn.jsdelivr.net/gh/apoapostolov/rpg-sheets@main/coc1920s.pdf',
    },
};

const SheetContext = createContext<SheetContextType | null>(null);

export const SheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sourceType, setSourceTypeState] = useState<SheetSourceType>(() => {
        const saved = localStorage.getItem('sheetSourceType') as SheetSourceType;
        if (saved) return saved;
        // Default to external CDN on production-like environments, internal for local dev
        return window.location.hostname.endsWith('run.app') ? 'external' : 'internal';
    });
    // FIX: Replaced SourceID with EraID.
    const [externalUrls, setExternalUrlsState] = useState<Partial<Record<EraID, { defaultSheet: string }>>>(() => {
        const saved = localStorage.getItem('sheetExternalUrls');
        const parsed = saved ? JSON.parse(saved) : {};
        // Merge in missing defaults so newly added eras (e.g., Classic 1920s) appear prefilled
        return { ...DEFAULT_EXTERNAL_URLS, ...parsed };
    });
    const [selfHostedUrl, setSelfHostedUrlState] = useState<string>(() => {
        return localStorage.getItem('sheetSelfHostedUrl') || '';
    });
    
    useEffect(() => { localStorage.setItem('sheetSourceType', sourceType); }, [sourceType]);
    useEffect(() => { localStorage.setItem('sheetExternalUrls', JSON.stringify(externalUrls)); }, [externalUrls]);
    useEffect(() => { localStorage.setItem('sheetSelfHostedUrl', selfHostedUrl); }, [selfHostedUrl]);

    const setSourceType = (type: SheetSourceType) => setSourceTypeState(type);
    const setSelfHostedUrl = (url: string) => setSelfHostedUrlState(url);
    // FIX: Replaced SourceID with EraID.
    const setExternalUrl = (sourceId: EraID, type: 'defaultSheet', url: string) => {
        setExternalUrlsState(prev => ({
            ...prev,
            [sourceId]: { ...prev[sourceId], [type]: url }
        }));
    };
    
    // FIX: Replaced SourceID with EraID.
    const getSheetPath = (sourceId: EraID, isSpellcaster: boolean, sheetConfig: any): string => {
        const config = sheetConfig || DG_SHEET_CONFIG;
        
        switch (sourceType) {
            case 'external':
                const urls = externalUrls[sourceId];
                return urls?.defaultSheet || config.defaultSheet;
            case 'self-hosted':
                if (!selfHostedUrl) return config.defaultSheet;
                const base = selfHostedUrl.endsWith('/') ? selfHostedUrl : `${selfHostedUrl}/`;
                const filename = (config.defaultSheet as string).split('/').pop() || `${sourceId}_sheet.pdf`;
                return `${base}${filename}`;
            case 'internal':
            default:
                return config.defaultSheet;
        }
    };

    const value = useMemo(() => ({
        sourceType, setSourceType, externalUrls, setExternalUrl, selfHostedUrl, setSelfHostedUrl, getSheetPath,
    }), [sourceType, externalUrls, selfHostedUrl]);

    return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
};

export const useSheetContext = () => {
    const context = useContext(SheetContext);
    if (!context) throw new Error('useSheetContext must be used within a SheetProvider');
    return context;
};
