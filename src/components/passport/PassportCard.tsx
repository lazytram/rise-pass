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

const MAX_SECONDARY_ROLES = 8;
export default function PassportCard({
  username,
  avatarUrl,
  roleName,
  roleDescription,
  color,
  secondaryRoles = [],
}: Props) {
  return (
    <div
      className={`${styles.pkFrame} ${styles.pkFixedSize}`}
      style={{ ["--role-color" as unknown as string]: color }}
    >
      <div className={`${styles.pkBody} p-4 h-full flex flex-col`}>
        <div className={styles.pkTopBar}>
          <div className={`${styles.pkName} text-lg`}>{username}</div>
          <Image
            src="/logo-white.svg"
            alt="RISE"
            width={28}
            height={28}
            className="opacity-90"
            priority
          />
        </div>

        <div
          className={`${styles.pkMedia} relative mt-3 h-56 w-full rounded-xl overflow-hidden border border-black/30`}
        >
          <Image
            src="/banner.png"
            alt="Banner"
            fill
            sizes="350px"
            className="object-cover"
            priority
          />

          <div className={styles.pkHolo} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={styles.pkAvatarWrap}>
              <Image
                src={avatarUrl || "/avatar-placeholder.svg"}
                alt={username}
                width={100}
                height={100}
                className="object-cover rounded-full"
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 relative flex flex-col items-center">
          <div className={styles.pkMove}>{roleName}</div>
          {roleDescription ? (
            <p
              className={`${styles.pkDescription} mt-3 text-center max-w-[90%]`}
            >
              {roleDescription}
            </p>
          ) : null}
        </div>

        {secondaryRoles.length ? (
          <div className={`${styles.badgePanel} mt-auto flex flex-wrap gap-2`}>
            {(secondaryRoles.slice(0, MAX_SECONDARY_ROLES) || []).map((r) => (
              <RoleBadge key={r.name} roleName={r.name} color={r.color} />
            ))}
            {secondaryRoles.length > MAX_SECONDARY_ROLES ? (
              <span className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white/90 bg-white/10 border border-white/15">
                + {secondaryRoles.length - MAX_SECONDARY_ROLES}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
