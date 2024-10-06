import type { NextAuthOptions } from "next-auth";
import connectMongoDB from "@/lib/mongodb";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const options: NextAuthOptions = {
    providers: [
        // GitHub
        GitHub({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // Google
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        })
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        newUser: '/auth/new-user'
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            await connectMongoDB();
            const existingUser = await User.findOne({ email: user.email });

            if (!existingUser) {
                const newUser = new User({
                    email: user.email,
                    name: user.name,
                    image: user.image,
                });
                await newUser.save();
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
}