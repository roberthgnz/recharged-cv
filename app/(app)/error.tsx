'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button, Title } from '@tremor/react';

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="my-8">
      <Title>Something went wrong!</Title>
      <div className="flex space-x-3">
        <Link
          href={`https://github.com/roberthgnz/recharged-cv/issues/new`}
          target="_blank"
          className="flex-shrink-0 inline-flex justify-center items-center group focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium rounded-md border shadow-sm px-2.5 py-1.5 text-xs bg-[#ef4444] border-[#ef4444]"
        >
          Report as issue
        </Link>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
