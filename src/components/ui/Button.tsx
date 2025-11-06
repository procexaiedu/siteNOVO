import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from './utils';

/**
 * Button component variants following MotherDuck design system
 * - Primary: Blue background (#6fc2ff)
 * - Secondary: Outline style with border
 * - Link: Transparent with no border
 */
const buttonVariants = cva(
  // Base styles - applied to all variants
  'inline-flex items-center justify-center font-aeonik-mono uppercase text-sm tracking-button transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-button-blue text-primary-dark border-2 border-primary-dark hover:-translate-y-0.5 active:translate-y-0',
        secondary: 'bg-transparent text-primary-dark border-2 border-primary-dark hover:bg-neutral-beige active:bg-neutral-beige/80',
        link: 'bg-transparent text-primary-dark underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-[22px] py-[16.5px] leading-4',
        sm: 'px-4 py-2 text-xs',
        lg: 'px-8 py-5 text-base',
        icon: 'h-10 w-10',
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
}

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
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    // Common classes for both button and anchor
    const classes = cn(buttonVariants({ variant, size, className }));

    // Render as anchor if href provided
    if (href) {
      return (
        <a
          href={href}
          className={cn(classes, 'no-underline')}
          role="button"
          aria-label={typeof children === 'string' ? children : undefined}
        >
          {children}
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
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
