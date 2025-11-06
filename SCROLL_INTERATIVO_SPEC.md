# 📋 ESPECIFICAÇÃO TÉCNICA: SCROLL INTERATIVO DE ALTO IMPACTO

## 📌 ÍNDICE
1. [Contexto do Projeto](#contexto-do-projeto)
2. [Objetivos e Requisitos](#objetivos-e-requisitos)
3. [Arquitetura Técnica](#arquitetura-técnica)
4. [Componentes a Implementar](#componentes-a-implementar)
5. [Hooks Customizados](#hooks-customizados)
6. [Integrações e Refatorações](#integrações-e-refatorações)
7. [Ordem de Implementação](#ordem-de-implementação)
8. [Testes e Validação](#testes-e-validação)
9. [Performance e Acessibilidade](#performance-e-acessibilidade)
10. [Código de Referência](#código-de-referência)

---

## 1. CONTEXTO DO PROJETO

### Stack Tecnológica
- **Framework:** Vite 6.0.5 + React 18
- **Linguagem:** TypeScript 5.7.2 (strict mode)
- **Animações:** Framer Motion 11.11.17
- **Styling:** Tailwind CSS 3.4.15 + tailwindcss-animate
- **Icons:** Lucide React 0.460.0
- **Build:** Vite com SWC, chunking manual para react-vendor e framer-motion

### Estrutura Atual
```
/src
├── components/
│   ├── sections/        # 15 seções principais (Hero, Metrics, Testimonials, etc.)
│   ├── ui/              # Componentes UI (Button, Card, Badge, Input)
│   └── common/          # Componentes decorativos (Logo, CloudSmall, Cube3D)
├── hooks/               # (NÃO EXISTE - CRIAR)
├── lib/
│   ├── utils.ts         # cn() class merger
│   └── analytics.ts
├── styles/
│   └── globals.css      # Global styles, scrollbar, custom properties
└── App.tsx              # Main component com dark mode
```

### Padrões de Código Existentes

#### Pattern 1: Animação de Entrada com whileInView
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6 }}
>
```

#### Pattern 2: Staggered Container
```typescript
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
```

#### Pattern 3: useScroll para Header (Header.tsx)
```typescript
const { scrollY } = useScroll();

useEffect(() => {
  const unsubscribe = scrollY.on('change', (latest) => {
    setIsScrolled(latest > 50);
  });
  return unsubscribe;
}, [scrollY]);
```

#### Pattern 4: useInView + useSpring para Counters (Metrics.tsx)
```typescript
const ref = useRef<HTMLSpanElement>(null);
const isInView = useInView(ref, { once: true, margin: '-50px' });

const spring = useSpring(0, {
  stiffness: 50,
  damping: 30,
  restDelta: 0.001,
});

useEffect(() => {
  if (isInView) {
    spring.set(value);
  }
}, [isInView, spring, value]);
```

### Design System
- **Cores Principais:**
  - Primary: `#383838` (dark gray)
  - Accent Teal: `#16AA98`
  - Accent Blue: `#6fc2ff`
  - Neutral Beige: `#F4EFEA`
- **Typography:**
  - Headlines: `font-aeonik-mono` (Space Mono)
  - Body: `font-inter` (Inter)
- **Spacing:** Sistema 4px (4, 8, 12, 16, 24, 32, 48, 64)
- **Border Radius:** Tight (2px-8px)
- **Borders:** 2px solid em componentes principais

---

## 2. OBJETIVOS E REQUISITOS

### Objetivos de UX
1. ✅ Criar feedback visual constante durante o scroll
2. ✅ Adicionar profundidade e dimensionalidade à página
3. ✅ Guiar o usuário através de uma narrativa visual
4. ✅ Aumentar engajamento e tempo na página
5. ✅ Impressionar com micro-interactions de alta qualidade
6. ✅ Manter performance (60fps) em todos os dispositivos

### Requisitos Funcionais
- [ ] Progress bar global indicando scroll da página
- [ ] Parallax em 3 camadas no Hero
- [ ] Seção horizontal scroll com snap
- [ ] Sticky scrollytelling em HowItWorks
- [ ] Text reveal animado em ProblemSolution
- [ ] 3D tilt cards em Testimonials (mouse tracking)
- [ ] SVG path drawing em Metrics
- [ ] Floating action button com scroll-to-top
- [ ] Scroll snap suave entre seções
- [ ] Section transitions com morphing shapes

### Requisitos Não-Funcionais
- Performance: 60fps constantes, GPU-accelerated animations
- Acessibilidade: Respeitar `prefers-reduced-motion`
- Responsividade: Mobile-first, degradação elegante em dispositivos menores
- SEO: Não impactar carregamento inicial ou SSR
- Browser Support: Chrome, Firefox, Safari, Edge (últimas 2 versões)

---

## 3. ARQUITETURA TÉCNICA

### Nova Estrutura de Diretórios
```
/src
├── components/
│   ├── scroll-effects/           # 🆕 CRIAR
│   │   ├── ScrollProgressBar.tsx
│   │   ├── ParallaxContainer.tsx
│   │   ├── HorizontalScrollSection.tsx
│   │   ├── StickyScrollSection.tsx
│   │   ├── TextReveal.tsx
│   │   ├── Card3DTilt.tsx
│   │   ├── AnimatedSVGPath.tsx
│   │   ├── FloatingActionButton.tsx
│   │   ├── SectionTransition.tsx
│   │   └── index.ts
│   ├── sections/
│   │   ├── Hero.tsx              # ♻️ REFATORAR
│   │   ├── HowItWorks.tsx        # ♻️ REFATORAR
│   │   ├── ProblemSolution.tsx   # ♻️ REFATORAR
│   │   ├── Testimonials.tsx      # ♻️ REFATORAR
│   │   ├── Metrics.tsx           # ♻️ EXPANDIR
│   │   ├── FeaturesShowcase.tsx  # 🆕 CRIAR
│   │   └── ...
├── hooks/                         # 🆕 CRIAR
│   ├── useScrollProgress.ts
│   ├── useParallax.ts
│   ├── useHorizontalScroll.ts
│   ├── use3DTilt.ts
│   ├── useTextReveal.ts
│   ├── useReducedMotion.ts
│   └── index.ts
├── lib/
│   ├── scroll-utils.ts           # 🆕 CRIAR
│   └── ...
└── styles/
    ├── globals.css               # ♻️ EXPANDIR
    └── scroll-animations.css     # 🆕 CRIAR
```

### Dependências Framer Motion Utilizadas
```typescript
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useVelocity,
  MotionValue,
  Variants,
} from 'framer-motion';
```

---

## 4. COMPONENTES A IMPLEMENTAR

---

### 4.1 ScrollProgressBar.tsx

**Localização:** `/src/components/scroll-effects/ScrollProgressBar.tsx`

**Descrição:** Barra de progresso fixa no topo da página que preenche conforme o scroll

**Props:**
```typescript
interface ScrollProgressBarProps {
  className?: string;
  color?: 'gradient' | 'teal' | 'blue';
  height?: number;
}
```

**Implementação Completa:**
```typescript
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressBarProps {
  className?: string;
  color?: 'gradient' | 'teal' | 'blue';
  height?: number;
}

/**
 * Barra de progresso global que indica o scroll da página
 * Fixada no topo, preenche de 0% a 100% conforme o usuário rola
 */
export function ScrollProgressBar({
  className,
  color = 'gradient',
  height = 3,
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();

  // Spring para suavizar movimento
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const colorClasses = {
    gradient: 'bg-gradient-to-r from-accent-teal to-button-blue',
    teal: 'bg-accent-teal',
    blue: 'bg-button-blue',
  };

  return (
    <motion.div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 origin-left',
        colorClasses[color],
        className
      )}
      style={{
        scaleX,
        height: `${height}px`,
      }}
    />
  );
}
```

**Integração:**
- Adicionar em `App.tsx` no nível mais alto (antes do Header)
```typescript
// App.tsx
import { ScrollProgressBar } from '@/components/scroll-effects';

function App() {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      {/* rest of the app */}
    </>
  );
}
```

**Tailwind Classes Necessárias:**
- Já existem no projeto: `bg-accent-teal`, `bg-button-blue`
- Adicionar em `tailwind.config.js` se necessário:
```javascript
theme: {
  extend: {
    colors: {
      'accent-teal': '#16AA98',
      'button-blue': '#6fc2ff',
    },
  },
}
```

---

### 4.2 ParallaxContainer.tsx

**Localização:** `/src/components/scroll-effects/ParallaxContainer.tsx`

**Descrição:** Container que aplica efeito parallax baseado em scroll (múltiplas velocidades)

**Props:**
```typescript
interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number; // 0 = sem movimento, 1 = scroll normal, 0.5 = metade da velocidade
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}
```

**Implementação Completa:**
```typescript
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: [string, string]; // ["start end", "end start"] por padrão
}

/**
 * Container que aplica efeito parallax baseado em scroll
 * Speed: 0 (sem movimento) até 1 (movimento normal)
 * Valores negativos invertem a direção
 */
export function ParallaxContainer({
  children,
  speed = 0.5,
  direction = 'up',
  className,
  offset = ['start end', 'end start'],
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  // Calcular range baseado em velocidade
  const range = 100 * speed;

  // Mapear direção para transformação
  const transforms = {
    up: useTransform(scrollYProgress, [0, 1], [0, -range]),
    down: useTransform(scrollYProgress, [0, 1], [0, range]),
    left: useTransform(scrollYProgress, [0, 1], [0, -range]),
    right: useTransform(scrollYProgress, [0, 1], [0, range]),
  };

  const styleMap = {
    up: { y: transforms.up },
    down: { y: transforms.down },
    left: { x: transforms.left },
    right: { x: transforms.right },
  };

  return (
    <motion.div
      ref={ref}
      style={styleMap[direction]}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

**Uso em Hero.tsx:**
```typescript
// Hero.tsx - EXEMPLO DE USO
import { ParallaxContainer } from '@/components/scroll-effects';

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Layer - Slow */}
      <ParallaxContainer speed={0.2} direction="down" className="absolute inset-0">
        <CloudLarge className="opacity-20" />
      </ParallaxContainer>

      {/* Midground Layer - Medium */}
      <ParallaxContainer speed={0.5} direction="up" className="absolute inset-0">
        <Diamond className="absolute top-1/4 right-1/4" />
      </ParallaxContainer>

      {/* Foreground Layer - Fast */}
      <ParallaxContainer speed={0.8} direction="up" className="relative z-10">
        <h1>Hero Content</h1>
      </ParallaxContainer>

      {/* 3D Element - Rotation */}
      <ParallaxContainer speed={1} direction="up">
        <Cube3D className="animate-spin-slow" />
      </ParallaxContainer>
    </section>
  );
}
```

---

### 4.3 HorizontalScrollSection.tsx

**Localização:** `/src/components/scroll-effects/HorizontalScrollSection.tsx`

**Descrição:** Seção que rola horizontalmente baseada no scroll vertical

**Props:**
```typescript
interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  cardWidth?: number; // largura de cada card em px
}
```

**Implementação Completa:**
```typescript
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Seção que rola horizontalmente conforme scroll vertical
 * Ideal para showcases de produtos/features
 *
 * Uso:
 * <HorizontalScrollSection>
 *   <div className="flex gap-8">
 *     <Card />
 *     <Card />
 *     <Card />
 *   </div>
 * </HorizontalScrollSection>
 */
export function HorizontalScrollSection({
  children,
  className,
}: HorizontalScrollSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // Transformar scroll Y em movimento X
  // Ajustar valores baseado no conteúdo
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <div ref={targetRef} className={cn('relative h-[300vh]', className)}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-8 px-[10vw]"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
```

**Componente FeaturesShowcase.tsx (NOVO):**
```typescript
// /src/components/sections/FeaturesShowcase.tsx
import { HorizontalScrollSection } from '@/components/scroll-effects';
import { Card } from '@/components/ui';
import { Zap, Shield, Rocket, Brain, Users, Target } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Performance Otimizada',
    description: 'Carregamento instantâneo com edge computing',
    color: 'text-yellow-500',
  },
  {
    icon: Shield,
    title: 'Segurança Enterprise',
    description: 'Criptografia end-to-end e compliance',
    color: 'text-accent-teal',
  },
  {
    icon: Rocket,
    title: 'Deploy em Minutos',
    description: 'Setup automatizado e zero configuração',
    color: 'text-button-blue',
  },
  {
    icon: Brain,
    title: 'IA Integrada',
    description: 'Machine learning para insights automáticos',
    color: 'text-purple-500',
  },
  {
    icon: Users,
    title: 'Colaboração Real-time',
    description: 'Edição simultânea e sincronização',
    color: 'text-green-500',
  },
  {
    icon: Target,
    title: 'Analytics Avançado',
    description: 'Métricas detalhadas e dashboards',
    color: 'text-red-500',
  },
];

export function FeaturesShowcase() {
  return (
    <section className="bg-primary text-neutral-50">
      <div className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-aeonik-mono text-4xl font-bold mb-4 text-center">
            FEATURES QUE IMPRESSIONAM
          </h2>
          <p className="text-neutral-50/70 text-center mb-16 max-w-2xl mx-auto">
            Role horizontalmente para explorar todas as capacidades
          </p>
        </div>

        <HorizontalScrollSection>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                variant="elevated"
                className="min-w-[400px] h-[400px] p-8 flex flex-col justify-between bg-neutral-50 dark:bg-neutral-900"
              >
                <div>
                  <Icon className={cn('w-16 h-16 mb-6', feature.color)} />
                  <h3 className="font-aeonik-mono text-2xl font-bold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
                <div className="text-sm text-neutral-500">
                  Feature {index + 1} de {features.length}
                </div>
              </Card>
            );
          })}
        </HorizontalScrollSection>
      </div>
    </section>
  );
}
```

**Adicionar em App.tsx:**
```typescript
import { FeaturesShowcase } from '@/components/sections';

