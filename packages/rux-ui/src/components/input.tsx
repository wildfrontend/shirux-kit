import { RC } from '@shirux/types/react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/classes';
import { fontSizes, heights, spacing } from '../lib/sizing';

const inputVariants = cva(
  [
    // Base styles
    'w-full',
    'min-w-0',
    'border',
    'bg-transparent',
    'py-1',
    'shadow-xs',
    'outline-none',
    'transition-[color,box-shadow]',
    // Fluid sizing
    heights.base,
    fontSizes.base,
    spacing.sm,
    // Colors
    'border-primary',
    'dark:bg-input/30',
    // States
    'disabled:pointer-events-none',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    // Selection
    'selection:bg-primary',
    'selection:text-primary-foreground',
    // Placeholder
    'placeholder:text-muted-foreground',
    // File input
    'file:inline-flex',
    'file:border-0',
    'file:bg-transparent',
    'file:font-medium',
    'file:text-foreground',
    `file:${heights['file-input']}`,
    `file:${fontSizes['button-sm']}`,
    // Focus state
    'focus-visible:border-primary',
    'focus-visible:ring-primary/50',
    'focus-visible:ring-[3px]',
    // Invalid state
    'aria-invalid:border-destructive',
    'aria-invalid:ring-destructive/20',
    'dark:aria-invalid:ring-destructive/40',
  ],
  {
    variants: {
      radius: {
        default: 'rounded-md',
        pill: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      radius: 'default',
    },
  }
);

type InputProps = ComponentPropsWithoutRef<'input'> &
  VariantProps<typeof inputVariants>;

const Input: RC<InputProps> = ({ className, type, radius, ...props }) => (
  <input
    type={type}
    data-slot="input"
    className={cn(inputVariants({ radius }), className)}
    {...props}
  />
);

export { Input };
