import { Analytics } from '@vercel/analytics/next';
import { Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/AppShell';
import ReduxProvider from '@/lib/redux/Provider';
import { SiteDataProvider } from '@/lib/SiteDataContext';
import { getSiteSettings, getCategories } from '@/lib/queries';
import GlobalLoader from '@/components/GlobalLoader';

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali', 'latin'],
  display: 'swap',
  variable: '--font-bangla',
  fallback: ['Nirmala UI', 'Hind Siliguri', 'system-ui', 'sans-serif'],
});

export async function generateMetadata() {
  try {
    const setting = await getSiteSettings();
    if (setting) {
      const iconEntries = [];
      if (setting.favicon) {
        iconEntries.push({ url: setting.favicon });
      }
      iconEntries.push(
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      );
      return {
        title: setting.siteNameEnglish || 'Elite Store',
        description: setting.description || 'Shop the finest collection of premium products',
        icons: {
          icon: iconEntries,
          shortcut: ["/icon-light-32x32.png"],
          apple: '/apple-icon.png',
        },
      };
    }
  } catch (e) {
    // fallback
  }
  return {
    title: 'Elite Store - Premium E-commerce',
    description: 'Shop the finest collection of premium products',
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
  };
}

export default async function RootLayout({ children }) {
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    getCategories(),
  ]);

  return (
    <html lang="bn" className={`bg-background ${notoSansBengali.variable}`}>
      <body
        className="font-sans antialiased text-foreground"
        suppressHydrationWarning
      >
        <ReduxProvider>
          <SiteDataProvider settings={settings} categories={categories}>
            <GlobalLoader />
            <AppShell>{children}</AppShell>
          </SiteDataProvider>
        </ReduxProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
