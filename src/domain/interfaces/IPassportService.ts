import { DiscordUser, DiscordMember } from "../../lib/discordApi";

export interface PassportData {
  tokenId: string;
  discordId: string;
  roleId: string;
  roleName: string;
  mintedAt: number;
  hash?: string; // Transaction hash
}

export interface MintPassportRequest {
  contractAddress: string;
  mintingKey: string;
  toAddress: string;
  discordId: string;
  roleId: string;
  roleName: string;
  username?: string;
  secondaryRoles?: Array<{ name: string; color?: string }>;
  svg?: string;
}

export interface MintButtonProps {
  discordId?: string;
  roleId?: string;
  roleName?: string;
  contractAddress?: string;
  mintingKey?: string;
  discordUser?: DiscordUser;
  discordMember?: DiscordMember;
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

export interface WalletUpgradeRequest {
  discordId: string;
  newWalletAddress: string;
  currentWalletAddress: string;
}

export interface IPassportService {
  mintPassport(request: MintPassportRequest): Promise<PassportData>;
  checkPassportExists(discordId: string, roleId: string): Promise<boolean>;
  getPassportData(tokenId: string): Promise<PassportData>;
  updateWalletForDiscord(request: WalletUpgradeRequest): Promise<boolean>;
  canUpgradeWallet(discordId: string, currentWallet: string): Promise<boolean>;
}
