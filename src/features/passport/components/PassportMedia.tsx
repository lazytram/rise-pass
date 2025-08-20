import Image from "next/image";
import { PassportMediaProps } from "../types";

export default function PassportMedia({
  username,
  avatarUrl,
}: PassportMediaProps) {
  const getValidAvatarUrl = (url: string | null | undefined): string => {
    if (!url) {
      return "/avatar-placeholder.svg";
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    if (url && !url.includes("http")) {
      return `https://cdn.discordapp.com/avatars/${url}`;
    }

    return "/avatar-placeholder.svg";
  };

  const validAvatarUrl = getValidAvatarUrl(avatarUrl);

  return (
    <div className="relative mt-3 h-56 w-full rounded-xl overflow-hidden border border-black/30">
      <Image
        src="/banner.png"
        alt="Banner"
        fill
        sizes="350px"
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div
            className="w-[100px] h-[100px] rounded-full border-2 shadow-lg backdrop-blur-sm"
            style={{
              borderColor: "var(--role-color)",
              boxShadow: "0 0 8px var(--role-color)",
              background:
                "linear-gradient(135deg, var(--role-color)10, transparent)",
            }}
          >
            <Image
              src={validAvatarUrl}
              alt={username}
              width={100}
              height={100}
              className="object-cover rounded-full"
              crossOrigin="anonymous"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/avatar-placeholder.svg";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
