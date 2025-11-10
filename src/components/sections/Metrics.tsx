import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Clock, Building2, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Container } from '../ui/Container';

/**
 * Metric data interface
 */
interface Metric {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

/**
 * Metrics Section Props
 */
export interface MetricsProps {
  /** Optional custom title */
  title?: string;
  /** Optional custom subtitle */
  subtitle?: string;
  /** Optional custom metrics data */
  metrics?: Metric[];
  /** Optional custom class name */
  className?: string;
  /** Animation duration in seconds */
  animationDuration?: number;
}

/**
 * Default metrics data following LANDING_PAGE_BLUEPRINT.md
 */
const defaultMetrics: Metric[] = [
  {
    id: '1',
    value: 320,
    suffix: '%',
    prefix: '',
    label: 'ROI no 1º Ano',
    description: 'Retorno sobre investimento comprovado',
    icon: <TrendingUp className="w-8 h-8" aria-hidden="true" />,
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    id: '2',
    value: 14,
    suffix: ' dias',
    prefix: '',
    label: 'Implementação',
    description: 'Do diagnóstico ao go-live garantido',
    icon: <Clock className="w-8 h-8" aria-hidden="true" />,
    iconBgColor: 'bg-button-blue/20',
    iconColor: 'text-button-blue',
  },
  {
    id: '3',
    value: 50,
    suffix: '+',
    prefix: '',
    label: 'Empresas Transformadas',
    description: 'PMEs crescendo com IA',
    icon: <Building2 className="w-8 h-8" aria-hidden="true" />,
    iconBgColor: 'bg-accent-teal/20',
    iconColor: 'text-accent-teal',
  },
  {
    id: '4',
    value: 4.8,
    suffix: '/5',
    prefix: '',
    label: 'Satisfação',
    description: 'Avaliação média dos clientes',
    icon: <Star className="w-8 h-8" aria-hidden="true" />,
    iconBgColor: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
];

/**
 * Animated Counter Component using Framer Motion
 */
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration: _duration = 2,
  decimals = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Create spring animation
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform spring value to display value
  const display = useTransform(spring, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  );

  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => unsubscribe();
  }, [display]);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <span ref={ref}>{displayValue}</span>;
};

/**
 * Metrics Section Component
 *
 * Section 10 from LANDING_PAGE_BLUEPRINT.md - "IA Que Entrega Resultados Mensuráveis"
 *
 * Features:
 * - 4 large metric cards with animated counters
 * - 320% ROI, 14 days implementation, 50+ companies, 4.8/5 satisfaction
 * - Icons with custom background colors
 * - Framer Motion counter animations on scroll
 * - Mobile-first responsive grid (1 col mobile, 2x2 tablet, 4 col desktop)
 *
 * Usage:
 * ```tsx
 * <Metrics />
 * ```
 *
 * @example
 * // With custom animation duration
 * <Metrics animationDuration={3} />
 *
 * @example
 * // With custom metrics
 * <Metrics metrics={customMetrics} />
 */
export const Metrics: React.FC<MetricsProps> = ({
  title = 'IA Que Entrega Resultados Mensuráveis',
  subtitle = 'Números reais de transformação digital em PMEs brasileiras',
  metrics = defaultMetrics,
  className = '',
  animationDuration = 2,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="metrics"
      className={`py-xxl bg-white ${className}`}
      aria-labelledby="metrics-title"
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
            id="metrics-title"
            className="font-aeonik-mono text-4xl md:text-5xl lg:text-6xl uppercase text-primary-dark mb-4 tracking-tight"
          >
            {title}
          </h2>
          <p className="font-inter text-lg text-primary-dark/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {metrics.map((metric) => {
            // Determine if value needs decimals (e.g., 4.8)
            const hasDecimals = !Number.isInteger(metric.value);
            const decimals = hasDecimals ? 1 : 0;

            return (
              <motion.div key={metric.id} variants={cardVariants}>
                <Card
                  variant="default"
                  padding="lg"
                  className="h-full text-center hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="space-y-6 flex flex-col items-center">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 ${metric.iconBgColor} rounded-[4px] flex items-center justify-center ${metric.iconColor} group-hover:scale-110 transition-transform duration-300`}
                      aria-hidden="true"
                    >
                      {metric.icon}
                    </div>

                    {/* Animated Metric Value */}
                    <div className="space-y-2">
                      <div
                        className="font-aeonik-mono text-5xl md:text-6xl uppercase font-bold text-primary-dark leading-none"
                        aria-live="polite"
                      >
                        {metric.prefix}
                        <AnimatedCounter
                          value={metric.value}
                          duration={animationDuration}
                          decimals={decimals}
                        />
                        {metric.suffix}
                      </div>
                      <h3 className="font-aeonik-mono text-base md:text-lg uppercase text-primary-dark tracking-wide">
                        {metric.label}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="font-inter text-sm text-primary-dark/70 leading-relaxed">
                      {metric.description}
                    </p>

                    {/* Decorative bar */}
                    <div
                      className="w-12 h-1 bg-accent-teal rounded-full"
                      aria-hidden="true"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="font-inter text-primary-dark/70 leading-relaxed">
              Todos os números são baseados em dados reais de clientes ativos.
              Resultados individuais podem variar conforme{' '}
              <strong className="text-primary-dark">
                implementação e setor de atuação
              </strong>
              .
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-beige border-2 border-primary-dark/10 rounded-[4px]">
              <Star
                className="w-4 h-4 text-amber-500 fill-amber-500"
                aria-hidden="true"
              />
              <span className="font-inter text-sm text-primary-dark">
                Métricas atualizadas mensalmente
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Metrics;
