
# Guia de Registros Shadcn/UI para Landing Pages

Este documento resume os registros Shadcn/UI discutidos e seus componentes, com foco na utilização para a criação de Landing Pages (LPs).

## 1. @magicui

- **URL do Registro:** `https://magicui.dev/r/{name}.json`
- **Descrição:** O `@magicui` oferece uma variedade de componentes interessantes com foco em efeitos visuais e interatividade para criar landing pages visualmente atraentes.
- **Tipos de Componentes Oferecidos:**
    - **Elementos Visuais e de Fundo:** `warp-background`, `meteors`, `grid-pattern`, `striped-pattern`, `dot-pattern`, `flickering-grid`, `animated-grid-pattern`, `interactive-grid-pattern`, `light-rays`.
    - **Componentes de Texto Animados:** `line-shadow-text`, `aurora-text`, `morphing-text`, `animated-shiny-text`, `text-reveal`, `hyper-text`, `animated-gradient-text`, `word-rotate`, `typing-animation`, `sparkles-text`, `spinning-text`, `comic-text`, `text-animate`, `scroll-based-velocity`.
    - **Botões e Interatividade:** `shimmer-button`, `shiny-button`, `shine-border`, `pulsating-button`, `ripple-button`, `rainbow-button`, `interactive-hover-button`, `cool-mode`.
    - **Layout e Seções:** `bento-grid`, `marquee`, `animated-list`.
    - **Outros Componentes Úteis:** `scroll-progress`, `lens`, `pointer`, `smooth-cursor`, `progressive-blur`, `number-ticker`, `confetti`, `avatar-circles`, `icon-cloud`, `highlighter`.
    - **Mockups para Apresentação:** `android`, `safari`, `iphone`, `terminal`.
- **Sugestões de Uso para LPs:**
    - **Seção Hero:** Utilize `warp-background` ou `animated-grid-pattern` para o fundo; `aurora-text`, `morphing-text`, `animated-shiny-text` ou `typing-animation` para o título principal e subtítulos; `shimmer-button` ou `rainbow-button` para a call-to-action (CTA).
    - **Seção de Recursos/Benefícios:** `bento-grid` para apresentar os recursos; `text-reveal` para descrições de recursos que aparecem ao rolar; `animated-beam` para mostrar integrações.
    - **Depoimentos/Parceiros:** `marquee` para um carrossel infinito de logos ou depoimentos; `avatar-circles` para exibir avatares de clientes.
    - **Chamada para Ação Final:** `pulsating-button` ou `ripple-button` para uma CTA de destaque.
    - **Adicionais:** `scroll-progress` para indicar o progresso da rolagem; `smooth-cursor` para uma experiência de cursor mais elegante.
- **Comando para Adicionar Componentes:** `npx shadcn@latest add @magicui/{nome-do-componente}`

## 2. @animateui

- **URL do Registro:** `https://animate-ui.com/r/{name}.json`
- **Descrição:** O `@animateui` possui uma vasta coleção de componentes e efeitos focados em animações, ideal para landing pages dinâmicas e envolventes.
- **Tipos de Componentes Oferecidos:**
    - **Efeitos de Fundo e Layout:** `background-gradient-animation`, `background-flow-grid`, `background-grid`, `background-grid-fade`, `bento-grid`, `text-reveal`, `hero-heading`, `hero-paragraph`, `hero-scroll-gradient`.
    - **Animações de Texto e Títulos:** `animated-gradient-text`, `animated-highlight-text`, `animated-text-reveal`, `text-mask-reveal`, `text-rotator`, `text-typing-effect`, `shimmer-text`, `word-pullup`, `word-fade-in`, `word-split-effect`.
    - **Botões e Call-to-Actions (CTAs):** `button-gradient-border`, `button-hover-effect`, `button-shimmer`, `button-pop-out`, `button-slide-effect`, `button-pulse-effect`.
    - **Componentes Interativos e de Destaque:** `cards-hover-effect`, `feature-card`, `icon-card`, `spotlight`, `animated-spotlight`, `animated-tooltip`, `cursor-blob-effect`, `cursor-follow-effect`, `dock`.
    - **Listas e Itens de Exibição:** `infinite-moving-cards`, `animated-list`, `feature-grid`.
