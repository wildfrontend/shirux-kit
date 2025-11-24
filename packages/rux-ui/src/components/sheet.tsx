import { RC, RCC } from '@shirux/types/react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/classes';

type SheetProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Root>;
type SheetTriggerProps = ComponentPropsWithoutRef<
  typeof SheetPrimitive.Trigger
>;
type SheetCloseProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Close>;
type SheetPortalProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Portal>;
type SheetOverlayProps = ComponentPropsWithoutRef<
  typeof SheetPrimitive.Overlay
>;
type SheetContentProps = {
  side?: 'top' | 'right' | 'bottom' | 'left';
} & ComponentPropsWithoutRef<typeof SheetPrimitive.Content>;
type SheetHeaderProps = ComponentPropsWithoutRef<'div'>;
type SheetFooterProps = ComponentPropsWithoutRef<'div'>;
type SheetTitleProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Title>;
type SheetDescriptionProps = ComponentPropsWithoutRef<
  typeof SheetPrimitive.Description
>;

const Sheet: RCC<SheetProps> = ({ ...props }) => (
  <SheetPrimitive.Root data-slot="sheet" {...props} />
);

const SheetTrigger: RCC<SheetTriggerProps> = ({ ...props }) => (
  <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
);

const SheetClose: RCC<SheetCloseProps> = ({ ...props }) => (
  <SheetPrimitive.Close data-slot="sheet-close" {...props} />
);

const SheetPortal: RCC<SheetPortalProps> = ({ ...props }) => (
  <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
);

const SheetOverlay: RC<SheetOverlayProps> = ({ className, ...props }) => (
  <SheetPrimitive.Overlay
    data-slot="sheet-overlay"
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
      className
    )}
    {...props}
  />
);

const SheetContent: RCC<SheetContentProps> = ({
  className,
  children,
  side = 'right',
  ...props
}) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      data-slot="sheet-content"
      className={cn(
        'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
        side === 'right' &&
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        side === 'left' &&
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        side === 'top' &&
          'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
        side === 'bottom' &&
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
        className
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
);

const SheetHeader: RCC<SheetHeaderProps> = ({ className, ...props }) => (
  <div
    data-slot="sheet-header"
    className={cn('flex flex-col gap-1.5 p-4', className)}
    {...props}
  />
);

const SheetFooter: RCC<SheetFooterProps> = ({ className, ...props }) => (
  <div
    data-slot="sheet-footer"
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);

const SheetTitle: RCC<SheetTitleProps> = ({ className, ...props }) => (
  <SheetPrimitive.Title
    data-slot="sheet-title"
    className={cn('text-foreground font-semibold', className)}
    {...props}
  />
);

const SheetDescription: RCC<SheetDescriptionProps> = ({
  className,
  ...props
}) => (
  <SheetPrimitive.Description
    data-slot="sheet-description"
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
);

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
