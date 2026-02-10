import React, { useEffect, useMemo } from 'react';
import type { Attribute, AttributeSet, Occupation, Tab, OccupationGroup, AgeCategory, ExperiencePackage } from '../types';
import { DiceIcon } from './icons/DiceIcon';
import { AttributeDisplay } from './AttributeDisplay';
import { OccupationCard } from './OccupationCard';
import { RollHistoryCard } from './RollHistoryCard';
import { Tooltip } from './Tooltip';
import { parseSkillPointFormula } from '../utils';
import { AGE_CATEGORIES } from '../age.config';
import { AgeSelector } from './AgeSelector';
import { ExperiencePackageInfoModal } from './ExperiencePackageInfoModal';
import { QuestionIcon } from './icons/QuestionIcon';
import { CheckIcon } from './icons/CheckIcon';
import { useEraContext } from '../context/SourceContext';
import { useCharacterContext } from '../context/CharacterContext';
import { TalentSelector } from './TalentSelector';
import { ArchetypeCard } from './ArchetypeCard';
import { ArchetypeInfoModal } from './ArchetypeInfoModal';
import { ArchetypeCoreChoiceModal } from './ArchetypeCoreChoiceModal';
import { LifeEventsDisplay } from './LifeEventsDisplay';
import { ModifierPill } from './ModifierPill';

const ATTRIBUTES: Attribute[] = ['STR', 'CON', 'SIZ', 'DEX', 'APP', 'INT', 'POW', 'EDU'];
const ATTRIBUTE_MAP: Record<Attribute, string> = {
    STR: 'Strength', CON: 'Constitution', SIZ: 'Size',
    DEX: 'Dexterity', APP: 'Appearance', INT: 'Intelligence',
    POW: 'Power', EDU: 'Education', LUCK: 'Luck'
};

const DERIVED_STAT_MAP: Record<string, string> = {
    HP: 'Hit Points',
    SAN: 'Sanity',
    MP: 'Magic',
    MOV: 'Movement',
};

// Define the desired order for occupation groups
const GROUP_ORDER: OccupationGroup[] = [
    'Lovecraftian',
    'War',
    'Crafts',
    'Academic',
    'Entertainer',
    'Manual Labor',
    'Investigative',
    'Professional',
    'Upper Class',
    'Criminal',
    'Dilettante',
];


interface StatsTabProps {
    handleRoll: () => void;
    attributes: AttributeSet | null;
    derivedStats: { SAN: number; HP: number; MP: number; LUCK: number; DamageBonus: string, Build: number, MOV: number } | null;
    occupations: Occupation[];
    selectedOccupation: Occupation | null;
    onSelectOccupation: (name: string) => void;
    onShowOccupationInfo: (occupation: Occupation) => void;
    rollHistory: AttributeSet[];
    onRestoreRoll: (roll: AttributeSet) => void;
    setActiveTab: (tab: Tab) => void;
    experiencePackages?: ExperiencePackage[];
    onSelectExperiencePackage?: (pkg: ExperiencePackage | null) => void;
    experienceSanPenalty?: number;
    experiencePackageName?: string | null;
    // Age Props
    selectedAgeCategory: AgeCategory | null;
    handleSelectAgeCategory: (category: AgeCategory | null) => void;
    ageDeductions: { required: number; applied: Record<string, number> };
    handleAgeAttributeDeduct: (attr: 'STR' | 'CON' | 'DEX' | 'SIZ', action?: 'add' | 'remove') => void;
    eduImprovementRolls: number[];
    handleEduImprovementCheck: () => void;
}

type EnrichedOccupation = Occupation & {
    recommendationLevel?: 'BEST CHOICE' | 'RECOMMENDED';
};

