import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from './utils';

/**
 * Container component variants following MotherDuck design system
 * - Responsive max-width breakpoints
 * - Centered content with horizontal margins
 * - Flexible padding options
 */
const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-screen-sm', // 640px
        md: 'max-w-screen-md', // 768px
        lg: 'max-w-screen-lg', // 1024px
        xl: 'max-w-screen-xl', // 1280px
        '2xl': 'max-w-screen-2xl', // 1536px
        hero: 'max-w-[1400px]', // Hero section width from design system
        full: 'max-w-full',
      },
      padding: {
        none: 'px-0',
        sm: 'px-4',
        default: 'px-6 md:px-8',
        lg: 'px-8 md:px-12 lg:px-16',
        xl: 'px-10 md:px-20 lg:px-[306.5px]', // Hero section padding from design system
      },
      vertical: {
        none: 'py-0',
        sm: 'py-4',
        default: 'py-8 md:py-12',
        lg: 'py-12 md:py-16 lg:py-20',
        xl: 'py-16 md:py-24 lg:py-32',
        hero: 'pt-[110px] pb-[180px]', // Hero section vertical padding
      },
    },
    defaultVariants: {
      size: 'xl',
      padding: 'default',
      vertical: 'none',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /**
   * Content to display inside container
   */
  children: React.ReactNode;
  /**
   * HTML element to render as (default: div)
   */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
}

/**
 * Container Component
 *
 * Responsive content wrapper following MotherDuck design system:
 * - Centered with max-width constraints
 * - Responsive horizontal padding
 * - Flexible sizing options
 * - Semantic HTML support
 *
 * @example
 * // Default container (1280px max-width)
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 *
 * @example
 * // Hero section container with specific spacing
 * <Container size="hero" padding="xl" vertical="hero">
 *   <h1>MAKING BIG DATA FEEL SMALL</h1>
 * </Container>
 *
 * @example
 * // Full-width container with no padding
 * <Container size="full" padding="none">
 *   <img src="..." alt="Full width image" />
 * </Container>
 *
 * @example
 * // Semantic section container
 * <Container as="section" size="lg" vertical="lg">
 *   <h2>Features</h2>
 * </Container>
 *
 * @example
 * // Responsive breakpoint examples:
 * // - Mobile (< 768px): Uses 'sm' padding
 * // - Tablet (768px - 1024px): Uses 'default' padding
 * // - Desktop (> 1024px): Uses full padding value
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size,
      padding,
      vertical,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ size, padding, vertical }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

/**
 * Section Component
 *
 * Semantic section wrapper with default vertical spacing
 * Pre-configured for common section patterns
 *
 * @example
 * <Section>
 *   <h2>Section Title</h2>
 *   <p>Section content</p>
 * </Section>
 */
const Section = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, vertical = 'lg', ...props }, ref) => {
    return (
      <Container
        ref={ref}
        as="section"
        vertical={vertical}
        className={className}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';

/**
 * Hero Component
 *
 * Pre-configured hero section container
 * Matches MotherDuck hero section spacing from design system
 *
 * @example
 * <Hero>
 *   <h1 className="text-hero">MAKING BIG DATA FEEL SMALL</h1>
 *   <Button>TRY 21 DAYS FREE</Button>
 * </Hero>
 */
const Hero = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size' | 'padding' | 'vertical'>>(
  ({ className, ...props }, ref) => {
    return (
      <Container
        ref={ref}
        as="section"
        size="hero"
        padding="xl"
        vertical="hero"
        className={cn('relative', className)}
        {...props}
      />
    );
  }
);

Hero.displayName = 'Hero';

/**
 * Responsive Breakpoints Reference:
 *
 * Mobile:    < 640px  (full width with small padding)
 * SM:        640px+   (max-w-screen-sm)
 * MD:        768px+   (max-w-screen-md)
 * LG:        1024px+  (max-w-screen-lg)
 * XL:        1280px+  (max-w-screen-xl)
 * 2XL:       1536px+  (max-w-screen-2xl)
 * Hero:      1400px   (MotherDuck hero max-width)
 *
 * Padding Scale (Horizontal):
 * - Desktop Large (> 1400px): 306.5px (hero)
 * - Desktop (1024px - 1400px): 100px
 * - Tablet (768px - 1024px):   50px
 * - Mobile (< 768px):          20px
 */

export { Container, Section, Hero, containerVariants };
