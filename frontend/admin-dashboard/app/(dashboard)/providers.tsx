'use client';

import { SessionProvider } from 'next-auth/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Provider } from 'react-redux'
import { store } from 'app/store'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </SessionProvider>
    </Provider>
  );
}
