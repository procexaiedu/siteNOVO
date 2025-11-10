import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  ShoppingCart,
  Users,
  DollarSign,
  Zap,
  Box,
  Code2,
  ExternalLink,
} from 'lucide-react';
import { Badge, BadgeGroup } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Container } from '../ui/Container';

/**
 * Integration category interface
 */
interface IntegrationCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconColor: string;
  integrations: string[];
}

/**
 * Integrations Section Props
 */
export interface IntegrationsProps {
  /** Optional custom title */
  title?: string;
  /** Optional custom subtitle */
  subtitle?: string;
  /** Optional custom categories */
  categories?: IntegrationCategory[];
  /** Optional custom class name */
  className?: string;
  /** Optional CTA handler */
  onCtaClick?: () => void;
}

/**
 * Default integration categories following LANDING_PAGE_BLUEPRINT.md
 */
const defaultCategories: IntegrationCategory[] = [
  {
    id: 'communication',
    name: 'Comunicação',
    icon: <MessageCircle className="w-5 h-5" aria-hidden="true" />,
    iconColor: 'text-button-blue',
    integrations: ['WhatsApp', 'Telegram', 'Gmail', 'Outlook'],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: <ShoppingCart className="w-5 h-5" aria-hidden="true" />,
    iconColor: 'text-accent-teal',
    integrations: ['Shopify', 'WooCommerce', 'Nuvemshop', 'Mercado Livre'],
  },
  {
    id: 'crm',
    name: 'CRM',
    icon: <Users className="w-5 h-5" aria-hidden="true" />,
    iconColor: 'text-purple-600',
    integrations: ['RD Station', 'HubSpot', 'Pipedrive', 'Bitrix24'],
  },
  {
    id: 'financial',
    name: 'Financeiro',
    icon: <DollarSign className="w-5 h-5" aria-hidden="true" />,
    iconColor: 'text-green-600',
    integrations: ['Asaas', 'Pagar.me', 'Bling', 'Conta Azul'],
  },
  {
    id: 'productivity',
    name: 'Produtividade',
    icon: <Zap className="w-5 h-5" aria-hidden="true" />,
    iconColor: 'text-amber-500',
    integrations: ['Google Workspace', 'Microsoft 365', 'Trello', 'Notion'],
  },
  {
    id: 'erp',
    name: 'ERP',
    icon: <Box className="w-5 h-5" aria-hidden="true" />,
    iconColor: 'text-indigo-600',
    integrations: ['Tiny ERP', 'SAP', 'TOTVS', 'APIs Customizadas'],
  },
];

/**
 * Integrations Section Component
 *
 * Section 9 from LANDING_PAGE_BLUEPRINT.md - "Conecta com as Ferramentas Que Você Já Usa"
 *
 * Features:
 * - 6 integration categories with badges
 * - Communication, E-commerce, CRM, Financial, Productivity, ERP
 * - Custom API integration highlight
 * - Specialist CTA
 * - Mobile-first responsive grid
 * - Stagger animations for categories
 *
 * Usage:
 * ```tsx
 * <Integrations />
 * ```
 *
 * @example
 * // With custom CTA handler
 * <Integrations onCtaClick={() => window.open('https://wa.me/...')} />
 *
 * @example
 * // With custom categories
 * <Integrations categories={customCategories} />
 */
export const Integrations: React.FC<IntegrationsProps> = ({
  title = 'Conecta com as Ferramentas Que Você Já Usa',
  subtitle = 'Integrações nativas com as principais plataformas do mercado brasileiro',
  categories = defaultCategories,
  className = '',
  onCtaClick,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="integrations"
      className={`py-xxl bg-neutral-beige ${className}`}
      aria-labelledby="integrations-title"
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
            id="integrations-title"
            className="font-aeonik-mono text-4xl md:text-5xl lg:text-6xl uppercase text-primary-dark mb-4 tracking-tight"
          >
            {title}
          </h2>
          <p className="font-inter text-lg text-primary-dark/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Integration Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={categoryVariants}>
              <Card
                variant="default"
                padding="lg"
                className="h-full hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`${category.iconColor} flex-shrink-0`}
                      aria-hidden="true"
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-aeonik-mono text-lg uppercase text-primary-dark">
                      {category.name}
                    </h3>
                  </div>

                  {/* Integration Badges */}
                  <BadgeGroup className="gap-2">
                    {category.integrations.map((integration, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        size="default"
                        className="hover:bg-primary-dark hover:text-white transition-colors cursor-default"
                      >
                        {integration}
                      </Badge>
                    ))}
                  </BadgeGroup>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom API Highlight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <Card
            variant="elevated"
            padding="lg"
            className="bg-gradient-to-br from-button-blue/10 to-accent-teal/10 border-primary-dark"
          >
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left side: Icon + Message */}
              <div className="flex items-start gap-4 flex-1">
                <div
                  className="w-12 h-12 bg-primary-dark rounded-[4px] flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Code2 className="w-6 h-6 text-button-blue" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-aeonik-mono text-xl uppercase text-primary-dark">
                    Não Achou Sua Ferramenta?
                  </h3>
                  <p className="font-inter text-primary-dark/80 leading-relaxed">
                    Criamos integrações customizadas via API para qualquer
                    sistema. Se sua ferramenta tem API, conectamos em até 5
                    dias úteis.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="accent" size="sm">
                      APIs REST
                    </Badge>
                    <Badge variant="accent" size="sm">
                      Webhooks
                    </Badge>
                    <Badge variant="accent" size="sm">
                      GraphQL
                    </Badge>
                    <Badge variant="accent" size="sm">
                      SOAP
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right side: CTA */}
              <div className="flex-shrink-0">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onCtaClick}
                  className="group/btn whitespace-nowrap"
                  aria-label="Falar com Especialista sobre Integrações Customizadas"
                >
                  Falar com Especialista
                  <ExternalLink
                    className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="font-aeonik-mono text-3xl uppercase text-accent-teal font-semibold">
              24+
            </div>
            <p className="font-inter text-sm text-primary-dark/70">
              Integrações Nativas
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-aeonik-mono text-3xl uppercase text-accent-teal font-semibold">
              5 Dias
            </div>
            <p className="font-inter text-sm text-primary-dark/70">
              Para Integrações Custom
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-aeonik-mono text-3xl uppercase text-accent-teal font-semibold">
              100%
            </div>
            <p className="font-inter text-sm text-primary-dark/70">
              Compatibilidade Garantida
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Integrations;
