# Standard Operating Procedures (SOP)

## Development Workflow

### 1. Adding a New Section Component

**Steps:**

1. Create new section in `src/components/sections/YourSection.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';

export const YourSection: React.FC = () => {
  return (
    <section
      className="relative bg-background py-[90px] md:py-[110px] lg:py-[180px]"
      aria-labelledby="yoursection-heading"
    >
      <Container size="xl" padding="default">
        {/* Content */}
        <h2 id="yoursection-heading" className="font-aeonik-mono text-3xl md:text-4xl lg:text-[48px] uppercase">
          Your Section
        </h2>
      </Container>
    </section>
  );
};

export default YourSection;
```

2. Import in `src/App.tsx` main section:
```tsx
import { YourSection } from './components/sections/YourSection'

// In return JSX:
<YourSection />
```

3. **Mobile Optimization Checklist:**
   - [ ] Add responsive padding with `clamp()` for spacing
   - [ ] Ensure touch targets ≥44px
   - [ ] Add `aria-labelledby` for accessibility
   - [ ] Test on mobile (375px width)
   - [ ] Use `md:`, `lg:` prefixes for breakpoints
   - [ ] Implement progressive disclosure if 3+ items

---

### 2. Creating a Responsive Component

**Mobile-First Strategy:**

```tsx
// WRONG - Desktop-first approach (avoid!)
className="flex gap-6"  // 24px gap
  {/* 3 columns on desktop */}

// CORRECT - Mobile-first with breakpoint overrides
className="flex flex-col md:flex-row gap-4 md:gap-6"
//        mobile: vertical   desktop: horizontal
//        16px gap           24px gap
```

**Spacing with clamp():**
```tsx
// For responsive padding that scales smoothly
<div className="p-responsive-section">
  {/* 60px mobile → 180px desktop */}
</div>

// For horizontal padding
<div className="px-responsive-x">
  {/* 16px mobile → 306.5px desktop */}
</div>
```

**Touch Targets:**
```tsx
// All interactive elements must have min-h-[44px] on mobile
<Button className="min-h-[44px] md:min-h-auto" />
<Input className="min-h-[44px] md:min-h-auto" />
<select className="min-h-[44px] md:min-h-auto" />
```

---

### 3. Implementing Progressive Disclosure (Tabs/Accordion)

#### For 3+ Items - Use Tabs (Horizontal)

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MyTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const items = [/* ... */];

  return (
    <>
      {/* Tabs - Mobile Only */}
      <div className="md:hidden mb-4 flex gap-2 overflow-x-auto">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded border-2 ${
              activeTab === i ? 'bg-button-blue border-primary-dark' : 'border-primary-dark/30'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Content - Mobile Only */}
      <AnimatePresence mode="wait">
        <div className="md:hidden">
          {items.map((item, i) => (
            <motion.div
              key={i}
              hidden={activeTab !== i}
              initial={{ opacity: 0, y: 20 }}
              animate={activeTab === i ? { opacity: 1, y: 0 } : { opacity: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === i && <div>{item.content}</div>}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Desktop Grid - Hidden on Mobile */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i}>{item.content}</div>
        ))}
      </div>
    </>
  );
}
```

#### For 5+ Items - Use Accordion (Vertical)

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function MyAccordion() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const items = [/* ... */];

  return (
    <div className="lg:hidden space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border-2 border-primary-dark rounded-[4px]">
          {/* Header */}
          <button
            onClick={() => setExpandedStep(expandedStep === i ? null : i)}
            className="w-full flex justify-between p-4 hover:bg-background/50"
            aria-expanded={expandedStep === i}
          >
            <h3>{item.title}</h3>
            <motion.div animate={{ rotate: expandedStep === i ? 180 : 0 }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>

          {/* Content */}
          <AnimatePresence>
            {expandedStep === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t-2 border-primary-dark px-4 py-4"
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
```

---

### 4. Adding Form Fields

**Step 1: Add to Zod schema**
```tsx
const contactSchema = z.object({
  newField: z.string().min(2, 'Field is required'),
});
```

**Step 2: Use in form**
```tsx
<Input
  label="Field Label *"
  {...register('newField')}
  error={errors.newField?.message}
  placeholder="Example"
  inputMode="text"  // Set appropriate inputMode
  autoComplete="given-name"  // Set autocomplete
  disabled={isSubmitting}
/>
```

