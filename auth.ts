
import NextAuth from "next-auth"
import Auth0 from "next-auth/providers/auth0"
import { JWT } from "next-auth/jwt"

async function refreshAccessToken(token: JWT) {
  try {
    const url =
      `${process.env.AUTH0_ISSUER}/oauth/token` +
      new URLSearchParams({
        client_id: process.env.AUTH0_CLIENT_ID!,
        client_secret: process.env.AUTH0_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string,
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.error('Error refreshing access token', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      authorization: {
        params: {
          scope: 'openid profile email', // Request additional scopes as needed
          audience: process.env.AUTH0_AUDIENCE,
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT strategy for session management
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role || 'user', // Default role
          },
        }
      }

      // Return previous token if the access token has not expired
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token as JWT)
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user && token.user) {
        session.user.id = token.user.id
        session.user.role = token.user.role
        session.accessToken = token.accessToken as string | undefined
        session.error = token.error as string | undefined
      }
      return session
    },
  },
  pages: {
    signIn: '/login', // Custom sign-in page
    error: '/error', // Error page for auth errors
  },
  debug: process.env.NODE_ENV === 'development',
})