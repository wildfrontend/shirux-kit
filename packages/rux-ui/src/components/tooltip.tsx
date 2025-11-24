import { RCC } from '@shirux/types/react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/classes';

type TooltipProviderProps = ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Provider
>;

type TooltipProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;

type TooltipTriggerProps = ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Trigger
>;

type TooltipContentProps = ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
>;

const TooltipProvider: RCC<TooltipProviderProps> = ({
  delayDuration = 0,
  children,
  ...props
}) => (
  <TooltipPrimitive.Provider
    data-slot="tooltip-provider"
    delayDuration={delayDuration}
    {...props}
  >
    {children}
  </TooltipPrimitive.Provider>
);

const Tooltip: RCC<TooltipProps> = ({ children, ...props }) => (
  <TooltipProvider>
    <TooltipPrimitive.Root data-slot="tooltip" {...props}>
      {children}
    </TooltipPrimitive.Root>
  </TooltipProvider>
);

const TooltipTrigger: RCC<TooltipTriggerProps> = ({ children, ...props }) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props}>
    {children}
  </TooltipPrimitive.Trigger>
);

const TooltipContent: RCC<TooltipContentProps> = ({
  className,
  sideOffset = 0,
  children,
  ...props
}) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        'bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
