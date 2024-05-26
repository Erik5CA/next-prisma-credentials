import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log(user);
        if (!user) throw new Error("No found user");
        const matchPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log(matchPassword);
        if (!matchPassword) throw new Error("Wrong password");

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
