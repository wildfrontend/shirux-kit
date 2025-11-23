import { RC, RCC } from '@shirux/types/react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
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

type ForwardableComponent<P, R> = RCC<P> &
  ForwardRefExoticComponent<
    PropsWithoutRef<PropsWithChildren<P>> & RefAttributes<R>
  >;

type ForwardableRC<P, R> = RC<P> &
  ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<R>>;

type NavigationMenuProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Root
>;

type NavigationMenuListProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.List
>;

type NavigationMenuContentProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Content
>;

type NavigationMenuViewportProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Viewport
>;

type NavigationMenuIndicatorProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Indicator
>;

type NavigationMenuTriggerProps = {
  underline?: boolean;
  underlineVariant?: NavigationMenuUnderlineVariant;
  active?: boolean;
} & ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>;

type NavigationMenuLinkProps = {
  underline?: boolean;
  underlineVariant?: NavigationMenuUnderlineVariant;
  active?: boolean;
} & ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>;

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/20 data-[state=open]:bg-primary/20'
);

const navigationMenuUnderlineBase =
  "relative after:pointer-events-none after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-4/5 after:-translate-x-1/2 after:rounded-full after:opacity-0 after:transition-opacity after:duration-200 after:content-[''] hover:after:opacity-60 data-[active]:after:opacity-100 data-[state=open]:after:opacity-100";

const navigationMenuUnderlineVariants = {
  default: 'after:bg-primary',
  muted: 'after:bg-primary/40 dark:after:bg-primary/60',
} as const;

type NavigationMenuUnderlineVariant =
  keyof typeof navigationMenuUnderlineVariants;

const getNavigationMenuUnderline = (
  variant: NavigationMenuUnderlineVariant = 'default'
) => cn(navigationMenuUnderlineBase, navigationMenuUnderlineVariants[variant]);

const NavigationMenuBase = (
  { className, children, ...props }: PropsWithChildren<NavigationMenuProps>,
  ref: React.ForwardedRef<ComponentRef<typeof NavigationMenuPrimitive.Root>>
) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-10 flex max-w-max flex-1 items-center justify-center',
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
);

const NavigationMenuListBase = (
  { className, ...props }: PropsWithChildren<NavigationMenuListProps>,
  ref: React.ForwardedRef<ComponentRef<typeof NavigationMenuPrimitive.List>>
) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'group flex flex-1 list-none items-center justify-center space-x-1',
      className
    )}
    {...props}
  />
);

const NavigationMenuTriggerBase = (
  {
    className,
    underline = true,
    underlineVariant = 'default',
    active = false,
    children,
    ...props
  }: PropsWithChildren<NavigationMenuTriggerProps>,
  ref: React.ForwardedRef<ComponentRef<typeof NavigationMenuPrimitive.Trigger>>
) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    data-active={active ? 'true' : undefined}
    className={cn(
      'group inline-flex items-center justify-center px-3 py-2',
      underline && getNavigationMenuUnderline(underlineVariant),
      className
    )}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
);

const NavigationMenuContentBase = (
  { className, ...props }: PropsWithChildren<NavigationMenuContentProps>,
  ref: React.ForwardedRef<ComponentRef<typeof NavigationMenuPrimitive.Content>>
) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full md:absolute md:w-auto',
      className
    )}
    {...props}
  />
);

const NavigationMenuLinkBase = (
  {
    className,
    underline = true,
    underlineVariant = 'default',
    active = false,
    ...props
  }: PropsWithChildren<NavigationMenuLinkProps>,
  ref: React.ForwardedRef<ComponentRef<typeof NavigationMenuPrimitive.Link>>
) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    data-active={active ? 'true' : undefined}
    className={cn(
      'inline-flex items-center justify-center px-3 py-2',
      underline && getNavigationMenuUnderline(underlineVariant),
      className
    )}
    {...props}
  />
);

const NavigationMenuViewportBase = (
  { className, ...props }: PropsWithChildren<NavigationMenuViewportProps>,
  ref: React.ForwardedRef<ComponentRef<typeof NavigationMenuPrimitive.Viewport>>
) => (
  <div className={cn('absolute top-full left-0 flex justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
);

const NavigationMenuIndicatorBase = (
  { className, ...props }: NavigationMenuIndicatorProps,
  ref: React.ForwardedRef<
    ComponentRef<typeof NavigationMenuPrimitive.Indicator>
  >
) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn('hidden', className)}
    {...props}
  >
    <div />
  </NavigationMenuPrimitive.Indicator>
);

const NavigationMenu = React.forwardRef(
  NavigationMenuBase
) as ForwardableComponent<
  NavigationMenuProps,
  ComponentRef<typeof NavigationMenuPrimitive.Root>
>;
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef(
  NavigationMenuListBase
) as ForwardableComponent<
  NavigationMenuListProps,
  ComponentRef<typeof NavigationMenuPrimitive.List>
>;
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuTrigger = React.forwardRef(
  NavigationMenuTriggerBase
) as ForwardableComponent<
  NavigationMenuTriggerProps,
  ComponentRef<typeof NavigationMenuPrimitive.Trigger>
>;
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef(
  NavigationMenuContentBase
) as ForwardableComponent<
  NavigationMenuContentProps,
  ComponentRef<typeof NavigationMenuPrimitive.Content>
>;
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = React.forwardRef(
  NavigationMenuLinkBase
) as ForwardableComponent<
  NavigationMenuLinkProps,
  ComponentRef<typeof NavigationMenuPrimitive.Link>
>;
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const NavigationMenuViewport = React.forwardRef(
  NavigationMenuViewportBase
) as ForwardableComponent<
  NavigationMenuViewportProps,
  ComponentRef<typeof NavigationMenuPrimitive.Viewport>
>;
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef(
  NavigationMenuIndicatorBase
) as ForwardableRC<
  NavigationMenuIndicatorProps,
  ComponentRef<typeof NavigationMenuPrimitive.Indicator>
>;
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
};
