import React from 'react';
import type { DGItem, AttributeSet } from '../../types';
import { Tooltip } from '../Tooltip';
import { AIIcon } from '../icons/AIIcon';
import { HomebrewIcon } from '../icons/HomebrewIcon';
import { adjustDamageForDB } from './damageUtils';

const STAT_LABELS: Record<string, string> = {
    skill: 'Skill', damage: 'Damage', armorPiercing: 'AP', range: 'Range', uses: 'Uses',
    radius: 'Radius', victimsPenalty: 'Penalty', lethality: 'Lethality/Armor',
    killRadius: 'Kill Radius/Armor', ammoCapacity: 'Capacity/Speed',
};

// Calculate range for STR/5 yards format
function calculateStrRange(rangeStr: string | undefined, str: number | undefined): string {
    if (!rangeStr || !str) return rangeStr || '-';
    
    // Check if range is "STR/5 yards"
    if (/STR\s*\/\s*5\s*yards?/i.test(rangeStr)) {
        const yards = Math.floor(str / 5);
        return `${yards} yd`;
    }
    
    return rangeStr;
}

const STAT_ORDER: (keyof DGItem)[] = [
    'skill', 'damage', 'armorPiercing', 'lethality', 'range', 'killRadius',
    'ammoCapacity', 'uses', 'radius', 'victimsPenalty'
];

const ItemStats: React.FC<{ item: DGItem; damageBonus?: string | null; selectedEra: string; attributes: AttributeSet | null }> = ({ item, damageBonus, selectedEra, attributes }) => {
    const getRelevantStats = () => {
        const stats: Array<{ key: string; value: any; label: string }> = [];

        if (selectedEra === 'dark-ages-1000s') {
            // Dark Ages specific logic
            if (item.section === 'Hand-to-Hand Weapons') {
                // Skill, Damage (+DB), Hands, Length, Impale, Min STR/DEX
                if (item.skill) stats.push({ key: 'skill', value: item.skill, label: 'Skill' });
                if (item.damage) stats.push({ key: 'damage', value: adjustDamageForDB(`${item.damage}+DB`, damageBonus), label: 'Damage' });
                if (item.hands) stats.push({ key: 'hands', value: item.hands, label: 'Hands' });
                if (item.length) stats.push({ key: 'length', value: item.length, label: 'Length' });
                if (item.impale !== undefined) stats.push({ key: 'impale', value: item.impale ? 'Yes' : 'No', label: 'Impale' });
                if (item.minStrDex) stats.push({ key: 'minStrDex', value: item.minStrDex, label: 'Min STR/DEX' });
            } else if (item.section === 'Missile Weapons') {
                // Same as hand-to-hand + Range
                if (item.skill) stats.push({ key: 'skill', value: item.skill, label: 'Skill' });
                if (item.damage) stats.push({ key: 'damage', value: adjustDamageForDB(`${item.damage}+DB`, damageBonus), label: 'Damage' });
                if (item.hands) stats.push({ key: 'hands', value: item.hands, label: 'Hands' });
                if (item.length) stats.push({ key: 'length', value: item.length, label: 'Length' });
                if (item.impale !== undefined) stats.push({ key: 'impale', value: item.impale ? 'Yes' : 'No', label: 'Impale' });
                if (item.minStrDex) stats.push({ key: 'minStrDex', value: item.minStrDex, label: 'Min STR/DEX' });
                if (item.range) stats.push({ key: 'range', value: calculateStrRange(item.range, attributes?.STR), label: 'Range' }); // This should be calculated
            } else if (item.section === 'War Engines') {
                // Skill, Damage, Range
                if (item.skill) stats.push({ key: 'skill', value: item.skill, label: 'Skill' });
                if (item.damage) stats.push({ key: 'damage', value: item.damage, label: 'Damage' });
                if (item.range) stats.push({ key: 'range', value: item.range, label: 'Range' });
            } else {
                // Other sections: show all available stats
                const allStats = [
                    { key: 'skill', value: item.skill, label: 'Skill' },
                    { key: 'damage', value: item.damage ? adjustDamageForDB(item.damage, damageBonus) : null, label: 'Damage' },
                    { key: 'armorPiercing', value: item.armorPiercing, label: 'AP' },
                    { key: 'lethality', value: item.lethality, label: 'Lethality/Armor' },
                    { key: 'range', value: item.range, label: 'Range' },
                    { key: 'killRadius', value: item.killRadius, label: 'Kill Radius/Armor' },
                    { key: 'ammoCapacity', value: item.ammoCapacity, label: 'Capacity/Speed' },
                    { key: 'uses', value: item.uses, label: 'Uses' },
                    { key: 'radius', value: item.radius, label: 'Radius' },
                    { key: 'victimsPenalty', value: item.victimsPenalty, label: 'Penalty' }
                ];
                stats.push(...allStats.filter(stat => stat.value !== undefined && stat.value !== null && stat.value !== ''));
            }
        } else {
            // Non-Dark Ages: show all available stats
            const allStats = [
                { key: 'skill', value: item.skill, label: 'Skill' },
                { key: 'damage', value: item.damage ? adjustDamageForDB(item.damage, damageBonus) : null, label: 'Damage' },
                { key: 'armorPiercing', value: item.armorPiercing, label: 'AP' },
                { key: 'lethality', value: item.lethality, label: 'Lethality/Armor' },
                { key: 'range', value: item.range, label: 'Range' },
                { key: 'killRadius', value: item.killRadius, label: 'Kill Radius/Armor' },
                { key: 'ammoCapacity', value: item.ammoCapacity, label: 'Capacity/Speed' },
                { key: 'uses', value: item.uses, label: 'Uses' },
                { key: 'radius', value: item.radius, label: 'Radius' },
                { key: 'victimsPenalty', value: item.victimsPenalty, label: 'Penalty' }
            ];
            stats.push(...allStats.filter(stat => stat.value !== undefined && stat.value !== null && stat.value !== ''));
        }

        return stats;
    };

    const stats = getRelevantStats();

    if (stats.length === 0) return null;

    return (
        <div className="mt-2 grid grid-cols-2 gap-1 border-t border-border/50 pt-2">
            {stats.map(({ key, value, label }) => (
                <div key={key} className="bg-cream-100 p-1 rounded-md text-center">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</div>
                    <div className="text-sm font-mono text-foreground font-semibold">{String(value)}</div>
                </div>
            ))}
        </div>
    );
};

