'use client';

import { Input } from '@shirux/rux-ui/components/input';
import { Search } from 'lucide-react';
import type { RC } from '@shirux/types/react';

export const SearchInput: RC = () => {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <Input className="w-full pl-9" placeholder="" radius="pill" />
    </div>
  );
};
