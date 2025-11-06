---
name: landing-page-enhancer
description: Transforms landing pages with modern UI components, animations, and best practices using shadcn/ui and premium component registries. Use when enhancing, building, or modernizing landing pages.
---

# Landing Page Enhancer

This skill helps you create stunning, high-converting landing pages using modern UI components, smooth animations, and industry best practices.

## When to Use This Skill

Use this skill when you need to:
- Build a new landing page from scratch
- Enhance an existing landing page with better UI/animations
- Modernize outdated landing page designs
- Add interactive elements and micro-interactions
- Improve conversion rates through better UX

## Available Component Registries

You have access to premium component registries configured in your project:

- **@alpine** - Alpine.js-powered lightweight components
- **@tailark** - Tailwind-based component library
- **@magicui** - Animated UI components with magic effects
- **@shadcn-form** - Form components with validation
- **@animateui** - Animation-focused components
- **@fancycomponents** - Premium, polished components
- **@plateui** - Rich text editor components

## Core Workflow

Follow this process to enhance landing pages:

### 1. Analyze Current State
- Review existing code structure
- Identify sections: hero, features, testimonials, CTA, footer
- Note missing modern patterns (animations, responsive design, accessibility)

### 2. Plan Component Strategy
- Map sections to appropriate registry components
- Select animation patterns from `animation-patterns.md`
- Review UI best practices in `ui-best-practices.md`

### 3. Install Components
Use the shadcn MCP server to install components:
```bash
# Install individual components
npx shadcn@latest add @magicui/animated-beam
npx shadcn@latest add @animateui/fade-in

# Browse available components
npx shadcn@latest list @magicui
```

### 4. Implement Enhancements
- Replace static sections with animated components
- Add smooth scroll effects and micro-interactions
- Ensure responsive design for all screen sizes
- Implement proper loading states

### 5. Optimize Performance
- Lazy load below-the-fold components
- Use proper image optimization
- Minimize layout shifts
- Test Core Web Vitals

## Landing Page Section Templates

### Hero Section
**Recommended components:**
- `@magicui/hero-video-dialog` - Video background with CTA
- `@animateui/text-reveal` - Animated headline
- `@fancycomponents/gradient-text` - Eye-catching headlines

**Animation pattern:** Staggered fade-in (hero-stagger)

### Features Section
**Recommended components:**
- `@magicui/bento-grid` - Modern feature grid
- `@fancycomponents/feature-card` - Interactive cards
- `@animateui/scroll-fade` - Reveal on scroll

**Animation pattern:** Scroll-triggered reveals

### Social Proof
**Recommended components:**
- `@magicui/animated-testimonials` - Carousel testimonials
- `@fancycomponents/logo-cloud` - Client logos
- `@animateui/counter` - Animated statistics

**Animation pattern:** Number counters, smooth transitions

### Call-to-Action
**Recommended components:**
- `@shadcn-form/contact-form` - Contact forms
- `@fancycomponents/cta-section` - High-converting CTAs
- `@magicui/shimmer-button` - Attention-grabbing buttons

**Animation pattern:** Pulse, shimmer effects

## Key Principles

### 1. Progressive Enhancement
Start with solid HTML/CSS, then add animations progressively. Pages must work without JavaScript.

### 2. Performance First
- Keep initial bundle under 100KB
- Use code splitting for heavy animations
- Lazy load images and videos
- Implement skeleton loaders

### 3. Accessibility
- Respect `prefers-reduced-motion`
- Maintain keyboard navigation
- Use semantic HTML
- Ensure proper color contrast

### 4. Mobile-First
- Design for mobile screens first
- Test all interactions on touch devices
- Ensure fast mobile loading times
- Use appropriate touch targets (min 44x44px)

## Animation Guidelines

Animations should enhance, not distract. Follow these rules:

**Duration:**
- Micro-interactions: 150-300ms
- Element transitions: 300-500ms
- Complex animations: 500-1000ms
- Never exceed 1000ms

**Easing:**
- Use `ease-out` for entrances
- Use `ease-in` for exits
- Use `ease-in-out` for transformations

**Respect User Preferences:**
```javascript
// Always check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  // Apply animations
}
```

## Advanced Features

### Scroll-Triggered Animations
For scroll-based reveals, read detailed patterns in `animation-patterns.md`.

### Form Validation
For complex forms with validation, use components from `@shadcn-form` registry. See examples in `ui-best-practices.md`.

### Interactive Elements
For hover effects, parallax, and interactive sections, consult `ui-best-practices.md` for implementation patterns.

## Conversion Optimization

Landing pages should convert. Apply these tactics:

1. **Clear Value Proposition** - Above the fold, within 5 seconds
2. **Single Primary CTA** - One main action per section
3. **Social Proof Early** - Logos/testimonials in hero area
4. **Reduce Friction** - Minimize form fields, use autofill
5. **Create Urgency** - Limited offers, countdown timers
6. **Mobile Optimization** - 60%+ traffic is mobile

## Common Patterns

### Pattern: Hero with Video Background
```tsx
import { HeroVideoDialog } from '@magicui/hero-video-dialog';

<HeroVideoDialog
  videoSrc="your-video.mp4"
  thumbnailSrc="thumbnail.jpg"
  animationStyle="fade"
/>
```

### Pattern: Feature Bento Grid
```tsx
import { BentoGrid, BentoCard } from '@magicui/bento-grid';

<BentoGrid>
  <BentoCard name="Feature 1" description="..." />
  <BentoCard name="Feature 2" description="..." />
</BentoGrid>
```

### Pattern: Animated Counter
```tsx
import { AnimatedCounter } from '@animateui/counter';

<AnimatedCounter
  from={0}
  to={10000}
  duration={2000}
  suffix="+"
/>
```

## Troubleshooting

### Components Not Installing
1. Verify `components.json` has registries configured
2. Check network connectivity
3. Ensure you have write permissions
4. Run `npx shadcn@latest init` if needed

### Animations Not Working
1. Check if `prefers-reduced-motion` is enabled
2. Verify animation library is imported
3. Check for JavaScript errors in console
4. Ensure viewport observer is initialized

### Performance Issues
1. Reduce animation complexity
2. Use CSS transforms instead of position changes
3. Implement virtual scrolling for long lists
4. Lazy load below-the-fold content

## Additional Resources

For detailed implementation guides:
- Read `animation-patterns.md` for animation recipes
- Consult `ui-best-practices.md` for UI/UX guidelines
- Check `registry-guide.md` for component catalog

## Quick Reference

**Installation command format:**
```bash
npx shadcn@latest add @registry/component-name
```

**List registry components:**
```bash
npx shadcn@latest list @registry
```

**Check MCP status:**
```bash
/mcp
```

---

Remember: Great landing pages balance aesthetics with performance. Every animation should serve a purpose, and every component should guide users toward conversion.