interface InventoryItemCardProps {
    item: DGItem;
    isKitItem: boolean;
    isNew?: boolean;
    onDelete?: () => void;
    showStats: boolean;
    attributes: AttributeSet | null;
    showModifyPriceHover?: boolean;
    damageBonus?: string | null;
    selectedEra: string;
}

export const InventoryItemCard: React.FC<InventoryItemCardProps> = ({ item, isKitItem, isNew, onDelete, showStats, attributes, showModifyPriceHover, damageBonus, selectedEra }) => {
    const baseClasses = 'p-3 rounded-lg border-2 relative transition-all duration-300';
    const stateClasses = isKitItem ? 'bg-cream-100 border-border/80' : 'bg-card border-border';
    const animationClass = isNew ? 'animate-item-fade-in' : '';

    return (
        <div className={`${baseClasses} ${stateClasses} ${animationClass}`}>
            <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold text-foreground flex items-center flex-grow min-w-0 pr-4">
                    {showModifyPriceHover ? (
                        <span className="truncate animate-pulse" title={item.name}>Modify Price of This Item</span>
                    ) : (
                        <span className="truncate" title={item.name}>{item.name}</span>
                    )}
                    {item.sourceType === 'ai' && (
                        <Tooltip content={`${item.sourceName || 'AI Generated'}${(item.sourcePage != null && item.sourcePage !== '' ? ` (p. ${item.sourcePage})` : '')}`}>
                            <span className="ml-1 inline-flex items-center"><AIIcon className="text-primary fa-xs" /></span>
                        </Tooltip>
                    )}
                    {item.sourceType === 'homebrew' && (
                        <Tooltip content={`Homebrew (${item.sourceName || 'Homebrew'})${(item.sourcePage != null && item.sourcePage !== '' ? ` (p. ${item.sourcePage})` : '')}`}>
                            <span className="ml-1 inline-flex items-center"><HomebrewIcon className="text-primary fa-xs" /></span>
                        </Tooltip>
                    )}
                </h4>
                <div className="flex-shrink-0 flex items-center gap-2">
                    {item.price && (
                        <div className="font-mono text-sm font-semibold text-muted-foreground whitespace-nowrap">{item.price}</div>
                    )}
                    {isKitItem && (
                        <Tooltip content="This item is part of your selected Equipment Kit and cannot be removed individually.">
                            <div className="inline-flex items-center px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full border border-border whitespace-nowrap">
                                KIT
                            </div>
                        </Tooltip>
                    )}
                    {!isKitItem && onDelete && (
                        <button
                            onClick={onDelete}
                            className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-danger hover:bg-danger-100 rounded-full transition-colors"
                            aria-label="Delete Item"
                        >
                            <i className="fa-solid fa-trash-can fa-sm"></i>
                        </button>
                    )}
                </div>
            </div>
            {item.description && <p className="text-xs text-muted-foreground mt-1">{item.description}</p>}
            
            {showStats && <ItemStats item={item} damageBonus={damageBonus} selectedEra={selectedEra} attributes={attributes} />}
        </div>
    );
};
