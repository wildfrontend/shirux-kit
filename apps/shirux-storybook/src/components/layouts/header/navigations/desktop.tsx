'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@shirux/rux-ui/components/navigation-menu';
import { Typography } from '@shirux/rux-ui/components/typography';
import { cn } from '@shirux/rux-ui/lib/classes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import type { ComponentPropsWithoutRef } from 'react';
import type { RC, RCC } from '@shirux/types/react';
import { navigationItems } from './navigation-items';

/**
 * Check if the current pathname matches a target path pattern
 * Uses path-to-regexp for pattern matching
 */
const checkPathMatch = (pathname: string, target?: string): boolean => {
  if (!target) return false;

  try {
    const matcher = match(target, { decode: decodeURIComponent });
    return !!matcher(pathname);
  } catch {
    return pathname === target || pathname.startsWith(`${target}/`);
  }
};

export const DesktopNavigation: RC = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItems.map((item) => {
          const subItems = item.items ?? [];
          const isItemActive =
            checkPathMatch(pathname, item.href) ||
            subItems.some((subItem) => checkPathMatch(pathname, subItem.href));

          if (subItems.length > 0) {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger active={isItemActive}>
                  <Typography
                    className={cn(
                      'transition-colors',
                      isItemActive && 'text-primary font-semibold'
                    )}
                    variant="sm"
                  >
                    {item.title}
                  </Typography>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {subItems.map((subItem) => (
                      <ListItem
                        active={checkPathMatch(pathname, subItem.href)}
                        href={subItem.href}
                        key={subItem.title}
                        title={subItem.title}
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink active={isItemActive} asChild>
                <Link
                  aria-current={isItemActive ? 'page' : undefined}
                  className={cn(
                    'transition-colors',
                    isItemActive && 'text-primary'
                  )}
                  href={item.href}
                >
                  <Typography
                    className={cn(
                      'transition-colors',
                      isItemActive && 'text-primary font-semibold'
                    )}
                    variant="sm"
                  >
                    {item.title}
                  </Typography>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

type ListItemProps = {
  href: string;
  title: string;
  active?: boolean;
} & Omit<ComponentPropsWithoutRef<'li'>, 'children' | 'popover'>;

const ListItem: RCC<ListItemProps> = ({
  title,
  children,
  href,
  className,
  active = false,
  ...props
}) => {
  return (
    <li className={className} {...props}>
      <NavigationMenuLink active={active} asChild underlineVariant="muted">
        <Link
          aria-current={active ? 'page' : undefined}
          className={cn(
            'hover:bg-primary/10 flex h-auto w-full flex-col items-start rounded-md p-3 transition-colors',
            active && 'text-primary'
          )}
          href={href}
        >
          <Typography
            className={cn(
              'leading-none font-medium transition-colors',
              active && 'text-primary'
            )}
            variant="sm"
          >
            {title}
          </Typography>
          <Typography
            className="line-clamp-2 leading-snug"
            color="muted"
            variant="xs"
          >
            {children}
          </Typography>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
