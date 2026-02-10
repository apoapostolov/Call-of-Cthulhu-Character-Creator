import React from 'react';

export const AIIcon: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => (
  <i className={`fa-solid fa-microchip ${className || ''}`} {...props}></i>
);

