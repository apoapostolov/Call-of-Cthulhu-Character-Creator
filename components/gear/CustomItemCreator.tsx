import React from 'react';
import type { DGItem } from '../../types';
import { QuestionIcon } from '../icons/QuestionIcon';

type Mode = 'equipment' | 'prices';

interface CustomItemCreatorProps {
  mode: Mode;
  itemName: string;
  onItemNameChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  generationPhase: string | null;
  generatedItem: DGItem | null;
  onAccept: () => void;
  onScrap: () => void;
  onShowPrompt: () => void;
  decadeDisplayName: string;
}

const STAT_LABELS: Record<string, string> = {
  skill: 'Skill',
  damage: 'Damage',
  armorPiercing: 'Malf',
  range: 'Range',
  uses: 'RoF',
  ammoCapacity: 'Mag',
  price: 'Price',
};

const STAT_ORDER: (keyof DGItem)[] = ['skill', 'damage', 'range', 'uses', 'ammoCapacity', 'armorPiercing', 'price'];

const GeneratedItemStats: React.FC<{ item: DGItem; mode: Mode }>
  = ({ item, mode }) => {
    const keys = mode === 'equipment' ? STAT_ORDER : (['price'] as (keyof DGItem)[]);
    const stats = keys
      .map(key => ({ key, value: item[key] }))
      .filter(stat => stat.value !== undefined && stat.value !== null && stat.value !== '' && stat.value !== 'N/A');

    if (stats.length === 0) return null;
    return (
      <div className="my-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {stats.map(({ key, value }) => (
          <div key={String(key)} className="bg-secondary/10 p-2 rounded-md text-center border border-border">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{STAT_LABELS[String(key)]}</div>
            <div className="text-sm font-mono text-foreground font-semibold truncate">{String(value)}</div>
          </div>
        ))}
      </div>
    );
};

const GeneratedItemCard: React.FC<{ item: DGItem; mode: Mode; onAccept: () => void; onScrap: () => void }>
  = ({ item, mode, onAccept, onScrap }) => (
    <div className="mt-4 p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center gap-2">
        <h4 className="text-xl font-bold text-primary">AI Suggestion: {item.name}</h4>
      </div>
      <div className="flex justify-between items-center my-2">
        <span className="text-muted-foreground text-sm">Section: {item.section || 'Misc'}</span>
      </div>

      <GeneratedItemStats item={item} mode={mode} />

      {item.description && <p className="text-foreground/90 text-sm mb-4">{item.description}</p>}

      <div className="flex justify-end gap-2">
        <button onClick={onScrap} className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Discard</button>
        <button onClick={onAccept} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-lg text-sm">Accept & Add</button>
      </div>
    </div>
);

export const CustomItemCreator: React.FC<CustomItemCreatorProps> = (props) => {
  const { mode, itemName, onItemNameChange, description, onDescriptionChange, onGenerate, isGenerating, generationPhase, generatedItem, onAccept, onScrap, onShowPrompt, decadeDisplayName } = props;
  const placeholderText = mode === 'equipment'
    ? `Describe the weapon/tool concept. The AI will generate Call of Cthulhu stats balanced for the ${decadeDisplayName}.`
    : `Describe the item you want priced. The AI will find an appropriate ${decadeDisplayName} price (historical estimate).`;
  const title = mode === 'equipment' ? 'AI Custom Item' : 'AI Custom Pricing';
  const buttonText = mode === 'equipment' ? 'Generate Item' : 'Find Price';

  return (
    <div className="bg-card p-4 rounded-lg border border-border">
      <div className="flex items-center justify-center gap-2 mb-4 pb-2 border-b border-border">
        <h3 className="text-2xl font-bold text-primary text-center">{title}</h3>
        <button onClick={onShowPrompt} className="text-muted-foreground hover:text-primary transition-colors p-1 -m-1" aria-label="Show AI generation prompts">
          <QuestionIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder={mode === 'equipment' ? "Item Name (e.g., 'Brass Knuckles, Weighted')" : "Item Name (e.g., 'Carbide Lantern')"}
          value={itemName}
          onChange={(e) => onItemNameChange(e.target.value)}
          className="w-full bg-card border border-border rounded-md p-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring"
        />
        <textarea
          placeholder={placeholderText}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={3}
          className="w-full bg-card border border-border rounded-md p-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={onGenerate}
          disabled={isGenerating || !itemName}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-neutral-300 disabled:text-neutral-600 disabled:cursor-not-allowed text-primary-foreground font-bold py-3 px-6 rounded-lg shadow-lg"
        >
          {isGenerating ? (generationPhase || 'Generating...') : buttonText}
        </button>
      </div>
      {generatedItem && <GeneratedItemCard item={generatedItem} mode={mode} onAccept={onAccept} onScrap={onScrap} />}
    </div>
  );
};
