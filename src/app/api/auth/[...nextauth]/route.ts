import NextAuth, { AuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        client: { label: "Client", type: "text" },
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const userFound = await prisma.user.findFirst({
          where: { email: credentials!.email, client_id: credentials!.client },
        });

        if (!userFound) throw new Error("User not found");

        const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);

        if (!passwordMatch) throw new Error("Password incorrect");

        return {
          id: userFound?.id,
          name: userFound?.username,
          email: userFound?.email,
          image: `${process.env.NEXTAUTH_URL}/vercel.svg`,
        };
      },
    }),
    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
