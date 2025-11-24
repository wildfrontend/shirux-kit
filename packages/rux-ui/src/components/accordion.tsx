import { RCC } from '@shirux/types/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '../lib/classes';

type AccordionProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;
type AccordionItemProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
>;
type AccordionTriggerProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>;
type AccordionContentProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;

const Accordion: RCC<AccordionProps> = ({ ...props }) => (
  <AccordionPrimitive.Root data-slot="accordion" {...props} />
);

const AccordionItem: RCC<AccordionItemProps> = ({ className, ...props }) => (
  <AccordionPrimitive.Item
    data-slot="accordion-item"
    className={cn('border-b', className)}
    {...props}
  />
);

const AccordionTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header asChild data-slot="accordion-header">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        'flex w-full flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    {...props}
  >
    <div className={cn('pt-0 pb-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
