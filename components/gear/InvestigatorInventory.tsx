import React, { useEffect, useRef, useState } from 'react';
import type { DGItem, AttributeSet } from '../../types';
import { InventoryItemCard } from './InventoryItemCard';

interface InvestigatorInventoryProps {
    kitInventory: DGItem[];
    inventory: DGItem[];
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDeleteItem: (itemName: string) => void;
    showStats: boolean;
    onToggleShowItemStats: () => void;
    attributes: AttributeSet | null;
    onAssignPriceRequest?: (target: DGItem, priceItem: DGItem) => void;
    damageBonus?: string | null;
    selectedEra: string;
}

export const InvestigatorInventory: React.FC<InvestigatorInventoryProps> = ({ kitInventory, inventory, onDrop, onDeleteItem, showStats, onToggleShowItemStats, attributes, onAssignPriceRequest, damageBonus, selectedEra }) => {
    const sortedKitInventory = [...kitInventory].sort((a, b) => a.name.localeCompare(b.name));
    
    const prevInventoryRef = useRef<DGItem[]>([]);
    const [newItems, setNewItems] = useState<Set<string>>(new Set());
    const inventoryContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prevNames = new Set(prevInventoryRef.current.map(i => i.name));
        const newAddedItems = inventory.filter(item => !prevNames.has(item.name));

        if (newAddedItems.length > 0) {
            setNewItems(new Set(newAddedItems.map(i => i.name)));
            
            if (inventoryContainerRef.current) {
                inventoryContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }

            const timer = setTimeout(() => setNewItems(new Set()), 1000); // Animation duration + buffer
            return () => clearTimeout(timer);
        }
        prevInventoryRef.current = inventory;
    }, [inventory]);
    
    const [hoverItem, setHoverItem] = useState<string | null>(null);

    const isEquipmentItem = (it: DGItem): boolean => {
        return Boolean(it.damage || it.range || it.uses || it.ammoCapacity || it.armorPiercing || it.lethality || it.killRadius);
    };
    const isPriceOnlyItem = (it: DGItem): boolean => {
        return !!it.price && !isEquipmentItem(it);
    };

    return (
        <div className="bg-cream-100 p-4 rounded-lg border-2 border-border flex flex-col flex-grow shadow-inner">
            <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-border">
                <h3 className="text-2xl font-bold font-lora text-primary">Investigator Inventory</h3>
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-muted-foreground">Stats</span>
                    <button
                        onClick={onToggleShowItemStats}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream-200 focus:ring-ring ${showStats ? 'bg-primary' : 'bg-secondary'}`}
                        aria-label="Toggle item stats visibility"
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showStats ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>
            
            <div 
                ref={inventoryContainerRef}
                className="flex-grow space-y-3 overflow-y-auto min-h-[200px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
            >
                {kitInventory.length === 0 && inventory.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground text-center p-4 border-2 border-dashed border-border rounded-lg">
                            Drag items here to add them to your investigator's inventory.
                        </p>
                    </div>
                ) : (
                    <>
                        {inventory.map(item => (
                            <div
                                key={`user-${item.name}`}
                                onDragOver={(e) => {
                                    // Only show hover if the dragged item is a price-only item and target is equipment
                                    try {
                                        const data = e.dataTransfer.getData('application/json');
                                        if (data) {
                                            const dragged = JSON.parse(data) as DGItem;
                                            if (isPriceOnlyItem(dragged) && isEquipmentItem(item)) {
                                                e.preventDefault();
                                                e.dataTransfer.dropEffect = 'copy';
                                                setHoverItem(item.name);
                                                return;
                                            }
                                        }
                                    } catch {}
                                    setHoverItem(prev => prev === item.name ? null : prev);
                                }}
                                onDragLeave={() => setHoverItem(prev => prev === item.name ? null : prev)}
                                onDrop={(e) => {
                                    try {
                                        const data = e.dataTransfer.getData('application/json');
                                        if (data) {
                                            const priceItem = JSON.parse(data) as DGItem;
                                            if (isPriceOnlyItem(priceItem) && isEquipmentItem(item)) {
                                                if (onAssignPriceRequest) onAssignPriceRequest(item, priceItem);
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }
                                        }
                                    } catch {}
                                    setHoverItem(prev => prev === item.name ? null : prev);
                                }}
                            >
                                <InventoryItemCard
                                    item={item}
                                    isKitItem={false}
                                    isNew={newItems.has(item.name)}
                                    onDelete={() => onDeleteItem(item.name)}
                                    showStats={showStats}
                                    attributes={attributes}
                                    showModifyPriceHover={hoverItem === item.name}
                                    damageBonus={damageBonus}
                                    selectedEra={selectedEra}
                                />
                            </div>
                        ))}
                        {sortedKitInventory.map(item => (
                            <InventoryItemCard
                                key={`kit-${item.name}`}
                                item={item}
                                isKitItem={true}
                                attributes={attributes}
                                showStats={showStats}
                                damageBonus={damageBonus}
                                selectedEra={selectedEra}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
