# ProceX AI Landing Page - Project Architecture

## Project Overview

**ProceX AI** is a high-performance, mobile-first landing page for an AI agent services platform targeting SMEs in Brazil. The site showcases AI automation solutions across 6 business verticals with a focus on conversion optimization and exceptional user experience.

**Project Goal:**
- Deliver a production-ready landing page with mobile-first design
- Reduce mobile scroll by 33-43% through progressive disclosure patterns
- Achieve +30-40% mobile conversion rate improvement
- Maintain <2s LCP on mobile (3G throttled)

---

## Tech Stack

### Frontend Framework
- **React 18.3** - UI component library with hooks
- **TypeScript 5.7** - Static typing for type safety
- **Vite 6.0** - Lightning-fast build tool (HMR, code splitting)
- **Tailwind CSS 3.4** - Utility-first CSS with responsive design
- **Framer Motion 11.11** - Production-grade animation library

### Form & Validation
- **React Hook Form 7.53** - Efficient form state management
- **Zod 3.23** - TypeScript-first schema validation
- **@hookform/resolvers 3.9** - Integration layer

### UI Components & Icons
- **Lucide React 0.460** - Icon library (vector-based, tree-shakeable)
- **class-variance-authority 0.7** - Composable component variants
- **clsx 2.1** - Utility for conditional class composition
- **tailwind-merge 2.5** - Smart Tailwind class merging

### Tooling
- **ESLint 9.15** - Code quality & linting
- **Prettier 3.3** - Code formatting
- **React Helmet Async 2.0** - SEO metadata management

---

## Project Structure

```
src/
├── App.tsx                          # Root app component + main layout
├── main.tsx                         # Entry point with React DOM
├── components/
│   ├── sections/                    # Page sections (14 total)
│   │   ├── Header.tsx               # Navigation header with dark mode toggle
│   │   ├── Hero.tsx                 # Hero section with headline + CTA
│   │   ├── SocialProof.tsx          # Marquee of trusted sectors
│   │   ├── ProblemSolution.tsx      # 3-card problem/solution flow
│   │   ├── Differentials.tsx        # 3-card value propositions
│   │   ├── UseCases.tsx             # 6 use cases (OPTIMIZED: Tabs mobile)
│   │   ├── HowItWorks.tsx           # 5-step timeline (OPTIMIZED: Accordion mobile)
│   │   ├── Testimonials.tsx         # 4 customer testimonials
│   │   ├── Personas.tsx             # 3 target personas
│   │   ├── Integrations.tsx         # 6 integration partners
│   │   ├── Metrics.tsx              # 4 key metrics
│   │   ├── FAQ.tsx                  # 10 Q&A items
│   │   ├── CTAFinal.tsx             # Final CTA section
│   │   └── Footer.tsx               # Footer with links + newsletter
│   │
│   ├── ui/                          # Reusable UI components
│   │   ├── Button.tsx               # Primary/secondary/link variants
│   │   ├── Input.tsx                # Text inputs + textarea
│   │   ├── Card.tsx                 # Card container with variants
│   │   ├── Container.tsx            # Responsive layout wrapper
│   │   └── Badge.tsx                # Small badge component
│   │
│   ├── common/                      # Feature components
│   │   ├── ContactForm.tsx          # Lead capture form
│   │   ├── StickyMobileCTA.tsx      # Sticky bottom CTA bar (NEW)
│   │   ├── Logo.tsx                 # ProceX AI logo
│   │   ├── CloudSmall.tsx           # SVG decoration
│   │   ├── CloudLarge.tsx           # SVG decoration
│   │   ├── Diamond.tsx              # SVG decoration
│   │   └── Cube3D.tsx               # SVG decoration
│   │
│   └── fancy/                       # Advanced animation components
│       ├── blocks/
│       │   └── simple-marquee.tsx   # Horizontal scrolling text
│       └── text/
│           ├── vertical-cut-reveal.tsx
│           └── scramble-hover.tsx
│
├── hooks/
│   └── useReducedMotion.ts          # Respects prefers-reduced-motion
│
├── styles/
│   └── globals.css                  # Global styles + utilities
│
└── lib/
    ├── utils.ts                     # Utility functions (cn for clsx)
    ├── analytics.ts                 # Google Analytics integration
    └── webVitals.ts                 # (PLANNED) Web Vitals tracking
```

---

## Key Design Patterns

### 1. Component Architecture
- **Atomic Design Approach**: buttons → cards → sections → page
- **Functional Components**: All React 18 hooks-based
- **Composition over Inheritance**: Props-based customization
- **Type-Safe Props**: Full TypeScript coverage

### 2. Responsive Design Strategy
- **Mobile-First**: Base styles for mobile, enhanced for desktop
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Fluid Typography**: Using `clamp()` for responsive font sizes
- **Fluid Spacing**: `clamp(min, vw, max)` for padding/margins

### 3. Animation & Performance
- **Framer Motion**: Spring physics, GPU-accelerated transforms
- **Will-Change**: Strategic use to prevent unnecessary repaints
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **Viewport-Based**: `whileInView` for lazy animation triggers

