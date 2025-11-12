import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BarChart, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

/**
 * Persona data interface
 */
interface Persona {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconBgColor: string;
  challenge: string;
  solution: string;
  caseExample: string;
  ctaText: string;
  ctaAction?: () => void;
}

/**
 * Personas Section Props
 */
export interface PersonasProps {
  /** Optional custom title */
  title?: string;
  /** Optional custom subtitle */
  subtitle?: string;
  /** Optional custom personas data */
  personas?: Persona[];
  /** Optional custom class name */
  className?: string;
}

/**
 * Default personas data following LANDING_PAGE_BLUEPRINT.md
 */
const defaultPersonas: Persona[] = [
  {
    id: '1',
    title: 'CEOs e Empreendedores',
    icon: <Briefcase className="w-8 h-8" aria-hidden="true" />,
    iconBgColor: 'bg-cta-blue',
    challenge: 'Crescer sem aumentar custo fixo de equipe',
    solution:
      'Agentes de IA atuam como colaboradores que escalam conforme demanda. Pague apenas pelo que usar.',
    caseExample:
      'E-commerce aumentou 45% vendas sem contratar 1 vendedor adicional',
    ctaText: 'Crescer Agora',
  },
  {
    id: '2',
    title: 'Gestores de Operações',
    icon: <BarChart className="w-8 h-8" aria-hidden="true" />,
    iconBgColor: 'bg-accent-teal',
    challenge: 'Padronizar processos e eliminar gargalos operacionais',
    solution:
      'Agentes executam fluxos de trabalho consistentemente, 24/7, sem variação de qualidade ou atrasos humanos.',
    caseExample:
      'Distribuidora reduziu 60% erros em processos de estoque e expedição',
    ctaText: 'Otimizar Processos',
  },
  {
    id: '3',
    title: 'Diretores Comerciais',
    icon: <TrendingUp className="w-8 h-8" aria-hidden="true" />,
    iconBgColor: 'bg-secondary-blue',
    challenge: 'Aumentar conversão e qualificar leads de forma escalável',
    solution:
      'Agentes qualificam leads, fazem follow-up imediato e nutrem prospects até o momento certo de venda.',
    caseExample:
      'SaaS B2B aumentou 38% taxa de conversão com qualificação automática',
    ctaText: 'Vender Mais',
  },
];

/**
 * Personas Section Component
 *
 * Section 8 from LANDING_PAGE_BLUEPRINT.md - "Criado Para Quem Faz a Empresa Acontecer"
 *
 * Features:
 * - 3 persona cards with distinct icons and colors
 * - Challenge → Solution → Real Case structure
 * - Specific CTAs for each persona
 * - Framer Motion animations
 * - Mobile-first responsive grid (1 col mobile, 3 col desktop)
 *
 * Usage:
 * ```tsx
 * <Personas />
 * ```
 *
 * @example
 * // With custom title
 * <Personas title="Para Quem É a ProceX AI?" />
 *
 * @example
 * // With custom personas and CTA handlers
 * <Personas
 *   personas={customPersonas}
 * />
 */
export const Personas: React.FC<PersonasProps> = ({
  title = 'Criado Para Quem Faz a Empresa Acontecer',
  subtitle = 'Soluções personalizadas para diferentes desafios do seu negócio',
  personas = defaultPersonas,
  className = '',
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="personas"
      className={`py-xxl bg-white ${className}`}
      aria-labelledby="personas-title"
    >
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="personas-title"
            className="font-aeonik-mono text-4xl md:text-5xl lg:text-6xl uppercase text-primary-dark mb-4 tracking-tight"
          >
            {title}
          </h2>
          <p className="font-inter text-lg text-primary-dark/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Personas Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {personas.map((persona) => (
            <motion.div key={persona.id} variants={cardVariants}>
              <Card
                variant="default"
                padding="lg"
                className="h-full flex flex-col hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="flex flex-col h-full space-y-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${persona.iconBgColor} border-2 border-primary-dark rounded-[4px] flex items-center justify-center text-primary-dark group-hover:scale-110 transition-transform duration-300`}
                    aria-hidden="true"
                  >
                    {persona.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-aeonik-mono text-xl md:text-2xl uppercase text-primary-dark leading-tight">
                    {persona.title}
                  </h3>

                  {/* Challenge */}
                  <div className="space-y-2">
                    <div className="font-aeonik-mono text-xs uppercase tracking-wide text-primary-dark/60">
                      Desafio
                    </div>
                    <p className="font-inter text-base text-primary-dark font-medium leading-relaxed">
                      {persona.challenge}
                    </p>
                  </div>

                  {/* Divider */}
                  <div
                    className="w-full h-[2px] bg-primary-dark/10"
                    aria-hidden="true"
                  />

                  {/* Solution */}
                  <div className="space-y-2 flex-1">
                    <div className="font-aeonik-mono text-xs uppercase tracking-wide text-accent-teal">
                      Solução ProceX AI
                    </div>
                    <p className="font-inter text-sm text-primary-dark/80 leading-relaxed">
                      {persona.solution}
                    </p>
                  </div>

                  {/* Case Example Badge */}
                  <div className="bg-neutral-beige border-2 border-primary-dark/10 rounded-[4px] p-4">
                    <div className="flex items-start gap-2">
                      <TrendingUp
                        className="w-4 h-4 text-accent-teal flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="font-inter text-sm text-primary-dark/90 leading-snug">
                        <strong className="text-accent-teal">Caso real:</strong>{' '}
                        {persona.caseExample}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="primary"
                    className="w-full group/btn"
                    onClick={persona.ctaAction}
                    aria-label={`${persona.ctaText} - ${persona.title}`}
                  >
                    {persona.ctaText}
                    <ArrowRight
                      className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="font-inter text-primary-dark/70 text-sm max-w-2xl mx-auto">
            Não importa o seu cargo, se você busca{' '}
            <strong className="text-primary-dark">
              resultados mensuráveis sem complexidade
            </strong>
            , a ProceX AI foi feita para você.
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default Personas;
