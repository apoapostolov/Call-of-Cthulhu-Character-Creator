import React, { useState, useEffect, useCallback } from 'react';
import { EraProvider, useEraContext } from './context/SourceContext';
import { CharacterProvider } from './context/CharacterContext';
import { SheetProvider } from './context/SheetContext';
import { useUIState } from './hooks/useUIState';
import { useCharacter } from './hooks/useCharacter';
import { useAggregatedData } from './hooks/useAggregatedData';
import { usePdfPrinting } from './hooks/usePdfPrinting';
import { Toast } from './components/Toast';
import { DossierTab } from './components/DossierTab';
import { GearTab } from './GearTab';
import { StatsTab } from './components/StatsTab';
import { SkillsTab } from './components/SkillsTab';
import { PromptInfoModal } from './components/PromptInfoModal';
import { getYearFromDecade } from './utils/date';
import { ErasModal } from './components/SourcesModal';
import { SettingsModal } from './components/SettingsModal';
import { OccupationInfoModal } from './components/OccupationInfoModal';
import { SaveSlotDrawer } from './components/SaveSlotDrawer';
import { PlaceholderLogo } from './components/icons/PlaceholderLogo';
import { PrintIcon } from './components/icons/PrintIcon';
import { GearIcon } from './components/icons/GearIcon';
import { TabButton } from './components/TabButton';
import type { Occupation, AttributeSet } from './types';

