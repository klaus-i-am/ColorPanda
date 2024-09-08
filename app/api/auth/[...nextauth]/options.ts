import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        // GitHub
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // Credentials (Email/Password)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Luffy D Monkey",
                },
                pasword: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Shhh...don't tell anyone this.",
                },
            },
            async authorize(credentials) {
                const user = { id: '42', name: 'Luffy', password: "nextauth" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            },
        })
    ],
    pages: {
        signIn: '/sign-in',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
      }
}