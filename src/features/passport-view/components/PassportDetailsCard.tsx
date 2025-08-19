import { PassportCard } from "../../passport";
import { buildAvatarUrl, getDisplayName } from "../../../lib/discordApi";
import { DiscordUser } from "../../auth/types";

interface PassportDetailsCardProps {
  discordUser: DiscordUser | null;
  roleName: string;
  roleId: string;
  discordId: string;
  mappedRoles?: {
    primary: {
      id: string;
      name: string;
      description?: string;
      color?: string;
    } | null;
    secondary: Array<{
      name: string;
      color?: string;
      description?: string;
    }>;
  };
}

export default function PassportDetailsCard({
  discordUser,
  roleName,
  roleId,
  discordId,
  mappedRoles,
}: PassportDetailsCardProps) {
  return (
    <div className="flex justify-center">
      <div id="passport-card">
        <PassportCard
          username={discordUser ? getDisplayName(discordUser) : "User"}
          avatarUrl={discordUser ? buildAvatarUrl(discordUser) : undefined}
          roleName={roleName}
          color={mappedRoles?.primary?.color || "#6366f1"}
          roleId={roleId}
          discordId={discordId}
          secondaryRoles={mappedRoles?.secondary || []}
        />
      </div>
    </div>
  );
}
