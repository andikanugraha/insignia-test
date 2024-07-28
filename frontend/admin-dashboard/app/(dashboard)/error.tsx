'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="p-4 md:p-6">
      <div className="mb-8 space-y-4">
        <h1 className="font-semibold text-lg md:text-2xl">
          Something Wrong Happened...
        </h1>
        <p>
          Please refresh the page. If you still see this error,
          please contact the administrator.
        </p>
        <Button asChild className="">
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
