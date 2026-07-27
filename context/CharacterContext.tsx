import React, { createContext, useContext, useMemo } from 'react';
import type { useCharacter } from '../hooks/useCharacter';

/** Full character API (return type of useCharacter). */
export type CharacterApi = NonNullable<ReturnType<typeof useCharacter>>;

/** Characteristics, occupation, age, rolls, AI identity helpers. */
export type CharacterIdentitySlice = Pick<
  CharacterApi,
  | 'aggregatedData'
  | 'attributes'
  | 'modifiedAttributes'
  | 'derivedStats'
  | 'selectedOccupation'
  | 'setOccupation'
  | 'ai'
  | 'handleRoll'
  | 'rollHistory'
  | 'handleRestoreRoll'
  | 'selectedAgeCategory'
  | 'handleSelectAgeCategory'
  | 'ageDeductions'
  | 'handleAgeAttributeDeduct'
  | 'eduImprovementRolls'
  | 'handleEduImprovementCheck'
  | 'selectedExperiencePackage'
  | 'handleSelectExperiencePackage'
  | 'experiencePoints'
  | 'experienceEligibleSkills'
  | 'experienceNotes'
  | 'occupationNotes'
  | 'selectedArchetype'
  | 'handleSelectArchetype'
  | 'archetypePoints'
  | 'archetypeEligibleSkills'
  | 'archetypeCoreChoice'
  | 'setArchetypeCoreChoice'
  | 'coreCharacteristicInfo'
  | 'pulpRulesEnabled'
  | 'setPulpRulesEnabled'
  | 'selectedTalents'
  | 'toggleTalent'
  | 'randomizeTalentFrom'
  | 'maxTalents'
  | 'optionalRules'
  | 'setOptionalRuleEnabled'
  | 'rolledLifeEvents'
  | 'lifeEventModifiers'
  | 'handleRollLifeEvents'
  | 'handleLifeEventSpecialization'
  | 'lifeEventCount'
  | 'isDeceased'
>;

/** Skill allocation, pools, AI distribution. */
export type CharacterSkillsSlice = Pick<
  CharacterApi,
  | 'skills'
  | 'occupationalSkillPoints'
  | 'personalSkillPoints'
  | 'skillPointAssignments'
  | 'handleSkillPointChange'
  | 'handleSkillsReset'
  | 'handleAiSkillDistribution'
  | 'applyPendingAiDistribution'
  | 'clearPendingAiDistribution'
  | 'pendingAiDistribution'
  | 'isAiDistributionRunning'
  | 'activeSkillPool'
  | 'setActiveSkillPool'
  | 'userCreatedSkills'
  | 'handleAddSpecialization'
  | 'handleDeleteSpecialization'
  | 'allSkillsWithCalculatedBases'
  | 'allOccupationChoicesMade'
  | 'occupationSkillChoices'
  | 'handleOccupationSkillChoice'
  | 'effectiveOccupationalSkills'
  | 'selectedSpecialTrainings'
  | 'handleToggleSpecialTraining'
  | 'experiencePoints'
  | 'experienceEligibleSkills'
  | 'archetypePoints'
  | 'archetypeEligibleSkills'
  | 'pulpRulesEnabled'
  | 'lifeEventModifiers'
  | 'rolledLifeEvents'
  | 'attributes'
  | 'selectedOccupation'
  | 'aggregatedData'
>;

/** Inventory, wealth, kits. */
export type CharacterGearSlice = Pick<
  CharacterApi,
  | 'setEquipmentKit'
  | 'activeKitName'
  | 'kitInventory'
  | 'inventory'
  | 'handleDrop'
  | 'handleDeleteItem'
  | 'handleAssignPrice'
  | 'wealth'
  | 'convertAssetsToCash'
  | 'attributes'
  | 'derivedStats'
  | 'aggregatedData'
>;

/** Campfire / scout extras and save load. */
export type CharacterExtrasSlice = Pick<
  CharacterApi,
  | 'isCampfireEra'
  | 'familyCreditStatus'
  | 'campfireRawRolls'
  | 'setFamilyCreditStatus'
  | 'selectedScoutRankBadge'
  | 'setScoutRankBadge'
  | 'earnedScoutBadges'
  | 'selectedScoutAbilityBadges'
  | 'setScoutAbilityBadgeChoice'
  | 'toggleScoutAbilityBadge'
  | 'scoutAbilityBadgeAllowance'
  | 'scoutAdditionalAbilityBadgeAllowance'
  | 'scoutHobbyAbilityBadges'
  | 'scoutBackstory'
  | 'updateScoutBackstory'
  | 'distressBoxes'
  | 'adversityBoxes'
  | 'toggleDistressBox'
  | 'toggleAdversityBox'
  | 'campfireRankBadges'
  | 'campfireAbilityBadges'
  | 'campfireDistressBoxes'
  | 'campfireAdversityBoxes'
  | 'loadFromSaveData'
  | 'aggregatedData'
  | 'ai'
