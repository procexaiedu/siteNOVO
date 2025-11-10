# Component Registry Guide

Complete catalog of available components from premium registries configured in your project.

## Registry Overview

Your project has access to these premium component registries:

```json
{
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

## Installation Commands

### Browse Registry Components
```bash
# List all components in a registry
npx shadcn@latest list @magicui
npx shadcn@latest list @animateui
npx shadcn@latest list @fancycomponents
```

### Install Components
```bash
# Install single component
npx shadcn@latest add @magicui/animated-beam

# Install multiple components
npx shadcn@latest add @magicui/hero-video-dialog @animateui/fade-in
```

### Check MCP Status
```bash
# Verify MCP server is running
/mcp
```

---

## @magicui - Magical Animated Components

**Focus:** Eye-catching animations and effects
**Best for:** Hero sections, feature showcases, standout elements

### Key Components

#### animated-beam
Animated connecting lines between elements.
```tsx
import { AnimatedBeam } from '@magicui/animated-beam';

<AnimatedBeam
  from={elementRef1}
  to={elementRef2}
  color="blue"
  duration={3}
/>
```
**Use case:** Show data flow, connections, system diagrams

#### hero-video-dialog
Video background with dialog overlay.
```tsx
import { HeroVideoDialog } from '@magicui/hero-video-dialog';

<HeroVideoDialog
  videoSrc="/demo.mp4"
  thumbnailSrc="/thumbnail.jpg"
  animationStyle="fade"
/>
```
**Use case:** Hero sections with product demos

#### bento-grid
Modern grid layout for features.
```tsx
import { BentoGrid, BentoCard } from '@magicui/bento-grid';

<BentoGrid>
  <BentoCard
    name="Feature 1"
    description="Description"
    Icon={IconComponent}
    className="col-span-2"
  />
</BentoGrid>
```
**Use case:** Feature sections, product showcases

#### animated-testimonials
Carousel testimonials with smooth transitions.
```tsx
import { AnimatedTestimonials } from '@magicui/animated-testimonials';

<AnimatedTestimonials
  testimonials={[
    { quote: "...", author: "...", role: "..." }
  ]}
  autoplay
/>
```
**Use case:** Social proof sections

#### shimmer-button
Button with shimmer animation effect.
```tsx
import { ShimmerButton } from '@magicui/shimmer-button';

<ShimmerButton>
  Get Started
</ShimmerButton>
```
**Use case:** Primary CTAs that need attention

#### number-ticker
Animated counting numbers.
```tsx
import { NumberTicker } from '@magicui/number-ticker';

<NumberTicker
  value={10000}
  suffix="+"
  delay={0}
/>
```
**Use case:** Statistics, achievements, metrics

---

## @animateui - Animation Library

**Focus:** Smooth, professional animations
**Best for:** Entrance animations, scroll effects, transitions

### Key Components

#### fade-in
Simple fade in animation.
```tsx
import { FadeIn } from '@animateui/fade-in';

<FadeIn delay={0.2}>
  <Content />
</FadeIn>
```
**Use case:** Universal animation for any element

#### scroll-fade
Fade in elements as they enter viewport.
```tsx
import { ScrollFade } from '@animateui/scroll-fade';

<ScrollFade direction="up">
  <FeatureCard />
</ScrollFade>
```
**Use case:** Features, testimonials below fold

#### text-reveal
Animated text reveal with typewriter effect.
```tsx
import { TextReveal } from '@animateui/text-reveal';

<TextReveal
  text="Welcome to the future"
  duration={2}
/>
```
**Use case:** Hero headlines, key messages

#### counter
Animated number counter.
```tsx
import { Counter } from '@animateui/counter';

<Counter
  from={0}
  to={10000}
  duration={2000}
  suffix=" users"
/>
```
**Use case:** Statistics, milestones, achievements

#### parallax
Parallax scroll effect.
```tsx
import { Parallax } from '@animateui/parallax';

<Parallax speed={0.5}>
  <Image src="/background.jpg" />
</Parallax>
```
**Use case:** Background images, hero sections

#### stagger-children
Stagger animation for multiple child elements.
```tsx
import { StaggerChildren } from '@animateui/stagger-children';

<StaggerChildren delay={0.1}>
  <Card1 />
  <Card2 />
  <Card3 />
</StaggerChildren>
```
**Use case:** Feature grids, benefit lists

---

## @fancycomponents - Premium UI Components

**Focus:** Polished, production-ready components
**Best for:** Professional landing pages, SaaS products

### Key Components

#### feature-card
Interactive feature cards with icons.
```tsx
import { FeatureCard } from '@fancycomponents/feature-card';

<FeatureCard
  icon={<IconComponent />}
  title="Feature Name"
  description="Description"
  gradient