**inputMode Options:**
- `text` - Default keyboard
- `email` - Email keyboard
- `tel` - Phone keyboard
- `number` - Number keyboard
- `decimal` - Decimal number keyboard

**autoComplete Options:**
- `name`, `given-name`, `family-name`
- `email`, `tel`, `url`
- `organization`, `organization-type`
- [Full list](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)

---

### 5. Styling Responsively

**Breakpoint Classes:**
```
Base: Mobile (< 640px)
sm: 640px+
md: 768px+   ← Main breakpoint (tablet/desktop start)
lg: 1024px+  ← Desktop
xl: 1280px+  ← Large desktop
2xl: 1536px+ ← Extra large
```

**Pattern - Hide/Show at breakpoint:**
```tsx
{/* Hidden on mobile, visible on md+ */}
<div className="hidden md:block">Desktop only</div>

{/* Visible on mobile, hidden on md+ */}
<div className="md:hidden">Mobile only</div>

{/* Different layouts */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>
```

**Spacing Scales:**
```
Base (mobile): 16px - 60px
Tablet (md): Scales with vw
Desktop (lg): 100px - 306px
```

---

### 6. Adding Animations

**Using Framer Motion:**

```tsx
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
    >
      Content
    </motion.div>
  );
}
```

**Best Practices:**
- Always use `viewport={{ once: true }}` (trigger on first view)
- Add `margin` to trigger animation before element is visible
- Respect `useReducedMotion()` for accessibility
- Use `transform` instead of `x`/`y` (GPU-accelerated)
- Use `spring` physics for natural motion

---

### 7. Testing Mobile Responsiveness

**Using Chrome DevTools:**
1. Open DevTools (F12)
2. Click mobile icon (Ctrl+Shift+M)
3. Select device:
   - iPhone 6/7/8 (375px)
   - Pixel 5 (393px)
   - iPad (768px)

**Manual Testing Checklist:**
- [ ] Text readable without zoom
- [ ] Touch targets ≥44px
- [ ] No horizontal scroll
- [ ] Progressive disclosure working
- [ ] Forms mobile-optimized
- [ ] Sticky CTA appears

**Performance Testing:**
```
DevTools → Lighthouse → Mobile (3G throttled)
Target: LCP < 2.0s, CLS < 0.1
```

---

### 8. Adding Icons

**Using Lucide React:**
```tsx
import { ArrowRight, ChevronDown } from 'lucide-react';

// Basic usage
<ArrowRight className="w-5 h-5 text-primary-dark" strokeWidth={2} />

// With hover effect
<motion.div whileHover={{ x: 5 }}>
  <ArrowRight className="w-5 h-5" />
</motion.div>
```

**Icon Size Guidelines:**
- Inline text: 16px (w-4 h-4)
- Section headers: 24px (w-6 h-6)
- Feature cards: 32px-48px (w-8 h-8 to w-12 h-12)
- Always set `strokeWidth={2}` for consistency

---

### 9. Git Workflow

**Creating a commit:**
```bash
git add .
git commit -m "$(cat <<'EOF'
Short description of change

More detailed explanation if needed:
- Point 1
- Point 2
- Point 3

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**Branch naming:**
```
feature/mobile-optimization
bugfix/sticky-cta-positioning
chore/update-dependencies
```

---

### 10. Common Issues & Solutions

#### Issue: Layout Shift on Scroll
**Solution:** Use `clamp()` instead of fixed values
```css
/* WRONG */
padding: 20px; /* @md */ padding: 100px;

/* CORRECT */
padding: clamp(20px, 8vw, 100px);
```

#### Issue: Touch targets too small on mobile
**Solution:** Add `min-h-[44px]` with `md:min-h-auto` override
```tsx
<button className="min-h-[44px] md:min-h-auto">Click me</button>
```

#### Issue: Animation stutters on mobile
**Solution:** Use `transform` instead of `x`/`y`, add `will-change`
```tsx
<motion.div
  animate={{ transform: 'translateX(10px)' }}  // GPU accelerated
  style={{ willChange: 'transform' }}
/>
```

#### Issue: Form doesn't autofill on iOS
**Solution:** Add `autoComplete` attribute with valid value
```tsx
<Input
  type="email"
  autoComplete="email"  // Must match input type
/>
```

---

## Related Documentation

- **Project Architecture:** `PROJECT_ARCHITECTURE.md`
- **Mobile Optimization:** `MOBILE_OPTIMIZATION.md`
- **Component Reference:** `COMPONENT_REFERENCE.md`
