export type GuildRole = {
  id: string;
  name: string;
  color: number;
  position: number;
  managed?: boolean;
};

/**
 * Fetch all roles for a guild using a Bot token.
 * Requires the bot to be in the guild. No special intents are needed for roles.
 */
export async function fetchGuildRoles(
  guildId: string,
  botToken: string
): Promise<GuildRole[]> {
  const res = await fetch(`https://discord.com/api/guilds/${guildId}/roles`, {
    headers: {
      Authorization: `Bot ${botToken}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch roles: ${res.status} ${text}`);
  }
  const roles = (await res.json()) as GuildRole[];
  return roles;
}
