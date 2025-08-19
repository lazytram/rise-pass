import {
  DISCORD_ROLE_MAP,
  RISE_APP_BUILDER_ROLES,
  RISE_SPECIAL_ROLES,
} from "@/data/roles";
import { DiscordMember } from "./discordApi";

export type MappedRoles = {
  primary: {
    id: string;
    name: string;
    color: string;
    description: string;
  } | null;
  secondary: Array<{ id: string; name: string; color: string }>;
};

// Utility function to get all roles (avoid duplication)
export function getAllRoles() {
  return DISCORD_ROLE_MAP.concat(RISE_SPECIAL_ROLES).concat(
    RISE_APP_BUILDER_ROLES
  );
}

export function mapDiscordRoles(roleIds: string[]): MappedRoles {
  const hits = getAllRoles().filter((r) => roleIds.includes(r.id));
  if (hits.length === 0) {
    return { primary: null, secondary: [] };
  }
  // pick the largest priority value as the most important
  const primary = hits.reduce((a, b) => (b.priority > a.priority ? b : a));
  const secondary = hits
    .filter((r) => r.id !== primary.id)
    // descending: higher priority number first
    .sort((a, b) => b.priority - a.priority)
    .map((r) => ({ id: r.id, name: r.name, color: r.color }));
  return {
    primary: {
      id: primary.id,
      name: primary.name,
      color: primary.color,
      description: primary.description,
    },
    secondary,
  };
}

// Function to get role priority by ID
export function getRolePriority(roleId: string): number {
  const role = getAllRoles().find((r) => r.id === roleId);
  return role ? role.priority : 0;
}

// Function to check if user can upgrade their role using DiscordMember
export function canUpgradeRoleWithMember(
  currentRoleId: string,
  discordMember: DiscordMember | null
): {
  canUpgrade: boolean;
  highestAvailableRole: { id: string; name: string; priority: number } | null;
  currentRolePriority: number;
} {
  if (!discordMember?.roles) {
    return {
      canUpgrade: false,
      highestAvailableRole: null,
      currentRolePriority: 0,
    };
  }

  const currentPriority = getRolePriority(currentRoleId);
  const allRoles = getAllRoles();

  // Find the highest priority role among user's Discord roles
  const userRoles = allRoles.filter((r) => discordMember.roles.includes(r.id));
  if (userRoles.length === 0) {
    return {
      canUpgrade: false,
      highestAvailableRole: null,
      currentRolePriority: currentPriority,
    };
  }

  const highestUserRole = userRoles.reduce((a, b) =>
    b.priority > a.priority ? b : a
  );

  // Check if the highest user role has higher priority than current NFT role
  const canUpgrade = highestUserRole.priority > currentPriority;

  return {
    canUpgrade,
    highestAvailableRole: canUpgrade
      ? {
          id: highestUserRole.id,
          name: highestUserRole.name,
          priority: highestUserRole.priority,
        }
      : null,
    currentRolePriority: currentPriority,
  };
}
