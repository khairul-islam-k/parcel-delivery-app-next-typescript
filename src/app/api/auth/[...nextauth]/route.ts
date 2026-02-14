import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";



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
      async authorize(credentials) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/loginPoint`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        if (!res.ok) {
          return null;
        }

        const user = await res.json();

        // If no error and we have user data, return it
        if (user) {
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })

  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        try {
          const { name, email, image } = user;
          const { provider, providerAccountId } = account;

          if (provider === "credentials") {
            return true;
          }

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/provider/${providerAccountId}`);

          const existingUser = await res.json();

          if (!existingUser[0]) {

            // social post
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/socialRegistration`, {
              method: 'POST',
              body: JSON.stringify({
                provider,
                providerAccountId,
                email,
                name,
                image,
                role: "user",
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });

            if (provider === "google" || provider === "github") {
              user.name = name as string;
              user.role = "user";
            }

          } else {
            user.name = existingUser[0]?.name;
            user.role = existingUser[0]?.role;
          }

        } catch (error) {
          console.log(error);
        }
      }

      return true
    },
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