>;

const CharacterFullContext = createContext<CharacterApi | null>(null);
const CharacterIdentityContext = createContext<CharacterIdentitySlice | null>(null);
const CharacterSkillsContext = createContext<CharacterSkillsSlice | null>(null);
const CharacterGearContext = createContext<CharacterGearSlice | null>(null);
const CharacterExtrasContext = createContext<CharacterExtrasSlice | null>(null);

/**
 * Provides sliced character state so skill edits do not re-render gear/bio
 * consumers (and vice versa). Full API remains available via useCharacterContext.
 */
export const CharacterProvider: React.FC<{
  character: CharacterApi;
  children: React.ReactNode;
}> = ({ character, children }) => {
  const identity = useMemo<CharacterIdentitySlice>(
    () => ({
      aggregatedData: character.aggregatedData,
      attributes: character.attributes,
      modifiedAttributes: character.modifiedAttributes,
      derivedStats: character.derivedStats,
      selectedOccupation: character.selectedOccupation,
      setOccupation: character.setOccupation,
      ai: character.ai,
      handleRoll: character.handleRoll,
      rollHistory: character.rollHistory,
      handleRestoreRoll: character.handleRestoreRoll,
      selectedAgeCategory: character.selectedAgeCategory,
      handleSelectAgeCategory: character.handleSelectAgeCategory,
      ageDeductions: character.ageDeductions,
      handleAgeAttributeDeduct: character.handleAgeAttributeDeduct,
      eduImprovementRolls: character.eduImprovementRolls,
      handleEduImprovementCheck: character.handleEduImprovementCheck,
      selectedExperiencePackage: character.selectedExperiencePackage,
      handleSelectExperiencePackage: character.handleSelectExperiencePackage,
      experiencePoints: character.experiencePoints,
      experienceEligibleSkills: character.experienceEligibleSkills,
      experienceNotes: character.experienceNotes,
      occupationNotes: character.occupationNotes,
      selectedArchetype: character.selectedArchetype,
      handleSelectArchetype: character.handleSelectArchetype,
      archetypePoints: character.archetypePoints,
      archetypeEligibleSkills: character.archetypeEligibleSkills,
      archetypeCoreChoice: character.archetypeCoreChoice,
      setArchetypeCoreChoice: character.setArchetypeCoreChoice,
      coreCharacteristicInfo: character.coreCharacteristicInfo,
      pulpRulesEnabled: character.pulpRulesEnabled,
      setPulpRulesEnabled: character.setPulpRulesEnabled,
      selectedTalents: character.selectedTalents,
      toggleTalent: character.toggleTalent,
      randomizeTalentFrom: character.randomizeTalentFrom,
      maxTalents: character.maxTalents,
      optionalRules: character.optionalRules,
      setOptionalRuleEnabled: character.setOptionalRuleEnabled,
      rolledLifeEvents: character.rolledLifeEvents,
      lifeEventModifiers: character.lifeEventModifiers,
      handleRollLifeEvents: character.handleRollLifeEvents,
      handleLifeEventSpecialization: character.handleLifeEventSpecialization,
      lifeEventCount: character.lifeEventCount,
      isDeceased: character.isDeceased,
    }),
    [
      character.aggregatedData,
      character.attributes,
      character.modifiedAttributes,
      character.derivedStats,
      character.selectedOccupation,
      character.setOccupation,
      character.ai,
      character.handleRoll,
      character.rollHistory,
      character.handleRestoreRoll,
      character.selectedAgeCategory,
      character.handleSelectAgeCategory,
      character.ageDeductions,
      character.handleAgeAttributeDeduct,
      character.eduImprovementRolls,
      character.handleEduImprovementCheck,
      character.selectedExperiencePackage,
      character.handleSelectExperiencePackage,
      character.experiencePoints,
      character.experienceEligibleSkills,
      character.experienceNotes,
      character.occupationNotes,
      character.selectedArchetype,
      character.handleSelectArchetype,
      character.archetypePoints,
      character.archetypeEligibleSkills,
      character.archetypeCoreChoice,
      character.setArchetypeCoreChoice,
      character.coreCharacteristicInfo,
      character.pulpRulesEnabled,
      character.setPulpRulesEnabled,
      character.selectedTalents,
      character.toggleTalent,
      character.randomizeTalentFrom,
      character.maxTalents,
      character.optionalRules,
      character.setOptionalRuleEnabled,
      character.rolledLifeEvents,
      character.lifeEventModifiers,
      character.handleRollLifeEvents,
      character.handleLifeEventSpecialization,
      character.lifeEventCount,
      character.isDeceased,
    ],
  );

  const skills = useMemo<CharacterSkillsSlice>(
    () => ({
      skills: character.skills,
      occupationalSkillPoints: character.occupationalSkillPoints,
      personalSkillPoints: character.personalSkillPoints,
      skillPointAssignments: character.skillPointAssignments,
      handleSkillPointChange: character.handleSkillPointChange,
      handleSkillsReset: character.handleSkillsReset,
      handleAiSkillDistribution: character.handleAiSkillDistribution,
      applyPendingAiDistribution: character.applyPendingAiDistribution,
      clearPendingAiDistribution: character.clearPendingAiDistribution,
      pendingAiDistribution: character.pendingAiDistribution,
      isAiDistributionRunning: character.isAiDistributionRunning,
      activeSkillPool: character.activeSkillPool,
      setActiveSkillPool: character.setActiveSkillPool,
      userCreatedSkills: character.userCreatedSkills,
      handleAddSpecialization: character.handleAddSpecialization,
      handleDeleteSpecialization: character.handleDeleteSpecialization,
      allSkillsWithCalculatedBases: character.allSkillsWithCalculatedBases,
      allOccupationChoicesMade: character.allOccupationChoicesMade,
      occupationSkillChoices: character.occupationSkillChoices,
      handleOccupationSkillChoice: character.handleOccupationSkillChoice,
      effectiveOccupationalSkills: character.effectiveOccupationalSkills,
      selectedSpecialTrainings: character.selectedSpecialTrainings,
      handleToggleSpecialTraining: character.handleToggleSpecialTraining,
      experiencePoints: character.experiencePoints,
      experienceEligibleSkills: character.experienceEligibleSkills,
      archetypePoints: character.archetypePoints,
      archetypeEligibleSkills: character.archetypeEligibleSkills,
      pulpRulesEnabled: character.pulpRulesEnabled,
      lifeEventModifiers: character.lifeEventModifiers,
      rolledLifeEvents: character.rolledLifeEvents,
      attributes: character.attributes,
      selectedOccupation: character.selectedOccupation,
      aggregatedData: character.aggregatedData,
    }),
    [
      character.skills,
      character.occupationalSkillPoints,
      character.personalSkillPoints,
      character.skillPointAssignments,
      character.handleSkillPointChange,
      character.handleSkillsReset,
      character.handleAiSkillDistribution,
      character.applyPendingAiDistribution,
      character.clearPendingAiDistribution,
      character.pendingAiDistribution,
      character.isAiDistributionRunning,
      character.activeSkillPool,
      character.setActiveSkillPool,
      character.userCreatedSkills,
      character.handleAddSpecialization,
      character.handleDeleteSpecialization,
      character.allSkillsWithCalculatedBases,
      character.allOccupationChoicesMade,
      character.occupationSkillChoices,
      character.handleOccupationSkillChoice,
      character.effectiveOccupationalSkills,
      character.selectedSpecialTrainings,
      character.handleToggleSpecialTraining,
      character.experiencePoints,
      character.experienceEligibleSkills,
      character.archetypePoints,
      character.archetypeEligibleSkills,
      character.pulpRulesEnabled,
      character.lifeEventModifiers,
      character.rolledLifeEvents,
      character.attributes,
      character.selectedOccupation,
      character.aggregatedData,
    ],
  );

  const gear = useMemo<CharacterGearSlice>(
    () => ({
      setEquipmentKit: character.setEquipmentKit,
      activeKitName: character.activeKitName,
      kitInventory: character.kitInventory,
      inventory: character.inventory,
      handleDrop: character.handleDrop,
      handleDeleteItem: character.handleDeleteItem,
      handleAssignPrice: character.handleAssignPrice,
      wealth: character.wealth,
      convertAssetsToCash: character.convertAssetsToCash,
      attributes: character.attributes,
      derivedStats: character.derivedStats,
      aggregatedData: character.aggregatedData,
    }),
    [
      character.setEquipmentKit,
      character.activeKitName,
      character.kitInventory,
      character.inventory,
      character.handleDrop,
      character.handleDeleteItem,
      character.handleAssignPrice,
      character.wealth,
      character.convertAssetsToCash,
      character.attributes,
      character.derivedStats,
      character.aggregatedData,
    ],
  );

  const extras = useMemo<CharacterExtrasSlice>(
    () => ({
      isCampfireEra: character.isCampfireEra,
      familyCreditStatus: character.familyCreditStatus,
      campfireRawRolls: character.campfireRawRolls,
      setFamilyCreditStatus: character.setFamilyCreditStatus,
      selectedScoutRankBadge: character.selectedScoutRankBadge,
      setScoutRankBadge: character.setScoutRankBadge,
      earnedScoutBadges: character.earnedScoutBadges,
      selectedScoutAbilityBadges: character.selectedScoutAbilityBadges,
      setScoutAbilityBadgeChoice: character.setScoutAbilityBadgeChoice,
      toggleScoutAbilityBadge: character.toggleScoutAbilityBadge,
      scoutAbilityBadgeAllowance: character.scoutAbilityBadgeAllowance,
      scoutAdditionalAbilityBadgeAllowance: character.scoutAdditionalAbilityBadgeAllowance,
      scoutHobbyAbilityBadges: character.scoutHobbyAbilityBadges,
      scoutBackstory: character.scoutBackstory,
      updateScoutBackstory: character.updateScoutBackstory,
      distressBoxes: character.distressBoxes,
      adversityBoxes: character.adversityBoxes,
      toggleDistressBox: character.toggleDistressBox,
      toggleAdversityBox: character.toggleAdversityBox,
      campfireRankBadges: character.campfireRankBadges,
      campfireAbilityBadges: character.campfireAbilityBadges,
      campfireDistressBoxes: character.campfireDistressBoxes,
      campfireAdversityBoxes: character.campfireAdversityBoxes,
      loadFromSaveData: character.loadFromSaveData,
      aggregatedData: character.aggregatedData,
      ai: character.ai,
    }),
    [
      character.isCampfireEra,
      character.familyCreditStatus,
      character.campfireRawRolls,
      character.setFamilyCreditStatus,
      character.selectedScoutRankBadge,
      character.setScoutRankBadge,
      character.earnedScoutBadges,
      character.selectedScoutAbilityBadges,
      character.setScoutAbilityBadgeChoice,
      character.toggleScoutAbilityBadge,
      character.scoutAbilityBadgeAllowance,
      character.scoutAdditionalAbilityBadgeAllowance,
      character.scoutHobbyAbilityBadges,
      character.scoutBackstory,
      character.updateScoutBackstory,
      character.distressBoxes,
      character.adversityBoxes,
      character.toggleDistressBox,
      character.toggleAdversityBox,
      character.campfireRankBadges,
      character.campfireAbilityBadges,
      character.campfireDistressBoxes,
      character.campfireAdversityBoxes,
      character.loadFromSaveData,
      character.aggregatedData,
      character.ai,
    ],
  );

  return (
    <CharacterFullContext.Provider value={character}>
      <CharacterIdentityContext.Provider value={identity}>
        <CharacterSkillsContext.Provider value={skills}>
          <CharacterGearContext.Provider value={gear}>
            <CharacterExtrasContext.Provider value={extras}>
              {children}
            </CharacterExtrasContext.Provider>
          </CharacterGearContext.Provider>
        </CharacterSkillsContext.Provider>
      </CharacterIdentityContext.Provider>
    </CharacterFullContext.Provider>
  );
};

const requireSlice = <T,>(value: T | null, name: string): T => {
  if (!value) {
    throw new Error(`${name} must be used within a CharacterProvider`);
  }
  return value;
};

/** Full character API — use for save/load or multi-slice screens. Prefer narrow hooks when possible. */
export const useCharacterContext = () =>
  requireSlice(useContext(CharacterFullContext), 'useCharacterContext');

export const useCharacterIdentity = () =>
  requireSlice(useContext(CharacterIdentityContext), 'useCharacterIdentity');

export const useCharacterSkills = () =>
  requireSlice(useContext(CharacterSkillsContext), 'useCharacterSkills');

export const useCharacterGear = () =>
  requireSlice(useContext(CharacterGearContext), 'useCharacterGear');

export const useCharacterExtras = () =>
  requireSlice(useContext(CharacterExtrasContext), 'useCharacterExtras');
