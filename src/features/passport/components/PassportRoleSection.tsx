import { PassportRoleSectionProps } from "../types";
import styles from "./PassportCard.module.css";

export default function PassportRoleSection({
  roleName,
  roleDescription,
}: PassportRoleSectionProps) {
  return (
    <div className="mt-5 relative flex flex-col items-center">
      <div className={styles.pkMove}>{roleName}</div>
      {roleDescription ? (
        <p className="mt-3 text-center max-w-[90%] text-white/70 text-sm">
          {roleDescription}
        </p>
      ) : null}
    </div>
  );
}