// Inserir entre UseCases e HowItWorks
<UseCases />
<FeaturesShowcase />
<HowItWorks />
```

---

### 4.4 StickyScrollSection.tsx

**Localização:** `/src/components/scroll-effects/StickyScrollSection.tsx`

**Descrição:** Seção com conteúdo sticky à esquerda e visual interativo à direita

**Props:**
```typescript
interface StickyScrollItem {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;
}

interface StickyScrollSectionProps {
  items: StickyScrollItem[];
  className?: string;
}
```

**Implementação Completa:**
```typescript
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StickyScrollItem {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;
}

interface StickyScrollSectionProps {
  items: StickyScrollItem[];
  className?: string;
}

/**
 * Seção sticky scrollytelling
 * Lado esquerdo: Conteúdo que destaca conforme scroll
 * Lado direito: Visual que muda para cada item
 *
 * Ideal para: How it Works, Features detalhadas, Processos
 */
export function StickyScrollSection({
  items,
  className,
}: StickyScrollSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Calcular qual item está ativo baseado no progresso
      const index = Math.min(
        Math.floor(latest * items.length),
        items.length - 1
      );
      setActiveIndex(index);
    });

    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  return (
    <div
      ref={targetRef}
      className={cn('relative', className)}
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0.3,
                    scale: activeIndex === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'p-8 border-2 border-primary rounded-lg',
                    activeIndex === index && 'bg-accent-teal/10'
                  )}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center font-aeonik-mono font-bold',
                        activeIndex === index
                          ? 'bg-accent-teal text-white'
                          : 'bg-neutral-200 text-neutral-600'
                      )}
                    >
                      {index + 1}
                    </div>
                    <h3 className="font-aeonik-mono text-2xl font-bold">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Visual */}
            <div className="relative h-[600px]">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {item.visual}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  activeIndex === index
                    ? 'bg-accent-teal w-8'
                    : 'bg-neutral-300'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Refatorar HowItWorks.tsx:**
