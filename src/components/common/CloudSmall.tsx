import React from 'react';

interface CloudSmallProps {
  className?: string;
}

/**
 * CloudSmall - Nuvem pequena decorativa
 * Dimensões: 80x60px
 * Stroke: #383838 (2px)
 * Fill: none (outline apenas)
 */
export const CloudSmall: React.FC<CloudSmallProps> = ({ className = '' }) => {
  return (
    <svg
      width="80"
      height="60"
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 30C20 25 23 20 28 20C30 15 35 12 40 12C46 12 51 16 52 21C57 21 61 25 61 30C61 35 57 39 52 39H28C23 39 20 35 20 30Z"
        stroke="#383838"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default CloudSmall;
