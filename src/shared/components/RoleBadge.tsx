import { FULL_ROLES_LIST } from "../../data/roles";

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
  // Fonction pour créer un dégradé vibrant basé sur une couleur hex
  const createVibrantGradient = (hexColor: string) => {
    // Convertir hex en RGB pour créer un dégradé
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Créer une version plus claire pour le dégradé
    const lighterR = Math.min(255, r + 40);
    const lighterG = Math.min(255, g + 40);
    const lighterB = Math.min(255, b + 40);

    return `linear-gradient(135deg, ${hexColor} 0%, rgb(${lighterR}, ${lighterG}, ${lighterB}) 100%)`;
  };

  // Obtenir la couleur du rôle
  const roleColor = findRoleColor(roleName) || color || "#8b5cf6";
  const vibrantGradient = createVibrantGradient(roleColor);

  return (
    <span
      className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white font-weight-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
      style={{
        background: vibrantGradient,
        borderColor: roleColor,
        boxShadow: `0 0 12px ${roleColor}60`,
      }}
    >
      {roleName}
    </span>
  );
}