```typescript
// /src/components/sections/HowItWorks.tsx - REFATORADO
import { StickyScrollSection } from '@/components/scroll-effects';
import { Search, Target, Zap, CheckCircle, Rocket } from 'lucide-react';

const steps = [
  {
    id: 'step-1',
    title: 'Conecte suas Fontes',
    description:
      'Integre todas as suas ferramentas em minutos. APIs, bancos de dados, planilhas - tudo em um só lugar.',
    visual: (
      <div className="w-full h-full flex items-center justify-center bg-accent-teal/10 rounded-2xl">
        <Search className="w-32 h-32 text-accent-teal" />
      </div>
    ),
  },
  {
    id: 'step-2',
    title: 'Configure Automações',
    description:
      'Arraste e solte para criar workflows inteligentes. Sem código, sem complexidade.',
    visual: (
      <div className="w-full h-full flex items-center justify-center bg-button-blue/10 rounded-2xl">
        <Target className="w-32 h-32 text-button-blue" />
      </div>
    ),
  },
  {
    id: 'step-3',
    title: 'Ative e Monitore',
    description:
      'Deploy instantâneo. Acompanhe métricas em tempo real e otimize continuamente.',
    visual: (
      <div className="w-full h-full flex items-center justify-center bg-purple-500/10 rounded-2xl">
        <Zap className="w-32 h-32 text-purple-500" />
      </div>
    ),
  },
  {
    id: 'step-4',
    title: 'Valide Resultados',
    description:
      'Dashboards automáticos com insights acionáveis. Dados que realmente importam.',
    visual: (
      <div className="w-full h-full flex items-center justify-center bg-green-500/10 rounded-2xl">
        <CheckCircle className="w-32 h-32 text-green-500" />
      </div>
    ),
  },
  {
    id: 'step-5',
    title: 'Escale sem Limites',
    description:
      'De 10 a 10 milhões de operações. Infraestrutura que cresce com você.',
    visual: (
      <div className="w-full h-full flex items-center justify-center bg-red-500/10 rounded-2xl">
        <Rocket className="w-32 h-32 text-red-500" />
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-neutral-50 dark:bg-neutral-900">
      <div className="py-24">
        <div className="container mx-auto px-4 mb-16 text-center">
          <h2 className="font-aeonik-mono text-5xl font-bold mb-4">
            COMO FUNCIONA
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Um processo simples e poderoso que transforma sua operação
          </p>
        </div>

        <StickyScrollSection items={steps} />
      </div>
    </section>
  );
}
```

---

### 4.5 TextReveal.tsx

**Localização:** `/src/components/scroll-effects/TextReveal.tsx`

**Descrição:** Texto que revela palavra por palavra com animação

**Props:**
```typescript
interface TextRevealProps {
  children: string;
  className?: string;
  highlightWords?: string[]; // palavras para destacar
  staggerDelay?: number;
}
```

**Implementação Completa:**
```typescript
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: string;
  className?: string;
  highlightWords?: string[];
  staggerDelay?: number;
}

/**
 * Componente que revela texto palavra por palavra
 * Suporta highlight de palavras-chave
 *
 * Uso:
 * <TextReveal highlightWords={['inovação', 'sucesso']}>
 *   Transforme sua empresa com inovação e alcance o sucesso
 * </TextReveal>
 */
export function TextReveal({
  children,
  className,
  highlightWords = [],
  staggerDelay = 0.05,
}: TextRevealProps) {
  const words = children.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn('', className)}
    >
      {words.map((word, index) => {
        const isHighlight = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={cn(
              'inline-block mr-2',
              isHighlight && 'text-accent-teal font-bold'
            )}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
```

**Refatorar ProblemSolution.tsx:**
```typescript
// /src/components/sections/ProblemSolution.tsx - EXEMPLO DE USO
import { TextReveal } from '@/components/scroll-effects';

export function ProblemSolution() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <TextReveal
          className="font-aeonik-mono text-4xl md:text-5xl leading-relaxed"
          highlightWords={['complexidade', 'simplicidade', 'automação']}
        >
          Transformamos complexidade em simplicidade através de automação
          inteligente que realmente funciona para sua empresa
        </TextReveal>
      </div>
    </section>
  );
}
```

