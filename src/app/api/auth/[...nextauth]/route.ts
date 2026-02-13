import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";



export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET as string,
  providers: [
    CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    
    credentials: {
      email: { label: "Email", type: "email", placeholder: "Enter email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {

        console.log(credentials);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/loginPoint`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })

      const user = await res.json();

      // If no error and we have user data, return it
      if (res.ok && user) {
        return {
            id : user?.id,
            name: user?.name,
            email: user?.email,
            image: user?.image,
            role: user?.role
          }
      }
      // Return null if user data could not be retrieved
      return null
    }
  })

  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
      }
      return session
    }
  }


}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }