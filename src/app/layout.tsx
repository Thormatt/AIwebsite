import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aiwiththor.com'),
  title: {
    default: 'AI With Thor | AI Strategy & Implementation',
    template: '%s | AI With Thor',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  description:
    'Transform AI potential into measurable business outcomes. Executive AI leadership paired with hands-on implementation.',
  keywords: [
    'AI strategy',
    'AI implementation',
    'AI consulting',
    'enterprise AI',
    'AI transformation',
    'fractional AI advisor',
  ],
  authors: [{ name: 'Thor Matthiasson' }],
  creator: 'Thor Matthiasson',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aiwiththor.com',
    siteName: 'AI With Thor',
    title: 'AI With Thor | AI Strategy & Implementation',
    description:
      'Transform AI potential into measurable business outcomes. Strategy that actually ships.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI With Thor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI With Thor | AI Strategy & Implementation',
    description:
      'Transform AI potential into measurable business outcomes. Strategy that actually ships.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#07080f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased">
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
