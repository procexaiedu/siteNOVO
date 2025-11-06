import React from 'react';

interface Cube3DProps {
  className?: string;
}

/**
 * Cube3D - Cubo 3D isométrico decorativo
 * Dimensões: 100x100px
 * Faces com cores diferenciadas para efeito 3D
 * - Top face: #5ec9ba (mais claro)
 * - Right face: #2d9a9a (mais escuro - sombra)
 * - Left face: #16AA98 (médio)
 * - Front face: #3db5b5 (médio claro)
 */
export const Cube3D: React.FC<Cube3DProps> = ({ className = '' }) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Hexagonal isometric cube */}

      {/* Base/Bottom layer */}
      <path
        d="M50 10L90 35V65L50 90L10 65V35L50 10Z"
        fill="#3db5b5"
      />

      {/* Right face - darkest (shadow) */}
      <path
        d="M50 10V50L90 65V35L50 10Z"
        fill="#2d9a9a"
      />

      {/* Left face - accent teal */}
      <path
        d="M50 50L10 65L50 90V50Z"
        fill="#16AA98"
      />

      {/* Top face - lightest (highlight) */}
      <path
        d="M50 10L90 35L50 50L10 35L50 10Z"
        fill="#5ec9ba"
      />
    </svg>
  );
};

export default Cube3D;
