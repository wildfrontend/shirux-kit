'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';
import type { RCC } from '@shirux/types/react';

type QueryProviderProps = {
  children: ReactNode;
};

export const ReactQueryProvider: RCC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV !== 'production' ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  );
};
