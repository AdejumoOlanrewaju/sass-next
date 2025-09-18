import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  trustedHosts: [
    "localhost:3000",
    "3000-firebase-sass-nextgit-1755075538890.cluster-cbeiita7rbe7iuwhvjs5zww2i4.cloudworkstations.dev"
  ],
};

export default NextAuth(authOptions);
