import React from 'react';

interface CloudLargeProps {
  className?: string;
}

/**
 * CloudLarge - Nuvem grande decorativa
 * Dimensões: 150x110px
 * Stroke: #383838 (2px)
 * Fill: none (outline apenas)
 */
export const CloudLarge: React.FC<CloudLargeProps> = ({ className = '' }) => {
  return (
    <svg
      width="150"
      height="110"
      viewBox="0 0 150 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30 60C30 50 38 42 48 42C52 32 62 25 74 25C88 25 100 35 102 48C112 48 120 56 120 66C120 76 112 84 102 84H48C38 84 30 76 30 66V60Z"
        stroke="#383838"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default CloudLarge;