const AppContent: React.FC = () => {
    const { selectedEra } = useEraContext();
    const aggregatedData = useAggregatedData(selectedEra);
    const uiState = useUIState();
    const character = useCharacter(uiState.setToastMessage, aggregatedData);
    const { printSheet, isPrinting } = usePdfPrinting(uiState.setToastMessage);
    const [viewingOccupation, setViewingOccupation] = useState<Occupation | null>(null);
    const [selectedExperiencePackageName, setSelectedExperiencePackageName] = useState<string | null>(null);
    
    const { handleRoll, modifiedAttributes, derivedStats, setOccupation, selectedOccupation, rollHistory, handleRestoreRoll, ai, isDeceased, kitInventory, inventory, handleDrop, handleDeleteItem, occupationalSkillPoints, personalSkillPoints, allOccupationChoicesMade, skills, wealth } = character;
    const [shouldPrintButtonGlow, setShouldPrintButtonGlow] = useState(false);

    useEffect(() => {
        document.body.dataset.era = selectedEra;
    }, [selectedEra]);

    // Generate a plausible DOB when an age bracket is selected
    useEffect(() => {
        const bracket = character.selectedAgeCategory; // e.g., '20-39'
        if (!bracket) return;
        // Only set if no DOB yet
        if (ai.dob) return;
        try {
            const decadeName = aggregatedData.DECADES?.[0]?.name;
            const currentYear = decadeName ? getYearFromDecade(decadeName) : new Date().getFullYear();
            const m = String(bracket).match(/^(\d+)\s*-\s*(\d+)$/);
            if (!m) return;
            const min = parseInt(m[1], 10);
            const max = parseInt(m[2], 10);
            const age = Math.floor(Math.random() * (max - min + 1)) + min;
            const year = currentYear - age;
            const month = Math.floor(Math.random() * 12) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            const dob = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            ai.setDob(dob);
        } catch {}
    }, [character.selectedAgeCategory, aggregatedData.DECADES, ai.dob, ai.setDob]);

    useEffect(() => {
        const newCompleted = new Set(uiState.completedTabs);
        let updated = false;

        if (selectedOccupation && !uiState.completedTabs.has('stats')) {
            newCompleted.add('stats');
            updated = true;
        }
        
        const allPointsSpent = allOccupationChoicesMade && occupationalSkillPoints?.remaining === 0 && personalSkillPoints?.remaining === 0;
        if (uiState.completedTabs.has('stats') && allPointsSpent && !uiState.completedTabs.has('skills')) {
            newCompleted.add('skills');
            updated = true;
        }

        if (ai.portrait && !uiState.completedTabs.has('dossier')) {
            newCompleted.add('dossier');
            setShouldPrintButtonGlow(true);
            updated = true;
        }

        if (updated) {
            uiState.setCompletedTabs(newCompleted);
        }
    }, [selectedOccupation, ai.portrait, uiState.completedTabs, uiState.setCompletedTabs, occupationalSkillPoints, personalSkillPoints, allOccupationChoicesMade]);

    const handleRollWrapper = useCallback(() => {
        handleRoll();
        uiState.setCompletedTabs(new Set());
        setShouldPrintButtonGlow(false);
    }, [handleRoll, uiState]);

    const handleRestoreRollWrapper = useCallback((roll: AttributeSet) => {
        handleRestoreRoll(roll);
        uiState.setCompletedTabs(new Set());
        setShouldPrintButtonGlow(false);
    }, [handleRestoreRoll, uiState]);

    const handlePrint = () => {
        // Priority: explicitly selected image, then headshot, then full-body
        const portraitDataUrl = ai.pdfPortraitSrc || ai.headshot || ai.portrait || null;
        const inv = [...kitInventory, ...inventory];
        const spendingLevel = wealth?.dailyCash != null ? `$${(wealth.dailyCash/100).toFixed(2)}` : null;
        const cash = wealth?.totalCash != null ? `$${(wealth.totalCash/100).toFixed(2)}` : null;
        const assets = wealth?.assets != null ? `$${(wealth.assets/100).toFixed(2)}` : null;
        printSheet({ characterName: ai.characterName, attributes: modifiedAttributes, skills, inventory: inv, portraitDataUrl, damageBonus: derivedStats?.DamageBonus || null, spendingLevel, nationality: ai.nationality, cash, assets, gender: ai.gender, occupationName: selectedOccupation?.name || null, dob: ai.dob || null });
    };

    const isStatsTabComplete = uiState.completedTabs.has('stats');
    const isSkillsTabComplete = uiState.completedTabs.has('skills');

    const shouldSkillsTabGlow = isStatsTabComplete && !isSkillsTabComplete && uiState.activeTab !== 'skills';
    const shouldGearTabGlow = isSkillsTabComplete && !uiState.completedTabs.has('gear') && uiState.activeTab !== 'gear';
    
    return (
        <CharacterProvider character={character}>
            <SaveSlotDrawer />
            <div className="min-h-screen bg-background text-foreground font-lato p-4 sm:p-8">
                <Toast 
                    message={uiState.toast?.message ?? null} 
                    type={uiState.toast?.type ?? 'error'} 
                    onDismiss={() => uiState.setToastMessage(null)} 
                />
                {viewingOccupation && <OccupationInfoModal occupation={viewingOccupation} onClose={() => setViewingOccupation(null)} />}
                {uiState.isPromptModalVisible && <PromptInfoModal title="Full Portrait AI Prompt" prompt={ai.portraitPrompt || "Generate a portrait to see the full AI prompt here."} onClose={() => uiState.setIsPromptModalVisible(false)} />}
                {uiState.isErasModalVisible && <ErasModal onClose={() => uiState.setIsErasModalVisible(false)} />}
                {uiState.isSettingsModalVisible && <SettingsModal onClose={() => uiState.setIsSettingsModalVisible(false)} />}
                
                <div className="max-w-7xl mx-auto">
                    <header className="text-center mb-4"><PlaceholderLogo className="w-full max-w-lg mx-auto h-auto px-4" /></header>
                    <div className="mb-8 flex justify-center items-center gap-4">
                        <button onClick={() => uiState.setIsErasModalVisible(true)} className="bg-secondary hover:bg-opacity-80 text-secondary-foreground font-bold py-3 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring border-b-4 border-black/20" aria-label="Select Content Eras">
                            <i className="fa-solid fa-book-journal-whills fa-lg"></i>
                            <span className="hidden sm:inline">ERAS</span>
                        </button>
                        <nav className="flex justify-center" aria-label="Tabs">
                            <TabButton isActive={uiState.activeTab === 'stats'} isCompleted={uiState.completedTabs.has('stats')} onClick={() => uiState.setActiveTab('stats')} isDisabled={false}><span className="sm:hidden">1</span><span className="hidden sm:inline">1. Characteristics</span></TabButton>
                            <TabButton isActive={uiState.activeTab === 'skills'} isCompleted={uiState.completedTabs.has('skills')} onClick={() => uiState.setActiveTab('skills')} shouldGlow={shouldSkillsTabGlow} isDisabled={isDeceased}><span className="sm:hidden">2</span><span className="hidden sm:inline">2. Skills</span></TabButton>
                            <TabButton isActive={uiState.activeTab === 'gear'} isCompleted={uiState.completedTabs.has('gear')} onClick={() => uiState.setActiveTab('gear')} shouldGlow={shouldGearTabGlow} isDisabled={isDeceased}><span className="sm:hidden">3</span><span className="hidden sm:inline">3. Gear</span></TabButton>
                            <TabButton isActive={uiState.activeTab === 'dossier'} isCompleted={uiState.completedTabs.has('dossier')} onClick={() => uiState.setActiveTab('dossier')} isDisabled={isDeceased}><span className="sm:hidden">4</span><span className="hidden sm:inline">4. Bio</span></TabButton>
                        </nav>
                        <button onClick={handlePrint} disabled={isDeceased || isPrinting} className={`bg-primary hover:bg-opacity-80 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed text-primary-foreground font-bold py-3 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring border-b-4 border-black/20`}>
                           <PrintIcon className="h-5 w-5" />
                           <span className="hidden sm:inline">{isPrinting ? 'Printing...' : 'PRINT'}</span>
                        </button>
                        <button 
                            onClick={() => uiState.setIsSettingsModalVisible(true)} 
                            className="bg-secondary hover:bg-opacity-80 text-secondary-foreground font-bold py-3 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring border-b-4 border-black/20"
                            aria-label="Configure Settings">
                            <GearIcon className="h-5 w-5" />
                        </button>
                    </div>

                    <main id="main-content">
                        {uiState.activeTab === 'stats' && (
                            <StatsTab 
                                handleRoll={handleRollWrapper}
                                attributes={modifiedAttributes}
                                derivedStats={derivedStats}
                                occupations={aggregatedData.OCCUPATIONS}
                                selectedOccupation={selectedOccupation}
                                onSelectOccupation={setOccupation}
                                onShowOccupationInfo={setViewingOccupation}
                                rollHistory={rollHistory}
                                onRestoreRoll={handleRestoreRollWrapper}
                                setActiveTab={uiState.setActiveTab}
                                experiencePackages={aggregatedData.EXPERIENCE_PACKAGES || []}
                                onSelectExperiencePackage={(pkg) => {
                                    setSelectedExperiencePackageName(pkg?.name ?? null);
                                    character.handleSelectExperiencePackage(pkg as any);
                                    // Navigation to next step (skills or talents) is handled inside StatsTab now
                                }}
                                experienceSanPenalty={(character as any).experienceSanPenalty}
                                experiencePackageName={(character as any).selectedExperiencePackage?.name ?? selectedExperiencePackageName ?? null}
                                // Age props
                                selectedAgeCategory={character.selectedAgeCategory}
                                handleSelectAgeCategory={character.handleSelectAgeCategory}
                                ageDeductions={character.ageDeductions}
                                handleAgeAttributeDeduct={character.handleAgeAttributeDeduct}
                                eduImprovementRolls={character.eduImprovementRolls}
                                handleEduImprovementCheck={character.handleEduImprovementCheck}
                            />
                        )}
                        {uiState.activeTab === 'skills' && (
                           <SkillsTab />
                        )}
                        {uiState.activeTab === 'gear' && <GearTab 
                            kitInventory={kitInventory}
                            inventory={inventory}
                            onDrop={handleDrop}
                            onDeleteItem={handleDeleteItem}
                        />}
                        {uiState.activeTab === 'dossier' && (
                            <DossierTab 
                                onShowPromptInfo={() => uiState.setIsPromptModalVisible(true)}
                                dob={ai.dob}
                                setDob={ai.setDob}
                                dobOverwrittenByCareer={ai.dobOverwrittenByCareer}
                            />
                        )}
                    </main>
                    {/* Experience selection is inline in StatsTab now */}
                    <footer className="text-center mt-12 text-secondary-900 text-sm">
                       <p>Call of Cthulhu AI-Powered Investigator Creator. This is an unofficial fan project.</p>
                    </footer>
                </div>
            </div>
        </CharacterProvider>
    );
};

const App: React.FC = () => (
    <SheetProvider>
        <EraProvider>
            <AppContent />
        </EraProvider>
    </SheetProvider>
);

export default App;
