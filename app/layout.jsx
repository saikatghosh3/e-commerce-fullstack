import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import AppShell from '@/components/AppShell';
import ReduxProvider from '@/lib/redux/Provider';
import connectDB from '@/lib/db';
import SiteSetting from '@/models/SiteSetting';

export async function generateMetadata() {
  try {
    await connectDB();
    const setting = await SiteSetting.findOne();
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased text-foreground">
        <ReduxProvider>
          <AppShell>{children}</AppShell>
        </ReduxProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