---

### 4.6 Card3DTilt.tsx

**Localização:** `/src/components/scroll-effects/Card3DTilt.tsx`

**Descrição:** Card com efeito 3D tilt baseado em posição do mouse

**Props:**
```typescript
interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // 0-1, padrão 0.5
}
```

**Implementação Completa:**
```typescript
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * Card com efeito 3D tilt seguindo o mouse
 * Intensity: 0 (sem efeito) até 1 (efeito máximo)
 *
 * Uso:
 * <Card3DTilt intensity={0.5}>
 *   <Card>Conteúdo aqui</Card>
 * </Card3DTilt>
 */
export function Card3DTilt({
  children,
  className,
  intensity = 0.5,
}: Card3DTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

  const maxRotation = 15 * intensity;

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [maxRotation, -maxRotation]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [-maxRotation, maxRotation]
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn('relative', className)}
    >
      <div style={{ transform: 'translateZ(50px)' }}>{children}</div>
    </motion.div>
  );
}
```

**Refatorar Testimonials.tsx:**
```typescript
// /src/components/sections/Testimonials.tsx - EXEMPLO DE USO
import { Card3DTilt } from '@/components/scroll-effects';
import { Card } from '@/components/ui';

export function Testimonials() {
  const testimonials = [
    {
      name: 'João Silva',
      role: 'CTO @ TechCorp',
      content: 'Revolucionou nossa operação...',
      avatar: '/avatars/joao.jpg',
    },
    // ... outros testimonials
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card3DTilt key={testimonial.name} intensity={0.3}>
              <Card variant="elevated" className="p-8">
                <p className="text-lg mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-neutral-600">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 4.7 AnimatedSVGPath.tsx

**Localização:** `/src/components/scroll-effects/AnimatedSVGPath.tsx`

**Descrição:** SVG path que desenha conforme entra na viewport

**Props:**
```typescript
interface AnimatedSVGPathProps {
  d: string; // SVG path data
  className?: string;
  strokeWidth?: number;
  strokeColor?: string;
  duration?: number;
  delay?: number;
}
```

**Implementação Completa:**
```typescript
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSVGPathProps {
  d: string;
  className?: string;
  strokeWidth?: number;
  strokeColor?: string;
  duration?: number;
  delay?: number;
  viewBox?: string;
}

/**
 * SVG Path que anima desenhando de 0% a 100%
 * Ativa quando entra na viewport
 *
 * Uso:
 * <AnimatedSVGPath
 *   d="M10 10 L90 90"
 *   strokeColor="#16AA98"
 *   strokeWidth={2}
 * />
 */
export function AnimatedSVGPath({
  d,
  className,
  strokeWidth = 2,
  strokeColor = '#16AA98',
  duration = 2,
  delay = 0,
  viewBox = '0 0 100 100',
}: AnimatedSVGPathProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={cn('w-full h-full', className)}
    >
      <motion.path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: { duration, delay, ease: 'easeInOut' },
          opacity: { duration: 0.3, delay },
        }}
      />
    </svg>
  );
}
```

**Componente MetricWithSVG (exemplo):**
```typescript
// Adicionar em Metrics.tsx
import { AnimatedSVGPath } from '@/components/scroll-effects';

export function MetricWithIcon({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative">
      {/* Background SVG Animation */}
      <div className="absolute inset-0 opacity-20">
        <AnimatedSVGPath
          d="M10,50 Q30,10 50,50 T90,50"
          strokeColor="#16AA98"
          strokeWidth={3}
          duration={1.5}
        />
      </div>

      {/* Metric Content */}
      <div className="relative z-10 text-center p-8">
        <AnimatedCounter value={parseFloat(value)} decimals={0} />
        <p className="text-sm text-neutral-600 mt-2">{label}</p>
      </div>
    </div>
  );
}
```

---

### 4.8 FloatingActionButton.tsx

**Localização:** `/src/components/scroll-effects/FloatingActionButton.tsx`

**Descrição:** Botão flutuante que aparece após scroll e volta ao topo

**Props:**
```typescript
interface FloatingActionButtonProps {
  showAfter?: number; // pixels de scroll antes de aparecer
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}
```

**Implementação Completa:**
```typescript
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  showAfter?: number;
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

/**
 * Floating Action Button com scroll-to-top
 * Aparece após X pixels de scroll
 * Inclui progress ring indicando scroll da página
 */
export function FloatingActionButton({
  showAfter = 300,
  position = 'bottom-right',
  className,
}: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  const circumference = 2 * Math.PI * 20; // raio 20
  const strokeDashoffset = useSpring(
    useTransform(scrollYProgress, [0, 1], [circumference, 0]),
    { stiffness: 100, damping: 30 }
  );

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > showAfter);
    });

    return () => unsubscribe();
  }, [scrollY, showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className={cn(
        'fixed z-40 w-14 h-14 rounded-full bg-accent-teal text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300',
        positionClasses[position],
        className
      )}
      aria-label="Voltar ao topo"
    >
      {/* Progress Ring */}
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
      </svg>

      {/* Arrow Icon */}
      <ArrowUp className="absolute inset-0 m-auto w-6 h-6" />
    </motion.button>
  );
}
```

**Integração em App.tsx:**
```typescript
// App.tsx
import { FloatingActionButton } from '@/components/scroll-effects';

function App() {
  return (
    <>
      {/* ... rest of app */}
      <FloatingActionButton showAfter={300} position="bottom-right" />
    </>
  );
}
```

---

### 4.9 SectionTransition.tsx

**Localização:** `/src/components/scroll-effects/SectionTransition.tsx`

**Descrição:** Transição visual suave entre seções

**Props:**
```typescript
interface SectionTransitionProps {
  variant?: 'wave' | 'diagonal' | 'curve';
  color?: string;
  className?: string;
}
```

**Implementação Completa:**
```typescript
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTransitionProps {
  variant?: 'wave' | 'diagonal' | 'curve';
  color?: string;
  className?: string;
}

/**
 * Transição decorativa entre seções
 * Adiciona movimento sutil e separação visual
 */
export function SectionTransition({
  variant = 'wave',
  color = '#16AA98',
  className,
}: SectionTransitionProps) {
  const paths = {
    wave: 'M0,50 Q250,0 500,50 T1000,50 L1000,100 L0,100 Z',
    diagonal: 'M0,0 L1000,50 L1000,100 L0,100 Z',
    curve: 'M0,0 Q500,100 1000,0 L1000,100 L0,100 Z',
  };

  return (
    <div className={cn('relative h-24 overflow-hidden', className)}>
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <motion.path
          d={paths[variant]}
          fill={color}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </svg>
    </div>
  );
}
```

**Uso entre seções:**
```typescript
// App.tsx ou entre sections
<Hero />
<SectionTransition variant="wave" color="#16AA98" />
<SocialProof />
<SectionTransition variant="diagonal" color="#6fc2ff" />
<ProblemSolution />
```

---

## 5. HOOKS CUSTOMIZADOS

**Localização:** `/src/hooks/`

### 5.1 useScrollProgress.ts
```typescript
import { useScroll, useSpring, MotionValue } from 'framer-motion';

