# 🎯 Guia de Instalação - Landing Page Enhancer

## ✅ O que já está configurado

1. **`.mcp.json`** - Corrigido para Windows com `cmd /c`! ✓
2. **`components.json`** - Criado com os 7 registries premium! ✓
3. **`lib/utils.ts`** - Função `cn()` necessária para shadcn! ✓

## 🔧 Correção Importante para Windows

O `.mcp.json` agora usa o formato correto para Windows:

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

**Por quê?** No Windows, o MCP precisa usar `cmd /c` como wrapper para executar comandos `npx`.

## 📦 Próximos Passos

### 1. Reiniciar o Claude Code

**IMPORTANTE:** Após a correção do `.mcp.json`, você precisa reiniciar completamente o Claude Code:

1. Feche o Claude Code
2. Abra novamente
3. Execute `/mcp` no terminal

Agora deve mostrar:
```
✓ shadcn - Connected
```

### 2. Instalar Dependências Necessárias

Execute no terminal do projeto:

```bash
npm install clsx tailwind-merge class-variance-authority
```

Essas são necessárias para os componentes shadcn funcionarem.

### 3. Adicionar a Skill ao Claude Code

#### Passo 3.1: Compactar a skill
No Windows Explorer:
1. Navegue até `C:\LP PROCEX\`
2. Clique com botão direito na pasta **`landing-page-enhancer`**
3. Selecione **Enviar para > Pasta compactada (zip)**
4. Isso vai criar `landing-page-enhancer.zip`

**Ou use PowerShell:**
```powershell
Compress-Archive -Path "C:\LP PROCEX\landing-page-enhancer" -DestinationPath "C:\LP PROCEX\landing-page-enhancer.zip" -Force
```

#### Passo 3.2: Upload no Claude Code
1. Abra o Claude Code
2. Vá em **Settings > Capabilities > Skills**
3. Clique em **Add Skill**
4. Faça upload do arquivo `landing-page-enhancer.zip`
5. Ative a skill marcando o checkbox

### 4. Verificar Instalação

No Claude Code, execute:

```bash
/mcp
```

Deve mostrar:
```
MCP Servers
└ shadcn - Connected ✓
```

### 5. Testar os Registries

Experimente estes comandos no Claude Code:

```
Liste os componentes disponíveis no registry @magicui
```

Ou diretamente no terminal:

```bash
npx shadcn@latest list @magicui
npx shadcn@latest list @animateui
```

## 🎨 Como usar os registries

### Buscar componentes disponíveis
```bash
npx shadcn@latest list @magicui
npx shadcn@latest list @animateui
npx shadcn@latest list @fancycomponents
npx shadcn@latest list @shadcn-form
npx shadcn@latest list @tailark
npx shadcn@latest list @alpine
npx shadcn@latest list @plateui
```

### Instalar componentes
```bash
# Componente único
npx shadcn@latest add @magicui/animated-beam

# Múltiplos componentes
npx shadcn@latest add @magicui/hero-video-dialog @animateui/fade-in

# Com força (reinstalar)
npx shadcn@latest add @magicui/bento-grid --force
```

### Usar no código
```tsx
import { HeroVideoDialog } from '@/components/hero-video-dialog';
import { AnimatedBeam } from '@/components/animated-beam';

