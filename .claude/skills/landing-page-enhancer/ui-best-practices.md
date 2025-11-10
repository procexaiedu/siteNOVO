# UI/UX Best Practices for Landing Pages

Comprehensive guide for creating high-converting, user-friendly landing pages.

## Table of Contents

- [Visual Hierarchy](#visual-hierarchy)
- [Typography](#typography)
- [Color & Contrast](#color--contrast)
- [Spacing & Layout](#spacing--layout)
- [Responsive Design](#responsive-design)
- [Forms & Input](#forms--input)
- [Images & Media](#images--media)
- [Conversion Optimization](#conversion-optimization)
- [Accessibility](#accessibility)
- [Performance](#performance)

---

## Visual Hierarchy

### Priority Levels

**Primary (highest priority):**
- Main headline
- Primary CTA button
- Hero image/video

**Secondary:**
- Subheadlines
- Key benefits (3-5 items)
- Secondary CTAs
- Social proof

**Tertiary:**
- Supporting text
- Navigation
- Footer

### Implementation

```tsx
// Good hierarchy example
<section className="py-20">
  {/* Primary - Largest, boldest */}
  <h1 className="text-5xl md:text-7xl font-bold mb-6">
    Transform Your Business Today
  </h1>
  
  {/* Secondary - Medium size */}
  <p className="text-xl md:text-2xl text-gray-600 mb-8">
    Join 10,000+ companies growing faster
  </p>
  
  {/* Primary action - High contrast */}
  <button className="bg-blue-600 text-white px-8 py-4 text-lg rounded-lg">
    Get Started Free
  </button>
  
  {/* Tertiary - Smaller, lower contrast */}
  <p className="text-sm text-gray-500 mt-4">
    No credit card required
  </p>
</section>
```

### Z-Pattern vs F-Pattern

**Z-Pattern** (for simple pages):
```
[Logo]           [Navigation]
        ↘
     [Hero Content]
  ↙
[Features]     [CTA]
```

**F-Pattern** (for content-heavy pages):
```
[Header] ――――――――――
↓
[Section 1] ―――――
↓
[Section 2] ―――
↓
[Section 3] ―
```

---

## Typography

### Font Selection

**Headlines:** Bold, impactful fonts
- Inter, Poppins, Montserrat, Space Grotesk
- Weight: 600-800

**Body:** Readable, neutral fonts
- Inter, Open Sans, Roboto, System fonts
- Weight: 400-500

**Code example:**
```tsx
// Tailwind config
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Space Grotesk', 'Inter', 'sans-serif'],
}
```

### Type Scale

Use consistent scale for harmony:

```tsx
const typographyScale = {
  // Mobile first
  'xs': '0.75rem',    // 12px
  'sm': '0.875rem',   // 14px
  'base': '1rem',     // 16px
  'lg': '1.125rem',   // 18px
  'xl': '1.25rem',    // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px
  '7xl': '4.5rem',    // 72px
};
```

**Usage:**
```tsx
<h1 className="text-4xl md:text-6xl lg:text-7xl">
  Main Headline
</h1>
<p className="text-lg md:text-xl">
  Supporting text
</p>
```

### Line Length & Height

**Optimal line length:** 50-75 characters
**Line height:** 1.5-1.75 for body text, 1.1-1.3 for headlines

```css
.body-text {
  max-width: 65ch; /* ~65 characters */
  line-height: 1.6;
}

.headline {
  line-height: 1.2;
  letter-spacing: -0.02em; /* Tighter for large text */
}
```

---

## Color & Contrast

### Color Palette Structure

```tsx
const colorPalette = {
  // Brand colors
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',  // Main brand color
    600: '#2563eb',  // Hover state
    900: '#1e3a8a',
  },
  
  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    600: '#4b5563',  // Body text
    900: '#111827',  // Headlines
  },
  
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
}
```

### Contrast Requirements

**WCAG AA (minimum):**
- Normal text: 4.5:1
- Large text (18pt+): 3:1
- UI components: 3:1

**Testing:**
```tsx
// Good contrast
<button className="bg-blue-600 text-white">
  {/* White on blue = ~8:1 ratio ✓ */}
  Click Here
</button>

// Bad contrast
<button className="bg-gray-200 text-gray-300">
  {/* Low contrast = ~2:1 ratio ✗ */}
  Click Here
</button>
```

### Color Psychology

**Blue:** Trust, professionalism (finance, tech)
**Green:** Growth, health (sustainability, wellness)
**Orange:** Energy, urgency (calls-to-action)
**Purple:** Creativity, luxury (premium brands)
**Red:** Urgency, passion (sales, alerts)

---

## Spacing & Layout

### The 8pt Grid System

Base all spacing on multiples of 8px:

```tsx
const spacing = {
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
}
```

### Container Widths

```tsx
// Responsive container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>

// Narrow content (for readability)
<div className="max-w-3xl mx-auto">
  <p>Long-form text content...</p>
</div>
```

### Whitespace Rules

**More whitespace:**
- Around headlines
- Between sections
- Around CTAs
- In hero areas

**Less whitespace:**
- Between related items
- Within cards/components
- In dense data tables

```tsx
// Section spacing
<section className="py-20 md:py-32">
  <div className="space-y-16">
    {/* Large space between sections */}
    <div className="space-y-4">
      {/* Small space within components */}
      <h2>Headline</h2>
      <p>Content</p>
    </div>
  </div>
</section>
```

---

## Responsive Design

### Mobile-First Breakpoints

```tsx
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',   // Small phones in landscape
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px', // Large screens
}
```

### Responsive Patterns

**Stack on Mobile, Grid on Desktop:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Cards automatically stack on mobile */}
</div>
```

**Hide/Show Elements:**
```tsx
{/* Show on mobile only */}
<div className="block md:hidden">
  <MobileMenu />
</div>

{/* Hide on mobile */}
<div className="hidden md:block">
  <DesktopNav />
</div>
```

**Responsive Typography:**
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  Scales with screen size
</h1>
```

### Touch Targets

**Minimum size:** 44x44px (Apple) or 48x48px (Google)

```tsx
// Good touch target
<button className="px-6 py-4 min-h-[48px]">
  Tap Here
</button>

// Bad touch target
<button className="px-2 py-1 text-xs">
  Too Small
</button>
```

---

## Forms & Input

### Form Layout

**Single Column (mobile):**
```tsx
<form className="space-y-6 max-w-md">
  <input type="text" placeholder="Name" />
  <input type="email" placeholder="Email" />
  <button type="submit">Submit</button>
</form>
```

**Two Column (desktop):**
```tsx
<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <input placeholder="First Name" />
  <input placeholder="Last Name" />
  <input placeholder="Email" className="md:col-span-2" />
  <button className="md:col-span-2">Submit</button>
</form>
```

### Input States

```tsx
// Normal state
<input className="border-gray-300 focus:border-blue-500" />

// Error state
<input className="border-red-500 focus:ring-red-500" />
{error && <p className="text-red-600 text-sm mt-1">{error}</p>}

// Success state
<input className="border-green-500" />

// Disabled state
<input disabled className="bg-gray-100 cursor-not-allowed" />
```

### Form Validation

**Inline validation:**
```tsx
import { useState } from 'react';

function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    if (!value.includes('@')) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        className={error ? 'border-red-500' : 'border-gray-300'}
      />
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
```

### Reduce Form Friction

**Progressive disclosure:**
```tsx
// Show only essential fields first
<form>
  <input type="email" placeholder="Email" required />
  <button>Continue</button>
  
  {/* Show more fields after email */}
  {emailEntered && (
    <>
      <input type="text" placeholder="Company" />
      <input type="tel" placeholder="Phone" />
    </>
  )}
</form>
```

**Autofill attributes:**
```tsx
<input
  type="text"
  name="name"
  autocomplete="name"
/>
<input
  type="email"
  name="email"
  autocomplete="email"
/>
<input
  type="tel"
  name="phone"
  autocomplete="tel"
/>
```

---

## Images & Media

### Image Optimization

**Next.js Image component:**
```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority // For above-the-fold images
  quality={85}
  placeholder="blur"
/>
```

**Lazy loading:**
```tsx
<img
  src="/feature.jpg"
  alt="Description"
  loading="lazy" // Native lazy loading
/>
```

### Responsive Images

```tsx
<picture>
  <source
    media="(min-width: 1024px)"
    srcSet="/hero-desktop.jpg"
  />
  <source
    media="(min-width: 640px)"
    srcSet="/hero-tablet.jpg"
  />
  <img
    src="/hero-mobile.jpg"
    alt="Hero"
  />
</picture>
```

### Video Best Practices

**Background video:**
```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/hero.mp4" type="video/mp4" />
  <source src="/hero.webm" type="video/webm" />
</video>
```

**Poster image:**
```tsx
<video
  poster="/video-poster.jpg" // Show before playing
  controls
>
  <source src="/demo.mp4" />
</video>
```

---

## Conversion Optimization

### Above the Fold Checklist

- [ ] Clear value proposition (5-word headline)
- [ ] Supporting subheadline explains benefit
- [ ] Primary CTA button visible
- [ ] Hero image/video relevant to offer
- [ ] Social proof visible (logos or testimonials)
- [ ] No navigation distractions (consider hiding menu)

### CTA Button Best Practices

**Clear action verbs:**
```tsx
// Good
<button>Start Your Free Trial</button>
<button>Get My Discount</button>
<button>Download the Guide</button>

// Bad
<button>Submit</button>
<button>Click Here</button>
<button>Learn More</button>
```

**Visual prominence:**
```tsx
<button className="
  bg-blue-600 
  text-white 
  px-8 
  py-4 
  text-lg 
  rounded-lg 
  shadow-lg 
  hover:bg-blue-700 
  hover:shadow-xl 
  transform 
  hover:-translate-y-0.5 
  transition-all
">
  Start Free Trial
</button>
```

### Trust Signals

**Social proof locations:**
1. Hero section (logos)
2. After features (testimonials)
3. Before CTA (case studies)
4. Footer (awards, certifications)

```tsx
// Logo cloud
<div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center opacity-60">
  <Image src="/logo1.svg" alt="Company 1" />
  <Image src="/logo2.svg" alt="Company 2" />
  {/* More logos */}
</div>

// Testimonial card
<div className="bg-white p-8 rounded-lg shadow-lg">
  <p className="text-lg italic mb-4">
    "This product transformed our workflow..."
  </p>
  <div className="flex items-center">
    <Image src="/avatar.jpg" className="rounded-full" />
    <div className="ml-4">
      <p className="font-bold">John Doe</p>
      <p className="text-gray-600">CEO, Company Inc</p>
    </div>
  </div>
</div>
```

### Urgency & Scarcity

```tsx
// Countdown timer
<div className="bg-red-50 border border-red-200 p-4 rounded-lg">
  <p className="text-red-800 font-bold">
    Offer ends in: {hours}:{minutes}:{seconds}
  </p>
</div>

// Limited spots
<p className="text-sm text-gray-600">
  Only 3 spots left at this price
</p>

// Live activity
<div className="flex items-center text-sm text-gray-600">
  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
  127 people viewing this page
</div>
```

---

## Accessibility

### Semantic HTML

```tsx
// Good - Semantic structure
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="#features">Features</a></li>
    </ul>
  </nav>
</header>

<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Welcome</h1>
  </section>
</main>

<footer>
  <p>© 2025 Company</p>
</footer>

// Bad - Non-semantic
<div class="header">
  <div class="nav">
    <div class="link">Features</div>
  </div>
</div>
```

### ARIA Labels

```tsx
// Decorative images
<img src="/decoration.svg" alt="" aria-hidden="true" />

// Icon buttons
<button aria-label="Close modal">
  <XIcon />
</button>

// Loading states
<div aria-live="polite" aria-busy={loading}>
  {loading ? 'Loading...' : content}
</div>

// Form errors
<input
  aria-invalid={error ? 'true' : 'false'}
  aria-describedby={error ? 'email-error' : undefined}
/>
{error && (
  <span id="email-error" role="alert">
    {error}
  </span>
)}
```

### Keyboard Navigation

```tsx
// Tab order
<button tabIndex={0}>Primary Action</button>
<button tabIndex={0}>Secondary Action</button>
<div tabIndex={-1}>Not tabbable</div>

// Skip link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  Skip to main content
</a>

// Focus trap in modal
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      {/* Modal content */}
    </div>
  );
}
```

---

## Performance

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Optimization Techniques

**Code splitting:**
```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false // Don't render on server
});
```

**Image optimization:**
```tsx
// Use WebP format
<Image src="/hero.webp" alt="Hero" />

// Blur placeholder
<Image
  src="/feature.jpg"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

**Font optimization:**
```tsx
// Preload critical fonts
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>

// Use font-display: swap
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2');
  font-display: swap;
}
```

**Reduce CLS:**
```tsx
// Reserve space for images
<div className="aspect-w-16 aspect-h-9">
  <Image src="/video.jpg" layout="fill" />
</div>

// Reserve space for dynamic content
<div className="min-h-[200px]">
  {loading ? <Skeleton /> : <Content />}
</div>
```

---

## Quick Reference Checklist

### Before Launch
- [ ] Mobile-responsive on all devices
- [ ] All images optimized (WebP, compressed)
- [ ] Forms work and validate properly
- [ ] All CTAs clearly visible and actionable
- [ ] Loading states for async operations
- [ ] Error states handled gracefully
- [ ] Accessibility tested (keyboard nav, screen reader)
- [ ] Performance tested (Lighthouse score > 90)
- [ ] Cross-browser tested (Chrome, Safari, Firefox)
- [ ] Analytics/tracking implemented

### Visual Design
- [ ] Consistent spacing (8pt grid)
- [ ] Proper typography scale
- [ ] Sufficient color contrast (4.5:1)
- [ ] Clear visual hierarchy
- [ ] Brand colors applied consistently

### Conversion
- [ ] Value proposition above fold
- [ ] Single primary CTA per section
- [ ] Social proof visible
- [ ] Trust signals present
- [ ] Form friction minimized
- [ ] Mobile CTA easy to tap

---

Remember: Good UI is invisible. Users should accomplish their goals without thinking about the interface. Test with real users and iterate based on feedback.
