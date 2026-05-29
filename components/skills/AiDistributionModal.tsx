import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AiStarsIcon } from '../icons/AiStarsIcon';
import type { SkillDistributionAllocation, SkillDistributionAnalysis } from '../../lib/ai/skill-distribution';

interface AiDistributionModalProps {
    open: boolean;
    occupationName: string;
    description: string;
    onDescriptionChange: (description: string) => void;
    onClose: () => void;
    onSubmit: (
        description: string,
        onStageChange: (stage: 'analyzing' | 'distributing' | null) => void,
    ) => Promise<void>;
    onApply: () => void;
    onRetry: (
        description: string,
        onStageChange: (stage: 'analyzing' | 'distributing' | null) => void,
    ) => Promise<void>;
    review: {
        analysis: SkillDistributionAnalysis;
        rationale?: string;
        coreSkills: SkillDistributionAllocation[];
        supplementalSkills: SkillDistributionAllocation[];
        personalInterests: SkillDistributionAllocation[];
    } | null;
}

type ReviewTab = 'distribution' | 'notes';

const renderAllocationList = (items: SkillDistributionAllocation[]) => {
    if (!items.length) {
        return <p className="text-sm text-muted-foreground">None.</p>;
    }

    return (
        <ul className="space-y-2">
            {items.map(item => (
                <li key={`${item.skill}-${item.points}`} className="flex items-start justify-between gap-3 rounded-md border border-border bg-cream-50 px-3 py-2">
                    <span className="text-sm font-medium text-foreground">{item.skill}</span>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{item.points} pts</span>
                </li>
            ))}
        </ul>
    );
};

const mergeAllocations = (items: SkillDistributionAllocation[]) => {
    const totals = new Map<string, number>();
    for (const item of items) {
        totals.set(item.skill, (totals.get(item.skill) || 0) + item.points);
    }
    return Array.from(totals.entries()).map(([skill, points]) => ({ skill, points }));
};