/**
 * Hook que retorna progresso de scroll suavizado
 * Útil para progress bars e indicadores
 */
export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return smoothProgress;
}
```

### 5.2 useParallax.ts
```typescript
import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, RefObject } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: [string, string];
}

/**
 * Hook para criar efeito parallax em elemento
 *
 * @param speed - Velocidade do parallax (0-1)
 * @param direction - Direção do movimento
 * @returns [ref, motionValue]
 */
export function useParallax({
  speed = 0.5,
  direction = 'up',
  offset = ['start end', 'end start'],
}: UseParallaxOptions = {}): [RefObject<HTMLDivElement>, MotionValue<number>] {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const range = 100 * speed;
  const isVertical = direction === 'up' || direction === 'down';
  const isNegative = direction === 'up' || direction === 'left';

  const outputRange: [number, number] = isNegative
    ? [0, -range]
    : [0, range];

  const motionValue = useTransform(scrollYProgress, [0, 1], outputRange);

  return [ref, motionValue];
}
```

### 5.3 useHorizontalScroll.ts
```typescript
import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, RefObject } from 'react';

/**
 * Hook para converter scroll vertical em horizontal
 *
 * @returns [ref, x position]
 */
export function useHorizontalScroll(): [
  RefObject<HTMLDivElement>,
  MotionValue<string>
] {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return [targetRef, x];
}
```

### 5.4 use3DTilt.ts
```typescript
import {
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { useRef, MouseEvent, RefObject } from 'react';

interface Use3DTiltReturn {
  ref: RefObject<HTMLDivElement>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  handleMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
}

/**
 * Hook para criar efeito 3D tilt seguindo mouse
 *
 * @param intensity - Intensidade do tilt (0-1)
 * @returns Ref, valores de rotação e handlers
 */
export function use3DTilt(intensity: number = 0.5): Use3DTiltReturn {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

  const maxRotation = 15 * intensity;

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [maxRotation, -maxRotation]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [-maxRotation, maxRotation]
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave };
}
```

### 5.5 useReducedMotion.ts
```typescript
import { useState, useEffect } from 'react';

/**
 * Hook que detecta preferência de movimento reduzido
 * Respeita configuração de acessibilidade do SO
 *
 * @returns boolean indicando se deve reduzir animações
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
```

### 5.6 index.ts (barrel export)
```typescript
// /src/hooks/index.ts
export { useScrollProgress } from './useScrollProgress';
export { useParallax } from './useParallax';
export { useHorizontalScroll } from './useHorizontalScroll';
export { use3DTilt } from './use3DTilt';
export { useReducedMotion } from './useReducedMotion';
```

---

## 6. INTEGRAÇÕES E REFATORAÇÕES

### 6.1 App.tsx - Integração Global

```typescript
// /src/App.tsx - ADICIONAR COMPONENTES GLOBAIS
import { ScrollProgressBar, FloatingActionButton } from '@/components/scroll-effects';
import { useReducedMotion } from '@/hooks';

function App() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('min-h-screen', prefersReducedMotion && 'reduce-motion')}>
      {/* Progress Bar Global */}
      <ScrollProgressBar color="gradient" height={3} />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero />
        <SocialProof />
        <ProblemSolution />
        <Differentials />
        <UseCases />

        {/* NOVA SEÇÃO: Horizontal Scroll */}
        <FeaturesShowcase />

        {/* HowItWorks REFATORADO com Sticky Scroll */}
        <HowItWorks />

        <Testimonials />
        <Personas />
        <Integrations />
        <Metrics />
        <FAQ />
        <CTAFinal />
      </main>

      <Footer />

      {/* Floating Action Button */}
      <FloatingActionButton showAfter={300} position="bottom-right" />
    </div>
  );
}
```

### 6.2 globals.css - Adicionar Estilos

```css
/* /src/styles/globals.css - ADICIONAR NO FINAL */

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

/* Scroll Snap */
.scroll-snap-container {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: scroll;
}

.scroll-snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}

/* Reduced Motion Support */
.reduce-motion * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* GPU Acceleration for Scroll Elements */
.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}

