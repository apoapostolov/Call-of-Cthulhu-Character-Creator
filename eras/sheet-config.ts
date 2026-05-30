import type { EraID } from '../types';

export interface SheetConfigEntry {
  /** Path to the PDF sheet file (relative to public/) */
  defaultSheet: string;
}

export interface SheetConfig {
  /** Fallback sheet path when no era-specific entry exists */
  defaultSheet: string;
  /** Era-specific sheet overrides */
  sheets: Partial<Record<EraID, SheetConfigEntry>>;
}

export const SHEET_CONFIG: SheetConfig = {
  // Default fallback for eras without a specific sheet entry
  defaultSheet: '/sheets/coc1920s.pdf',

  // Era-specific sheet paths
  sheets: {
    'classic-1920s': { defaultSheet: '/sheets/coc1920s.pdf' },
    'regency': { defaultSheet: '/sheets/coc1920s.pdf' },
    'campfire-tales': { defaultSheet: '/sheets/campfiretales.pdf' },
  },
};
