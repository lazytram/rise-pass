// Map Discord role IDs to app roles (names/colors) by priority
// Fill these IDs with your actual Discord role IDs

import { DISCORD_ROLE_MAP, RISE_SPECIAL_ROLES, type Role } from "@/data/roles";

export type MappedRoles = {
  primary: { name: string; color: string; description: string } | null;
  secondary: Array<{ name: string; color: string }>;
};

export function mapDiscordRoles(roleIds: string[]): MappedRoles {
  const hits = DISCORD_ROLE_MAP.concat(RISE_SPECIAL_ROLES).filter((r) =>
    roleIds.includes(r.id)
  );
  if (hits.length === 0) {
    return { primary: null, secondary: [] };
  }
  // pick the largest priority value as the most important
  const primary = hits.reduce((a, b) => (b.priority > a.priority ? b : a));
  const secondary = hits
    .filter((r) => r.id !== primary.id)
    // descending: higher priority number first
    .sort((a, b) => b.priority - a.priority)
    .map((r) => ({ name: r.name, color: r.color }));
  return {
    primary: {
      name: primary.name,
      color: primary.color,
      description: primary.description,
    },
    secondary,
  };
}