/* Smooth Transforms */
.smooth-transform {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Horizontal Scroll Optimization */
.horizontal-scroll-container {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.horizontal-scroll-container::-webkit-scrollbar {
  display: none;
}

/* 3D Transform Context */
.preserve-3d {
  transform-style: preserve-3d;
}

.perspective-1000 {
  perspective: 1000px;
}

/* Custom Scrollbar Refinement */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(244, 239, 234, 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #16AA98;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #128A7A;
}
```

### 6.3 scroll-effects/index.ts - Barrel Export

```typescript
// /src/components/scroll-effects/index.ts
export { ScrollProgressBar } from './ScrollProgressBar';
export { ParallaxContainer } from './ParallaxContainer';
export { HorizontalScrollSection } from './HorizontalScrollSection';
export { StickyScrollSection } from './StickyScrollSection';
export { TextReveal } from './TextReveal';
export { Card3DTilt } from './Card3DTilt';
export { AnimatedSVGPath } from './AnimatedSVGPath';
export { FloatingActionButton } from './FloatingActionButton';
export { SectionTransition } from './SectionTransition';
```

---

## 7. ORDEM DE IMPLEMENTAÇÃO

### FASE 1: FUNDAÇÃO (30-40 min)
Componentes básicos que entregam impacto imediato

#### Task 1.1: Criar estrutura de diretórios
```bash
mkdir -p src/components/scroll-effects
mkdir -p src/hooks
touch src/components/scroll-effects/index.ts
touch src/hooks/index.ts
```

#### Task 1.2: Implementar hooks básicos
- [ ] `useScrollProgress.ts`
- [ ] `useReducedMotion.ts`
- [ ] `hooks/index.ts`

#### Task 1.3: ScrollProgressBar
- [ ] Criar `ScrollProgressBar.tsx`
- [ ] Integrar em `App.tsx`
- [ ] Testar em diferentes tamanhos de tela

#### Task 1.4: FloatingActionButton
- [ ] Criar `FloatingActionButton.tsx`
- [ ] Integrar em `App.tsx`
- [ ] Testar scroll-to-top

#### Task 1.5: Adicionar estilos globais
- [ ] Adicionar CSS scroll animations em `globals.css`
- [ ] Testar `prefers-reduced-motion`

**VALIDAÇÃO FASE 1:**
- ✅ Progress bar aparece no topo e preenche conforme scroll
- ✅ FAB aparece após 300px de scroll
- ✅ FAB volta ao topo suavemente ao clicar
- ✅ Animações desabilitadas com reduced motion

---

### FASE 2: PARALLAX & TEXT EFFECTS (40-50 min)

#### Task 2.1: Implementar hooks parallax
- [ ] `useParallax.ts`
- [ ] Testar com elemento dummy

#### Task 2.2: ParallaxContainer
- [ ] Criar `ParallaxContainer.tsx`
- [ ] Testar com diferentes speeds e direções

#### Task 2.3: Refatorar Hero com Parallax
- [ ] Adicionar 3 camadas de parallax
- [ ] Ajustar velocidades (0.2, 0.5, 0.8)
- [ ] Testar responsividade

#### Task 2.4: TextReveal
- [ ] Criar `TextReveal.tsx`
- [ ] Implementar split de palavras
- [ ] Adicionar highlight

#### Task 2.5: Refatorar ProblemSolution
- [ ] Integrar `TextReveal`
- [ ] Definir palavras-chave para highlight
- [ ] Ajustar timing

**VALIDAÇÃO FASE 2:**
- ✅ Hero tem profundidade 3D com camadas em diferentes velocidades
- ✅ Texto revela palavra por palavra
- ✅ Palavras-chave destacadas em teal
- ✅ Performance mantida (60fps)

---

### FASE 3: HORIZONTAL SCROLL (30-40 min)

#### Task 3.1: Implementar hook horizontal
- [ ] `useHorizontalScroll.ts`

#### Task 3.2: HorizontalScrollSection
- [ ] Criar `HorizontalScrollSection.tsx`
- [ ] Implementar scroll mapping (Y → X)
- [ ] Adicionar sticky container

#### Task 3.3: FeaturesShowcase (nova seção)
- [ ] Criar `sections/FeaturesShowcase.tsx`
- [ ] Adicionar 6 feature cards
- [ ] Integrar icons do Lucide
- [ ] Estilizar com design system

#### Task 3.4: Integrar em App.tsx
- [ ] Adicionar entre UseCases e HowItWorks
- [ ] Testar scroll vertical → horizontal
- [ ] Ajustar altura da seção

**VALIDAÇÃO FASE 3:**
- ✅ Seção rola horizontalmente ao scroll vertical
- ✅ Cards visíveis e bem espaçados
- ✅ Transição suave entre seções
- ✅ Mobile responsivo (fallback para vertical)

---

### FASE 4: STICKY SCROLLYTELLING (35-45 min)

#### Task 4.1: StickyScrollSection
- [ ] Criar `StickyScrollSection.tsx`
- [ ] Implementar lógica de active index
- [ ] Adicionar progress indicator
- [ ] Criar layout two-column

#### Task 4.2: Refatorar HowItWorks
- [ ] Adaptar steps para formato StickyScrollItem
- [ ] Criar visuals para cada step (ícones Lucide)
- [ ] Integrar StickyScrollSection
- [ ] Remover implementação antiga

#### Task 4.3: Ajustes visuais
- [ ] Estilizar highlight do step ativo
- [ ] Adicionar transições suaves
- [ ] Testar em mobile (fallback para stack vertical)

**VALIDAÇÃO FASE 4:**
- ✅ Steps destacam conforme scroll
- ✅ Visual à direita muda para cada step
- ✅ Progress indicator funciona
- ✅ Layout responsivo

---

### FASE 5: 3D EFFECTS (30-40 min)

#### Task 5.1: Implementar hook 3D
- [ ] `use3DTilt.ts`
- [ ] Testar tracking do mouse

#### Task 5.2: Card3DTilt
- [ ] Criar `Card3DTilt.tsx`
- [ ] Implementar perspective 3D
- [ ] Adicionar spring smoothing

#### Task 5.3: Refatorar Testimonials
- [ ] Envolver cards com Card3DTilt
- [ ] Ajustar intensity (0.3)
- [ ] Testar em diferentes browsers

#### Task 5.4: Polimento
- [ ] Adicionar transform-style preserve-3d
- [ ] Otimizar para mobile (desabilitar ou reduzir)

**VALIDAÇÃO FASE 5:**
- ✅ Cards inclinam seguindo mouse
- ✅ Movimento suave e natural
- ✅ Volta à posição original ao sair
- ✅ Performance OK (sem jank)

---

### FASE 6: SVG ANIMATIONS (25-35 min)

#### Task 6.1: AnimatedSVGPath
- [ ] Criar `AnimatedSVGPath.tsx`
- [ ] Implementar pathLength animation
- [ ] Adicionar inView trigger

#### Task 6.2: Expandir Metrics
- [ ] Criar SVG paths decorativos
- [ ] Integrar com counters existentes
- [ ] Sincronizar timings

#### Task 6.3: Testar visuals
- [ ] Validar viewBox
- [ ] Ajustar cores (gradient?)
- [ ] Testar performance

**VALIDAÇÃO FASE 6:**
- ✅ SVG desenha de 0% a 100%
- ✅ Sincronizado com números
- ✅ Smooth animation
- ✅ Não impacta performance

---

### FASE 7: TRANSITIONS & POLISH (20-30 min)

#### Task 7.1: SectionTransition
- [ ] Criar `SectionTransition.tsx`
- [ ] Implementar 3 variantes (wave, diagonal, curve)
- [ ] Testar responsividade

#### Task 7.2: Adicionar entre seções
- [ ] Inserir SectionTransition entre Hero e SocialProof
- [ ] Adicionar mais 2-3 transições estratégicas
- [ ] Variar cores e estilos

#### Task 7.3: Polish final
- [ ] Revisar todos os timings
- [ ] Verificar consistency de animações
- [ ] Ajustar z-index se necessário
- [ ] Validar em dark mode

**VALIDAÇÃO FASE 7:**
- ✅ Transições sutis e elegantes
- ✅ Cores alinhadas com design system
- ✅ Não distraem do conteúdo
- ✅ Funcionam em dark mode

---

### FASE 8: TESTING & OPTIMIZATION (30-40 min)

#### Task 8.1: Performance profiling
- [ ] Chrome DevTools Performance tab
- [ ] Validar 60fps em scroll
- [ ] Identificar repaints desnecessários
- [ ] Adicionar `will-change` onde necessário

#### Task 8.2: Cross-browser testing
- [ ] Chrome (desktop/mobile)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Edge

#### Task 8.3: Accessibility audit
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Focus indicators
- [ ] Reduced motion compliance

#### Task 8.4: Responsive validation
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Ultra-wide (1920px+)

**VALIDAÇÃO FASE 8:**
- ✅ 60fps constantes em todos os devices
- ✅ Funciona em Chrome, Firefox, Safari, Edge
- ✅ Acessível via teclado e screen readers
- ✅ Responsivo em todos os breakpoints

---

## 8. TESTES E VALIDAÇÃO

### Checklist de Validação por Componente

#### ScrollProgressBar
```
[ ] Aparece fixada no topo
[ ] Preenche de 0% a 100% conforme scroll
[ ] Spring smooth (sem jank)
[ ] Gradient renderiza corretamente
[ ] Não interfere com Header
[ ] Z-index correto (acima de tudo)
```

#### ParallaxContainer & Hero
```
[ ] 3 camadas com velocidades diferentes
[ ] Background se move mais devagar que foreground
[ ] Não causa layout shift
[ ] Performance 60fps
[ ] Funciona em mobile (ou desabilitado elegantemente)
[ ] CloudLarge, Diamond, Cube3D se movem corretamente
```

#### HorizontalScrollSection & FeaturesShowcase
```
[ ] Scroll vertical aciona movimento horizontal
[ ] Cards visíveis e bem espaçados
[ ] Sticky container funciona
[ ] Não quebra em mobile
[ ] Transição suave ao entrar/sair da seção
[ ] 6 feature cards renderizam
```

#### StickyScrollSection & HowItWorks
```
[ ] Steps destacam conforme scroll
[ ] Visual à direita muda
[ ] Progress indicator sincronizado
[ ] Altura da seção calculada corretamente (steps * 100vh)
[ ] Layout responsivo em mobile
[ ] Transições suaves entre steps
```

#### TextReveal & ProblemSolution
```
[ ] Palavras aparecem uma por uma
[ ] Timing adequado (não muito rápido/lento)
[ ] Highlight words em teal
[ ] Não causa reflow
[ ] Legível em todos os tamanhos
```

#### Card3DTilt & Testimonials
```
[ ] Cards inclinam seguindo mouse
[ ] Volta à posição ao sair
[ ] Movimento suave (spring)
[ ] Não quebra layout
[ ] Funciona em todos os cards
[ ] Mobile: desabilitado ou reduzido
```

#### AnimatedSVGPath & Metrics
```
[ ] Path desenha de 0% a 100%
[ ] Trigger no inView
[ ] Sincronizado com counters
[ ] Cores corretas
[ ] viewBox apropriado
```

#### FloatingActionButton
```
[ ] Aparece após 300px de scroll
[ ] Progress ring preenche
[ ] Clique volta ao topo suavemente
[ ] Hover state funciona
[ ] Z-index acima de tudo
[ ] Acessível via teclado
```

#### SectionTransition
```
[ ] 3 variantes renderizam
[ ] Opacidade sutil (não domina)
[ ] Responsivo
[ ] Cores alinhadas com design system
```

### Performance Benchmarks

**Métricas Alvo:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- **Scroll Performance: 60fps constantes**

**Ferramentas:**
- Chrome DevTools > Performance
- Lighthouse CI
- WebPageTest
- React DevTools Profiler

### Accessibility Checklist

```
[ ] prefers-reduced-motion respeitado
[ ] Todos os botões têm aria-labels
[ ] Foco visível em elementos interativos
[ ] Contrast ratios WCAG AA (4.5:1 text, 3:1 UI)
[ ] Keyboard navigation funcional
[ ] Screen reader testado (NVDA/JAWS)
[ ] Semantic HTML mantido
[ ] Animações não causam motion sickness
```

---

## 9. PERFORMANCE E ACESSIBILIDADE

### Otimizações de Performance

#### 1. GPU Acceleration
```css
/* Aplicar em elementos animados */
.gpu-accelerated {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

```typescript
// Em motion.div com animação
<motion.div
  style={{
    willChange: 'transform',
    transform: 'translateZ(0)',
  }}
>
```

#### 2. Limitar Repaints
```typescript
// ✅ BOM: Usar transform e opacity
<motion.div style={{ x: 100, opacity: 0.5 }} />

// ❌ RUIM: Mudar width, height, top, left
<motion.div style={{ width: 100, top: 50 }} />
```

#### 3. Debounce Scroll Listeners
```typescript
// useScrollProgress.ts já usa useSpring para suavizar
// Mas se precisar de listeners custom:
import { debounce } from 'lodash-es'; // ou implementar

const handleScroll = debounce(() => {
  // logic
}, 16); // ~60fps
```

#### 4. Lazy Load Seções Pesadas
```typescript
// App.tsx
import { lazy, Suspense } from 'react';

const FeaturesShowcase = lazy(() => import('@/components/sections/FeaturesShowcase'));

<Suspense fallback={<div>Carregando...</div>}>
  <FeaturesShowcase />
</Suspense>
```

#### 5. Intersection Observer para Animações
```typescript
// Já usado via useInView do Framer Motion
// Garante que animações só rodam quando visíveis
const isInView = useInView(ref, { once: true, margin: '-100px' });
```

### Responsividade

#### Breakpoints Tailwind
```javascript
// tailwind.config.js
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

#### Ajustes Mobile

```typescript
// Exemplo: Desabilitar parallax intenso em mobile
const isMobile = window.innerWidth < 768;

<ParallaxContainer speed={isMobile ? 0.2 : 0.5}>
```

```typescript
// Exemplo: Fallback horizontal scroll
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

// Renderizar versão simplificada em mobile
{isMobile ? <SimpleFeaturesGrid /> : <HorizontalScrollSection />}
```

### Acessibilidade

#### Reduced Motion

```typescript
// useReducedMotion hook (já implementado)
const prefersReducedMotion = useReducedMotion();

// Usar em componentes
<motion.div
  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
>
```

#### ARIA Labels

```typescript
// FloatingActionButton
<button aria-label="Voltar ao topo">
  <ArrowUp />
</button>

// ScrollProgressBar
<div role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
```

#### Keyboard Navigation

```typescript
// Garantir que elementos interativos sejam focáveis
<button tabIndex={0} onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    scrollToTop();
  }
}}>
```

---

## 10. CÓDIGO DE REFERÊNCIA

### Exemplo Completo: Hero Refatorado

```typescript
// /src/components/sections/Hero.tsx - VERSÃO FINAL
import { motion } from 'framer-motion';
import { ParallaxContainer, TextReveal } from '@/components/scroll-effects';
import { Button } from '@/components/ui';
import { CloudLarge, CloudSmall, Diamond, Cube3D } from '@/components/common';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-neutral-beige dark:bg-neutral-900">
      {/* Background Layer - Slowest */}
      <ParallaxContainer
        speed={prefersReducedMotion ? 0 : 0.2}
        direction="down"
        className="absolute inset-0 pointer-events-none"
      >
        <CloudLarge className="absolute top-10 right-10 opacity-20 text-accent-teal w-64 h-64" />
        <CloudLarge className="absolute bottom-20 left-10 opacity-15 text-button-blue w-48 h-48" />
      </ParallaxContainer>

      {/* Midground Layer - Medium */}
      <ParallaxContainer
        speed={prefersReducedMotion ? 0 : 0.5}
        direction="up"
        className="absolute inset-0 pointer-events-none"
      >
        <Diamond className="absolute top-1/4 right-1/4 text-accent-teal opacity-30" />
        <CloudSmall className="absolute top-1/3 left-1/4 text-button-blue opacity-25" />
      </ParallaxContainer>

      {/* Foreground Content - Fastest */}
      <ParallaxContainer
        speed={prefersReducedMotion ? 0 : 0.8}
        direction="up"
        className="relative z-10 w-full"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Headline */}
            <h1 className="font-aeonik-mono text-5xl md:text-7xl font-bold mb-6 text-primary dark:text-neutral-50">
              TRANSFORME SUA
              <span className="block text-accent-teal">OPERAÇÃO</span>
            </h1>

            {/* Subtitle with Text Reveal */}
            <div className="mb-8">
              <TextReveal
                className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400"
                highlightWords={['automação', 'inteligente', 'resultados']}
                staggerDelay={0.03}
              >
                Plataforma de automação inteligente que entrega resultados
                mensuráveis em dias não meses
              </TextReveal>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg" className="group">
                Começar Agora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Ver Demonstração
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 text-sm text-neutral-500"
            >
              Mais de 10.000 empresas confiam em nossa plataforma
            </motion.p>
          </motion.div>
        </div>
      </ParallaxContainer>

      {/* 3D Decorative Element - Rotating */}
      <ParallaxContainer
        speed={prefersReducedMotion ? 0 : 1}
        direction="up"
        className="absolute bottom-10 right-10 pointer-events-none"
      >
        <motion.div
          animate={{
            rotateY: prefersReducedMotion ? 0 : 360,
            rotateX: prefersReducedMotion ? 0 : 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Cube3D className="w-24 h-24 text-accent-teal opacity-40" />
        </motion.div>
      </ParallaxContainer>
    </section>
  );
}
```

### Exemplo: App.tsx Completo

```typescript
// /src/App.tsx - VERSÃO FINAL COM TODOS OS SCROLL EFFECTS
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

