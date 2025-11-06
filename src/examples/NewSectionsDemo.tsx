import React from 'react';
import { Differentials, UseCases, HowItWorks } from '../components/sections';

/**
 * Demo page showcasing the 3 new landing page sections
 *
 * Sections included:
 * 1. Differentials - Por que ProceX AI
 * 2. UseCases - Casos de uso práticos
 * 3. HowItWorks - Como funciona (Timeline)
 *
 * Usage:
 * - View in browser at /demo route
 * - Each section is fully responsive
 * - Animations trigger on scroll
 * - All components follow design system
 */
const NewSectionsDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary-dark text-background py-8 text-center">
        <h1 className="font-aeonik-mono text-2xl md:text-3xl uppercase mb-2">
          ProceX AI - New Sections Demo
        </h1>
        <p className="font-inter text-sm md:text-base opacity-80">
          Differentials • Use Cases • How It Works
        </p>
      </div>

      {/* Section 1: Differentials */}
      <Differentials />

      {/* Section 2: Use Cases */}
      <UseCases />

      {/* Section 3: How It Works */}
      <HowItWorks />

      {/* Footer Note */}
      <div className="bg-primary-dark text-background py-6 text-center">
        <p className="font-inter text-sm">
          Built with React + TypeScript + Framer Motion + Tailwind CSS
        </p>
      </div>
    </div>
  );
};

export default NewSectionsDemo;
