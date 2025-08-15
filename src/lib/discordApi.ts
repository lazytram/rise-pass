export type DiscordUser = {
  id: string;
  username: string;
  global_name?: string | null;
  avatar?: string | null;
};

export type DiscordMember = {
  roles: string[];
  user: DiscordUser;
  avatar?: string | null;
};

/**
 * Server-side helper to fetch the guild member for the authenticated user
 */
export async function fetchGuildMember(
  accessToken: string,
  guildId: string
): Promise<DiscordMember | null> {
  const res = await fetch(
    `https://discord.com/api/users/@me/guilds/${guildId}/member`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const data = (await res.json()) as DiscordMember;
  return data;
}

/**
 * Build a CDN avatar URL for a Discord user or return a placeholder
 */
export function buildAvatarUrl(user: DiscordUser | null | undefined): string {
  if (user?.id && user?.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
  }
  return "/avatar-placeholder.svg";
}

/**
 * Choose a nice display name
 */
export function getDisplayName(user: DiscordUser | null | undefined): string {
  return (user?.global_name || user?.username || "RISE User").toString();
}
