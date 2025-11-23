import { Slot } from '@radix-ui/react-slot';
import { RC, RCC } from '@shirux/types/react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/classes';
import { fontSizes, heights, iconSizes, spacing, widths } from '../lib/sizing';
import { Skeleton } from './skeleton';

const buttonVariants = cva(
  [
    // Layout & Spacing
    'inline-flex items-center justify-center gap-2',
    'shrink-0',
    // Typography
    'whitespace-nowrap font-medium leading-normal',
    // Interactions
    'cursor-pointer transition-all outline-none',
    // Disabled state
    'disabled:cursor-not-allowed disabled:opacity-50',
    // Focus state
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    // Invalid state
    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
    'dark:aria-invalid:ring-destructive/40',
    // SVG handling - 確保 icon 垂直置中
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'border shadow-xs',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        accent:
          'bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 dark:bg-accent/80 dark:hover:bg-accent/70',
        ghost: '',
        link: 'underline-offset-4 hover:underline',
        base: 'focus-visible:ring-0 focus-visible:border-transparent',
      },
      size: {
        default: [
          heights.base,
          fontSizes.base,
          spacing.base,
          'py-2',
          `has-[>svg]:${spacing['button-default-icon']}`,
          `[&_svg:not([class*="size-"])]:${iconSizes.base}`,
        ],
        sm: [
          heights.sm,
          fontSizes['button-sm'],
          'gap-1.5',
          spacing.sm,
          `has-[>svg]:${spacing['button-sm-icon']}`,
          `[&_svg:not([class*="size-"])]:${iconSizes['button-sm']}`,
        ],
        lg: [
          heights.lg,
          fontSizes['button-lg'],
          spacing.lg,
          `has-[>svg]:${spacing['button-lg-icon']}`,
          `[&_svg:not([class*="size-"])]:${iconSizes['button-lg']}`,
        ],
        icon: [
          widths.icon,
          heights.base,
          `[&_svg:not([class*="size-"])]:${iconSizes.icon}`,
        ],
      },
      radius: {
        default: 'rounded-md',
        pill: 'rounded-full',
        circle: 'rounded-full',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      radius: 'default',
    },
  }
);

// Color styles for outline, ghost, and link variants
const colorStyleMap = {
  primary: {
    outline:
      'border-primary text-primary hover:bg-primary/5 hover:border-primary/80 dark:border-primary dark:hover:bg-primary/10',
    ghost: 'text-primary hover:bg-primary/10 dark:hover:bg-primary/20',
    link: 'text-primary',
  },
  secondary: {
    outline:
      'border-secondary text-secondary hover:bg-secondary/5 hover:border-secondary/80 dark:border-secondary dark:hover:bg-secondary/10',
    ghost: 'text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20',
    link: 'text-secondary',
  },
  accent: {
    outline:
      'border-accent text-accent hover:bg-accent/5 hover:border-accent/80 dark:border-accent dark:hover:bg-accent/10',
    ghost: 'text-accent hover:bg-accent/10 dark:hover:bg-accent/20',
    link: 'text-accent',
  },
  destructive: {
    outline:
      'border-destructive text-destructive hover:bg-destructive/5 hover:border-destructive/80 dark:border-destructive dark:hover:bg-destructive/10',
    ghost:
      'text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20',
    link: 'text-destructive',
  },
} as const;

// Foreground color styles for dark backgrounds
const foregroundColorMap = {
  primary: {
    default:
      '!bg-transparent !text-primary-foreground/90 hover:!text-primary-foreground hover:!bg-primary-foreground/20 disabled:!text-primary-foreground/50 !shadow-none',
    link: '!bg-transparent !text-primary-foreground/90 hover:!text-primary-foreground disabled:!text-primary-foreground/50 !shadow-none hover:!bg-transparent',
  },
  secondary: {
    default:
      '!bg-transparent !text-secondary-foreground/90 hover:!text-secondary-foreground hover:!bg-secondary-foreground/20 disabled:!text-secondary-foreground/50 !shadow-none',
    link: '!bg-transparent !text-secondary-foreground/90 hover:!text-secondary-foreground disabled:!text-secondary-foreground/50 !shadow-none hover:!bg-transparent',
  },
  accent: {
    default:
      '!bg-transparent !text-accent-foreground/90 hover:!text-accent-foreground hover:!bg-accent-foreground/20 disabled:!text-accent-foreground/50 !shadow-none',
    link: '!bg-transparent !text-accent-foreground/90 hover:!text-accent-foreground disabled:!text-accent-foreground/50 !shadow-none hover:!bg-transparent',
  },
  destructive: {
    default:
      '!bg-transparent !text-destructive-foreground/90 hover:!text-destructive-foreground hover:!bg-destructive-foreground/20 disabled:!text-destructive-foreground/50 !shadow-none',
    link: '!bg-transparent !text-destructive-foreground/90 hover:!text-destructive-foreground disabled:!text-destructive-foreground/50 !shadow-none hover:!bg-transparent',
  },
} as const;

type ButtonProps = {
  asChild?: boolean;
  foreground?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'destructive';
} & VariantProps<typeof buttonVariants> &
  Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

const Button: RCC<ButtonProps> = ({
  className,
  variant,
  size,
  radius,
  asChild = false,
  foreground = false,
  color = 'primary',
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';

  // Generate foreground color classes if foreground prop is true
  const foregroundClasses = foreground
    ? foregroundColorMap[color][variant === 'link' ? 'link' : 'default']
    : undefined;

  // Apply color styles for outline, ghost, and link variants
  const colorClasses =
    !foreground && variant && ['outline', 'ghost', 'link'].includes(variant)
      ? colorStyleMap[color][variant as 'outline' | 'ghost' | 'link']
      : undefined;

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, radius, className }),
        colorClasses,
        foregroundClasses
      )}
      {...props}
    />
  );
};

const radiusClassesMap: Record<NonNullable<ButtonProps['radius']>, string> = {
  default: 'rounded-md',
  pill: 'rounded-full',
  circle: 'rounded-full',
  none: 'rounded-none',
};

const skeletonSizeMap: Record<NonNullable<ButtonProps['size']>, string> = {
  default: cn(heights.base, spacing.base, 'min-w-[6rem]'),
  sm: cn(heights.sm, spacing.sm, 'min-w-[5rem]'),
  lg: cn(heights.lg, spacing.lg, 'min-w-[7rem]'),
  icon: cn(heights.base, widths.icon),
};

type ButtonSkeletonProps = {
  size?: NonNullable<ButtonProps['size']>;
  radius?: NonNullable<ButtonProps['radius']>;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

const ButtonSkeleton: RC<ButtonSkeletonProps> = ({
  size = 'default',
  radius = 'default',
  className,
  ...props
}) => {
  return (
    <Skeleton
      data-slot="button-skeleton"
      className={cn(
        'inline-flex items-center justify-center gap-2',
        skeletonSizeMap[size],
        radiusClassesMap[radius],
        className
      )}
      {...props}
    />
  );
};

export { Button, ButtonSkeleton, buttonVariants };
