import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SimpleMarquee from '@/components/fancy/blocks/simple-marquee';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  Store,
  Package,
  Briefcase,
  ShoppingCart,
  Building2,
  Truck
} from 'lucide-react';

/**
 * SocialProof Section Component
 *
 * Displays client logos/sectors to establish credibility.
 * Features fade-in animation on scroll for visual interest.
 *
 * Uses placeholder badges with icons representing different business sectors.
 * In production, replace with actual client logos.
 *
 * Sectors represented:
 * - E-commerce
 * - Distribuição
 * - Serviços
 * - Varejo
 * - B2B
 * - Logística
 *
 * @example
 * <SocialProof />
 */
export const SocialProof: React.FC = () => {
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

  // Sectors/clients placeholder data
  const sectors = [
    { icon: ShoppingCart, label: 'E-commerce', color: 'accent' as const },
    { icon: Package, label: 'Distribuição', color: 'secondary' as const },
    { icon: Briefcase, label: 'Serviços', color: 'outline' as const },
    { icon: Store, label: 'Varejo', color: 'accent' as const },
    { icon: Building2, label: 'B2B', color: 'secondary' as const },
    { icon: Truck, label: 'Logística', color: 'outline' as const },
  ];

  // Adjust marquee settings based on preferences
  // Desktop: 4px/s (visible animation), Mobile: 1px/s (slower on small screens)
  const marqueeVelocity = prefersReducedMotion ? 0 : (isMobile ? 1 : 4);

  return (
    <section className="bg-white py-12 md:py-16">
      <Container size="xl" padding="default">
        {/* Section Title */}
        <motion.h2
          className="mb-10 text-center font-aeonik-mono text-2xl font-normal uppercase tracking-wide text-primary-dark md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Confiado por empresas de diversos setores
        </motion.h2>

        {/* Sectors Marquee - Mobile overflow hidden, Desktop normal */}
        <div className="md:overflow-visible overflow-hidden -mx-4 md:mx-0 px-4 md:px-0">
          <SimpleMarquee
            direction="right"
            baseVelocity={marqueeVelocity}
            repeat={isMobile ? 3 : 5}
            slowdownOnHover={!prefersReducedMotion}
            slowDownFactor={0.5}
            className="gap-4 md:gap-8"
          >
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="shrink-0 flex items-center justify-center px-3"
            >
              <Badge
                variant={sector.color}
                size="lg"
                icon={<sector.icon size={20} />}
                className="py-4 transition-all hover:scale-105 whitespace-nowrap"
              >
                {sector.label}
              </Badge>
            </div>
          ))}
          </SimpleMarquee>
        </div>

        {/* Optional: Additional Trust Statement */}
        <motion.p
          className="mt-10 text-center font-inter text-sm font-light text-primary-dark opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Mais de 50 PMEs já transformaram suas operações com agentes de IA personalizados
        </motion.p>
      </Container>
    </section>
  );
};

export default SocialProof;
