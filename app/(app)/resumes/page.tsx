import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { Dashboard } from '@/components/Dashboard';

export default async function Resumes() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/login');

  const props = {
    cvs: []
  };

  return <Dashboard {...props} />;
}
