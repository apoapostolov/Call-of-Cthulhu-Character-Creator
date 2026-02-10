import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: React.ReactNode | undefined;
  children: React.ReactNode;
}

const portalRoot = document.getElementById('tooltip-portal');

const TooltipContent: React.FC<{ content: React.ReactNode; parentRect: DOMRect | null }> = ({ content, parentRect }) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({
        position: 'fixed',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease-in-out',
        zIndex: 100,
        top: '-9999px',
        left: '-9999px',
    });
    
    useEffect(() => {
        if (parentRect && tooltipRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            let top = parentRect.top - tooltipRect.height - 8;
            if (top < 0) { // prevent tooltip from going off-screen top
                top = parentRect.bottom + 8;
            }
            
            let left = parentRect.left + (parentRect.width / 2);
             // prevent tooltip from going off-screen left/right
            if (left - (tooltipRect.width / 2) < 0) {
                left = tooltipRect.width / 2;
            } else if (left + (tooltipRect.width / 2) > window.innerWidth) {
                left = window.innerWidth - (tooltipRect.width / 2);
            }
            
            setStyle({
                position: 'fixed',
                opacity: 1,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease-in-out',
                zIndex: 100,
                top: `${top}px`,
                left: `${left}px`,
                transform: `translateX(-50%) translateZ(0)`,
            });
        }
    }, [parentRect]);

    if (!portalRoot || !parentRect) return null;

    return createPortal(
        <div
            ref={tooltipRef}
            style={style}
            className="w-64 p-3 text-sm text-primary-foreground bg-primary border border-secondary rounded-lg shadow-xl"
            role="tooltip"
        >
            {content}
            <div 
                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-primary"
            />
        </div>,
        portalRoot
    );
};

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [parentRect, setParentRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  if (!content) {
    return <>{children}</>;
  }
  
  return (
    <>
      <div 
        ref={triggerRef} 
        onMouseEnter={() => triggerRef.current && setParentRect(triggerRef.current.getBoundingClientRect())} 
        onMouseLeave={() => setParentRect(null)}
        className=""
      >
        {children}
      </div>
      {parentRect && <TooltipContent content={content} parentRect={parentRect} />}
    </>
  );
};