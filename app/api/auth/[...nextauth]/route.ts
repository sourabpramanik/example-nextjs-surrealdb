import NextAuth, { AuthOptions, User } from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { SurrealDBAdapter } from "@auth/surrealdb-adapter"
import { surrealConnection } from "../../lib/surreal";

export const authOptions: AuthOptions = {
    pages: {
        error: "/auth",
        signIn: '/auth',
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        EmailProvider({
            async sendVerificationRequest({ url }) {
                console.log(url);
            },
        }),
    ],
    adapter: SurrealDBAdapter(surrealConnection),
    session: { strategy: "jwt" },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                domain: undefined,
                secure: false,
            },
        },
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (!token.email) {
                return {};
            }
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            (session.user as User) = {
                id: token.sub,
                // @ts-ignore
                ...(token || session).user,
            };
            // console.log("session", session);
            return session;
        },
    },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }