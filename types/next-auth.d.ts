import { Session, User } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      isVerified: boolean;
      name: string;
      role: "user" | "admin" | "head";
      surname: string;
      token: string;
      userId: number;
      username: string;
    };
  }
}
