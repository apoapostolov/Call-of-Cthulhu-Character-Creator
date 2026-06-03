import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSheetContext, SheetSourceType } from '../context/SheetContext';
import { useAiSettings } from '../context/AiSettingsContext';
import { AI_PROVIDER_OPTIONS, isAiProviderId } from '../lib/ai/provider-options';
import { ERAS } from '../eras/manifest';
import { RefreshIcon } from './icons/RefreshIcon';

interface SettingsModalProps { onClose: () => void; }

const RadioOption: React.FC<{ id: string; label: string; description: string; value: SheetSourceType; currentValue: SheetSourceType; onChange: (value: SheetSourceType) => void; }> = ({ id, label, description, value, currentValue, onChange }) => (
    <div className="flex items-start">
        <input id={id} type="radio" name="sheet-source" value={value} checked={currentValue === value} onChange={() => onChange(value)} className="mt-1 h-4 w-4 text-primary border-border focus:ring-ring" />
        <label htmlFor={id} className="ml-3">
            <span className="block text-md font-bold text-foreground">{label}</span>
            <span className="block text-sm text-muted-foreground">{description}</span>
        </label>
    </div>
);

const UrlInput: React.FC<{ label: string; value: string; onChange: (value: string) => void; type?: string }> = ({ label, value, onChange, type = 'text' }) => (
    <div className="mt-2">
        <label className="block text-sm font-medium text-muted-foreground">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-cream-200 border border-border rounded-md p-2 mt-1 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring"
        />
    </div>
);