### 4. Form Management
- **React Hook Form**: Minimal re-renders, efficient state
- **Zod Validation**: Type-safe schema validation
- **Progressive Enhancement**: HTML5 attributes (inputMode, autocomplete)

---

## Mobile Optimization Implementation (Phase 1-2)

### Phase 1: Critical Optimizations ✅
1. **Fluid Spacing System** (`clamp()`)
   - Replaced fixed media query breakpoints
   - Smooth scaling: 60px → 180px (mobile → desktop)
   - Location: `tailwind.config.ts`, `globals.css`

2. **Sticky Mobile CTA Bar**
   - New component: `StickyMobileCTA.tsx`
   - Appears after 800px scroll on mobile
   - Expected: +25-40% conversion improvement

3. **Touch Targets (44px Minimum)**
   - Updated: `Button.tsx`, `Input.tsx`, `ContactForm.tsx`
   - WCAG 2.5 Level AAA compliance
   - Mobile-specific: `min-h-[44px] md:min-h-auto`

4. **Form UX Enhancements**
   - HTML5 attributes: `inputMode`, `autocomplete`
   - Textarea min-height: 120px (mobile) → 100px (desktop)
   - iOS safe area support: `env(safe-area-inset-bottom)`

### Phase 2: Scroll Reduction (50% Complete)

| Section | Optimization | Reduction | Status |
|---------|--------------|-----------|--------|
| **UseCases** | Tab interface | -2,400px | ✅ |
| **HowItWorks** | Accordion | -2,000px | ✅ |
| **ProblemSolution** | Carousel (H) | -300px | ⏳ |
| **Testimonials** | Horizontal scroll | -200px | ⏳ |

**Expected Impact:**
- Scroll reduction: 15,000px → 10,000px (33% less scrolling)
- UX Improvement: Progressive disclosure prevents cognitive overload
- Performance: Lower repaints/reflows on mobile

### Implementation Details

#### UseCases Component (Tabs Pattern)
```
Desktop (md+): 3-column grid (6 cards visible at once)
Mobile (<md): Tab interface (1 card at a time)
- Tab buttons horizontally scrollable
- Smooth card transitions with Framer Motion
- Respects reduced motion preference
```

#### HowItWorks Component (Accordion Pattern)
```
Desktop (lg+): 5-column horizontal timeline
Tablet/Mobile (<lg): Vertical accordion
- Expandable steps with chevron animation
- Full content hidden until expanded
- Smooth height animations
```

---

## Performance Targets

### Web Vitals Goals
| Metric | Target | Current |
|--------|--------|---------|
| LCP | <2.0s (mobile 3G) | TBD |
| FID | <100ms | TBD |
| CLS | <0.1 | TBD |
| INP | <200ms | TBD |

### Bundle Size
- **Current:** ~569KB (unminified)
- **Target:** 450KB (-21%)
- **Planned optimizations:**
  - Lazy load sections below fold
  - Font self-hosting (-100KB)
  - Vite code splitting (-50KB)

---

## Accessibility Features

✅ **Semantic HTML**
- Proper heading hierarchy (h1 → h2 → h3)
- `<section>` tags with `aria-labelledby`
- `<main>` wrapper for content

✅ **ARIA Labels**
- Button labels and descriptions
- Accordion `aria-expanded`, `aria-controls`
- Tab `role="tab"`, `aria-selected`

✅ **Keyboard Navigation**
- All interactive elements keyboard accessible
- Focus visible states
- Tab order preserved

✅ **Color Contrast**
- WCAG AA compliance on all text
- Color not only information method

✅ **Motion Preferences**
- Hook: `useReducedMotion()` (from React)
- Respected on all Framer Motion animations
- Fallback to instant transitions

---

## Color System (Design Tokens)

```
Primary: #383838 (Dark Gray)
Primary Foreground: #F4EFEA (Cream)

Secondary: #16AA98 (Teal) - Brand accent
Button Blue: #6fc2ff

Backgrounds:
- Light: #F4EFEA
- Dark: #111111

Card: #FFFFFF
Error: #EF4444
Success: #22C55E
```

---

## Future Optimizations (Phase 3-6)

**Phase 3:** Lazy Loading + Custom Hooks
- useViewport, useTouchDevice, usePerformance
- Lazy load 11 sections below fold
- Skeleton loading screens

**Phase 4:** Assets & Build
- Self-host Google Fonts
- Vite manual chunks
- Image optimization

**Phase 5:** Advanced UX
- Responsive typography (36px → 28-32px mobile)
- Touch gestures & haptic feedback
- Progressive disclosure patterns

**Phase 6:** Monitoring
- Web Vitals tracking
- Performance budget enforcement
- User analytics integration

---

## Related Documentation

- **Mobile-First Optimization Guide:** `MOBILE_OPTIMIZATION.md`
- **Component Reference:** `COMPONENT_REFERENCE.md`
- **Development SOP:** `SOP.md`
