// Types for passport data
export interface PassportData {
  discordId: string;
  mintedAt: number;
  username?: string;
  secondaryRoles?: Array<{
    name: string;
    color?: string;
  }>;
  primaryRole?: {
    roleName: string;
    roleId: string;
    color?: string;
  };
}

export interface BadgeConfig {
  maxBadges: number;
  cardWidth: number;
  badgeHeight: number;
  badgeSpacing: number;
  minBadgeWidth: number;
  maxBadgeWidth: number;
  textPadding: number;
}

export interface SVGConfig {
  width: number;
  height: number;
  viewBox: string;
}

// Passport component props
export interface PassportCardProps {
  username: string;
  avatarUrl?: string | null;
  roleName: string;
  roleDescription?: string | null;
  color: string;
  secondaryRoles?: Array<{
    name: string;
    color?: string;
    description?: string;
  }>;
  roleId?: string;
  discordId?: string;
}

export interface PassportTopBarProps {
  username: string;
}

export interface PassportMediaProps {
  username: string;
  avatarUrl?: string | null;
}

export interface PassportRoleSectionProps {
  roleName: string;
  roleDescription?: string | null;
}

export interface PassportBadgesProps {
  secondaryRoles: Array<{
    name: string;
    color?: string;
    description?: string;
  }>;
  maxSecondaryRoles?: number;
}
