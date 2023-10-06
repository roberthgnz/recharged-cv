import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';

import '../globals.css';

import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Providers } from '@/components/Provider';

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
    <html lang="en" className="h-full bg-black text-white">
      <body className={`h-full ${inter.className}`}>
        <Providers>
          <div
            className="fixed h-screen w-full bg-cover bg-no-repeat bg-gradient-to-br from-black via-blue-50 to-rose-100"
            style={{
              backgroundImage: 'url(/background.png)',
              backgroundPosition: '50%'
            }}
          ></div>
          <Suspense fallback="...">
            <Nav />
          </Suspense>
          <main className="flex min-h-screen w-full flex-col items-center justify-center py-16">
            {children}
          </main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
