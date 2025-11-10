# UI Components Library

Biblioteca completa de componentes UI reutilizáveis seguindo o Design System MotherDuck.

## Componentes Criados

### 1. Button (`Button.tsx`)
Componente de botão com múltiplas variantes e tamanhos.

**Variantes:**
- `primary` - Background azul (#6fc2ff) - CTAs principais
- `secondary` - Outline com border 2px
- `link` - Transparente sem border

**Tamanhos:**
- `sm` - Pequeno
- `default` - Padrão (padding: 16.5px 22px)
- `lg` - Grande
- `icon` - 40x40px para ícones

**Características:**
- Font: Aeonik Mono (Space Mono fallback)
- Text Transform: Uppercase
- Letter Spacing: 0.5px
- Border: 2px solid #383838
- Border Radius: 2px
- Hover: Translatey(-2px) para efeito de elevação

**Exemplo de Uso:**
```tsx
import { Button } from '@/components/ui';

// Botão primário
<Button>TRY 21 DAYS FREE</Button>

// Botão secundário
<Button variant="secondary">LEARN MORE</Button>

// Link button com href
<Button variant="link" href="/login">LOG IN</Button>

// Tamanhos diferentes
<Button size="sm">SMALL</Button>
<Button size="lg">LARGE</Button>

// Com onClick handler
<Button onClick={() => console.log('clicked')}>CLICK ME</Button>

// Desabilitado
<Button disabled>DISABLED</Button>
```

---

### 2. Card (`Card.tsx`)
Componente de card com subcomponentes para estruturação.

**Variantes:**
- `default` - Sem shadow (border-first design)
- `elevated` - Com shadow sutil

**Padding:**
- `none` - Sem padding (para imagens)
- `sm` - 16px
- `default` - 24px
- `lg` - 32px

**Border Radius:**
- `sm` - 2px
- `default` - 4px
- `lg` - 8px

**Subcomponentes:**
- `CardHeader` - Cabeçalho com border inferior
- `CardTitle` - Título estilizado
- `CardContent` - Área de conteúdo principal
- `CardFooter` - Rodapé com border superior

**Exemplo de Uso:**
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui';

// Card completo estruturado
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">ACTION</Button>
  </CardFooter>
</Card>

// Card elevado
<Card variant="elevated" padding="lg">
  <h3>Featured Content</h3>
</Card>

// Card sem padding (para imagens)
<Card padding="none">
  <img src="image.jpg" alt="..." />
  <div className="p-6">Content</div>
</Card>
```

---

### 3. Input (`Input.tsx`)
Componentes de input e textarea com validação integrada.

**Características:**
- Border: 2px solid #383838
- Border Radius: 2px
- Estados de erro com feedback visual
- Label integrado
- Helper text
- Suporte a ícones (start/end)
- Acessibilidade completa (ARIA)

**Props Principais:**
- `label` - Texto do label
- `error` - Mensagem de erro
- `helperText` - Texto de ajuda
- `startIcon` - Ícone à esquerda
- `endIcon` - Ícone à direita
- `fullWidth` - Input 100% largura

**Exemplo de Uso:**
```tsx
import { Input, Textarea } from '@/components/ui';

// Input básico com label
<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  fullWidth
/>

// Input com erro
<Input
  label="Username"
  error="Username is required"
  defaultValue=""
/>

// Input com helper text
<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>

// Textarea
<Textarea
  label="Message"
  placeholder="Enter your message..."
  rows={4}
  fullWidth
/>

// Com validação controlada
const [value, setValue] = useState('');
const [error, setError] = useState('');

<Input
  label="Email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error={error}
  onBlur={() => {
    if (!value.includes('@')) {
      setError('Invalid email');
    }
  }}
/>
```

---

### 4. Badge (`Badge.tsx`)
Componente para tags e badges de status.

**Variantes:**
- `default` - Dark background (#383838)
- `secondary` - Beige background (#F4EFEA)
- `outline` - Transparente com border
- `accent` - Teal background (#16AA98)
- `warning` - Yellow background (#FFD700)
- `success` - Green
- `error` - Red

**Tamanhos:**
- `sm` - 10px text
- `default` - 12px text
- `lg` - 14px text

**Características:**
- Font: Aeonik Mono
- Text Transform: Uppercase
- Letter Spacing: Wide
- Border: 2px solid
- Suporte a ícones
- Modo interativo (clicável)

**Exemplo de Uso:**
```tsx
import { Badge, BadgeGroup } from '@/components/ui';

// Badge simples
<Badge>NEW</Badge>

// Badge com variante
<Badge variant="accent">FEATURED</Badge>
<Badge variant="warning">BETA</Badge>
<Badge variant="success">ACTIVE</Badge>

// Badge interativo (clicável)
<Badge variant="outline" interactive onClick={() => alert('Clicked!')}>
  CLICK ME
</Badge>

// Grupo de badges
<BadgeGroup>
  <Badge>TAG 1</Badge>
  <Badge variant="accent">TAG 2</Badge>
  <Badge variant="outline">TAG 3</Badge>
</BadgeGroup>

// Tamanhos diferentes
<Badge size="sm">SMALL</Badge>
<Badge size="lg">LARGE</Badge>
```

---

### 5. Container (`Container.tsx`)
Wrapper responsivo para seções com max-width e padding consistente.

**Tamanhos (max-width):**
- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px (padrão)
- `2xl` - 1536px
- `hero` - 1400px (Hero do MotherDuck)
- `full` - 100%

**Padding Horizontal:**
- `none` - 0
- `sm` - 16px
- `default` - 24px (md: 32px)
- `lg` - 32px (md: 48px, lg: 64px)
- `xl` - 40px (md: 80px, lg: 306.5px) - Hero padding

**Padding Vertical:**
- `none` - 0
- `sm` - 16px
- `default` - 32px (md: 48px)
- `lg` - 48px (md: 64px, lg: 80px)
- `xl` - 64px (md: 96px, lg: 128px)
- `hero` - 110px top, 180px bottom

**Componentes Semânticos:**
- `Container` - Wrapper genérico
- `Section` - Semantic section com vertical spacing
- `Hero` - Pré-configurado para hero sections

**Exemplo de Uso:**
```tsx
import { Container, Section, Hero } from '@/components/ui';

// Container padrão
<Container>
  <h1>Page Content</h1>
</Container>

// Hero section (MotherDuck style)
<Hero>
  <h1 className="text-hero">MAKING BIG DATA FEEL SMALL</h1>
  <Button>TRY 21 DAYS FREE</Button>
</Hero>

// Section com spacing vertical
<Section vertical="lg">
  <h2>Features</h2>
  <p>Content...</p>
</Section>

// Container como elemento semântico
<Container as="section" size="lg" padding="lg" vertical="xl">
  Content
</Container>

// Full-width container sem padding
<Container size="full" padding="none">
  <img src="..." className="w-full" />
</Container>
```

---

## Utilitários

### `utils.ts`
Função helper para combinar classes Tailwind com precedência correta.

```tsx
import { cn } from '@/components/ui/utils';

// Combina classes com precedência
<div className={cn('base-class', condition && 'conditional-class', className)} />
```

---

## Design System

### Cores
```css
Primary Dark:   #383838  /* Texto, borders, strokes */
Accent Teal:    #16AA98  /* Destaques, elementos decorativos */
Button Blue:    #6fc2ff  /* CTAs, botões primários */
Neutral Beige:  #F4EFEA  /* Background principal */
Banner Yellow:  #FFD700  /* Anúncios, urgência */
```

### Tipografia
- **Aeonik Mono** (Space Mono fallback): Headings, Buttons, Navigation, UI
- **Inter**: Body text, Paragraphs

### Princípios de Design
1. **Border-first design**: 2px solid borders em vez de shadows pesadas
2. **Border Radius mínimo**: 2px para botões, 4px para cards
3. **Uppercase**: Transformação uppercase para elementos UI
4. **Letter Spacing**: 0.5px para botões e navegação
5. **High Contrast**: AAA compliance para acessibilidade
6. **Responsive**: Mobile-first com breakpoints consistentes

### Breakpoints Responsivos
```
Mobile:    < 640px
SM:        640px+
MD:        768px+
LG:        1024px+
XL:        1280px+
2XL:       1536px+
```

---

## Showcase

Para visualizar todos os componentes com exemplos interativos:

```tsx
import UIShowcase from '@/components/ui/UIShowcase';

function App() {
  return <UIShowcase />;
}
```

O `UIShowcase` demonstra:
- Todas as variantes de cada componente
- Exemplos de uso prático
- Referência visual do design system
- Combinações de componentes

---

## Acessibilidade

Todos os componentes seguem as melhores práticas de acessibilidade:

- ✅ ARIA labels e roles apropriados
- ✅ Suporte completo a teclado (Tab, Enter, Escape)
- ✅ Estados focus visíveis (ring-2, ring-offset-2)
- ✅ Contraste de cores AAA compliant
- ✅ Mensagens de erro com role="alert"
- ✅ Labels associados a inputs via htmlFor
- ✅ Semantic HTML (section, header, footer, etc)

---

## TypeScript

Todos os componentes incluem:
- ✅ Interfaces TypeScript completas
- ✅ Props com documentação JSDoc
- ✅ Tipos exportados para reutilização
- ✅ Variants tipadas com `class-variance-authority`
- ✅ Ref forwarding para componentes compostos

---

## Performance

Otimizações incluídas:
- ✅ Lazy loading suportado (import dinâmico)
- ✅ Tree-shaking friendly (exports nomeados)
- ✅ CSS purge automático via Tailwind
- ✅ Sem dependências pesadas
- ✅ Memoização não necessária (componentes simples)

---

## Import Path

Todos os componentes podem ser importados do index:

```tsx
// Import único
import {
  Button,
  Card,
  CardContent,
  Input,
  Badge,
  Container,
  cn
} from '@/components/ui';

// Ou imports individuais
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
```

---

## Testing

Para testar os componentes:

```bash
# Iniciar dev server
npm run dev

# Import UIShowcase no App.tsx para visualizar todos os componentes
```

---

## Arquivos Criados

```
src/components/ui/
├── utils.ts           # Helper functions (cn)
├── Button.tsx         # Componente Button
├── Card.tsx           # Componente Card + subcomponentes
├── Input.tsx          # Input + Textarea
├── Badge.tsx          # Badge + BadgeGroup
├── Container.tsx      # Container + Section + Hero
├── index.ts           # Exports centralizados
├── UIShowcase.tsx     # Demo/Showcase page
└── README.md          # Esta documentação
```

---

## Referências

- **Design System**: `/home/user/siteNOVO/STYLE_GUIDE.md`
- **Tailwind Config**: `/home/user/siteNOVO/tailwind.config.ts`
- **Cores customizadas**: Já configuradas no Tailwind
- **Fontes**: Space Mono (Aeonik Mono fallback), Inter

---

**Desenvolvido com**: React 18 + TypeScript + Tailwind CSS + class-variance-authority
