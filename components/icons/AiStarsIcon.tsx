import React from 'react';

export const AiStarsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
    <path d="M19 13l.9 2.7L22 16.5l-2.1.8L19 20l-.9-2.7-2.1-.8 2.1-.8L19 13z" />
    <path d="M5 13l.9 2.7L8 16.5l-2.1.8L5 20l-.9-2.7-2.1-.8 2.1-.8L5 13z" />
  </svg>
);
