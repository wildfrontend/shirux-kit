'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from '@shirux/rux-icons/lucide';

import { Button } from '@shirux/rux-ui/components/button';
import { cn } from '@shirux/rux-ui/lib/classes';
import type { RC } from '@shirux/types/react';
export const ThemeToggle: RC = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';
  const label = isDark ? '切換為淺色模式' : '切換為深色模式';

  return (
    <Button
      aria-label={label}
      className="relative"
      color="primary"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      size="icon"
      variant="ghost"
    >
      <Sun
        className={cn(
          'size-4 scale-100 rotate-0 transition-all',
          isDark && 'scale-0 -rotate-90'
        )}
      />
      <Moon
        className={cn(
          'absolute size-4 scale-0 rotate-90 transition-all',
          isDark && 'scale-100 rotate-0'
        )}
      />
      <span className="sr-only">{label}</span>
    </Button>
  );
};
