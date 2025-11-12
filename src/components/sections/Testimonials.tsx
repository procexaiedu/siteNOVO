import React from 'react';
import { motion } from 'framer-motion';
import { Quote, TrendingUp, Clock, Star, Award } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Container } from '../ui/Container';

/**
 * Testimonial data interface
 */
interface Testimonial {
  id: string;
  name: string;
  company: string;
  location: string;
  quote: string;
  metric: string;
  metricValue: string;
  avatar: string;
  icon: React.ReactNode;
}

/**
 * Testimonials Section Props
 */
export interface TestimonialsProps {
  /** Optional custom title */
  title?: string;
  /** Optional custom testimonials data */
  testimonials?: Testimonial[];
  /** Optional custom class name */
  className?: string;
}

/**
 * Default testimonials data following LANDING_PAGE_BLUEPRINT.md
 */
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    company: 'E-commerce',
    location: 'SP',
    quote: '32% de reativação de clientes inativos. O agente de follow-up trabalha 24/7 sem descanso.',
    metric: '+32%',
    metricValue: 'Reativação',
    avatar: 'CM',
    icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: '2',
    name: 'Fernanda Oliveira',
    company: 'Distribuidora',
    location: 'PR',
    quote: '40 horas economizadas por mês em processos manuais. Nossa equipe agora foca no estratégico.',
    metric: '40h/mês',
    metricValue: 'Economizadas',
    avatar: 'FO',
    icon: <Clock className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: '3',
    name: 'Rafael Costa',
    company: 'SaaS',
    location: 'SC',
    quote: 'Atendimento 24/7 sem aumentar custos. NPS subiu 0.8 pontos em 3 meses com respostas instantâneas.',
    metric: '+0.8 NPS',
    metricValue: 'Satisfação',
    avatar: 'RC',
    icon: <Star className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: '4',
    name: 'Juliana Ramos',
    company: 'Agência',
    location: 'MG',
    quote: 'Suporte excepcional. O especialista dedicado entende nosso negócio e evolui o agente continuamente.',
    metric: 'Continuous',
    metricValue: 'Evolução',
    avatar: 'JR',
    icon: <Award className="w-5 h-5" aria-hidden="true" />,
  },
];

/**
 * Testimonials Section Component
 *
 * Section 7 from LANDING_PAGE_BLUEPRINT.md - "Resultados Reais de PMEs Como a Sua"
 *
 * Features:
 * - 4 testimonial cards in 2x2 responsive grid
 * - Avatar initials, name, company, location
 * - Quote with metric highlight
 * - Framer Motion scroll animations
 * - Mobile-first responsive design
 *
 * Usage:
 * ```tsx
 * <Testimonials />
 * ```
 *
 * @example
 * // With custom title
 * <Testimonials title="O Que Nossos Clientes Dizem" />
 *
 * @example
 * // With custom testimonials
 * <Testimonials testimonials={customData} />
 */
export const Testimonials: React.FC<TestimonialsProps> = ({
  title = 'Resultados Reais de PMEs Como a Sua',
  testimonials = defaultTestimonials,
  className = '',
}) => {
  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve
      },
    },
  };

  return (
    <section
      id="testimonials"
      className={`py-xxl bg-neutral-beige ${className}`}
      aria-labelledby="testimonials-title"
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
            id="testimonials-title"
            className="font-aeonik-mono text-4xl md:text-5xl lg:text-6xl uppercase text-primary-dark mb-4 tracking-tight"
          >
            {title}
          </h2>
          <div className="flex items-center justify-center gap-2 text-primary-dark/70">
            <Quote className="w-5 h-5" aria-hidden="true" />
            <p className="font-inter text-lg">
              Histórias reais de transformação digital
            </p>
          </div>
        </motion.div>

        {/* Mobile Horizontal Carousel (hidden on md+) */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          <motion.div
            className="flex gap-4 pb-4 w-max"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="flex-shrink-0 w-[calc(100vw-2rem)] snap-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  variant="default"
                  padding="lg"
                  className="h-full hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="space-y-6">
                    {/* Header: Avatar + Info */}
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div
                        className="flex-shrink-0 w-14 h-14 rounded-[4px] bg-cta-blue border-2 border-primary-dark flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <span className="font-aeonik-mono text-lg font-semibold text-primary-dark">
                          {testimonial.avatar}
                        </span>
                      </div>

                      {/* Name, Company, Location */}
                      <div className="flex-1">
                        <h3 className="font-aeonik-mono text-lg uppercase text-primary-dark mb-1">
                          {testimonial.name}
                        </h3>
                        <p className="font-inter text-sm text-primary-dark/70">
                          {testimonial.company} • {testimonial.location}
                        </p>
                      </div>

                      {/* Icon */}
                      <div className="flex-shrink-0 text-accent-teal">
                        {testimonial.icon}
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="relative">
                      <Quote
                        className="absolute -top-2 -left-2 w-8 h-8 text-primary-dark/10"
                        aria-hidden="true"
                      />
                      <p className="font-inter text-base text-primary-dark leading-relaxed pl-6">
                        {testimonial.quote}
                      </p>
                    </blockquote>

                    {/* Metric Badge */}
                    <div className="flex items-center justify-between pt-4 border-t-2 border-primary-dark/10">
                      <div>
                        <div className="font-aeonik-mono text-2xl uppercase text-accent-teal font-semibold">
                          {testimonial.metric}
                        </div>
                        <div className="font-inter text-sm text-primary-dark/70 mt-1">
                          {testimonial.metricValue}
                        </div>
                      </div>
                      <div
                        className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        {testimonial.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <Card
                variant="default"
                padding="lg"
                className="h-full hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="space-y-6">
                  {/* Header: Avatar + Info */}
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-[4px] bg-cta-blue border-2 border-primary-dark flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="font-aeonik-mono text-lg font-semibold text-primary-dark">
                        {testimonial.avatar}
                      </span>
                    </div>

                    {/* Name, Company, Location */}
                    <div className="flex-1">
                      <h3 className="font-aeonik-mono text-lg uppercase text-primary-dark mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="font-inter text-sm text-primary-dark/70">
                        {testimonial.company} • {testimonial.location}
                      </p>
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0 text-accent-teal">
                      {testimonial.icon}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="relative">
                    <Quote
                      className="absolute -top-2 -left-2 w-8 h-8 text-primary-dark/10"
                      aria-hidden="true"
                    />
                    <p className="font-inter text-base text-primary-dark leading-relaxed pl-6">
                      {testimonial.quote}
                    </p>
                  </blockquote>

                  {/* Metric Badge */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-primary-dark/10">
                    <div>
                      <div className="font-aeonik-mono text-2xl uppercase text-accent-teal font-semibold">
                        {testimonial.metric}
                      </div>
                      <div className="font-inter text-sm text-primary-dark/70 mt-1">
                        {testimonial.metricValue}
                      </div>
                    </div>
                    <div
                      className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {testimonial.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="font-inter text-primary-dark/70 text-sm">
            Mais de <strong className="text-primary-dark">50+ empresas</strong>{' '}
            transformaram seus processos com ProceX AI
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;
