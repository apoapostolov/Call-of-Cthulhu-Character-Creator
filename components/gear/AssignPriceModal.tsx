import React from 'react';
import type { DGItem } from '../../types';

interface AssignPriceModalProps {
  targetItem: DGItem | null;
  priceItem: DGItem | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AssignPriceModal: React.FC<AssignPriceModalProps> = ({ targetItem, priceItem, onConfirm, onCancel }) => {
  if (!targetItem || !priceItem) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-card border-2 border-primary/50 rounded-lg shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <header className="p-4 border-b border-border">
          <h3 className="text-xl font-bold text-primary">Assign Price to Equipment</h3>
        </header>
        <div className="p-4 space-y-3">
          <p className="text-sm text-foreground/90">
            Apply the price <span className="font-mono font-semibold">{priceItem.price ?? '-'}</span> from
            {' '}<span className="font-bold">{priceItem.name}</span> to your equipment
            {' '}<span className="font-bold">{targetItem.name}</span>?
          </p>
          {priceItem.description && (
            <p className="text-xs text-muted-foreground">Source description: {priceItem.description}</p>
          )}
        </div>
        <footer className="p-4 bg-cream-200 border-t border-border flex justify-end gap-3">
          <button onClick={onCancel} className="bg-secondary hover:bg-opacity-80 text-secondary-foreground font-bold py-2 px-4 rounded-lg">Cancel</button>
          <button onClick={onConfirm} className="bg-primary hover:bg-opacity-80 text-primary-foreground font-bold py-2 px-4 rounded-lg">Assign Price</button>
        </footer>
      </div>
    </div>
  );
};

