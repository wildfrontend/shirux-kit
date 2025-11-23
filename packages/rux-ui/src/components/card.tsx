import { RCC } from '@shirux/types/react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/classes';

type CardProps = ComponentPropsWithoutRef<'div'>;
type CardSectionProps = ComponentPropsWithoutRef<'div'>;

const Card: RCC<CardProps> = ({ className, ...props }) => (
  <div
    data-slot="card"
    className={cn(
      'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
      className
    )}
    {...props}
  />
);

const CardHeader: RCC<CardSectionProps> = ({ className, ...props }) => (
  <div
    data-slot="card-header"
    className={cn(
      '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
      className
    )}
    {...props}
  />
);

const CardTitle: RCC<CardSectionProps> = ({ className, ...props }) => (
  <div
    data-slot="card-title"
    className={cn('leading-none font-semibold', className)}
    {...props}
  />
);

const CardDescription: RCC<CardSectionProps> = ({ className, ...props }) => (
  <div
    data-slot="card-description"
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
);

const CardAction: RCC<CardSectionProps> = ({ className, ...props }) => (
  <div
    data-slot="card-action"
    className={cn(
      'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
      className
    )}
    {...props}
  />
);

const CardContent: RCC<CardSectionProps> = ({ className, ...props }) => (
  <div data-slot="card-content" className={cn('px-6', className)} {...props} />
);

const CardFooter: RCC<CardSectionProps> = ({ className, ...props }) => (
  <div
    data-slot="card-footer"
    className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
    {...props}
  />
);

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
