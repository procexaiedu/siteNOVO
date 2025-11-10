import React from 'react';

interface DiamondProps {
  className?: string;
}

/**
 * Diamond - Diamante geométrico decorativo
 * Dimensões: 60x60px
 * Stroke: #383838 (2px)
 * Fill: #F4EFEA
 */
export const Diamond: React.FC<DiamondProps> = ({ className = '' }) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30 5L55 30L30 55L5 30L30 5Z"
        fill="#F4EFEA"
        stroke="#383838"
        strokeWidth="2"
      />
      <line
        x1="30"
        y1="5"
        x2="30"
        y2="55"
        stroke="#383838"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="5"
        y1="30"
        x2="55"
        y2="30"
        stroke="#383838"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
};

export default Diamond;
