import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import PassportCard from "../../components/passport/PassportCard";
import { mapDiscordRoles } from "../../lib/discordRoleMap";
import {
  buildAvatarUrl,
  fetchGuildMember,
  getDisplayName,
} from "../../lib/discordApi";
import DiscordLoginButton from "../../components/DiscordLoginButton";
import GradientText from "../../components/GradientText";
import ShareExportBar from "../../components/ShareExportBar";
import { buildTweet } from "@/lib/tweet";

export default async function RevealPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <main className="py-16 text-center space-y-6">
        <h1 className="text-5xl font-extrabold">
          <GradientText>RISE Passport</GradientText>
        </h1>
        <p className="text-white/70">
          Login with Discord to generate your card.
        </p>
        <div className="flex justify-center">
          <DiscordLoginButton />
        </div>
      </main>
    );
  }

  const accessToken = (session as unknown as { accessToken?: string })
    .accessToken;
  const guildId = process.env.DISCORD_GUILD_ID as string;
  const member = accessToken
    ? await fetchGuildMember(accessToken, guildId)
    : null;
  const roleIds = member?.roles || null;

  const mapped = roleIds
    ? mapDiscordRoles(roleIds)
    : { primary: null, secondary: [] };

  return (
    <main className="py-12">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold">
          <GradientText>RISE Passport</GradientText>
        </h1>
      </div>
      <div className="flex flex-col items-center gap-6">
        {mapped.primary ? (
          <>
            <div id="passport-card">
              <PassportCard
                username={getDisplayName(member?.user)}
                avatarUrl={buildAvatarUrl(member?.user)}
                roleName={mapped.primary.name}
                roleDescription={mapped.primary.description}
                color={mapped.primary.color}
                secondaryRoles={mapped.secondary}
              />
            </div>
            <ShareExportBar targetId="passport-card" tweetText={buildTweet()} />
          </>
        ) : (
          <div className="text-white/70 text-center">
            You don&apos;t have any roles in the RISE Community.
            <br />
            Join the RISE Community Discord to get your passport.
            <br />
          </div>
        )}
      </div>
    </main>
  );
}
