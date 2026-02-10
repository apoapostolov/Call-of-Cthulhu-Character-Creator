import React, { useMemo } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import type { Talent } from '../types';
import { DiceIcon } from './icons/DiceIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { HomebrewIcon } from './icons/HomebrewIcon';
import { AIIcon } from './icons/AIIcon';
import { CheckIcon } from './icons/CheckIcon';
import { Tooltip } from './Tooltip';

interface TalentSelectorProps {
  onDone?: () => void;
}

const TalentRow: React.FC<{ talent: Talent; selected: boolean; onToggle: () => void; canPickMore: boolean; suggested?: boolean; }> = ({ talent, selected, onToggle, canPickMore, suggested }) => {
  const Icon = talent.sourceType === 'core' ? ShieldIcon : talent.sourceType === 'homebrew' ? (HomebrewIcon as any) : (AIIcon as any);
  const disabled = !selected && !canPickMore;
  const tooltipText = talent.source ? (
    <div>
      <div className="font-bold mb-1">{talent.source}</div>
      {talent.page ? <div className="opacity-90">Page {talent.page}</div> : null}
    </div>
  ) : (
    talent.sourceType === 'core' ? 'Core Rulebook' : (talent.sourceType === 'homebrew' ? 'Homebrew Source' : 'AI Generated')
  );
  return (
    <div className={`flex items-start gap-3 p-3 rounded-md border ${selected ? 'border-primary bg-primary/10' : 'border-border bg-card'} shadow-sm`}> 
      <button
        onClick={onToggle}
        aria-pressed={selected}
        aria-label={`Select talent ${talent.name}`}
        disabled={disabled}
        className={`flex-shrink-0 grid place-items-center w-8 h-8 rounded-md border-2 transition-colors ${selected ? 'bg-primary border-primary text-primary-foreground' : disabled ? 'bg-muted border-border opacity-50 cursor-not-allowed' : 'bg-background border-border text-transparent'}`}
      >
        <CheckIcon className={`w-5 h-5 ${selected ? 'text-primary-foreground' : 'text-transparent'}`} />
      </button>
      <div className="flex-1 text-sm leading-snug">
        <div className="font-bold text-foreground flex items-center gap-2">
          <span>{talent.name}</span>
          {suggested && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold border border-info bg-[var(--surface-info)] text-info shadow-sm">SUGGESTED</span>
          )}
          <Tooltip content={tooltipText}>
            <span className="inline-flex items-center">
              <Icon className={talent.sourceType === 'core' ? 'w-4 h-4 text-muted-foreground' : 'text-muted-foreground'} />
            </span>
          </Tooltip>
        </div>
        <div className="text-foreground/90">
          <span>{talent.description}</span>
          {(talent.source || talent.page) && (
            <span className="italic text-muted-foreground"> ({[talent.source, talent.page].filter(Boolean).join(', ')})</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const TalentSelector: React.FC<TalentSelectorProps> = ({ onDone }) => {
  const { aggregatedData, selectedTalents, toggleTalent, randomizeTalentFrom, maxTalents, selectedArchetype } = useCharacterContext();
  const allTalents = aggregatedData.TALENTS || [];
  const suggestedTalentNames = new Set((selectedArchetype?.talentRules?.suggested || []).map(n => n.trim()));

  const byCategory = useMemo(() => {
    const physical = allTalents.filter(t => t.category === 'Physical');
    const mental = allTalents.filter(t => t.category === 'Mental');
    const combat = allTalents.filter(t => t.category === 'Combat');
    const misc = allTalents.filter(t => t.category === 'Miscellaneous');
    return { physical, mental, combat, misc };
  }, [allTalents]);

  const canPickMore = selectedTalents.length < maxTalents;
  const selectedCount = selectedTalents.length;

  // When maximum talents are selected, auto-complete this step after a brief delay
  React.useEffect(() => {
    if (selectedCount >= maxTalents) {
      const t = setTimeout(() => {
        onDone?.();
      }, 400);
      return () => clearTimeout(t);
    }
  }, [selectedCount, maxTalents, onDone]);

  const List: React.FC<{ title: string; list: Talent[] }> = ({ title, list }) => {
    const hasUnpicked = list.some(t => !selectedTalents.includes(t.name));
    const disableRandom = !canPickMore || !hasUnpicked;
    return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold text-primary">{title}</h4>
        <button
          onClick={() => randomizeTalentFrom(list)}
          disabled={disableRandom}
          className={`text-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-md border ${disableRandom ? 'bg-muted text-muted-foreground cursor-not-allowed border-border' : 'bg-secondary text-secondary-foreground hover:bg-opacity-80 border-border'}`}
        >
          <DiceIcon className="w-4 h-4" /> Randomize
        </button>
      </div>
      <div className="space-y-3">
        {list.map((t) => (
          <TalentRow
            key={t.name}
            talent={t}
            selected={selectedTalents.includes(t.name)}
            onToggle={() => { if (selectedTalents.includes(t.name) || canPickMore) toggleTalent(t.name); }}
            canPickMore={canPickMore}
            suggested={suggestedTalentNames.has(t.name)}
          />
        ))}
      </div>
    </div>
  ); };

  return (
    <div>
      <div className="mb-4 text-sm text-muted-foreground flex items-center justify-between">
        <span>Choose up to {maxTalents} talents.</span>
        <span className="inline-flex items-center gap-2">
          <span className="text-foreground/70">Selected</span>
          <span className={`px-2 py-0.5 rounded-md border text-xs font-bold ${selectedCount > 0 ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground border-border'}`}>
            {selectedCount}/{maxTalents}
          </span>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {byCategory.physical.length > 0 && <List title="Physical Talents" list={byCategory.physical} />}
          {byCategory.mental.length > 0 && <List title="Mental Talents" list={byCategory.mental} />}
        </div>
        <div className="space-y-6">
          {byCategory.combat.length > 0 && <List title="Combat Talents" list={byCategory.combat} />}
          {byCategory.misc.length > 0 && <List title="Miscellaneous Talents" list={byCategory.misc} />}
        </div>
      </div>
      {onDone && (
        <div className="text-center mt-6">
          <button
            onClick={onDone}
            disabled={selectedCount === 0}
            className={`font-bold px-6 py-2 rounded-lg border ${selectedCount === 0 ? 'bg-muted text-muted-foreground border-border cursor-not-allowed' : 'bg-primary text-primary-foreground border-primary/60 hover:bg-opacity-90'}`}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
