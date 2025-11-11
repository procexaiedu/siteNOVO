# ProceX AI Landing Page - Agent Documentation

Welcome to the ProceX AI Landing Page documentation hub. This folder contains all critical system information, architecture decisions, and operational procedures.

---

## 📚 Documentation Index

### Core Architecture
- **[PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md)** - Complete project overview
  - Project goals and tech stack
  - Directory structure and component organization
  - Design patterns and responsive strategy
  - Performance targets and accessibility features
  - Color system and design tokens

### Mobile Optimization (Phase 1-2)
- **[MOBILE_OPTIMIZATION.md](./MOBILE_OPTIMIZATION.md)** - Detailed mobile-first strategy
  - Phase 1: Critical optimizations (fluid spacing, sticky CTA, touch targets, form UX)
  - Phase 2: Scroll reduction (tabs for UseCases, accordion for HowItWorks)
  - Performance metrics and expected improvements
  - Browser support and testing checklist
  - Future optimization phases (3-6)

### Development Guide
- **[SOP.md](./SOP.md)** - Standard Operating Procedures
  - Adding new section components
  - Creating responsive designs (mobile-first)
  - Implementing progressive disclosure (tabs/accordion)
  - Adding form fields with validation
  - Responsive styling patterns
  - Framer Motion animations
  - Mobile testing procedures
  - Icon usage with Lucide React
  - Git workflow and common issues

---

## 🎯 Quick Start

### For New Engineers

1. **Understand the project:**
   - Read [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) (5 min)
   - Skim [MOBILE_OPTIMIZATION.md](./MOBILE_OPTIMIZATION.md) (5 min)

2. **Learn to develop:**
   - Follow procedures in [SOP.md](./SOP.md)
   - Start with "Adding a New Section Component"

3. **Test your changes:**
   - Use Chrome DevTools mobile emulation
   - Follow testing checklist in MOBILE_OPTIMIZATION.md

### For Mobile Optimization Work

1. Reference [MOBILE_OPTIMIZATION.md](./MOBILE_OPTIMIZATION.md) for:
   - Implementation patterns (tabs vs accordion)
   - Performance metrics and expected gains
   - Browser support details
   - Testing procedures

2. Follow SOP patterns in [SOP.md](./SOP.md) for:
   - Progressive disclosure implementation
   - Responsive styling approaches
   - Animation best practices

---

## 📊 Project Status

### Completed ✅
- **Fase 1:** Critical optimizations (4/4 tasks)
  - Fluid spacing system with clamp()
  - Sticky mobile CTA bar
  - 44px touch targets
  - Form UX enhancements

- **Fase 2:** Scroll reduction (2/4 tasks - 50%)
  - UseCases: Tab interface (-2,400px)
  - HowItWorks: Accordion (-2,000px)

### In Progress ⏳
- ProblemSolution: Carousel (-300px)
- Testimonials: Horizontal scroll (-200px)

### Planned 🚀
- **Fase 3:** Lazy loading + Custom hooks
- **Fase 4:** Font optimization + Build optimization
- **Fase 5:** Advanced UX (typography, gestures)
- **Fase 6:** Performance monitoring

### Expected Impact
- **Mobile scroll reduction:** 33-43% (15k → 10k px)
- **Mobile conversion boost:** +30-40%
- **Bundle size reduction:** 569KB → 450KB

---

## 🏗️ Project Structure Overview

```
src/
├── App.tsx                       # Root app + main layout
├── components/
│   ├── sections/                 # 14 page sections
│   ├── ui/                       # Reusable components (Button, Input, etc)
│   ├── common/                   # Feature components (Form, Sticky CTA, etc)
│   └── fancy/                    # Advanced animations
├── hooks/                        # useReducedMotion, (future hooks)
├── styles/                       # Global CSS with fluid utilities
└── lib/                          # Utility functions

.agent/                          # Documentation (this folder)
├── PROJECT_ARCHITECTURE.md       # Full architecture details
├── MOBILE_OPTIMIZATION.md        # Mobile strategy & implementation
├── SOP.md                        # Development procedures
└── README.md                     # This file
```

---

## 🎨 Tech Stack

**Frontend:** React 18 + TypeScript + Vite
**Styling:** Tailwind CSS 3.4 + Responsive utilities
**Animation:** Framer Motion 11.11
**Forms:** React Hook Form + Zod validation
**Icons:** Lucide React (vector-based)

---

## 📱 Mobile-First Design System

### Responsive Breakpoints
| Breakpoint | Width | Use Case |
|-----------|-------|----------|
| Base | <640px | Mobile (phones) |
| `sm` | 640px+ | Large phones |
| `md` | 768px+ | Tablets/Desktop start |
| `lg` | 1024px+ | Desktop |
| `xl` | 1280px+ | Large desktop |

