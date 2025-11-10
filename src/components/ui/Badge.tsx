import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from './utils';

/**
 * Badge component variants following MotherDuck design system
 * - Compact, uppercase text
 * - 2px border for outlined variants
 * - Minimal border radius (2px)
 */
const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[2px] font-aeonik-mono text-xs uppercase tracking-wide transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-primary-dark text-white border-2 border-primary-dark',
        secondary: 'bg-neutral-beige text-primary-dark border-2 border-primary-dark',
        outline: 'bg-transparent text-primary-dark border-2 border-primary-dark',
        accent: 'bg-accent-teal text-white border-2 border-accent-teal',
        warning: 'bg-banner-yellow text-primary-dark border-2 border-primary-dark',
        success: 'bg-green-500 text-white border-2 border-green-600',
        error: 'bg-red-500 text-white border-2 border-red-600',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        default: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Content to display inside badge
   */
  children: React.ReactNode;
  /**
   * Optional icon to display before text
   */
  icon?: React.ReactNode;
  /**
   * Whether badge is interactive (adds hover effects)
   */
  interactive?: boolean;
}

/**
 * Badge Component
 *
 * Small status/tag indicator following MotherDuck design system:
 * - Border: 2px solid (matches background or contrasting color)
 * - Border radius: 2px
 * - Font: Aeonik Mono, uppercase
 * - Compact size for inline use
 *
 * @example
 * // Default badge
 * <Badge>NEW</Badge>
 *
 * @example
 * // Accent badge with icon
 * <Badge variant="accent" icon={<StarIcon />}>
 *   FEATURED
 * </Badge>
 *
 * @example
 * // Warning badge
 * <Badge variant="warning">BETA</Badge>
 *
 * @example
 * // Outline badge (minimal)
 * <Badge variant="outline" size="sm">TAG</Badge>
 *
 * @example
 * // Interactive badge (clickable)
 * <Badge variant="secondary" interactive onClick={handleClick}>
 *   CLICK ME
 * </Badge>
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      children,
      icon,
      interactive = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size }),
          interactive && 'cursor-pointer hover:opacity-80 active:opacity-100',
          className
        )}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {icon && <span className="mr-1 flex items-center">{icon}</span>}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * BadgeGroup - Container for multiple badges
 *
 * @example
 * <BadgeGroup>
 *   <Badge>NEW</Badge>
 *   <Badge variant="accent">FEATURED</Badge>
 *   <Badge variant="outline">TAG</Badge>
 * </BadgeGroup>
 */
const BadgeGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...props}
    >
      {children}
    </div>
  );
});

BadgeGroup.displayName = 'BadgeGroup';

export { Badge, BadgeGroup, badgeVariants };
