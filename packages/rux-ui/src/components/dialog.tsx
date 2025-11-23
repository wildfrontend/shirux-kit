import { RC, RCC } from '@shirux/types/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/classes';
import { Button } from './button';

type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
type DialogTriggerProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
>;
type DialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;
type DialogPortalProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Portal
>;
type DialogOverlayProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
>;
type DialogContentProps = {
  transparentOverlay?: boolean;
  showCloseButton?: boolean;
  closeButton?: React.ReactNode;
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;
type DialogHeaderProps = ComponentPropsWithoutRef<'div'>;
type DialogFooterProps = ComponentPropsWithoutRef<'div'>;
type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;
type DialogDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;

const Dialog: RCC<DialogProps> = ({ ...props }) => (
  <DialogPrimitive.Root data-slot="dialog" {...props} />
);

const DialogTrigger: RCC<DialogTriggerProps> = ({ ...props }) => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
);

const DialogClose: RCC<DialogCloseProps> = ({ ...props }) => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
);

const DialogPortal: RCC<DialogPortalProps> = ({ ...props }) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);

const DialogOverlay: RC<DialogOverlayProps> = ({ className, ...props }) => (
  <DialogPrimitive.Overlay
    data-slot="dialog-overlay"
    className={cn('fixed inset-0 z-50 bg-black/50', className)}
    {...props}
  />
);

const DialogContent: RCC<DialogContentProps> = ({
  className,
  children,
  transparentOverlay = false,
  showCloseButton = false,
  closeButton,
  ...props
}) => {
  const renderCloseButton = () => {
    if (closeButton) {
      return (
        <DialogPrimitive.Close asChild>{closeButton}</DialogPrimitive.Close>
      );
    }

    if (showCloseButton) {
      return (
        <DialogPrimitive.Close asChild>
          <Button
            className="border-primary absolute top-2 right-2 h-5 w-5"
            radius="circle"
            size="icon"
            variant="outline"
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogPrimitive.Close>
      );
    }

    return null;
  };

  return (
    <DialogPortal>
      <DialogOverlay className={transparentOverlay ? 'bg-transparent' : ''} />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'bg-secondary border-primary fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border-2 p-6 shadow-lg',
          className
        )}
        {...props}
      >
        {children}
        {renderCloseButton()}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

const DialogHeader: RCC<DialogHeaderProps> = ({ className, ...props }) => (
  <div
    data-slot="dialog-header"
    className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)}
    {...props}
  />
);

const DialogFooter: RCC<DialogFooterProps> = ({ className, ...props }) => (
  <div
    data-slot="dialog-footer"
    className={cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  />
);

const DialogTitle: RCC<DialogTitleProps> = ({ className, ...props }) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn(
      'text-primary text-lg leading-none font-semibold tracking-tight',
      className
    )}
    {...props}
  />
);

const DialogDescription: RCC<DialogDescriptionProps> = ({
  className,
  ...props
}) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn('text-primary/70 text-sm', className)}
    {...props}
  />
);

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
