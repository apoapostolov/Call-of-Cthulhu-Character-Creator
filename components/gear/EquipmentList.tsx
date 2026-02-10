import React, { useMemo } from 'react';
import type { DGItem } from '../../types';
import { SectionHeader } from './SectionHeader';
import { Tooltip } from '../Tooltip';
import { AIIcon } from '../icons/AIIcon';
import { HomebrewIcon } from '../icons/HomebrewIcon';
import { useEraContext } from '../../context/SourceContext';
import { adjustDamageForDB } from './damageUtils';

const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, item: DGItem) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
};

interface EquipmentListProps {
    items: DGItem[];
    filterText: string;
    onFilterChange: (text: string) => void;
    height?: number | 'auto';
    onItemClick?: (item: DGItem) => void;
    damageBonus?: string | null; // Derived Damage Bonus (e.g., '+1D4', 'None', '-1')
    attributes?: { STR?: number } | null; // Character attributes for STR-based range calculation
}

const SourceBadge: React.FC<{ item: DGItem }> = ({ item }) => {
    const pageSuffix = item.sourcePage != null && item.sourcePage !== '' ? ` (p. ${item.sourcePage})` : '';
    if (item.sourceType === 'ai') {
        const content = `${item.sourceName || 'AI Generated'}${pageSuffix}`;
        return (
            <Tooltip content={content}>
                <span className="ml-1 align-middle inline-flex items-center">
                    <AIIcon className="text-primary fa-xs" />
                </span>
            </Tooltip>
        );
    }
    if (item.sourceType === 'homebrew') {
        const src = item.sourceName || 'Homebrew';
        const content = `Homebrew (${src})${pageSuffix}`;
        return (
            <Tooltip content={content}>
                <span className="ml-1 align-middle inline-flex items-center">
                    <HomebrewIcon className="text-primary fa-xs" />
                </span>
            </Tooltip>
        );
    }
    return null;
};

function parseDB(dbRaw: string | null | undefined): { flat: number; dice: Record<number, number> } {
    const res = { flat: 0, dice: {} as Record<number, number> };
    if (!dbRaw || dbRaw.toLowerCase() === 'none') return res;
    const s = dbRaw.toUpperCase().trim();
    // Examples: '+1D4', '+2D6', '-1', '-2'
    const mDice = s.match(/([+-]?)(\d+)D(\d+)/);
    if (mDice) {
        const sign = mDice[1] === '-' ? -1 : 1;
        const cnt = parseInt(mDice[2], 10) * sign;
        const sides = parseInt(mDice[3], 10);
        res.dice[sides] = (res.dice[sides] || 0) + cnt;
        return res;
    }
    const mFlat = s.match(/([+-]?)(\d+)/);
    if (mFlat) {
        const sign = mFlat[1] === '-' ? -1 : 1;
        const val = parseInt(mFlat[2], 10) * sign;
        res.flat += val;
    }
    return res;
}

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

