import { DiscordMember, DiscordUser } from "@/features/auth/types";

export interface MintButtonProps {
  discordUser?: DiscordUser;
  discordMember?: DiscordMember;
  roleName?: string;
  roleId?: string;
  discordId?: string;
  contractAddress?: string;
  mintingKey?: string;
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

export interface MintFlowContainerProps extends MintButtonProps {
  className?: string;
  onMintSuccess?: (data: unknown) => void;
}

export interface RoleUpgradeInfo {
  highestAvailableRole: {
    name: string;
  };
}

export interface RoleUpgradeCardProps {
  upgradeInfo: RoleUpgradeInfo;
  onUpgradeClick?: () => void;
}