export const AiDistributionModal: React.FC<AiDistributionModalProps> = ({
    open,
    occupationName,
    description,
    onDescriptionChange,
    onClose,
    onSubmit,
    onApply,
    onRetry,
    review,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stage, setStage] = useState<'analyzing' | 'distributing' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<ReviewTab>('distribution');

    useEffect(() => {
        if (!open) {
            setError(null);
            setIsSubmitting(false);
            setStage(null);
            setActiveTab('distribution');
        } else if (review) {
            setActiveTab('distribution');
        }
    }, [open, review]);

    if (!open || typeof document === 'undefined') return null;

    const handleGeneration = async (
        submitter: (description: string, onStageChange: (stage: 'analyzing' | 'distributing' | null) => void) => Promise<void>,
    ) => {
        const trimmed = description.trim();
        if (!trimmed) {
            setError('Please describe the character before asking for a distribution.');
            return;
        }

        setIsSubmitting(true);
        setStage(null);
        setError(null);
        try {
            await submitter(trimmed, setStage);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'AI distribution failed.');
        } finally {
            setIsSubmitting(false);
            setStage(null);
        }
    };

    const actionLabel = stage === 'analyzing'
        ? 'Analyzing...'
        : stage === 'distributing'
            ? 'Distributing...'
            : isSubmitting
                ? 'Working...'
                : 'Distribute Skills';

    const retryLabel = stage === 'analyzing'
        ? 'Analyzing...'
        : stage === 'distributing'
            ? 'Distributing...'
            : isSubmitting
                ? 'Working...'
                : 'Retry';

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="ai-distribution-title" onMouseDown={onClose}>
            <div
                className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary-900/20"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-3 border-b border-border bg-cream-100 p-4">
                    <div>
                        <h2 id="ai-distribution-title" className="flex items-center gap-2 text-2xl font-bold text-primary">
                            <AiStarsIcon className="h-6 w-6" />
                            AI Distribution
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Describe the character and let the AI allocate skill points for {occupationName}.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-2 text-muted-foreground hover:bg-cream-200 hover:text-foreground"
                        aria-label="Close AI distribution dialog"
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                <div className="flex min-h-0 flex-1 flex-col">
                    {!review ? (
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-muted-foreground">Character description</span>
                                <textarea
                                    value={description}
                                    onChange={(e) => onDescriptionChange(e.target.value)}
                                    placeholder="Describe the character's abilities, profession, hobbies, trainings, life history, achievements, and anything else that should influence the skill spread."
                                    className="min-h-48 w-full rounded-md border border-border bg-cream-100 p-3 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
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
                                    onClick={() => void handleGeneration(onSubmit)}
                                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={isSubmitting}
                                >
                                    <AiStarsIcon className="h-4 w-4" />
                                    {actionLabel}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="border-b border-border bg-cream-50 px-4 pt-3">
                                <div className="inline-flex rounded-lg border border-border bg-card p-1">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('distribution')}
                                        className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${activeTab === 'distribution' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-cream-100'}`}
                                    >
                                        Distribution
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('notes')}
                                        className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${activeTab === 'notes' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-cream-100'}`}
                                    >
                                        AI Notes
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto p-4">
                                {activeTab === 'distribution' ? (
                                    <div className="space-y-4">
                                        <div className="rounded-xl border border-border bg-cream-100 p-4 space-y-4">
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold text-foreground">AI Decision</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    The AI has analyzed the brief for {occupationName} and proposed a distribution.
                                                </p>
                                                {review.rationale && (
                                                    <p className="text-sm text-foreground/90">{review.rationale}</p>
                                                )}
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-3">
                                                <section className="rounded-lg border border-border bg-card p-3">
                                                    <h4 className="mb-3 text-sm font-semibold text-primary">Core Skills</h4>
                                                    {renderAllocationList(mergeAllocations(review.coreSkills))}
                                                </section>
                                                <section className="rounded-lg border border-border bg-card p-3">
                                                    <h4 className="mb-3 text-sm font-semibold text-primary">Supplemental Skills</h4>
                                                    {renderAllocationList(mergeAllocations(review.supplementalSkills))}
                                                </section>
                                                <section className="rounded-lg border border-border bg-card p-3">
                                                    <h4 className="mb-3 text-sm font-semibold text-primary">Personal Interests</h4>
                                                    {renderAllocationList(mergeAllocations(review.personalInterests))}
                                                </section>
                                            </div>

                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-muted-foreground">Character description</span>
                                                <textarea
                                                    value={description}
                                                    onChange={(e) => onDescriptionChange(e.target.value)}
                                                    placeholder="Describe the character's abilities, profession, hobbies, trainings, life history, achievements, and anything else that should influence the skill spread."
                                                    className="min-h-28 w-full rounded-md border border-border bg-cream-50 p-3 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </label>
                                        </div>

                                        {error && (
                                            <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                                                {error}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="rounded-xl border border-border bg-cream-100 p-4 space-y-3">
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold text-foreground">AI Notes</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Interpretation details, caution flags, and the AI’s read of the concept.
                                                </p>
                                            </div>

                                            <div className="space-y-3 text-sm text-foreground/90">
                                                {review.analysis.summary && <p>{review.analysis.summary}</p>}
                                                {review.analysis.themes.length > 0 && <p><span className="font-medium">Themes:</span> {review.analysis.themes.join(', ')}</p>}
                                                {review.analysis.likelyCoreSkills.length > 0 && <p><span className="font-medium">Likely core:</span> {review.analysis.likelyCoreSkills.join(', ')}</p>}
                                                {review.analysis.likelySupportSkills.length > 0 && <p><span className="font-medium">Likely support:</span> {review.analysis.likelySupportSkills.join(', ')}</p>}
                                                {review.analysis.likelySpecializations.length > 0 && <p><span className="font-medium">Likely specializations:</span> {review.analysis.likelySpecializations.join(', ')}</p>}
                                                {review.analysis.combatProfile && <p><span className="font-medium">Combat profile:</span> {review.analysis.combatProfile}</p>}
                                                {review.analysis.literacyNotes && <p><span className="font-medium">Literacy:</span> {review.analysis.literacyNotes}</p>}
                                                {review.analysis.cautions.length > 0 && <p><span className="font-medium">Cautions:</span> {review.analysis.cautions.join(', ')}</p>}
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                                                {error}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="mt-4 flex items-center justify-end gap-3 pb-1">
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
                                        onClick={() => void handleGeneration(onRetry)}
                                        className="inline-flex items-center gap-2 rounded-md border border-border bg-cream-200 px-4 py-2 text-sm font-semibold text-foreground hover:bg-cream-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        disabled={isSubmitting}
                                    >
                                        <AiStarsIcon className="h-4 w-4" />
                                        {retryLabel}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onApply();
                                            onClose();
                                        }}
                                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                        disabled={isSubmitting}
                                    >
                                        <AiStarsIcon className="h-4 w-4" />
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
};
