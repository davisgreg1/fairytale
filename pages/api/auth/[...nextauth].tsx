// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
//     }),
//   ],
// };

// export default NextAuth(authOptions);

import { authOptions } from "@/lib/auth/config";
import NextAuth from "next-auth";

export default NextAuth(authOptions);
