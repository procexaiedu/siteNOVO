import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Handshake,
  Phone,
  DollarSign,
  Package,
  FileText,
  Target,
  ArrowRight
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * UseCases / Casos de Uso Práticos Section
 *
 * Showcases 6 practical AI agent use cases with metrics:
 * - Comercial: Lead qualification, follow-up, reactivation
 * - Atendimento: 24/7 responses, scheduling
 * - Financeiro: Collections, invoices, reconciliation
 * - Operacional: Logistics, inventory
 * - Backoffice: Documents, reports
 * - Personalizado: Custom solutions
 *
 * Mobile optimization: Tabs interface reduces scroll by ~2,400px
 * Desktop: 3-column grid (6 cards visible)
 * Mobile: Tab interface (1 card at a time)
 *
 * Each card includes:
 * - Icon (48px, stroke-2)
 * - Title (uppercase, Aeonik Mono)
 * - 3 tasks/features
 * - Success metric with highlight
 * - "Explorar" CTA button
 *
 * @example
 * <UseCases />
 */

interface UseCase {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  tasks: string[];
  metric: string;
  metricValue: string;
  color: string;
}

const useCases: UseCase[] = [
  {
    icon: Handshake,
    title: 'COMERCIAL',
    subtitle: 'Vendas Inteligentes',
    tasks: ['Qualificação de leads', 'Follow-up automático', 'Reativação de clientes'],
    metric: '+28% conversão',
    metricValue: 'Mais vendas fechadas',
    color: 'bg-blue-50',
  },
  {
    icon: Phone,
    title: 'ATENDIMENTO',
    subtitle: 'Suporte 24/7',
    tasks: ['Respostas instantâneas', 'Agendamento inteligente', 'Triagem de solicitações'],
    metric: '1min resposta',
    metricValue: 'Satisfação máxima',
    color: 'bg-green-50',
  },
  {
    icon: DollarSign,
    title: 'FINANCEIRO',
    subtitle: 'Gestão Automatizada',
    tasks: ['Cobranças proativas', 'Emissão de boletos', 'Conciliação bancária'],
    metric: '-50% inadimplência',
    metricValue: 'Cashflow saudável',
    color: 'bg-emerald-50',
  },
  {
    icon: Package,
    title: 'OPERACIONAL',
    subtitle: 'Logística Eficiente',
    tasks: ['Rastreamento de pedidos', 'Gestão de estoque', 'Notificações automáticas'],
    metric: '-40% erros',
    metricValue: 'Processos otimizados',
    color: 'bg-orange-50',
  },
  {
    icon: FileText,
    title: 'BACKOFFICE',
    subtitle: 'Documentação Ágil',
    tasks: ['Processamento de docs', 'Geração de relatórios', 'Extração de dados'],
    metric: '70% tempo economizado',
    metricValue: 'Foco no estratégico',
    color: 'bg-purple-50',
  },
  {
    icon: Target,
    title: 'PERSONALIZADO',
    subtitle: 'Sua Necessidade',
    tasks: ['Processo específico', 'Integração customizada', 'Fluxo sob medida'],
    metric: '100% adaptável',
    metricValue: 'Solução única',
    color: 'bg-pink-50',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export const UseCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative bg-background py-[90px] md:py-[110px] lg:py-[180px]"
      aria-labelledby="usecases-heading"
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
            id="usecases-heading"
            className="font-aeonik-mono text-3xl md:text-4xl lg:text-[48px] uppercase text-primary-dark leading-tight mb-4"
          >
            Agentes de IA para Cada Área <br className="hidden md:block" />
            do Seu Negócio
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-inter text-base md:text-lg text-primary-dark/80 max-w-3xl mx-auto"
          >
            Soluções práticas que geram resultados mensuráveis desde o primeiro dia
          </motion.p>
        </motion.div>

        {/* Mobile Tabs - Hidden on md and up */}
        <div className="md:hidden mb-8">
          <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4" role="tablist">
            {useCases.map((useCase, index) => (
              <motion.button
                key={useCase.title}
                onClick={() => setActiveTab(index)}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`use-case-${index}`}
                className={`flex-shrink-0 px-4 py-2 rounded text-sm font-aeonik-mono uppercase transition-all border-2 ${
                  activeTab === index
                    ? 'bg-button-blue text-primary-dark border-primary-dark'
                    : 'bg-white text-primary-dark border-primary-dark/30 hover:border-primary-dark'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {useCase.title}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile Tab Content - Single card at a time */}
        <AnimatePresence mode="wait">
          <div className="md:hidden mb-12">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                id={`use-case-${index}`}
                hidden={activeTab !== index}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={activeTab === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
              >
                {activeTab === index && (
                  <Card
                    variant="default"
                    padding="lg"
                    className="h-full flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 group"
                  >
                    <CardContent className="flex flex-col gap-6 h-full">
                      {/* Icon & Title */}
                      <div className="flex items-start justify-between gap-4">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                          }}
                          className={`w-12 h-12 flex items-center justify-center ${useCase.color} rounded-[4px] border-2 border-primary-dark flex-shrink-0`}
                        >
                          <useCase.icon
                            className="w-6 h-6 text-primary-dark"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </motion.div>

                        <div className="flex-1">
                          <h3 className="font-aeonik-mono text-lg uppercase text-primary-dark leading-tight">
                            {useCase.title}
                          </h3>
                          <p className="font-inter text-xs text-primary-dark/60 mt-1">
                            {useCase.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Tasks List */}
                      <ul className="space-y-3 flex-1" role="list">
                        {useCase.tasks.map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className="flex items-start gap-2 font-inter text-sm text-primary-dark/80"
                          >
                            <span className="text-accent-teal mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Metric Highlight */}
                      <div className="pt-4 border-t-2 border-primary-dark/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-aeonik-mono text-lg font-semibold text-accent-teal uppercase">
                            {useCase.metric}
                          </span>
                          <ArrowRight
                            className="w-5 h-5 text-primary-dark/40 group-hover:text-primary-dark transition-colors"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="font-inter text-xs text-primary-dark/60">
                          {useCase.metricValue}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <Button
                        variant="secondary"
                        size="default"
                        className="w-full group-hover:bg-button-blue/10 transition-colors"
                        aria-label={`Explorar solução ${useCase.title}`}
                      >
                        EXPLORAR
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Use Cases Grid - Hidden on mobile, visible on md and up */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.25 }
              }}
              className="h-full"
            >
              <Card
                variant="default"
                padding="lg"
                className="h-full flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 group"
              >
                <CardContent className="flex flex-col gap-6 h-full">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between gap-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                      }}
                      className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center ${useCase.color} rounded-[4px] border-2 border-primary-dark flex-shrink-0`}
                    >
                      <useCase.icon
                        className="w-6 h-6 md:w-7 md:h-7 text-primary-dark"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="font-aeonik-mono text-lg md:text-xl lg:text-[24px] uppercase text-primary-dark leading-tight">
                        {useCase.title}
                      </h3>
                      <p className="font-inter text-xs md:text-sm text-primary-dark/60 mt-1">
                        {useCase.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Tasks List */}
                  <ul className="space-y-3 flex-1" role="list">
                    {useCase.tasks.map((task, taskIndex) => (
                      <motion.li
                        key={taskIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.05 + taskIndex * 0.05 }}
                        className="flex items-start gap-2 font-inter text-sm md:text-base text-primary-dark/80"
                      >
                        <span className="text-accent-teal mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                        <span>{task}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Metric Highlight */}
                  <div className="pt-4 border-t-2 border-primary-dark/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-aeonik-mono text-lg md:text-xl font-semibold text-accent-teal uppercase">
                        {useCase.metric}
                      </span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight
                          className="w-5 h-5 text-primary-dark/40 group-hover:text-primary-dark transition-colors"
                          aria-hidden="true"
                        />
                      </motion.div>
                    </div>
                    <p className="font-inter text-xs text-primary-dark/60">
                      {useCase.metricValue}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="secondary"
                    size="default"
                    className="w-full group-hover:bg-button-blue/10 transition-colors"
                    aria-label={`Explorar solução ${useCase.title}`}
                  >
                    EXPLORAR
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="font-inter text-base md:text-lg text-primary-dark/80 mb-6">
            Não encontrou o seu caso? Criamos soluções personalizadas.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="inline-flex items-center gap-2"
          >
            FALAR COM ESPECIALISTA
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default UseCases;
