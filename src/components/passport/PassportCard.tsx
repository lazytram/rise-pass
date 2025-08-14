import Image from "next/image";
import RoleBadge from "../RoleBadge";
import styles from "./PassportCard.module.css";

type Props = {
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
};

export default function PassportCard({
  username,
  avatarUrl,
  roleName,
  roleDescription,
  color,
  secondaryRoles = [],
}: Props) {
  return (
    <div className={styles.pkFrame} style={{ ["--role-color" as unknown as string]: color }}>
      <div className={`${styles.pkBody} p-4`}>
        <div className="flex items-center justify-between">
          <div className={`${styles.pkName} text-lg`}>{username}</div>
        </div>

        <div
          className={`${styles.pkMedia} relative mt-3 h-56 w-full rounded-xl overflow-hidden border border-black/30`}
        >
          <Image
            src={avatarUrl || "/solgaleo.png"}
            alt={username}
            fill
            sizes="384px"
            className="object-cover"
          />
        </div>

        <div className="mt-5">
          <div className={styles.pkMove}>{roleName} GX</div>
          {roleDescription ? (
            <p className="text-white/85 text-base mt-3 leading-relaxed">
              {roleDescription}
            </p>
          ) : null}
        </div>

        {secondaryRoles.length ? (
          <div className={`${styles.badgePanel} flex flex-wrap gap-2`}>
            {secondaryRoles.map((r) => (
              <RoleBadge key={r.name} roleName={r.name} color={r.color} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
