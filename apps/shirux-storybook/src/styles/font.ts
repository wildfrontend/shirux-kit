import '@shirux/rux-ui/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const websiteFontClasses = `${fontSans.variable} ${fontMono.variable} font-sans antialiased`;
