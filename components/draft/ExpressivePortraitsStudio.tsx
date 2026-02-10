import React from 'react';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { PortraitDisplay } from './PortraitDisplay';
import { EMOTIONS_CONFIG } from '../../emotional-portraits.config';
import type { Emotion } from '../../types';

// Helper function to handle image downloads
const handleDownloadImage = (base64Image: string, filename: string) => {
    if (!base64Image) return;
    const link = document.createElement('a');
    link.href = base64Image;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

interface ExpressivePortraitsStudioProps {
    pdfPortraitSrc: string | null;
    onSelectPdfPortrait: (src: string) => void;
    emotionalPortraits: Record<string, string | null>;
    generatingEmotion: string | null;
    onGenerateEmotionalPortrait: (emotion: Emotion) => void;
    characterName: string;
}

export const ExpressivePortraitsStudio: React.FC<ExpressivePortraitsStudioProps> = ({
    pdfPortraitSrc, onSelectPdfPortrait, emotionalPortraits, generatingEmotion, onGenerateEmotionalPortrait, characterName
}) => {
    const safeName = characterName.replace(/ /g, '_');
    
    return (
        <div className="mt-8 pt-6 border-t-2 border-border/50">
            <h2 className="text-2xl font-bold font-lora text-primary text-center mb-2">Expressive Portraits</h2>
            <p className="text-muted-foreground text-center mb-6">
                Click on an emotion to generate a version of your investigator expressing it. Use the selector to choose one for your PDF sheet.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {EMOTIONS_CONFIG.map(emotion => {
                    const imageSrc = emotionalPortraits[emotion.name];
                    const filename = characterName ? `${safeName}_${emotion.name.toLowerCase()}.png` : `portrait_${emotion.name.toLowerCase()}.png`;
                    return (
                        <div key={emotion.name} className="relative">
                            <button
                                onClick={() => onGenerateEmotionalPortrait(emotion)}
                                disabled={!!generatingEmotion}
                                className="aspect-square w-full bg-card rounded-lg border border-border border-b-4 border-black/20 relative overflow-hidden flex items-center justify-center text-center p-2 transition-all hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 shadow-sm"
                                aria-label={`Generate ${emotion.name} portrait`}
                            >
                                {generatingEmotion === emotion.name ? (
                                    <SpinnerIcon className="h-8 w-8 text-primary" />
                                ) : imageSrc ? (
                                    <>
                                        <img src={imageSrc} alt={`${emotion.name} portrait`} className="absolute inset-0 w-full h-full object-cover object-top" />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1">
                                            <span className="font-bold text-xs uppercase text-white tracking-wider">{emotion.name}</span>
                                        </div>
                                    </>
                                ) : (
                                    <span className="font-bold text-foreground">{emotion.name}</span>
                                )}
                            </button>
                            {imageSrc && (
                                <div className="absolute inset-0">
                                    <PortraitDisplay
                                        imageSrc={imageSrc}
                                        altText={`${emotion.name} portrait`}
                                        isLoading={false} loadingText="" errorText={null}
                                        isSelectedForPdf={pdfPortraitSrc === imageSrc}
                                        onSelectForPdf={() => onSelectPdfPortrait(imageSrc)}
                                        onDownload={() => handleDownloadImage(imageSrc, filename)}
                                        showDownload
                                        aspectRatio="aspect-square"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
