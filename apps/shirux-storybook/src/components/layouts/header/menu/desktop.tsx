'use client';

import { Button } from '@shirux/rux-ui/components/button';
import { Bell, Grid3x3 } from 'lucide-react';
import type { RC } from '@shirux/types/react';

import { UserMenu } from './user-menu';

export const DesktopMenu: RC = () => {
  return (
    <>
      {/* Notification Bell with Badge */}
      <Button className="relative" size="icon" variant="ghost">
        <Bell className="size-5" />
        <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500" />
      </Button>

      {/* Grid Menu */}
      <Button size="icon" variant="ghost">
        <Grid3x3 className="size-5" />
      </Button>

      {/* User Profile Dropdown */}
      <UserMenu />
    </>
  );
};
