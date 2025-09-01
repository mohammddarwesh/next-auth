import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession['user'];
    accessToken?: string;
    error?: string;
  }

  interface User extends DefaultUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}