/>
```
**Use case:** Feature sections, benefits

#### gradient-text
Text with animated gradient.
```tsx
import { GradientText } from '@fancycomponents/gradient-text';

<GradientText
  from="blue"
  to="purple"
  animate
>
  Stunning Headlines
</GradientText>
```
**Use case:** Headlines, key messages

#### cta-section
High-converting CTA section.
```tsx
import { CTASection } from '@fancycomponents/cta-section';

<CTASection
  title="Ready to get started?"
  description="Join thousands of users"
  primaryButton={{
    text: "Start Free Trial",
    href: "/signup"
  }}
/>
```
**Use case:** Bottom of page CTAs

#### logo-cloud
Animated logo showcase.
```tsx
import { LogoCloud } from '@fancycomponents/logo-cloud';

<LogoCloud
  logos={[
    { src: "/logo1.svg", alt: "Company 1" }
  ]}
  animate
/>
```
**Use case:** Social proof, client logos

#### pricing-card
Modern pricing tables.
```tsx
import { PricingCard } from '@fancycomponents/pricing-card';

<PricingCard
  tier="Pro"
  price={29}
  features={["Feature 1", "Feature 2"]}
  highlight
/>
```
**Use case:** Pricing sections

#### hero-section
Complete hero section component.
```tsx
import { HeroSection } from '@fancycomponents/hero-section';

<HeroSection
  title="Transform Your Business"
  subtitle="The all-in-one solution"
  cta={{
    primary: "Get Started",
    secondary: "Learn More"
  }}
  image="/hero.png"
/>
```
**Use case:** Hero sections (quick setup)

---

## @shadcn-form - Form Components

**Focus:** Forms with built-in validation
**Best for:** Contact forms, signup forms, complex inputs

### Key Components

#### contact-form
Complete contact form with validation.
```tsx
import { ContactForm } from '@shadcn-form/contact-form';

<ContactForm
  onSubmit={handleSubmit}
  fields={['name', 'email', 'message']}
  submitText="Send Message"
/>
```
**Use case:** Contact pages, inquiries

#### signup-form
User registration form.
```tsx
import { SignupForm } from '@shadcn-form/signup-form';

<SignupForm
  onSubmit={handleSignup}
  fields={['name', 'email', 'password']}
  socialAuth={['google', 'github']}
/>
```
**Use case:** Registration, authentication

#### newsletter-form
Email capture form.
```tsx
import { NewsletterForm } from '@shadcn-form/newsletter-form';

<NewsletterForm
  onSubmit={handleSubscribe}
  placeholder="Enter your email"
  buttonText="Subscribe"
  inline
/>
```
**Use case:** Newsletter signups, lead capture

#### multi-step-form
Wizard-style multi-step form.
```tsx
import { MultiStepForm } from '@shadcn-form/multi-step-form';

<MultiStepForm
  steps={[
    { title: "Personal Info", fields: [...] },
    { title: "Company Info", fields: [...] },
    { title: "Preferences", fields: [...] }
  ]}
  onComplete={handleComplete}
/>
```
**Use case:** Complex signups, onboarding

#### validated-input
Single input with validation.
```tsx
import { ValidatedInput } from '@shadcn-form/validated-input';

<ValidatedInput
  type="email"
  label="Email Address"
  validation={{
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }}
  error="Please enter a valid email"
/>
```
**Use case:** Custom forms, specific inputs

---

## @tailark - Tailwind Component Library

**Focus:** Utility-first components with Tailwind
**Best for:** Rapid prototyping, consistent styling

### Key Components

#### section-header
Reusable section headers.
```tsx
import { SectionHeader } from '@tailark/section-header';

<SectionHeader
  badge="Features"
  title="Everything you need"
  description="Powerful tools for modern teams"
  centered
/>
```
**Use case:** Section introductions

#### stat-card
Statistics display cards.
```tsx
import { StatCard } from '@tailark/stat-card';

<StatCard
  value="10,000+"
  label="Happy Customers"
  icon={<UserIcon />}
  trend="+12%"
/>
```
**Use case:** Metrics, achievements

#### team-member
Team member profile cards.
```tsx
import { TeamMember } from '@tailark/team-member';

<TeamMember
  name="John Doe"
  role="CEO & Founder"
  image="/team/john.jpg"
  social={{
    twitter: "...",
    linkedin: "..."
  }}
/>
```
**Use case:** About/team sections

#### faq-accordion
FAQ accordion component.
```tsx
import { FAQAccordion } from '@tailark/faq-accordion';

<FAQAccordion
  items={[
    { question: "...", answer: "..." }
  ]}
/>
```
**Use case:** FAQ sections

---

## @alpine - Alpine.js Components

**Focus:** Lightweight, reactive components
**Best for:** Interactive elements without heavy frameworks

### Key Components

#### dropdown-menu
Accessible dropdown menus.
```tsx
import { DropdownMenu } from '@alpine/dropdown-menu';

