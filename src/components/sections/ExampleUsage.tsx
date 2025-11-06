/**
 * Example Usage - Landing Page Complete
 *
 * Exemplo completo mostrando como usar todas as seções da landing page
 * incluindo FAQ, CTAFinal e Footer
 */

import React from 'react';
import { FAQ, CTAFinal, Footer } from './index';
import { Hero } from './Hero';
import { SocialProof } from './SocialProof';
import { ProblemSolution } from './ProblemSolution';
import { Differentials } from './Differentials';
import { UseCases } from './UseCases';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';
import { Personas } from './Personas';
import { Integrations } from './Integrations';

/**
 * Landing Page Complete Component
 *
 * Ordem das seções conforme LANDING_PAGE_BLUEPRINT.md:
 *
 * 1. Hero - Proposta de valor em 3 segundos
 * 2. Social Proof Strip - Credibilidade imediata
 * 3. Problem → Solution - Empatia + posicionamento
 * 4. Diferenciais - Por que ProceX AI
 * 5. Casos de Uso - Aplicação prática
 * 6. Como Funciona - Timeline de 14 dias
 * 7. Depoimentos - Prova social
 * 8. Personas - Para quem é
 * 9. Integrações - Compatibilidade
 * 10. FAQ - Últimas objeções ✅ NOVO
 * 11. CTA Final - Máxima conversão ✅ NOVO
 * 12. Footer - Navegação + legal ✅ NOVO
 *
 * @example
 * // App.tsx
 * import { LandingPageComplete } from './components/sections/ExampleUsage';
 *
 * function App() {
 *   return <LandingPageComplete />;
 * }
 */
export const LandingPageComplete: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-cream">
      {/* Hero Section */}
      <Hero />

      {/* Social Proof Strip */}
      <SocialProof />

      {/* Problem → Solution */}
      <ProblemSolution />

      {/* Diferenciais */}
      <Differentials />

      {/* Casos de Uso Práticos */}
      <UseCases />

      {/* Como Funciona - Timeline */}
      <HowItWorks />

      {/* Depoimentos / Prova Social */}
      <Testimonials />

      {/* Personas / Para Quem É */}
      <Personas />

      {/* Integrações */}
      <Integrations />

      {/* FAQ - Perguntas Frequentes ✅ NOVO */}
      <FAQ />

      {/* CTA Final - Background Destaque ✅ NOVO */}
      <CTAFinal />

      {/* Footer - Completo com 5 Colunas ✅ NOVO */}
      <Footer />
    </div>
  );
};

/**
 * Example: Using Individual Sections
 *
 * Se preferir usar seções individualmente:
 */
export const FAQExample: React.FC = () => {
  return (
    <div>
      <FAQ />
    </div>
  );
};

export const CTAExample: React.FC = () => {
  return (
    <div>
      <CTAFinal />
    </div>
  );
};

export const FooterExample: React.FC = () => {
  return (
    <div>
      <Footer />
    </div>
  );
};

/**
 * Example: Custom Layout
 *
 * Exemplo com layout customizado
 */
export const CustomLayoutExample: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero customizado */}
      <Hero />

      {/* FAQ mais cedo no fluxo */}
      <FAQ />

      {/* Outros conteúdos */}
      <UseCases />
      <Testimonials />

      {/* CTA Final */}
      <CTAFinal />

      {/* Footer sempre por último */}
      <Footer />
    </div>
  );
};

export default LandingPageComplete;