- **Sugestões de Uso para LPs:**
    - **Seção Hero:** Combine `background-gradient-animation` ou `background-flow-grid` com `hero-heading`, `animated-gradient-text` e um `button-shimmer`.
    - **Seção de Recursos/Benefícios:** Utilize `bento-grid` ou `feature-grid` com `cards-hover-effect` ou `icon-card`.
    - **Depoimentos/Parceiros:** `infinite-moving-cards` para exibir feedback de clientes ou logos.
    - **Chamada para Ação:** `button-gradient-border` ou `button-pulse-effect` para sua CTA final.
    - **Efeitos Gerais:** Considere `cursor-blob-effect` para uma experiência de usuário mais interativa.
- **Comando para Adicionar Componentes:** `npx shadcn@latest add @animateui/{nome-do-componente}`

## 3. @plateui

- **URL do Registro:** `https://platejs.org/r/{name}.json`
- **Descrição:** O `@plateui` é uma coleção de componentes para construir editores de rich text, baseados no projeto Plate.js. Não é o foco principal para landing pages tradicionais, mas sim para interfaces de edição de texto complexas.
- **Tipos de Componentes Oferecidos:** Principalmente componentes de editor de texto, toolbars, blocos de formatação, plugins de colaboração e IA (ex: `ai-menu`, `editor`, `floating-toolbar`, `table-node`, `mention-node`).
- **Sugestões de Uso para LPs:** Geralmente não recomendado para landing pages tradicionais. Pode ser útil se sua LP precisar incorporar um editor de texto completo (ex: demo de produto, envio de conteúdo formatado). Alguns componentes genéricos como `callout-node` poderiam ser adaptados, mas há opções melhores em outros registros.
- **Comando para Adicionar Componentes:** `npx shadcn@latest add @plateui/{nome-do-componente}`

## 4. @fancycomponents

- **URL do Registro:** `https://fancycomponents.dev/r/{name}.json`
- **Descrição:** O `@fancycomponents` foca em efeitos visuais e interações dinâmicas, com ênfase em SVG, animações de texto e elementos que reagem à interação do usuário, adicionando um toque de "elegância" e exclusividade.
- **Tipos de Componentes Oferecidos:**
    - **Efeitos de Fundo e Elementos Visuais Dinâmicos:** `animated-gradient-with-svg`, `pixel-trail`, `circling-elements`, `element-along-svg-path`, `marquee-along-svg-path`, `parallax-floating`, `image-trail`, `screensaver`, `gooey-svg-filter`, `pixelate-svg-filter`.
    - **Animações de Texto Criativas:** `breathing-text`, `letter-3d-swap`, `letter-swap-forward-anim`, `random-letter-swap-forward-anim`, `letter-swap-pingpong-anim`, `random-letter-swap-pingpong-anim`, `scramble-hover`, `scramble-in`, `scroll-and-swap-text`, `text-along-path`, `text-cursor-proximity`, `text-highlighter`, `text-rotate`, `typewriter`, `underline-center`, `underline-comes-in-goes-out`, `underline-goes-out-comes-in`, `underline-to-background`, `variable-font-and-cursor`, `variable-font-cursor-proximity`, `variable-font-hover-by-letter`, `variable-font-hover-by-random-letter`, `vertical-cut-reveal`.
    - **Interatividade e Carrosséis:** `drag-elements`, `cursor-attractor-and-gravity`, `simple-carousel`, `box-carousel`, `stacking-cards`.
- **Sugestões de Uso para LPs:**
    - **Seções Hero e Títulos:** `animated-gradient-with-svg`, `pixel-trail` ou `element-along-svg-path` para o fundo; `letter-3d-swap`, `scramble-in`, `text-along-path` ou `typewriter` para os títulos.
    - **Seções de Recursos/Destaque:** `stacking-cards` ou `box-carousel` para apresentar informações interativamente; `text-highlighter` para destacar palavras-chave.
    - **Toques Interativos:** `cursor-attractor-and-gravity` ou `pixel-trail` para uma experiência de usuário única.
