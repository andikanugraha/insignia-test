import authConfig from 'auth.config';
import NextAuth from 'next-auth';
import { NextRequest } from 'next/server';
import { getProfile } from './lib/api';
import { AppRouteHandlerFnContext } from 'next-auth/lib/types';
import { getSession } from 'next-auth/react';

// Use only one of the two middleware options below
// 1. Use middleware directly
// export { auth as middleware } from '@/lib/auth';

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)

const middleware = async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
  // console.log('req', req)
  // console.log('ctx', ctx)
  // const session = await getSession({ req: req })
  // console.log('session', session)
}

export default auth(middleware)


// Don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

