import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      async authorize(user) {
        if (user) return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hour
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: any) {
      if (token) session.user = token.user;
      return session;
    },
  },
});