- **Comando para Adicionar Componentes:** `npx shadcn@latest add @fancycomponents/{nome-do-componente}`

## 5. @alpine

- **URL do Registro:** `https://alpine-registry.vercel.app/r/{name}.json`
- **Descrição:** O `@alpine` oferece componentes de UI mais básicos e estruturais, ideais para construir a base e a estrutura de uma landing page sem muitas animações complexas.
- **Tipos de Componentes Oferecidos:**
    - **Componentes Básicos de UI:** `button`, `input`, `textarea`, `label`, `card`, `calendar`, `popover`.
    - **Blocos Estruturais para Landing Pages:** `section`, `hero`, `logo`, `main-nav`, `site-header`.
    - **Formulários e Listagens:** `login-form`, `booking-form`, `contact-form`, `listing-card`, `listing-grid`.
    - **Exemplos Úteis (Blocos Pré-montados):** `example-listing-card`, `example-listing-grid`, `example-section-listing`, `example-section-booking`, `example-hero`.
- **Sugestões de Uso para LPs:**
    - **Estrutura Principal:** Utilize `section` e `hero` para definir as divisões e a seção de destaque.
    - **Navegação e Branding:** `site-header`, `main-nav` e `logo` para o cabeçalho e navegação.
    - **Formulários:** `contact-form`, `booking-form` ou `login-form` para capturar informações.
    - **Exibição de Conteúdo:** `card`, `listing-card` e `listing-grid` para apresentar recursos, produtos ou depoimentos.
    - **Combinação com Outros Registros:** Use os componentes estruturais do `@alpine` e aplique as animações e efeitos visuais do `@magicui` e `@animateui` a eles.
- **Comando para Adicionar Componentes:** `npx shadcn@latest add @alpine/{nome-do-componente}`

## 6. @tailark

- **URL do Registro:** `https://tailark.com/r/{name}.json`
- **Descrição:** O `@tailark` é um registro de blocos de UI pré-construídos e completos, fornecendo seções inteiras para landing pages e sites, o que acelera significativamente o desenvolvimento.
- **Tipos de Blocos Oferecidos (com variantes padrão e "Mist Kit"):**
    - **Seções Hero:** `hero-section-1` a `hero-section-9` (e `mist-hero-section-X`).
    - **Chamadas para Ação (CTAs):** `call-to-action-1` a `call-to-action-3` (e `mist-call-to-action-X`).
    - **Recursos e Conteúdo:** `features-1` a `features-12`, `content-1` a `content-7`, `integrations-1` a `integrations-8` (e `mist-features-X`, `mist-content-X`, `mist-integrations-X`).
    - **Prova Social e Credibilidade:** `testimonials-1` a `testimonials-6`, `logo-cloud-1` a `logo-cloud-3`, `stats-1` a `stats-4` (e `mist-testimonials-X`, `mist-logo-cloud-X`, `mist-stats-X`).
    - **Formulários e Páginas Auxiliares:** `faqs-1` a `faqs-4`, `pricing-1` a `pricing-5`, `comparator-1`, `contact-1`, `contact-2`, `login-1` a `login-3`, `sign-up-1` a `sign-up-3`, `forgot-password-1`, `forgot-password-2`, `footer-1` a `footer-5` (e variantes `mist-X` para cada um).
- **Sugestões de Uso para LPs:**
    - **Esqueleto da LP:** Comece com um `hero-section`, seguido por `features`, `testimonials`, `pricing` (se aplicável), `call-to-action` final e um `footer`.
    - **Variedade de Designs:** Explore as diversas variantes de blocos para encontrar o estilo ideal.
    - **Combinação com Outros Registros:** Use os blocos do `@tailark` como base estrutural e adicione animações e interatividade dos componentes do `@magicui` e `@animateui` dentro desses blocos.
- **Comando para Adicionar Componentes:** `npx shadcn@latest add @tailark/{nome-do-bloco}`

Este guia serve como um ponto de partida para a criação de sua landing page, utilizando a riqueza de componentes disponíveis nos registros Shadcn/UI.

