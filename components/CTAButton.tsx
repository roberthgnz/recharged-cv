'use client';
import Link from 'next/link';

export const CTAButton = ({ children, href }: any) => {
  return (
    <Link
      href={href}
      className="inline-flex py-4 px-8 border border-[#ffffff26] rounded-xl mt-4 mb-8"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(244,244,244,.1),rgba(255,255,255,.1))`
      }}
    >
      {children}
    </Link>
  );
};
