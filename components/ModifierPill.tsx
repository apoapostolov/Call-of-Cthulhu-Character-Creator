import React from 'react';
import { Tooltip } from './Tooltip';

interface ModifierPillProps {
  value: number;
  source?: string;
  type: 'experience' | 'lifeevent';
}

export const ModifierPill: React.FC<ModifierPillProps> = ({ value, source, type }) => {
  const isLifeEvent = type === 'lifeevent';
  const color = isLifeEvent ? '#355e3b' : undefined;
  
  const pill = (
    <span 
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold border shadow-sm ${
        isLifeEvent 
          ? '' 
          : 'border-secondary bg-secondary text-secondary-foreground'
      }`}
      style={isLifeEvent ? {
        backgroundColor: color,
        borderColor: color,
        color: '#f0f0f0'
      } : undefined}
    >
      {value > 0 ? '+' : ''}{value}
    </span>
  );

  if (source) {
    return (
      <Tooltip content={<div className="text-xs font-semibold">{source}</div>}>
        {pill}
      </Tooltip>
    );
  }

  return pill;
};
