"use client";

import { useState } from "react";
import { WalletUpgradeModal } from "../../wallet";
import styles from "./PassportCard.module.css";
import { FULL_ROLES_LIST } from "../../../data/roles";
import { PassportCardProps } from "../types";
import PassportTopBar from "./PassportTopBar";
import PassportMedia from "./PassportMedia";
import PassportRoleSection from "./PassportRoleSection";
import PassportBadges from "./PassportBadges";

const findRoleData = (roleId: string) => {
  const allRoles = FULL_ROLES_LIST;
  return allRoles.find((role) => role.id === roleId);
};

const MAX_SECONDARY_ROLES = 8;
export default function PassportCard({
  username,
  avatarUrl,
  roleName,
  roleDescription,
  color,
  secondaryRoles = [],
  roleId,
  discordId,
}: PassportCardProps) {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Utiliser les vraies données du rôle si disponible
  const realRoleData = roleId ? findRoleData(roleId) : null;
  const finalColor = realRoleData?.color || color;
  const finalRoleName = realRoleData?.name || roleName;
  const finalRoleDescription = realRoleData?.description || roleDescription;

  const handleUpgradeSuccess = () => {
    // Optionally refresh the page or update the UI
    window.location.reload();
  };

  return (
    <div
      className={`${styles.pkFrame} ${styles.pkFixedSize}`}
      style={{ ["--role-color" as unknown as string]: finalColor }}
    >
      <div className={`${styles.pkBody} p-4 h-full flex flex-col`}>
        <PassportTopBar username={username} />
        <PassportMedia username={username} avatarUrl={avatarUrl} />
        <PassportRoleSection
          roleName={finalRoleName}
          roleDescription={finalRoleDescription}
        />
        <PassportBadges
          secondaryRoles={secondaryRoles}
          maxSecondaryRoles={MAX_SECONDARY_ROLES}
        />
      </div>

      {/* Wallet Upgrade Modal */}
      {discordId && (
        <WalletUpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          discordId={discordId}
          onUpgradeSuccess={handleUpgradeSuccess}
        />
      )}
    </div>
  );
}
