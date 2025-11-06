import React from 'react';
import { cn } from './utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below input
   */
  helperText?: string;
  /**
   * Icon to display at the start of input
   */
  startIcon?: React.ReactNode;
  /**
   * Icon to display at the end of input
   */
  endIcon?: React.ReactNode;
  /**
   * Full width input
   */
  fullWidth?: boolean;
}

/**
 * Input Component
 *
 * Form input following MotherDuck design system:
 * - Border: 2px solid #383838
 * - Border radius: 2px
 * - Error state with visual feedback
 * - Integrated label support
 * - Accessible with ARIA labels
 *
 * @example
 * // Basic input with label
 * <Input label="Email" type="email" placeholder="your@email.com" />
 *
 * @example
 * // Input with error state
 * <Input
 *   label="Username"
 *   error="Username is required"
 *   defaultValue=""
 * />
 *
 * @example
 * // Input with helper text
 * <Input
 *   label="Password"
 *   type="password"
 *   helperText="Must be at least 8 characters"
 * />
 *
 * @example
 * // Input with icons
 * <Input
 *   label="Search"
 *   startIcon={<SearchIcon />}
 *   placeholder="Search..."
 * />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth = false,
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${React.useId()}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="font-aeonik-mono text-sm uppercase tracking-wide text-primary-dark"
          >
            {label}
          </label>
        )}

        {/* Input wrapper for icons */}
        <div className="relative">
          {/* Start icon */}
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-dark">
              {startIcon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            type={type}
            id={inputId}
            className={cn(
              // Base styles
              'w-full rounded-[2px] border-2 px-4 py-3 font-inter text-base transition-all duration-200',
              'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
              // Border colors
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-primary-dark focus:border-accent-teal focus:ring-accent-teal',
              // Icon padding
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              // Custom className
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />

          {/* End icon */}
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-dark">
              {endIcon}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            className="font-inter text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p
            id={helperId}
            className="font-inter text-sm text-gray-600"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea Component
 *
 * Multi-line text input with same design system as Input
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      fullWidth = false,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${React.useId()}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    return (
      <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className="font-aeonik-mono text-sm uppercase tracking-wide text-primary-dark"
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full rounded-[2px] border-2 px-4 py-3 font-inter text-base transition-all duration-200',
            'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
            'resize-y',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-primary-dark focus:border-accent-teal focus:ring-accent-teal',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          {...props}
        />

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            className="font-inter text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p
            id={helperId}
            className="font-inter text-sm text-gray-600"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea };
