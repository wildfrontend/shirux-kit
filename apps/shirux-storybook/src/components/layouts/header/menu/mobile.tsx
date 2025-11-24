'use client';

import { Button } from '@shirux/rux-ui/components/button';
import { Menu } from 'lucide-react';
import type { RC } from '@shirux/types/react';

export const MobileMenu: RC = () => {
  return (
    <Button size="icon" variant="ghost">
      <Menu className="size-5" />
    </Button>
  );
};
