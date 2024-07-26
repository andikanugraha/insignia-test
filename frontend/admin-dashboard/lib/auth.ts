import NextAuth from 'next-auth';
// import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const credentialsProvider = CredentialsProvider({
  id: 'credentials',
  name: 'credentials',
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
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
    return null
  }
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [credentialsProvider]
});
