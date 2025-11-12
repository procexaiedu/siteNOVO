import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, HandHeart } from 'lucide-react';
import { Container } from '../ui/Container';
import { Card, CardContent } from '../ui/Card';

/**
 * Differentials / Por Que ProceX AI Section
 *
 * Highlights unique value proposition with 3 key differentiators:
 * - Hub de Especialistas: Dedicated professionals, not templates
 * - 14 Dias Garantido: Fast implementation with proven methodology
 * - Suporte Contínuo: Continuous specialist support
 *
 * Design system:
 * - H2: 48px, uppercase, Aeonik Mono
 * - Cards: 4px radius, 2px border
 * - Icons: 48px, stroke-2
 * - Section spacing: 180px vertical
 *
 * @example
 * <Differentials />
 */

const differentials = [
  {
    icon: Brain,
    title: 'HUB DE ESPECIALISTAS',
    description: 'Cada projeto = profissional dedicado do setor. Não é template, é personalizado.',
    highlight: 'Experiência real, não automação genérica',
  },
  {
    icon: Zap,
    title: '14 DIAS GARANTIDO',
    description: 'Metodologia testada, resultados na semana 1. Não meses como projetos de TI tradicionais.',
    highlight: 'Velocidade sem comprometer qualidade',
  },
  {
    icon: HandHeart,
    title: 'SUPORTE CONTÍNUO',
    description: 'Especialista fica disponível para evolução. Não é número genérico de suporte.',
    highlight: 'Parceria de longo prazo, não transação',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

export const Differentials: React.FC = () => {
  return (
    <section
      className="relative bg-background py-[90px] md:py-[110px] lg:py-[180px]"
      aria-labelledby="differentials-heading"
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
            id="differentials-heading"
            className="font-aeonik-mono text-3xl md:text-4xl lg:text-[48px] uppercase text-primary-dark leading-tight mb-4"
          >
            Não Vendemos Plataforma. <br className="hidden md:block" />
            Conectamos ao Especialista.
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-inter text-base md:text-lg text-primary-dark/80 max-w-3xl mx-auto"
          >
            Consultoria boutique + agilidade startup
          </motion.p>
        </motion.div>

        {/* Differentials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {differentials.map((differential, index) => (
            <motion.div
              key={differential.title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="h-full"
            >
              <Card
                variant="default"
                padding="lg"
                className="h-full flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                <CardContent className="flex flex-col gap-6 h-full">
                  {/* Icon */}
                  <motion.div
                    variants={iconVariants}
                    className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-secondary-blue/10 rounded-[4px] border-2 border-primary-dark"
                  >
                    <differential.icon
                      className="w-6 h-6 md:w-7 md:h-7 text-primary-dark"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <h3 className="font-aeonik-mono text-lg md:text-xl lg:text-[24px] uppercase text-primary-dark leading-tight">
                      {differential.title}
                    </h3>

                    <p className="font-inter text-sm md:text-base text-primary-dark/80 leading-relaxed">
                      {differential.description}
                    </p>
                  </div>

                  {/* Highlight Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="pt-4 border-t-2 border-primary-dark/10"
                  >
                    <p className="font-aeonik-mono text-xs uppercase tracking-wide text-accent-teal">
                      {differential.highlight}
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-secondary-blue/10 border-2 border-primary-dark rounded-[4px] px-6 py-4">
            <span className="font-aeonik-mono text-sm md:text-base uppercase text-primary-dark">
              💡 Consultoria boutique + agilidade startup
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Differentials;
