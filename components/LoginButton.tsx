'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@tremor/react';

export const LoginButton = ({ url }: { url: string }) => {
  const router = useRouter();

  const signIn = () => router.push(url);

  return <Button onClick={() => signIn()}>Connect to InfoJobs</Button>;
};
