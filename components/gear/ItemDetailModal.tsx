import React from 'react';
import type { DGItem } from '../../types';
import { AIIcon } from '../icons/AIIcon';
import { HomebrewIcon } from '../icons/HomebrewIcon';

interface ItemDetailModalProps {
  item: DGItem | null;
  onClose: () => void;
  onAddItem: (item: DGItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onAddItem }) => {
  if (!item) return null;

  const handleAddItem = () => {
    onAddItem(item);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-detail-modal-title"
    >
      <div
        className="bg-card border-2 border-primary/50 rounded-lg shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-border flex justify-between items-start">
          <h2 id="item-detail-modal-title" className="text-xl font-bold font-lora text-primary flex items-center gap-2">
            <span>{item.name}</span>
            {item.sourceType === 'ai' && (
              <AIIcon className="text-primary fa-sm" />
            )}
            {item.sourceType === 'homebrew' && (
              <HomebrewIcon className="text-primary fa-sm" />
            )}
          </h2>
          <span className="font-mono text-lg font-semibold text-primary">{item.price}</span>
        </header>
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {item.description && <p className="text-sm text-foreground/90">{item.description}</p>}
        </div>
        <footer className="p-4 bg-cream-200 border-t border-border flex justify-end gap-3">
          <button onClick={onClose} className="bg-secondary hover:bg-opacity-80 text-secondary-foreground font-bold py-2 px-4 rounded-lg">Cancel</button>
          <button onClick={handleAddItem} className="bg-primary hover:bg-opacity-80 text-primary-foreground font-bold py-2 px-4 rounded-lg flex items-center gap-2">
            <i className="fa-solid fa-plus-circle"></i>
            Add to Inventory
          </button>
        </footer>
      </div>
    </div>
  );
};
