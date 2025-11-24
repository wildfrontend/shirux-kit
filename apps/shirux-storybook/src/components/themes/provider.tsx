'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { RCC } from '@shirux/types/react';
import { ModalProvider } from '@shirux/rux-ui/components/modal-provider';
import { Toaster } from '@shirux/rux-ui/components/toast';

export const ThemeProvider: RCC = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
      enableColorScheme
      enableSystem
    >
      <ModalProvider>
        {children}
        <Toaster />
      </ModalProvider>
    </NextThemesProvider>
  );
};
