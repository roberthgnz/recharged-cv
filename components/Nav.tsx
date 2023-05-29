import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { Navbar } from './Navbar';

export const Nav = async () => {
  const session = await getServerSession(authOptions);

  return <Navbar user={session?.user} />;
};
