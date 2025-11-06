# Animation Patterns Reference

This file contains production-ready animation patterns for landing pages. Each pattern includes implementation code and usage guidelines.

## Table of Contents

- [Entrance Animations](#entrance-animations)
- [Scroll-Triggered Animations](#scroll-triggered-animations)
- [Hover Effects](#hover-effects)
- [Loading States](#loading-states)
- [Micro-interactions](#micro-interactions)
- [Page Transitions](#page-transitions)

---

## Entrance Animations

### Hero Stagger
Sequentially animate hero elements for dramatic entrance.

**When to use:** Hero sections with multiple elements (headline, subheadline, CTA)

**Implementation:**
```tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function HeroStagger({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] // Custom easing
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

**Usage:**
```tsx
<HeroStagger>
  <h1>Your Headline</h1>
  <p>Your subheadline</p>
  <Button>Call to Action</Button>
</HeroStagger>
```

### Fade In Up
Simple fade with upward motion - works everywhere.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function FadeInUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}
```

### Scale In
Great for cards, images, and important elements.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function ScaleIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Scroll-Triggered Animations

### Reveal on Scroll
Elements appear as user scrolls to them.

**When to use:** Feature sections, testimonials, any content below the fold

**Implementation:**
```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function RevealOnScroll({ 
  children, 
  direction = 'up',
  delay = 0 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: '-100px' // Trigger 100px before element enters viewport
  });

  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}
```

**Usage:**
```tsx
<RevealOnScroll direction="up">
  <FeatureCard />
</RevealOnScroll>
```

### Parallax Effect
Background moves slower than foreground for depth.

**Implementation:**
```tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Parallax({ children, speed = 0.5 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
```

### Animated Counter
Numbers count up when visible - perfect for statistics.

**Implementation:**
```tsx
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2,
  suffix = '',
  prefix = ''
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { 
    damping: 60,
    stiffness: 100
  });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [isInView, to, motionValue]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>
        {springValue.get().toFixed(0)}
      </motion.span>
      {suffix}
    </span>
  );
}
```

---

## Hover Effects

### Lift on Hover
Card lifts and casts shadow on hover.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function LiftCard({ children }) {
  return (
    <motion.div
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ 
        duration: 0.3,
        ease: 'easeOut'
      }}
      className="rounded-lg bg-white p-6"
    >
      {children}
    </motion.div>
  );
}
```

### Magnetic Button
Button follows cursor on hover (within bounds).

**Implementation:**
```tsx
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function MagneticButton({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg"
    >
      {children}
    </motion.button>
  );
}
```

### Shimmer Effect
Subtle shine animation across buttons/cards.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function ShimmerButton({ children }) {
  return (
    <motion.button
      className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        variants={{
          hover: {
            x: ['0%', '200%'],
            transition: {
              duration: 0.6,
              ease: 'linear'
            }
          }
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
```

---

## Loading States

### Skeleton Loader
Pulsing placeholder while content loads.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function Skeleton({ className }) {
  return (
    <motion.div
      className={`bg-gray-200 rounded ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
}

// Usage
<div className="space-y-4">
  <Skeleton className="h-12 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-5/6" />
</div>
```

### Spinner
Smooth rotating loader.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function Spinner({ size = 40 }) {
  return (
    <motion.div
      className="border-4 border-gray-200 border-t-blue-600 rounded-full"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
}
```

### Progress Bar
Animated loading bar.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function ProgressBar({ progress = 0 }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-blue-600"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
}
```

---

## Micro-interactions

### Button Press
Satisfying click feedback.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function PressableButton({ children, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.1 }}
      onClick={onClick}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg"
    >
      {children}
    </motion.button>
  );
}
```

### Checkbox Animation
Smooth checkbox with checkmark animation.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function AnimatedCheckbox({ checked, onChange }) {
  return (
    <motion.div
      className="w-6 h-6 border-2 border-gray-300 rounded cursor-pointer"
      onClick={onChange}
      animate={{
        backgroundColor: checked ? '#3B82F6' : '#FFFFFF',
        borderColor: checked ? '#3B82F6' : '#D1D5DB'
      }}
    >
      {checked && (
        <motion.svg
          viewBox="0 0 24 24"
          className="text-white"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.path
            d="M5 13l4 4L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.svg>
      )}
    </motion.div>
  );
}
```

### Notification Toast
Slide in notification from edge.

**Implementation:**
```tsx
import { motion, AnimatePresence } from 'framer-motion';

export function Toast({ message, isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm"
        >
          <p>{message}</p>
          <button onClick={onClose} className="mt-2 text-sm text-blue-600">
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## Page Transitions

### Fade Transition
Smooth fade between pages.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### Slide Transition
Page slides in from side.

**Implementation:**
```tsx
import { motion } from 'framer-motion';

export function SlideTransition({ children, direction = 'right' }) {
  const variants = {
    enter: { x: direction === 'right' ? 1000 : -1000, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: direction === 'right' ? -1000 : 1000, opacity: 0 }
  };

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Performance Tips

1. **Use CSS transforms** (`translateX`, `scale`) instead of position properties
2. **Avoid animating layout properties** like `width`, `height`, `top`, `left`
3. **Use `will-change` sparingly** - only on elements actively animating
4. **Implement intersection observers** for scroll animations
5. **Respect `prefers-reduced-motion`**:

```tsx
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const variants = shouldReduceMotion ? {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
} : {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 }
};
```

---

## Accessibility Checklist

- [ ] All animations respect `prefers-reduced-motion`
- [ ] Keyboard navigation works during animations
- [ ] Focus states are visible during transitions
- [ ] Screen readers can access content during loading states
- [ ] Animations don't interfere with text selection
- [ ] No flashing/strobing effects (seizure risk)

---

Remember: Animation should enhance usability, not replace it. Every animation must have a purpose - guiding attention, providing feedback, or communicating state changes.
