import React from 'react';
import { PortraitDisplay } from './PortraitDisplay';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { PortraitIcon } from '../icons/PortraitIcon';
import { CropIcon } from '../icons/CropIcon';
import { QuestionIcon } from '../icons/QuestionIcon';

interface PortraitStudioProps {
    portrait: string | null;
    headshot: string | null;
    portraitView: 'full' | 'headshot';
    setPortraitView: (view: 'full' | 'headshot') => void;
    portraitError: string | null;
    isGeneratingPortrait: boolean;
    onGeneratePortrait: () => void;
    isCroppingHeadshot: boolean;
    onCropHeadshot: () => void;
    pdfPortraitSrc: string | null;
    onSelectPdfPortrait: (src: string) => void;
    characterName: string;
    onShowPromptInfo: () => void;
}

export const PortraitStudio: React.FC<PortraitStudioProps> = ({
    portrait, headshot, portraitView, setPortraitView, portraitError, isGeneratingPortrait, onGeneratePortrait,
    isCroppingHeadshot, onCropHeadshot, pdfPortraitSrc, onSelectPdfPortrait, characterName,
    onShowPromptInfo
}) => {
    const isHeadshotView = portraitView === 'headshot' && headshot;
    
    return (
        <div className="bg-card/50 p-4 rounded-lg border border-border flex flex-col">
            <div className="flex items-center justify-center gap-2 mb-3 border-b border-border pb-2">
                <h3 className="text-lg font-bold text-primary">Generate Portrait</h3>
                <button
                    onClick={onShowPromptInfo}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    aria-label="Show portrait generation prompt"
                >
                    <QuestionIcon className="h-5 w-5" />
                </button>
            </div>

            <div className="relative">
                {portrait && (
                     <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-primary-900/80 backdrop-blur-sm p-1 rounded-full flex items-center text-xs font-bold shadow-lg">
                        <button 
                            onClick={() => setPortraitView('full')} 
                            className={`px-3 py-1 rounded-full transition-colors duration-200 ${portraitView === 'full' ? 'bg-secondary text-secondary-foreground' : 'text-primary-foreground hover:bg-primary'}`}
                        >
                            Full Body
                        </button>
                        <button 
                            onClick={() => headshot && setPortraitView('headshot')}
                            disabled={!headshot}
                            className={`px-3 py-1 rounded-full transition-colors duration-200 ${portraitView === 'headshot' ? 'bg-secondary text-secondary-foreground' : 'text-primary-foreground hover:bg-primary'} disabled:text-muted-foreground disabled:cursor-not-allowed`}
                        >
                            Headshot
                        </button>
                    </div>
                )}
                <PortraitDisplay
                    imageSrc={isHeadshotView ? headshot : portrait}
                    altText="Generated character portrait"
                    isLoading={isGeneratingPortrait || isCroppingHeadshot}
                    loadingText={isCroppingHeadshot ? 'Cropping...' : 'Acquiring Target...'}
                    errorText={portraitError}
                    isSelectedForPdf={pdfPortraitSrc === (isHeadshotView ? headshot : portrait)}
                    onSelectForPdf={() => (isHeadshotView ? headshot : portrait) && onSelectPdfPortrait((isHeadshotView ? headshot : portrait)!)}
                    onDownload={() => { /* Download handled by ExpressivePortraitsStudio */ }}
                    showDownload={false}
                    aspectRatio={isHeadshotView ? 'aspect-square' : 'aspect-[9/16]'}
                />
            </div>
            
            <div className="flex items-stretch gap-2 mt-4">
                <button 
                    onClick={onGeneratePortrait} 
                    disabled={isGeneratingPortrait || isCroppingHeadshot} 
                    className="flex-grow bg-primary hover:bg-opacity-80 disabled:bg-neutral-400 disabled:cursor-wait text-primary-foreground font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                    {isGeneratingPortrait ? <SpinnerIcon className="mr-2 h-6 w-6" /> : <PortraitIcon className="mr-2 h-6 w-6" />}
                    {isGeneratingPortrait ? 'Generating...' : (portrait ? 'Regenerate' : 'Generate Portrait')}
                </button>
                <button
                    onClick={onCropHeadshot}
                    disabled={!portrait || isGeneratingPortrait || isCroppingHeadshot}
                    className="bg-secondary hover:bg-opacity-80 disabled:bg-neutral-400 disabled:cursor-not-allowed text-secondary-foreground font-bold p-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center"
                    aria-label="Create Headshot"
                    title="Create Headshot"
                >
                    {isCroppingHeadshot ? <SpinnerIcon className="h-6 w-6" /> : <CropIcon className="h-6 w-6" />}
                </button>
            </div>
        </div>
    );
};