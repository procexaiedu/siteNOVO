import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
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
  // Sectors/clients placeholder data
  const sectors = [
    { icon: ShoppingCart, label: 'E-commerce', color: 'accent' as const },
    { icon: Package, label: 'Distribuição', color: 'secondary' as const },
    { icon: Briefcase, label: 'Serviços', color: 'outline' as const },
    { icon: Store, label: 'Varejo', color: 'accent' as const },
    { icon: Building2, label: 'B2B', color: 'secondary' as const },
    { icon: Truck, label: 'Logística', color: 'outline' as const },
  ];

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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

        {/* Sectors Grid */}
        <motion.div
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center justify-center"
            >
              <Badge
                variant={sector.color}
                size="lg"
                icon={<sector.icon size={20} />}
                className="w-full justify-center py-4 transition-all hover:scale-105"
              >
                {sector.label}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

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
