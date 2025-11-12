import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Palette,
  Code,
  CheckCircle,
  Rocket,
  ArrowRight,
  Clock,
  Shield,
  ChevronDown
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * HowItWorks / Como Funciona Section
 *
 * Timeline showing 5-step implementation process:
 * 1. Diagnóstico (30min FREE)
 * 2. Desenho do Agente (3-5 days)
 * 3. Desenvolvimento (5-7 days)
 * 4. Testes e Ajustes (2-3 days)
 * 5. Go Live (Continuous)
 *
 * Highlights:
 * - Total implementation: 14 days
 * - Money-back guarantee: 1st month free if not delivered in 14 days
 * - Professional icons (48px, stroke-2)
 * - Mobile optimization: Accordion interface reduces scroll by ~2,000px
 * - Desktop: 5-column horizontal timeline
 * - Mobile: Accordion with expandable steps
 *
 * @example
 * <HowItWorks />
 */

interface Step {
  number: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  duration: string;
  durationHighlight?: string;
  description: string;
  deliverables: string[];
}

const steps: Step[] = [
  {
    number: 1,
    icon: Search,
    title: 'DIAGNÓSTICO',
    subtitle: 'Entendemos seu negócio',
    duration: '30 minutos',
    durationHighlight: 'GRÁTIS',
    description: 'Conversa estratégica para mapear processos, dores e oportunidades de IA no seu negócio.',
    deliverables: ['Mapeamento de processos', 'Identificação de oportunidades', 'Proposta inicial'],
  },
  {
    number: 2,
    icon: Palette,
    title: 'DESENHO DO AGENTE',
    subtitle: 'Planejamos a solução',
    duration: '3-5 dias',
    description: 'Desenhamos a arquitetura do agente com fluxos, integrações e personalidade da marca.',
    deliverables: ['Arquitetura detalhada', 'Fluxos conversacionais', 'Integrações planejadas'],
  },
  {
    number: 3,
    icon: Code,
    title: 'DESENVOLVIMENTO',
    subtitle: 'Construímos com IA',
    duration: '5-7 dias',
    description: 'Desenvolvimento do agente com treino em dados reais e configuração de integrações.',
    deliverables: ['Agente funcional', 'Integrações ativas', 'Treino customizado'],
  },
  {
    number: 4,
    icon: CheckCircle,
    title: 'TESTES E AJUSTES',
    subtitle: 'Refinamos tudo',
    duration: '2-3 dias',
    description: 'Testes em ambiente controlado, ajustes finos e validação com sua equipe.',
    deliverables: ['Testes funcionais', 'Ajustes finos', 'Validação completa'],
  },
  {
    number: 5,
    icon: Rocket,
    title: 'GO LIVE',
    subtitle: 'Lançamos e evoluímos',
    duration: 'Contínuo',
    description: 'Lançamento gradual com monitoramento ativo e evolução baseada em dados reais.',
    deliverables: ['Deploy gradual', 'Monitoramento 24/7', 'Otimização contínua'],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: {
    opacity: 0,
    x: -30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const connectorVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

export const HowItWorks: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleStep = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <section
      className="relative bg-gradient-to-b from-background to-secondary-blue/5 py-[90px] md:py-[110px] lg:py-[180px]"
      aria-labelledby="howitworks-heading"
    >
      <Container size="xl" padding="default">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2
            id="howitworks-heading"
            className="font-aeonik-mono text-3xl md:text-4xl lg:text-[48px] uppercase text-primary-dark leading-tight mb-4"
          >
            Do Diagnóstico ao Go-Live: <br className="hidden md:block" />
            5 Passos em 14 Dias
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-inter text-base md:text-lg text-primary-dark/80 max-w-3xl mx-auto"
          >
            Processo transparente, rápido e sem fricção. Você acompanha cada etapa.
          </motion.p>
        </motion.div>

        {/* Mobile Accordion - Hidden on md and up */}
        <div className="lg:hidden mb-8 space-y-3">
          {steps.map((step) => (
            <div key={step.number} className="border-2 border-primary-dark rounded-[4px] overflow-hidden">
              {/* Accordion Header */}
              <motion.button
                onClick={() => toggleStep(step.number)}
                className="w-full flex items-center justify-between p-4 hover:bg-background/50 transition-colors"
                aria-expanded={expandedStep === step.number}
                aria-controls={`step-content-${step.number}`}
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-8 h-8 flex items-center justify-center bg-primary-dark text-background rounded-full flex-shrink-0">
                    <span className="font-aeonik-mono text-sm font-semibold">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-aeonik-mono text-sm uppercase text-primary-dark leading-tight">
                      {step.title}
                    </h3>
                    <p className="font-inter text-xs text-primary-dark/60 mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedStep === step.number ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-primary-dark" strokeWidth={2} />
                </motion.div>
              </motion.button>

              {/* Accordion Content */}
              <AnimatePresence>
                {expandedStep === step.number && (
                  <motion.div
                    id={`step-content-${step.number}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                    className="border-t-2 border-primary-dark bg-background/30 px-4 py-4"
                  >
                    {/* Duration */}
                    <div className="flex items-center gap-2 py-2 px-3 bg-white rounded-[2px] border border-primary-dark/20 mb-4">
                      <Clock className="w-4 h-4 text-accent-teal" aria-hidden="true" />
                      <span className="font-aeonik-mono text-xs uppercase text-primary-dark">
                        {step.duration}
                      </span>
                      {step.durationHighlight && (
                        <span className="ml-auto font-aeonik-mono text-xs font-semibold uppercase text-accent-teal">
                          {step.durationHighlight}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="font-inter text-sm text-primary-dark/80 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Deliverables */}
                    <div>
                      <p className="font-aeonik-mono text-xs uppercase text-primary-dark/60 mb-2">
                        Entregas:
                      </p>
                      <ul className="space-y-1" role="list">
                        {step.deliverables.map((deliverable, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 font-inter text-xs text-primary-dark/70"
                          >
                            <span className="text-accent-teal flex-shrink-0">✓</span>
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Timeline - Desktop Horizontal / Tablet Vertical */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="hidden lg:block relative"
        >
          {/* Steps Grid */}
          <div className="grid grid-cols-5 gap-4 relative">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                {/* Step Card */}
                <motion.div
                  variants={stepVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  className="relative"
                >
                  <Card
                    variant="elevated"
                    padding="lg"
                    className="h-full bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
                  >
                    <CardContent className="flex flex-col gap-4">
                      {/* Step Number Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.1 + index * 0.1,
                            type: 'spring',
                            stiffness: 200,
                          }}
                          className="w-10 h-10 flex items-center justify-center bg-primary-dark text-background rounded-full border-2 border-primary-dark"
                        >
                          <span className="font-aeonik-mono text-lg font-semibold">
                            {step.number}
                          </span>
                        </motion.div>

                        {/* Icon */}
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.2 + index * 0.1,
                            type: 'spring',
                            stiffness: 180,
                          }}
                          className="w-12 h-12 flex items-center justify-center bg-secondary-blue/10 rounded-[4px] border-2 border-primary-dark"
                        >
                          <step.icon
                            className="w-6 h-6 text-primary-dark"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </motion.div>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="font-aeonik-mono text-base md:text-lg uppercase text-primary-dark leading-tight mb-1">
                          {step.title}
                        </h3>
                        <p className="font-inter text-xs md:text-sm text-primary-dark/60">
                          {step.subtitle}
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2 py-2 px-3 bg-background rounded-[2px] border border-primary-dark/20">
                        <Clock className="w-4 h-4 text-accent-teal" aria-hidden="true" />
                        <span className="font-aeonik-mono text-xs uppercase text-primary-dark">
                          {step.duration}
                        </span>
                        {step.durationHighlight && (
                          <span className="ml-auto font-aeonik-mono text-xs font-semibold uppercase text-accent-teal">
                            {step.durationHighlight}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="font-inter text-sm text-primary-dark/80 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Deliverables */}
                      <div className="pt-3 border-t border-primary-dark/10">
                        <p className="font-aeonik-mono text-xs uppercase text-primary-dark/60 mb-2">
                          Entregas:
                        </p>
                        <ul className="space-y-1" role="list">
                          {step.deliverables.map((deliverable, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 font-inter text-xs text-primary-dark/70"
                            >
                              <span className="text-accent-teal mt-0.5" aria-hidden="true">✓</span>
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Connector Arrow - Desktop only */}
                {index < steps.length - 1 && (
                  <motion.div
                    variants={connectorVariants}
                    className="hidden lg:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-[calc(100%+0.5rem)] w-4 z-10"
                    style={{ left: `calc(${(index + 1) * 20}% - 0.5rem)` }}
                  >
                    <ArrowRight
                      className="w-6 h-6 text-primary-dark/30"
                      aria-hidden="true"
                    />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Guarantee Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <Card
            variant="elevated"
            padding="lg"
            className="bg-gradient-to-r from-accent-teal/5 to-secondary-blue/5 border-accent-teal"
          >
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <Shield className="w-10 h-10 md:w-12 md:h-12 text-accent-teal flex-shrink-0" strokeWidth={2} />
                <div>
                  <h3 className="font-aeonik-mono text-lg md:text-xl uppercase text-primary-dark mb-2">
                    ⚡ GARANTIA DE ENTREGA
                  </h3>
                  <p className="font-inter text-sm md:text-base text-primary-dark/80">
                    Não entregar em 14 dias = <strong className="text-accent-teal">1º mês grátis</strong>.
                    Simples assim. Sua confiança é nossa prioridade.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="flex-shrink-0 bg-accent-teal border-accent-teal hover:bg-accent-teal/90"
              >
                COMEÇAR MEU DIAGNÓSTICO GRATUITO
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="py-4">
            <p className="font-aeonik-mono text-3xl md:text-4xl text-accent-teal font-semibold mb-2">
              14 dias
            </p>
            <p className="font-inter text-sm md:text-base text-primary-dark/70">
              Do diagnóstico ao go-live
            </p>
          </div>
          <div className="py-4">
            <p className="font-aeonik-mono text-3xl md:text-4xl text-accent-teal font-semibold mb-2">
              100%
            </p>
            <p className="font-inter text-sm md:text-base text-primary-dark/70">
              Transparência e acompanhamento
            </p>
          </div>
          <div className="py-4">
            <p className="font-aeonik-mono text-3xl md:text-4xl text-accent-teal font-semibold mb-2">
              Zero
            </p>
            <p className="font-inter text-sm md:text-base text-primary-dark/70">
              Surpresas ou custos ocultos
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HowItWorks;