// Scroll Effects
import {
  ScrollProgressBar,
  FloatingActionButton,
  SectionTransition,
} from '@/components/scroll-effects';

// Sections
import {
  Header,
  Hero,
  SocialProof,
  ProblemSolution,
  Differentials,
  UseCases,
  FeaturesShowcase, // NOVO
  HowItWorks, // REFATORADO
  Testimonials, // REFATORADO
  Personas,
  Integrations,
  Metrics, // EXPANDIDO
  FAQ,
  CTAFinal,
  Footer,
} from '@/components/sections';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'min-h-screen bg-neutral-beige dark:bg-neutral-900 transition-colors duration-300',
        isDarkMode && 'dark',
        prefersReducedMotion && 'reduce-motion'
      )}
    >
      {/* Global Scroll Progress Bar */}
      <ScrollProgressBar color="gradient" height={3} />

      {/* Header */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Main Content */}
      <main>
        <Hero />
        <SectionTransition variant="wave" color="#16AA98" />

        <SocialProof />
        <SectionTransition variant="diagonal" color="#6fc2ff" />

        <ProblemSolution />

        <Differentials />

        <UseCases />

        {/* NOVO: Horizontal Scroll Showcase */}
        <FeaturesShowcase />

        {/* REFATORADO: Sticky Scrollytelling */}
        <HowItWorks />

        {/* REFATORADO: 3D Tilt Cards */}
        <Testimonials />

        <Personas />

        <Integrations />

        {/* EXPANDIDO: Com SVG Animations */}
        <Metrics />

        <FAQ />

        <CTAFinal />
      </main>

      <Footer />

      {/* Floating Action Button - Scroll to Top */}
      <FloatingActionButton showAfter={300} position="bottom-right" />
    </div>
  );
}

