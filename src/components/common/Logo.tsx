import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Logo - ProceX AI Logo
 * Design minimalista inspirado em formigas e eficiência
 * Cores: #16AA98 (accent teal) e #383838 (dark)
 *
 * Conceito: Formiga estilizada com processo/workflow representado
 * por linhas conectadas, simbolizando automação e IA
 */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ProceX AI Logo"
    >
      {/* Corpo da formiga (abstrato) */}
      <ellipse
        cx="20"
        cy="22"
        rx="8"
        ry="10"
        fill="#16AA98"
      />

      {/* Cabeça */}
      <circle
        cx="20"
        cy="10"
        r="6"
        fill="#16AA98"
      />

      {/* Antenas */}
      <path
        d="M17 7L14 2M23 7L26 2"
        stroke="#383838"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pernas (linhas conectadas - representando processo) */}
      <path
        d="M12 20L6 16M12 25L6 28M28 20L34 16M28 25L34 28"
        stroke="#383838"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Detalhe central - símbolo de IA (neural network node) */}
      <circle
        cx="20"
        cy="22"
        r="3"
        fill="#383838"
      />

      {/* Conexões neurais (pequenas) */}
      <circle cx="20" cy="17" r="1.5" fill="#383838" opacity="0.6" />
      <circle cx="16" cy="22" r="1.5" fill="#383838" opacity="0.6" />
      <circle cx="24" cy="22" r="1.5" fill="#383838" opacity="0.6" />

      {/* Linhas conectando os pontos */}
      <path
        d="M20 19L20 17M18.5 21L16 22M21.5 21L24 22"
        stroke="#383838"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Abdomen final */}
      <ellipse
        cx="20"
        cy="33"
        rx="5"
        ry="4"
        fill="#16AA98"
        opacity="0.8"
      />
    </svg>
  );
};

export default Logo;
