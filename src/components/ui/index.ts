/**
 * UI Components Export
 *
 * Centralized export file for all reusable UI components
 * following MotherDuck design system specifications.
 *
 * Design System Principles:
 * - Border-first design: 2px solid borders (#383838)
 * - Minimal border radius: 2px buttons, 4px cards
 * - Typography: Aeonik Mono (Space Mono fallback) for UI, Inter for body
 * - Color Palette:
 *   - Primary Dark: #383838
 *   - Accent Teal: #16AA98
 *   - Button Blue: #6fc2ff
 *   - Neutral Beige: #F4EFEA
 *   - Banner Yellow: #FFD700
 *
 * @see STYLE_GUIDE.md for complete design system documentation
 */

// Utility functions
export { cn } from './utils';

// Button components
export {
  Button,
  buttonVariants,
  type ButtonProps,
} from './Button';

// Card components
export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  cardVariants,
  type CardProps,
} from './Card';

// Input components
export {
  Input,
  Textarea,
  type InputProps,
  type TextareaProps,
} from './Input';

// Badge components
export {
  Badge,
  BadgeGroup,
  badgeVariants,
  type BadgeProps,
} from './Badge';

// Container components
export {
  Container,
  Section,
  Hero,
  containerVariants,
  type ContainerProps,
} from './Container';
