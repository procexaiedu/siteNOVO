import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, CheckCircle2, Star } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Decorative SVG Components
 */
const CloudDecoration: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="120"
    height="60"
    viewBox="0 0 120 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 40C20 33.37 25.37 28 32 28C32.71 28 33.39 28.07 34.06 28.18C36.61 21.62 42.9 17 50.5 17C60.16 17 68 24.84 68 34.5C68 35.06 67.97 35.61 67.91 36.16C73.08 37.45 77 42.02 77 47.5C77 53.85 71.85 59 65.5 59H23C14.16 59 7 51.84 7 43C7 35.28 12.35 28.85 19.5 27.32C19.82 27.26 20.15 27.21 20.48 27.18C20.16 28.05 20 29 20 30V40Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const DiamondDecoration: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M40 10L65 40L40 70L15 40L40 10Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M40 25L55 40L40 55L25 40L40 25Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

/**
 * Benefit Item Component
 */
interface BenefitItemProps {
  icon: React.ReactNode;
  text: string;
  index: number;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex items-center gap-3"
  >
    <div className="flex-shrink-0 text-accent-teal">{icon}</div>
    <span className="font-inter text-base md:text-lg text-white font-light">
      {text}
    </span>
  </motion.div>
);

/**
 * CTAFinal Section Component
 *
 * CTA final com background destacado:
 * - Background: gradient azul/teal para destaque visual
 * - Título: "Pronto Para Multiplicar Sua Produtividade?"
 * - Subtítulo: "Diagnóstico gratuito de 30min. Sem compromisso."
 * - 3 benefícios com ícones
 * - CTAs: Primário (Diagnóstico) + Secundário (WhatsApp)
 * - Badge de avaliação social proof
 * - Elementos decorativos SVG (clouds, diamonds)
 *
 * @example
 * <CTAFinal />
 *
 * Accessibility:
 * - Semantic HTML (section, headings hierarchy)
 * - ARIA labels em links externos
 * - Focus visible indicators
 * - Decorative elements hidden from screen readers
 */
export const CTAFinal: React.FC = () => {
  const handleCTAClick = () => {
    // Track conversion event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-XXXXX/XXXXX',
        event_category: 'CTA',
        event_label: 'Final CTA - Diagnóstico Gratuito',
      });
    }
  };

  return (
    <section
      id="cta-final"
      aria-labelledby="cta-final-heading"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[#16AA98] via-[#1a8f82] to-[#127a6f]"
    >
      {/* Decorative Elements */}
      <CloudDecoration className="absolute top-10 left-10 text-white/10 hidden lg:block" />
      <CloudDecoration className="absolute bottom-10 right-10 text-white/10 hidden lg:block rotate-180" />
      <DiamondDecoration className="absolute top-1/2 left-5 text-white/10 hidden md:block -translate-y-1/2" />
      <DiamondDecoration className="absolute top-1/2 right-5 text-white/10 hidden md:block -translate-y-1/2" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg, #fff 2px, transparent 2px)',
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        {/* Main Content */}
        <div className="text-center mb-12 md:mb-16">
          {/* Main Heading */}
          <motion.h2
            id="cta-final-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-aeonik-mono text-3xl md:text-5xl lg:text-6xl uppercase text-white mb-6 leading-tight"
          >
            Pronto Para Multiplicar
            <br />
            Sua Produtividade?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-inter text-xl md:text-2xl text-white/90 font-light mb-12"
          >
            Diagnóstico gratuito de 30min. Sem compromisso.
          </motion.p>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12 space-y-4"
          >
            <BenefitItem
              icon={<CheckCircle2 className="w-6 h-6" />}
              text="Diagnóstico gratuito (30min)"
              index={0}
            />
            <BenefitItem
              icon={<CheckCircle2 className="w-6 h-6" />}
              text="Proposta em 48h"
              index={1}
            />
            <BenefitItem
              icon={<CheckCircle2 className="w-6 h-6" />}
              text="Implementação em 14d ou 1º mês grátis"
              index={2}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            {/* Primary CTA */}
            <Button
              size="lg"
              onClick={handleCTAClick}
              className="bg-white text-primary-dark border-white hover:bg-neutral-beige hover:border-neutral-beige group w-full sm:w-auto"
            >
              DIAGNÓSTICO GRATUITO
              <ArrowRight
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Button>

            {/* Secondary CTA - WhatsApp */}
            <Button
              variant="secondary"
              size="lg"
              href="https://wa.me/5511999999999?text=Olá! Vim do site e gostaria de saber mais sobre agentes de IA."
              className="bg-transparent text-white border-white hover:bg-white/10 group w-full sm:w-auto"
            >
              <MessageSquare
                className="mr-2 w-5 h-5"
                aria-hidden="true"
              />
              Falar WhatsApp
            </Button>
          </motion.div>

          {/* Social Proof Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full px-6 py-3"
          >
            <div className="flex items-center gap-1" aria-label="5 estrelas">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                    className="w-4 h-4 fill-cta-blue text-cta-blue"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="font-aeonik-mono text-sm text-white">
              4.8/5 em 50+ projetos
            </span>
          </motion.div>
        </div>

        {/* Bottom Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="font-inter text-sm text-white/70 max-w-md mx-auto">
            Não cobramos o diagnóstico. Não pedimos cartão de crédito. Apenas
            30 minutos para descobrir como IA pode transformar seu negócio.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAFinal;
