'use client';

import { ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { useMemo, useState } from 'react';

import { Button } from '@shirux/rux-ui/components/button';
import {
  CollapsibleMenu,
  CollapsibleMenuContent,
  CollapsibleMenuItem,
  CollapsibleMenuLink,
  CollapsibleMenuList,
  CollapsibleMenuTrigger,
} from '@shirux/rux-ui/components/collapsible-menu';
import { ScrollArea } from '@shirux/rux-ui/components/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@shirux/rux-ui/components/sheet';
import { Typography } from '@shirux/rux-ui/components/typography';
import { cn } from '@shirux/rux-ui/lib/classes';
import type { RC } from '@shirux/types/react';

import { navigationItems } from './navigation-items';
import { MobileUserMenu } from '../menu/mobile-user-menu';

/**
 * Check if the current pathname matches a target path pattern.
 * Uses path-to-regexp for pattern matching.
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

export const MobileNavigation: RC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [manualOpenItems, setManualOpenItems] = useState<string[]>([]);

  const activeParentItems = useMemo(() => {
    return navigationItems
      .filter((item) =>
        (item.items ?? []).some((subItem) =>
          checkPathMatch(pathname, subItem.href)
        )
      )
      .map((item) => item.title);
  }, [pathname]);

  const openItems = useMemo(() => {
    return Array.from(new Set([...activeParentItems, ...manualOpenItems]));
  }, [activeParentItems, manualOpenItems]);

  const closeNavigation = () => setOpen(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <Menu className="size-5" />
          <span className="sr-only">開啟選單</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-80 max-w-sm p-0" side="left">
        <SheetHeader className="border-b px-4 py-6">
          <SheetTitle className="sr-only">導覽選單</SheetTitle>
          <SheetDescription className="sr-only">
            網站主要導覽選項
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-5rem)]">
          <nav aria-label="Mobile navigation" className="space-y-2 p-3">
            <CollapsibleMenu
              onOpenItemsChange={setManualOpenItems}
              openItems={openItems}
            >
              <CollapsibleMenuList className="space-y-1">
                {/* User Menu */}
                <MobileUserMenu onClose={closeNavigation} />

                {navigationItems.map((item) => {
                  const subItems = item.items ?? [];
                  const hasChildren = subItems.length > 0;
                  const isItemActive =
                    checkPathMatch(pathname, item.href) ||
                    subItems.some((subItem) =>
                      checkPathMatch(pathname, subItem.href)
                    );

                  return (
                    <CollapsibleMenuItem key={item.title} value={item.title}>
                      {hasChildren ? (
                        <>
                          <CollapsibleMenuTrigger
                            className={cn(
                              'flex w-full items-center gap-2 rounded-md px-4 py-3 text-left text-sm transition-colors',
                              isItemActive
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-foreground hover:bg-primary/10 hover:text-primary'
                            )}
                          >
                            <Typography className="flex-1" variant="sm">
                              {item.title}
                            </Typography>
                            <ChevronRight
                              aria-hidden="true"
                              className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible-menu-item:rotate-90"
                            />
                          </CollapsibleMenuTrigger>
                          <CollapsibleMenuContent asChild>
                            <ul className="bg-muted/40 mt-1 space-y-1 rounded-md p-2">
                              {subItems.map((subItem) => {
                                const isSubItemActive = checkPathMatch(
                                  pathname,
                                  subItem.href
                                );
                                return (
                                  <li key={subItem.title}>
                                    <CollapsibleMenuLink
                                      asChild
                                      className={cn('pr-3 pl-6')}
                                      isActive={isSubItemActive}
                                    >
                                      <Link
                                        href={subItem.href}
                                        onClick={closeNavigation}
                                      >
                                        <Typography variant="sm">
                                          {subItem.title}
                                        </Typography>
                                      </Link>
                                    </CollapsibleMenuLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </CollapsibleMenuContent>
                        </>
                      ) : (
                        <CollapsibleMenuLink
                          asChild
                          className="py-3 font-medium"
                          isActive={isItemActive}
                        >
                          <Link href={item.href} onClick={closeNavigation}>
                            <Typography variant="sm">{item.title}</Typography>
                          </Link>
                        </CollapsibleMenuLink>
                      )}
                    </CollapsibleMenuItem>
                  );
                })}
              </CollapsibleMenuList>
            </CollapsibleMenu>
          </nav>
        </ScrollArea>
        <SheetFooter className="px-4 py-4">
          {/* 底部連結 */}
          <Typography
            as="div"
            className="flex items-center gap-2"
            color="accent"
            variant="xs"
          >
            <Typography asChild color="accent" variant="xs">
              <a className="hover:underline" href="#">
                隱私權
              </a>
            </Typography>
            <span>|</span>
            <Typography asChild color="accent" variant="xs">
              <a className="hover:underline" href="#">
                服務條款
              </a>
            </Typography>
            <span>|</span>
            <Typography asChild color="accent" variant="xs">
              <a className="hover:underline" href="#">
                更多說明
              </a>
            </Typography>
          </Typography>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
