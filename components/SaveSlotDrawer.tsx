import React, { useState, useEffect } from 'react';
import { useSaveSystem } from '../hooks/useSaveSystem';
import { useCharacterContext } from '../context/CharacterContext';
import { useEraContext } from '../context/SourceContext';
import type { SaveSlot } from '../types';

export const SaveSlotDrawer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [customNameModalOpen, setCustomNameModalOpen] = useState(false);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
    const [customName, setCustomName] = useState('');
    const [importModalOpen, setImportModalOpen] = useState(false);
    const [exportCurrentModalOpen, setExportCurrentModalOpen] = useState(false);
    const [importData, setImportData] = useState('');
    const [exportData, setExportData] = useState<string | null>(null);
    const [currentCharacterExportData, setCurrentCharacterExportData] = useState<string | null>(null);
    const [copiedSlot, setCopiedSlot] = useState<number | null>(null);
    
    const character = useCharacterContext();
    const { selectedEra } = useEraContext();
    const { slots, saveCharacter, loadCharacter, deleteSlot, exportSlot, importSlot, exportCurrentCharacter } = useSaveSystem();

    const copyTextToClipboard = async (text: string) => {
        if (!text) return false;
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (error) {
                console.warn('Clipboard API copy failed, falling back to execCommand.', error);
            }
        }

        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.setAttribute('readonly', '');
            textArea.style.position = 'fixed';
            textArea.style.top = '-1000px';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            textArea.setSelectionRange(0, text.length);
            const ok = document.execCommand('copy');
            document.body.removeChild(textArea);
            return ok;
        } catch (error) {
            console.warn('execCommand copy failed.', error);
            return false;
        }
    };

    const handleSave = (slotIndex: number) => {
        const slotName = slots[slotIndex]?.customName || character.ai.characterName || '';
        if (!slotName && !slots[slotIndex]?.customName) {
            // Open modal to ask for custom name
            setSelectedSlotIndex(slotIndex);
            setCustomNameModalOpen(true);
        } else {
            saveCharacter(slotIndex, slotName);
        }
    };

    const handleSaveWithName = () => {
        if (selectedSlotIndex !== null) {
            saveCharacter(selectedSlotIndex, customName || character.ai.characterName || `Character ${selectedSlotIndex + 1}`);
            setCustomNameModalOpen(false);
            setCustomName('');
            setSelectedSlotIndex(null);
        }
    };

    const handleLoad = (slotIndex: number) => {
        if (window.confirm('Loading will replace your current character. Continue?')) {
            loadCharacter(slotIndex);
        }
    };

    const handleDelete = (slotIndex: number) => {
        if (window.confirm('Delete this character save? This cannot be undone.')) {
            deleteSlot(slotIndex);
        }
    };

    const handleExport = (slotIndex: number) => {
        const data = exportSlot(slotIndex);
        setExportData(data);
    };

    const handleCopyToClipboard = async (slotIndex: number) => {
        const data = exportSlot(slotIndex);
        const ok = await copyTextToClipboard(data);
        if (ok) {
            setCopiedSlot(slotIndex);
            setTimeout(() => setCopiedSlot(null), 2000);
        } else {
            alert('Failed to copy to clipboard. Try using Export and copy manually.');
        }
    };

    const handleImportSubmit = () => {
        try {
            importSlot(importData);
            setImportModalOpen(false);
            setImportData('');
        } catch (error) {
            alert('Failed to import character: ' + (error as Error).message);
        }
    };

    const handleExportCurrent = () => {
        try {
            const jsonData = exportCurrentCharacter();
            setCurrentCharacterExportData(jsonData);
            setExportCurrentModalOpen(true);
        } catch (error) {
            alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleCopyCurrentCharacter = async () => {
        if (currentCharacterExportData) {
            const ok = await copyTextToClipboard(currentCharacterExportData);
            if (ok) {
                alert('Current character copied to clipboard!');
            } else {
                alert('Failed to copy to clipboard. Try the download option instead.');
            }
        }
    };

    const handleDownloadCurrentCharacter = () => {
        if (currentCharacterExportData) {
            const blob = new Blob([currentCharacterExportData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${character.ai.characterName || 'character'}_${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <>
            {/* Drawer Handle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="save-drawer-handle"
                aria-label={isOpen ? 'Close save menu' : 'Open save menu'}
                title={isOpen ? 'Close save menu' : 'Open save menu'}
            >
                <i className="fas fa-save"></i>
            </button>

            {/* Drawer */}
            <div className={`save-drawer ${isOpen ? 'open' : ''}`}>
                <div className="save-drawer-header">
                    <h2><i className="fas fa-archive"></i> Character Saves</h2>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="close-button"
                        aria-label="Close"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="save-drawer-content">
                    {slots.map((slot, index) => (
                        <div key={index} className={`save-slot ${slot ? 'filled' : 'empty'}`}>
                            <div className="slot-info">
                                <div className="slot-number">Slot {index + 1}</div>
                                {slot ? (
                                    <>
                                        <div className="slot-name">{slot.customName || slot.characterName || 'Unnamed Character'}</div>
                                        <div className="slot-meta">
                                            <span className="slot-era" title="Era">
                                                <i className="fas fa-calendar-alt"></i> {slot.era}
                                            </span>
                                            <span className="slot-date" title="Last saved">
                                                <i className="fas fa-clock"></i> {formatDate(slot.timestamp)}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="slot-empty-text">Empty Slot</div>
                                )}
                            </div>

                            <div className="slot-actions">
                                {slot ? (
                                    <>
                                        <button
                                            onClick={() => handleLoad(index)}
                                            className="slot-action-btn load"
                                            title="Load character"
                                        >
                                            <i className="fas fa-download"></i>
                                        </button>
                                        <button
                                            onClick={() => handleSave(index)}
                                            className="slot-action-btn update"
                                            title="Update save"
                                        >
                                            <i className="fas fa-sync-alt"></i>
                                        </button>
                                        <button
                                            onClick={() => handleExport(index)}
                                            className="slot-action-btn export"
                                            title="Export to JSON"
                                        >
                                            <i className="fas fa-file-export"></i>
                                        </button>
                                        <button
                                            onClick={() => handleCopyToClipboard(index)}
                                            className={`slot-action-btn copy ${copiedSlot === index ? 'copied' : ''}`}
                                            title="Copy to clipboard"
                                        >
                                            <i className={copiedSlot === index ? 'fas fa-check' : 'fas fa-clipboard'}></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="slot-action-btn delete"
                                            title="Delete save"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleSave(index)}
                                        className="slot-action-btn save"
                                        title="Save character here"
                                    >
                                        <i className="fas fa-save"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="save-drawer-footer">
                    <button
                        onClick={() => setImportModalOpen(true)}
                        className="drawer-footer-btn import"
                    >
                        <i className="fas fa-file-import"></i> Import
                    </button>
                    <button
                        onClick={handleExportCurrent}
                        className="drawer-footer-btn export"
                    >
                        <i className="fas fa-file-export"></i> Export
                    </button>
                </div>
            </div>

            {/* Custom Name Modal */}
            {customNameModalOpen && (
                <div className="modal-overlay" onClick={() => setCustomNameModalOpen(false)}>
                    <div className="modal-content save-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Name Your Character Save</h3>
                            <button onClick={() => setCustomNameModalOpen(false)} className="modal-close">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                                <input
                                    type="text"
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                    placeholder={character.ai.characterName || `Character ${(selectedSlotIndex || 0) + 1}`}
                                    className="custom-name-input"
                                    autoFocus
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') handleSaveWithName();
                                    }}
                            />
                            <p className="input-hint">Leave blank to use character name or date/time</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setCustomNameModalOpen(false)} className="btn-secondary">
                                Cancel
                            </button>
                            <button onClick={handleSaveWithName} className="btn-primary">
                                <i className="fas fa-save"></i> Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Modal */}
            {exportData && (
                <div className="modal-overlay" onClick={() => setExportData(null)}>
                    <div className="modal-content export-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Export Character Data</h3>
                            <button onClick={() => setExportData(null)} className="modal-close">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea
                                value={exportData}
                                readOnly
                                className="export-textarea"
                                rows={15}
                                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                            />
                            <p className="input-hint">Copy this JSON data to save your character externally</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={async () => {
                                    const ok = await copyTextToClipboard(exportData);
                                    if (ok) {
                                        alert('Copied to clipboard!');
                                    } else {
                                        alert('Failed to copy to clipboard. Please copy from the text area.');
                                    }
                                }}
                                className="btn-primary"
                            >
                                <i className="fas fa-clipboard"></i> Copy to Clipboard
                            </button>
                            <button
                                onClick={() => {
                                    const blob = new Blob([exportData], { type: 'application/json' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `character-${Date.now()}.json`;
                                    a.click();
                                    URL.revokeObjectURL(url);
                                }}
                                className="btn-primary"
                            >
                                <i className="fas fa-download"></i> Download JSON
                            </button>
                            <button onClick={() => setExportData(null)} className="btn-secondary">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Import Modal */}
            {importModalOpen && (
                <div className="modal-overlay" onClick={() => setImportModalOpen(false)}>
                    <div className="modal-content import-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Import Character Data</h3>
                            <button onClick={() => setImportModalOpen(false)} className="modal-close">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea
                                value={importData}
                                onChange={(e) => setImportData(e.target.value)}
                                placeholder="Paste your character JSON data here..."
                                className="import-textarea"
                                rows={15}
                            />
                            <p className="input-hint">Paste the exported JSON data to restore a character</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setImportModalOpen(false)} className="btn-secondary">
                                Cancel
                            </button>
                            <button onClick={handleImportSubmit} className="btn-primary" disabled={!importData.trim()}>
                                <i className="fas fa-file-import"></i> Import
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Current Character Modal */}
            {exportCurrentModalOpen && currentCharacterExportData && (
                <div className="modal-overlay" onClick={() => setExportCurrentModalOpen(false)}>
                    <div className="modal-content export-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Export Current Character</h3>
                            <button onClick={() => setExportCurrentModalOpen(false)} className="modal-close">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea
                                value={currentCharacterExportData}
                                readOnly
                                className="export-textarea"
                                rows={15}
                                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                            />
                            <p className="input-hint">Copy this JSON data to save your character externally</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleCopyCurrentCharacter} className="btn-primary">
                                <i className="fas fa-clipboard"></i> Copy to Clipboard
                            </button>
                            <button onClick={handleDownloadCurrentCharacter} className="btn-primary">
                                <i className="fas fa-download"></i> Download JSON
                            </button>
                            <button onClick={() => setExportCurrentModalOpen(false)} className="btn-secondary">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .save-drawer-handle {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    width: 56px;
                    height: 56px;
                    border-radius: 12px;
                    background: var(--color-primary);
                    border: 3px solid var(--color-border);
                    color: var(--color-primary-foreground);
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease;
                    z-index: 998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .save-drawer-handle:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                    background: var(--color-accent);
                    color: var(--color-accent-foreground);
                }

                .save-drawer-handle:active {
                    transform: scale(0.95);
                }

                .save-drawer {
                    position: fixed;
                    top: 0;
                    left: -420px;
                    width: 420px;
                    height: 100vh;
                    background: var(--color-background);
                    box-shadow: 2px 0 24px rgba(0, 0, 0, 0.12);
                    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 999;
                    display: flex;
                    flex-direction: column;
                    border-right: 2px solid var(--color-border);
                }

                .save-drawer.open {
                    left: 0;
                }

                .save-drawer-header {
                    padding: 24px;
                    border-bottom: 2px solid var(--color-border);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: var(--color-primary);
                    color: var(--color-primary-foreground);
                }

                .save-drawer-header h2 {
                    margin: 0;
                    font-size: 22px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .close-button {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    color: var(--color-primary-foreground);
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .close-button:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .save-drawer-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    background: var(--color-background);
                }

                .save-drawer-content::-webkit-scrollbar {
                    width: 8px;
                }

                .save-drawer-content::-webkit-scrollbar-track {
                    background: var(--color-border);
                    border-radius: 4px;
                }

                .save-drawer-content::-webkit-scrollbar-thumb {
                    background: var(--color-secondary);
                    border-radius: 4px;
                }

                .save-drawer-content::-webkit-scrollbar-thumb:hover {
                    background: var(--color-accent);
                }

                .save-slot {
                    background: var(--color-popover);
                    border-radius: 12px;
                    padding: 16px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    transition: all 0.2s;
                    border: 2px solid var(--color-border);
                }

                .save-slot:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
                    border-color: var(--color-accent);
                }

                .save-slot.filled {
                    background: var(--color-card);
                    border-color: var(--color-primary);
                }

                .slot-info {
                    margin-bottom: 12px;
                }

                .slot-number {
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: var(--color-accent);
                    margin-bottom: 6px;
                }

                .slot-name {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--color-foreground);
                    margin-bottom: 8px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .slot-empty-text {
                    font-size: 14px;
                    color: var(--color-muted-foreground);
                    font-style: italic;
                }

                .slot-meta {
                    display: flex;
                    gap: 12px;
                    font-size: 12px;
                    color: var(--color-muted-foreground);
                    flex-wrap: wrap;
                }

                .slot-meta span {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .slot-era {
                    padding: 2px 8px;
                    background: var(--color-secondary);
                    border-radius: 8px;
                    font-weight: 500;
                    color: var(--color-secondary-foreground);
                }

                .slot-actions {
                    display: flex;
                    gap: 6px;
                    flex-wrap: wrap;
                }

                .slot-action-btn {
                    flex: 1;
                    min-width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    border: 2px solid var(--color-border);
                    background: var(--color-secondary);
                    color: var(--color-secondary-foreground);
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .slot-action-btn:hover {
                    background: var(--color-accent);
                    color: var(--color-accent-foreground);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    border-color: var(--color-accent);
                }

                .slot-action-btn.delete {
                    background: var(--color-destructive);
                    color: var(--color-destructive-foreground);
                    border-color: var(--color-destructive);
                }

                .slot-action-btn.delete:hover {
                    opacity: 0.9;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }

                .slot-action-btn.save {
                    flex: 1 1 100%;
                    background: var(--color-primary);
                    color: var(--color-primary-foreground);
                    border-color: var(--color-primary);
                    font-weight: 600;
                }

                .slot-action-btn.save:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                }

                .slot-action-btn.copied {
                    background: var(--color-accent);
                    color: var(--color-accent-foreground);
                    border-color: var(--color-accent);
                }

                .save-drawer-footer {
                    padding: 16px;
                    border-top: 2px solid var(--color-border);
                    display: flex;
                    gap: 10%;
                    background: var(--color-muted);
                    justify-content: space-between;
                }

                .drawer-footer-btn {
                    width: 45%;
                    padding: 14px;
                    border-radius: 10px;
                    border: 2px solid var(--color-border);
                    background: var(--color-primary);
                    color: var(--color-primary-foreground);
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .drawer-footer-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                    background: var(--color-accent);
                    color: var(--color-accent-foreground);
                    border-color: var(--color-accent);
                }

                .drawer-footer-btn.export {
                    background: var(--color-secondary);
                    color: var(--color-secondary-foreground);
                }

                .drawer-footer-btn.import {
                    background: var(--color-accent);
                    color: var(--color-accent-foreground);
                }

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1001;
                    animation: fadeIn 0.2s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .modal-content {
                    background: var(--color-card);
                    border-radius: 16px;
                    border: 2px solid var(--color-border);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    display: flex;
                    flex-direction: column;
                    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .modal-header {
                    padding: 24px;
                    border-bottom: 2px solid var(--color-border);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: var(--color-primary);
                    color: var(--color-primary-foreground);
                    border-radius: 14px 14px 0 0;
                }

                .modal-header h3 {
                    margin: 0;
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--color-primary-foreground);
                }

                .modal-close {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-primary-foreground);
                }

                .modal-close:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .modal-body {
                    padding: 24px;
                    flex: 1;
                    overflow-y: auto;
                }

                .modal-footer {
                    padding: 16px 24px;
                    border-top: 2px solid var(--color-border);
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                    background: var(--surface-muted, var(--color-muted));
                }

                .custom-name-input,
                .export-textarea,
                .import-textarea {
                    width: 100%;
                    padding: 12px 16px;
                    border: 2px solid var(--color-border);
                    border-radius: 10px;
                    font-size: 15px;
                    font-family: inherit;
                    transition: all 0.2s;
                    background: var(--color-background);
                    color: var(--color-foreground);
                }

                .custom-name-input:focus,
                .export-textarea:focus,
                .import-textarea:focus {
                    outline: none;
                    border-color: var(--color-accent);
                    box-shadow: 0 0 0 3px var(--color-ring);
                }

                .export-textarea,
                .import-textarea {
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    font-size: 12px;
                    resize: vertical;
                }

                .input-hint {
                    margin-top: 8px;
                    font-size: 13px;
                    color: var(--color-muted-foreground);
                }

                .btn-primary,
                .btn-secondary {
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 2px solid var(--color-border);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .btn-primary {
                    background: var(--color-primary);
                    color: var(--color-primary-foreground);
                    border-color: var(--color-primary);
                }

                .btn-primary:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                    background: var(--color-accent);
                    border-color: var(--color-accent);
                }

                .btn-primary:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .btn-secondary {
                    background: var(--color-secondary);
                    color: var(--color-secondary-foreground);
                    border-color: var(--color-border);
                }

                .btn-secondary:hover {
                    background: var(--color-muted);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </>
    );
};
