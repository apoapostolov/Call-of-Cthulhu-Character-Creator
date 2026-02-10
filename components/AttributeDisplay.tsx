import React from 'react';
import { Tooltip } from './Tooltip';
import { ModifierPill } from './ModifierPill';

interface AttributeDisplayProps {
  label: string;
  score: number;
  change?: number;
  changeEvents?: string;
  lifeEventChange?: number;
  lifeEventSource?: string;
    tooltip?: string;
    highlight?: boolean;
  onDeduct?: () => void;
  showDeductButton?: boolean;
  onDecrease?: () => void;
  onIncrease?: () => void;
  onEduCheck?: () => void;
  showEduCheckButton?: boolean;
  remainingEduChecks?: number;
  deductionsApplied?: number;
  deductionsRequired?: number;
}

export const AttributeDisplay: React.FC<AttributeDisplayProps> = ({ 
    label, score, change, changeEvents, lifeEventChange, lifeEventSource, tooltip, highlight,
    onDeduct, showDeductButton,
    onDecrease, onIncrease,
    onEduCheck, showEduCheckButton, remainingEduChecks,
    deductionsApplied, deductionsRequired
}) => {
    const hasChange = typeof change === 'number' && change !== 0;
    const hasLifeEventChange = typeof lifeEventChange === 'number' && lifeEventChange !== 0;

    const changePill = hasChange ? (
        <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold border-2 shadow-lg ${change > 0 ? 'bg-success-200 border-success-400 text-success-800' : 'bg-danger-200 border-danger-400 text-danger-800'}`}>
            {change > 0 ? '+' : ''}{change}
        </div>
    ) : null;

    // Build comprehensive tooltip for life events
    const lifeEventTooltip = hasLifeEventChange && lifeEventSource 
        ? `Life Events: ${lifeEventSource} (${lifeEventChange > 0 ? '+' : ''}${lifeEventChange})`
        : undefined;
    
    const finalTooltip = tooltip && lifeEventTooltip 
        ? `${tooltip}\n\n${lifeEventTooltip}`
        : (tooltip || lifeEventTooltip);

    return (
        <div className="relative flex flex-col items-center justify-center p-4 rounded-md border-2 border-border bg-card shadow-sm transition-all duration-300 min-h-[120px]">
            {hasChange ? (
                <Tooltip content={changeEvents ? <div className="text-xs whitespace-pre-wrap">{changeEvents}</div> : undefined}>
                    {changePill}
                </Tooltip>
            ) : null}
            {/* Controls integrated around the value */}
            
            {/* EDU improvement control is integrated near the value; remove legacy floating button */}
            {hasLifeEventChange && finalTooltip ? (
                <Tooltip content={<div className="text-xs whitespace-pre-wrap">{finalTooltip}</div>}>
                    <div 
                        className="text-sm font-bold uppercase tracking-wider mb-1 font-lato cursor-help" 
                        style={{ color: '#355e3b' }}
                    >
                        {label}
                    </div>
                </Tooltip>
            ) : (
                <div className="text-sm font-bold uppercase tracking-wider mb-1 font-lato text-muted-foreground">
                    {label}
                </div>
            )}
            {showDeductButton && onDecrease && onIncrease ? (
                <div className="my-1 flex items-center justify-center gap-3">
                    <button
                        onClick={onDecrease}
                        className={`font-lora text-3xl leading-none ${((deductionsApplied ?? 0) >= (deductionsRequired ?? 0)) ? 'text-muted-foreground opacity-30 cursor-not-allowed pointer-events-none' : 'text-foreground hover:text-primary'}`}
                        aria-label={`Apply deduction to ${label}`}
                    >
                        –
                    </button>
                    {finalTooltip ? (
                        <Tooltip content={<div className="text-xs whitespace-pre-wrap">{finalTooltip}</div>}>
                            <div 
                                className={`text-5xl font-lora font-bold ${highlight ? 'text-danger-700 animate-pulse' : ''} ${hasLifeEventChange ? 'cursor-help' : ''}`}
                                style={hasLifeEventChange ? { color: '#355e3b' } : (highlight ? undefined : undefined)}
                            >
                                {score}
                            </div>
                        </Tooltip>
                    ) : (
                        <div className={`text-5xl font-lora font-bold ${highlight ? 'text-danger-700 animate-pulse' : 'text-foreground'}`}>{score}</div>
                    )}
                    <button
                        onClick={onIncrease}
                        className="font-lora text-3xl leading-none text-foreground hover:text-primary"
                        aria-label={`Return deduction from ${label}`}
                    >
                        +
                    </button>
                </div>
            ) : showEduCheckButton && onEduCheck ? (
                <div className="my-1 flex items-center justify-center gap-3">
                    {finalTooltip ? (
                        <Tooltip content={<div className="text-xs whitespace-pre-wrap">{finalTooltip}</div>}>
                            <div 
                                className={`text-5xl font-lora font-bold ${highlight ? 'text-danger-700 animate-pulse' : ''} ${hasLifeEventChange ? 'cursor-help' : ''}`}
                                style={hasLifeEventChange ? { color: '#355e3b' } : (highlight ? undefined : undefined)}
                            >
                                {score}
                            </div>
                        </Tooltip>
                    ) : (
                        <div 
                            className={`text-5xl font-lora font-bold ${highlight ? 'text-danger-700 animate-pulse' : ''}`}
                            style={hasLifeEventChange ? { color: '#355e3b' } : (highlight ? undefined : undefined)}
                        >
                            {score}
                        </div>
                    )}
                    <button
                        onClick={onEduCheck}
                        className="relative font-lora text-3xl leading-none text-foreground hover:text-primary"
                        aria-label={`Make EDU improvement check. ${remainingEduChecks} checks remaining.`}
                        title="EDU Improvement Check"
                    >
                        <i className="fa-solid fa-dice-d20"></i>
                        {typeof remainingEduChecks === 'number' && (
                            <span className="absolute -top-2 -right-2 text-xs font-bold">{remainingEduChecks}</span>
                        )}
                    </button>
                </div>
            ) : (
                finalTooltip ? (
                    <Tooltip content={<div className="text-xs whitespace-pre-wrap">{finalTooltip}</div>}>
                        <div 
                            className={`text-5xl font-lora font-bold my-1 ${highlight ? 'text-danger-700 animate-pulse' : ''} ${hasLifeEventChange ? 'cursor-help' : ''}`}
                            style={hasLifeEventChange ? { color: '#355e3b' } : (highlight ? undefined : undefined)}
                        >
                            {score}
                        </div>
                    </Tooltip>
                ) : (
                    <div 
                        className={`text-5xl font-lora font-bold my-1 ${highlight ? 'text-danger-700 animate-pulse' : ''}`}
                        style={hasLifeEventChange ? { color: '#355e3b' } : (highlight ? undefined : undefined)}
                    >
                        {score}
                    </div>
                )
            )}
        </div>
    );
};
