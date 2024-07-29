import { AuthError, NextAuthConfig } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

const credentialsProvider = CredentialsProvider({
  id: 'credentials',
  name: 'credentials',
  credentials: {
    username: {},
    password: {},
  },
  async authorize(credentials, req) {
    const headers = { 'Content-Type': 'application/json'}
    const body = {
        username: credentials.username,
        password: credentials.password,
      }
    const res = await fetch(process.env.API_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    })
    if (!res.ok) {
      throw new AuthError(`${res.status}`)
      // return null
    }
    const user = await res.json()
    if (res.ok && user) {
      return user
    }

    throw new Error('Something is wrong')
  }
})

const authConfig: NextAuthConfig = {
  providers: [credentialsProvider],
  pages: {
    signIn: '/login',
    error: '/login',
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
} satisfies NextAuthConfig

export default authConfig