import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  Shield,
  FileText,
  Lock,
} from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Footer Link Interface
 */
interface FooterLink {
  label: string;
  href: string;
}

/**
 * Footer Column Interface
 */
interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/**
 * Footer Navigation Data - 5 Colunas
 */
const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Sobre',
    links: [
      { label: 'Quem Somos', href: '/sobre' },
      { label: 'Nossa História', href: '/historia' },
      { label: 'Equipe', href: '/equipe' },
    ],
  },
  {
    title: 'Soluções',
    links: [
      { label: 'Por Setor', href: '/solucoes/setores' },
      { label: 'Por Função', href: '/solucoes/funcoes' },
      { label: 'Casos de Sucesso', href: '/casos-sucesso' },
    ],
  },
  {
    title: 'Casos',
    links: [
      { label: 'E-commerce', href: '/casos/ecommerce' },
      { label: 'Serviços', href: '/casos/servicos' },
      { label: 'Indústria', href: '/casos/industria' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Webinars', href: '/webinars' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Documentação', href: '/docs' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Contato', href: '/contato' },
      { label: 'Carreiras', href: '/carreiras' },
      { label: 'Parceiros', href: '/parceiros' },
    ],
  },
];

/**
 * Social Links Data
 */
const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/procex-ai',
    icon: Linkedin,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/procex.ai',
    icon: Instagram,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@procexai',
    icon: Youtube,
  },
];

/**
 * Legal Links Data
 */
const LEGAL_LINKS = [
  { label: 'Privacidade', href: '/privacidade', icon: Shield },
  { label: 'Termos', href: '/termos', icon: FileText },
  { label: 'LGPD', href: '/lgpd', icon: Lock },
];

/**
 * Newsletter Form Component
 */
const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 px-4 py-3 border-2 border-primary-dark rounded-[2px] bg-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal disabled:opacity-50"
          aria-label="Digite seu email para newsletter"
        />
        <Button
          type="submit"
          size="sm"
          disabled={status === 'loading'}
          className="px-4"
        >
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Inscrever-se</span>
        </Button>
      </div>
      {status === 'success' && (
        <p className="text-sm text-accent-teal font-inter">
          Obrigado! Você receberá novidades em breve.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 font-inter">
          Erro ao inscrever. Tente novamente.
        </p>
      )}
    </form>
  );
};

/**
 * Footer Column Component
 */
const FooterColumnComponent: React.FC<{ column: FooterColumn; index: number }> = ({
  column,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <h3 className="font-aeonik-mono text-sm uppercase text-primary-dark mb-4 tracking-wide">
      {column.title}
    </h3>
    <ul className="space-y-3">
      {column.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="font-inter text-sm text-primary-dark/70 hover:text-primary-dark transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:rounded"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </motion.div>
);

/**
 * Footer Component
 *
 * Footer completo com:
 * - Logo e tagline da empresa
 * - 5 colunas de navegação organizada
 * - Links sociais (LinkedIn, Instagram, YouTube)
 * - Newsletter signup inline
 * - Copyright e links legais (Privacidade, Termos, LGPD)
 * - Responsivo (stack em mobile)
 *
 * @example
 * <Footer />
 *
 * Accessibility:
 * - Semantic HTML (footer, nav elements)
 * - ARIA labels para links externos
 * - Focus visible indicators
 * - Screen reader friendly social icons
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-cream border-t-2 border-primary-dark">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <div className="mb-4">
              <h2 className="font-aeonik-mono text-2xl md:text-3xl uppercase text-primary-dark">
                ProceX AI
              </h2>
            </div>

            {/* Tagline */}
            <p className="font-inter text-sm text-primary-dark/70 mb-6 max-w-xs leading-relaxed">
              Conectamos sua PME aos especialistas certos em IA. Agentes
              personalizados em 14 dias.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <label className="font-aeonik-mono text-xs uppercase text-primary-dark mb-3 block tracking-wide">
                Newsletter
              </label>
              <NewsletterForm />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Siga-nos no ${social.name}`}
                  className="w-10 h-10 flex items-center justify-center border-2 border-primary-dark rounded-[2px] text-primary-dark hover:bg-accent-teal hover:text-white hover:border-accent-teal transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Columns */}
          {FOOTER_COLUMNS.map((column, index) => (
            <FooterColumnComponent
              key={column.title}
              column={column}
              index={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-primary-dark bg-neutral-beige/30">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-inter text-sm text-primary-dark/60 text-center md:text-left"
            >
              © {currentYear} ProceX AI. Todos os direitos reservados.
            </motion.p>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-6"
            >
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 font-inter text-sm text-primary-dark/60 hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:rounded"
                >
                  <link.icon className="w-4 h-4" aria-hidden="true" />
                  {link.label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
