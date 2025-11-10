import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, Clock, Users, ArrowRight, ArrowDown } from 'lucide-react';
import VerticalCutReveal from '@/components/fancy/text/vertical-cut-reveal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { CloudSmall } from '@/components/common/CloudSmall';
import { CloudLarge } from '@/components/common/CloudLarge';
import { Diamond } from '@/components/common/Diamond';
import { Cube3D } from '@/components/common/Cube3D';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Hero Section Component
 *
 * Impactful hero section with headline, value propositions, CTAs, and social proof.
 * Features animated decorative elements and responsive design.
 *
 * Key Elements:
 * - Main headline: "Agentes de IA Personalizados em 14 Dias"
 * - 4 bullet points with value propositions
 * - Primary CTA: "DIAGNÓSTICO GRATUITO"
 * - Secondary CTA: "Ver Como Funciona"
 * - Trust badges: 50+ PMEs, 4.8/5 rating, 40h/month saved
 * - Decorative background elements (clouds, diamond, cube)
 *
 * @example
 * <Hero />
 */
export const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(isMobileDevice);

    // Listen for resize
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust animation settings based on user preferences
  const staggerDuration = prefersReducedMotion ? 0.05 : (isMobile ? 0.1 : 0.15);
  const autoStartAnimation = !prefersReducedMotion;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5 },
    },
  };

  const bulletPoints = [
    { icon: CheckCircle2, text: '14 dias até operação' },
    { icon: Users, text: 'Especialistas dedicados' },
    { icon: CheckCircle2, text: 'Zero infraestrutura' },
    { icon: Clock, text: 'ROI em 90 dias' },
  ];

  const trustBadges = [
    { icon: Users, text: '50+ PMEs', variant: 'accent' as const },
    { icon: Star, text: '4.8/5', variant: 'secondary' as const },
    { icon: Clock, text: '40h/mês economizadas', variant: 'outline' as const },
  ];

  return (
    <section className="relative overflow-hidden bg-neutral-beige pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute top-20 left-10 opacity-30"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <CloudSmall />
      </motion.div>

      <motion.div
        className="absolute top-40 right-16 opacity-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <CloudLarge />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 opacity-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <Diamond />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-24 opacity-50"
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 0.5, rotate: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <Cube3D />
      </motion.div>

      {/* Content */}
      <Container size="xl" padding="default">
        <motion.div
          className="relative z-10 mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.h1
            className="mb-6 font-aeonik-mono text-4xl font-bold uppercase leading-tight tracking-wide text-primary-dark md:text-5xl lg:text-6xl xl:text-hero xl:leading-hero"
            variants={itemVariants}
          >
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={staggerDuration}
              staggerFrom="first"
              autoStart={autoStartAnimation}
              containerClassName="block"
              wordLevelClassName="inline-block"
            >
              Agentes de IA Personalizados em 14 Dias
            </VerticalCutReveal>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mb-10 font-inter text-lg font-light text-primary-dark md:text-xl lg:text-2xl"
            variants={itemVariants}
          >
            Conectamos sua PME aos especialistas certos
          </motion.p>

          {/* Bullet Points */}
          <motion.div
            className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6"
            variants={itemVariants}
          >
            {bulletPoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center gap-3 rounded-[2px] border-2 border-primary-dark bg-white p-4 transition-all hover:shadow-[4px_4px_0px_0px_rgba(56,56,56,1)]"
                whileHover={{ scale: 1.02 }}
              >
                <point.icon className="text-accent-teal" size={24} />
                <span className="font-inter text-base font-normal text-primary-dark">
                  {point.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto" scrambleHover>
              DIAGNÓSTICO GRATUITO
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" scrambleHover>
              Ver Como Funciona
              <ArrowDown className="ml-2" size={20} />
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            variants={itemVariants}
          >
            {trustBadges.map((badge, index) => (
              <Badge
                key={index}
                variant={badge.variant}
                size="lg"
                icon={<badge.icon size={16} />}
                className="shadow-sm"
              >
                {badge.text}
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
