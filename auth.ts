
import NextAuth from "next-auth"
import Auth0 from "next-auth/providers/auth0"
import { JWT } from "next-auth/jwt"

// Config from env (requires trailing slash), e.g., https://your-app.com/
const NS = process.env.AUTH0_NAMESPACE!

// Extract role from ID token (namespaced claim)
function roleFromIdToken(idToken?: string): string | undefined {
  if (!idToken || !NS) return undefined
  try {
    const seg = idToken.split(".")[1]
    if (!seg) return undefined
    const json = Buffer.from(seg.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
    const p = JSON.parse(json) as Record<string, unknown>
    const claim = (p[`${NS}roles`] as unknown) ?? (p[`${NS}role`] as unknown)
    if (Array.isArray(claim)) return (claim as string[]).includes("admin") ? "admin" : (claim as string[])[0]
    if (typeof claim === "string") return claim
  } catch {}
  return undefined
}

async function refreshAccessToken(token: JWT) {
  try {
    const url = `${process.env.AUTH0_ISSUER}/oauth/token`

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.AUTH0_CLIENT_ID!,
        client_secret: process.env.AUTH0_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: String(token.refreshToken || ''),
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // fallback to existing
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
          scope: 'openid profile email offline_access',
          audience: process.env.AUTH0_AUDIENCE,
          prompt: 'login', 
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt', // JWT sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign-in
      if (account && user) {
        const roleFromClaim = roleFromIdToken(account.id_token as string | undefined)
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
          id: user.id,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: roleFromClaim || user.role || 'user',
          },
        }
      }

      // Reuse token if access token is still valid
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // Refresh expired access token
      return refreshAccessToken(token as JWT)
    },
    async session({ session, token }) {
      // Expose extra fields to the client
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
    signIn: '/login', // custom sign-in page
    error: '/error', // auth error page
  },
  debug: process.env.NODE_ENV === 'development',
})