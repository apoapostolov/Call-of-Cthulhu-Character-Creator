import React, { useMemo, useState } from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { Tooltip } from '../Tooltip';
import { QuestionIcon } from '../icons/QuestionIcon';
import { formatCentsUSD } from '../../utils/money';

const formatCurrency = (value: number | 'None' | '500M+') => {
  if (value === 'None') return 'None';
  if (value === '500M+') return '$500,000,000+';
  return `$${(value as number).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
};

const DetailRow: React.FC<{ label: string; value: string; tooltip: string; }> = ({ label, value, tooltip }) => (
    <div className="flex justify-between items-center text-sm py-1">
        <Tooltip content={tooltip}>
            <span className="text-muted-foreground flex items-center gap-1 cursor-help">
                {label}
                <QuestionIcon className="h-3 w-3" />
            </span>
        </Tooltip>
        <span className="font-mono font-bold text-foreground">{value}</span>
    </div>
);
import { useEraContext } from '../../context/SourceContext';

export const WealthDisplay: React.FC = () => {
    const { skills, aggregatedData, wealth, convertAssetsToCash } = useCharacterContext();
    const { selectedEra } = useEraContext();
    
    // Some eras rename the wealth/social standing skill.
    const isDarkAges = selectedEra === 'dark-ages-1000s';
    const isCampfireTales = selectedEra === 'campfire-tales';
    const wealthSkillName = isDarkAges ? 'Status' : isCampfireTales ? 'Family Credit Rating' : 'Credit Rating';
    const wealthSkill = skills[wealthSkillName] || 0;
    
    const currencySymbol = selectedEra === 'gaslight-1890s' || selectedEra === 'regency' ? '£' : isDarkAges ? 'd' : '$';
    
    // Dark Ages: cents represent pence directly (no division needed)
    // Other eras: cents represent 1/100 of currency unit
    const fmt = (cents: number) => {
        if (isDarkAges) {
            // For Dark Ages, cents ARE pence, so just format the number
            return `d${Math.round(cents)}`;
        }
        return formatCentsUSD(cents).replace('$', currencySymbol);
    };

    const level = useMemo(() => {
        const eraData = aggregatedData.WEALTH_DATA;
        if (!eraData) return null;
        return eraData.levels.find(l => wealthSkill >= l.minCR && wealthSkill <= l.maxCR) || null;
    }, [wealthSkill, aggregatedData.WEALTH_DATA]);

    const [isConvertOpen, setIsConvertOpen] = useState(false);
    const [convertAmount, setConvertAmount] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    if (!wealth || !level) {
        return (
            <div className="bg-cream-100 p-4 rounded-lg border-2 border-border shadow-inner">
                <h3 className="text-2xl font-bold font-lora text-primary text-center">Wealth</h3>
                <p className="text-muted-foreground text-center mt-2">Select an occupation to determine wealth.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-cream-100 p-4 rounded-lg border-2 border-border shadow-inner">
            <div className="relative flex items-center justify-center gap-3">
                <h3 className="text-2xl font-bold font-lora text-primary text-center">Wealth</h3>
                <button
                    type="button"
                    onClick={() => setIsOpen(prev => !prev)}
                    className="absolute right-0 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-expanded={isOpen}
                >
                    {isOpen ? 'Hide' : 'Show'}
                    <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </button>
            </div>
            <div className="text-center mb-3">
                <div className="font-bold text-lg text-primary-800">{level.name}</div>
                <p className="text-xs text-muted-foreground h-8">
                    {(() => {
                        const s = level.description || '';
                        const max = 150;
                        return s.length > max ? s.slice(0, max - 1) + '…' : s;
                    })()}
                </p>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0'}`}>
                <div className="space-y-1 bg-card/50 p-2 rounded-md border border-border/50">
                    <DetailRow label="Daily Cash" value={fmt(wealth.dailyCash)} tooltip="The amount of cash an investigator can spend on incidentals in a single day without tracking it. This is replenished daily." />
                    
                    <DetailRow 
                        label="Total Cash" 
                        value={fmt(wealth.totalCash)} 
                        tooltip={isDarkAges 
                            ? "Liquid cash available for immediate purchases. Represents coin purse, ready money, or easily accessible funds." 
                            : "The total liquid cash an investigator can access quickly from bank accounts, safes, etc. Spending more requires liquidating assets."
                        } 
                    />
                    
                    <div className="flex justify-between items-center text-sm py-1">
                        <Tooltip content={isDarkAges 
                            ? "The total value of stored wealth, property, livestock, and holdings. Liquidating assets takes time and may require finding buyers." 
                            : "The total value of an investigator's property, investments, and other holdings. Liquidating assets may take time."
                        }>
                            <span className="text-muted-foreground flex items-center gap-2 cursor-help">
                                Assets
                                <QuestionIcon className="h-3 w-3" />
                            </span>
                        </Tooltip>
                        <span className="font-mono font-bold text-foreground flex items-center gap-2">
                            <button className="p-1 rounded bg-card border border-border hover:bg-secondary/40" title="Convert assets to cash" onClick={() => setIsConvertOpen(true)}>
                                <i className="fa-solid fa-tags text-primary"></i>
                            </button>
                            {fmt(wealth.assets)}
                        </span>
                    </div>
                </div>
                
                {/* Dark Ages barter modifier box */}
                {isDarkAges && level.barter && (
                    <div className="mt-2 bg-card/50 p-2 rounded-md border border-border/50">
                        <Tooltip content="Your social standing affects trade negotiations. Higher status provides advantages when bartering, while lower status makes transactions more difficult.">
                            <div className="text-sm font-semibold text-muted-foreground flex items-center gap-1 cursor-help mb-1">
                                Barter
                                <QuestionIcon className="h-3 w-3" />
                            </div>
                        </Tooltip>
                        <p className="text-sm text-foreground">{level.barter}</p>
                    </div>
                )}
            </div>

            {isConvertOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setIsConvertOpen(false)}>
                    <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-sm p-4" onClick={e => e.stopPropagation()}>
                        <h4 className="text-lg font-bold mb-2">Convert Assets to Cash</h4>
                        <p className="text-sm text-muted-foreground mb-3">Enter an amount to convert. This permanently reduces assets and increases total cash.</p>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-mono">{currencySymbol}</span>
                            <input value={convertAmount} onChange={(e) => setConvertAmount(e.target.value)} placeholder="0.00" className="flex-grow bg-card border border-border rounded p-2" />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="px-3 py-2 rounded bg-muted text-muted-foreground" onClick={() => setIsConvertOpen(false)}>Cancel</button>
                            <button className="px-3 py-2 rounded bg-primary text-primary-foreground" onClick={() => {
                                const dollars = parseFloat(convertAmount || '0');
                                const cents = Math.round((isNaN(dollars) ? 0 : dollars) * 100);
                                if (cents > 0 && convertAssetsToCash(cents)) {
                                    setIsConvertOpen(false); setConvertAmount('');
                                }
                            }}>Convert</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
