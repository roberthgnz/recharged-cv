import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { Hero } from '@/components/Hero';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/resumes');

  return <Hero />;
}
