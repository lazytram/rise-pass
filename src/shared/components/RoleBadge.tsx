import { FULL_ROLES_LIST } from "../../data/roles";
import {
  createAdaptiveGradient,
  adjustColor,
  ensureBackgroundContrast,
} from "../utils/color";

interface RoleBadgeProps {
  roleName: string;
  color?: string;
}

const findRoleColor = (roleName: string) => {
  const allRoles = FULL_ROLES_LIST;
  const role = allRoles.find((r) => r.name === roleName);
  return role?.color;
};

export default function RoleBadge({ roleName, color }: RoleBadgeProps) {
  const roleColor = findRoleColor(roleName) || color || "#8b5cf6";
  const gradientBackground = createAdaptiveGradient(roleColor);
  const textColor = "#ffffff";
  const baseForBorder = ensureBackgroundContrast(roleColor);
  const borderColor = adjustColor(baseForBorder, -15);
  const textShadow = "0 1px 2px rgba(0,0,0,0.35)";

  return (
    <span
      className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide font-weight-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
      style={{
        background: gradientBackground,
        borderColor,
        color: textColor,
        textShadow,
        boxShadow: `0 0 12px ${roleColor}60`,
      }}
    >
      {roleName}
    </span>
  );
}
