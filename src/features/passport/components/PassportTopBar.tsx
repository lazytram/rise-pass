import Image from "next/image";
import { PassportTopBarProps } from "../types";
import styles from "./PassportCard.module.css";

export default function PassportTopBar({ username }: PassportTopBarProps) {
  return (
    <div className={styles.pkTopBar}>
      <div className={`text-lg font-semibold ${styles.pkName}`}>{username}</div>
      <Image
        src="/logo-white.svg"
        alt="RISE"
        width={28}
        height={28}
        className="opacity-90"
        priority
      />
    </div>
  );
}
