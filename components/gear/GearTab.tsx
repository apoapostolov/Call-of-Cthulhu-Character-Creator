import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import type { DGItem } from '../../types';
import { EquipmentList } from './EquipmentList';
import { InvestigatorInventory } from './InvestigatorInventory';
import { ToolsOfTheTrade } from './ToolsOfTheTrade';
import { ItemDetailModal } from './ItemDetailModal';
import { WealthDisplay } from './WealthDisplay';
import { CustomItemCreator } from './CustomItemCreator';
import { PromptInfoModal } from '../PromptInfoModal';
import { AssignPriceModal } from './AssignPriceModal';
import { useEraContext } from '../../context/SourceContext';
import { getWeaponsForEra } from '../../weapons/to-dgitems';
import { thirdPartyData } from '../../eras/manifest';
import { useAiRuntime } from '../../hooks/useAiRuntime';
import { parseJsonLike } from '../../lib/ai/json';

interface GearTabProps {
    kitInventory: DGItem[];
    inventory: DGItem[];
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDeleteItem: (itemName: string) => void;
}

export const GearTab: React.FC<GearTabProps> = ({ kitInventory, inventory, onDrop, onDeleteItem }) => {
    const { attributes, setEquipmentKit, activeKitName, aggregatedData, derivedStats, handleAssignPrice } = useCharacterContext();
    const [filterText, setFilterText] = useState('');
    const { selectedEra } = useEraContext();
    const [equipmentSubtab, setEquipmentSubtab] = useState<'equipment' | 'prices' | 'scout' | 'all'>('equipment');
    const [showItemStats, setShowItemStats] = useState(false);
    
    const [mobileTab, setMobileTab] = useState<'list' | 'inventory'>('list');
    const [modalItem, setModalItem] = useState<DGItem | null>(null);
    const [isPromptVisible, setIsPromptVisible] = useState(false);
    const [assignPriceTarget, setAssignPriceTarget] = useState<DGItem | null>(null);
    const [assignPriceItem, setAssignPriceItem] = useState<DGItem | null>(null);

    useEffect(() => {
        setEquipmentSubtab(selectedEra === 'campfire-tales' ? 'scout' : 'equipment');
        setFilterText('');
    }, [selectedEra]);

    const handleAddItemFromModal = useCallback((item: DGItem) => {
        const fakeEvent = {
            dataTransfer: { getData: () => JSON.stringify(item) },
            preventDefault: () => {},
        } as unknown as React.DragEvent<HTMLDivElement>;
        onDrop(fakeEvent);
        setModalItem(null);
        setMobileTab('inventory');
    }, [onDrop]);

    const weaponItems = useMemo(() => getWeaponsForEra(selectedEra), [selectedEra]);
    const priceOnlyItems = useMemo(() => (thirdPartyData as any)[selectedEra]?.items ?? [], [selectedEra]);
    const isCampfireEra = selectedEra === 'campfire-tales';
    const classicItems = useMemo(() => (thirdPartyData as any)['classic-1920s']?.items ?? [], []);
    const classicEquipmentItems = useMemo(() => getWeaponsForEra('classic-1920s'), []);
    const scoutItems = useMemo(() => {
        const scoutSections = new Set([
            'Scout Uniforms & Packs',
            'Camping & Trail Gear',
            'Lights & Signals',
            'Tools & Repair',
            'School & Investigation',
            'Badge Equipment',
        ]);
        return (priceOnlyItems as DGItem[]).filter(item => scoutSections.has(item.section));
    }, [priceOnlyItems]);
    const equipmentItems = useMemo(() => {
        if (!isCampfireEra) return weaponItems;
        return equipmentSubtab === 'all' ? classicEquipmentItems : scoutItems;
    }, [classicEquipmentItems, equipmentSubtab, isCampfireEra, scoutItems, weaponItems]);
    const customCreatorMode: 'equipment' | 'prices' = equipmentSubtab === 'equipment' || equipmentSubtab === 'all' ? 'equipment' : 'prices';

    const filteredWeapons = useMemo(() => {
        const unique = new Set<string>();
        const list = equipmentItems.filter(it => {
            if (unique.has(it.name)) return false;
            unique.add(it.name);
            return true;
        });
        if (!filterText) return list;
        return list.filter(i => i.name.toLowerCase().includes(filterText.toLowerCase()));
    }, [equipmentItems, filterText]);

    const filteredPrices = useMemo(() => {
        const unique = new Set<string>();
        const sourceItems = isCampfireEra ? classicItems : priceOnlyItems;
        const list = sourceItems.filter((it: DGItem) => {
            if (unique.has(it.name)) return false;
            unique.add(it.name);
            return true;
        });
        if (!filterText) return list;
        return list.filter((i: DGItem) => i.name.toLowerCase().includes(filterText.toLowerCase()));
    }, [classicItems, filterText, isCampfireEra, priceOnlyItems]);

    // ---- AI Custom Item Creator ----
    const [customItemName, setCustomItemName] = useState('');
    const [customItemDescription, setCustomItemDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationPhase, setGenerationPhase] = useState<string | null>(null);
    const [generatedItem, setGeneratedItem] = useState<DGItem | null>(null);
    const { generateText } = useAiRuntime();

    const decadeDisplayName = useMemo(() => aggregatedData.DECADES?.[0]?.displayName || 'Selected Era', [aggregatedData.DECADES]);

    const allSectionsEquipment = useMemo(() => {
        const s = new Set<string>();
        equipmentItems.forEach(i => s.add(i.section || 'Miscellaneous'));
        return Array.from(s);
    }, [equipmentItems]);

    const allSectionsPrices = useMemo(() => {
        const s = new Set<string>();
        ((isCampfireEra ? classicItems : priceOnlyItems) as DGItem[]).forEach(i => s.add(i.section || 'Miscellaneous'));
        return Array.from(s);
    }, [classicItems, isCampfireEra, priceOnlyItems]);

    const buildPhase1Prompt = useCallback((mode: 'equipment' | 'prices') => {
        const sections = mode === 'equipment' ? allSectionsEquipment : allSectionsPrices;
        return `You are an expert game designer for Call of Cthulhu (7th edition).\n\nItem Name: "${customItemName}"\nDescription: "${customItemDescription || 'No description provided.'}"\n\n1) Choose the best "section" from this list: ${sections.join(', ')}.\n2) Analyze the concept to infer relevant properties for ${mode === 'equipment' ? 'a weapon or tool with combat stats' : 'a catalog item with a price only'}.\n\nOutput raw JSON with keys: section (string), analysisKeywords (string[]).`;
    }, [customItemName, customItemDescription, allSectionsEquipment, allSectionsPrices]);

    const buildPhase2Prompt = useCallback((mode: 'equipment' | 'prices', section: string) => {
        const eraName = decadeDisplayName;
        if (mode === 'equipment') {
            return `You are an expert Call of Cthulhu (7e) designer. Generate a balanced item with standard fields.\nOperational Era: ${eraName}. Keep technology appropriate to the era. Do not use "Restricted" or "Expense" tags.\n\nNormalize the name (Title Case) and clean description. Then output a JSON object with EXACT keys:\n{\n  "name": string,\n  "description": string,\n  "section": "${section}",\n  "skill": string | null,\n  "damage": string | null,\n  "range": string | null,\n  "uses": string | null,\n  "ammoCapacity": string | null,\n  "armorPiercing": string | null,\n  "price": string | null\n}\nRules notes:\n- damage should use CoC dice notation (e.g., "1D6", "1D6+DB", "1D10")\n- range in yards or feet as a short string (e.g., "10 yd")\n- uses = attacks per round as a number string (e.g., "1", "2")\n- ammoCapacity for firearms (e.g., "6", "15"), otherwise "-"\n- armorPiercing: use the Malfunction value letter/number or "-" for non-guns\n- price must be a ${eraName} appropriate dollar price string like "$12.50" if applicable; omit if unknown\nReturn only JSON.`;
        }
        return `You are a historical pricing expert. Determine a plausible ${eraName} price for the requested item.\nUse contemporary mail-order catalogs, general goods lists, and period context. If no exact match, pick the closest analogous good.\nReturn a JSON object:\n{\n  "name": string,\n  "description": string,\n  "section": "${section}",\n  "price": string\n}\nReturn only JSON.`;
    }, [decadeDisplayName]);

    const handleGenerateCustom = useCallback(async (mode: 'equipment' | 'prices') => {
        setIsGenerating(true);
        setGeneratedItem(null);
        setGenerationPhase('Analyzing concept');
        try {
            const phase1 = parseJsonLike(await generateText({ prompt: buildPhase1Prompt(mode), json: true }));
            const section = String(phase1.section || 'Miscellaneous');
            setGenerationPhase('Generating item');
            let obj: any = {};
            try {
                obj = parseJsonLike(await generateText({ prompt: buildPhase2Prompt(mode, section), json: true }));
            } catch {}
            const normalized: DGItem = {
                section,
                name: obj.name || customItemName,
                description: obj.description || customItemDescription || undefined,
                price: obj.price || undefined,
                skill: obj.skill || undefined,
                damage: obj.damage || undefined,
                range: obj.range || undefined,
                uses: obj.uses || undefined,
                ammoCapacity: obj.ammoCapacity || undefined,
                armorPiercing: obj.armorPiercing || undefined,
                sourceType: 'ai',
                sourceName: 'AI Generated',
                sourcePage: null,
            } as DGItem;
            setGeneratedItem(normalized);
        } catch (e) {
            console.error(e);
        } finally {
            setGenerationPhase(null);
            setIsGenerating(false);
        }
    }, [generateText, customItemName, customItemDescription, buildPhase1Prompt, buildPhase2Prompt]);

    const handleAcceptGenerated = useCallback(() => {
        if (!generatedItem) return;
        const fakeEvent = {
            dataTransfer: { getData: () => JSON.stringify(generatedItem) },
            preventDefault: () => {},
        } as unknown as React.DragEvent<HTMLDivElement>;
        onDrop(fakeEvent);
        setGeneratedItem(null);
        setMobileTab('inventory');
    }, [generatedItem, onDrop]);

    return (
        <div className="bg-card p-6 rounded-lg border border-border shadow-xl shadow-primary-900/15 max-w-7xl mx-auto">
             <ItemDetailModal item={modalItem} onClose={() => setModalItem(null)} onAddItem={handleAddItemFromModal} />
             {isPromptVisible && (
               <PromptInfoModal
                  title="AI Item Generation Prompts"
                  prompt={`${buildPhase1Prompt(customCreatorMode)}\n\n---\n\n${buildPhase2Prompt(customCreatorMode, 'Selected Section')}`}
                  onClose={() => setIsPromptVisible(false)}
               />
             )}
             {assignPriceTarget && assignPriceItem && (
                <AssignPriceModal
                    targetItem={assignPriceTarget}
                    priceItem={assignPriceItem}
                    onCancel={() => { setAssignPriceTarget(null); setAssignPriceItem(null); }}
                    onConfirm={() => {
                        const newPrice = assignPriceItem.price || null;
                        if (!newPrice) { setAssignPriceTarget(null); setAssignPriceItem(null); return; }
                        const ok = handleAssignPrice(assignPriceTarget.name, newPrice);
                        if (ok) { setAssignPriceTarget(null); setAssignPriceItem(null); }
                    }}
                />
             )}
             <h2 className="text-3xl font-bold font-lora text-primary text-center mb-2">Equipment & Gear</h2>
             <p className="text-muted-foreground text-center mb-8">Drag items (desktop) or tap items (mobile) to add them to your investigator's inventory.</p>

            {/* Desktop Layout */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex justify-center border-b border-border mb-2">
                        {isCampfireEra ? (
                            <>
                                <button onClick={() => setEquipmentSubtab('scout')} className={`py-2 px-6 font-bold text-lg ${equipmentSubtab === 'scout' || equipmentSubtab === 'equipment' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>Scout Equipment</button>
                                <button onClick={() => setEquipmentSubtab('all')} className={`py-2 px-6 font-bold text-lg ${equipmentSubtab === 'all' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>All Equipment</button>
                                <button onClick={() => setEquipmentSubtab('prices')} className={`py-2 px-6 font-bold text-lg ${equipmentSubtab === 'prices' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>Prices</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setEquipmentSubtab('equipment')} className={`py-2 px-6 font-bold text-lg ${equipmentSubtab === 'equipment' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>Equipment</button>
                                <button onClick={() => setEquipmentSubtab('prices')} className={`py-2 px-6 font-bold text-lg ${equipmentSubtab === 'prices' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>Prices</button>
                            </>
                        )}
                    </div>
                    {equipmentSubtab === 'equipment' || equipmentSubtab === 'scout' || equipmentSubtab === 'all' ? (
                        <EquipmentList items={filteredWeapons} filterText={filterText} onFilterChange={setFilterText} height="auto" damageBonus={derivedStats?.DamageBonus ?? null} attributes={attributes} />
                    ) : (
                        <EquipmentList items={filteredPrices} filterText={filterText} onFilterChange={setFilterText} height="auto" attributes={attributes} />
                    )}
                    <CustomItemCreator
                        mode={customCreatorMode}
                        itemName={customItemName}
                        onItemNameChange={setCustomItemName}
                        description={customItemDescription}
                        onDescriptionChange={setCustomItemDescription}
                        onGenerate={() => handleGenerateCustom(customCreatorMode)}
                        isGenerating={isGenerating}
                        generationPhase={generationPhase}
                        generatedItem={generatedItem}
                        onAccept={handleAcceptGenerated}
                        onScrap={() => setGeneratedItem(null)}
                        onShowPrompt={() => setIsPromptVisible(true)}
                        decadeDisplayName={decadeDisplayName}
                    />
                </div>
                <div className="lg:col-span-1 flex flex-col space-y-4">
                    <WealthDisplay />
                    <ToolsOfTheTrade onSetKit={setEquipmentKit} activeKitName={activeKitName} />
                    <InvestigatorInventory
                        attributes={attributes}
                        kitInventory={kitInventory}
                        inventory={inventory}
                        onDrop={onDrop}
                        onDeleteItem={onDeleteItem}
                        showStats={showItemStats}
                        onToggleShowItemStats={() => setShowItemStats(prev => !prev)}
                        onAssignPriceRequest={(target, price) => { setAssignPriceTarget(target); setAssignPriceItem(price); }}
                        damageBonus={derivedStats?.DamageBonus ?? null}
                        selectedEra={selectedEra}
                    />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
                <div className="flex justify-center border-b border-border mb-4">
                    <button onClick={() => setMobileTab('list')} className={`py-2 px-6 font-bold text-lg ${mobileTab === 'list' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>Equipment List</button>
                    <button onClick={() => setMobileTab('inventory')} className={`py-2 px-6 font-bold text-lg ${mobileTab === 'inventory' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>Investigator Inventory</button>
                </div>

                {mobileTab === 'list' && (
                    <div className="space-y-4">
                        <div className="flex justify-center border-b border-border mb-2">
                            {isCampfireEra ? (
                                <>
                                    <button onClick={() => setEquipmentSubtab('scout')} className={`py-2 px-6 font-bold text-lg ${equipmentSubtab === 'scout' || equipmentSubtab === 'equipment' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>Scout Equipment</button>
                                    <button onClick={() => setEquipmentSubtab('all')} className={`py-2 px-6 font-bold text-lg ${equipmentSubtab === 'all' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>All Equipment</button>
                                    <button onClick={() => setEquipmentSubtab('prices')} className={`py-2 px-6 font-bold text-lg ${equipmentSubtab === 'prices' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>Prices</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setEquipmentSubtab('equipment')} className={`py-2 px-6 font-bold text-lg ${equipmentSubtab === 'equipment' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>Equipment</button>
                                    <button onClick={() => setEquipmentSubtab('prices')} className={`py-2 px-6 font-bold text-lg ${equipmentSubtab === 'prices' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>Prices</button>
                                </>
                            )}
                        </div>
                        {equipmentSubtab === 'equipment' || equipmentSubtab === 'scout' || equipmentSubtab === 'all' ? (
                            <EquipmentList items={filteredWeapons} filterText={filterText} onFilterChange={setFilterText} onItemClick={setModalItem} damageBonus={derivedStats?.DamageBonus ?? null} attributes={attributes} />
                        ) : (
                            <EquipmentList items={filteredPrices} filterText={filterText} onFilterChange={setFilterText} onItemClick={setModalItem} attributes={attributes} />
                        )}
                        <CustomItemCreator
                            mode={customCreatorMode}
                            itemName={customItemName}
                            onItemNameChange={setCustomItemName}
                            description={customItemDescription}
                            onDescriptionChange={setCustomItemDescription}
                            onGenerate={() => handleGenerateCustom(customCreatorMode)}
                            isGenerating={isGenerating}
                            generationPhase={generationPhase}
                            generatedItem={generatedItem}
                            onAccept={handleAcceptGenerated}
                            onScrap={() => setGeneratedItem(null)}
                            onShowPrompt={() => setIsPromptVisible(true)}
                            decadeDisplayName={decadeDisplayName}
                        />
                    </div>
                )}

                {mobileTab === 'inventory' && (
                    <div className="space-y-6">
                        <WealthDisplay />
                        <ToolsOfTheTrade onSetKit={setEquipmentKit} activeKitName={activeKitName} />
                        <InvestigatorInventory
                            attributes={attributes}
                            kitInventory={kitInventory}
                            inventory={inventory}
                            onDrop={onDrop}
                            onDeleteItem={onDeleteItem}
                            showStats={showItemStats}
                            onToggleShowItemStats={() => setShowItemStats(prev => !prev)}
                            onAssignPriceRequest={(target, price) => { setAssignPriceTarget(target); setAssignPriceItem(price); }}
                            damageBonus={derivedStats?.DamageBonus ?? null}
                            selectedEra={selectedEra}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