const SelectInput: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => (
    <div className="mt-2">
        <label className="block text-sm font-medium text-muted-foreground">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-cream-200 border border-border rounded-md p-2 mt-1 text-foreground focus:ring-2 focus:ring-ring focus:border-ring"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

const formatModelOptionLabel = (model: {
    id: string;
    baseName: string;
    name: string;
    priceLabel: string;
}) => `${model.baseName} · ${model.priceLabel} / 1M mixed`;

const SearchableSelect: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuRect, setMenuRect] = useState<{ top: number; left: number; width: number } | null>(null);

    useEffect(() => {
        const onDocClick = (event: MouseEvent) => {
            if (!containerRef.current) return;
            const target = event.target as Node;
            if (!containerRef.current.contains(target) && !menuRef.current?.contains(target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    useEffect(() => {
        if (open) {
            setQuery('');
            const updatePosition = () => {
                const button = buttonRef.current;
                if (!button) return;
                const rect = button.getBoundingClientRect();
                setMenuRect({
                    top: rect.bottom + 4,
                    left: rect.left,
                    width: rect.width,
                });
            };

            updatePosition();
            window.setTimeout(() => inputRef.current?.focus(), 0);

            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition, true);
            return () => {
                window.removeEventListener('resize', updatePosition);
                window.removeEventListener('scroll', updatePosition, true);
            };
        }
        setMenuRect(null);
        return undefined;
    }, [open]);

    const selectedLabel = options.find(option => option.value === value)?.label || 'Select a model';
    const filteredOptions = useMemo(
        () => options.filter(option => {
            if (!query.trim()) return true;
            const haystack = `${option.label} ${option.value}`.toLowerCase();
            return haystack.includes(query.toLowerCase());
        }),
        [options, query],
    );

    return (
        <div ref={containerRef} className="mt-2 relative">
            <label className="block text-sm font-medium text-muted-foreground">{label}</label>
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full bg-cream-200 border border-border rounded-md p-2 mt-1 text-left text-foreground focus:ring-2 focus:ring-ring focus:border-ring flex items-center justify-between gap-2"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="truncate">{selectedLabel}</span>
                <i className="fa-solid fa-chevron-down text-muted-foreground"></i>
            </button>
            {open && menuRect && typeof document !== 'undefined' && createPortal(
                <div
                    ref={menuRef}
                    className="fixed z-[9999] bg-card border border-border rounded-md shadow-2xl p-2"
                    role="listbox"
                    style={{
                        top: `${menuRect.top}px`,
                        left: `${menuRect.left}px`,
                        width: `${menuRect.width}px`,
                    }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type to filter models..."
                        className="w-full bg-cream-100 border border-border rounded-md p-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring"
                    />
                    <div className="mt-2 max-h-56 overflow-auto">
                        {filteredOptions.length > 0 ? filteredOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                role="option"
                                aria-selected={value === option.value}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                }}
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${value === option.value ? 'bg-cream-100 text-foreground font-bold' : 'hover:bg-cream-100'}`}
                            >
                                <div className="truncate">{option.label}</div>
                            </button>
                        )) : (
                            <div className="px-3 py-2 text-sm text-muted-foreground">No models match your filter.</div>
                        )}
                    </div>
                </div>,
                document.body,
            )}
        </div>
    );
};

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
    const { sourceType, setSourceType, externalUrls, setExternalUrl, selfHostedUrl, setSelfHostedUrl } = useSheetContext();
    const {
        provider,
        setProvider,
        providerApiKey,
        setProviderApiKey,
        providerSimpleModels,
        providerCreativeModels,
        providerVisionModels,
        providerImageModels,
        providerModelCatalogState,
        providerModelCatalogError,
        refreshProviderModels,
        providerSimpleModelId,
        setProviderSimpleModelId,
        providerTextModelId,
        setProviderTextModelId,
        providerVisionModelId,
        setProviderVisionModelId,
        providerImageModelId,
        setProviderImageModelId,
    } = useAiSettings();
    const [activeTab, setActiveTab] = useState<'sheet' | 'ai'>('sheet');
    const simpleModelOptions = useMemo(() => providerSimpleModels.map(model => ({
        value: model.id,
        label: formatModelOptionLabel(model),
    })), [providerSimpleModels]);

    const creativeModelOptions = useMemo(() => providerCreativeModels.map(model => ({
        value: model.id,
        label: formatModelOptionLabel(model),
    })), [providerCreativeModels]);

    const visionModelOptions = useMemo(() => providerVisionModels.map(model => ({
        value: model.id,
        label: formatModelOptionLabel(model),
    })), [providerVisionModels]);

    const imageModelOptions = useMemo(() => providerImageModels.map(model => ({
        value: model.id,
        label: formatModelOptionLabel(model),
    })), [providerImageModels]);

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="settings-modal-title">
            <div className="bg-card border-2 border-primary/50 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b border-border bg-cream-100 rounded-t-lg">
                    <h2 id="settings-modal-title" className="text-2xl font-bold font-lora text-primary">Settings</h2>
                    <button onClick={onClose} className="text-neutral-500 hover:text-foreground transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-ring" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>

                <div className="flex border-b border-border bg-cream-100 px-6 pt-4 gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('sheet')}
                        className={`px-4 py-2 rounded-t-lg font-bold ${activeTab === 'sheet' ? 'bg-cream-200 text-primary border border-border border-b-0' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Character Sheet settings
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('ai')}
                        className={`px-4 py-2 rounded-t-lg font-bold ${activeTab === 'ai' ? 'bg-cream-200 text-primary border border-border border-b-0' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        AI Provider
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    {activeTab === 'sheet' && (
                        <>
                            <section>
                                <h3 className="text-lg font-bold text-foreground mb-3">Character Sheet Source</h3>
                                <div className="space-y-4 bg-cream-200 p-4 rounded-lg border border-border">
                                    <RadioOption id="source-internal" label="Internal Development" description="Use sheet files in the local /public/sheets/ folder. (For developers)" value="internal" currentValue={sourceType} onChange={setSourceType} />
                                    <RadioOption id="source-external" label="Default External URLs" description="Use official, externally hosted PDFs via CDN for best compatibility." value="external" currentValue={sourceType} onChange={setSourceType} />
                                    <RadioOption id="source-self-hosted" label="Self-Hosted" description="Provide a base URL to a folder where you are hosting the PDF files." value="self-hosted" currentValue={sourceType} onChange={setSourceType} />
                                </div>
                            </section>

                            {sourceType === 'external' && (
                                <section>
                                    <h3 className="text-lg font-bold text-foreground mb-3">External URLs</h3>
                                    <div className="space-y-4 bg-cream-200 p-4 rounded-lg border border-border max-h-64 overflow-y-auto">
                                        {ERAS.map(source => (
                                            <div key={source.id}>
                                                <h4 className="font-semibold text-foreground">{source.name}</h4>
                                                <UrlInput label="Default Sheet URL" value={externalUrls[source.id]?.defaultSheet || ''} onChange={(val) => setExternalUrl(source.id, 'defaultSheet', val)} />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {sourceType === 'self-hosted' && (
                                <section>
                                    <h3 className="text-lg font-bold text-foreground mb-3">Self-Hosted Base URL</h3>
                                    <div className="space-y-4 bg-cream-200 p-4 rounded-lg border border-border">
                                        <p className="text-sm text-muted-foreground">Enter the base URL to the directory containing the PDF files. The app will append the standard filename (e.g., `delta_green_sheet.pdf`) to this URL.</p>
                                        <UrlInput label="Base URL" value={selfHostedUrl} onChange={setSelfHostedUrl} />
                                    </div>
                                </section>
                            )}
                        </>
                    )}

                    {activeTab === 'ai' && (
                        <>
                            <section>
                                <h3 className="text-lg font-bold text-foreground mb-3">Provider</h3>
                                <div className="space-y-4 bg-cream-200 p-4 rounded-lg border border-border">
                                    <SelectInput
                                        label="Provider"
                                        value={provider}
                                        onChange={(value) => {
                                            if (isAiProviderId(value)) setProvider(value);
                                        }}
                                        options={AI_PROVIDER_OPTIONS.map(option => ({
                                            value: option.value,
                                            label: option.label,
                                        }))}
                                    />
                                    <UrlInput
                                        label="Provider API Key"
                                        value={providerApiKey}
                                        onChange={setProviderApiKey}
                                        type="password"
                                    />
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <h3 className="text-lg font-bold text-foreground">Prompting Models</h3>
                                    <button
                                        type="button"
                                        onClick={() => void refreshProviderModels()}
                                        className="inline-flex items-center gap-2 rounded-md border border-border bg-cream-200 px-3 py-2 text-sm font-semibold text-foreground hover:bg-cream-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        aria-label={`Refresh ${provider} model list`}
                                        title="Refresh model list"
                                        disabled={providerModelCatalogState === 'loading'}
                                    >
                                        <RefreshIcon className="h-4 w-4" />
                                        Refresh
                                    </button>
                                </div>
                                <div className="space-y-4 bg-cream-200 p-4 rounded-lg border border-border">
                                    <SearchableSelect
                                        key={`${provider}-simple`}
                                        label="Simple Writing"
                                        value={providerSimpleModelId}
                                        onChange={setProviderSimpleModelId}
                                        options={simpleModelOptions}
                                    />
                                    <SearchableSelect
                                        key={`${provider}-creative`}
                                        label="Creative Writing"
                                        value={providerTextModelId}
                                        onChange={setProviderTextModelId}
                                        options={creativeModelOptions}
                                    />
                                    {visionModelOptions.length > 0 ? (
                                        <SearchableSelect
                                            key={`${provider}-vision`}
                                            label="Vision Analysis"
                                            value={providerVisionModelId}
                                            onChange={setProviderVisionModelId}
                                            options={visionModelOptions}
                                        />
                                    ) : (
                                        <div className="mt-2 rounded-md border border-dashed border-border bg-cream-100 p-3 text-sm text-muted-foreground">
                                            No vision-capable models are available for this provider.
                                        </div>
                                    )}
                                    {imageModelOptions.length > 0 ? (
                                        <SearchableSelect
                                            key={`${provider}-image`}
                                            label="Image Generation"
                                            value={providerImageModelId}
                                            onChange={setProviderImageModelId}
                                            options={imageModelOptions}
                                        />
                                    ) : (
                                        <div className="mt-2 rounded-md border border-dashed border-border bg-cream-100 p-3 text-sm text-muted-foreground">
                                            No image-generation models are available for this provider.
                                        </div>
                                    )}
                                    <div className="text-sm text-muted-foreground">
                                        Status: {providerModelCatalogState}
                                        {providerModelCatalogError ? ` - ${providerModelCatalogError}` : ''}
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </div>

                <footer className="p-4 border-t border-border flex-shrink-0 text-right bg-cream-100 rounded-b-lg">
                    <button onClick={onClose} className="bg-primary hover:bg-opacity-80 text-primary-foreground font-bold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">Done</button>
                </footer>
            </div>
        </div>
    );
};
