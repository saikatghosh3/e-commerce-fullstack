'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import ScrollToTopClient from './home/ScrollToTopClient';

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return children;
  }

  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <main>{children}</main>
      
      <Footer />
      <ScrollToTopClient/>
    </>
  );
}
