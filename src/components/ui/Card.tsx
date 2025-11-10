import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from './utils';

/**
 * Card component variants following MotherDuck design system
 * - Border: 2px solid #383838
 * - Border radius: 4px
 * - Padding: Adequate spacing based on size
 */
const cardVariants = cva(
  'border-2 border-primary-dark bg-white transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'shadow-none',
        elevated: 'shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
      radius: {
        sm: 'rounded-[2px]',
        default: 'rounded-[4px]',
        lg: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      radius: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Content to display inside card
   */
  children: React.ReactNode;
}

/**
 * Card Component
 *
 * Container component following MotherDuck design system:
 * - Border: 2px solid #383838
 * - Border radius: 4px (default)
 * - Minimal shadows (border-first design)
 *
 * @example
 * // Default card
 * <Card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 *
 * @example
 * // Elevated card with shadow
 * <Card variant="elevated" padding="lg">
 *   <h3>Featured Content</h3>
 *   <p>This card has elevation</p>
 * </Card>
 *
 * @example
 * // Card with no padding (for images)
 * <Card padding="none">
 *   <img src="..." alt="..." />
 *   <div className="p-6">Content with custom padding</div>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, radius, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, radius, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader - Optional header section with bottom border
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'border-b-2 border-primary-dark pb-4 mb-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Styled title for card header
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        'font-aeonik-mono text-lg font-normal uppercase tracking-wide text-primary-dark',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = 'CardTitle';

/**
 * CardContent - Main content area
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('font-inter text-primary-dark', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

/**
 * CardFooter - Optional footer section with top border
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'border-t-2 border-primary-dark pt-4 mt-4 flex items-center gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardContent, CardFooter, cardVariants };
