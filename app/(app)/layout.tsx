import { Analytics } from '@vercel/analytics/react';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import '../globals.css';

import { Title } from '@tremor/react';

import { Nav } from '@/components/Nav';
import { NavTabs } from '@/components/NavTabs';
import { NavLoading } from '@/components/NavLoading';

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
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return redirect('/login');
  // }

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`h-full ${inter.className}`}>
        <Suspense fallback={<NavLoading />}>
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8">
          <Title>My resumes</Title>
          <NavTabs />
          {children}
        </div>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <Analytics />
      </body>
    </html>
  );
}
