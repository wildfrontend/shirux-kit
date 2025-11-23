'use client';

import Link from 'next/link';
import type { RC } from '@shirux/types/react';

import { pagePath } from '@/constants/page-path';

import { DesktopMenu } from '../menu/desktop';
import { DesktopNavigation } from '../navigations/desktop';
import { MobileNavigation } from '../navigations/mobile';
import { SearchInput } from './search-input';

import { ShiruxLogo } from '@shirux/rux-icons/logo';
import dynamic from 'next/dynamic';
import { ButtonSkeleton } from '@shirux/rux-ui/components/button';
const ThemeToggle = dynamic(
  () =>
    import('@/components/themes/theme-toggle').then((mod) => mod.ThemeToggle),
  {
    ssr: false,
    loading: () => (
      <ButtonSkeleton aria-hidden="true" radius="circle" size="icon" />
    ),
  }
);

export const Header: RC = () => {
  return (
    <div className="bg-background fixed top-0 right-0 left-0 z-50">
      {/* Top Header */}
      <header className="flex h-16 items-center justify-between gap-4 border-b px-6">
        {/* Mobile Navigation Trigger (now always visible) */}
        <div className="lg:hidden">
          <MobileNavigation />
        </div>

        {/* Logo */}
        <Link className="flex items-center" href={pagePath.home}>
          <ShiruxLogo className="h-6 w-auto" />
        </Link>

        {/* Right Side Container */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Search Bar - hidden on mobile */}
          <div className="hidden md:block md:max-w-md md:flex-1">
            <SearchInput />
          </div>

          {/* Desktop Menu - hidden on mobile */}
          <div className="hidden items-center gap-2 lg:flex">
            <DesktopMenu />
          </div>

          <ThemeToggle />
        </div>
      </header>

      {/* Desktop Navigation hidden at lg */}
      <nav className="relative hidden border-b py-2 lg:block">
        <div className="container flex h-12 items-center px-6">
          <DesktopNavigation />
        </div>
      </nav>
    </div>
  );
};
