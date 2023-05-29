'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { AtroposWrapper } from './AtroposWrapper';
import { Button } from '@tremor/react';

export const Hero = () => {
  const router = useRouter();

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 8 lg:max-w-2xl lg:w-full mx-auto">
          <div className="mx-auto max-w-7xl px-4 mt-10 sm:px-6 lg:px-8 text-center">
            <h1 className="text-sm tracking-tight text-gray-600 mb-4">
              Recharged CV
            </h1>
            <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 mb-4">
              Empower Your Career with our Resume Generator!
            </h2>
            <p className="max-w-md mx-auto text-base text-gray-500 md:mt-5 md:max-w-3xl mb-4">
              Create winning resumes with professional templates. Follow
              &quot;resume rules&quot; employers seek. Easy to use, done in
              minutes. Try now, free!
            </p>
            <Button
              size="xl"
              onClick={() => router.push('/login')}
              className="my-8"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/2 grid grid-cols-2 gap-3 mx-auto relative">
        <AtroposWrapper>
          <div className="shadow">
            <Image
              src="/creative-resume-template.webp"
              alt="Creative Resume Template"
              width={700}
              height={350}
              style={{
                width: '100%',
                height: 'auto'
              }}
              priority
            />
          </div>
        </AtroposWrapper>
        <AtroposWrapper>
          <div className="shadow">
            <Image
              src="/minimalist-resume-template.webp"
              alt="Minimalist Resume Template"
              width={700}
              height={350}
              style={{
                width: '100%',
                height: 'auto'
              }}
              priority
            />
          </div>
        </AtroposWrapper>
      </div>
    </div>
  );
};
