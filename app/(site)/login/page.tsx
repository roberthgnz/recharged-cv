import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GithubLoginButton } from '@/components/GithubLoginButton';
import { Title } from '@/components/ui/title';

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <div className="absolute h-[250px] flex flex-col items-center max-w-[670px]">
      <div className="max-w-xl text-center">
        <Title className="text-white mb-4">
          Empower Your Career with our Resume Generator!
        </Title>
        <span className="text-[#f5f5f5cc] mb-6">
          Sign in below with Github to create a free account and get started.
        </span>
        <GithubLoginButton />
      </div>
    </div>
  );
}
