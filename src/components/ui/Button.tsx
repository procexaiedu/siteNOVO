import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import ScrambleHover from '@/components/fancy/text/scramble-hover';
import { cn } from './utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Button component variants following MotherDuck design system
 * - Primary: Blue background (#6fc2ff)
 * - Secondary: Outline style with border
 * - Link: Transparent with no border
 */
const buttonVariants = cva(
  // Base styles - applied to all variants
  'inline-flex items-center justify-center font-aeonik-mono uppercase text-sm tracking-button transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px] md:min-h-auto',
  {
    variants: {
      variant: {
        primary: 'bg-cta-green text-white border-2 border-primary-dark hover:-translate-y-0.5 active:translate-y-0',
        secondary: 'bg-transparent text-primary-dark border-2 border-primary-dark hover:bg-neutral-beige active:bg-neutral-beige/80',
        link: 'bg-transparent text-primary-dark underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-[22px] py-[16.5px] leading-4 md:min-h-auto',
        sm: 'px-4 py-2 text-xs md:min-h-auto',
        lg: 'px-8 py-5 text-base md:min-h-auto',
        icon: 'h-10 w-10 md:h-10 md:w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Optional href - if provided, renders as anchor tag
   */
  href?: string;
  /**
   * Content to display inside button
   */
  children: React.ReactNode;
  /**
   * Enable scramble hover effect on text
   */
  scrambleHover?: boolean;
}

/**
 * Helper function to process children and apply scramble effect to text
 */
const processChildrenWithScramble = (children: React.ReactNode, scrambleHover?: boolean): React.ReactNode => {
  if (!scrambleHover) return children;

  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return (
        <ScrambleHover
          key={child}
          text={child}
          sequential={false}
          revealDirection="start"
          scrambleSpeed={30}
          maxIterations={8}
          className="inline-block"
        />
      );
    }
    return child;
  });
};

/**
 * Button Component
 *
 * Primary CTA button following MotherDuck design system:
 * - Border: 2px solid #383838
 * - Border radius: 2px
 * - Font: Aeonik Mono (Space Mono fallback)
 * - Letter spacing: 0.5px
 * - Uppercase transformation
 *
 * @example
 * // Primary button
 * <Button>TRY 21 DAYS FREE</Button>
 *
 * @example
 * // Secondary outline button
 * <Button variant="secondary">LEARN MORE</Button>
 *
 * @example
 * // Link button with href
 * <Button variant="link" href="/login">LOG IN</Button>
 *
 * @example
 * // Small size button
 * <Button size="sm" onClick={handleClick}>SUBMIT</Button>
 *
 * @example
 * // Button with scramble hover effect
 * <Button scrambleHover>HOVER ME</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, scrambleHover, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    // Common classes for both button and anchor
    const classes = cn(buttonVariants({ variant, size, className }));
    // Disable scramble effect if user prefers reduced motion
    const shouldEnableScramble = scrambleHover && !prefersReducedMotion;
    const processedChildren = processChildrenWithScramble(children, shouldEnableScramble);

    // Render as anchor if href provided
    if (href) {
      return (
        <a
          href={href}
          className={cn(classes, 'no-underline')}
          role="button"
          aria-label={typeof children === 'string' ? children : undefined}
        >
          {processedChildren}
        </a>
      );
    }

    // Default button element
    return (
      <button
        ref={ref}
        className={classes}
        aria-label={typeof children === 'string' ? children : undefined}
        {...props}
      >
        {processedChildren}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
