import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "identify guilds guilds.members.read",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: Record<string, unknown>;
      account?: { access_token?: string; providerAccountId?: string } | null;
      profile?: unknown | null;
    }) {
      if (account) {
        token.accessToken = account.access_token;
        token.providerAccountId = account.providerAccountId;
      }
      if (profile) {
        token.discordProfile = profile;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      (session as unknown as { accessToken?: string }).accessToken = (
        token as unknown as { accessToken?: string }
      ).accessToken;
      (session as unknown as { discordProfile?: unknown }).discordProfile = (
        token as unknown as { discordProfile?: unknown }
      ).discordProfile;
      return session as Session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
