import * as React from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 100"
    {...props}
  >
    {/* Main Triangle Symbol */}
    <g transform="translate(50, 50) scale(0.855)">
      <path 
        d="M 0 -40 L 46.18 32.5 L -46.18 32.5 Z" 
        stroke="#4ade80" 
        strokeWidth="3.5" 
        fill="rgba(45, 55, 72, 0.3)" 
      />
      {/* Inner Triangle with glitch effect */}
      <path 
        d="M 0 -30 L 34.64 24.37 L -34.64 24.37 Z" 
        stroke="#a0aec0" 
        strokeWidth="1" 
        fill="none"
        strokeDasharray="4 2"
        transform="translate(2, -1)"
        opacity="0.5"
      />
       <path 
        d="M 0 -30 L 34.64 24.37 L -34.64 24.37 Z" 
        stroke="#a0aec0" 
        strokeWidth="1" 
        fill="none"
        strokeDasharray="4 2"
        transform="translate(-1, 2)"
        opacity="0.3"
      />
    </g>
    
    {/* Text part */}
    <g transform="translate(120, 35)">
      <text 
          x="0" 
          y="0" 
          fill="#e2e8f0" 
          fontFamily="'Orbitron', sans-serif"
          fontSize="40"
          letterSpacing="3"
          fontWeight="700"
      >
          DELTA GREEN
      </text>
      <text 
          x="0" 
          y="30" 
          fill="#4ade80" 
          fontFamily="'Share Tech Mono', monospace"
          fontSize="16"
          letterSpacing="1.5"
          opacity="0.9"
      >
          A.I. AGENT DOSSIER GENERATOR
      </text>
    </g>

    {/* Decorative line */}
    <line x1="120" y1="75" x2="480" y2="75" stroke="#4a5568" strokeWidth="1" />
  </svg>
);

export default Logo;