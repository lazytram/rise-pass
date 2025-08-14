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
    <div
      className={`${styles.pkFrame} ${styles.pkFixedSize}`}
      style={{ ["--role-color" as unknown as string]: color }}
    >
      <div className={`${styles.pkBody} p-4 h-full flex flex-col`}>
        <div className="flex items-center justify-between">
          <div className={`${styles.pkName} text-lg`}>{username}</div>
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
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-white/20 shadow-md">
              <Image
                src={avatarUrl || "/avatar-placeholder.svg"}
                alt={username}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className={styles.pkMove}>{roleName}</div>
          {roleDescription ? (
            <p className="text-white/85 text-base mt-3 leading-relaxed">
              {roleDescription}
            </p>
          ) : null}
        </div>

        {secondaryRoles.length ? (
          <div className={`${styles.badgePanel} mt-auto flex flex-wrap gap-2`}>
            {secondaryRoles.map((r) => (
              <RoleBadge key={r.name} roleName={r.name} color={r.color} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