export default App;
```

---

## 📌 RESUMO EXECUTIVO

### O Que Será Criado

1. **9 Componentes Novos** em `/src/components/scroll-effects/`
2. **5 Hooks Customizados** em `/src/hooks/`
3. **1 Seção Nova** (FeaturesShowcase)
4. **4 Seções Refatoradas** (Hero, HowItWorks, ProblemSolution, Testimonials)
5. **1 Seção Expandida** (Metrics com SVG)
6. **Estilos CSS** para scroll optimization

### Tecnologias Utilizadas

- **Framer Motion:** useScroll, useTransform, useSpring, useInView, motion
- **React 18:** Hooks modernos, performance
- **TypeScript:** Tipagem estrita
- **Tailwind CSS:** Utility-first styling
- **Lucide React:** Ícones

### Tempo Estimado Total

**3 - 3.5 horas** divididas em 8 fases

### Performance Alvo

- 60fps constantes durante scroll
- FCP < 1.8s, LCP < 2.5s
- CLS < 0.1
- Accessible (WCAG AA)

### Resultado Final

Landing page com scroll interativo de nível profissional que:
- ✅ Impressiona visualmente
- ✅ Guia o usuário através de narrativa
- ✅ Mantém engajamento
- ✅ Performa perfeitamente
- ✅ É totalmente acessível

---

## 🚀 PRÓXIMOS PASSOS

1. **Revisar esta especificação** completa
2. **Confirmar aprovação** do plano
3. **Iniciar FASE 1** (fundação)
4. **Iterar fase por fase** com validação
5. **Realizar testes finais**
6. **Deploy** 🎉

---

**Documento criado para:** Outra LLM desenvolver
**Projeto:** siteNOVO - Landing Page Interativa
**Data:** 2025-11-06
**Versão:** 1.0
**Branch:** `claude/add-interactive-scroll-011CUrkYXovYrDxSLsCeRxZY`

---

## ⚠️ NOTAS IMPORTANTES PARA A LLM DESENVOLVEDORA

1. **NÃO pular fases** - Cada fase valida a anterior
2. **TESTAR após cada componente** - Não acumular bugs
3. **SEGUIR padrões do projeto** - CVA, cn(), barrel exports
4. **VALIDAR performance** - 60fps é mandatório
5. **RESPEITAR acessibilidade** - prefers-reduced-motion
6. **COMMITAR frequentemente** - Mensagens descritivas
7. **MOBILE FIRST** - Degradação elegante em dispositivos menores
8. **PERGUNTAR se incerto** - Melhor clarificar que assumir

**BOA SORTE! 🚀**
