import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, Wrench, ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

/**
 * ProblemSolution Section Component
 *
 * Presents common SMB challenges and how AI agents solve them.
 * Uses card-based layout with problem → solution flow.
 *
 * Three main challenges addressed:
 * 1. Growth increases costs → AI scales without hiring
 * 2. Manual processes drain productivity → AI automation
 * 3. Lack of tech expertise → Dedicated AI specialists
 *
 * Features:
 * - Animated cards on scroll
 * - Icon-based visual hierarchy
 * - Clear problem-solution structure
 * - CTA to calculate savings
 *
 * @example
 * <ProblemSolution />
 */
export const ProblemSolution: React.FC = () => {
  // Problem-solution cards data
  const cards = [
    {
      icon: DollarSign,
      problem: 'Crescer Aumenta Custos',
      problemDetail: 'Contratar mais pessoas significa mais custos fixos e gestão complexa',
      solution: 'Agentes de IA escaláveis',
      solutionDetail: 'Multiplique capacidade sem aumentar headcount. Pague por uso.',
    },
    {
      icon: Clock,
      problem: 'Processos Manuais Drenam Produtividade',
      problemDetail: 'Time perde 40h/mês em tarefas repetitivas que não geram valor',
      solution: 'Automação inteligente 24/7',
      solutionDetail: 'IA executa tarefas repetitivas enquanto seu time foca no estratégico.',
    },
    {
      icon: Wrench,
      problem: 'Falta Expertise em Tech',
      problemDetail: 'Não tem time de TI ou orçamento para projetos complexos de IA',
      solution: 'Especialistas dedicados',
      solutionDetail: 'Conectamos você ao especialista certo. Implementação em 14 dias.',
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="bg-neutral-beige py-16 md:py-24">
      <Container size="xl" padding="default">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 font-aeonik-mono text-3xl font-bold uppercase tracking-wide text-primary-dark md:text-4xl lg:text-5xl">
            Pequenas Empresas, Grandes Desafios
          </h2>
          <p className="mx-auto max-w-2xl font-inter text-lg font-light text-primary-dark md:text-xl">
            Você não está sozinho. Estes são os desafios mais comuns de PMEs — e como IA resolve cada um.
          </p>
        </motion.div>

        {/* Mobile Horizontal Carousel (hidden on md+) */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          <motion.div
            className="flex gap-4 pb-4 w-max"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[calc(100vw-2rem)] snap-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  variant="elevated"
                  padding="lg"
                  className="group h-full transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(56,56,56,1)]"
                >
                  <CardContent className="flex h-full flex-col">
                    {/* Icon */}
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[2px] border-2 border-primary-dark bg-accent-teal transition-transform group-hover:scale-110">
                      <card.icon className="text-white" size={32} />
                    </div>

                    {/* Problem */}
                    <div className="mb-6">
                      <h3 className="mb-2 font-aeonik-mono text-xl font-bold uppercase tracking-wide text-primary-dark">
                        {card.problem}
                      </h3>
                      <p className="font-inter text-sm font-light leading-relaxed text-primary-dark opacity-80">
                        {card.problemDetail}
                      </p>
                    </div>

                    {/* Arrow Divider */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="h-[2px] flex-1 bg-primary-dark opacity-20" />
                      <ArrowRight className="text-accent-teal" size={24} />
                      <div className="h-[2px] flex-1 bg-primary-dark opacity-20" />
                    </div>

                    {/* Solution */}
                    <div className="mt-auto">
                      <div className="mb-2 flex items-center gap-2">
                        <Sparkles className="text-accent-teal" size={20} />
                        <h4 className="font-aeonik-mono text-lg font-bold uppercase tracking-wide text-accent-teal">
                          {card.solution}
                        </h4>
                      </div>
                      <p className="font-inter text-sm font-normal leading-relaxed text-primary-dark">
                        {card.solutionDetail}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        <motion.div
          className="hidden md:grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card
                variant="elevated"
                padding="lg"
                className="group h-full transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(56,56,56,1)]"
              >
                <CardContent className="flex h-full flex-col">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[2px] border-2 border-primary-dark bg-accent-teal transition-transform group-hover:scale-110">
                    <card.icon className="text-white" size={32} />
                  </div>

                  {/* Problem */}
                  <div className="mb-6">
                    <h3 className="mb-2 font-aeonik-mono text-xl font-bold uppercase tracking-wide text-primary-dark">
                      {card.problem}
                    </h3>
                    <p className="font-inter text-sm font-light leading-relaxed text-primary-dark opacity-80">
                      {card.problemDetail}
                    </p>
                  </div>

                  {/* Arrow Divider */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-[2px] flex-1 bg-primary-dark opacity-20" />
                    <ArrowRight className="text-accent-teal" size={24} />
                    <div className="h-[2px] flex-1 bg-primary-dark opacity-20" />
                  </div>

                  {/* Solution */}
                  <div className="mt-auto">
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="text-accent-teal" size={20} />
                      <h4 className="font-aeonik-mono text-lg font-bold uppercase tracking-wide text-accent-teal">
                        {card.solution}
                      </h4>
                    </div>
                    <p className="font-inter text-sm font-normal leading-relaxed text-primary-dark">
                      {card.solutionDetail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button variant="primary" size="lg">
            DESCOBRIR QUANTO POSSO ECONOMIZAR
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <p className="mt-4 font-inter text-sm font-light text-primary-dark opacity-70">
            Diagnóstico gratuito • 30 minutos • Sem compromisso
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default ProblemSolution;
