import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ Item Interface
 */
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQ Data - 10 perguntas conforme especificação
 */
const FAQ_DATA: FAQItem[] = [
  {
    id: 'pricing',
    question: 'Quanto custa?',
    answer: 'Nossos planos são personalizados de acordo com suas necessidades específicas. Começamos com um diagnóstico gratuito de 30 minutos para entender seu desafio e depois apresentamos uma proposta sob medida em até 48 horas. O investimento varia conforme a complexidade do agente e integrações necessárias.',
  },
  {
    id: 'technical',
    question: 'Preciso conhecimento técnico?',
    answer: 'Não! Toda a parte técnica é responsabilidade nossa. Você só precisa conhecer bem os seus processos de negócio. Nossa equipe de especialistas cuida de toda implementação, configuração e treinamento do agente. Fornecemos um painel intuitivo para você acompanhar resultados.',
  },
  {
    id: 'implementation',
    question: 'Quanto tempo para implementar?',
    answer: 'Garantimos implementação em 14 dias corridos. Nosso processo é: Diagnóstico (30min, grátis) → Design do Agente (3-5 dias) → Desenvolvimento (5-7 dias) → Testes e Ajustes (2-3 dias) → Go-Live. Se não entregarmos no prazo, você ganha o primeiro mês grátis.',
  },
  {
    id: 'availability',
    question: 'Funciona 24h?',
    answer: 'Sim! Seus agentes de IA operam 24 horas por dia, 7 dias por semana, sem pausas, feriados ou ausências. Eles podem atender clientes, processar dados, enviar cobranças ou executar qualquer tarefa configurada, a qualquer momento do dia ou da noite.',
  },
  {
    id: 'errors',
    question: 'E se o agente errar?',
    answer: 'Implementamos múltiplas camadas de segurança: validações automáticas, regras de negócio configuráveis e fallback humano para casos complexos. Além disso, seu especialista dedicado monitora performance e faz ajustes contínuos. Todos os agentes passam por fase de testes rigorosos antes do go-live.',
  },
  {
    id: 'single-agent',
    question: 'Posso começar com apenas um agente?',
    answer: 'Sim, e é o que recomendamos! Começar com um agente focado no seu maior pain point permite validar resultados rapidamente. A maioria dos nossos clientes inicia com um agente (cobrança, atendimento ou qualificação) e depois expande para outras áreas conforme vê os resultados.',
  },
  {
    id: 'integrations',
    question: 'Quais integrações são possíveis?',
    answer: 'Conectamos com praticamente qualquer sistema: WhatsApp, Telegram, Gmail, Outlook, Shopify, WooCommerce, RD Station, HubSpot, Pipedrive, Asaas, Pagar.me, Bling, Conta Azul, Google Workspace, Microsoft 365, Trello, Notion, Tiny, SAP, TOTVS e muito mais. Se tem API, integramos. Se não tem, encontramos uma solução.',
  },
  {
    id: 'security',
    question: 'Meus dados ficam seguros?',
    answer: 'Absolutamente. Seguimos as melhores práticas de segurança e estamos em conformidade com a LGPD. Seus dados são criptografados em trânsito e em repouso. Não compartilhamos informações com terceiros. Você mantém total propriedade e controle sobre seus dados e pode solicitar exportação ou exclusão a qualquer momento.',
  },
  {
    id: 'contract',
    question: 'Tem contrato longo de permanência?',
    answer: 'Não. Nossos contratos são mensais, sem fidelidade obrigatória. Acreditamos em reter clientes por resultados, não por amarras contratuais. Você pode cancelar a qualquer momento com apenas 30 dias de aviso prévio. Nossos clientes ficam porque funciona, não porque são obrigados.',
  },
  {
    id: 'support',
    question: 'Como funciona o suporte?',
    answer: 'Cada projeto tem um especialista dedicado que fica responsável pela evolução contínua do seu agente. Não é um número de suporte genérico - é uma pessoa que conhece seu negócio. Além disso, você tem acesso a nosso time via WhatsApp, email e portal. Respondemos chamados críticos em até 4 horas úteis.',
  },
];

/**
 * FAQ Accordion Item Component
 */
interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b-2 border-primary-dark last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        className="w-full flex items-center justify-between py-6 px-4 text-left hover:bg-neutral-beige/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2"
      >
        <span className="font-aeonik-mono text-lg md:text-xl text-primary-dark pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className="w-6 h-6 text-primary-dark"
            aria-hidden="true"
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: 'easeInOut' },
              opacity: { duration: 0.2, ease: 'easeInOut' },
            }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 pt-2">
              <p className="font-inter text-base md:text-lg text-primary-dark font-light leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * FAQ Section Component
 *
 * Perguntas Frequentes com accordion acessível:
 * - ARIA labels e roles corretos
 * - Navegação por teclado (Enter/Space para toggle)
 * - Animações smooth de abrir/fechar
 * - Ícone rotativo indicando estado
 * - 10 perguntas conforme especificação
 *
 * @example
 * <FAQ />
 *
 * Accessibility:
 * - Keyboard navigation: Tab para navegar, Enter/Space para abrir/fechar
 * - Screen readers: aria-expanded, aria-controls
 * - Focus visible: ring indicator
 */
export const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 md:py-32 bg-background-cream"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-aeonik-mono text-4xl md:text-5xl lg:text-6xl uppercase text-primary-dark mb-4"
          >
            Perguntas Frequentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-inter text-lg md:text-xl text-primary-dark font-light max-w-2xl mx-auto"
          >
            Tire suas dúvidas sobre implementação, segurança e resultados
          </motion.p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border-2 border-primary-dark rounded-[4px] shadow-sm"
          role="region"
          aria-label="Perguntas frequentes"
        >
          {FAQ_DATA.map((item) => (
            <FAQAccordionItem
              key={item.id}
              item={item}
              isOpen={openItems.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </motion.div>

        {/* CTA Below FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="font-inter text-lg text-primary-dark mb-4">
            Não encontrou sua resposta?
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-aeonik-mono uppercase text-sm tracking-button px-[22px] py-[16.5px] bg-transparent text-primary-dark border-2 border-primary-dark rounded-[2px] hover:bg-neutral-beige transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2"
          >
            Falar com Especialista
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