<DropdownMenu
  trigger="Menu"
  items={[
    { label: "Item 1", href: "#" }
  ]}
/>
```
**Use case:** Navigation, actions

#### modal-dialog
Accessible modal dialogs.
```tsx
import { ModalDialog } from '@alpine/modal-dialog';

<ModalDialog
  trigger="Open Modal"
  title="Modal Title"
>
  <ModalContent />
</ModalDialog>
```
**Use case:** Forms, videos, content overlays

#### tabs
Tab navigation component.
```tsx
import { Tabs } from '@alpine/tabs';

<Tabs
  tabs={[
    { label: "Tab 1", content: <Content1 /> },
    { label: "Tab 2", content: <Content2 /> }
  ]}
/>
```
**Use case:** Feature comparisons, content organization

---

## @plateui - Rich Text Editor Components

**Focus:** Rich content editing
**Best for:** Blog-style content, documentation

### Key Components

#### rich-text-editor
Full-featured text editor.
```tsx
import { RichTextEditor } from '@plateui/rich-text-editor';

<RichTextEditor
  value={content}
  onChange={setContent}
  plugins={['bold', 'italic', 'link', 'image']}
/>
```
**Use case:** Content creation, testimonials input

---

## Component Selection Guide

### By Landing Page Section

**Hero Section:**
- `@magicui/hero-video-dialog`
- `@fancycomponents/hero-section`
- `@animateui/text-reveal`
- `@magicui/shimmer-button`

**Features:**
- `@magicui/bento-grid`
- `@fancycomponents/feature-card`
- `@animateui/scroll-fade`
- `@tailark/section-header`

**Social Proof:**
- `@magicui/animated-testimonials`
- `@fancycomponents/logo-cloud`
- `@magicui/number-ticker`
- `@tailark/stat-card`

**Forms:**
- `@shadcn-form/contact-form`
- `@shadcn-form/newsletter-form`
- `@shadcn-form/signup-form`

**CTAs:**
- `@fancycomponents/cta-section`
- `@magicui/shimmer-button`
- `@animateui/fade-in`

**Team/About:**
- `@tailark/team-member`
- `@fancycomponents/feature-card`

**FAQ:**
- `@tailark/faq-accordion`
- `@alpine/tabs`

### By Animation Complexity

**Simple (fast loading):**
- `@animateui/fade-in`
- `@animateui/scroll-fade`
- `@fancycomponents/gradient-text`

**Medium:**
- `@magicui/animated-testimonials`
- `@animateui/stagger-children`
- `@magicui/number-ticker`

**Complex (use sparingly):**
- `@magicui/animated-beam`
- `@magicui/hero-video-dialog`
- `@animateui/parallax`

---

## Usage Tips

### Performance Optimization

1. **Lazy load below-the-fold components:**
```tsx
import dynamic from 'next/dynamic';

const Testimonials = dynamic(
  () => import('@magicui/animated-testimonials'),
  { ssr: false }
);
```

2. **Limit animated components:**
- Max 3-5 heavily animated components per page
- Use simpler animations for secondary elements

3. **Test on slow devices:**
- Verify animations don't cause jank
- Consider reducing complexity for mobile

### Combining Registries

Mix components from different registries:

```tsx
// Hero with multiple registry components
<section>
  <FadeIn> {/* @animateui */}
    <GradientText> {/* @fancycomponents */}
      Welcome to Our Product
    </GradientText>
    
    <HeroVideoDialog {/* @magicui */}
      videoSrc="/demo.mp4"
    />
    
    <ShimmerButton> {/* @magicui */}
      Get Started Free
    </ShimmerButton>
  </FadeIn>
</section>
```

### Troubleshooting

**Component not found:**
```bash
# Verify registry is configured
cat components.json

# Check available components
npx shadcn@latest list @registry-name

# Try reinstalling
npx shadcn@latest add @registry/component-name --force
```

**Styling conflicts:**
```tsx
// Use component-specific scoping
<div className="[&_.magicui-button]:bg-blue-600">
  <ComponentWithConflict />
</div>
```

**Animation not working:**
- Check if Framer Motion is installed: `npm install framer-motion`
- Verify component imports are correct
- Check browser console for errors

---

## Quick Reference

### Installation Workflow
1. Browse: `npx shadcn@latest list @registry`
2. Install: `npx shadcn@latest add @registry/component`
3. Import: `import { Component } from '@registry/component'`
4. Use: `<Component />`

### Common Commands
```bash
# List all registries
cat components.json | grep registries

# Check MCP status
/mcp

# Force reinstall component
npx shadcn@latest add @registry/component --force

# View component source
cat components/ui/component-name.tsx
```

---

Remember: Choose components that align with your brand and performance requirements. Don't overcomplicate - sometimes a simple fade-in is better than a complex animation.