export const EquipmentList: React.FC<EquipmentListProps> = ({ items, filterText, onFilterChange, height = 'auto', onItemClick, damageBonus = null, attributes = null }) => {
    const groupedItems = useMemo(() => {
        return items.reduce((acc, item) => {
            const section = item.section || 'Miscellaneous';
            if (!acc[section]) {
                acc[section] = [];
            }
            acc[section].push(item);
            return acc;
        }, {} as Record<string, DGItem[]>);
    }, [items]);

    const { selectedEra } = useEraContext();

    // Default ordering (1920s/Modern style)
    const WEAPON_SECTION_ORDER = [
        'Hand-to-Hand Weapons',
        'Archaic Ranged Weapons',
        'Handguns',
        'Rifles',
        'Shotguns',
        'Assault Rifles', // Modern only; ignored if absent
        'Submachine Guns',
        'Machine Guns',
        'Explosives, Heavy Weapons, Misc.'
    ];

    // Western-specific ordering
    const WESTERN_SECTION_ORDER = [
        'Melee Weapons',
        'Revolvers',
        'Holdout Weapons',
        'Holdout Weapons (one-shots)',
        'Rifles',
        'Shotguns',
        'Heavy Weapons',
        'Heavy Weapons, Explosives'
    ];

    // Dark Ages-specific ordering
    const DARK_AGES_SECTION_ORDER = [
        'Hand-to-Hand Weapons',
        'Missile Weapons',
        'War Engines',
        'Shields',
        'Armor'
    ];

    const weaponPriority = useMemo(() => {
        let order: string[];
        if (selectedEra === 'western-1870s' || selectedEra === 'western-1880s') {
            order = WESTERN_SECTION_ORDER;
        } else if (selectedEra === 'dark-ages-1000s') {
            order = DARK_AGES_SECTION_ORDER;
        } else {
            order = WEAPON_SECTION_ORDER;
        }
        return new Map(order.map((name, idx) => [name, idx]));
    }, [selectedEra]);

    const isWeaponsSection = (section: string, sectionItems: DGItem[]) => {
        if (weaponPriority.has(section)) return true;
        // Heuristic: weapon rows have typical weapon fields populated
        return sectionItems.some(i => (i.damage || i.range || i.uses || i.ammoCapacity || i.armorPiercing));
    };

    const compareSections = (a: string, b: string) => {
        const aPri = weaponPriority.has(a) ? (weaponPriority.get(a) as number) : Number.POSITIVE_INFINITY;
        const bPri = weaponPriority.has(b) ? (weaponPriority.get(b) as number) : Number.POSITIVE_INFINITY;
        if (aPri !== bPri) return aPri - bPri;
        // If both are non-priority or same priority, fallback to alpha
        return a.localeCompare(b);
    };

    return (
        <div className="space-y-6">
            <input
                type="text"
                placeholder="Filter equipment by name..."
                value={filterText}
                onChange={(e) => onFilterChange(e.target.value)}
                className="w-full bg-card border border-border rounded-md p-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <div
                className="space-y-8 overflow-y-auto pr-2"
                style={{ height: height === 'auto' ? 'auto' : 'calc(100vh - 300px)' }}
            >
                {Object.keys(groupedItems).sort(compareSections).map((section) => {
                    const sectionItems = groupedItems[section];
                    
                    // Special handling for Shields
                    if (section === 'Shields') {
                        return (
                            <div key={section}>
                                <SectionHeader section={section} />
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-foreground/90">
                                        <thead className="text-xs text-muted-foreground uppercase bg-cream-100">
                                            <tr>
                                                <th className="px-4 py-3">Shield</th>
                                                <th className="px-4 py-3">Armor</th>
                                                <th className="px-4 py-3">Damage</th>
                                                <th className="px-4 py-3">STR/DEX</th>
                                                <th className="px-4 py-3 text-right">Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectionItems.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-border transition-colors ${onItemClick ? 'hover:bg-secondary/10 cursor-pointer' : 'hover:bg-secondary/10 cursor-grab'}`}
                                                    draggable={!onItemClick}
                                                    onDragStart={!onItemClick ? (e) => handleDragStart(e, item) : undefined}
                                                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                                                >
                                                    <td className="px-4 py-2 align-top font-bold"><span className="inline-flex items-center">{item.name}<SourceBadge item={item} /></span></td>
                                                    <td className="px-4 py-2 align-top">{item.armorPiercing || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{adjustDamageForDB(item.damage, damageBonus) || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.description || '-'}</td>
                                                    <td className="px-4 py-2 align-top text-right font-mono">{item.price || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    }
                    
                    // Special handling for Armor
                    if (section === 'Armor') {
                        return (
                            <div key={section}>
                                <SectionHeader section={section} />
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-foreground/90">
                                        <thead className="text-xs text-muted-foreground uppercase bg-cream-100">
                                            <tr>
                                                <th className="px-4 py-3">Armor & Helm</th>
                                                <th className="px-4 py-3">Armor</th>
                                                <th className="px-4 py-3">Rounds</th>
                                                <th className="px-4 py-3 text-right">Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectionItems.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-border transition-colors ${onItemClick ? 'hover:bg-secondary/10 cursor-pointer' : 'hover:bg-secondary/10 cursor-grab'}`}
                                                    draggable={!onItemClick}
                                                    onDragStart={!onItemClick ? (e) => handleDragStart(e, item) : undefined}
                                                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                                                >
                                                    <td className="px-4 py-2 align-top font-bold"><span className="inline-flex items-center">{item.name}<SourceBadge item={item} /></span></td>
                                                    <td className="px-4 py-2 align-top">{item.armorPiercing || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.uses || '-'}</td>
                                                    <td className="px-4 py-2 align-top text-right font-mono">{item.price || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    }
                    
                    // Special handling for Dark Ages Hand-to-Hand Weapons
                    if (selectedEra === 'dark-ages-1000s' && section === 'Hand-to-Hand Weapons') {
                        return (
                            <div key={section}>
                                <SectionHeader section={section} />
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-foreground/90">
                                        <thead className="text-xs text-muted-foreground uppercase bg-cream-100">
                                            <tr>
                                                <th className="px-4 py-3">Weapon</th>
                                                <th className="px-4 py-3">Skill</th>
                                                <th className="px-4 py-3">Damage</th>
                                                <th className="px-4 py-3">Hands</th>
                                                <th className="px-4 py-3">Length</th>
                                                <th className="px-4 py-3">Impale</th>
                                                <th className="px-4 py-3">Min STR/DEX</th>
                                                <th className="px-4 py-3 text-right">Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectionItems.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-border transition-colors ${onItemClick ? 'hover:bg-secondary/10 cursor-pointer' : 'hover:bg-secondary/10 cursor-grab'}`}
                                                    draggable={!onItemClick}
                                                    onDragStart={!onItemClick ? (e) => handleDragStart(e, item) : undefined}
                                                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                                                >
                                                    <td className="px-4 py-2 align-top font-bold"><span className="inline-flex items-center">{item.name}<SourceBadge item={item} /></span></td>
                                                    <td className="px-4 py-2 align-top">{item.skill || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{adjustDamageForDB(item.damage ? `${item.damage}+DB` : undefined, damageBonus) || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.hands || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.length || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.impale ? 'Yes' : 'No'}</td>
                                                    <td className="px-4 py-2 align-top">{item.minStrDex || '-'}</td>
                                                    <td className="px-4 py-2 align-top text-right font-mono">{item.price || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    }
                    
                    // Special handling for Dark Ages Missile Weapons
                    if (selectedEra === 'dark-ages-1000s' && section === 'Missile Weapons') {
                        return (
                            <div key={section}>
                                <SectionHeader section={section} />
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-foreground/90">
                                        <thead className="text-xs text-muted-foreground uppercase bg-cream-100">
                                            <tr>
                                                <th className="px-4 py-3">Weapon</th>
                                                <th className="px-4 py-3">Skill</th>
                                                <th className="px-4 py-3">Damage</th>
                                                <th className="px-4 py-3">Range</th>
                                                <th className="px-4 py-3">Hands</th>
                                                <th className="px-4 py-3">Length</th>
                                                <th className="px-4 py-3">Impale</th>
                                                <th className="px-4 py-3">Min STR/DEX</th>
                                                <th className="px-4 py-3 text-right">Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectionItems.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-border transition-colors ${onItemClick ? 'hover:bg-secondary/10 cursor-pointer' : 'hover:bg-secondary/10 cursor-grab'}`}
                                                    draggable={!onItemClick}
                                                    onDragStart={!onItemClick ? (e) => handleDragStart(e, item) : undefined}
                                                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                                                >
                                                    <td className="px-4 py-2 align-top font-bold"><span className="inline-flex items-center">{item.name}<SourceBadge item={item} /></span></td>
                                                    <td className="px-4 py-2 align-top">{item.skill || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{adjustDamageForDB(item.damage, damageBonus) || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{calculateStrRange(item.range, attributes?.STR) || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.hands || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.length || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.impale ? 'Yes' : 'No'}</td>
                                                    <td className="px-4 py-2 align-top">{item.minStrDex || '-'}</td>
                                                    <td className="px-4 py-2 align-top text-right font-mono">{item.price || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    }
                    
                    // Special handling for Dark Ages War Engines
                    if (selectedEra === 'dark-ages-1000s' && section === 'War Engines') {
                        return (
                            <div key={section}>
                                <SectionHeader section={section} />
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-foreground/90">
                                        <thead className="text-xs text-muted-foreground uppercase bg-cream-100">
                                            <tr>
                                                <th className="px-4 py-3">War Engine</th>
                                                <th className="px-4 py-3">Skill</th>
                                                <th className="px-4 py-3">Damage</th>
                                                <th className="px-4 py-3">Range</th>
                                                <th className="px-4 py-3 text-right">Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectionItems.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-border transition-colors ${onItemClick ? 'hover:bg-secondary/10 cursor-pointer' : 'hover:bg-secondary/10 cursor-grab'}`}
                                                    draggable={!onItemClick}
                                                    onDragStart={!onItemClick ? (e) => handleDragStart(e, item) : undefined}
                                                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                                                >
                                                    <td className="px-4 py-2 align-top font-bold"><span className="inline-flex items-center">{item.name}<SourceBadge item={item} /></span></td>
                                                    <td className="px-4 py-2 align-top">{item.skill || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.damage || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.range || '-'}</td>
                                                    <td className="px-4 py-2 align-top text-right font-mono">{item.price || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    }
                    
                    // Special handling for Hand-to-Hand Weapons in non-Dark Ages eras (1920s, Modern, Gaslight, Western)
                    // These don't need Range, Mag, or Malf columns since they're mostly melee
                    if ((selectedEra === 'classic-1920s' || selectedEra === 'pulp-1930s' || selectedEra === 'modern-2000s' || 
                         selectedEra === 'gaslight-1890s' || selectedEra === 'western-1870s' || selectedEra === 'western-1880s') && 
                        section === 'Hand-to-Hand Weapons') {
                        return (
                            <div key={section}>
                                <SectionHeader section={section} />
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-foreground/90">
                                        <thead className="text-xs text-muted-foreground uppercase bg-cream-100">
                                            <tr>
                                                <th className="px-4 py-3">Weapon</th>
                                                <th className="px-4 py-3">Skill</th>
                                                <th className="px-4 py-3">Damage</th>
                                                <th className="px-4 py-3 text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectionItems.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-border transition-colors ${onItemClick ? 'hover:bg-secondary/10 cursor-pointer' : 'hover:bg-secondary/10 cursor-grab'}`}
                                                    draggable={!onItemClick}
                                                    onDragStart={!onItemClick ? (e) => handleDragStart(e, item) : undefined}
                                                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                                                >
                                                    <td className="px-4 py-2 align-top font-bold"><span className="inline-flex items-center">{item.name}<SourceBadge item={item} /></span></td>
                                                    <td className="px-4 py-2 align-top">{item.skill || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{adjustDamageForDB(item.damage, damageBonus) || '-'}</td>
                                                    <td className="px-4 py-2 align-top text-right font-mono">{item.price || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    }
                    
                    // Special handling for Archaic Ranged Weapons (bows, etc.) - simpler than firearms
                    if ((selectedEra === 'classic-1920s' || selectedEra === 'pulp-1930s' || selectedEra === 'modern-2000s' || 
                         selectedEra === 'gaslight-1890s') && 
                        section === 'Archaic Ranged Weapons') {
                        return (
                            <div key={section}>
                                <SectionHeader section={section} />
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-foreground/90">
                                        <thead className="text-xs text-muted-foreground uppercase bg-cream-100">
                                            <tr>
                                                <th className="px-4 py-3">Weapon</th>
                                                <th className="px-4 py-3">Skill</th>
                                                <th className="px-4 py-3">Damage</th>
                                                <th className="px-4 py-3">Range</th>
                                                <th className="px-4 py-3">RoF</th>
                                                <th className="px-4 py-3 text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectionItems.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-border transition-colors ${onItemClick ? 'hover:bg-secondary/10 cursor-pointer' : 'hover:bg-secondary/10 cursor-grab'}`}
                                                    draggable={!onItemClick}
                                                    onDragStart={!onItemClick ? (e) => handleDragStart(e, item) : undefined}
                                                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                                                >
                                                    <td className="px-4 py-2 align-top font-bold"><span className="inline-flex items-center">{item.name}<SourceBadge item={item} /></span></td>
                                                    <td className="px-4 py-2 align-top">{item.skill || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{adjustDamageForDB(item.damage, damageBonus) || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.range || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.uses || '-'}</td>
                                                    <td className="px-4 py-2 align-top text-right font-mono">{item.price || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    }
                    
                    return (
                        <div key={section}>
                            <SectionHeader section={section} />
                            <div className="overflow-x-auto">
                                {isWeaponsSection(section, sectionItems) ? (
                                    <table className="w-full text-sm text-left text-foreground/90">
                                        <thead className="text-xs text-muted-foreground uppercase bg-cream-100">
                                            <tr>
                                                <th className="px-4 py-3">Name</th>
                                                <th className="px-4 py-3">Skill</th>
                                                <th className="px-4 py-3">Damage</th>
                                                <th className="px-4 py-3">Range</th>
                                                <th className="px-4 py-3">RoF</th>
                                                <th className="px-4 py-3">Mag</th>
                                                <th className="px-4 py-3">Malf</th>
                                                <th className="px-4 py-3 text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectionItems.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-border transition-colors ${onItemClick ? 'hover:bg-secondary/10 cursor-pointer' : 'hover:bg-secondary/10 cursor-grab'}`}
                                                    draggable={!onItemClick}
                                                    onDragStart={!onItemClick ? (e) => handleDragStart(e, item) : undefined}
                                                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                                                >
                                                    <td className="px-4 py-2 align-top font-bold"><span className="inline-flex items-center">{item.name}<SourceBadge item={item} /></span></td>
                                                    <td className="px-4 py-2 align-top">{item.skill || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{adjustDamageForDB(item.damage, damageBonus) || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.range || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.uses || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.ammoCapacity || '-'}</td>
                                                    <td className="px-4 py-2 align-top">{item.armorPiercing || '-'}</td>
                                                    <td className="px-4 py-2 align-top text-right font-mono">{item.price || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <table className="w-full text-sm text-left text-foreground/90">
                                        <thead className="text-xs text-muted-foreground uppercase bg-cream-100">
                                            <tr>
                                                <th className="px-4 py-3">Item</th>
                                                <th className="px-4 py-3">Description</th>
                                                <th className="px-4 py-3 text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectionItems.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-border transition-colors ${onItemClick ? 'hover:bg-secondary/10 cursor-pointer' : 'hover:bg-secondary/10 cursor-grab'}`}
                                                    draggable={!onItemClick}
                                                    onDragStart={!onItemClick ? (e) => handleDragStart(e, item) : undefined}
                                                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                                                >
                                                    <td className="px-4 py-2 align-top font-bold"><span className="inline-flex items-center">{item.name}<SourceBadge item={item} /></span></td>
                                                    <td className="px-4 py-2 align-top">{item.description || '-'}</td>
                                                    <td className="px-4 py-2 align-top text-right font-mono">{item.price || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
