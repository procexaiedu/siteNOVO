import React from 'react';
import { Testimonials, Personas, Integrations, Metrics } from '../components/sections';

/**
 * Sections Showcase Page
 *
 * Demonstrates the 4 new landing page sections created following LANDING_PAGE_BLUEPRINT.md
 *
 * Usage:
 * Import this component in your App.tsx or router to preview the sections:
 *
 * ```tsx
 * import { SectionsShowcase } from './examples/SectionsShowcase';
 *
 * function App() {
 *   return <SectionsShowcase />;
 * }
 * ```
 */
export const SectionsShowcase: React.FC = () => {
  return (
    <div className="bg-neutral-beige min-h-screen">
      {/* Section 7: Testimonials */}
      <Testimonials />

      {/* Section 8: Personas */}
      <Personas />

      {/* Section 9: Integrations */}
      <Integrations
        onCtaClick={() => {
          console.log('CTA clicked - Integrations');
          // Handle WhatsApp or contact form
        }}
      />

      {/* Section 10: Metrics */}
      <Metrics animationDuration={2.5} />
    </div>
  );
};

export default SectionsShowcase;
