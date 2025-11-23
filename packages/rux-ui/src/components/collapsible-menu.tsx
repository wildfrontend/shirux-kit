import { RCC } from '@shirux/types/react';
import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithoutRef } from 'react';
import * as React from 'react';

import { cn } from '../lib/classes';

type CollapsibleMenuContextValue = {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  isItemOpen: (value: string) => boolean;
};

const CollapsibleMenuContext =
  React.createContext<CollapsibleMenuContextValue | null>(null);

function useCollapsibleMenuContext() {
  const context = React.useContext(CollapsibleMenuContext);
  if (!context) {
    throw new Error(
      'CollapsibleMenu components must be used within a CollapsibleMenu.'
    );
  }

  return context;
}

type CollapsibleMenuProps = {
  openItems?: string[];
  defaultOpenItems?: string[];
  onOpenItemsChange?: (openItems: string[]) => void;
  multiple?: boolean;
} & ComponentPropsWithoutRef<'div'>;

const CollapsibleMenu: RCC<CollapsibleMenuProps> = ({
  openItems: openItemsProp,
  defaultOpenItems = [],
  onOpenItemsChange,
  multiple = true,
  className,
  children,
  ...props
}) => {
  const isControlled = openItemsProp !== undefined;
  const [internalOpenItems, setInternalOpenItems] =
    React.useState<string[]>(defaultOpenItems);

  const openItems = openItemsProp ?? internalOpenItems;
  const openItemsSet = React.useMemo(() => new Set(openItems), [openItems]);

  const setItems = React.useCallback(
    (updater: (prev: string[]) => string[]) => {
      const next = updater(openItemsProp ?? internalOpenItems);
      if (!isControlled) {
        setInternalOpenItems(next);
      }
      onOpenItemsChange?.(next);
    },
    [internalOpenItems, isControlled, onOpenItemsChange, openItemsProp]
  );

  const toggleItem = React.useCallback(
    (value: string) => {
      setItems((prev) => {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        }

        if (multiple) {
          return [...prev, value];
        }

        return [value];
      });
    },
    [multiple, setItems]
  );

  const contextValue = React.useMemo<CollapsibleMenuContextValue>(
    () => ({
      openItems: openItemsSet,
      toggleItem,
      isItemOpen: (value: string) => openItemsSet.has(value),
    }),
    [openItemsSet, toggleItem]
  );

  return (
    <CollapsibleMenuContext.Provider value={contextValue}>
      <div
        data-slot="collapsible-menu"
        className={cn('flex flex-col gap-2', className)}
        {...props}
      >
        {children}
      </div>
    </CollapsibleMenuContext.Provider>
  );
};

type CollapsibleMenuListProps = ComponentPropsWithoutRef<'ul'>;

const CollapsibleMenuList: RCC<CollapsibleMenuListProps> = ({
  className,
  ...props
}) => (
  <ul
    data-slot="collapsible-menu-list"
    className={cn('flex flex-col gap-1', className)}
    {...props}
  />
);

type CollapsibleMenuItemContextValue = {
  value: string;
  triggerId: string;
  contentId: string;
};

const CollapsibleMenuItemContext =
  React.createContext<CollapsibleMenuItemContextValue | null>(null);

function useCollapsibleMenuItemContext() {
  const context = React.useContext(CollapsibleMenuItemContext);
  if (!context) {
    throw new Error(
      'CollapsibleMenuTrigger and CollapsibleMenuContent must be used within a CollapsibleMenuItem.'
    );
  }

  return context;
}

type CollapsibleMenuItemProps = {
  value: string;
} & ComponentPropsWithoutRef<'li'>;

const CollapsibleMenuItem: RCC<CollapsibleMenuItemProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  const { isItemOpen } = useCollapsibleMenuContext();
  const triggerId = React.useId();
  const contentId = React.useId();
  const open = isItemOpen(value);

  const contextValue = React.useMemo(
    () => ({
      value,
      triggerId,
      contentId,
    }),
    [value, triggerId, contentId]
  );

  return (
    <CollapsibleMenuItemContext.Provider value={contextValue}>
      <li
        data-slot="collapsible-menu-item"
        data-state={open ? 'open' : 'closed'}
        className={cn('group/collapsible-menu-item flex flex-col', className)}
        {...props}
      >
        {children}
      </li>
    </CollapsibleMenuItemContext.Provider>
  );
};

type CollapsibleMenuTriggerProps = {
  asChild?: boolean;
} & ComponentPropsWithoutRef<'button'>;

const CollapsibleMenuTrigger: RCC<CollapsibleMenuTriggerProps> = ({
  asChild = false,
  className,
  onClick,
  type = 'button',
  ...props
}) => {
  const { toggleItem, isItemOpen } = useCollapsibleMenuContext();
  const { value, triggerId, contentId } = useCollapsibleMenuItemContext();
  const Comp = asChild ? Slot : 'button';
  const open = isItemOpen(value);

  const triggerProps = asChild ? props : { ...props, type };

  return (
    <Comp
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={open}
      data-slot="collapsible-menu-trigger"
      data-state={open ? 'open' : 'closed'}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors',
        'hover:bg-muted/70 focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
        className
      )}
      onClick={(event) => {
        onClick?.(event as React.MouseEvent<HTMLButtonElement>);
        if (!event.defaultPrevented) {
          toggleItem(value);
        }
      }}
      {...triggerProps}
    />
  );
};

type CollapsibleMenuContentProps = {
  asChild?: boolean;
  forceMount?: boolean;
} & ComponentPropsWithoutRef<'div'>;

const CollapsibleMenuContent: RCC<CollapsibleMenuContentProps> = ({
  asChild = false,
  forceMount = false,
  className,
  ...props
}) => {
  const { isItemOpen } = useCollapsibleMenuContext();
  const { value, contentId, triggerId } = useCollapsibleMenuItemContext();
  const Comp = asChild ? Slot : 'div';
  const open = isItemOpen(value);

  if (!forceMount && !open) {
    return null;
  }

  return (
    <Comp
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-slot="collapsible-menu-content"
      data-state={open ? 'open' : 'closed'}
      hidden={!open && forceMount}
      className={cn('pl-3', className)}
      {...props}
    />
  );
};

type CollapsibleMenuLinkProps = {
  asChild?: boolean;
  isActive?: boolean;
} & ComponentPropsWithoutRef<'a'>;

const CollapsibleMenuLink: RCC<CollapsibleMenuLinkProps> = ({
  asChild = false,
  isActive = false,
  className,
  ...props
}) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="collapsible-menu-link"
      data-active={isActive ? 'true' : undefined}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm transition-colors',
        isActive
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-foreground hover:bg-primary/10 hover:text-primary',
        className
      )}
      {...props}
    />
  );
};

export {
  CollapsibleMenu,
  CollapsibleMenuContent,
  CollapsibleMenuItem,
  CollapsibleMenuLink,
  CollapsibleMenuList,
  CollapsibleMenuTrigger,
};
