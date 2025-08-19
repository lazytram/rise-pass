import { RoleBadge } from "../../../shared/components";
import { PassportBadgesProps } from "../types";
import styles from "./PassportCard.module.css";

export default function PassportBadges({
  secondaryRoles,
  maxSecondaryRoles = 8,
}: PassportBadgesProps) {
  if (!secondaryRoles.length) return null;

  return (
    <div className={`mt-auto ${styles.badgePanel}`}>
      <div className="flex flex-wrap gap-2">
        {(secondaryRoles.slice(0, maxSecondaryRoles) || []).map((r) => (
          <RoleBadge key={r.name} roleName={r.name} color={r.color} />
        ))}
        {secondaryRoles.length > maxSecondaryRoles ? (
          <span className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white/90 bg-white/10 border border-white/15">
            + {secondaryRoles.length - maxSecondaryRoles}
          </span>
        ) : null}
      </div>
    </div>
  );
}
