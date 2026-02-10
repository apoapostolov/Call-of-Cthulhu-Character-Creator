import React from 'react';

interface BackstoryDisplayProps {
  text: string;
}

const parseBold = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-primary">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

export const BackstoryDisplay: React.FC<BackstoryDisplayProps> = ({ text }) => {
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim() !== '');

  return (
    <div className="bg-cream-100 p-6 rounded-lg border border-border max-h-[60vh] overflow-y-auto text-foreground/90 leading-relaxed space-y-4">
      {paragraphs.map((p, index) => (
        <p key={index}>{parseBold(p)}</p>
      ))}
    </div>
  );
};
