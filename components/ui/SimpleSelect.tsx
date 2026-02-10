import React, { useEffect, useRef, useState } from 'react';

interface SimpleSelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const SimpleSelect: React.FC<SimpleSelectProps> = ({ options, value, onChange, placeholder = 'Select…', className = '' }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const selectedLabel = value || placeholder;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full bg-card border border-border rounded-md p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary hover:border-primary flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`truncate ${value ? '' : 'text-muted-foreground'}`}>{selectedLabel}</span>
        <i className="fa-solid fa-chevron-down ml-2 text-muted-foreground"></i>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-card border border-border rounded-md shadow-lg max-h-64 overflow-auto" role="listbox">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              role="option"
              aria-selected={value === opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${value === opt ? 'bg-cream-100 text-foreground' : 'hover:bg-cream-100'} ${value === opt ? 'font-bold' : ''}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