### Fluid Spacing
- **Mobile:** 60px vertical, 16px horizontal
- **Desktop:** 180px vertical, 306.5px horizontal
- **Transition:** Smooth scaling with `clamp()`

### Touch Targets
- **Minimum:** 44px × 44px (WCAG AAA)
- **Applied to:** Buttons, inputs, form controls
- **Responsive:** `min-h-[44px] md:min-h-auto`

---

## 🚀 Performance Goals

### Web Vitals Targets
- **LCP:** <2.0s (mobile 3G)
- **FID:** <100ms
- **CLS:** <0.1
- **INP:** <200ms

### Bundle Size
- **Current:** 569KB
- **Target:** 450KB (-21%)

### Mobile Metrics
- **Scroll reduction:** 33-43%
- **Form completion:** +20%
- **Conversion boost:** +30-40%

---

## ♿ Accessibility Standards

✅ WCAG 2.1 Level AA Compliance
- Semantic HTML with proper heading hierarchy
- ARIA labels on all interactive elements
- 44px minimum touch targets
- Color contrast ratios (WCAG AA)
- Keyboard navigation support
- Screen reader optimization
- Motion preference respect (`prefers-reduced-motion`)

---

## 🔄 Development Workflow

### Common Tasks

**Add a new section:**
→ See [SOP.md - Adding a New Section](./SOP.md#1-adding-a-new-section-component)

**Implement mobile optimization:**
→ See [SOP.md - Progressive Disclosure](./SOP.md#3-implementing-progressive-disclosure-tabsaccordion)

**Add form field:**
→ See [SOP.md - Adding Form Fields](./SOP.md#4-adding-form-fields)

**Test responsiveness:**
→ See [MOBILE_OPTIMIZATION.md - Testing Checklist](./MOBILE_OPTIMIZATION.md#testing-checklist)

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution | Reference |
|-------|----------|-----------|
| Layout shift on viewport change | Use `clamp()` instead of fixed values | [SOP.md](./SOP.md#issue-layout-shift-on-scroll) |
| Touch targets too small | Add `min-h-[44px] md:min-h-auto` | [SOP.md](./SOP.md#issue-touch-targets-too-small-on-mobile) |
| Animations stutter on mobile | Use `transform` + GPU acceleration | [SOP.md](./SOP.md#issue-animation-stutters-on-mobile) |
| Form doesn't autofill on iOS | Add valid `autoComplete` attribute | [SOP.md](./SOP.md#issue-form-doesnt-autofill-on-ios) |

---

## 📞 Key Files Reference

### Configuration
- `tailwind.config.ts` - Tailwind theme, breakpoints, spacing
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration

### Styling
- `src/styles/globals.css` - Global styles, fluid utilities
- `tailwind.config.ts` - Design tokens, color system

### Core Components
- `src/App.tsx` - Main app layout
- `src/components/ui/Button.tsx` - Button component (44px touch targets)
- `src/components/ui/Input.tsx` - Form input (44px min-height)
- `src/components/common/StickyMobileCTA.tsx` - Sticky CTA bar (NEW)

### Optimized Sections
- `src/components/sections/UseCases.tsx` - Tab interface (mobile optimized)
- `src/components/sections/HowItWorks.tsx` - Accordion (mobile optimized)

---

## 🎓 Learning Resources

### For Responsive Design
→ [SOP.md - Styling Responsively](./SOP.md#5-styling-responsively)

### For Mobile Optimization
→ [MOBILE_OPTIMIZATION.md - Phase 1-2](./MOBILE_OPTIMIZATION.md)

### For Animations
→ [SOP.md - Adding Animations](./SOP.md#6-adding-animations)

### For Progressive Disclosure
→ [SOP.md - Tabs/Accordion](./SOP.md#3-implementing-progressive-disclosure-tabsaccordion)

---

## 📝 Recent Updates

**Last Updated:** November 11, 2025

### Latest Changes (Commit: ee95d80)
- ✅ Phase 1: Critical optimizations complete
  - Fluid spacing with clamp()
  - Sticky mobile CTA bar
  - 44px touch targets
  - Form UX enhancements

- ✅ Phase 2: 50% complete (2/4 tasks)
  - UseCases: Tab interface implementation
  - HowItWorks: Accordion implementation

- 📚 Documentation created
  - PROJECT_ARCHITECTURE.md
  - MOBILE_OPTIMIZATION.md
  - SOP.md
  - README.md (this file)

---

## 🤝 Contributing

When making changes:
1. Reference relevant documentation
2. Follow SOP procedures
3. Test on mobile (375px width)
4. Update docs if creating new patterns
5. Create meaningful git commits

---

## 📧 Questions?

Refer to the documentation files above or check the SOP.md troubleshooting section.

---

**Documentation Structure Version:** 1.0
**Last Maintained:** Nov 11, 2025
**Maintainers:** Engineering Team