export default function Hero() {
  return (
    <section>
      <HeroVideoDialog
        videoSrc="/demo.mp4"
        thumbnailSrc="/thumbnail.jpg"
        animationStyle="fade"
      />
    </section>
  );
}
```

## 📂 Estrutura do Projeto Atualizada

```
C:\LP PROCEX\
├── .mcp.json                          ✅ Configurado (Windows)
├── components.json                    ✅ Criado com 7 registries
├── lib/
│   ├── utils.ts                       ✅ Função cn() criada
│   └── constants.ts
├── components/
│   └── ui/                           👈 Componentes vão aqui
├── landing-page-enhancer/            👈 Skill criada
│   ├── SKILL.md
│   ├── animation-patterns.md
│   ├── ui-best-practices.md
│   ├── registry-guide.md
│   ├── README.md
│   └── INSTALLATION.md              👈 Este arquivo
└── ...resto do projeto
```

## 🐛 Troubleshooting

### Problema: MCP ainda não funciona após reiniciar

**Solução 1:** Verifique se o `.mcp.json` tem `cmd /c`:
```bash
cat .mcp.json
```

**Solução 2:** Execute o doctor novamente:
```bash
/doctor
```

**Solução 3:** Tente manualmente no terminal:
```bash
cmd /c npx shadcn@latest --version
```

### Problema: "Cannot find module 'clsx'"

**Solução:**
```bash
npm install clsx tailwind-merge class-variance-authority
```

### Problema: Componente não instala

**Solução:**
```bash
# Verifique se components.json existe
type components.json

# Force reinstall
npx shadcn@latest add @registry/component --force

# Liste componentes disponíveis
npx shadcn@latest list @registry
```

### Problema: Path alias não funciona

**Solução:** Verifique `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Problema: "Command not found: npx"

**Solução:** Instale o Node.js mais recente:
- Baixe em: https://nodejs.org
- Versão LTS recomendada
- Reinicie o terminal após instalar

## 💡 Exemplos de Uso da Skill

### Criar hero section animado
```
Claude, usando a skill landing-page-enhancer, crie um hero section com:
- Video background usando @magicui/hero-video-dialog
- Headline com gradient animado (@fancycomponents/gradient-text)
- Botão com shimmer effect (@magicui/shimmer-button)
- Logos de clientes (@fancycomponents/logo-cloud)
```

### Adicionar seção de features
```
Adicione uma seção de features usando:
- Bento grid do @magicui
- Scroll-triggered animations do @animateui
- Feature cards do @fancycomponents
```

### Criar formulário de contato
```
Crie um formulário de contato usando @shadcn-form/contact-form com:
- Validação em tempo real
- Loading state animado
- Success/error messages
- Design mobile-first
```

### Melhorar landing page existente
```
Analise minha landing page atual e sugira melhorias usando:
- Animações suaves e profissionais
- Componentes premium dos registries
- Melhores práticas de conversão
- Performance otimizada
```

## 🚀 Pronto para usar!

Agora você tem:
- ✅ MCP do shadcn configurado (Windows)
- ✅ 7 registries premium configurados
- ✅ Skill com 20+ animações prontas
- ✅ Guias completos de UI/UX
- ✅ Catálogo de 100+ componentes

## 📝 Checklist de Instalação

- [ ] `.mcp.json` corrigido com `cmd /c`
- [ ] Claude Code reiniciado
- [ ] `/mcp` mostra "shadcn - Connected"
- [ ] `npm install clsx tailwind-merge class-variance-authority`
- [ ] `landing-page-enhancer` compactado em ZIP
- [ ] Skill adicionada no Claude Code
- [ ] Skill ativada nas configurações
- [ ] Testado com `npx shadcn@latest list @magicui`

## 📖 Documentação

Consulte os arquivos da skill para referência:
- **SKILL.md** - Workflow principal e quando usar
- **animation-patterns.md** - 20+ receitas de animação
- **ui-best-practices.md** - Guia completo de UI/UX
- **registry-guide.md** - Catálogo de todos os componentes
- **README.md** - Visão geral e comandos rápidos

## 🎓 Próximos Passos

1. ✅ Reinicie o Claude Code
2. ✅ Verifique `/mcp`
3. ✅ Instale as dependências
4. ✅ Compacte e adicione a skill
5. 🚀 Comece a criar landing pages incríveis!

---

**Dúvidas?** A skill tem exemplos detalhados em cada arquivo de referência!

**Windows específico?** A configuração com `cmd /c` já está aplicada e deve funcionar! ✓
