import { freeCredits } from "@/constants";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                    creditBalance: freeCredits,
                    role: profile.role ? profile.role : "user",
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update" && session) {
                return { ...token, ...session?.user };
            }

            return { ...token, ...user };
        },
        async session({ session, token }) {
            return updateSessionWithUserData(session, token.id);
        },
    },
};

const updateSessionWithUserData = async (session, userId) => {
    // Fetch user data
    const userData = await prisma.user.findUnique({
        where: { id: userId }
    });

    // Update session with custom data
    session.user.id = userData.id;
    session.user.role = userData.role;
    session.user.creditBalance = userData.creditBalance;

    return session;
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
