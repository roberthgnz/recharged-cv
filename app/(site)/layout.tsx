import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';

import '../globals.css';

import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Recharged CV',
  description:
    'Create Your Perfect CV: Empower Your Career with our Resume Generator!'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`h-full ${inter.className}`}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-emerald-100 via-blue-50 to-rose-100"></div>
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-16">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
