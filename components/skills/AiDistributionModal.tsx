import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AiStarsIcon } from '../icons/AiStarsIcon';

interface AiDistributionModalProps {
    open: boolean;
    occupationName: string;
    description: string;
    onDescriptionChange: (description: string) => void;
    onClose: () => void;
    onSubmit: (description: string) => Promise<void>;
}

export const AiDistributionModal: React.FC<AiDistributionModalProps> = ({ open, occupationName, description, onDescriptionChange, onClose, onSubmit }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            setError(null);
            setIsSubmitting(false);
        }
    }, [open]);

    if (!open || typeof document === 'undefined') return null;

    const handleSubmit = async () => {
        const trimmed = description.trim();
        if (!trimmed) {
            setError('Please describe the character before asking for a distribution.');
            return;
        }
        setIsSubmitting(true);
        setError(null);
        try {
            await onSubmit(trimmed);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'AI distribution failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] bg-black/75 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="ai-distribution-title" onMouseDown={onClose}>
            <div className="w-full max-w-3xl rounded-xl border border-border bg-card shadow-2xl shadow-primary-900/20" onMouseDown={(e) => e.stopPropagation()}>
                <div className="border-b border-border bg-cream-100 p-4 flex items-start justify-between gap-3">
                    <div>
                        <h2 id="ai-distribution-title" className="text-2xl font-bold text-primary flex items-center gap-2">
                            <AiStarsIcon className="h-6 w-6" />
                            AI Distribution
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Describe the character and let the AI allocate skill points for {occupationName}.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-cream-200"
                        aria-label="Close AI distribution dialog"
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <label className="block">
                        <span className="block text-sm font-medium text-muted-foreground mb-2">Character description</span>
                        <textarea
                            value={description}
                            onChange={(e) => onDescriptionChange(e.target.value)}
                            placeholder="Describe the character's abilities, profession, hobbies, trainings, life history, achievements, and anything else that should influence the skill spread."
                            className="w-full min-h-48 rounded-md border border-border bg-cream-100 p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                        />
                    </label>
                    {error && (
                        <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {error}
                        </div>
                    )}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-border bg-cream-200 px-4 py-2 text-sm font-semibold text-foreground hover:bg-cream-100"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => void handleSubmit()}
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={isSubmitting}
                        >
                            <AiStarsIcon className="h-4 w-4" />
                            {isSubmitting ? 'Distributing...' : 'Distribute Skills'}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};
