import { RC, RCC } from '@shirux/types/react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardRefExoticComponent,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import * as React from 'react';

import { cn } from '../lib/classes';

type ScrollAreaProps = ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
>;

type ScrollBarProps = ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;

type ForwardableComponent<P, R> = RCC<P> &
  ForwardRefExoticComponent<
    PropsWithoutRef<PropsWithChildren<P>> & RefAttributes<R>
  >;

type ForwardableRC<P, R> = RC<P> &
  ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<R>>;

const ScrollAreaBase = (
  { className, children, ...props }: PropsWithChildren<ScrollAreaProps>,
  ref: React.ForwardedRef<ComponentRef<typeof ScrollAreaPrimitive.Root>>
) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);

const ScrollBarBase = (
  { className, orientation = 'vertical', ...props }: ScrollBarProps,
  ref: React.ForwardedRef<
    ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
  >
) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none transition-colors select-none',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-px',
      orientation === 'horizontal' &&
        'h-2.5 flex-col border-t border-t-transparent p-px',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="bg-primary/20 hover:bg-primary/30 relative flex-1 rounded-full transition-colors" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);

const ScrollArea = React.forwardRef(ScrollAreaBase) as ForwardableComponent<
  ScrollAreaProps,
  ComponentRef<typeof ScrollAreaPrimitive.Root>
>;
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef(ScrollBarBase) as ForwardableRC<
  ScrollBarProps,
  ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>;
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
