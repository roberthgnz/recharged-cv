'use client';

import Link from 'next/link';
import { usePathname, useSelectedLayoutSegments } from 'next/navigation';
import classNames from 'classnames';

const Arrow = () => (
  <svg
    width={16}
    height={16}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

export const NavTabs = () => {
  const pathname = usePathname();

  const segments = useSelectedLayoutSegments();

  const getSegmentLabel = (label: string, path: string) => {
    if (segments.length === 1) return label;

    const first = segments[0];
    const last = segments[segments.length - 1];

    if (!path?.startsWith(`/${first}`)) return label;

    return last === 'create' ? (
      <>
        <span>{label}</span>
        <Arrow />
        <span>Create</span>
      </>
    ) : (
      <>
        <span>{label}</span>
        <Arrow />
        <span>Edit</span>
      </>
    );
  };

  return (
    <div
      aria-label="Tabs"
      className="flex justify-start overflow-x-clip border-gray-200 space-x-4 border-b mt-6"
    >
      <Link
        href="/resumes"
        className={classNames(
          'flex whitespace-nowrap max-w-xs truncate focus:outline-none focus:ring-0 px-1 py-2 -mb-px text-sm font-medium',
          pathname?.startsWith('/resumes')
            ? 'text-blue-500 border-blue-500 border-b-2'
            : 'border-transparent text-gray-400 hover:text-gray-500 hover:border-gray-500 hover:border-b-2'
        )}
      >
        <p className="flex items-center space-x-1 text-sm whitespace-nowrap">
          {getSegmentLabel('Resumes', '/resumes')}
        </p>
      </Link>
    </div>
  );
};
