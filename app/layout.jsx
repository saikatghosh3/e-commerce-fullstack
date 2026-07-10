import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import AppShell from '@/components/AppShell';
import ReduxProvider from '@/lib/redux/Provider';
import { SiteDataProvider } from '@/lib/SiteDataContext';
import { getSiteSettings, getCategories } from '@/lib/queries';

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
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased text-foreground">
        <ReduxProvider>
          <SiteDataProvider settings={settings} categories={categories}>
            <AppShell>{children}</AppShell>
          </SiteDataProvider>
        </ReduxProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
