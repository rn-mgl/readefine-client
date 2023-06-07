import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Credentials",

      credentials: {
        candidateIdentifier: { label: "Username", type: "text" },
        candidatePassword: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { data } = await axios.post("http://192.168.1.121:9000/auth_admin/admin_login", {
          loginData: credentials,
        });

        if (data) {
          const user = { name: data.primary };
          return user;
        } else {
          return null;
        }
      },
    }),

    CredentialsProvider({
      id: "client-credentials",
      name: "Client Credentials",

      credentials: {
        candidateIdentifier: { label: "Username", type: "text" },
        candidatePassword: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { data } = await axios.post("http://192.168.1.121:9000/auth_client/client_login", {
          loginData: credentials,
        });

        if (data) {
          const user = { name: data.primary };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  url: process.env.NEXTAUTH_URL,

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
