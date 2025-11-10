# Landing Page Enhancer Skill

Uma skill poderosa para o Claude Code que transforma landing pages com componentes modernos, animações suaves e melhores práticas de UI/UX.

## 🚀 O que esta skill faz

Esta skill te ajuda a:
- Construir landing pages modernas e de alta conversão
- Adicionar animações profissionais e micro-interações
- Usar componentes premium de 7 registries diferentes
- Seguir melhores práticas de UI/UX e acessibilidade
- Otimizar performance e Core Web Vitals
- Implementar padrões de conversão comprovados

## 📦 Instalação

### 1. Configure o MCP Server do shadcn

Primeiro, configure o servidor MCP do shadcn no seu projeto. No diretório raiz do projeto, crie ou edite `.mcp.json`:

**Windows:**
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "cmd",
      "args": ["/c", "npx", "shadcn@latest", "mcp"]
    }
  }
}
```

**Linux/Mac:**
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

> ⚠️ **Importante:** No Windows, o MCP requer `cmd /c` como wrapper para executar `npx`. **Reinicie o Claude Code** após configurar!

### 2. Configure os Registries

Adicione os registries premium no seu `components.json` (crie o arquivo na raiz se não existir):

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@alpine": "https://alpine-registry.vercel.app/r/{name}.json",
    "@tailark": "https://tailark.com/r/{name}.json",
    "@magicui": "https://magicui.dev/r/{name}.json",
    "@shadcn-form": "https://www.shadcn-form.com/r/{name}.json",
    "@animateui": "https://animate-ui.com/r/{name}.json",
    "@fancycomponents": "https://fancycomponents.dev/r/{name}.json",
    "@plateui": "https://platejs.org/r/{name}.json"
  }
}
```

### 3. Instale Dependências

Execute no terminal:

```bash
npm install clsx tailwind-merge class-variance-authority
```

### 4. Adicione a Skill

1. **Compacte a pasta `landing-page-enhancer` em ZIP**
   - Windows: Botão direito > Enviar para > Pasta compactada
   - PowerShell: `Compress-Archive -Path landing-page-enhancer -DestinationPath landing-page-enhancer.zip`

2. **No Claude Code:**
   - Vá em **Settings > Capabilities > Skills**
   - Clique em **Add Skill**
   - Faça upload do arquivo ZIP
   - Ative a skill "Landing Page Enhancer"

### 5. Verifique a Instalação

No Claude Code, execute:

```bash
/mcp
```

Você deve ver:
```
✓ shadcn - Connected
```

Se não funcionar, execute `/doctor` e verifique o `INSTALLATION.md` para troubleshooting.

## 🎯 Como Usar

### Comandos Básicos

**Criar uma nova landing page:**
```
Crie uma landing page moderna para uma startup de SaaS focada em produtividade
```

**Melhorar uma landing page existente:**
```
Analise minha landing page e adicione animações e componentes modernos
```

**Adicionar seção específica:**
```
Adicione uma seção de features usando o bento grid do MagicUI
```

**Instalar componentes:**
```
Instale os componentes necessários para um hero com video
```

### Exemplos de Prompts

**Hero Section com Video:**
```
Crie um hero section com:
- Video background usando @magicui/hero-video-dialog
- Headline animada com gradient text
- CTA com shimmer effect
- Social proof logos
```

**Seção de Features:**
```
Crie uma seção de features usando:
- Bento grid layout (@magicui/bento-grid)
- Scroll-triggered animations
- Feature cards interativas
```

**Formulário de Contato:**
```
Adicione um formulário de contato com:
- Validação em tempo real
- Estados de loading e sucesso
- Design mobile-first
Use componentes do @shadcn-form
```

**Testimonials:**
```
Crie uma seção de depoimentos usando:
- Carousel animado (@magicui/animated-testimonials)
- Fotos dos clientes
- Logos das empresas
```

## 📚 Estrutura da Skill

```
landing-page-enhancer/
├── SKILL.md                   # Instruções principais e workflow
├── animation-patterns.md      # Receitas de animação prontas
├── ui-best-practices.md       # Guia completo de UI/UX
├── registry-guide.md          # Catálogo de todos os componentes
├── INSTALLATION.md            # Guia detalhado de instalação
└── README.md                  # Este arquivo
```

## 🎨 Registries Disponíveis