export const StatsTab: React.FC<StatsTabProps> = ({
    handleRoll,
    attributes,
    derivedStats,
    occupations,
    selectedOccupation,
    onSelectOccupation,
    onShowOccupationInfo,
    rollHistory,
    onRestoreRoll,
    setActiveTab,
    experiencePackages = [],
    onSelectExperiencePackage,
    experienceSanPenalty,
    experiencePackageName,
    // Age Props
    selectedAgeCategory,
    handleSelectAgeCategory,
    ageDeductions,
    handleAgeAttributeDeduct,
    eduImprovementRolls,
    handleEduImprovementCheck
}) => {
    const { selectedEra } = useEraContext();
    const { pulpRulesEnabled, setPulpRulesEnabled, aggregatedData, optionalRules, setOptionalRuleEnabled, selectedArchetype, handleSelectArchetype, archetypeCoreChoice, setArchetypeCoreChoice, coreCharacteristicInfo, rolledLifeEvents, handleRollLifeEvents, handleLifeEventSpecialization, lifeEventCount, lifeEventModifiers } = useCharacterContext();
    const isPulpEra = selectedEra === 'pulp-1930s';
    const isWesternEra = (selectedEra === 'western-1870s' || selectedEra === 'western-1880s');
    const isGaslightEra = selectedEra === 'gaslight-1890s';
    const isDarkAges = selectedEra === 'dark-ages-1000s';
    const hasOptionalRules = isWesternEra || isPulpEra; // Extend this as more eras get rules
    // Ensure Pulp era forces the switch ON and disabled
    useEffect(() => {
        if (isPulpEra && !pulpRulesEnabled) {
            setPulpRulesEnabled(true);
        }
    }, [isPulpEra, pulpRulesEnabled, setPulpRulesEnabled]);
    
    const ageConfig = AGE_CATEGORIES.find(c => c.label === selectedAgeCategory);
    // FIX: Add explicit type to `val` in reduce function to prevent type error.
    const deductionsApplied = ageDeductions ? Object.values(ageDeductions.applied).reduce<number>((sum, val: number) => sum + val, 0) : 0;
    const deductionsRemaining = ageDeductions ? ageDeductions.required - deductionsApplied : 0;
    const deductionsComplete = deductionsRemaining <= 0;

    const eduChecksAvailable = ageConfig?.eduChecks ?? 0;
    const eduChecksCompleted = eduImprovementRolls.length;
    const remainingEduChecks = eduChecksAvailable - eduChecksCompleted;


    const [isSelectingExperience, setIsSelectingExperience] = React.useState(false);
    const [isSelectingTalents, setIsSelectingTalents] = React.useState(false);
    const [infoPkg, setInfoPkg] = React.useState<ExperiencePackage | null>(null);
    const [infoArchetype, setInfoArchetype] = React.useState<any | null>(null);
    const [justSelectedExperienceName, setJustSelectedExperienceName] = React.useState<string | 'NONE' | null>(null);
    // Scroll to top of the Selection header between steps
    const selectionHeaderRef = React.useRef<HTMLHeadingElement>(null);

    const handleSelectExperience = (pkg: ExperiencePackage | null) => {
        if (!onSelectExperiencePackage) return;
        setJustSelectedExperienceName(pkg ? pkg.name : 'NONE');
        setTimeout(() => {
            onSelectExperiencePackage(pkg);
            const hasTalents = (aggregatedData.TALENTS || []).length > 0 && pulpRulesEnabled;
            if (hasTalents) {
                setIsSelectingExperience(false);
                setIsSelectingTalents(true);
            } else {
                setIsSelectingExperience(false);
                setIsSelectingTalents(false);
                setActiveTab('skills');
            }
        }, 350);
    };

    const handleSelectOccupation = (name: string) => {
        onSelectOccupation(name);
        // Brief delay to show the selection check before moving on
        setTimeout(() => {
            const hasTalents = (aggregatedData.TALENTS || []).length > 0 && pulpRulesEnabled;
            if (experiencePackages && experiencePackages.length > 0) {
                setIsSelectingExperience(true);
            } else if (hasTalents) {
                setIsSelectingTalents(true);
            } else {
                setActiveTab('skills');
            }
        }, 350);
    };
    
    const isPulpWithArchetypes = isPulpEra && (aggregatedData.ARCHETYPES || []).length > 0;
    const showArchetypeStep = isPulpWithArchetypes && !selectedArchetype;
    const currentSelectionStep: 'archetype' | 'occupation' | 'experience' | 'talents' | null = showArchetypeStep
        ? 'archetype'
        : (isSelectingExperience ? 'experience' : (isSelectingTalents ? 'talents' : 'occupation'));
    useEffect(() => {
        if (currentSelectionStep && selectionHeaderRef.current) {
            selectionHeaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentSelectionStep]);
    
    const occupationGroups = useMemo(() => {
        const groups: Record<string, Occupation[]> = {};
        occupations.forEach(occ => {
            if (!groups[occ.group]) {
                groups[occ.group] = [];
            }
            groups[occ.group].push(occ);
        });

        return Object.entries(groups)
            .map(([name, list]) => {
                const enrichedList: EnrichedOccupation[] = list.map(occ => {
                     // Recommendation logic disabled per user request, but functionality retained for future use.
                    return { ...occ, recommendationLevel: undefined };
                }).sort((a, b) => a.name.localeCompare(b.name));
                
                return { name, list: enrichedList };
            })
            .sort((a, b) => {
                const indexA = GROUP_ORDER.indexOf(a.name as OccupationGroup);
                const indexB = GROUP_ORDER.indexOf(b.name as OccupationGroup);
                if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name);
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;
                return indexA - indexB;
            });
    }, [occupations, attributes]);
    
    const derivedStatOrder = ['HP', 'SAN', 'MP', 'MOV'];
    const effectiveSanPenalty = React.useMemo(() => {
        const p = typeof experienceSanPenalty === 'number' ? experienceSanPenalty : 0;
        if (p && p > 0) return p;
        if (attributes && derivedStats) {
            const diff = attributes.POW - derivedStats.SAN;
            return diff > 0 ? diff : 0;
        }
        return 0;
    }, [experienceSanPenalty, attributes, derivedStats]);

    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <div className="text-center">
                <button onClick={handleRoll} className="bg-primary hover:bg-opacity-80 disabled:bg-neutral-300 text-primary-foreground font-bold py-3 px-8 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto gap-2 border-b-4 border-black/20">
                    <DiceIcon className="h-6 w-6"/>
                    Roll Characteristics
                </button>
            </div>
            {attributes && derivedStats && (
                <>
                    <div>
                        <h3 className="text-2xl font-bold font-lora text-primary mb-4 text-center">Primary Characteristics</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {ATTRIBUTES.map(attr => {
                                const showDeductButton = !!ageConfig?.deductions.pool.includes(attr as any);
                                const showEduCheckButton = attr === 'EDU' && deductionsComplete && remainingEduChecks > 0;
                                const isCore = !!(isPulpEra && selectedArchetype && archetypeCoreChoice === attr);
                                const tooltip = isCore ? (() => {
                                    const archName = selectedArchetype?.name;
                                    const rolled = coreCharacteristicInfo.roll;
                                    const original = coreCharacteristicInfo.originalBase;
                                    const boosted = coreCharacteristicInfo.boostedValue;
                                    const header = `Core Characteristic of ${archName}`;
                                    if (typeof original === 'number' && typeof boosted === 'number' && typeof rolled === 'number') {
                                        return `${header}\nBase: ${original} → Boosted: ${boosted} (rolled ${rolled})`;
                                    }
                                    return header;
                                })() : undefined;
                                
                                // Life Event modifiers (Dark Ages only)
                                const lifeEventChange = isDarkAges ? (lifeEventModifiers.attributes[attr] || 0) : 0;
                                const lifeEventSource = (isDarkAges && lifeEventChange !== 0)
                                    ? rolledLifeEvents
                                        .filter(e => e.modifiers?.attributes?.[attr])
                                        .map(e => e.name)
                                        .join(', ')
                                    : undefined;
                                
                                return (
                                    <AttributeDisplay 
                                        key={attr} 
                                        label={ATTRIBUTE_MAP[attr]} 
                                        score={attributes[attr]}
                                        tooltip={tooltip}
                                        highlight={isCore}
                                        lifeEventChange={lifeEventChange}
                                        lifeEventSource={lifeEventSource}
                                        showDeductButton={showDeductButton}
                                        onDecrease={() => handleAgeAttributeDeduct(attr as any, 'add')}
                                        onIncrease={() => handleAgeAttributeDeduct(attr as any, 'remove')}
                                        deductionsApplied={deductionsApplied}
                                        deductionsRequired={ageDeductions.required}
                                        showEduCheckButton={showEduCheckButton}
                                        onEduCheck={handleEduImprovementCheck}
                                        remainingEduChecks={remainingEduChecks}
                                    />
                                );
                            })}
                            {deductionsRemaining > 0 && (
                                <div className="col-span-full text-center mt-2 p-2 bg-[var(--surface-warning)] border border-warning text-warning rounded-md text-sm font-semibold whitespace-nowrap">
                                    Please deduct {deductionsRemaining} more point(s) from STR, CON, or DEX.
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold font-lora text-primary mb-4 text-center">Select Age</h3>
                        <div className="max-w-xl mx-auto">
                            <AgeSelector selected={selectedAgeCategory} onSelect={handleSelectAgeCategory} disabled={!attributes} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold font-lora text-primary mb-4 text-center">Secondary Characteristics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card p-4 rounded-lg border border-border">
                             <div className="relative text-center bg-card p-3 rounded-md">
                                {isDarkAges && lifeEventModifiers.derivedStats?.LUCK && lifeEventModifiers.derivedStats.LUCK !== 0 ? (
                                    <Tooltip content={<div className="text-xs whitespace-pre-wrap">Life Events: LUCK modifier ({lifeEventModifiers.derivedStats.LUCK > 0 ? '+' : ''}{lifeEventModifiers.derivedStats.LUCK})</div>}>
                                        <div className="font-bold uppercase text-sm cursor-help" style={{ color: '#355e3b' }}>Luck</div>
                                    </Tooltip>
                                ) : (
                                    <div className="font-bold uppercase text-sm text-muted-foreground">Luck</div>
                                )}
                                {isDarkAges && lifeEventModifiers.derivedStats?.LUCK && lifeEventModifiers.derivedStats.LUCK !== 0 ? (
                                    <Tooltip content={<div className="text-xs whitespace-pre-wrap">Life Events: LUCK modifier ({lifeEventModifiers.derivedStats.LUCK > 0 ? '+' : ''}{lifeEventModifiers.derivedStats.LUCK})</div>}>
                                        <div className="text-3xl font-mono font-bold cursor-help" style={{ color: '#355e3b' }}>{derivedStats.LUCK}</div>
                                    </Tooltip>
                                ) : (
                                    <div className="text-3xl font-mono font-bold text-foreground">{derivedStats.LUCK}</div>
                                )}
                            </div>
                            {derivedStatOrder.map(key => {
                                const value = derivedStats[key as keyof typeof derivedStats];
                                const label = DERIVED_STAT_MAP[key] || key;
                                const isSan = key === 'SAN';
                                const hasLifeEventMod = isDarkAges && lifeEventModifiers.derivedStats?.[key as 'HP' | 'SAN' | 'MP' | 'MOV'] && lifeEventModifiers.derivedStats[key as 'HP' | 'SAN' | 'MP' | 'MOV'] !== 0;
                                const lifeEventValue = hasLifeEventMod ? lifeEventModifiers.derivedStats![key as 'HP' | 'SAN' | 'MP' | 'MOV'] : 0;
                                const lifeEventTooltip = hasLifeEventMod ? `Life Events: ${key} modifier (${lifeEventValue! > 0 ? '+' : ''}${lifeEventValue})` : undefined;
                                
                                return (
                                    <div key={key} className="relative text-center bg-card p-3 rounded-md">
                                        {hasLifeEventMod && lifeEventTooltip ? (
                                            <Tooltip content={<div className="text-xs whitespace-pre-wrap">{lifeEventTooltip}</div>}>
                                                <div className="font-bold uppercase text-sm cursor-help" style={{ color: '#355e3b' }}>
                                                    {label}
                                                </div>
                                            </Tooltip>
                                        ) : (
                                            <div className={`font-bold uppercase text-sm text-muted-foreground ${isSan ? 'flex items-center justify-center gap-2' : ''}`}>
                                                {label}
                                                {isSan && effectiveSanPenalty > 0 && (
                                                    <span className="relative top-[10px]">
                                                        <ModifierPill 
                                                            value={-effectiveSanPenalty} 
                                                            source={experiencePackageName || undefined}
                                                            type="experience"
                                                        />
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {hasLifeEventMod && lifeEventTooltip ? (
                                            <Tooltip content={<div className="text-xs whitespace-pre-wrap">{lifeEventTooltip}</div>}>
                                                <div className="text-3xl font-mono font-bold cursor-help" style={{ color: '#355e3b' }}>{value}</div>
                                            </Tooltip>
                                        ) : (
                                            <div className="text-3xl font-mono font-bold text-foreground">{value}</div>
                                        )}
                                    </div>
                                );
                            })}
                            <Tooltip content="Damage Bonus and Build are derived from STR + SIZ.">
                                <div className="relative text-center bg-card p-3 rounded-md">
                                    <div className="font-bold uppercase text-sm text-muted-foreground">Damage Bonus / Build</div>
                                    <div className="text-3xl font-mono font-bold text-foreground">
                                        {derivedStats.DamageBonus} / {derivedStats.Build > 0 ? `+${derivedStats.Build}`: derivedStats.Build}
                                    </div>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    {/* Optional Rules Section */}
                    {hasOptionalRules && (
                        <div>
                            <h3 className="text-2xl font-bold font-lora text-primary mb-4 text-center">Optional Rules</h3>
                            <div className="bg-card p-4 rounded-lg border border-border space-y-4">
                                {/* Western 1870s: Increased Hit Points */}
                                {isWesternEra && (
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="font-bold text-lg">Increased Hit Points</div>
                                            <div className="text-sm text-muted-foreground">
                                                Old West is deadly: investigators are tougher. Calculate HP as (CON + SIZ) ÷ 5 instead of ÷ 10.
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Applies to key NPCs as well; mooks still use the normal rule.
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-muted-foreground">Enabled</span>
                                            <button
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-ring ${optionalRules?.['western-increased-hp'] ? 'bg-primary' : 'bg-secondary'}`}
                                                onClick={() => setOptionalRuleEnabled('western-increased-hp', !optionalRules?.['western-increased-hp'])}
                                                aria-pressed={!!optionalRules?.['western-increased-hp']}
                                                aria-label="Toggle Increased Hit Points (Western)"
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${optionalRules?.['western-increased-hp'] ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* Pulp 1930s: Hardboiled (Increased Hit Points, -1 Talent) */}
                                {isPulpEra && (
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="font-bold text-lg">Hardboiled</div>
                                            <div className="text-sm text-muted-foreground">
                                                Pulp heroes are hard to kill. While Hardboiled is enabled, calculate HP as (CON + SIZ) ÷ 5 instead of ÷ 10.
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Grit has a cost: maximum Talents are reduced by 1.
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-muted-foreground">Enabled</span>
                                            <button
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-ring ${optionalRules?.['pulp-increased-hp'] ? 'bg-primary' : 'bg-secondary'}`}
                                                onClick={() => setOptionalRuleEnabled('pulp-increased-hp', !optionalRules?.['pulp-increased-hp'])}
                                                aria-pressed={!!optionalRules?.['pulp-increased-hp']}
                                                aria-label="Toggle Hardboiled (Pulp)"
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${optionalRules?.['pulp-increased-hp'] ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {/* Life Events Section - Dark Ages Only */}
                    {isDarkAges && aggregatedData.LIFE_EVENTS && aggregatedData.LIFE_EVENTS.length > 0 && (
                        <div>
                            <LifeEventsDisplay 
                                rolledEvents={rolledLifeEvents}
                                onRollEvents={handleRollLifeEvents}
                                onSpecializationSelect={handleLifeEventSpecialization}
                                eventCount={lifeEventCount}
                            />
                        </div>
                    )}
                    <div>
                        {showArchetypeStep ? (
                            <>
                                <h3 ref={selectionHeaderRef} className="text-2xl font-bold font-lora text-primary mb-4 text-center">Select Archetype</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pt-4">
                                    {(aggregatedData.ARCHETYPES || []).map((a) => (
                                        <ArchetypeCard
                                            key={a.name}
                                            archetype={a}
                                            isSelected={false}
                                            onSelect={() => handleSelectArchetype(a)}
                                            onShowInfo={() => setInfoArchetype(a)}
                                        />
                                    ))}
                                </div>
                                {infoArchetype && (
                                    <ArchetypeInfoModal archetype={infoArchetype} onClose={() => setInfoArchetype(null)} />
                                )}
                            </>
                        ) : (!isSelectingExperience && !isSelectingTalents) ? (
                            <>
                                <div className="mb-6">
                                    <h3 ref={selectionHeaderRef} className="text-2xl font-bold font-lora text-primary mb-2 text-center">Select Occupation</h3>
                                    <div className="grid grid-cols-3 items-center">
                                        <div />
                                        <div className="text-center">
                                            {isPulpWithArchetypes && selectedArchetype && (
                                                <button
                                                    className="text-black underline underline-offset-4 hover:opacity-80 font-semibold"
                                                    onClick={() => handleSelectArchetype(null)}
                                                    aria-label="Back to Archetypes"
                                                >
                                                    ← Back to Archetypes
                                                </button>
                                            )}
                                        </div>
                                        {(isPulpEra || isWesternEra || isGaslightEra) && (
                                            <div className="justify-self-end flex items-center gap-2">
                                                <span className="text-sm font-bold text-muted-foreground">Pulp Rules</span>
                                                <button
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-ring ${pulpRulesEnabled ? 'bg-primary' : 'bg-secondary'} ${isPulpEra ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                    onClick={() => { if (!isPulpEra) setPulpRulesEnabled(!pulpRulesEnabled); }}
                                                    aria-pressed={pulpRulesEnabled}
                                                    aria-label="Toggle Pulp Rules"
                                                    disabled={isPulpEra}
                                                >
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pulpRulesEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {occupationGroups.map(group => (
                                        group.list.length > 0 && (
                                            <div key={group.name} className="mb-12">
                                                <h4 className={`text-2xl font-lora font-semibold text-left mb-4 text-primary border-b-2 border-border pb-2`}>
                                                    {group.name}
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pt-4">
                                                    {group.list.map(p => (
                                                        <OccupationCard
                                                            key={p.name}
                                                            occupation={p}
                                                            isSelected={selectedOccupation?.name === p.name}
                                                            onSelect={() => handleSelectOccupation(p.name)}
                                                            onShowInfo={() => onShowOccupationInfo(p)}
                                                            recommendationLevel={selectedArchetype && selectedArchetype.suggestedOccupations.includes(p.name) ? 'RECOMMENDED' : p.recommendationLevel}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </>
                        ) : isSelectingExperience ? (
                            <>
                                <h3 ref={selectionHeaderRef} className="text-2xl font-bold font-lora text-primary mb-2 text-center">Select Experience Package</h3>
                                <div className="text-center mb-6">
                                    <button
                                        className="text-black underline underline-offset-4 hover:opacity-80 font-semibold"
                                        onClick={() => setIsSelectingExperience(false)}
                                        aria-label="Back to Occupations"
                                    >
                                        ← Back to Occupations
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                                    {/* No Experience Package card first, no (?) */}
                                    <div className={`relative w-full bg-card rounded-lg border-2 transition-all duration-200 border-border hover:border-primary flex flex-col shadow-sm`}>
                                        <div className="flex-grow">
                                            <button
                                                onClick={() => handleSelectExperience(null)}
                                                className="w-full h-full text-left p-4"
                                            >
                                                <div className="flex justify-between items-start gap-2">
                                                    <h4 className="font-bold font-lora text-lg text-primary">No Experience Package</h4>
                                                </div>
                                                <p className="text-sm text-foreground/80 mt-2 line-clamp-4">Proceed without applying an experience package.</p>
                                            </button>
                                        </div>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-background p-1 rounded-full pointer-events-none">
                                            <div className={`w-8 h-8 rounded-full border-2 grid place-items-center transition-all ${justSelectedExperienceName === 'NONE' ? 'border-primary' : 'border-border'}`}>
                                                {justSelectedExperienceName === 'NONE' && <CheckIcon className="w-5 h-5 text-primary" />}
                                            </div>
                                        </div>
                                    </div>

                                    {experiencePackages.map((pkg) => (
                                        <div key={pkg.name} className={`relative w-full bg-card rounded-lg border-2 transition-all duration-200 border-border hover:border-primary flex flex-col shadow-sm`}>
                                            <div className="flex-grow">
                                                <button
                                                    onClick={() => handleSelectExperience(pkg)}
                                                    className="w-full h-full text-left p-4"
                                                >
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h4 className="font-bold font-lora text-lg text-primary">{pkg.name}</h4>
                                                        <div className="flex items-center gap-2 flex-shrink-0">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setInfoPkg(pkg); }}
                                                                className="text-neutral-400 hover:text-primary transition-colors p-1 -m-1"
                                                                aria-label={`Show info: ${pkg.name}`}
                                                            >
                                                                <QuestionIcon className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {pkg.description && (
                                                        <p className="text-sm text-foreground/80 mt-2 line-clamp-4">{pkg.description}</p>
                                                    )}
                                                </button>
                                            </div>
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-background p-1 rounded-full pointer-events-none">
                                                <div className={`w-8 h-8 rounded-full border-2 grid place-items-center transition-all ${justSelectedExperienceName === pkg.name ? 'border-primary' : 'border-border'}`}>
                                                    {justSelectedExperienceName === pkg.name && <CheckIcon className="w-5 h-5 text-primary" />}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {infoPkg && (
                                    <ExperiencePackageInfoModal pkg={infoPkg} onClose={() => setInfoPkg(null)} />
                                )}
                            </>
                        ) : (
                            <>
                                <h3 ref={selectionHeaderRef} className="text-2xl font-bold font-lora text-primary mb-2 text-center">Select Talents</h3>
                                <div className="text-center mb-6">
                                    <button
                                        className="text-black underline underline-offset-4 hover:opacity-80 font-semibold"
                                        onClick={() => setIsSelectingTalents(false)}
                                        aria-label="Back to Occupations"
                                    >
                                        ← Back to Occupations
                                    </button>
                                </div>
                                <div className="mb-6">
                                    <TalentSelector onDone={() => setActiveTab('skills')} />
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            {/* Core Characteristic choice modal should appear regardless of which step is visible */}
            {selectedArchetype && selectedArchetype.coreCharacteristics.length > 1 && !archetypeCoreChoice && (
                <ArchetypeCoreChoiceModal
                    options={selectedArchetype.coreCharacteristics}
                    selected={archetypeCoreChoice}
                    onSelect={(attr) => setArchetypeCoreChoice(attr)}
                    onClose={() => { /* Optional close; modal will auto-close once a selection is made */ }}
                />
            )}
            {rollHistory.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-lora font-semibold text-center mb-4 text-primary">Roll History</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rollHistory.map((roll, index) => (
                        <RollHistoryCard key={index} roll={roll} onRestore={() => onRestoreRoll(roll)} />
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
}
