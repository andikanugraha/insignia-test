import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth'
// import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const credentialsProvider = CredentialsProvider({
  id: 'credentials',
  name: 'credentials',
  credentials: {
    username: {},
    password: {},
  },
  async authorize(credentials, req) {
    const body = {
        username: credentials.username,
        password: credentials.password,
      }
    const res = await fetch(process.env.API_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json'}
    })
    const user = await res.json()
    console.log('user: ', user)
    if (res.ok && user) {
      return user
    }

    throw new Error('Invalid username or password')
    // return null
  }
})

export const authOptions: NextAuthConfig = {
  providers: [credentialsProvider],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, user, token }) {
      if (token) {
        // @ts-ignore: Property doesn't exist
        session.accessToken = token.accessToken
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        // @ts-ignore: Property doesn't exist
        token.accessToken = user.token;
      }
      return token
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