### @magicui
Componentes animados impressionantes
- `animated-beam` - Linhas conectando elementos
- `hero-video-dialog` - Hero com video
- `bento-grid` - Grid moderno para features
- `shimmer-button` - Botões com efeito brilho

### @animateui
Biblioteca de animações suaves
- `fade-in` - Fade in universal
- `scroll-fade` - Reveal ao rolar
- `counter` - Contadores animados
- `parallax` - Efeito parallax

### @fancycomponents
Componentes premium polidos
- `feature-card` - Cards de features
- `gradient-text` - Texto com gradiente
- `cta-section` - CTAs de alta conversão
- `logo-cloud` - Showcase de logos

### @shadcn-form
Formulários com validação
- `contact-form` - Formulário de contato
- `newsletter-form` - Captura de email
- `signup-form` - Formulário de registro
- `multi-step-form` - Formulário em etapas

### @tailark
Componentes Tailwind
- `section-header` - Headers de seção
- `stat-card` - Cards de estatísticas
- `team-member` - Perfil de time
- `faq-accordion` - FAQ accordion

### @alpine
Componentes Alpine.js leves
- `dropdown-menu` - Menus dropdown
- `modal-dialog` - Modais acessíveis
- `tabs` - Navegação em tabs

### @plateui
Editor de texto rico
- `rich-text-editor` - Editor completo

## 🔧 Comandos Úteis

### Listar Componentes
```bash
npx shadcn@latest list @magicui
npx shadcn@latest list @animateui
```

### Instalar Componentes
```bash
# Componente único
npx shadcn@latest add @magicui/animated-beam

# Múltiplos componentes
npx shadcn@latest add @magicui/hero-video-dialog @animateui/fade-in
```

### Verificar Status do MCP
```bash
/mcp
```

## 💡 Dicas de Uso

### Performance
- Limite componentes animados pesados a 3-5 por página
- Use lazy loading para componentes abaixo da dobra
- Prefira animações CSS a JavaScript quando possível

### Acessibilidade
- Todos os padrões respeitam `prefers-reduced-motion`
- Navegação por teclado sempre funcional
- Contraste de cores adequado (WCAG AA)

### Conversão
- Mantenha value proposition acima da dobra
- Um CTA primário por seção
- Social proof visível logo no início
- Formulários com mínimo de campos possível

## 🐛 Troubleshooting

### MCP não funciona (Windows)
**Problema:** `/mcp` mostra "No MCP servers configured"

**Solução:**
1. Verifique se `.mcp.json` tem `"command": "cmd"` e `"args": ["/c", "npx", ...]`
2. Reinicie completamente o Claude Code
3. Execute `/doctor` para diagnóstico

### Componente não instala
```bash
# Verifique o components.json
cat components.json

# Force reinstall
npx shadcn@latest add @registry/component --force
```

### Animações não funcionam
1. Verifique se Framer Motion está instalado: `npm install framer-motion`
2. Confirme que os componentes foram importados corretamente
3. Verifique o console do navegador por erros

## 📖 Documentação Adicional

- **SKILL.md** - Workflow completo e princípios
- **animation-patterns.md** - Receitas de animação com código
- **ui-best-practices.md** - Guia de UI/UX e conversão
- **registry-guide.md** - Catálogo completo de componentes
- **INSTALLATION.md** - Guia detalhado com troubleshooting

## 🎓 Melhores Práticas

1. **Comece Simples:** Use componentes básicos primeiro, adicione complexidade depois
2. **Mobile First:** Sempre teste em dispositivos móveis
3. **Performance First:** Core Web Vitals > Efeitos visuais
4. **Teste com Usuários Reais:** Animações devem ajudar, não atrapalhar
5. **Progressive Enhancement:** Página deve funcionar sem JavaScript

## 🤝 Suporte

Se encontrar problemas:
1. Consulte `INSTALLATION.md` para soluções detalhadas
2. Verifique os logs do MCP (View > Output > MCP)
3. Execute `/doctor` no Claude Code para diagnóstico

## 📝 Notas

- Esta skill foi otimizada para Claude Code
- **Windows requer configuração especial** no `.mcp.json`
- Funciona melhor com projetos Next.js/React
- Todos os componentes são customizáveis
- Exemplos seguem melhores práticas de acessibilidade

---

**Versão:** 1.0.1  
**Última Atualização:** Novembro 2025  
**Compatibilidade:** Claude Code, Claude Sonnet 4.5  
**Plataformas:** Windows, Linux, Mac

Aproveite para criar landing pages incríveis! 🚀
