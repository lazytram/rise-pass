import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/authOptions";
import { mapDiscordRoles } from "../../lib/discordRoleMap";
import { fetchGuildMember } from "../../lib/discordApi";
import { MintPageLayout, MintPageStateManager } from "../../features/layout";
import { RainbowKitAppProvider } from "../../components/RainbowKitProvider";

export default async function MintPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
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
    <RainbowKitAppProvider>
      <MintPageLayout>
        <MintPageStateManager
          hasRole={!!mapped.primary}
          mintProps={{
            discordId: member?.user?.id || "",
            roleId: mapped.primary?.id || "",
            roleName: mapped.primary?.name || "",
            contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
            mintingKey: process.env.MINTING_KEY || "",
            discordUser: member?.user || undefined,
            discordMember: member || undefined,
            mappedRoles: mapped,
          }}
        />
      </MintPageLayout>
    </RainbowKitAppProvider>
  );
}
