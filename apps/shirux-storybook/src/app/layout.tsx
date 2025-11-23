import '@shirux/rux-ui/globals.css';
import type { RCC } from '@shirux/types/react';

import { Footer } from '@/components/layouts/footer';
import { Header } from '@/components/layouts/header/main';
import { ThemeProvider } from '@/components/themes/provider';
import { websiteFontClasses } from '@/styles/font';
import { ReactQueryProvider } from '@/components/providers/react-query';
import FirebaseAuthInitialize from '@/components/auth/initialize/firebase-auth';

const RootLayout: RCC = ({ children }) => (
  <html lang="zh-TW" suppressHydrationWarning>
    <body className={websiteFontClasses}>
      <ReactQueryProvider>
        <FirebaseAuthInitialize />
        <ThemeProvider>
          <Header />
          <main className="flex min-h-screen flex-col pt-16 lg:pt-32">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </ReactQueryProvider>
    </body>
  </html>
);

export default RootLayout;
