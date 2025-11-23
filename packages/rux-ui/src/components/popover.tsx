import { RCC } from '@shirux/types/react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/classes';

type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

type PopoverTriggerProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
>;

type PopoverContentProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
>;

type PopoverCloseProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Close
>;

type PopoverAnchorProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Anchor
>;

type PopoverArrowProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Arrow
>;

const Popover: RCC<PopoverProps> = ({ children, ...props }) => (
  <PopoverPrimitive.Root data-slot="popover" {...props}>
    {children}
  </PopoverPrimitive.Root>
);

const PopoverTrigger: RCC<PopoverTriggerProps> = ({ children, ...props }) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props}>
    {children}
  </PopoverPrimitive.Trigger>
);

const PopoverAnchor: RCC<PopoverAnchorProps> = ({ children, ...props }) => (
  <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props}>
    {children}
  </PopoverPrimitive.Anchor>
);

const PopoverContent: RCC<PopoverContentProps> = ({
  className,
  align = 'center',
  sideOffset = 4,
  children,
  ...props
}) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-none',
        className
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
);

const PopoverClose: RCC<PopoverCloseProps> = ({ children, ...props }) => (
  <PopoverPrimitive.Close data-slot="popover-close" {...props}>
    {children}
  </PopoverPrimitive.Close>
);

const PopoverArrow: RCC<PopoverArrowProps> = ({ className, ...props }) => (
  <PopoverPrimitive.Arrow
    data-slot="popover-arrow"
    className={cn('fill-popover', className)}
    {...props}
  />
);

export {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
};
